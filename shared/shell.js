// ──────────────────────────────────────────────────────────
// shell.js — injects the shared header + sidebar nav into every
// docs page. Pages declare their identity via two attributes on
// <main>:
//   data-page  — id matched against the NAV registry below to
//                highlight the active sidebar entry.
//   data-depth — folder depth from the project root (0 for root,
//                1 for /assets/*, …) so relative URLs resolve
//                correctly under both local server and S3 paths.
//
// Sub-pages render the brand link, logo, and nav hrefs prefixed
// with `../` repeated `data-depth` times. This keeps the site
// portable without absolute paths that would break on S3's nested
// deploy URL.
// ──────────────────────────────────────────────────────────

const NAV = [
  {
    title: '',
    items: [
      { id: 'visual-language',  label: 'Visual Language',  href: 'index.html' },
      { id: 'overview',         label: 'Overview',         href: 'overview.html' },
    ],
  },
  {
    title: 'Assets',
    items: [
      {
        kind: 'subgroup',
        label: 'Graphic Assets',
        items: [
          { id: 'asset-icon',   label: 'Icon',          href: 'assets/icon.html' },
          { id: 'asset-2d',     label: '2D Assets',     href: 'assets/2d.html' },
          { id: 'asset-3d',     label: '3D Assets',     href: 'assets/3d.html' },
          { id: 'asset-motion', label: 'Motion Assets', href: 'assets/motion.html', tag: '개발예정' },
        ],
      },
      { id: 'asset-photographic',  label: 'Photographic Assets',          href: 'assets/photographic.html' },
      { id: 'asset-pattern',       label: 'Pattern / Background Assets',  href: 'assets/pattern.html' },
      { id: 'asset-symbol',        label: 'Symbol',                       href: 'assets/symbol.html' },
    ],
  },
];

function rel(path, depth) {
  return depth > 0 ? '../'.repeat(depth) + path : path;
}

function renderHeader(depth) {
  const header = document.createElement('header');
  header.className = 'shell-header';
  header.innerHTML = `
    <a href="${rel('index.html', depth)}" class="shell-header-brand">
      <img src="${rel('logo.svg', depth)}" alt="Ohouse">
      <span>Ohouse Visual Asset Library</span>
    </a>
  `;
  return header;
}

function renderFooter() {
  const footer = document.createElement('footer');
  footer.className = 'shell-footer';
  footer.innerHTML = `
    <nav class="shell-footer-nav">
      <a href="https://ohou.se" target="_blank" rel="noopener noreferrer">오늘의집</a>
      <a href="https://www.bucketplace.com/culture/" target="_blank" rel="noopener noreferrer">오늘의집 블로그</a>
      <a href="https://www.bucketplace.com/careers" target="_blank" rel="noopener noreferrer">Careers</a>
    </nav>
    <div class="shell-footer-copy">Copyright © bucketplace Corp. All rights reserved.</div>
  `;
  return footer;
}

function renderNavLink(item, depth, activeId) {
  return `
    <a href="${rel(item.href, depth)}"
       class="shell-nav-link${item.id === activeId ? ' active' : ''}">
      <span>${item.label}</span>
      ${item.tag ? `<span class="shell-nav-tag">${item.tag}</span>` : ''}
    </a>
  `;
}

function renderNavItem(item, depth, activeId) {
  if (item.kind === 'subgroup') {
    return `
      <div class="shell-nav-subgroup">
        <div class="shell-nav-subgroup-title">${item.label}</div>
        ${item.items.map(sub => renderNavLink(sub, depth, activeId)).join('')}
      </div>
    `;
  }
  return renderNavLink(item, depth, activeId);
}

function renderSidebar(depth, activeId) {
  const sidebar = document.createElement('aside');
  sidebar.className = 'shell-sidebar';
  sidebar.innerHTML = NAV.map(section => `
    <nav class="shell-nav-section">
      ${section.title ? `<div class="shell-nav-section-title">${section.title}</div>` : ''}
      ${section.items.map(item => renderNavItem(item, depth, activeId)).join('')}
    </nav>
  `).join('');
  return sidebar;
}

function init() {
  const main = document.querySelector('main[data-page]');
  if (!main) return;
  const pageId = main.dataset.page;
  const depth  = parseInt(main.dataset.depth || '0', 10);

  document.body.insertBefore(renderHeader(depth), document.body.firstChild);
  document.body.insertBefore(renderSidebar(depth, pageId), main);

  if (!main.classList.contains('shell-main')) {
    main.classList.add('shell-main');
  }

  document.body.appendChild(renderFooter());
}

init();
