/**
 * WNK COMMODITIES — Interatividade & Funções Globais
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('show');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('show')) {
          icon.className = 'fas fa-times';
        } else {
          icon.className = 'fas fa-bars';
        }
      }
    });

    // Close menu when clicking nav links
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('show');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      });
    });
  }

  // Commodities Sector Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const commodityCards = document.querySelectorAll('.commodity-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      commodityCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // Modal Setup
  const modalOverlay = document.getElementById('interestModal');
  const modalClose = document.getElementById('modalClose');
  const interestCommoditySelect = document.getElementById('modalCommodity');
  const interestBtns = document.querySelectorAll('.btn-card-interest, .btn-open-modal');
  const interestForm = document.getElementById('interestForm');
  const modalSuccessMsg = document.getElementById('modalSuccess');

  function openModal(commodityName = '') {
    if (interestCommoditySelect && commodityName) {
      interestCommoditySelect.value = commodityName;
    }
    if (modalOverlay) {
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (modalSuccessMsg) modalSuccessMsg.style.display = 'none';
      if (interestForm) interestForm.style.display = 'block';
    }
  }

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  interestBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const commodity = btn.getAttribute('data-commodity') || '';
      openModal(commodity);
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Handle Form Submission
  if (interestForm) {
    interestForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = interestForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando...';
      submitBtn.disabled = true;

      setTimeout(() => {
        interestForm.style.display = 'none';
        if (modalSuccessMsg) {
          modalSuccessMsg.style.display = 'block';
        }
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        interestForm.reset();
      }, 900);
    });
  }

  // Quick CTA Form Submission
  const quickForm = document.getElementById('quickCtaForm');
  if (quickForm) {
    quickForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = quickForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i> Solicitação Enviada!';
      btn.style.background = '#235332';
      setTimeout(() => {
        alert('Obrigado pelo contato! Nossa equipe de comércio exterior entrará em contato com a sua empresa.');
        quickForm.reset();
        btn.innerHTML = originalText;
        btn.style.background = '';
      }, 600);
    });
  }

  // Language Switcher Logic (PT, EN, ZH-CN, AR)
  function applyLanguage(langCode) {
    document.querySelectorAll('.lang-btn').forEach(b => {
      if (b.getAttribute('data-lang') === langCode) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });

    if (langCode === 'zh-CN') {
      document.title = 'WNK COMMODITIES — 大宗商品国际贸易与居间服务 (中国/Mandarin)';
      document.documentElement.removeAttribute('dir');
    } else if (langCode === 'ar') {
      document.title = 'WNK COMMODITIES — الوساطة الدولية للسلع الاستراتيجية (دبي / أبوظبي)';
      document.documentElement.setAttribute('dir', 'rtl');
    } else if (langCode === 'en') {
      document.title = 'WNK COMMODITIES — Global Strategic Commodity Intermediation';
      document.documentElement.removeAttribute('dir');
    } else {
      document.title = 'WNK COMMODITIES — Intermediação Internacional de Commodities';
      document.documentElement.removeAttribute('dir');
    }

    // Set cookie for Google Translate
    const domainPath = window.location.pathname;
    if (langCode === 'pt') {
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${domainPath};`;
    } else {
      document.cookie = `googtrans=/pt/${langCode}; path=/;`;
      document.cookie = `googtrans=/pt/${langCode}; path=${domainPath};`;
    }

    // Trigger Google Translate select element if present
    const select = document.querySelector('.goog-te-combo');
    if (select) {
      select.value = langCode === 'pt' ? '' : langCode;
      select.dispatchEvent(new Event('change'));
    } else {
      let attempts = 0;
      const interval = setInterval(() => {
        const combo = document.querySelector('.goog-te-combo');
        if (combo) {
          combo.value = langCode === 'pt' ? '' : langCode;
          combo.dispatchEvent(new Event('change'));
          clearInterval(interval);
        }
        attempts++;
        if (attempts > 12) clearInterval(interval);
      }, 250);
    }
  }

  // Restore language if previously chosen in cookie
  const match = document.cookie.match(/googtrans=\/pt\/([a-zA-Z\-]+)/);
  if (match && match[1]) {
    setTimeout(() => applyLanguage(match[1]), 300);
  }

  // Click handler on lang buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const lang = btn.getAttribute('data-lang') || 'pt';
      applyLanguage(lang);
    });
  });

  // Smooth Active Nav on Scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const link = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);
      if (link) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  });
});
