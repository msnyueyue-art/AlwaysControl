// ==================== 模拟数据 ====================
const mockData = {
    bms: [
        {
            id: 1,
            name: 'BMS_V2.3.5_升级包',
            type: '升级包',
            versionNumber: 'V2.3.5',
            language: 'all', // BMS 升级包不区分语言
            format: 'ZIP',
            uploadDate: '2025-10-15 14:23:45',
            languageDisplay: '--',
            fileSize: '45.2 MB',
            systemType: '通用'
        },
        {
            id: 2,
            name: 'BMS_V2.3.4_升级包',
            type: '升级包',
            versionNumber: 'V2.3.4',
            language: 'all',
            format: 'RAR',
            uploadDate: '2025-10-10 09:15:30',
            languageDisplay: '--',
            fileSize: '42.8 MB',
            systemType: '通用'
        },
        {
            id: 3,
            name: 'BMS_V2.3.3_升级包',
            type: '升级包',
            versionNumber: 'V2.3.3',
            language: 'all',
            format: 'ZIP',
            uploadDate: '2025-10-05 16:42:18',
            languageDisplay: '--',
            fileSize: '40.5 MB',
            systemType: '通用'
        }
    ],
    docs: [
        {
            id: 5,
            name: '产品使用手册_2025版',
            type: '产品说明书',
            language: 'zh-CN',
            format: 'PDF',
            uploadDate: '2025-10-18 10:30:22',
            languageDisplay: '简体中文',
            fileSize: '28.5 MB',
            systemType: '通用'
        },
        {
            id: 6,
            name: 'User Manual_2025',
            type: '产品说明书',
            language: 'en',
            format: 'PDF',
            uploadDate: '2025-10-18 10:32:15',
            languageDisplay: 'English',
            fileSize: '27.8 MB',
            systemType: '通用'
        },
        {
            id: 7,
            name: '隐私政策',
            type: '隐私政策',
            language: 'zh-CN',
            format: 'PDF',
            uploadDate: '2025-10-12 15:48:33',
            languageDisplay: '简体中文',
            fileSize: '2.3 MB',
            systemType: '通用'
        },
        {
            id: 8,
            name: 'Privacy Policy',
            type: '隐私政策',
            language: 'en',
            format: 'PDF',
            uploadDate: '2025-10-12 15:50:07',
            languageDisplay: 'English',
            fileSize: '2.1 MB',
            systemType: '通用'
        },
        {
            id: 9,
            name: '用户服务协议',
            type: '用户协议',
            language: 'zh-CN',
            format: 'PDF',
            uploadDate: '2025-10-08 11:20:55',
            languageDisplay: '简体中文',
            fileSize: '3.8 MB',
            systemType: '通用'
        },
        {
            id: 10,
            name: 'ユーザーマニュアル',
            type: '产品说明书',
            language: 'ja',
            format: 'PDF',
            uploadDate: '2025-10-01 08:35:40',
            languageDisplay: '日本語',
            fileSize: '30.2 MB',
            systemType: '通用'
        }
    ]
};

