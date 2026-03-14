(() => {
  const SITE = {
    brandUrl: 'https://kabrios.com/',
    tryUrl: 'https://app.kabrios.com',
    featuresUrl: 'https://kabrios.com/#use-cases',
    docsUrl: 'https://docs.kabrios.com/',
    trustUrl: 'https://trust.kabrios.com/',
    aboutUrl: 'https://kabrios.com/#about-us',
    contactUrl: 'https://kabrios.com/#contact'
  };

  const navItems = [
    { label: 'Try now', href: SITE.tryUrl, key: 'try', cta: true },
    { label: 'Features', href: SITE.featuresUrl, key: 'features' },
    { label: 'Docs', href: SITE.docsUrl, key: 'docs' },
    { label: 'Trust', href: SITE.trustUrl, key: 'trust' },
    { label: 'About us', href: SITE.aboutUrl, key: 'about' },
    { label: 'Contact', href: SITE.contactUrl, key: 'contact' }
  ];

  const body = document.body;
  if (!body) return;

  const page = (body.dataset.kabriosPage || '').trim();
  const currentUrl = new URL(window.location.href);

  const isCurrent = (item) => {
    if (page === item.key) return true;
    if (page === 'home' && item.key === 'features' && currentUrl.hash === '#use-cases') return true;
    if (page === 'home' && item.key === 'about' && currentUrl.hash === '#about-us') return true;
    if (page === 'home' && item.key === 'contact' && currentUrl.hash === '#contact') return true;

    if (item.key === 'docs' && currentUrl.hostname === 'docs.kabrios.com') return true;
    if (item.key === 'trust' && currentUrl.hostname === 'trust.kabrios.com') return true;
    if (item.key === 'try' && currentUrl.hostname === 'app.kabrios.com') return true;

    const itemUrl = new URL(item.href, currentUrl.origin);
    if (itemUrl.origin !== currentUrl.origin) return false;
    const normalize = (value) => value.replace(/\/$/, '') || '/';
    return normalize(itemUrl.pathname) === normalize(currentUrl.pathname) && itemUrl.hash === currentUrl.hash;
  };

  const navHtml = `
    <header class="kabrios-nav-shell" data-kabrios-nav>
      <div class="container">
        <div class="kabrios-nav">
          <a class="kabrios-brand" href="${SITE.brandUrl}" aria-label="Kabrios home">
            <span class="kabrios-brand-mark" aria-hidden="true">K</span>
            <span class="kabrios-brand-word">Kabrios</span>
          </a>
          <div class="kabrios-nav-right">
            <button class="kabrios-nav-toggle" type="button" aria-expanded="false" aria-controls="kabrios-nav-links">Menu</button>
            <nav class="kabrios-nav-links" id="kabrios-nav-links" aria-label="Primary navigation">
              ${navItems.map((item) => `<a href="${item.href}" class="${item.cta ? 'is-cta' : ''} ${isCurrent(item) ? 'is-current' : ''}" ${isCurrent(item) ? 'aria-current="page"' : ''}>${item.label}</a>`).join('')}
            </nav>
          </div>
        </div>
      </div>
    </header>
  `;

  const footerHtml = `
    <footer class="kabrios-footer-shell">
      <div class="container">
        <div class="kabrios-footer">
          <a class="kabrios-brand" href="${SITE.brandUrl}" aria-label="Kabrios home">
            <span class="kabrios-brand-mark" aria-hidden="true">K</span>
            <span class="kabrios-brand-word">Kabrios</span>
          </a>
          <div class="kabrios-footer-links">
            ${navItems.map((item) => `<a href="${item.href}">${item.label}</a>`).join('')}
          </div>
          <div class="kabrios-footer-copy">Continuous readiness across the Kabrios platform.</div>
        </div>
      </div>
    </footer>
  `;

  body.insertAdjacentHTML('afterbegin', navHtml);
  body.insertAdjacentHTML('beforeend', footerHtml);

  const shell = document.querySelector('[data-kabrios-nav]');
  const toggle = shell?.querySelector('.kabrios-nav-toggle');

  const syncScroll = () => shell?.classList.toggle('is-scrolled', window.scrollY > 10);

  toggle?.addEventListener('click', () => {
    const isOpen = shell.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.addEventListener('click', (event) => {
    if (!shell?.contains(event.target)) {
      shell?.classList.remove('is-open');
      toggle?.setAttribute('aria-expanded', 'false');
    }
  });

  window.addEventListener('scroll', syncScroll, { passive: true });
  syncScroll();
})();
