;(function(){
  function render(container) {
    container.innerHTML = `
      <div style="padding:20px">
        <div class="card">
          <h2 style="margin:0 0 12px 0;font-size:24px;font-weight:600;color:var(--text)">数据分析</h2>
          <p style="font-size:16px;color:var(--muted)">页面开发中...</p>
        </div>
      </div>
    `;
  }

  window.renderAnalytics = render;
})();