// ==================== 语言配置 ====================
const i18n = {
    'zh-CN': {
        // 导航栏
        fileManagement: '文件管理',
        logout: '退出登录',

        // Tab标签
        bmsTab: 'BMS 升级包',
        docsTab: '文档资料',

        // 操作按钮
        uploadFile: '上传文件',
        allLanguages: '所有语言',
        view: '查看',
        edit: '编辑',
        delete: '删除',
        download: '下载',

        // 表格表头
        fileName: '文件名称',
        versionNumber: '版本号',
        fileType: '文件类型',
        language: '语言',
        fileFormat: '文件格式',
        uploadDate: '上传日期',
        actions: '操作',

        // 文件类型
        upgradePackage: '升级包',
        productManual: '产品说明书',
        privacyPolicy: '隐私政策',
        userAgreement: '用户协议',
        other: '其他',

        // 模态框
        uploadFileTitle: '上传文件',
        editFileTitle: '编辑文件',
        selectCategory: '选择分类',
        selectFileType: '文件类型',
        enterFileName: '文件名称',
        multiLanguageFiles: '多语言版本文件',
        selectLanguage: '选择语言',
        addLanguageVersion: '添加语言版本',
        cancel: '取消',
        confirmUpload: '确定上传',
        saveChanges: '保存修改',
        confirmDelete: '确认删除',
        deleteConfirmMsg: '确定要删除该文件吗？此操作不可恢复。',
        confirmDeleteBtn: '确定删除',

        // 提示信息
        noData: '暂无文件数据',
        uploadSuccess: '文件上传成功!',
        updateSuccess: '文件更新成功!',
        deleteSuccess: '文件已删除',
        pleaseSelectCategory: '请选择分类',
        pleaseSelectFileType: '请选择文件类型',
        pleaseEnterFileName: '请输入文件名称',
        uploadAtLeastOneFile: '请至少上传一个语言版本的文件',
        currentFile: '当前文件',

        // 占位符
        pleaseSelect: '请选择',
        enterFileNamePlaceholder: '请输入文件名称',
        clickOrDragFile: '点击选择文件或拖拽文件到此处',
        supportedFormats: '支持格式: PDF, DOC, DOCX, ZIP, RAR',

        // 文件详情弹框
        fileDetail: '文件详情',
        basicInfo: '基础信息',
        systemType: '系统类型',
        fileSize: '文件大小',
        languageVersionDownload: '语言版本下载',
        general: '通用'
    },
    'en': {
        // Navigation
        fileManagement: 'File Management',
        logout: 'Logout',

        // Tabs
        bmsTab: 'BMS Upgrade',
        docsTab: 'Documents',

        // Action buttons
        uploadFile: 'Upload File',
        allLanguages: 'All Languages',
        view: 'View',
        edit: 'Edit',
        delete: 'Delete',
        download: 'Download',

        // Table headers
        fileName: 'File Name',
        versionNumber: 'Version',
        fileType: 'File Type',
        language: 'Language',
        fileFormat: 'Format',
        uploadDate: 'Upload Date',
        actions: 'Actions',

        // File types
        upgradePackage: 'Upgrade Package',
        productManual: 'Product Manual',
        privacyPolicy: 'Privacy Policy',
        userAgreement: 'User Agreement',
        other: 'Other',

        // Modals
        uploadFileTitle: 'Upload File',
        editFileTitle: 'Edit File',
        selectCategory: 'Select Category',
        selectFileType: 'File Type',
        enterFileName: 'File Name',
        multiLanguageFiles: 'Multi-language Files',
        selectLanguage: 'Select Language',
        addLanguageVersion: 'Add Language Version',
        cancel: 'Cancel',
        confirmUpload: 'Upload',
        saveChanges: 'Save Changes',
        confirmDelete: 'Confirm Delete',
        deleteConfirmMsg: 'Are you sure you want to delete this file? This action cannot be undone.',
        confirmDeleteBtn: 'Confirm Delete',

        // Messages
        noData: 'No files available',
        uploadSuccess: 'File uploaded successfully!',
        updateSuccess: 'File updated successfully!',
        deleteSuccess: 'File deleted',
        pleaseSelectCategory: 'Please select a category',
        pleaseSelectFileType: 'Please select file type',
        pleaseEnterFileName: 'Please enter file name',
        uploadAtLeastOneFile: 'Please upload at least one language version',
        currentFile: 'Current file',

        // Placeholders
        pleaseSelect: 'Please select',
        enterFileNamePlaceholder: 'Enter file name',
        clickOrDragFile: 'Click to select file or drag file here',
        supportedFormats: 'Supported formats: PDF, DOC, DOCX, ZIP, RAR',

        // File Detail Modal
        fileDetail: 'File Details',
        basicInfo: 'Basic Information',
        systemType: 'System Type',
        fileSize: 'File Size',
        languageVersionDownload: 'Language Version Download',
        general: 'General'
    }
};

// ==================== 全局状态 ====================
let currentTab = 'bms';
let currentLanguageFilter = 'all';
let fileData = JSON.parse(JSON.stringify(mockData)); // 深拷贝数据
let deleteTargetId = null;
let isEditMode = false; // 是否为编辑模式
let editingFileId = null; // 正在编辑的文件ID
let currentLang = localStorage.getItem('language') || 'zh-CN'; // 当前语言

// ==================== DOM 元素 ====================
// 注意: elements 对象将在 init() 函数中初始化,确保 DOM 已加载
let elements = {};

// ==================== 工具函数 ====================
// 语言代码转显示名称
const languageMap = {
    'zh-CN': '简体中文',
    'en': 'English',
    'zh-TW': '繁体中文',
    'ja': '日本語'
};

// 格式化日期 - 直接返回 YYYY-MM-DD HH:mm:ss 格式
function formatDate(dateString) {
    return dateString; // 数据已经是 'YYYY-MM-DD HH:mm:ss' 格式
}

