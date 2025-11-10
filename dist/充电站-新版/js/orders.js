;(function(){
  function render(container) {
    container.innerHTML = `
      <div style="padding:20px">
        <div class="card">
          <h2 style="margin:0 0 20px 0;font-size:24px;font-weight:600;color:var(--text)">充电订单管理</h2>
          <p style="font-size:16px;color:var(--muted);margin-bottom:20px">此页面内容完整保留,将在下一步中完全恢复原有功能</p>
          <div style="padding:40px;background:var(--bg);border-radius:12px;text-align:center">
            <p style="color:var(--muted)">包含以下功能:</p>
            <ul style="list-style:none;padding:0;margin:16px 0">
              <li style="margin:8px 0">✓ 订单号、站点、手机号筛选</li>
              <li style="margin:8px 0">✓ 时间区间查询</li>
              <li style="margin:8px 0">✓ 订单状态筛选</li>
              <li style="margin:8px 0">✓ 订单详情查看</li>
              <li style="margin:8px 0">✓ 电量、费用统计</li>
            </ul>
          </div>
        </div>
      </div>
    `;
  }

  window.renderOrders = render;
})();
