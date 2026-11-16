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

  // Language Switcher Demonstration
  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      langBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const lang = btn.textContent.trim();
      if (lang === 'EN') {
        document.title = 'Commodities — WNK Commodities | Global Intermediation';
      } else if (lang === 'ZH') {
        document.title = '大宗商品国际贸易 — WNK Commodities';
      } else {
        document.title = 'Commodities — WNK Commodities | Intermediação Internacional';
      }
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
