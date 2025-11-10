;(function(){
  // Mock data
  const mockSites = [
    { id: 1, code: 'SH001', name: '虹桥枢纽充电站', region: '长宁区', address: '上海市长宁区虹桥路2550号', pileCount: 24, createTime: '2024-01-15 10:30:00' },
    { id: 2, code: 'SH002', name: '张江高科充电站', region: '浦东新区', address: '上海市浦东新区张江高科技园区', pileCount: 18, createTime: '2024-01-20 14:20:00' },
    { id: 3, code: 'SH003', name: '徐家汇中心充电站', region: '徐汇区', address: '上海市徐汇区肇嘉浜路1000号', pileCount: 32, createTime: '2024-02-01 09:15:00' },
    { id: 4, code: 'SH004', name: '外滩观光充电站', region: '黄浦区', address: '上海市黄浦区中山东一路1号', pileCount: 16, createTime: '2024-02-10 16:45:00' },
    { id: 5, code: 'SH005', name: '临港新片区充电站', region: '浦东新区', address: '上海市浦东新区临港新片区', pileCount: 28, createTime: '2024-02-15 11:30:00' },
    { id: 6, code: 'SH006', name: '静安寺充电站', region: '静安区', address: '上海市静安区南京西路1600号', pileCount: 20, createTime: '2024-02-20 13:20:00' },
    { id: 7, code: 'SH007', name: '人民广场充电站', region: '黄浦区', address: '上海市黄浦区人民大道200号', pileCount: 22, createTime: '2024-02-25 15:10:00' },
    { id: 8, code: 'SH008', name: '陆家嘴金融充电站', region: '浦东新区', address: '上海市浦东新区陆家嘴环路1000号', pileCount: 30, createTime: '2024-03-01 10:00:00' },
    { id: 9, code: 'SH009', name: '五角场充电站', region: '杨浦区', address: '上海市杨浦区淞沪路200号', pileCount: 26, createTime: '2024-03-05 14:30:00' },
    { id: 10, code: 'SH010', name: '莘庄地铁站充电站', region: '闵行区', address: '上海市闵行区莘庄镇莘建路1号', pileCount: 14, createTime: '2024-03-10 12:15:00' }
  ];

  let currentPage = 1;
  const pageSize = 10;
  let filteredSites = [...mockSites];

  function loadTailwind() {
    if (!document.getElementById('tailwind-script')) {
      const script = document.createElement('script');
      script.id = 'tailwind-script';
      script.src = 'https://cdn.tailwindcss.com';
      document.head.appendChild(script);

      script.onload = () => {
        if (window.tailwind) {
          tailwind.config = {
            theme: {
              extend: {
                colors: { primary: '#007AFF', success: '#10b981', warning: '#f59e0b', error: '#ef4444' }
              }
            }
          };
        }
      };
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
            <!-- Search Fields -->
            <div class="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm text-gray-600 mb-2">站点名称</label>
                <input type="text" id="siteName" placeholder="请输入站点名称" class="w-full h-9 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-2">站点编号</label>
                <input type="text" id="siteCode" placeholder="请输入站点编号" class="w-full h-9 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-2">所属区域</label>
                <select id="region" class="w-full h-9 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">全部区域</option>
                  <option value="浦东新区">浦东新区</option>
                  <option value="黄浦区">黄浦区</option>
                  <option value="静安区">静安区</option>
                  <option value="徐汇区">徐汇区</option>
                  <option value="长宁区">长宁区</option>
                  <option value="杨浦区">杨浦区</option>
                  <option value="闵行区">闵行区</option>
                </select>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex items-center gap-3">
              <button id="searchBtn" class="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700">查询</button>
              <button id="resetBtn" class="px-4 py-2 bg-gray-500 text-white text-sm font-medium rounded-lg hover:bg-gray-600">重置</button>
              <button id="addBtn" class="px-5 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700">新增站点</button>
            </div>
          </div>
        </div>

        <!-- Table Card -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <!-- Table Header -->
          <div class="bg-gray-100 px-6 py-4 border-b border-gray-200">
            <div class="grid grid-cols-7 gap-4 text-base font-medium text-gray-900">
              <div>站点编号</div>
              <div>站点名称</div>
              <div>所属区域</div>
              <div>地址</div>
              <div>充电桩数量</div>
              <div>创建时间</div>
              <div>操作</div>
            </div>
          </div>

          <!-- Table Body -->
          <div id="tableBody" class="divide-y divide-gray-200"></div>

          <!-- Pagination -->
          <div class="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div class="flex items-center justify-between">
              <div class="text-sm text-gray-600">共 <span id="totalCount">0</span> 条记录</div>
              <div class="flex items-center gap-2">
                <button id="prevBtn" class="px-3 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">上一页</button>
                <div id="pageNumbers" class="flex items-center gap-1"></div>
                <button id="nextBtn" class="px-3 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">下一页</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Delete Modal -->
        <div id="deleteModal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50">
          <div class="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900">确认删除</h3>
                <p class="text-sm text-gray-600">此操作不可撤销</p>
              </div>
            </div>
            <p class="text-gray-700 mb-6">确定要删除站点 "<span id="deleteSiteName"></span>" 吗？</p>
            <div class="flex gap-3 justify-end">
              <button id="cancelDelete" class="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">取消</button>
              <button id="confirmDelete" class="px-4 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700">删除</button>
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
    const pageData = filteredSites.slice(startIndex, startIndex + pageSize);
    const tableBody = document.getElementById('tableBody');

    if (!tableBody) return;

    tableBody.innerHTML = pageData.map(site => `
      <div class="grid grid-cols-7 gap-4 px-6 py-4 h-14 items-center hover:bg-gray-50">
        <div class="text-sm text-gray-900 font-medium">${site.code}</div>
        <div class="text-sm text-gray-900">${site.name}</div>
        <div class="text-sm text-gray-600">${site.region}</div>
        <div class="text-sm text-gray-600 truncate" title="${site.address}">${site.address}</div>
        <div class="text-sm text-gray-900">${site.pileCount}</div>
        <div class="text-sm text-gray-600">${site.createTime}</div>
        <div class="flex items-center gap-2">
          <button onclick="window.siteFunctions.edit(${site.id})" class="p-2 text-orange-500 hover:bg-orange-50 rounded-lg" title="编辑">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
          </button>
          <button onclick="window.siteFunctions.delete(${site.id}, '${site.name}')" class="p-2 text-red-600 hover:bg-red-50 rounded-lg" title="删除">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </button>
        </div>
      </div>
    `).join('');
  }

  function renderPagination() {
    const totalPages = Math.ceil(filteredSites.length / pageSize);
    const pageNumbers = document.getElementById('pageNumbers');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const totalCount = document.getElementById('totalCount');

    if (!pageNumbers || !prevBtn || !nextBtn || !totalCount) return;

    totalCount.textContent = filteredSites.length;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);
    if (endPage - startPage < 4) startPage = Math.max(1, endPage - 4);

    let html = '';
    for (let i = startPage; i <= endPage; i++) {
      html += `<button onclick="window.siteFunctions.goToPage(${i})" class="px-3 py-2 text-sm rounded-lg ${i === currentPage ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}">${i}</button>`;
    }
    pageNumbers.innerHTML = html;
  }

  function bindEvents() {
    const searchBtn = document.getElementById('searchBtn');
    const resetBtn = document.getElementById('resetBtn');
    const addBtn = document.getElementById('addBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const cancelDelete = document.getElementById('cancelDelete');
    const confirmDelete = document.getElementById('confirmDelete');

    if (searchBtn) searchBtn.onclick = search;
    if (resetBtn) resetBtn.onclick = reset;
    if (addBtn) addBtn.onclick = () => alert('跳转到新增站点页面');
    if (prevBtn) prevBtn.onclick = () => window.siteFunctions.goToPage(currentPage - 1);
    if (nextBtn) nextBtn.onclick = () => window.siteFunctions.goToPage(currentPage + 1);
    if (cancelDelete) cancelDelete.onclick = hideDeleteModal;
    if (confirmDelete) confirmDelete.onclick = confirmDeleteFn;
  }

  function search() {
    const siteName = document.getElementById('siteName')?.value.trim() || '';
    const siteCode = document.getElementById('siteCode')?.value.trim() || '';
    const region = document.getElementById('region')?.value || '';

    filteredSites = mockSites.filter(site => {
      const nameMatch = !siteName || site.name.includes(siteName);
      const codeMatch = !siteCode || site.code.includes(siteCode);
      const regionMatch = !region || site.region === region;
      return nameMatch && codeMatch && regionMatch;
    });

    currentPage = 1;
    renderTable();
    renderPagination();
  }

  function reset() {
    const siteName = document.getElementById('siteName');
    const siteCode = document.getElementById('siteCode');
    const region = document.getElementById('region');

    if (siteName) siteName.value = '';
    if (siteCode) siteCode.value = '';
    if (region) region.value = '';

    filteredSites = [...mockSites];
    currentPage = 1;
    renderTable();
    renderPagination();
  }

  function goToPage(page) {
    const totalPages = Math.ceil(filteredSites.length / pageSize);
    if (page >= 1 && page <= totalPages) {
      currentPage = page;
      renderTable();
      renderPagination();
    }
  }

  function editSite(siteId) {
    const site = mockSites.find(s => s.id === siteId);
    alert(`编辑站点: ${site ? site.name : siteId}`);
  }

  function deleteSite(siteId, siteName) {
    const modal = document.getElementById('deleteModal');
    const nameSpan = document.getElementById('deleteSiteName');
    const confirmBtn = document.getElementById('confirmDelete');

    if (modal && nameSpan && confirmBtn) {
      nameSpan.textContent = siteName;
      confirmBtn.dataset.siteId = siteId;
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }
  }

  function hideDeleteModal() {
    const modal = document.getElementById('deleteModal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  }

  function confirmDeleteFn() {
    const confirmBtn = document.getElementById('confirmDelete');
    const siteId = parseInt(confirmBtn?.dataset.siteId);
    const index = mockSites.findIndex(s => s.id === siteId);

    if (index > -1) {
      mockSites.splice(index, 1);
      search();
      hideDeleteModal();
      alert('站点删除成功');
    }
  }

  window.renderSites = render;
  window.siteFunctions = {
    goToPage,
    edit: editSite,
    delete: deleteSite
  };
})();
