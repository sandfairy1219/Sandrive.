const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const auth = require('../middleware/auth');

// Apply auth middleware to all routes in this router
router.use(auth);

// Configure multer for user-specific file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Store files in user-specific directory
    const userDir = path.join(__dirname, '..', 'uploads', req.user._id.toString());
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true });
    }
    
    cb(null, userDir);
  },
  filename: function (req, file, cb) {
    // Use original filename but add timestamp to avoid duplicates
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

/**
 * @route   POST /api/files/upload
 * @desc    Upload a file to user's directory
 * @access  Private
 */
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  const fileInfo = {
    filename: req.file.filename,
    originalname: req.file.originalname,
    size: req.file.size,
    mimetype: req.file.mimetype,
    uploadDate: new Date(),
    userId: req.user._id
  };
  
  res.status(200).json({ 
    message: 'File uploaded successfully',
    file: fileInfo
  });
});

/**
 * @route   GET /api/files
 * @desc    Get list of user's files
 * @access  Private
 */
router.get('/', (req, res) => {
  const userDir = path.join(__dirname, '..', 'uploads', req.user._id.toString());
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(userDir)) {
    fs.mkdirSync(userDir, { recursive: true });
    return res.status(200).json([]);
  }
  
  fs.readdir(userDir, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return res.status(500).json({ error: 'Failed to list files' });
    }
    
    const fileList = files.map(filename => {
      const filePath = path.join(userDir, filename);
      const stats = fs.statSync(filePath);
      
      // Extract original filename from the stored filename
      const originalname = filename.substring(filename.indexOf('-', filename.indexOf('-') + 1) + 1);
      
      return {
        filename: filename,
        originalname: originalname,
        size: stats.size,
        uploadDate: stats.mtime
      };
    });
    
    res.status(200).json(fileList);
  });
});

/**
 * @route   GET /api/files/download/:filename
 * @desc    Download a file from user's directory
 * @access  Private
 */
router.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const userDir = path.join(__dirname, '..', 'uploads', req.user._id.toString());
  const filePath = path.join(userDir, filename);
  
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found' });
  }
  
  // Extract original filename for the download
  const originalname = filename.substring(filename.indexOf('-', filename.indexOf('-') + 1) + 1);
  
  // Set headers for file download
  res.setHeader('Content-Disposition', `attachment; filename="${originalname}"`);
  
  // Stream the file to the response
  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);
});

/**
 * @route   DELETE /api/files/:filename
 * @desc    Delete a file from user's directory
 * @access  Private
 */
router.delete('/:filename', (req, res) => {
  const filename = req.params.filename;
  const userDir = path.join(__dirname, '..', 'uploads', req.user._id.toString());
  const filePath = path.join(userDir, filename);
  
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found' });
  }
  
  // Delete the file
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error('Error deleting file:', err);
      return res.status(500).json({ error: 'Failed to delete file' });
    }
    
    res.status(200).json({ message: 'File deleted successfully' });
  });
});

module.exports = router;