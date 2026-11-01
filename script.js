document.addEventListener('DOMContentLoaded', () => {
  
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('open');
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('open');
      });
    });
  }

  const reviewsTrack = document.getElementById('reviewsTrack');
  const sliderPrev = document.getElementById('sliderPrev');
  const sliderNext = document.getElementById('sliderNext');

  if (reviewsTrack && sliderPrev && sliderNext) {
    const getScrollStep = () => {
      const card = reviewsTrack.querySelector('.review-card');
      if (card) {
        return card.offsetWidth + 20;
      }
      return 340;
    };

    sliderPrev.addEventListener('click', () => {
      reviewsTrack.scrollBy({
        left: -getScrollStep(),
        behavior: 'smooth'
      });
    });

    sliderNext.addEventListener('click', () => {
      reviewsTrack.scrollBy({
        left: getScrollStep(),
        behavior: 'smooth'
      });
    });

    reviewsTrack.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        reviewsTrack.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
      } else if (e.key === 'ArrowRight') {
        reviewsTrack.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
      }
    });
  }

  const privacyModal = document.getElementById('privacyModal');
  const openPrivacyBtn = document.getElementById('openPrivacyBtn');
  const closePrivacyBtn = document.getElementById('closePrivacyBtn');
  const confirmPrivacyBtn = document.getElementById('confirmPrivacyBtn');

  const openModal = () => {
    if (privacyModal) {
      privacyModal.classList.add('active');
      privacyModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    if (privacyModal) {
      privacyModal.classList.remove('active');
      privacyModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  if (openPrivacyBtn) {
    openPrivacyBtn.addEventListener('click', openModal);
  }

  if (closePrivacyBtn) {
    closePrivacyBtn.addEventListener('click', closeModal);
  }

  if (confirmPrivacyBtn) {
    confirmPrivacyBtn.addEventListener('click', closeModal);
  }

  if (privacyModal) {
    privacyModal.addEventListener('click', (e) => {
      if (e.target === privacyModal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && privacyModal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  const curtain = document.getElementById('pageCurtain');
  if (curtain) {
    const triggerCurtainExit = () => {
      setTimeout(() => {
        curtain.classList.remove('from-right');
        curtain.classList.remove('cover-screen');
        curtain.classList.add('slide-left');
        setTimeout(() => {
          curtain.style.display = 'none';
        }, 700);
      }, 300);
    };

    if (document.readyState === 'complete') {
      triggerCurtainExit();
    } else {
      window.addEventListener('load', triggerCurtainExit);
      setTimeout(triggerCurtainExit, 900);
    }

    curtain.addEventListener('click', () => {
      curtain.classList.add('slide-left');
      setTimeout(() => {
        curtain.style.display = 'none';
      }, 700);
    });

    window.addEventListener('pageshow', (e) => {
      if (e.persisted) {
        triggerCurtainExit();
      }
    });

    const pageLinks = document.querySelectorAll('a[href]');
    pageLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('tel:') || href.startsWith('mailto:') || href.includes('wa.me') || link.target === '_blank') {
        return;
      }

      try {
        const url = new URL(link.href, window.location.href);
        if (url.origin === window.location.origin) {
          const isSamePage = url.pathname === window.location.pathname;
          if (!isSamePage) {
            link.addEventListener('click', (e) => {
              e.preventDefault();
              const targetUrl = link.href;
              curtain.classList.remove('slide-left');
              curtain.classList.add('from-right');
              curtain.style.display = 'flex';
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  curtain.classList.remove('from-right');
                  curtain.classList.add('cover-screen');
                });
              });
              setTimeout(() => {
                window.location.href = targetUrl;
              }, 480);
            });
          }
        }
      } catch (err) {}
    });
  }

  const dishPrevBtns = document.querySelectorAll('.arrow-dish-prev');
  const dishNextBtns = document.querySelectorAll('.arrow-dish-next');

  const getDishStep = (track) => {
    const card = track.querySelector('.dish-card');
    if (card) {
      return card.offsetWidth + 20;
    }
    return 300;
  };

  dishPrevBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const track = document.getElementById(targetId);
      if (track) {
        track.scrollBy({ left: -getDishStep(track), behavior: 'smooth' });
      }
    });
  });

  dishNextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const track = document.getElementById(targetId);
      if (track) {
        track.scrollBy({ left: getDishStep(track), behavior: 'smooth' });
      }
    });
  });

});
