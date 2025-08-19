// Swiper Configuration for Hero Slider
// You can easily modify these parameters to customize the slider behavior

export const heroSwiperConfig = {
  // Instagram-like Parameters
  loop: true,                    // Infinite loop
  speed: 600,                    // Smoother, optimized transition speed for mobile
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
  
  // Optimized Touch Behavior for Mobile
  allowTouchMove: true,          // Enable touch/swipe
  simulateTouch: true,           // Enable touch simulation
  grabCursor: true,              // Show grab cursor
  touchRatio: 1,                 // Full touch sensitivity
  touchAngle: 45,                // Touch angle threshold
  threshold: 10,                 // Higher threshold for smoother, less sensitive swiping
  shortSwipes: true,             // Enable short swipes
  longSwipes: true,              // Enable long swipes
  longSwipesRatio: 0.4,          // Higher ratio for more deliberate swiping
  longSwipesMs: 200,             // Faster swipe detection for responsiveness
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
    // Smooth slide change without haptic feedback for better mobile experience
    // Removed vibration to prevent unwanted haptic feedback
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

// Timing settings - Optimized for smooth mobile performance
export const timingConfig = {
  autoplayDelay: 10000,           // Change autoplay delay (milliseconds)
  transitionSpeed: 600,           // Optimized transition speed for mobile smoothness
  resumeDelay: 3000,              // Delay before resuming autoplay after touch
  visibilityResumeDelay: 300,     // Faster resume for better user experience
  focusResumeDelay: 1500,         // Slightly faster resume after focus
};

// Touch sensitivity settings - Optimized for smooth mobile performance
export const touchConfig = {
  threshold: 10,                  // Higher threshold for smoother swipe detection
  touchAngle: 45,                 // Touch angle threshold
  longSwipesRatio: 0.4,           // Higher ratio for more deliberate swiping
  longSwipesMs: 200,              // Faster detection for responsiveness
  resistanceRatio: 0.15,          // Resistance when reaching edges
};

// Visual settings
export const visualConfig = {
  enableHapticFeedback: false,    // Disabled vibration for smooth mobile experience
  pauseOnHover: true,             // Pause autoplay on mouse hover
  enableKeyboard: true,           // Enable keyboard navigation
  enableMousewheel: false,        // Enable/disable mousewheel control
};
