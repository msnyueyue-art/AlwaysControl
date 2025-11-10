;(function(){
  // Mock data
  const MOCK_USERS = Array.from({length: 56}).map((_, i) => ({
    id: 1000 + i,
    username: 'user_' + (1000 + i),
    phone: '138' + String(10000000 + i).slice(0, 8),
    createdAt: '2024-0' + (1 + (i % 9)) + '-' + String(1 + (i % 28)).padStart(2, '0') + ' 10:00:00',
    status: i % 3 === 0 ? '禁用' : (i % 3 === 1 ? '正常' : '待验证')
  }));

  let currentPage = 1;
  const pageSize = 10;
  let filteredUsers = [...MOCK_USERS];

  function loadTailwind() {
    if (!document.getElementById('tailwind-script')) {
      const script = document.createElement('script');
      script.id = 'tailwind-script';
      script.src = 'https://cdn.tailwindcss.com';
      document.head.appendChild(script);
    }
  }

  function render(container) {
    loadTailwind();

    // 重置 view 容器的 grid 布局
    container.style.display = 'block';
    container.style.padding = '0';

    container.innerHTML = `
      <div style="min-height:100vh;padding:24px;background:#F8F9FA">
        <!-- Search Card -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div class="flex items-end gap-4">
            <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm text-gray-600 mb-2">用户名</label>
                <input type="text" id="username" placeholder="请输入用户名" class="w-52 h-9 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-2">手机号</label>
                <input type="text" id="phone" placeholder="请输入手机号" class="w-52 h-9 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              </div>
            </div>
            <div class="flex items-center gap-3">
              <button id="searchBtn" class="w-20 h-9 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700">查询</button>
              <button id="resetBtn" class="w-20 h-9 bg-gray-500 text-white text-sm font-medium rounded-lg hover:bg-gray-600">重置</button>
            </div>
          </div>
        </div>

        <!-- Table Card -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div class="bg-gray-100 px-6 py-4 grid grid-cols-5 text-base font-medium text-gray-900">
            <div>用户ID</div>
            <div>用户名</div>
            <div>手机号</div>
            <div>注册时间</div>
            <div>操作</div>
          </div>
          <div id="userTableBody" class="divide-y divide-gray-200"></div>

          <!-- Pagination -->
          <div class="px-6 py-3 border-t border-gray-200 bg-gray-50">
            <div class="flex items-center justify-between">
              <div class="text-sm text-gray-600">共 <span id="totalCount">0</span> 条记录</div>
              <div class="flex items-center gap-2">
                <button id="prevBtn" class="px-3 h-9 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50">上一页</button>
                <div id="pageNumbers" class="flex items-center gap-1"></div>
                <button id="nextBtn" class="px-3 h-9 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50">下一页</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    setTimeout(() => {
      renderTable();
      renderPagination();
      bindEvents();
    }, 100);
  }

  function renderTable() {
    const startIndex = (currentPage - 1) * pageSize;
    const pageData = filteredUsers.slice(startIndex, startIndex + pageSize);
    const tbody = document.getElementById('userTableBody');

    if (!tbody) return;

    tbody.innerHTML = pageData.map(user => `
      <div class="grid grid-cols-5 items-center px-6 h-14 text-center hover:bg-gray-50">
        <div class="text-sm text-gray-900">${user.id}</div>
        <div class="text-sm">${user.username}</div>
        <div class="text-sm">${user.phone}</div>
        <div class="text-sm">${user.createdAt}</div>
        <div>
          <button onclick="window.userFunctions.viewDetail(${user.id})" class="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">查看详情</button>
        </div>
      </div>
    `).join('');
  }

  function renderPagination() {
    const totalPages = Math.ceil(filteredUsers.length / pageSize);
    const pageNumbers = document.getElementById('pageNumbers');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const totalCount = document.getElementById('totalCount');

    if (!pageNumbers || !prevBtn || !nextBtn || !totalCount) return;

    totalCount.textContent = filteredUsers.length;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);
    if (endPage - startPage < 4) startPage = Math.max(1, endPage - 4);

    let html = '';
    for (let i = startPage; i <= endPage; i++) {
      html += `<button onclick="window.userFunctions.goToPage(${i})" class="px-3 h-9 rounded-lg text-sm ${i === currentPage ? 'bg-blue-600 text-white' : 'border border-gray-300 text-gray-600 hover:bg-gray-50'}">${i}</button>`;
    }
    pageNumbers.innerHTML = html;
  }

  function bindEvents() {
    const searchBtn = document.getElementById('searchBtn');
    const resetBtn = document.getElementById('resetBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (searchBtn) searchBtn.onclick = search;
    if (resetBtn) resetBtn.onclick = reset;
    if (prevBtn) prevBtn.onclick = () => window.userFunctions.goToPage(currentPage - 1);
    if (nextBtn) nextBtn.onclick = () => window.userFunctions.goToPage(currentPage + 1);
  }

  function search() {
    const username = document.getElementById('username')?.value.trim() || '';
    const phone = document.getElementById('phone')?.value.trim() || '';

    filteredUsers = MOCK_USERS.filter(user => {
      const usernameMatch = !username || user.username.includes(username);
      const phoneMatch = !phone || user.phone.includes(phone);
      return usernameMatch && phoneMatch;
    });

    currentPage = 1;
    renderTable();
    renderPagination();
  }

  function reset() {
    const usernameInput = document.getElementById('username');
    const phoneInput = document.getElementById('phone');

    if (usernameInput) usernameInput.value = '';
    if (phoneInput) phoneInput.value = '';

    filteredUsers = [...MOCK_USERS];
    currentPage = 1;
    renderTable();
    renderPagination();
  }

  function goToPage(page) {
    const totalPages = Math.ceil(filteredUsers.length / pageSize);
    if (page >= 1 && page <= totalPages) {
      currentPage = page;
      renderTable();
      renderPagination();
    }
  }

  function viewDetail(id) {
    const user = MOCK_USERS.find(u => u.id === id);
    if (user) {
      alert(`查看详情:\n用户名: ${user.username}\n手机号: ${user.phone}\n注册时间: ${user.createdAt}`);
    }
  }

  window.renderUsers = render;
  window.userFunctions = {
    goToPage,
    viewDetail
  };
})();