// 生成随机 ID
function generateId() {
    return Date.now() + Math.random();
}

// ==================== 渲染文件列表 ====================
function renderFileList() {
    const data = fileData[currentTab];

    // 根据语言筛选
    // BMS 升级包不受语言筛选影响(language 为 'all'),其他分类按语言筛选
    const filteredData = currentLanguageFilter === 'all'
        ? data
        : data.filter(file => file.language === currentLanguageFilter || file.language === 'all');

    // 清空表格
    elements.fileTableBody.innerHTML = '';

    // 判断是否为空
    if (filteredData.length === 0) {
        elements.emptyState.style.display = 'block';
        elements.fileTableBody.closest('.file-table').style.display = 'none';
        return;
    }

    elements.emptyState.style.display = 'none';
    elements.fileTableBody.closest('.file-table').style.display = 'table';

    // 渲染数据
    filteredData.forEach(file => {
        const row = document.createElement('tr');
        // BMS 升级包不显示语言,显示 "--"
        const languageDisplay = currentTab === 'bms' ? '--' : file.languageDisplay;
        // 版本号显示：BMS升级包显示版本号，文档资料显示 "--"
        const versionDisplay = currentTab === 'bms' ? (file.versionNumber || '--') : '--';
        row.innerHTML = `
            <td><span class="file-name">${file.name}</span></td>
            <td>${versionDisplay}</td>
            <td>${file.type}</td>
            <td><span class="language-badge">${languageDisplay}</span></td>
            <td>${file.format}</td>
            <td>${formatDate(file.uploadDate)}</td>
            <td>
                <div class="actions">
                    <button class="btn btn-view" onclick="handleView(${file.id})">${i18n[currentLang].view}</button>
                    <button class="btn btn-edit" onclick="handleEdit(${file.id})">${i18n[currentLang].edit}</button>
                    <button class="btn btn-delete" onclick="handleDeleteClick(${file.id})">${i18n[currentLang].delete}</button>
                </div>
            </td>
        `;
        elements.fileTableBody.appendChild(row);
    });
}

// ==================== Tab 切换 ====================
function switchTab(tab) {
    currentTab = tab;

    // 更新 Tab 样式
    elements.tabs.forEach(tabElement => {
        if (tabElement.dataset.tab === tab) {
            tabElement.classList.add('active');
        } else {
            tabElement.classList.remove('active');
        }
    });

    // 重新渲染列表
    renderFileList();
}

// ==================== 语言筛选 ====================
function filterByLanguage(language) {
    currentLanguageFilter = language;
    renderFileList();
}

// ==================== 语言切换功能 ====================
function switchLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);

    // 更新语言切换按钮文字
    const langText = document.getElementById('langText');
    langText.textContent = lang === 'zh-CN' ? '中文' : 'English';

    // 更新所有带 data-i18n 属性的元素
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (i18n[lang] && i18n[lang][key]) {
            element.textContent = i18n[lang][key];
        }
    });

    // 重新渲染文件列表(更新动态生成的按钮文字)
    renderFileList();
}

function toggleLanguage() {
    const newLang = currentLang === 'zh-CN' ? 'en' : 'zh-CN';
    switchLanguage(newLang);
}

// ==================== 弹框控制 ====================
function showModal(modal) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function hideModal(modal) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

