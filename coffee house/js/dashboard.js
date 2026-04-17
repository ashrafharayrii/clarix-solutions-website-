/* ===== CLARIX DASHBOARD - CHARTS & LOGIC ===== */

// ===== COLOR PALETTE =====
const colors = {
  primary: '#2C1810',
  secondary: '#8B5E3C',
  accent: '#D4A76A',
  accentLight: '#E8C99A',
  green: '#22C55E',
  red: '#EF4444',
  blue: '#3B82F6',
  orange: '#F97316',
  purple: '#A855F7',
  yellow: '#EAB308',
  grid: 'rgba(44,24,16,0.06)',
};

const chartDefaults = {
  font: { family: 'Poppins' },
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { labels: { font: { family: 'Poppins', size: 12 }, usePointStyle: true, pointStyleWidth: 10 } },
    tooltip: {
      backgroundColor: '#1A0F0A',
      titleFont: { family: 'Poppins', weight: '700' },
      bodyFont: { family: 'Poppins' },
      padding: 12,
      cornerRadius: 10,
    }
  }
};

// ===== SIDEBAR NAVIGATION =====
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', function() {
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    this.classList.add('active');
    const panel = this.dataset.panel;
    if (panel) {
      document.querySelectorAll('.dashboard-panel').forEach(p => p.classList.remove('active'));
      const target = document.getElementById(panel);
      if (target) target.classList.add('active');
      // Update topbar
      document.querySelector('.topbar-left h2').textContent = this.querySelector('span')?.textContent || 'Dashboard';
    }
  });
});

// ===== CHART 1: Revenue Trend (Main) =====
const revenueCtx = document.getElementById('revenueChart');
if (revenueCtx) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const revenueData = [18500, 21200, 19800, 24500, 28300, 31200, 29800, 33500, 36200, 34800, 38500, 42300];
  const profitData = [5200, 6100, 5700, 7300, 8900, 10200, 9600, 11500, 12800, 11900, 13700, 15600];
  const costData = [13300, 15100, 14100, 17200, 19400, 21000, 20200, 22000, 23400, 22900, 24800, 26700];

  new Chart(revenueCtx, {
    type: 'line',
    data: {
      labels: months,
      datasets: [
        {
          label: 'Revenue',
          data: revenueData,
          borderColor: colors.accent,
          backgroundColor: 'rgba(212,167,106,0.1)',
          borderWidth: 3,
          pointBackgroundColor: colors.accent,
          pointRadius: 5,
          pointHoverRadius: 8,
          tension: 0.45,
          fill: true,
        },
        {
          label: 'Profit',
          data: profitData,
          borderColor: colors.green,
          backgroundColor: 'rgba(34,197,94,0.08)',
          borderWidth: 3,
          pointBackgroundColor: colors.green,
          pointRadius: 5,
          pointHoverRadius: 8,
          tension: 0.45,
          fill: true,
        },
        {
          label: 'Cost',
          data: costData,
          borderColor: colors.red,
          backgroundColor: 'rgba(239,68,68,0.06)',
          borderWidth: 2,
          borderDash: [6, 3],
          pointBackgroundColor: colors.red,
          pointRadius: 4,
          tension: 0.45,
          fill: false,
        }
      ]
    },
    options: {
      ...chartDefaults,
      scales: {
        x: { grid: { color: colors.grid }, ticks: { font: { family: 'Poppins', size: 11 } } },
        y: {
          grid: { color: colors.grid },
          ticks: {
            font: { family: 'Poppins', size: 11 },
            callback: v => 'JD ' + (v/1000).toFixed(0) + 'K'
          }
        }
      }
    }
  });
}

// ===== CHART 2: Sales by Category (Donut) =====
const salesCatCtx = document.getElementById('salesCategoryChart');
if (salesCatCtx) {
  new Chart(salesCatCtx, {
    type: 'doughnut',
    data: {
      labels: ['Hot Coffee', 'Cold Coffee', 'Juices', 'Desserts', 'Tea', 'Snacks'],
      datasets: [{
        data: [32, 24, 18, 14, 7, 5],
        backgroundColor: [colors.primary, colors.accent, colors.orange, colors.purple, colors.blue, colors.green],
        borderWidth: 4,
        borderColor: '#fff',
        hoverOffset: 8,
      }]
    },
    options: {
      ...chartDefaults,
      cutout: '72%',
      plugins: {
        ...chartDefaults.plugins,
        legend: { position: 'bottom', labels: { ...chartDefaults.plugins.legend.labels, padding: 16 } }
      }
    }
  });
}

