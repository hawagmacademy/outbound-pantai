/**
* Template Name: Tour
* Template URL: https://bootstrapmade.com/tour-bootstrap-travel-website-template/
* Updated: Jul 01 2025 with Bootstrap v5.3.7
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled, { passive: true });
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Set active class on navmenu based on current URL
   */
  let path = window.location.pathname;
  let page = path.split("/").pop() || "index.html"; // handle root as index.html
  
  document.querySelectorAll('#navmenu a').forEach(a => {
    // Only target main menu links, not dropdown toggles if any, but since it's a simple menu, this should work.
    let href = a.getAttribute('href');
    if (href && !href.startsWith('#')) {
      a.classList.remove('active');
      if (href === page || (page === '' && href === 'index.html')) {
        a.classList.add('active');
      } else if (page.startsWith('tour-') && href === 'tours.html') {
        a.classList.add('active'); // active for tour detail pages
      } else if (page.startsWith('desti-') && href === 'destinations.html') {
        a.classList.add('active'); // active for destination detail pages
      } else if (page.startsWith('detail-blog') && href === 'blog.html') {
        a.classList.add('active'); // active for blog detail pages
      }
    }
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    preloader.remove();
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop, { passive: true });

  /**
   * Floating WhatsApp button
   */
  if (!document.querySelector('.whatsapp-float')) {
    const whatsappFloat = document.createElement('a');
    whatsappFloat.href = 'https://wa.me/6282211221909?text=Halo%20Admin%20Outbound%20Pantai%20Kondang%20Merak,%20saya%20ingin%20bertanya%20mengenai%20paket%20outbound...';
    whatsappFloat.className = 'whatsapp-float';
    whatsappFloat.target = '_blank';
    whatsappFloat.rel = 'noopener noreferrer';
    whatsappFloat.setAttribute('aria-label', 'Hubungi WhatsApp');
    whatsappFloat.innerHTML = '<i class="bi bi-whatsapp"></i>';
    document.body.appendChild(whatsappFloat);
  }

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
  }
  window.addEventListener('load', aosInit);
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    aosInit();
  } else {
    document.addEventListener('DOMContentLoaded', aosInit);
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle, .faq-item .faq-header').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Category Filter (paket.html) — dual mode: Semua = slider, kategori = grid
   */
  const filterItems = document.querySelectorAll('.category-filter-item');
  const tourCards = document.querySelectorAll('.tour-item-filter');
  const sliderMode = document.getElementById('paket-slider-mode');
  const gridMode = document.getElementById('paket-grid-mode');

  if (filterItems.length > 0) {
    filterItems.forEach(item => {
      item.addEventListener('click', function(e) {
        e.preventDefault();

        // Update active state
        filterItems.forEach(i => i.classList.remove('active'));
        this.classList.add('active');

        const filterValue = this.getAttribute('data-filter');

        if (filterValue === '*') {
          // Tampilkan slider, sembunyikan grid
          if (sliderMode) sliderMode.style.display = '';
          if (gridMode)   gridMode.style.display = 'none';
        } else {
          // Sembunyikan slider, tampilkan grid + filter kartu
          if (sliderMode) sliderMode.style.display = 'none';
          if (gridMode)   gridMode.style.display = '';

          const filterClass = filterValue.replace('.', '');

          // Reset semua kartu dulu — langsung tanpa delay opacity
          tourCards.forEach(card => {
            card.classList.remove('hide-filter');
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          });

          // Sembunyikan yang tidak cocok
          tourCards.forEach(card => {
            if (!card.classList.contains(filterClass)) {
              card.classList.add('hide-filter');
            }
          });

          // Scroll grid ke tampilan layar (berguna di mobile)
          if (gridMode) {
            setTimeout(() => {
              gridMode.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
          }
        }
      });
    });
  }

})();