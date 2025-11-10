;(function(){
  const rangeSelect = () => document.getElementById('rangeSelect')

  const fakeData = {
    today: { orders: 126, energy: 3820, cost: 2140, revenue: 4560, users: 23, totalUsers: 24560 },
    month: { orders: 3821, energy: 112380, cost: 67420, revenue: 132560, users: 680, totalUsers: 24560 },
    total: { orders: 120345, energy: 3567890, cost: 2089340, revenue: 4234560, users: 24560, totalUsers: 24560 }
  }

  const overview = { users: 24560, sites: 86, piles: 438, guns: 796, income: 4234560 }

  const stations = [
    { name: '虹桥枢纽站', coord: [31.1976, 121.3362], orders: 980, revenue: 23800 },
    { name: '张江高科站', coord: [31.2050, 121.5876], orders: 860, revenue: 21930 },
    { name: '徐家汇中心站', coord: [31.194, 121.436], orders: 820, revenue: 20110 },
    { name: '外滩观光站', coord: [31.240, 121.490], orders: 790, revenue: 19880 },
    { name: '临港新片区站', coord: [30.909, 121.937], orders: 720, revenue: 17540 }
  ]

  function createCard(title, content){
    return `<div class="card"><div class="card-title" style="margin-bottom:10px;font-weight:600">${title}</div>${content}</div>`
  }

  function renderOverview(){
    return `
      <div class="card-title">数据概览</div>
      <div class="kpi">
        <div class="kpi-item">
          <div class="label">用户总数</div>
          <div class="value">${overview.users.toLocaleString()}</div>
        </div>
        <div class="kpi-item">
          <div class="label">站点总数</div>
          <div class="value">${overview.sites}</div>
        </div>
        <div class="kpi-item">
          <div class="label">充电桩总数</div>
          <div class="value">${overview.piles}</div>
        </div>
        <div class="kpi-item">
          <div class="label">充电枪总数</div>
          <div class="value">${overview.guns}</div>
        </div>
        <div class="kpi-item">
          <div class="label">总收益</div>
          <div class="value">¥${overview.income.toLocaleString()}</div>
        </div>
      </div>
    `
  }

  function renderStats(){
    return `
      <div class="card-title">订单/用电统计</div>
      <div class="tab-container">
        <div class="tab active" data-tab="today">今日</div>
        <div class="tab" data-tab="month">本月</div>
        <div class="tab" data-tab="total">累计</div>
      </div>
      <div class="stats-grid" id="statsGrid">
        <div class="stat-item">
          <div class="label">充电订单数</div>
          <div class="value" id="orders">126</div>
        </div>
        <div class="stat-item">
          <div class="label">用电量 (kWh)</div>
          <div class="value" id="energy">3,820</div>
        </div>
        <div class="stat-item">
          <div class="label">用电成本 (¥)</div>
          <div class="value" id="cost">2,140</div>
        </div>
        <div class="stat-item">
          <div class="label">订单收益 (¥)</div>
          <div class="value" id="revenue">4,560</div>
        </div>
        <div class="stat-item">
          <div class="label">新增用户数</div>
          <div class="value" id="users">23</div>
        </div>
        <div class="stat-item">
          <div class="label">用户总数</div>
          <div class="value" id="totalUsers">24,560</div>
        </div>
      </div>
    `
  }

  function renderMap(){
    return `
      <div class="card-title">站点地图</div>
      <div class="map-placeholder" id="mapPlaceholder">
        <div>地图加载中...</div>
      </div>
    `
  }

  function renderMonitor(){
    return `
      <div class="card-title">充电枪监控</div>
      <div class="monitor-content">
        <div id="gunStatus" class="gun-chart"></div>
        <div class="gun-legend">
          <div class="legend-item">
            <div class="legend-dot" style="background:#10b981"></div>
            <span class="legend-label">插枪充电中</span>
            <span class="legend-value">312</span>
          </div>
          <div class="legend-item">
            <div class="legend-dot" style="background:#f59e0b"></div>
            <span class="legend-label">插枪未充电</span>
            <span class="legend-value">56</span>
          </div>
          <div class="legend-item">
            <div class="legend-dot" style="background:#6b7280"></div>
            <span class="legend-label">空闲</span>
            <span class="legend-value">410</span>
          </div>
          <div class="legend-item">
            <div class="legend-dot" style="background:#ef4444"></div>
            <span class="legend-label">故障</span>
            <span class="legend-value">18</span>
          </div>
        </div>
      </div>
    `
  }

  function renderRanking(){
    return `
      <div class="card-title">电站排行榜</div>
      <div class="ranking-filter-bar">
        <div class="dimension-tabs">
          <div class="dimension-tab active" data-dimension="orders">订单量</div>
          <div class="dimension-tab" data-dimension="revenue">收益</div>
        </div>
        <div class="tab-container">
          <div class="tab active" data-tab="today">今日</div>
          <div class="tab" data-tab="week">本周</div>
          <div class="tab" data-tab="month">本月</div>
          <div class="tab" data-tab="total">累计</div>
        </div>
      </div>
      <div class="ranking-list" id="rankingList">
        <div class="ranking-item">
          <div class="ranking-number">1</div>
          <div class="ranking-name">虹桥枢纽站</div>
          <div class="ranking-value">980 单</div>
        </div>
        <div class="ranking-item">
          <div class="ranking-number">2</div>
          <div class="ranking-name">张江高科站</div>
          <div class="ranking-value">860 单</div>
        </div>
        <div class="ranking-item">
          <div class="ranking-number">3</div>
          <div class="ranking-name">徐家汇中心站</div>
          <div class="ranking-value">820 单</div>
        </div>
        <div class="ranking-item">
          <div class="ranking-number">4</div>
          <div class="ranking-name">外滩观光站</div>
          <div class="ranking-value">790 单</div>
        </div>
        <div class="ranking-item">
          <div class="ranking-number">5</div>
          <div class="ranking-name">临港新片区站</div>
          <div class="ranking-value">720 单</div>
        </div>
      </div>
    `
  }

  function updateStats(range){
    const data = fakeData[range]
    document.getElementById('orders').textContent = data.orders.toLocaleString()
    document.getElementById('energy').textContent = data.energy.toLocaleString()
    document.getElementById('cost').textContent = data.cost.toLocaleString()
    document.getElementById('revenue').textContent = data.revenue.toLocaleString()
    document.getElementById('users').textContent = data.users.toLocaleString()
    document.getElementById('totalUsers').textContent = data.totalUsers.toLocaleString()
  }

  function initCharts(){
    // 确保ECharts已加载
    if (typeof echarts === 'undefined') {
      console.error('ECharts not loaded');
      return;
    }
    
    const gunStatusElement = document.getElementById('gunStatus');
    if (!gunStatusElement) {
      console.error('Gun status element not found');
      return;
    }
    
    const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : null
    const gunStatus = echarts.init(gunStatusElement, theme)

    const gunData = [
      {name:'插枪充电中', value: 312},
      {name:'插枪未充电', value: 56},
      {name:'空闲', value: 410},
      {name:'故障', value: 18}
    ]
    const totalGuns = gunData.reduce((sum, item) => sum + item.value, 0)

    gunStatus.setOption({
      tooltip:{trigger:'item', show: false},
      graphic: {
        type: 'text',
        left: 'center',
        top: 'center',
        style: {
          text: `枪总数\n${totalGuns}`,
          textAlign: 'center',
          fill: getComputedStyle(document.documentElement).getPropertyValue('--text').trim() || '#111827',
          fontSize: 14,
          fontWeight: 600,
          lineHeight: 20
        }
      },
      series:[{
        name:'状态',
        type:'pie',
        radius:['50%','75%'],
        avoidLabelOverlap: false,
        label: { show: false },
        labelLine: { show: false },
        itemStyle:{
          borderWidth:0
        },
        data: gunData.map((d,i)=>({
          ...d,
          itemStyle:{color:['#10b981','#f59e0b','#6b7280','#ef4444'][i]}
        }))
      }]
    })

    window.addEventListener('resize', ()=>{
      gunStatus.resize()
    })
  }

  function initMap(){
    // 确保Leaflet已加载
    if (typeof L === 'undefined') {
      console.error('Leaflet not loaded');
      return;
    }
    
    const mapElement = document.getElementById('mapPlaceholder');
    if (!mapElement) {
      console.error('Map placeholder element not found');
      return;
    }
    
    const center = [31.2304,121.4737]
    const map = L.map('mapPlaceholder').setView(center, 10)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(map)
    stations.forEach(s=>{
      L.marker(s.coord).addTo(map).bindPopup(`${s.name}<br>订单：${s.orders}<br>收益：¥${s.revenue}`)
    })
  }

  function render(container){
    // 恢复 view 容器的 grid 布局(用于首页)
    container.style.display = 'grid';
    container.style.padding = '16px';

    container.innerHTML = `
      <div class="cards">
        <div class="card overview-card">${renderOverview()}</div>
        <div class="card stats-card">${renderStats()}</div>
        <div class="card map-card">${renderMap()}</div>
        <div class="card monitor-card">${renderMonitor()}</div>
        <div class="card ranking-card">${renderRanking()}</div>
      </div>
    `
    
    // 使用setTimeout确保DOM完全渲染后再初始化图表和地图
    setTimeout(() => {
      updateStats('today')
      initCharts()
      initMap()
    }, 100)

    // Tab切换事件
    document.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'))
        e.target.classList.add('active')
        updateStats(e.target.dataset.tab)
      })
    })

    // 维度切换事件
    document.querySelectorAll('.dimension-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        document.querySelectorAll('.dimension-tab').forEach(t => t.classList.remove('active'))
        e.target.classList.add('active')
        // 这里可以更新排行榜数据
      })
    })
  }

  window.renderHome = render
})()