// ==================== 上传文件功能 ====================
// 根据分类更新文件类型选项
function updateFileTypeOptions(category) {
    const fileTypeSelect = document.getElementById('fileType');
    const allOptions = fileTypeSelect.querySelectorAll('option');
    const versionNumberGroup = document.getElementById('versionNumberGroup');

    // 重置选择
    fileTypeSelect.value = '';

    // 控制版本号字段的显示/隐藏
    if (category === 'bms') {
        versionNumberGroup.style.display = 'block';
    } else {
        versionNumberGroup.style.display = 'none';
    }

    // 根据分类显示/隐藏选项
    allOptions.forEach(option => {
        if (option.value === '') {
            // 保留默认的"请选择"选项
            option.style.display = '';
            return;
        }

        if (category === 'bms') {
            // BMS 升级包只显示"升级包"选项
            if (option.value === 'upgrade') {
                option.style.display = '';
                // 自动选择"升级包"
                fileTypeSelect.value = 'upgrade';
            } else {
                option.style.display = 'none';
            }
        } else if (category === 'docs') {
            // 文档资料显示除"升级包"外的所有选项
            if (option.value === 'upgrade') {
                option.style.display = 'none';
            } else {
                option.style.display = '';
            }
        } else {
            // 未选择分类时,显示所有选项
            option.style.display = '';
        }
    });

    // 处理语言选择框的显示/隐藏
    if (category === 'bms' && !isEditMode) {
        // BMS 升级包新增模式:隐藏语言选择框,显示简化的上传区域
        elements.languageVersions.innerHTML = `
            <div class="language-version-item">
                <div class="version-row version-row-simple">
                    <div class="file-upload-area">
                        <input type="file" class="file-input" accept=".pdf,.doc,.docx,.zip,.rar" required>
                        <div class="upload-placeholder">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="17 8 12 3 7 8"></polyline>
                                <line x1="12" y1="3" x2="12" y2="15"></line>
                            </svg>
                            <p>点击选择文件或拖拽文件到此处</p>
                            <span class="file-hint">支持格式: PDF, DOC, DOCX, ZIP, RAR</span>
                        </div>
                        <div class="file-name" style="display: none;"></div>
                    </div>
                </div>
            </div>
        `;
        // 隐藏"添加语言版本"按钮
        elements.addLanguageVersion.style.display = 'none';
    } else if (!isEditMode) {
        // 文档资料或未选择分类:显示语言选择框
        resetLanguageVersions();
        // 显示"添加语言版本"按钮
        elements.addLanguageVersion.style.display = '';
    }

    // 重新初始化文件上传事件
    initAllFileUploadEvents();
}

// 添加语言版本
function addLanguageVersion() {
    const versionItem = document.createElement('div');
    versionItem.className = 'language-version-item';
    versionItem.innerHTML = `
        <div class="version-row">
            <select class="language-select" required>
                <option value="">选择语言</option>
                <option value="zh-CN">简体中文</option>
                <option value="en">English</option>
                <option value="zh-TW">繁体中文</option>
                <option value="ja">日本語</option>
            </select>

            <div class="file-upload-area">
                <input type="file" class="file-input" accept=".pdf,.doc,.docx,.zip,.rar" required>
                <div class="upload-placeholder">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    <p>点击选择文件或拖拽文件到此处</p>
                    <span class="file-hint">支持格式: PDF, DOC, DOCX, ZIP, RAR</span>
                </div>
                <div class="file-name" style="display: none;"></div>
            </div>

            <button type="button" class="btn-remove-version" style="visibility: visible;">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
            </button>
        </div>
    `;

    elements.languageVersions.appendChild(versionItem);
    updateRemoveButtons();
    initFileUploadEvents(versionItem);
}

// 更新删除按钮显示状态
function updateRemoveButtons() {
    const items = elements.languageVersions.querySelectorAll('.language-version-item');
    items.forEach((item, index) => {
        const removeBtn = item.querySelector('.btn-remove-version');
        if (items.length > 1) {
            removeBtn.style.visibility = 'visible';
        } else {
            removeBtn.style.visibility = 'hidden';
        }
    });
}

// 初始化文件上传事件
function initFileUploadEvents(container) {
    const fileInput = container.querySelector('.file-input');
    const uploadArea = container.querySelector('.file-upload-area');
    const placeholder = container.querySelector('.upload-placeholder');
    const fileName = container.querySelector('.file-name');

    // 文件选择事件
    fileInput.addEventListener('change', function(e) {
        if (this.files.length > 0) {
            const file = this.files[0];
            placeholder.style.display = 'none';
            fileName.style.display = 'block';
            fileName.textContent = file.name;
        }
    });

    // 拖拽事件
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        placeholder.style.borderColor = '#27AE60';
        placeholder.style.backgroundColor = '#E8F8F0';
    });

    uploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        placeholder.style.borderColor = '';
        placeholder.style.backgroundColor = '';
    });

    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        placeholder.style.borderColor = '';
        placeholder.style.backgroundColor = '';

        if (e.dataTransfer.files.length > 0) {
            fileInput.files = e.dataTransfer.files;
            const file = e.dataTransfer.files[0];
            placeholder.style.display = 'none';
            fileName.style.display = 'block';
            fileName.textContent = file.name;
        }
    });
}

