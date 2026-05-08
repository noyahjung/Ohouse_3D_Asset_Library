// ──────────────────────────────────────────────────────────
// shell-v2.js — v2 shell. Same render contract as shell.js
// (data-page / data-depth on <main>) but:
//   • New nav structure leading with About → Visual Language →
//     Assets, reframing the library as an outward-facing
//     statement of Ohouse's visual identity rather than an
//     internal usage manual.
//   • A small "v1 보기" link in the header so reviewers can
//     compare against the live ver1.
//
// All NAV hrefs are written from the project root. Items
// pointing at v2 pages are prefixed `v2/`; items pointing at
// existing v1 pages have no prefix and resolve to the original
// ver1 file untouched.
// ──────────────────────────────────────────────────────────

const NAV = [
  {
    title: 'About',
    items: [
      { id: 'v2-mission', label: 'Mission', href: 'v2/index.html' },
    ],
  },
  {
    title: 'Brand',
    items: [
      { id: 'v2-symbol',             label: 'Symbol',             href: 'v2/symbol.html' },
      { id: 'v2-visual-principles',  label: 'Visual Principles',  href: 'v2/visual-principles.html' },
      { id: 'v2-tone-of-voice',      label: 'Tone of Voice',      href: 'v2/tone-of-voice.html' },
    ],
  },
  {
    title: 'Assets',
    items: [
      { id: 'v2-overview', label: 'Overview', href: 'v2/overview.html' },
      {
        kind: 'subgroup',
        label: 'Graphic Assets',
        items: [
          { id: 'v2-asset-icon',    label: 'Icon',                        href: 'v2/assets/icon.html' },
          { id: 'v2-asset-2d',      label: '2D Assets',                   href: 'v2/assets/2d.html' },
          { id: 'v2-asset-3d',      label: '3D Assets',                   href: 'v2/assets/3d.html' },
          { id: 'v2-asset-motion',  label: 'Motion Assets',               href: 'v2/assets/motion.html', tag: '개발예정' },
          { id: 'v2-asset-pattern', label: 'Pattern / Background Assets', href: 'v2/assets/pattern.html', tag: '개발예정' },
        ],
      },
      {
        kind: 'subgroup',
        label: 'Image Assets',
        items: [
          { id: 'v2-asset-photographic', label: 'Photographic Assets', href: 'v2/assets/photographic.html' },
        ],
      },
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
    <a href="${rel('v2/index.html', depth)}" class="shell-header-brand">
      <img src="${rel('logo.svg', depth)}" alt="Ohouse">
      <span>Ohouse Brand Asset Library</span>
    </a>
    <div class="shell-header-version">
      <span class="shell-header-version-current">v2</span>
      <a class="shell-header-version-link" href="${rel('index.html', depth)}">v1 보기 →</a>
    </div>
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
