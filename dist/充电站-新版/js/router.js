;(function(){
  const view = document.getElementById('view')
  const menu = document.getElementById('menu')
  const sidebar = document.getElementById('sidebar')
  const mobileMenuBtn = document.getElementById('mobileMenuBtn')
  const collapseBtn = document.getElementById('collapseBtn')
  const systemSubmenu = document.getElementById('systemSubmenu')

  const pageTitles = {
    '#/dashboard': '数据概览',
    '#/sites': '站点管理',
    '#/piles': '充电桩管理',
    '#/orders': '充电订单管理',
    '#/users': '用户管理',
    '#/analytics': '数据分析',
    '#/alerts': '告警管理',
    '#/system/menus': '菜单管理',
    '#/system/roles': '角色管理',
    '#/system/users': '人员管理',
    '#/system/logs': '日志管理'
  }

  function renderPlaceholder(title){
    view.innerHTML = `
      <div class="card" style="margin:20px;padding:40px;text-align:center">
        <h2 style="margin:0 0 20px 0;font-size:24px;font-weight:600;color:var(--text)">${title}</h2>
        <p style="font-size:16px;color:var(--muted)">页面开发中...</p>
      </div>
    `
  }

  function renderIframe(src) {
    view.innerHTML = `<iframe id="contentFrame" src="${src}" style="width:100%;height:calc(100vh - 64px);border:none;display:block"></iframe>`

    // 监听 iframe 加载完成后隐藏其内部的 header 和 sidebar
    setTimeout(() => {
      const iframe = document.getElementById('contentFrame');
      if (iframe) {
        iframe.onload = () => {
          try {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            const style = iframeDoc.createElement('style');
            style.textContent = `
              .fixed-header, .fixed-sidebar { display: none !important; }
              .page-wrap { padding-top: 0 !important; padding-left: 0 !important; }
              body { margin: 0 !important; }
            `;
            iframeDoc.head.appendChild(style);
          } catch (e) {
            console.warn('无法访问 iframe 内容:', e);
          }
        };
      }
    }, 0);
  }

  const routes = {
    '#/dashboard': () => window.renderHome(view),
    '#/sites': () => window.renderSites(view),
    '#/piles': () => renderIframe('piles.html'),
    '#/users': () => window.renderUsers(view),
    '#/orders': () => renderIframe('orders.html'),
    '#/analytics': () => renderIframe('analytics.html'),
    '#/alerts': () => renderIframe('alerts.html'),
    '#/system/menus': () => renderIframe('menu-management.html'),
    '#/system/roles': () => renderIframe('role-management.html'),
    '#/system/users': () => renderIframe('user-management.html'),
    '#/system/logs': () => renderIframe('log-management.html')
  }

  function placeholder(title){
    view.innerHTML = `<div class="card"><h2 style="margin:0 0 12px 0">${title}</h2><p>页面开发中...</p></div>`
  }

  function setActiveMenu(hash){
    const items = menu.querySelectorAll('.menu-item')
    items.forEach(el => el.classList.remove('active'))
    const active = menu.querySelector(`a[href="${hash}"]`)
    if(active){ active.classList.add('active') }
  }

  function onHashChange(){
    const hash = location.hash || '#/dashboard'
    const render = routes[hash] || routes['#/dashboard']
    render()
    setActiveMenu(hash)
    sidebar.classList.remove('open')

    // 更新页面标题
    const pageTitle = document.querySelector('.page-title')
    if(pageTitle){
      pageTitle.textContent = pageTitles[hash] || '数据概览'
    }

    // 展开系统管理子菜单当路由在其下
    if(hash.startsWith('#/system/')){
      if(systemSubmenu){
        systemSubmenu.classList.add('show')
        const arrow = document.querySelector('.menu-item-toggle .submenu-arrow')
        if(arrow) arrow.style.transform = 'rotate(90deg)'
      }
    } else {
      // 收起系统管理子菜单
      if(systemSubmenu){
        systemSubmenu.classList.remove('show')
        const arrow = document.querySelector('.menu-item-toggle .submenu-arrow')
        if(arrow) arrow.style.transform = 'rotate(0deg)'
      }
    }
  }

  menu.addEventListener('click', (e)=>{
    const a = e.target.closest('a')
    if(!a) return
    setActiveMenu(a.getAttribute('href'))
  })

  // 移动端菜单按钮
  mobileMenuBtn && mobileMenuBtn.addEventListener('click', ()=>{
    sidebar.classList.toggle('open')
  })

  collapseBtn && collapseBtn.addEventListener('click', ()=>{
    document.body.classList.toggle('sidebar-collapsed')
  })

  menu.addEventListener('click', (e)=>{
    const toggle = e.target.closest('[data-toggle="submenu"]')
    if(toggle){
      const sub = document.getElementById('systemSubmenu')
      const arrow = toggle.querySelector('.submenu-arrow')
      if(sub){
        sub.classList.toggle('show')
        if(arrow){
          arrow.style.transform = sub.classList.contains('show') ? 'rotate(90deg)' : 'rotate(0deg)'
        }
      }
    }
  })

  // 语言切换按钮
  const langToggle = document.getElementById('langToggle')
  langToggle && langToggle.addEventListener('click', ()=>{
    const isEn = document.documentElement.getAttribute('lang') === 'en'
    document.documentElement.setAttribute('lang', isEn ? 'zh-CN' : 'en')
    alert(isEn ? '已切换到中文' : 'Switched to English')
  })

  // 消息通知按钮
  const notificationBtn = document.getElementById('notificationBtn')
  notificationBtn && notificationBtn.addEventListener('click', ()=>{
    alert('您有 5 条新消息')
  })

  // 用户菜单下拉
  const userMenuBtn = document.getElementById('userMenuBtn')
  const userDropdown = document.getElementById('userDropdown')

  userMenuBtn && userMenuBtn.addEventListener('click', (e)=>{
    e.stopPropagation()
    userDropdown.classList.toggle('show')
  })

  // 点击外部关闭下拉菜单
  document.addEventListener('click', (e)=>{
    if(userDropdown && !e.target.closest('.user-menu')){
      userDropdown.classList.remove('show')
    }
  })

  // 退出登录按钮
  const logoutBtn = document.getElementById('logoutBtn')
  logoutBtn && logoutBtn.addEventListener('click', ()=>{
    if(confirm('确定要退出登录吗？')) {
      alert('已退出登录')
      userDropdown.classList.remove('show')
      // window.location.href = 'login.html'
    }
  })

  window.appRouter = {
    init(){
      window.addEventListener('hashchange', onHashChange)
      if(!location.hash) location.hash = '#/dashboard'
      onHashChange()
    }
  }
})()