// 表单提交
function handleFormSubmit(e) {
    e.preventDefault();

    // 获取表单数据
    const formData = {
        category: document.getElementById('fileCategory').value,
        name: document.getElementById('fileName').value,
        type: document.getElementById('fileType').value,
        versionNumber: document.getElementById('versionNumber').value,
        versions: []
    };

    // 获取所有语言版本
    const versionItems = elements.languageVersions.querySelectorAll('.language-version-item');
    versionItems.forEach(item => {
        const languageSelect = item.querySelector('.language-select');
        const fileInput = item.querySelector('.file-input');

        // BMS 升级包没有语言选择框
        if (formData.category === 'bms') {
            // BMS 升级包使用 'all' 作为语言标识
            if (fileInput && (isEditMode || fileInput.files.length > 0)) {
                const file = fileInput.files.length > 0 ? fileInput.files[0] : null;
                formData.versions.push({
                    language: 'all',
                    languageDisplay: '--',
                    fileName: file ? file.name : '',
                    format: file ? file.name.split('.').pop().toUpperCase() : ''
                });
            }
        } else {
            // 文档资料需要语言选择
            const language = languageSelect ? languageSelect.value : '';
            if (language && fileInput && (isEditMode || fileInput.files.length > 0)) {
                const file = fileInput.files.length > 0 ? fileInput.files[0] : null;
                formData.versions.push({
                    language,
                    languageDisplay: languageMap[language],
                    fileName: file ? file.name : '',
                    format: file ? file.name.split('.').pop().toUpperCase() : ''
                });
            }
        }
    });

    // 验证
    if (formData.versions.length === 0 && !isEditMode) {
        alert('请至少上传一个语言版本的文件');
        return;
    }

    // 生成当前日期时间 - 格式: YYYY-MM-DD HH:mm:ss
    const now = new Date();
    const currentDate = now.getFullYear() + '-' +
                       String(now.getMonth() + 1).padStart(2, '0') + '-' +
                       String(now.getDate()).padStart(2, '0') + ' ' +
                       String(now.getHours()).padStart(2, '0') + ':' +
                       String(now.getMinutes()).padStart(2, '0') + ':' +
                       String(now.getSeconds()).padStart(2, '0');

    if (isEditMode) {
        // 编辑模式: 更新现有文件
        const file = findFileById(editingFileId);
        if (file) {
            file.name = formData.name;
            file.type = getTypeDisplay(formData.type);

            // 更新版本号（仅BMS升级包）
            if (formData.category === 'bms') {
                file.versionNumber = formData.versionNumber;
            }

            // 如果上传了新文件,更新格式和语言
            if (formData.versions.length > 0) {
                const version = formData.versions[0];
                if (version.fileName) {
                    file.format = version.format;
                }
                file.language = version.language;
                file.languageDisplay = version.languageDisplay;
            }

            alert('文件更新成功!');
        }
    } else {
        // 新增模式: 添加新文件
        formData.versions.forEach(version => {
            const newFile = {
                id: generateId(),
                name: formData.name,
                type: getTypeDisplay(formData.type),
                language: version.language,
                languageDisplay: version.languageDisplay,
                format: version.format,
                uploadDate: currentDate
            };

            // 添加版本号（仅BMS升级包）
            if (formData.category === 'bms') {
                newFile.versionNumber = formData.versionNumber;
            }

            fileData[formData.category].unshift(newFile);
        });

        alert('文件上传成功!');
    }

    // 关闭弹框并重置表单
    hideModal(elements.uploadModal);
    elements.uploadForm.reset();
    resetLanguageVersions();
    resetUploadModal();

    // 刷新列表
    renderFileList();
}

// 类型代码转显示名称
function getTypeDisplay(type) {
    const typeMap = {
        'upgrade': '升级包',
        'manual': '产品说明书',
        'privacy': '隐私政策',
        'terms': '用户协议',
        'other': '其他'
    };
    return typeMap[type] || type;
}

// 显示名称转类型代码(用于编辑时反向查找)
function getFileTypeValue(displayName) {
    const reverseMap = {
        '升级包': 'upgrade',
        '产品说明书': 'manual',
        '隐私政策': 'privacy',
        '用户协议': 'terms',
        '其他': 'other'
    };
    return reverseMap[displayName] || '';
}

// 重置上传弹框为新增模式
function resetUploadModal() {
    isEditMode = false;
    editingFileId = null;
    document.querySelector('#uploadModal .modal-header h2').textContent = '上传文件';
    document.querySelector('#uploadForm button[type="submit"]').textContent = '确定上传';
    // 清空版本号输入
    document.getElementById('versionNumber').value = '';
}