// ===== CHART 3: Weekly Sales Bar =====
const weeklySalesCtx = document.getElementById('weeklySalesChart');
if (weeklySalesCtx) {
  new Chart(weeklySalesCtx, {
    type: 'bar',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'This Week',
          data: [1840, 2100, 1920, 2450, 3200, 3800, 2900],
          backgroundColor: colors.accent,
          borderRadius: 10,
          borderSkipped: false,
        },
        {
          label: 'Last Week',
          data: [1600, 1850, 1700, 2100, 2800, 3500, 2600],
          backgroundColor: 'rgba(212,167,106,0.25)',
          borderRadius: 10,
          borderSkipped: false,
        }
      ]
    },
    options: {
      ...chartDefaults,
      scales: {
        x: { grid: { display: false }, ticks: { font: { family: 'Poppins', size: 11 } } },
        y: {
          grid: { color: colors.grid },
          ticks: { font: { family: 'Poppins', size: 11 }, callback: v => 'JD ' + v }
        }
      }
    }
  });
}

// ===== CHART 4: Inventory Levels =====
const inventoryCtx = document.getElementById('inventoryChart');
if (inventoryCtx) {
  new Chart(inventoryCtx, {
    type: 'bar',
    data: {
      labels: ['Coffee Beans', 'Milk', 'Sugar', 'Cream', 'Chocolate', 'Vanilla', 'Berries', 'Flour'],
      datasets: [
        {
          label: 'Current Stock',
          data: [85, 60, 92, 45, 70, 88, 30, 75],
          backgroundColor: [
            '#D4A76A','#22C55E','#22C55E','#F97316','#22C55E','#22C55E','#EF4444','#22C55E'
          ],
          borderRadius: 8,
          borderSkipped: false,
        }
      ]
    },
    options: {
      ...chartDefaults,
      indexAxis: 'y',
      scales: {
        x: {
          grid: { color: colors.grid },
          max: 100,
          ticks: { font: { family: 'Poppins', size: 11 }, callback: v => v + '%' }
        },
        y: { grid: { display: false }, ticks: { font: { family: 'Poppins', size: 11 } } }
      }
    }
  });
}

// ===== CHART 5: Employee Performance Radar =====
const empRadarCtx = document.getElementById('employeeRadarChart');
if (empRadarCtx) {
  new Chart(empRadarCtx, {
    type: 'radar',
    data: {
      labels: ['Sales', 'Customer Service', 'Speed', 'Accuracy', 'Teamwork', 'Attendance'],
      datasets: [
        {
          label: 'Ahmed K.',
          data: [92, 88, 85, 90, 87, 95],
          borderColor: colors.accent,
          backgroundColor: 'rgba(212,167,106,0.15)',
          borderWidth: 2,
          pointBackgroundColor: colors.accent,
        },
        {
          label: 'Sarah M.',
          data: [85, 95, 90, 88, 92, 98],
          borderColor: colors.blue,
          backgroundColor: 'rgba(59,130,246,0.12)',
          borderWidth: 2,
          pointBackgroundColor: colors.blue,
        }
      ]
    },
    options: {
      ...chartDefaults,
      scales: {
        r: {
          grid: { color: colors.grid },
          pointLabels: { font: { family: 'Poppins', size: 10 } },
          ticks: { display: false },
          suggestedMin: 60,
          suggestedMax: 100,
        }
      }
    }
  });
}

// ===== CHART 6: Cross-sell / Upsell =====
const crossSellCtx = document.getElementById('crossSellChart');
if (crossSellCtx) {
  new Chart(crossSellCtx, {
    type: 'bar',
    data: {
      labels: ['Espresso\n+ Dessert', 'Latte\n+ Sandwich', 'Cold Brew\n+ Juice', 'Cappuccino\n+ Muffin', 'Mocha\n+ Cookie'],
      datasets: [
        {
          label: 'Cross-sell Rate',
          data: [42, 38, 31, 45, 28],
          backgroundColor: colors.accent,
          borderRadius: 8,
        },
        {
          label: 'Upsell Rate',
          data: [28, 35, 22, 31, 19],
          backgroundColor: colors.purple,
          borderRadius: 8,
        }
      ]
    },
    options: {
      ...chartDefaults,
      scales: {
        x: { grid: { display: false }, ticks: { font: { family: 'Poppins', size: 10 } } },
        y: {
          grid: { color: colors.grid },
          ticks: { font: { family: 'Poppins', size: 11 }, callback: v => v + '%' }
        }
      }
    }
  });
}

// ===== CHART 7: Profit Margin Trend =====
const profitTrendCtx = document.getElementById('profitTrendChart');
if (profitTrendCtx) {
  new Chart(profitTrendCtx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [{
        label: 'Profit Margin %',
        data: [28.1, 28.8, 28.8, 29.8, 31.4, 32.7, 32.2, 34.3, 35.4, 34.2, 35.6, 36.9],
        borderColor: colors.green,
        backgroundColor: 'rgba(34,197,94,0.1)',
        borderWidth: 3,
        pointBackgroundColor: colors.green,
        pointRadius: 6,
        tension: 0.45,
        fill: true,
      }]
    },
    options: {
      ...chartDefaults,
      plugins: { ...chartDefaults.plugins, legend: { display: false } },
      scales: {
        x: { grid: { color: colors.grid }, ticks: { font: { family: 'Poppins', size: 11 } } },
        y: {
          grid: { color: colors.grid },
          ticks: { font: { family: 'Poppins', size: 11 }, callback: v => v + '%' },
          suggestedMin: 24,
          suggestedMax: 40,
        }
      }
    }
  });
}

