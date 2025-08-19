// Swiper Configuration for Hero Slider
// You can easily modify these parameters to customize the slider behavior

export const heroSwiperConfig = {
  // Instagram-like Parameters
  loop: true,                    // Infinite loop
  speed: 800,                    // Faster, more responsive transition
  spaceBetween: 0,               // No space between slides
  slidesPerView: 1,              // One slide at a time
  centeredSlides: false,         // Don't center slides for better positioning
  
  // Instagram-style Autoplay Configuration
  autoplay: {
    delay: 10000,                // 10 seconds delay as requested
    disableOnInteraction: false, // Continue after user interaction
    pauseOnMouseEnter: true,     // Pause on hover
    waitForTransition: true,     // Wait for transition to complete
    stopOnLastSlide: false,      // Never stop
  },
  
  // Instagram-like Touch Behavior
  allowTouchMove: true,          // Enable touch/swipe
  simulateTouch: true,           // Enable touch simulation
  grabCursor: true,              // Show grab cursor
  touchRatio: 1,                 // Full touch sensitivity
  touchAngle: 45,                // Touch angle threshold
  threshold: 5,                  // Lower threshold for more responsive swiping
  shortSwipes: true,             // Enable short swipes
  longSwipes: true,              // Enable long swipes
  longSwipesRatio: 0.3,          // Lower ratio for easier swiping
  longSwipesMs: 300,             // Faster swipe detection
  followFinger: true,            // Follow finger movement
  
  // Snap to slides like Instagram
  resistanceRatio: 0.15,         // Less resistance for smoother feel
  touchReleaseOnEdges: false,    // Don't release on edges
  
  // Clean Pagination
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets' as const,
    clickable: true,
    dynamicBullets: false,
    hideOnClick: false,
  },
  
  // Keyboard Navigation
  keyboard: {
    enabled: true,
    onlyInViewport: true,
    pageUpDown: false,             // Disable page up/down for cleaner experience
  },
  
  // Disable mouse wheel for Instagram-like experience
  mousewheel: {
    enabled: false,
  },
  
  // Performance optimizations
  updateOnWindowResize: true,
  watchSlidesProgress: true,
};

// Event handlers configuration
export const heroSwiperEvents = {
  init: function (swiper: any) {
    // Add loaded class for smooth initialization
    swiper.el.classList.add('swiper-loaded');
    
    // Add accessibility improvements
    const slides = swiper.slides;
    slides.forEach((slide: any, index: number) => {
      slide.setAttribute('role', 'tabpanel');
      slide.setAttribute('aria-label', `Slide ${index + 1} of ${slides.length}`);
    });
    
    // Ensure pagination bullets are properly initialized
    swiper.updateProgress();
    swiper.updateSlidesClasses();
  },
  
  // Clean touch handling
  touchStart: function (this: any) {
    // Pause autoplay on touch start
    if (this.autoplay && 'stop' in this.autoplay) {
      (this.autoplay as any).stop();
    }
  },
  
  touchEnd: function (this: any) {
    // Resume autoplay after touch with delay
    setTimeout(() => {
      if (this.autoplay && 'start' in this.autoplay) {
        (this.autoplay as any).start();
      }
    }, 3000); // 3 second delay before resuming autoplay
  },
  
  slideChange: function (swiper: any) {
    // Add haptic feedback for mobile
    if ('vibrate' in navigator && window.DeviceMotionEvent) {
      navigator.vibrate(50);
    }
  },
  
  slideChangeTransitionEnd: function (swiper: any) {
    // Ensure slides snap properly into place after transition
    swiper.updateProgress();
    swiper.updateSlidesClasses();
  },
  
  // Clean pagination handling  
  paginationUpdate: function (swiper: any) {
    // Use setTimeout to ensure pagination updates properly
    setTimeout(() => {
      const paginationEl = swiper.el.querySelector('.swiper-pagination');
      if (paginationEl) {
        const bullets = paginationEl.querySelectorAll('.swiper-pagination-bullet');
        bullets.forEach((bullet: any, index: number) => {
          bullet.classList.remove('swiper-pagination-bullet-active');
          if (index === swiper.realIndex) {
            bullet.classList.add('swiper-pagination-bullet-active');
          }
        });
      }
    }, 50);
  },
};

// Featured Collection Swiper Configuration
export const featuredCollectionSwiperConfig = {
  // No infinite loop - just 2 slides
  loop: false,
  speed: 600,
  spaceBetween: 0,
  slidesPerView: 1,
  centeredSlides: false,
  
  // No autoplay - manual control only
  autoplay: false,
  
  // Touch behavior
  allowTouchMove: true,
  simulateTouch: true,
  grabCursor: true,
  touchRatio: 1,
  touchAngle: 45,
  threshold: 10,
  shortSwipes: true,
  longSwipes: true,
  longSwipesRatio: 0.3,
  longSwipesMs: 300,
  followFinger: true,
  
  // Smooth transitions
  resistanceRatio: 0.1,
  touchReleaseOnEdges: true,
  
  // No navigation arrows
  navigation: false,
  
  // Pagination dots (no renderBullet to avoid color interference)
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets' as const,
    clickable: true,
    dynamicBullets: false,
    hideOnClick: false,
    renderBullet: undefined, // Explicitly prevent renderBullet function
  },
  
  // Keyboard Navigation
  keyboard: {
    enabled: true,
    onlyInViewport: true,
    pageUpDown: false,
  },
  
  // Disable mouse wheel
  mousewheel: {
    enabled: false,
  },
  
  // Performance optimizations
  updateOnWindowResize: true,
  watchSlidesProgress: true,
};

// Additional configuration options you can easily modify:

// Timing settings
export const timingConfig = {
  autoplayDelay: 10000,           // Change autoplay delay (milliseconds)
  transitionSpeed: 800,           // Change transition speed (milliseconds)
  resumeDelay: 3000,              // Delay before resuming autoplay after touch
  visibilityResumeDelay: 500,     // Delay when page becomes visible again
  focusResumeDelay: 2000,         // Delay when focus leaves slider
};

// Touch sensitivity settings
export const touchConfig = {
  threshold: 5,                   // Touch threshold for swipe detection
  touchAngle: 45,                 // Touch angle threshold
  longSwipesRatio: 0.3,           // Ratio for long swipes
  longSwipesMs: 300,              // Time for long swipe detection
  resistanceRatio: 0.15,          // Resistance when reaching edges
};

// Visual settings
export const visualConfig = {
  enableHapticFeedback: true,     // Enable vibration on mobile
  pauseOnHover: true,             // Pause autoplay on mouse hover
  enableKeyboard: true,           // Enable keyboard navigation
  enableMousewheel: false,        // Enable/disable mousewheel control
};
