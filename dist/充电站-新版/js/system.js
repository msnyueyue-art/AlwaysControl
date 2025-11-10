;(function(){
  function renderMenus(container) {
    container.innerHTML = `
      <div style="padding:20px">
        <div class="card">
          <h2 style="margin:0 0 12px 0;font-size:24px;font-weight:600;color:var(--text)">菜单管理</h2>
          <p style="font-size:16px;color:var(--muted)">页面开发中...</p>
        </div>
      </div>
    `;
  }

  function renderRoles(container) {
    container.innerHTML = `
      <div style="padding:20px">
        <div class="card">
          <h2 style="margin:0 0 12px 0;font-size:24px;font-weight:600;color:var(--text)">角色管理</h2>
          <p style="font-size:16px;color:var(--muted)">页面开发中...</p>
        </div>
      </div>
    `;
  }

  function renderSystemUsers(container) {
    container.innerHTML = `
      <div style="padding:20px">
        <div class="card">
          <h2 style="margin:0 0 12px 0;font-size:24px;font-weight:600;color:var(--text)">人员管理</h2>
          <p style="font-size:16px;color:var(--muted)">页面开发中...</p>
        </div>
      </div>
    `;
  }

  function renderLogs(container) {
    container.innerHTML = `
      <div style="padding:20px">
        <div class="card">
          <h2 style="margin:0 0 12px 0;font-size:24px;font-weight:600;color:var(--text)">日志管理</h2>
          <p style="font-size:16px;color:var(--muted)">页面开发中...</p>
        </div>
      </div>
    `;
  }

  window.renderMenus = renderMenus;
  window.renderRoles = renderRoles;
  window.renderSystemUsers = renderSystemUsers;
  window.renderLogs = renderLogs;
})();
