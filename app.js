/**
 * NPM Version Monitor
 * Reads settings.json and renders a table of npm packages
 * with shields.io version badges.
 */
(async function () {
  const tbody = document.getElementById('package-tbody');
  const statusText = document.getElementById('status-text');
  const packageCount = document.getElementById('package-count');
  const pageTitle = document.getElementById('page-title');
  const pageDescription = document.getElementById('page-description');

  // Show loading skeleton rows
  function showLoading(count) {
    tbody.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><span class="skeleton-cell"></span></td>
        <td><span class="skeleton-cell"></span></td>
      `;
      tbody.appendChild(tr);
    }
  }

  showLoading(3);

  try {
    const res = await fetch('./settings.json');
    if (!res.ok) throw new Error(`Failed to load settings.json (${res.status})`);
    const settings = await res.json();

    // Update page title/description from settings
    if (settings.title) {
      pageTitle.textContent = settings.title;
      document.title = settings.title;
    }
    if (settings.description) {
      pageDescription.textContent = settings.description;
    }

    const packages = settings.packages || [];

    if (packages.length === 0) {
      statusText.textContent = 'NO PACKAGES DEFINED';
      statusText.className = 'nes-text is-warning';
      tbody.innerHTML = `
        <tr>
          <td colspan="2" class="nes-text is-disabled">
            Add packages to settings.json to get started.
          </td>
        </tr>
      `;
      return;
    }

    // Render table rows
    tbody.innerHTML = '';
    packages.forEach((pkg, index) => {
      const tr = document.createElement('tr');
      tr.style.animationDelay = `${index * 0.1}s`;
      tr.classList.add('fade-in-row');

      const npmUrl = `https://www.npmjs.com/package/${pkg.npmPackage}`;
      const badgeUrl = `https://img.shields.io/npm/v/${pkg.npmPackage}?style=flat-square&color=ff6e00`;

      tr.innerHTML = `
        <td>
          <a href="${npmUrl}" target="_blank" rel="noopener noreferrer"
             class="project-link" id="pkg-link-${index}">
            ${pkg.name}
          </a>
        </td>
        <td>
          <a href="${npmUrl}" target="_blank" rel="noopener noreferrer">
            <img src="${badgeUrl}"
                 alt="NPM Version of ${pkg.npmPackage}"
                 class="version-badge"
                 id="pkg-badge-${index}"
                 loading="lazy">
          </a>
        </td>
      `;

      tbody.appendChild(tr);
    });

    // Update status
    statusText.textContent = 'ALL SYSTEMS GO';
    statusText.className = 'nes-text is-success';
    packageCount.textContent = `[ ${packages.length} package${packages.length > 1 ? 's' : ''} tracked ]`;

  } catch (err) {
    console.error('Error loading settings:', err);
    statusText.textContent = 'ERROR';
    statusText.className = 'nes-text is-error';
    tbody.innerHTML = `
      <tr>
        <td colspan="2" class="nes-text is-error">
          Failed to load settings.json<br>
          <span style="font-size:8px">${err.message}</span>
        </td>
      </tr>
    `;
  }
})();