// 重置语言版本区域
function resetLanguageVersions() {
    elements.languageVersions.innerHTML = `
        <div class="language-version-item">
            <div class="version-row">
                <select class="language-select" required>
                    <option value="">选择语言</option>
                    <option value="zh-CN">简体中文</option>
                    <option value="en">English</option>
                    <option value="zh-TW">繁体中文</option>
                    <option value="ja">日本語</option>
                </select>

                <div class="file-upload-area">
                    <input type="file" class="file-input" accept=".pdf,.doc,.docx,.zip,.rar" required>
                    <div class="upload-placeholder">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="17 8 12 3 7 8"></polyline>
                            <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                        <p>点击选择文件或拖拽文件到此处</p>
                        <span class="file-hint">支持格式: PDF, DOC, DOCX, ZIP, RAR</span>
                    </div>
                    <div class="file-name" style="display: none;"></div>
                </div>

                <button type="button" class="btn-remove-version" style="visibility: hidden;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </button>
            </div>
        </div>
    `;
    initAllFileUploadEvents();
}

// 初始化所有文件上传事件
function initAllFileUploadEvents() {
    const versionItems = elements.languageVersions.querySelectorAll('.language-version-item');
    versionItems.forEach(item => initFileUploadEvents(item));
}

// ==================== 文件操作 ====================
// 编辑文件
function handleEdit(id) {
    const file = findFileById(id);
    if (!file) return;

    // 设置编辑模式
    isEditMode = true;
    editingFileId = id;

    // 获取文件所属分类
    let category = '';
    for (let cat in fileData) {
        if (fileData[cat].find(f => f.id === id)) {
            category = cat;
            break;
        }
    }

    // 填充表单数据
    document.getElementById('fileCategory').value = category;
    document.getElementById('fileName').value = file.name;

    // 根据文件类型反向查找 value
    const fileType = getFileTypeValue(file.type);
    document.getElementById('fileType').value = fileType;

    // 填充版本号（仅BMS升级包）
    if (category === 'bms' && file.versionNumber) {
        document.getElementById('versionNumber').value = file.versionNumber;
    }

    // 更新文件类型选项
    updateFileTypeOptions(category);
    // 重新设置文件类型(因为 updateFileTypeOptions 会重置)
    document.getElementById('fileType').value = fileType;

    // 处理语言版本 - BMS 升级包不需要语言选择
    if (category === 'bms') {
        // BMS 升级包使用简化的上传区域
        elements.languageVersions.innerHTML = `
            <div class="language-version-item">
                <div class="version-row version-row-simple">
                    <div class="file-upload-area">
                        <input type="file" class="file-input" accept=".pdf,.doc,.docx,.zip,.rar">
                        <div class="upload-placeholder">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="17 8 12 3 7 8"></polyline>
                                <line x1="12" y1="3" x2="12" y2="15"></line>
                            </svg>
                            <p>点击选择文件或拖拽文件到此处</p>
                            <span class="file-hint">支持格式: PDF, DOC, DOCX, ZIP, RAR</span>
                            <span class="file-hint-edit">当前文件: ${file.name}.${file.format.toLowerCase()}</span>
                        </div>
                        <div class="file-name" style="display: none;"></div>
                    </div>
                </div>
            </div>
        `;
    } else {
        // 文档资料显示语言选择
        resetLanguageVersions();
        const languageSelect = elements.languageVersions.querySelector('.language-select');
        languageSelect.value = file.language;

        // 显示当前文件信息
        const uploadPlaceholder = elements.languageVersions.querySelector('.upload-placeholder');
        const fileHint = uploadPlaceholder.querySelector('.file-hint');
        fileHint.insertAdjacentHTML('afterend', `<span class="file-hint-edit">当前文件: ${file.name}.${file.format.toLowerCase()}</span>`);
    }

    // 初始化文件上传事件
    initAllFileUploadEvents();

    // 更新弹框标题
    document.querySelector('#uploadModal .modal-header h2').textContent = '编辑文件';

    // 更新提交按钮文字
    document.querySelector('#uploadForm button[type="submit"]').textContent = '保存修改';

    // 打开弹框
    showModal(elements.uploadModal);
}

// 删除文件 - 点击删除按钮
function handleDeleteClick(id) {
    deleteTargetId = id;
    showModal(elements.deleteModal);
}

// 确认删除
function handleConfirmDelete() {
    if (deleteTargetId === null) return;

    // 从数据中删除
    for (let category in fileData) {
        const index = fileData[category].findIndex(file => file.id === deleteTargetId);
        if (index !== -1) {
            fileData[category].splice(index, 1);
            break;
        }
    }

    // 关闭弹框
    hideModal(elements.deleteModal);
    deleteTargetId = null;

    // 刷新列表
    renderFileList();

    // 提示成功
    alert('文件已删除');
}

