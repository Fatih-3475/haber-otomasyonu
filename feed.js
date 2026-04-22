//  FEED.JS — Haber akışı 
async function loadFeed() {
  const container = document.getElementById('feedContainer');
  const loading   = document.getElementById('feedLoading');

  try {
    const res = await fetch(CONFIG.haberWebhookUrl, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);

    const raw = await res.json();

    let haberler = Array.isArray(raw) ? raw : [raw];
    haberler = haberler.filter(h => h.title && h.url).slice(0, 5);

    loading.remove();

    if (haberler.length === 0) {
      container.innerHTML = '<div class="feed-loading">Şu an haber bulunamadı.</div>';
      return;
    }

    haberler.forEach(haber => {
      const div = document.createElement('div');
      div.className = 'fi';
      div.onclick = () => window.open(haber.url, '_blank');
      div.innerHTML = `
        <div class="fi-cat">Kastamonu Üniversitesi</div>
        <div class="fi-title">${escapeHtml(haber.title)}</div>
        <div class="fi-meta">gazete.kastamonu.edu.tr · habere git →</div>
      `;
      container.appendChild(div);
    });

  } catch (err) {
    loading.textContent = 'Haberler yüklenemedi — n8n aktif mi?';
    loading.style.color = 'var(--red)';
    loading.style.fontSize = '11px';
  }
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

document.addEventListener('DOMContentLoaded', loadFeed);
