$(document).ready(function() {
  // Lazy-load images inside post content when supported
  if ('loading' in HTMLImageElement.prototype) {
    $(".post-content img").attr('loading', 'lazy');
  } else if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function(entries, obs) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset && img.dataset.src) {
            img.src = img.dataset.src;
          }
          obs.unobserve(img);
        }
      });
    }, { rootMargin: '200px 0px' });

    document.querySelectorAll('.post-content img').forEach(function(img) {
      if (!img.getAttribute('loading')) {
        observer.observe(img);
      }
    });
  }
});
