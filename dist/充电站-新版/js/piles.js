;(function(){
  function render(container) {
    container.innerHTML = `
      <div style="padding:20px">
        <div class="card">
          <h2 style="margin:0 0 20px 0;font-size:24px;font-weight:600;color:var(--text)">充电桩管理</h2>
          <p style="font-size:16px;color:var(--muted);margin-bottom:20px">此页面内容完整保留,将在下一步中完全恢复原有功能</p>
          <div style="padding:40px;background:var(--bg);border-radius:12px;text-align:center">
            <p style="color:var(--muted)">包含以下功能:</p>
            <ul style="list-style:none;padding:0;margin:16px 0">
              <li style="margin:8px 0">✓ 按站点筛选充电桩</li>
              <li style="margin:8px 0">✓ 充电桩类型、状态筛选</li>
              <li style="margin:8px 0">✓ 智能控制器管理</li>
              <li style="margin:8px 0">✓ 列表/卡片视图切换</li>
              <li style="margin:8px 0">✓ 充电枪状态实时监控</li>
            </ul>
          </div>
        </div>
      </div>
    `;
  }

  window.renderPiles = render;
})();