// 根据 ID 查找文件
function findFileById(id) {
    for (let category in fileData) {
        const file = fileData[category].find(f => f.id === id);
        if (file) return file;
    }
    return null;
}

// ==================== 查看文件详情 ====================
function handleView(id) {
    const file = findFileById(id);
    if (!file) return;

    // 获取文件所属分类
    let category = '';
    for (let cat in fileData) {
        if (fileData[cat].find(f => f.id === id)) {
            category = cat;
            break;
        }
    }

    // 填充基础信息
    document.getElementById('detailFileName').textContent = `${file.name}.${file.format.toLowerCase()}`;
    document.getElementById('detailVersionNumber').textContent = (category === 'bms' && file.versionNumber) ? file.versionNumber : '--';
    document.getElementById('detailSystemType').textContent = i18n[currentLang].general;
    document.getElementById('detailFileFormat').textContent = `.${file.format}`;
    document.getElementById('detailFileSize').textContent = file.fileSize || 'N/A';
    document.getElementById('detailUploadDate').textContent = file.uploadDate;

    // 填充语言版本列表
    const versionListContainer = document.getElementById('versionList');
    versionListContainer.innerHTML = '';

    if (category === 'bms') {
        // BMS 升级包显示单一版本(不分语言)
        const versionItem = document.createElement('div');
        versionItem.className = 'version-item';
        versionItem.innerHTML = `
            <div class="version-info">
                <span class="version-language">${i18n[currentLang].general}</span>
                <span class="version-size">${file.fileSize}</span>
            </div>
            <button class="btn-download" onclick="handleDownload('${file.name}', '${file.format}')">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                ${i18n[currentLang].download}
            </button>
        `;
        versionListContainer.appendChild(versionItem);
    } else {
        // 文档资料:找到所有同名但不同语言的版本
        const sameName文件列表 = fileData[category].filter(f => f.name === file.name);

        sameName文件列表.forEach(langFile => {
            const versionItem = document.createElement('div');
            versionItem.className = 'version-item';
            versionItem.innerHTML = `
                <div class="version-info">
                    <span class="version-language">${langFile.languageDisplay}</span>
                    <span class="version-size">${langFile.fileSize}</span>
                </div>
                <button class="btn-download" onclick="handleDownload('${langFile.name}', '${langFile.format}', '${langFile.language}')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    ${i18n[currentLang].download}
                </button>
            `;
            versionListContainer.appendChild(versionItem);
        });
    }

    // 打开详情弹框
    showModal(elements.detailModal);
}

// 下载文件
function handleDownload(fileName, format, language = '') {
    const langSuffix = language && language !== 'all' ? `_${language}` : '';
    const fullFileName = `${fileName}${langSuffix}.${format.toLowerCase()}`;

    // 模拟下载提示
    const downloadMsg = currentLang === 'zh-CN'
        ? `正在下载: ${fullFileName}`
        : `Downloading: ${fullFileName}`;

    alert(downloadMsg);

    // 实际项目中,这里应该触发真实的文件下载
    // 例如: window.location.href = `/api/files/download?file=${encodeURIComponent(fullFileName)}`;
    console.log(`Download triggered for: ${fullFileName}`);
}

// ==================== 退出登录 ====================
function handleLogout() {
    if (confirm('确定要退出登录吗？')) {
        // 清除用户信息
        localStorage.removeItem('userToken');
        localStorage.removeItem('userData');

        // 跳转到登录页
        window.location.href = 'login.html';
    }
}

