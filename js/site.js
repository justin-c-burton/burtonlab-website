// Burton Lab site: mobile menu, figure sizing, lightbox. No dependencies.
(function () {
  // Mobile menu
  var btn = document.querySelector('.menu-btn');
  var menu = document.getElementById('menu');
  if (btn && menu) {
    btn.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Once a real figure loads, size its frame to the image's own shape (no letterboxing).
  function fit(img) {
    var ph = img.closest('.ph');
    if (ph && img.naturalWidth) ph.classList.add('loaded');
    if (ph && !ph.classList.contains('crop') && img.naturalWidth) {
      ph.style.aspectRatio = img.naturalWidth + ' / ' + img.naturalHeight;
    }
  }
  document.querySelectorAll('.ph img').forEach(function (img) {
    if (img.complete) fit(img); else img.addEventListener('load', function () { fit(img); });
  });

  // YouTube players load only when clicked. Opened straight from disk (file://),
  // YouTube refuses to play embeds, so the link opens YouTube in a new tab instead.
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a.yt-play');
    if (!a || !/^https?:$/.test(location.protocol)) return;
    e.preventDefault();
    var f = document.createElement('iframe');
    f.src = a.dataset.src;
    f.title = a.querySelector('.yt-title').textContent;
    f.allow = 'accelerometer; encrypted-media; gyroscope; picture-in-picture';
    f.referrerPolicy = 'strict-origin-when-cross-origin';
    f.allowFullscreen = true;
    a.parentNode.replaceChild(f, a);
  });

  // Lightbox for gallery links
  var dlg = document.querySelector('.lightbox');
  if (!dlg || !dlg.showModal) return;
  var box = dlg.querySelector('.lb-img');
  var cap = dlg.querySelector('figcaption');
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a.lb');
    if (!a) return;
    e.preventDefault();
    box.innerHTML = '';
    var img = new Image();
    img.alt = a.dataset.caption || '';
    img.onerror = function () {
      box.innerHTML = '<div class="ph" data-label="' + a.getAttribute('href').split('/').pop() + '"></div>';
    };
    img.src = a.getAttribute('href');
    box.appendChild(img);
    cap.textContent = a.dataset.caption || '';
    dlg.showModal();
  });
  dlg.addEventListener('click', function (e) { if (e.target === dlg || e.target.classList.contains('lb-close')) dlg.close(); });

  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();
})();
