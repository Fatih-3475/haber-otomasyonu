//  DRIVE.JS 

window.analizFile  = null;
window.tgFile      = null;
window.analizResultId = null;

// ANALİZ UPLOAD 

async function handleAnalizUpload() {
  if (!window.analizFile) { toast('Önce dosya seçin', 'err'); return; }

  const btn = document.getElementById('aBtnMain');
  btn.disabled = true;

  try {
   
    setStepA(2); setProg('aProgBar', 20);
    btn.textContent = 'Yükleniyor...';

    const form = new FormData();
    form.append('file', window.analizFile, window.analizFile.name);

    const res = await fetch(CONFIG.dosyaYukleUrl, {
      method: 'POST',
      body: form
    });

    if (!res.ok) throw new Error('Yükleme hatası: ' + res.status);
    toast('Drive\'a yüklendi ✓');

    
    setStepA(3); setProg('aProgBar', 40);
    btn.textContent = 'n8n tetiklendi...';
    toast('n8n devreye girdi — dosya işleniyor...');
    await wait(3000);

    
    setStepA(4); setProg('aProgBar', 65);
    const sn = Math.round(CONFIG.analizWaitMs / 1000);
    btn.textContent = `Gemini analiz ediyor (~${sn}sn)...`;
    toast('Gemini AI analiz ediyor...');
    await wait(CONFIG.analizWaitMs);

  
    setStepA(5); setProg('aProgBar', 100);
    btn.textContent = 'Tamamlandı ✓';

    
    const baseName = window.analizFile.name.replace(/\.[^/.]+$/, '');
    document.getElementById('aResultName').textContent = 'Analiz_' + baseName + '.txt';
    document.getElementById('aResultPanel').classList.add('show');
    toast('Analiz tamamlandı! Drive\'ı kontrol edin.', 'ok');

  } catch (err) {
    toast('Hata: ' + err.message, 'err');
    btn.disabled = false;
    btn.textContent = "Drive'a Yükle & Analiz Başlat";
  }
}

// TELEGRAM UPLOAD 

async function handleTgUpload() {
  if (!window.tgFile) { toast('Önce ses dosyası seçin', 'err'); return; }

  const btn = document.getElementById('tBtnMain');
  btn.disabled = true;

  try {
    
    setStepT(2); setProg('tProgBar', 15);
    btn.textContent = 'Yükleniyor...';

    const form = new FormData();
    form.append('file', window.tgFile, window.tgFile.name);

    const res = await fetch(CONFIG.sesYukleUrl, {
      method: 'POST',
      body: form
    });

    if (!res.ok) throw new Error('Yükleme hatası: ' + res.status);
    toast('Ses klasörüne yüklendi ✓');

    setStepT(3); setProg('tProgBar', 35);
    btn.textContent = 'Transkripsiyon yapılıyor...';
    toast('n8n devreye girdi — transkripsiyon başladı...');

    setStepT(4); setProg('tProgBar', 60);
    btn.textContent = 'İşleniyor (~15 dk)...';
    toast('Transkripsiyon + Gemini çalışıyor, ~15 dk sürebilir...');

    const totalMs = CONFIG.telegramWaitMs;
    const startTime = Date.now();
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = 60 + Math.min(35, Math.round((elapsed / totalMs) * 35));
      const remaining = Math.max(0, Math.round((totalMs - elapsed) / 60000));
      setProg('tProgBar', pct);
      btn.textContent = `İşleniyor... (~${remaining} dk kaldı)`;
    }, 30000);

    await wait(CONFIG.telegramWaitMs);
    clearInterval(progressInterval);

    setStepT(5); setProg('tProgBar', 100);
    btn.textContent = 'Telegram\'a gönderildi ✓';
    document.getElementById('tResultPanel').classList.add('show');
    toast('Telegram kanalına gönderildi! ✓', 'ok');

  } catch (err) {
    toast('Hata: ' + err.message, 'err');
    btn.disabled = false;
    btn.textContent = "Ses Yükle & Telegram'a Gönder";
  }
}

// SONUÇ DOSYASINI AÇ / İNDİR 

function openAnalysisResult() {
  window.open(`https://drive.google.com/drive/folders/${CONFIG.resultFolderId}`, '_blank');
}

function downloadResult() {
  window.open(`https://drive.google.com/drive/folders/${CONFIG.resultFolderId}`, '_blank');
}

function openTelegram() {
  window.open(CONFIG.telegramUrl, '_blank');
}
