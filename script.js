// Initialize Lucide Icons
document.addEventListener("DOMContentLoaded", function() {
  lucide.createIcons();
  
  // Initialize Academic Results Chart (Mixed Bar & Line)
  const resultsCtx = document.getElementById('resultsChart').getContext('2d');
  
  // Custom values based on the screenshot
  const myScores = [7.4, 7.4, 7.6, 7.3, 7.2, 7.7];
  const classAverages = [5.8, 6.3, 6.5, 7.0, 4.2, 4.5];
  const courseLabels = ['Lớp HP 1', 'Lớp HP 2', 'Lớp HP 3', 'Lớp HP 4', 'Lớp HP 5', 'Lớp HP 6'];

  const resultsChart = new Chart(resultsCtx, {
    type: 'bar',
    data: {
      labels: courseLabels,
      datasets: [
        {
          // Your score - Bar Chart
          label: 'Điểm của bạn',
          data: myScores,
          backgroundColor: '#ff5b4f', // Coral red from the screenshot
          borderColor: '#ff5b4f',
          borderWidth: 1,
          borderRadius: 4,
          barPercentage: 0.4,
          order: 2
        },
        {
          // Class average - Line Chart
          label: 'Điểm TB lớp học phần',
          data: classAverages,
          type: 'line',
          borderColor: '#f5a623', // Yellow/orange from screenshot
          borderWidth: 2,
          backgroundColor: 'transparent',
          pointBackgroundColor: '#f5a623',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 1.5,
          pointRadius: 5,
          pointHoverRadius: 7,
          tension: 0.3, // Smooth curve
          order: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            usePointStyle: true,
            boxWidth: 8,
            padding: 20,
            font: {
              family: "'Inter', sans-serif",
              size: 12
            },
            color: '#475569'
          }
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          backgroundColor: '#1e293b',
          titleFont: { family: "'Inter', sans-serif", size: 12 },
          bodyFont: { family: "'Inter', sans-serif", size: 12 },
          padding: 10,
          cornerRadius: 6
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: '#64748b',
            font: {
              family: "'Inter', sans-serif",
              size: 11
            }
          }
        },
        y: {
          min: 0,
          max: 10,
          grid: {
            color: '#f1f5f9'
          },
          ticks: {
            stepSize: 2,
            color: '#64748b',
            font: {
              family: "'Inter', sans-serif",
              size: 11
            }
          }
        }
      }
    }
  });

  // Initialize Study Progress Circle (Doughnut Chart)
  const progressCtx = document.getElementById('progressChart').getContext('2d');
  
  // Total credits = 134, Completed = 45
  const completedCredits = 45;
  const totalCredits = 134;
  const remainingCredits = totalCredits - completedCredits;

  const progressChart = new Chart(progressCtx, {
    type: 'doughnut',
    data: {
      labels: ['Đã hoàn thành', 'Còn lại'],
      datasets: [{
        data: [completedCredits, remainingCredits],
        backgroundColor: [
          '#0091ff', // Bright blue segment
          '#e2e8f0'  // Light gray remaining segment
        ],
        borderWidth: 0,
        hoverOffset: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '80%', // Make the doughnut thin
      plugins: {
        legend: {
          display: false // Hide legend as we have custom text inside
        },
        tooltip: {
          enabled: true,
          backgroundColor: '#1e293b',
          callbacks: {
            label: function(context) {
              return ` ${context.label}: ${context.raw} tín chỉ`;
            }
          }
        }
      }
    }
  });

  // Simple interactivity mockups
  const dropdowns = document.querySelectorAll('.dropdown-select');
  dropdowns.forEach(select => {
    select.addEventListener('change', function(e) {
      console.log(`Dropdown changed to: ${e.target.value}`);
      // Animate card on select change to feel premium and alive
      const card = this.closest('.card');
      card.style.opacity = '0.7';
      setTimeout(() => {
        card.style.opacity = '1';
      }, 300);
    });
  });

  // User profile dropdown toggle
  const userProfileMenu = document.getElementById('user-profile-menu');
  const userDropdownList = document.getElementById('user-dropdown-list');
  
  if (userProfileMenu && userDropdownList) {
    userProfileMenu.addEventListener('click', function(e) {
      e.stopPropagation();
      userDropdownList.classList.toggle('show');
    });
    
    document.addEventListener('click', function() {
      userDropdownList.classList.remove('show');
    });
  }

  // Logout click handler
  const logoutBtn = document.getElementById('btn-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
      sessionStorage.removeItem('isLoggedIn');
    });
  }
});
