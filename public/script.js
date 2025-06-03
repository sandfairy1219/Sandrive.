document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements - Auth
    const authSection = document.getElementById('auth-section');
    const appSection = document.getElementById('app-section');
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginUsername = document.getElementById('login-username');
    const loginPassword = document.getElementById('login-password');
    const registerUsername = document.getElementById('register-username');
    const registerEmail = document.getElementById('register-email');
    const registerPassword = document.getElementById('register-password');
    const registerConfirmPassword = document.getElementById('register-confirm-password');
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const loginError = document.getElementById('login-error');
    const registerError = document.getElementById('register-error');
    const userProfile = document.getElementById('user-profile');
    const usernameDisplay = document.getElementById('username');
    const logoutBtn = document.getElementById('logout-btn');
    
    // DOM Elements - File Management
    const dropArea = document.getElementById('drop-area');
    const fileInput = document.getElementById('file-input');
    const browseBtn = document.getElementById('browse-btn');
    // Upload button will be created dynamically
    let uploadBtn = null;
    const uploadProgress = document.getElementById('upload-progress');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const uploadStatus = document.getElementById('upload-status');
    
    // Store selected files
    let selectedFiles = [];
    const searchInput = document.getElementById('search-input');
    const filesList = document.getElementById('files-list');
    const filesTable = document.getElementById('files-table');
    const filesTableBody = document.getElementById('files-table-body');
    const loadingSpinner = document.getElementById('loading-spinner');
    const noFiles = document.getElementById('no-files');
    const fileRowTemplate = document.getElementById('file-row-template');
    
    // Language elements
    const langKoBtn = document.getElementById('lang-ko');
    const langEnBtn = document.getElementById('lang-en');
    const tagline = document.getElementById('tagline');
    const uploadTitle = document.getElementById('upload-title');
    const uploadDesc = document.getElementById('upload-desc');
    const filesTitle = document.getElementById('files-title');
    const loadingText = document.getElementById('loading-text');
    const noFilesText = document.getElementById('no-files-text');
    const thName = document.getElementById('th-name');
    const thSize = document.getElementById('th-size');
    const thUploaded = document.getElementById('th-uploaded');
    const thActions = document.getElementById('th-actions');
    const footerText = document.getElementById('footer-text');
    const loginTabText = document.getElementById('login-tab-text');
    const registerTabText = document.getElementById('register-tab-text');
    const loginUsernameLabel = document.getElementById('login-username-label');
    const loginPasswordLabel = document.getElementById('login-password-label');
    const registerUsernameLabel = document.getElementById('register-username-label');
    const registerEmailLabel = document.getElementById('register-email-label');
    const registerPasswordLabel = document.getElementById('register-password-label');
    const registerConfirmPasswordLabel = document.getElementById('register-confirm-password-label');
    const loginBtnText = document.getElementById('login-btn-text');
    const registerBtnText = document.getElementById('register-btn-text');
    const logoutText = document.getElementById('logout-text');
    
    // Translations
    const translations = {
        en: {
            tagline: 'Your personal oasis for file storage',
            uploadTitle: 'Upload Files',
            uploadDesc: 'Drag & drop files here or click to browse',
            filesTitle: 'My Files',
            searchPlaceholder: 'Search files...',
            loadingText: 'Loading files...',
            noFilesText: 'No files uploaded yet',
            thName: 'Name',
            thSize: 'Size',
            thUploaded: 'Uploaded',
            thActions: 'Actions',
            browseBtn: 'Browse Files',
            addMoreBtn: 'Add More Files',
            uploadBtn: 'Upload Files',
            uploadingBtn: 'Uploading...',
            fileSelected: 'Selected',
            clickToUpload: 'Click "Upload Files" to start the upload.',
            fileUploaded: 'File uploaded successfully!',
            uploadFailed: 'Failed to upload file. Please try again.',
            loadFailed: 'Failed to load files. Please refresh the page.',
            deleteConfirm: 'Are you sure you want to delete this file?',
            deleteSuccess: 'File deleted successfully!',
            deleteFailed: 'Failed to delete file. Please try again.',
            justNow: 'Just now',
            minuteAgo: 'minute ago',
            minutesAgo: 'minutes ago',
            hourAgo: 'hour ago',
            hoursAgo: 'hours ago',
            footerText: '© 2025 Sandrive - Personal File Storage',
            // Auth translations
            loginTab: 'Login',
            registerTab: 'Register',
            loginUsernameLabel: 'Username or Email',
            loginPasswordLabel: 'Password',
            registerUsernameLabel: 'Username',
            registerEmailLabel: 'Email',
            registerPasswordLabel: 'Password',
            registerConfirmPasswordLabel: 'Confirm Password',
            loginBtn: 'Login',
            registerBtn: 'Register',
            logoutBtn: 'Logout',
            loginSuccess: 'Login successful!',
            loginFailed: 'Login failed. Please check your credentials.',
            registerSuccess: 'Registration successful! You can now login.',
            registerFailed: 'Registration failed. Please try again.',
            passwordMismatch: 'Passwords do not match.',
            welcomeBack: 'Welcome back',
            sessionExpired: 'Your session has expired. Please login again.'
        },
        ko: {
            tagline: '파일 저장을 위한 개인 오아시스',
            uploadTitle: '파일 업로드',
            uploadDesc: '여기에 파일을 끌어다 놓거나 클릭하여 찾아보기',
            filesTitle: '내 파일',
            searchPlaceholder: '파일 검색...',
            loadingText: '파일 로딩 중...',
            noFilesText: '아직 업로드된 파일이 없습니다',
            thName: '이름',
            thSize: '크기',
            thUploaded: '업로드 날짜',
            thActions: '작업',
            browseBtn: '파일 찾기',
            addMoreBtn: '더 추가하기',
            uploadBtn: '파일 업로드',
            uploadingBtn: '업로드 중...',
            fileSelected: '선택됨',
            clickToUpload: '"파일 업로드" 버튼을 클릭하여 업로드를 시작하세요.',
            fileUploaded: '파일이 성공적으로 업로드되었습니다!',
            uploadFailed: '파일 업로드에 실패했습니다. 다시 시도해주세요.',
            loadFailed: '파일을 로드하지 못했습니다. 페이지를 새로고침하세요.',
            deleteConfirm: '이 파일을 삭제하시겠습니까?',
            deleteSuccess: '파일이 성공적으로 삭제되었습니다!',
            deleteFailed: '파일 삭제에 실패했습니다. 다시 시도해주세요.',
            justNow: '방금',
            minuteAgo: '분 전',
            minutesAgo: '분 전',
            hourAgo: '시간 전',
            hoursAgo: '시간 전',
            footerText: '© 2025 Sandrive - 개인 파일 저장소',
            // Auth translations
            loginTab: '로그인',
            registerTab: '회원가입',
            loginUsernameLabel: '사용자 이름 또는 이메일',
            loginPasswordLabel: '비밀번호',
            registerUsernameLabel: '사용자 이름',
            registerEmailLabel: '이메일',
            registerPasswordLabel: '비밀번호',
            registerConfirmPasswordLabel: '비밀번호 확인',
            loginBtn: '로그인',
            registerBtn: '회원가입',
            logoutBtn: '로그아웃',
            loginSuccess: '로그인 성공!',
            loginFailed: '로그인 실패. 자격 증명을 확인하세요.',
            registerSuccess: '회원가입 성공! 이제 로그인할 수 있습니다.',
            registerFailed: '회원가입 실패. 다시 시도해주세요.',
            passwordMismatch: '비밀번호가 일치하지 않습니다.',
            welcomeBack: '다시 오신 것을 환영합니다',
            sessionExpired: '세션이 만료되었습니다. 다시 로그인해주세요.'
        }
    };
    
    // Current language
    let currentLang = localStorage.getItem('sandrive-lang') || 'en';
    
    // Initialize the app
    init();
    
    // Event Listeners - Auth
    loginTab.addEventListener('click', () => switchAuthTab('login'));
    registerTab.addEventListener('click', () => switchAuthTab('register'));
    loginBtn.addEventListener('click', handleLogin);
    registerBtn.addEventListener('click', handleRegister);
    logoutBtn.addEventListener('click', handleLogout);
    
    // Event Listeners - File Management
    browseBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleFileSelect);
    searchInput.addEventListener('input', handleSearch);
    
    // Language switcher
    langKoBtn.addEventListener('click', () => switchLanguage('ko'));
    langEnBtn.addEventListener('click', () => switchLanguage('en'));

    // Drag and drop events
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false);
    });

    dropArea.addEventListener('drop', handleDrop, false);

    // Functions - Initialization
    function init() {
        // Set initial language
        switchLanguage(currentLang, false);
        
        // Check if user is logged in
        checkAuthState();
    }
    
    // Functions - Authentication
    function checkAuthState() {
        const token = localStorage.getItem('sandrive-token');
        
        if (token) {
            // Verify token validity
            fetch('/api/auth/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    // Token is invalid or expired
                    throw new Error('Invalid token');
                }
            })
            .then(user => {
                // User is logged in
                showAuthenticatedUI(user);
            })
            .catch(error => {
                // Token is invalid or expired
                console.error('Auth error:', error);
                localStorage.removeItem('sandrive-token');
                showUnauthenticatedUI();
                showAuthError(loginError, translations[currentLang].sessionExpired);
            });
        } else {
            // No token found
            showUnauthenticatedUI();
        }
    }
    
    function showAuthenticatedUI(user) {
        // Hide auth section and show app section
        authSection.classList.add('hidden');
        appSection.classList.remove('hidden');
        
        // Update user profile
        usernameDisplay.textContent = user.username;
        userProfile.classList.remove('hidden');
        
        // Load user's files
        loadFiles();
    }
    
    function showUnauthenticatedUI() {
        // Show auth section and hide app section
        authSection.classList.remove('hidden');
        appSection.classList.add('hidden');
        userProfile.classList.add('hidden');
        
        // Reset auth forms - manually clear input fields since these are div elements, not form elements
        loginUsername.value = '';
        loginPassword.value = '';
        registerUsername.value = '';
        registerEmail.value = '';
        registerPassword.value = '';
        registerConfirmPassword.value = '';
        
        loginError.style.display = 'none';
        registerError.style.display = 'none';
    }
    
    function switchAuthTab(tab) {
        if (tab === 'login') {
            loginTab.classList.add('active');
            registerTab.classList.remove('active');
            loginForm.classList.add('active');
            registerForm.classList.remove('active');
        } else {
            registerTab.classList.add('active');
            loginTab.classList.remove('active');
            registerForm.classList.add('active');
            loginForm.classList.remove('active');
        }
        
        // Hide error messages
        loginError.style.display = 'none';
        registerError.style.display = 'none';
    }
    
    async function handleLogin(e) {
        e.preventDefault();
        
        // Validate form
        if (!loginUsername.value || !loginPassword.value) {
            showAuthError(loginError, 'Please fill in all fields.');
            return;
        }
        
        // Disable button during login
        loginBtn.disabled = true;
        
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: loginUsername.value,
                    password: loginPassword.value
                })
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || translations[currentLang].loginFailed);
            }
            
            // Store token
            localStorage.setItem('sandrive-token', data.token);
            
            // Show success message
            showStatus(translations[currentLang].loginSuccess, 'success');
            
            // Update UI
            showAuthenticatedUI(data.user);
            
        } catch (error) {
            console.error('Login error:', error);
            showAuthError(loginError, error.message || translations[currentLang].loginFailed);
        } finally {
            // Re-enable button
            loginBtn.disabled = false;
        }
    }
    
    async function handleRegister(e) {
        e.preventDefault();
        
        // Validate form
        if (!registerUsername.value || !registerEmail.value || !registerPassword.value || !registerConfirmPassword.value) {
            showAuthError(registerError, 'Please fill in all fields.');
            return;
        }
        
        // Check if passwords match
        if (registerPassword.value !== registerConfirmPassword.value) {
            showAuthError(registerError, translations[currentLang].passwordMismatch);
            return;
        }
        
        // Disable button during registration
        registerBtn.disabled = true;
        
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: registerUsername.value,
                    email: registerEmail.value,
                    password: registerPassword.value
                })
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || translations[currentLang].registerFailed);
            }
            
            // Show success message
            showAuthError(registerError, translations[currentLang].registerSuccess, true);
            
            // Switch to login tab after a delay
            setTimeout(() => {
                switchAuthTab('login');
                loginUsername.value = registerUsername.value;
            }, 2000);
            
        } catch (error) {
            console.error('Registration error:', error);
            showAuthError(registerError, error.message || translations[currentLang].registerFailed);
        } finally {
            // Re-enable button
            registerBtn.disabled = false;
        }
    }
    
    function handleLogout() {
        // Remove token
        localStorage.removeItem('sandrive-token');
        
        // Update UI
        showUnauthenticatedUI();
    }
    
    function showAuthError(element, message, isSuccess = false) {
        element.textContent = message;
        element.style.display = 'block';
        
        if (isSuccess) {
            element.style.backgroundColor = '#ecfdf5';
            element.style.color = '#065f46';
            element.style.borderColor = '#a7f3d0';
        } else {
            element.style.backgroundColor = '#fff1f2';
            element.style.color = '#be123c';
            element.style.borderColor = '#fecdd3';
        }
    }
    
    // Functions - Language
    function switchLanguage(lang, save = true) {
        currentLang = lang;
        
        // Save language preference
        if (save) {
            localStorage.setItem('sandrive-lang', lang);
        }
        
        // Update active button
        if (lang === 'ko') {
            langKoBtn.classList.add('active');
            langEnBtn.classList.remove('active');
        } else {
            langEnBtn.classList.add('active');
            langKoBtn.classList.remove('active');
        }
        
        // Update text elements - Common
        tagline.textContent = translations[lang].tagline;
        uploadTitle.textContent = translations[lang].uploadTitle;
        uploadDesc.textContent = translations[lang].uploadDesc;
        filesTitle.textContent = translations[lang].filesTitle;
        searchInput.placeholder = translations[lang].searchPlaceholder;
        loadingText.textContent = translations[lang].loadingText;
        noFilesText.textContent = translations[lang].noFilesText;
        thName.textContent = translations[lang].thName;
        thSize.textContent = translations[lang].thSize;
        thUploaded.textContent = translations[lang].thUploaded;
        thActions.textContent = translations[lang].thActions;
        footerText.textContent = translations[lang].footerText;
        
        // Update text elements - Auth
        loginTabText.textContent = translations[lang].loginTab;
        registerTabText.textContent = translations[lang].registerTab;
        loginUsernameLabel.textContent = translations[lang].loginUsernameLabel;
        loginPasswordLabel.textContent = translations[lang].loginPasswordLabel;
        registerUsernameLabel.textContent = translations[lang].registerUsernameLabel;
        registerEmailLabel.textContent = translations[lang].registerEmailLabel;
        registerPasswordLabel.textContent = translations[lang].registerPasswordLabel;
        registerConfirmPasswordLabel.textContent = translations[lang].registerConfirmPasswordLabel;
        loginBtnText.textContent = translations[lang].loginBtn;
        registerBtnText.textContent = translations[lang].registerBtn;
        logoutText.textContent = translations[lang].logoutBtn;
        
        // Update button text
        browseBtn.textContent = selectedFiles.length > 0 ? 
            translations[lang].addMoreBtn : translations[lang].browseBtn;
            
        // Update upload button if it exists
        if (uploadBtn) {
            const icon = uploadBtn.querySelector('i').outerHTML;
            uploadBtn.innerHTML = icon + ' ' + translations[lang].uploadBtn;
        }
    }

    // Functions - File Upload
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight() {
        dropArea.classList.add('drag-over');
    }

    function unhighlight() {
        dropArea.classList.remove('drag-over');
    }

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }

    function handleFileSelect(e) {
        const files = e.target.files;
        handleFiles(files);
    }

    function handleFiles(files) {
        if (files.length === 0) return;
        
        // Store the selected files
        selectedFiles = Array.from(files);
        
        // Create and add the upload button
        createUploadButton();
        
        // Update the browse button text
        browseBtn.textContent = translations[currentLang].addMoreBtn;
        
        // Show status message with file names
        let fileNames = selectedFiles.map(file => file.name).join(', ');
        if (selectedFiles.length > 3) {
            const extraFiles = selectedFiles.length - 3;
            fileNames = selectedFiles.slice(0, 3).map(file => file.name).join(', ') + ` and ${extraFiles} more`;
        }
        
        showStatus(`${translations[currentLang].fileSelected}: ${fileNames}. ${translations[currentLang].clickToUpload}`, 'success');
    }
    
    function createUploadButton() {
        // Remove existing button if it exists
        removeUploadButton();
        
        // Create the button
        uploadBtn = document.createElement('button');
        uploadBtn.id = 'upload-btn';
        uploadBtn.innerHTML = `<i class="fas fa-palm-tree"></i> ${translations[currentLang].uploadBtn}`;
        uploadBtn.style.backgroundColor = '#0d9488'; // Turquoise color for oasis theme
        uploadBtn.style.color = 'white';
        uploadBtn.style.border = 'none';
        uploadBtn.style.padding = '10px 20px';
        uploadBtn.style.borderRadius = '5px';
        uploadBtn.style.fontSize = '1rem';
        uploadBtn.style.cursor = 'pointer';
        uploadBtn.style.marginTop = '15px';
        uploadBtn.style.transition = 'background-color 0.3s';
        uploadBtn.style.width = '100%';
        uploadBtn.style.maxWidth = '200px';
        uploadBtn.style.fontWeight = 'bold';
        
        // Add hover effect
        uploadBtn.addEventListener('mouseover', () => {
            uploadBtn.style.backgroundColor = '#0f766e';
        });
        
        uploadBtn.addEventListener('mouseout', () => {
            uploadBtn.style.backgroundColor = '#0d9488';
        });
        
        // Add event listener for click
        uploadBtn.addEventListener('click', handleUpload);
        
        // Add the button to the upload-content div
        const uploadContent = document.querySelector('.upload-content');
        
        // Also update the drop area to indicate files are selected
        dropArea.style.borderColor = '#e67e22'; // Orange for desert sun
        dropArea.style.backgroundColor = '#fff7ed'; // Light orange background
        
        uploadContent.appendChild(uploadBtn);
    }
    
    function removeUploadButton() {
        // Remove the button if it exists
        if (uploadBtn) {
            // Add a fade-out effect
            uploadBtn.style.opacity = '0';
            uploadBtn.style.transition = 'opacity 0.5s';
            
            // Remove after animation completes
            setTimeout(() => {
                if (uploadBtn && uploadBtn.parentNode) {
                    uploadBtn.remove();
                    uploadBtn = null;
                }
            }, 500);
        }
    }
    
    function handleUpload() {
        if (selectedFiles.length === 0) return;
        
        // Show progress bar
        uploadProgress.style.display = 'block';
        progressBar.style.width = '0%';
        progressText.textContent = '0%';
        
        // Hide previous status
        uploadStatus.style.display = 'none';
        uploadStatus.className = '';
        
        // Disable the upload button during upload
        if (uploadBtn) {
            uploadBtn.disabled = true;
            uploadBtn.style.backgroundColor = '#9ca3af';
            uploadBtn.style.cursor = 'not-allowed';
            uploadBtn.innerHTML = `<i class="fas fa-sun fa-spin"></i> ${translations[currentLang].uploadingBtn}`;
        }
        
        // Upload each file
        selectedFiles.forEach(file => uploadFile(file));
        
        // Reset selected files
        selectedFiles = [];
        
        // Reset the browse button text
        browseBtn.textContent = translations[currentLang].browseBtn;
        
        // Reset the drop area style
        dropArea.style.borderColor = '';
        dropArea.style.backgroundColor = '';
    }

    async function uploadFile(file) {
        const formData = new FormData();
        formData.append('file', file);
        
        // Get auth token
        const token = localStorage.getItem('sandrive-token');
        
        try {
            const response = await fetch('/api/files/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData,
                // Track upload progress
                xhr: () => {
                    const xhr = new XMLHttpRequest();
                    xhr.upload.addEventListener('progress', (e) => {
                        if (e.lengthComputable) {
                            const percentComplete = Math.round((e.loaded / e.total) * 100);
                            updateProgress(percentComplete);
                        }
                    });
                    return xhr;
                }
            });
            
            if (!response.ok) {
                throw new Error('Upload failed');
            }
            
            const result = await response.json();
            
            // Show success message
            showStatus(translations[currentLang].fileUploaded, 'success');
            
            // Reload file list
            loadFiles();
            
            // Remove the upload button if all files are uploaded
            if (selectedFiles.length === 0) {
                removeUploadButton();
            }
            
        } catch (error) {
            console.error('Error uploading file:', error);
            showStatus(translations[currentLang].uploadFailed, 'error');
            updateProgress(0);
        }
    }

    function updateProgress(percent) {
        progressBar.style.width = `${percent}%`;
        progressText.textContent = `${percent}%`;
        
        if (percent === 100) {
            // Hide progress after a delay
            setTimeout(() => {
                uploadProgress.style.display = 'none';
            }, 2000);
        }
    }

    function showStatus(message, type) {
        uploadStatus.textContent = message;
        uploadStatus.className = type;
        uploadStatus.style.display = 'block';
        
        // Hide status after a delay
        setTimeout(() => {
            uploadStatus.style.display = 'none';
        }, 5000);
    }

    async function loadFiles() {
        // Show loading spinner
        loadingSpinner.style.display = 'flex';
        noFiles.style.display = 'none';
        filesTable.style.display = 'none';
        
        // Get auth token
        const token = localStorage.getItem('sandrive-token');
        
        try {
            const response = await fetch('/api/files', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch files');
            }
            
            const files = await response.json();
            
            // Hide loading spinner
            loadingSpinner.style.display = 'none';
            
            // Display files or show empty state
            if (files.length === 0) {
                noFiles.style.display = 'flex';
                filesTable.style.display = 'none';
            } else {
                noFiles.style.display = 'none';
                filesTable.style.display = 'table';
                renderFiles(files);
            }
            
        } catch (error) {
            console.error('Error loading files:', error);
            loadingSpinner.style.display = 'none';
            showStatus(translations[currentLang].loadFailed, 'error');
        }
    }

    function renderFiles(files) {
        // Clear existing rows
        filesTableBody.innerHTML = '';
        
        // Sort files by upload date (newest first)
        files.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
        
        // Create and append file rows
        files.forEach(file => {
            const row = createFileRow(file);
            filesTableBody.appendChild(row);
        });
    }

    function createFileRow(file) {
        // Clone the template
        const template = fileRowTemplate.content.cloneNode(true);
        const row = template.querySelector('.file-row');
        
        // Set file data
        const nameElement = row.querySelector('.name-text');
        const sizeElement = row.querySelector('.file-size');
        const dateElement = row.querySelector('.file-date');
        const fileIcon = row.querySelector('.file-icon');
        const downloadBtn = row.querySelector('.download-btn');
        const deleteBtn = row.querySelector('.delete-btn');
        
        // Set file name
        nameElement.textContent = file.originalname;
        
        // Set file size
        sizeElement.textContent = formatFileSize(file.size);
        
        // Set upload date
        dateElement.textContent = formatDate(file.uploadDate);
        
        // Set file icon based on file type
        fileIcon.className = 'file-icon ' + getFileIconClass(file.originalname);
        
        // Set download button action
        downloadBtn.addEventListener('click', () => downloadFile(file.filename));
        
        // Set delete button action
        deleteBtn.addEventListener('click', () => deleteFile(file.filename));
        
        return row;
    }

    function getFileIconClass(filename) {
        const extension = filename.split('.').pop().toLowerCase();
        
        const iconMap = {
            // Images
            'jpg': 'fas fa-file-image',
            'jpeg': 'fas fa-file-image',
            'png': 'fas fa-file-image',
            'gif': 'fas fa-file-image',
            'svg': 'fas fa-file-image',
            
            // Documents
            'pdf': 'fas fa-file-pdf',
            'doc': 'fas fa-file-word',
            'docx': 'fas fa-file-word',
            'xls': 'fas fa-file-excel',
            'xlsx': 'fas fa-file-excel',
            'ppt': 'fas fa-file-powerpoint',
            'pptx': 'fas fa-file-powerpoint',
            'txt': 'fas fa-file-alt',
            
            // Code
            'html': 'fas fa-file-code',
            'css': 'fas fa-file-code',
            'js': 'fas fa-file-code',
            'json': 'fas fa-file-code',
            'xml': 'fas fa-file-code',
            
            // Archives
            'zip': 'fas fa-file-archive',
            'rar': 'fas fa-file-archive',
            '7z': 'fas fa-file-archive',
            'tar': 'fas fa-file-archive',
            'gz': 'fas fa-file-archive',
            
            // Audio
            'mp3': 'fas fa-file-audio',
            'wav': 'fas fa-file-audio',
            'ogg': 'fas fa-file-audio',
            
            // Video
            'mp4': 'fas fa-file-video',
            'avi': 'fas fa-file-video',
            'mov': 'fas fa-file-video',
            'wmv': 'fas fa-file-video'
        };
        
        return iconMap[extension] || 'fas fa-file';
    }

    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffSec = Math.round(diffMs / 1000);
        const diffMin = Math.round(diffSec / 60);
        const diffHour = Math.round(diffMin / 60);
        const diffDay = Math.round(diffHour / 24);
        
        // If less than a day, show relative time
        if (diffDay < 1) {
            if (diffHour < 1) {
                if (diffMin < 1) {
                    return translations[currentLang].justNow;
                }
                return `${diffMin} ${diffMin !== 1 ? 
                    translations[currentLang].minutesAgo : 
                    translations[currentLang].minuteAgo}`;
            }
            return `${diffHour} ${diffHour !== 1 ? 
                translations[currentLang].hoursAgo : 
                translations[currentLang].hourAgo}`;
        }
        
        // If less than a week, show day of week
        if (diffDay < 7) {
            const options = { weekday: 'long' };
            return date.toLocaleDateString(undefined, options);
        }
        
        // Otherwise show full date
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    }

    async function downloadFile(filename) {
        // Get auth token
        const token = localStorage.getItem('sandrive-token');
        
        // Create a temporary link
        const link = document.createElement('a');
        link.href = `/api/files/download/${filename}`;
        link.setAttribute('download', '');
        
        // Add auth token to the request
        const xhr = new XMLHttpRequest();
        xhr.open('GET', link.href);
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);
        xhr.responseType = 'blob';
        
        xhr.onload = function() {
            if (xhr.status === 200) {
                const blob = new Blob([xhr.response], { type: xhr.getResponseHeader('Content-Type') });
                const url = window.URL.createObjectURL(blob);
                link.href = url;
                link.click();
                window.URL.revokeObjectURL(url);
            } else {
                showStatus(translations[currentLang].downloadFailed, 'error');
            }
        };
        
        xhr.send();
    }

    async function deleteFile(filename) {
        if (!confirm(translations[currentLang].deleteConfirm)) {
            return;
        }
        
        // Get auth token
        const token = localStorage.getItem('sandrive-token');
        
        try {
            const response = await fetch(`/api/files/${filename}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to delete file');
            }
            
            // Show success message
            showStatus(translations[currentLang].deleteSuccess, 'success');
            
            // Reload file list
            loadFiles();
            
        } catch (error) {
            console.error('Error deleting file:', error);
            showStatus(translations[currentLang].deleteFailed, 'error');
        }
    }

    function handleSearch(e) {
        const searchTerm = e.target.value.toLowerCase();
        const rows = filesTableBody.querySelectorAll('.file-row');
        
        rows.forEach(row => {
            const fileName = row.querySelector('.name-text').textContent.toLowerCase();
            
            if (fileName.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }
});