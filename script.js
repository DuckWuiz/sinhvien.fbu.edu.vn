// Initialize Lucide Icons
document.addEventListener("DOMContentLoaded", function() {
  lucide.createIcons();
  
  // Initialize Academic Results Chart (Mixed Bar & Line)
  const resultsCtx = document.getElementById('resultsChart').getContext('2d');
  
  // Custom values based on the screenshot
  const myScores = [7.4, 7.4, 7.6, 7.3, 7.2, 7.7, 7.5, 7.5, 8.5];
  const classAverages = [5.8, 6.3, 6.5, 7.0, 4.2, 4.5, 5.5, 5.2, 6.0];
  const courseLabels = ['Lớp HP 1', 'Lớp HP 2', 'Lớp HP 3', 'Lớp HP 4', 'Lớp HP 5', 'Lớp HP 6', 'Lớp HP 7', 'Lớp HP 8', 'Lớp HP 9'];

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
  
  // Total credits = 134, Completed = 51
  const completedCredits = 51;
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

  // Calculate current week schedule and exam counts dynamically
  const countScheduleEl = document.getElementById('count-schedule');
  const countExamEl = document.getElementById('count-exam');
  
  if (countScheduleEl && countExamEl) {
    const today = new Date();
    
    const getMonday = (d) => {
      const date = new Date(d);
      const day = date.getDay();
      const diff = date.getDate() - day + (day === 0 ? -6 : 1);
      return new Date(date.setDate(diff));
    };
    
    const formatISODate = (date) => {
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const dd = String(date.getDate()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}`;
    };
    
    // Calculate for Current Week (this week)
    const mondayThisWeek = getMonday(today);
    const daysThisWeek = [];
    for (let i = 0; i < 7; i++) {
      const dayDate = new Date(mondayThisWeek);
      dayDate.setDate(mondayThisWeek.getDate() + i);
      daysThisWeek.push(dayDate);
    }

    // Calculate for Next Week
    const mondayNextWeek = new Date(mondayThisWeek);
    mondayNextWeek.setDate(mondayThisWeek.getDate() + 7);
    const daysNextWeek = [];
    for (let i = 0; i < 7; i++) {
      const dayDate = new Date(mondayNextWeek);
      dayDate.setDate(mondayNextWeek.getDate() + i);
      daysNextWeek.push(dayDate);
    }
    
    const examSchedule = [
      { date: '2026-06-10', dayIndex: 2 },
      { date: '2026-06-15', dayIndex: 0 },
      { date: '2026-06-23', dayIndex: 1 }
    ];

    const juneSchedule = [
      { dayIndex: 0 },
      { dayIndex: 1 },
      { dayIndex: 2 },
      { dayIndex: 2 },
      { dayIndex: 3 },
      { dayIndex: 3 },
      { dayIndex: 4 },
      { dayIndex: 4 }
    ];

    function getClassesForDate(dayDate, dayIndex) {
      const yyyy = dayDate.getFullYear();
      const mm = dayDate.getMonth();
      const dd = dayDate.getDate();
      
      // June 2026
      if (yyyy === 2026 && mm === 5) {
        return juneSchedule.filter(item => item.dayIndex === dayIndex);
      }
      
      // July 27th to October 31st 2026
      const startDate = new Date(2026, 6, 27);
      const endDate = new Date(2026, 9, 31);
      const compareDate = new Date(yyyy, mm, dd);
      
      if (compareDate >= startDate && compareDate <= endDate) {
        const list = [];
        if (dayIndex === 0) {
          list.push({ title: 'Tài chính quốc tế' });
          list.push({ title: 'Tài chính doanh nghiệp 1' });
        } else if (dayIndex === 1) {
          list.push({ title: 'Tiếng Anh 3' });
          list.push({ title: 'Toán cao cấp' });
        } else if (dayIndex === 2) {
          list.push({ title: 'Tài chính quốc tế' });
          list.push({ title: 'Tài chính doanh nghiệp 2' });
          list.push({ title: 'Tài chính doanh nghiệp 1' });
        } else if (dayIndex === 3) {
          list.push({ title: 'Tiếng Anh 3' });
          list.push({ title: 'Toán cao cấp' });
        } else if (dayIndex === 4) {
          list.push({ title: 'Tài chính doanh nghiệp 2' });
          list.push({ title: 'Tài chính doanh nghiệp 1' });
        } else if (dayIndex === 5) {
          list.push({ title: 'Tài chính quốc tế' });
          list.push({ title: 'Tiếng Anh 3' });
          list.push({ title: 'Toán cao cấp' });
        }
        return list;
      }
      return [];
    }

    // Count for This Week
    let classCountThisWeek = 0;
    let examCountThisWeek = 0;
    daysThisWeek.forEach((dayDate, dayIndex) => {
      const targetDayISO = formatISODate(dayDate);
      const hasExamOnThisDay = examSchedule.some(exam => exam.date === targetDayISO);
      if (hasExamOnThisDay) {
        examCountThisWeek++;
      } else {
        const classes = getClassesForDate(dayDate, dayIndex);
        classCountThisWeek += classes.length;
      }
    });

    // Count for Next Week
    let classCountNextWeek = 0;
    let examCountNextWeek = 0;
    daysNextWeek.forEach((dayDate, dayIndex) => {
      const targetDayISO = formatISODate(dayDate);
      const hasExamOnThisDay = examSchedule.some(exam => exam.date === targetDayISO);
      if (hasExamOnThisDay) {
        examCountNextWeek++;
      } else {
        const classes = getClassesForDate(dayDate, dayIndex);
        classCountNextWeek += classes.length;
      }
    });

    // Display counts on homepage
    countScheduleEl.textContent = classCountThisWeek;
    countExamEl.textContent = examCountThisWeek;

    // Show subtext info if next week has schedule
    const subReminderCard = countScheduleEl.closest('.reminder-content');
    if (subReminderCard) {
      let subInfo = subReminderCard.querySelector('.next-week-subinfo');
      if (!subInfo) {
        subInfo = document.createElement('span');
        subInfo.className = 'next-week-subinfo';
        subInfo.style.fontSize = '11px';
        subInfo.style.color = '#0284c7';
        subInfo.style.fontWeight = '500';
        subInfo.style.marginTop = '2px';
        subReminderCard.appendChild(subInfo);
      }
      if (classCountThisWeek === 0 && classCountNextWeek > 0) {
        subInfo.textContent = `(Tuần sau: ${classCountNextWeek} buổi học)`;
      } else if (classCountThisWeek > 0) {
        subInfo.textContent = '';
      }
    }
  }

  // Handle click on unlinked nav cards (div.nav-card)
  const unlinkedCards = document.querySelectorAll('div.nav-card');
  unlinkedCards.forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      window.location.href = 'chua_co_du_lieu.html';
    });
  });

  // Handle click on unlinked header controls or other mock links with href="#"
  const mockLinks = document.querySelectorAll('a[href="#"]');
  mockLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'chua_co_du_lieu.html';
    });
  });
});