// ==================== 事件监听 ====================
function initEventListeners() {
    // Tab 切换
    elements.tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            switchTab(tab.dataset.tab);
        });
    });

    // 语言筛选
    elements.languageFilter.addEventListener('change', (e) => {
        filterByLanguage(e.target.value);
    });

    // 打开上传弹框
    elements.uploadBtn.addEventListener('click', () => {
        // 确保是新增模式
        resetUploadModal();

        // 根据当前 Tab 自动选择分类
        const categorySelect = document.getElementById('fileCategory');
        categorySelect.value = currentTab; // 自动选择当前 Tab 对应的分类

        // 触发分类变化事件,更新文件类型选项
        updateFileTypeOptions(currentTab);

        showModal(elements.uploadModal);
    });

    // 关闭上传弹框
    elements.closeModal.addEventListener('click', () => {
        hideModal(elements.uploadModal);
        elements.uploadForm.reset();
        resetLanguageVersions();
    });

    elements.cancelUpload.addEventListener('click', () => {
        hideModal(elements.uploadModal);
        elements.uploadForm.reset();
        resetLanguageVersions();
    });

    // 点击遮罩关闭弹框
    elements.uploadModal.addEventListener('click', (e) => {
        if (e.target === elements.uploadModal) {
            hideModal(elements.uploadModal);
            elements.uploadForm.reset();
            resetLanguageVersions();
        }
    });

    // 添加语言版本
    elements.addLanguageVersion.addEventListener('click', addLanguageVersion);

    // 删除语言版本 (事件委托)
    elements.languageVersions.addEventListener('click', (e) => {
        const removeBtn = e.target.closest('.btn-remove-version');
        if (removeBtn) {
            const item = removeBtn.closest('.language-version-item');
            item.remove();
            updateRemoveButtons();
        }
    });

    // 表单提交
    elements.uploadForm.addEventListener('submit', handleFormSubmit);

    // 分类选择变化时,更新文件类型选项
    const categorySelect = document.getElementById('fileCategory');
    categorySelect.addEventListener('change', (e) => {
        updateFileTypeOptions(e.target.value);
    });

    // 删除确认弹框
    elements.cancelDelete.addEventListener('click', () => {
        hideModal(elements.deleteModal);
        deleteTargetId = null;
    });

    elements.confirmDelete.addEventListener('click', handleConfirmDelete);

    elements.deleteModal.addEventListener('click', (e) => {
        if (e.target === elements.deleteModal) {
            hideModal(elements.deleteModal);
            deleteTargetId = null;
        }
    });

    // 详情弹框
    if (elements.closeDetailModal) {
        elements.closeDetailModal.addEventListener('click', () => {
            hideModal(elements.detailModal);
        });
    }

    // 点击遮罩关闭详情弹框
    if (elements.detailModal) {
        elements.detailModal.addEventListener('click', (e) => {
            if (e.target === elements.detailModal) {
                hideModal(elements.detailModal);
            }
        });
    }

    // ESC 键关闭弹框
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (elements.uploadModal.classList.contains('show')) {
                hideModal(elements.uploadModal);
                elements.uploadForm.reset();
                resetLanguageVersions();
            }
            if (elements.deleteModal.classList.contains('show')) {
                hideModal(elements.deleteModal);
                deleteTargetId = null;
            }
            if (elements.detailModal.classList.contains('show')) {
                hideModal(elements.detailModal);
            }
        }
    });

    // 退出登录
    if (elements.logoutBtn) {
        elements.logoutBtn.addEventListener('click', handleLogout);
    }

    // 语言切换
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
    }
}

// ==================== 初始化 ====================
function init() {
    // 首先初始化 DOM 元素引用(确保 DOM 已完全加载)
    elements = {
        tabs: document.querySelectorAll('.tab-item'),
        fileTableBody: document.getElementById('fileTableBody'),
        emptyState: document.getElementById('emptyState'),
        languageFilter: document.getElementById('languageFilter'),
        uploadBtn: document.getElementById('uploadBtn'),
        uploadModal: document.getElementById('uploadModal'),
        deleteModal: document.getElementById('deleteModal'),
        detailModal: document.getElementById('detailModal'),
        closeModal: document.getElementById('closeModal'),
        closeDetailModal: document.getElementById('closeDetailModal'),
        cancelUpload: document.getElementById('cancelUpload'),
        uploadForm: document.getElementById('uploadForm'),
        addLanguageVersion: document.getElementById('addLanguageVersion'),
        languageVersions: document.getElementById('languageVersions'),
        cancelDelete: document.getElementById('cancelDelete'),
        confirmDelete: document.getElementById('confirmDelete'),
        logoutBtn: document.getElementById('logoutBtn')
    };

    // 验证关键 DOM 元素是否成功获取
    if (!elements.fileTableBody || !elements.emptyState) {
        console.error('关键 DOM 元素获取失败,页面可能无法正常工作');
        return;
    }

    initEventListeners();
    initAllFileUploadEvents();

    // 应用保存的语言设置
    switchLanguage(currentLang);

    // 渲染文件列表
    renderFileList();
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// 将函数暴露到全局作用域,供 HTML onclick 使用
window.handleView = handleView;
window.handleEdit = handleEdit;
window.handleDeleteClick = handleDeleteClick;
window.handleDownload = handleDownload;