// ===== CHART 8: Sales Performance by Hour =====
const hourlyCtx = document.getElementById('hourlyChart');
if (hourlyCtx) {
  const hours = ['7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm','9pm','10pm'];
  new Chart(hourlyCtx, {
    type: 'bar',
    data: {
      labels: hours,
      datasets: [{
        label: 'Orders',
        data: [18, 42, 65, 48, 55, 89, 102, 85, 70, 58, 62, 78, 90, 85, 65, 40],
        backgroundColor: hours.map((_, i) => i >= 5 && i <= 8 ? colors.accent : 'rgba(212,167,106,0.35)'),
        borderRadius: 8,
      }]
    },
    options: {
      ...chartDefaults,
      plugins: { ...chartDefaults.plugins, legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { font: { family: 'Poppins', size: 10 } } },
        y: { grid: { color: colors.grid }, ticks: { font: { family: 'Poppins', size: 11 } } }
      }
    }
  });
}

// ===== CHART 9: Supplier Performance =====
const supplierCtx = document.getElementById('supplierChart');
if (supplierCtx) {
  new Chart(supplierCtx, {
    type: 'radar',
    data: {
      labels: ['Quality', 'On-Time', 'Price', 'Flexibility', 'Support', 'Volume'],
      datasets: [
        {
          label: 'Al-Aman Coffee',
          data: [95, 90, 75, 85, 88, 92],
          borderColor: colors.accent,
          backgroundColor: 'rgba(212,167,106,0.15)',
          borderWidth: 2,
          pointBackgroundColor: colors.accent,
        },
        {
          label: 'Jordan Fresh',
          data: [88, 95, 82, 90, 80, 85],
          borderColor: colors.green,
          backgroundColor: 'rgba(34,197,94,0.12)',
          borderWidth: 2,
          pointBackgroundColor: colors.green,
        },
        {
          label: 'Sweet World',
          data: [90, 78, 88, 75, 92, 70],
          borderColor: colors.blue,
          backgroundColor: 'rgba(59,130,246,0.1)',
          borderWidth: 2,
          pointBackgroundColor: colors.blue,
        }
      ]
    },
    options: {
      ...chartDefaults,
      scales: {
        r: {
          grid: { color: colors.grid },
          pointLabels: { font: { family: 'Poppins', size: 10 } },
          ticks: { display: false },
          suggestedMin: 60,
          suggestedMax: 100,
        }
      }
    }
  });
}

// ===== CHART PERIOD SWITCHER =====
document.querySelectorAll('.chart-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    this.closest('.chart-controls')?.querySelectorAll('.chart-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
  });
});

// ===== LIVE CLOCK =====
function updateClock() {
  const now = new Date();
  const timeEl = document.getElementById('liveClock');
  if (timeEl) {
    timeEl.textContent = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }
}
setInterval(updateClock, 1000);
updateClock();

// ===== TOAST NOTIFICATIONS =====
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  const icon = type === 'success' ? '✓' : type === 'warning' ? '⚠' : 'ℹ';
  const bg = type === 'success' ? '#22C55E' : type === 'warning' ? '#F97316' : '#3B82F6';
  toast.style.cssText = `
    position:fixed;bottom:24px;right:24px;z-index:9999;
    background:${bg};color:white;
    padding:14px 22px;border-radius:14px;
    display:flex;align-items:center;gap:10px;
    font-family:Poppins,sans-serif;font-size:0.88rem;font-weight:600;
    box-shadow:0 8px 32px rgba(0,0,0,0.2);
    transform:translateY(80px);opacity:0;
    transition:all 0.4s cubic-bezier(0.4,0,0.2,1);
  `;
  toast.innerHTML = `<span style="font-size:1.1rem">${icon}</span> ${message}`;
  document.body.appendChild(toast);
  setTimeout(() => { toast.style.transform = 'translateY(0)'; toast.style.opacity = '1'; }, 50);
  setTimeout(() => {
    toast.style.transform = 'translateY(80px)';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

// Auto notifications
setTimeout(() => showToast('Coffee beans stock running low — 30%', 'warning'), 2000);
setTimeout(() => showToast('Daily sales target reached: 112%!', 'success'), 5000);
setTimeout(() => showToast('New order: Table 7 — Caramel Latte', 'info'), 8500);
