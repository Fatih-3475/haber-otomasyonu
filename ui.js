
//  MODAL 

function openModal(type) {
  const id = type === 'analiz' ? 'modalAnaliz' : 'modalTelegram';
  resetModal(type);
  document.getElementById(id).classList.add('on');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('on');
}

function backdropClick(e, id) {
  if (e.target === document.getElementById(id)) closeModal(id);
}

function resetModal(type) {
  if (type === 'analiz') {
    setStepA(0);
    setProg('aProgBar', 0);
    document.getElementById('aResultPanel').classList.remove('show');
    document.getElementById('aPickedName').style.display = 'none';
    document.getElementById('aResultHint').textContent = 'Analiz_[dosyaadı].txt';
    window.analizFile = null;
    window.analizResultId = null;
    const btn = document.getElementById('aBtnMain');
    btn.disabled = false;
    btn.textContent = "Drive'a Yükle & Analiz Başlat";
  } else {
    setStepT(0);
    setProg('tProgBar', 0);
    document.getElementById('tResultPanel').classList.remove('show');
    document.getElementById('tPickedName').style.display = 'none';
    window.tgFile = null;
    const btn = document.getElementById('tBtnMain');
    btn.disabled = false;
    btn.textContent = "Ses Yükle & Telegram'a Gönder";
  }
}

// FORMAT SEÇİMİ

function setFmt(f) {
  window.selectedFmt = f;
  document.getElementById('fmtPdf').classList.toggle('sel', f === 'pdf');
  document.getElementById('fmtTxt').classList.toggle('sel', f === 'txt');
  document.getElementById('aPickHint').textContent = f.toUpperCase() + ' dosyası seçin';
}

//  DOSYA SEÇ 

function onFileSelectAnaliz(e) {
  const f = e.target.files[0];
  if (!f) return;
  const ext = f.name.split('.').pop().toLowerCase();
  if (!['pdf', 'txt'].includes(ext)) {
    toast('Sadece PDF veya TXT seçin', 'err'); return;
  }
  window.analizFile = f;
  const pn = document.getElementById('aPickedName');
  pn.textContent = '✓ ' + f.name + ' (' + (f.size / 1024).toFixed(0) + ' KB)';
  pn.style.display = 'block';
  document.getElementById('aResultHint').textContent = 'Analiz_' + f.name.replace(/\.[^/.]+$/, '') + '.txt';
  setStepA(1);
  toast('Dosya seçildi');
}

function onFileSelectTg(e) {
  const f = e.target.files[0];
  if (!f) return;
  window.tgFile = f;
  const pn = document.getElementById('tPickedName');
  pn.textContent = '✓ ' + f.name + ' (' + (f.size / 1024 / 1024).toFixed(1) + ' MB)';
  pn.style.display = 'block';
  setStepT(1);
  toast('Ses dosyası seçildi');
}

// ADIM GÖSTERGELERİ

function setStepA(n) {
  ['a1', 'a2', 'a3', 'a4', 'a5'].forEach((id, i) => {
    const el = document.getElementById(id);
    el.classList.remove('active', 'done', 'blue-active');
    if (i + 1 < n) el.classList.add('done');
    else if (i + 1 === n) el.classList.add('active');
  });
}

function setStepT(n) {
  ['t1', 't2', 't3', 't4', 't5'].forEach((id, i) => {
    const el = document.getElementById(id);
    el.classList.remove('active', 'done', 'blue-active');
    if (i + 1 < n) el.classList.add('done');
    else if (i + 1 === n) el.classList.add('blue-active');
  });
}

function setProg(id, p) {
  document.getElementById(id).style.width = p + '%';
}

// TOAST

let _toastTimer;
function toast(msg, type = '') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast show ' + type;
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => { t.className = 'toast'; }, 3800);
}

// SONUÇ AÇMA 

function openAnalysisResult() {
  if (!window.analizResultId) return;
  window.open(`https://drive.google.com/file/d/${window.analizResultId}/view`, '_blank');
}

function downloadResult() {
  if (!window.analizResultId) return;
  const a = document.createElement('a');
  a.href = `https://drive.google.com/uc?export=download&id=${window.analizResultId}&confirm=t`;
  a.target = '_blank';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function openTelegram() {
  window.open(CONFIG.telegramUrl, '_blank');
}

// YARDIMCILAR

function wait(ms) {
  return new Promise(r => setTimeout(r, ms));
}

// TARIH 

document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('tarih');
  if (el) el.textContent = new Date().toLocaleDateString('tr-TR', {
    day: 'numeric', month: 'long', year: 'numeric'
  });
});
