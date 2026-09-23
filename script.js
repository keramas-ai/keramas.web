// Keramas, Inc. landing page — menu behavior only. Layout is pure CSS.
(function () {
  var aboutToggle = document.querySelector('[data-menu-toggle]');
  var aboutPanel = document.getElementById('about-menu');
  var aboutWrap = document.querySelector('[data-menu]');

  var mobileToggle = document.querySelector('[data-mobile-toggle]');
  var mobilePanel = document.querySelector('[data-mobile-panel]');
  var mobileLabel = document.querySelector('[data-mobile-label]');

  function setAbout(open) {
    if (!aboutToggle || !aboutPanel) return;
    aboutToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    aboutPanel.hidden = !open;
  }
  function setMobile(open) {
    if (!mobileToggle || !mobilePanel) return;
    mobileToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    mobilePanel.hidden = !open;
    if (mobileLabel) mobileLabel.textContent = open ? 'CLOSE' : 'MENU';
  }
  function closeAll() { setAbout(false); setMobile(false); }

  if (aboutToggle) {
    aboutToggle.addEventListener('click', function () {
      setAbout(aboutPanel.hidden);
    });
  }
  if (mobileToggle) {
    mobileToggle.addEventListener('click', function () {
      setMobile(mobilePanel.hidden);
    });
  }

  // Placeholder items: MISSION / TEAM close the menu until real pages exist.
  document.querySelectorAll('[data-menu-item]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      if (a.getAttribute('href') === '#') e.preventDefault();
      closeAll();
    });
  });

  // Outside click and Escape close the About dropdown.
  document.addEventListener('mousedown', function (e) {
    if (aboutPanel && !aboutPanel.hidden && aboutWrap && !aboutWrap.contains(e.target)) setAbout(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeAll();
  });

  // Crossing the 760px breakpoint closes any open menu.
  var mq = window.matchMedia('(max-width: 759px)');
  var onChange = function () { closeAll(); };
  if (mq.addEventListener) mq.addEventListener('change', onChange); else mq.addListener(onChange);
})();
