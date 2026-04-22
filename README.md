# 📰 HaberAkışı

`PWA` `n8n` `Google Gemini AI` `Google Drive` `Telegram Bot` `Vanilla JS`

---

## 🇹🇷 Türkçe

### Nedir?

HaberAkışı, Kurumsal ihtiyaçlar doğrultusunda geliştirilen yapay zeka destekli bir haber otomasyon sistemidir. Google Drive, n8n ve Google Gemini AI teknolojilerini bir araya getirerek haber içeriklerinin otomatik olarak analiz edilmesini ve dağıtılmasını sağlar.

Sistem, mobil öncelikli bir PWA (Progressive Web App) arayüzü üzerinden çalışır. iPhone ve Android cihazlarda herhangi bir uygulama mağazasına ihtiyaç duymadan, ana ekrana eklenerek native uygulama deneyimi sunar.

### Sistem Nasıl Çalışır?

Uygulama iki farklı yapay zeka iş akışını yönetir.

**İş Akışı 1 — Haber Dosyası Analizi**

Kullanıcı PDF veya TXT formatında bir haber belgesi yükler. Uygulama bu dosyayı n8n webhook aracılığıyla Google Drive'daki Editör klasörüne iletir. Google Drive Trigger devreye girerek n8n iş akışını otomatik olarak başlatır. İş akışı dosya türünü (PDF/TXT) algılayarak uygun yöntemle metni çıkarır ve Google Gemini AI Agent'a iletir. Gemini, metindeki dil bilgisi hatalarını tespit eder, düzeltilmiş metni ve değişiklik raporunu oluşturur. Sonuç, `Analiz_[dosyaadı].txt` formatında Drive'a kaydedilir.

**İş Akışı 2 — Ses Transkripsiyon ve Telegram Dağıtımı**

Kullanıcı bir ses dosyası yükler. Uygulama dosyayı n8n webhook aracılığıyla Google Drive'daki VoiceChan klasörüne iletir. n8n iş akışı dosyayı transkripsiyon servisine yükler, işlemin tamamlanmasını bekler ve transkript metnini alır. Google Gemini AI bu metni analiz ederek özetler ve yapılandırılmış bir belge oluşturur. Oluşturulan belge Telegram Bot API aracılığıyla ilgili kanala otomatik olarak iletilir.

**Canlı Haber Akışı**

Uygulama, ayrı bir n8n webhook üzerinden Kurumun haber sitesi'nin web sitesini düzenli aralıklarla tarar. Çekilen haber başlıkları ve bağlantılar uygulamanın ana ekranında listelenir; başlığa tıklandığında ilgili haber sayfası açılır.

### Teknoloji Yığını

| Teknoloji | Rol |
|-----------|-----|
| n8n | İş akışı otomasyonu ve webhook yönetimi |
| Google Gemini AI | Metin analizi, dil düzeltme ve özetleme |
| Google Drive | Dosya depolama ve iş akışı tetikleyicisi |
| Telegram Bot API | İçerik dağıtımı |
| PWA + Service Worker | Mobil uygulama deneyimi ve offline destek |
| Vanilla JS | Sıfır bağımlılıklı frontend |

---

## 🇬🇧 English

### What is it?

HaberAkışı (News Flow) is an AI-powered news automation system developed for institutional use. It brings together Google Drive, n8n, and Google Gemini AI to enable automatic analysis and distribution of news content.

The system operates through a mobile-first PWA (Progressive Web App) interface. It works on both iPhone and Android devices without requiring any app store installation — users simply add it to their home screen for a native app experience.

### How the System Works

The application manages two distinct AI-powered workflows.

**Workflow 1 — News Document Analysis**

The user uploads a news document in PDF or TXT format. The application sends the file to the Editör folder on Google Drive via an n8n webhook. A Google Drive Trigger activates and automatically initiates the n8n workflow. The workflow detects the file type and extracts the text accordingly, then passes it to the Google Gemini AI Agent. Gemini identifies grammatical errors, produces a corrected version of the text along with a detailed change report, and the result is saved back to Drive as `Analiz_[filename].txt`.

**Workflow 2 — Audio Transcription and Telegram Distribution**

The user uploads an audio file. The application sends it to the VoiceChan folder on Google Drive via an n8n webhook. The n8n workflow uploads the file to a transcription service, waits for processing to complete, and retrieves the transcript. Google Gemini AI then analyzes and summarizes the text into a structured document. The document is automatically sent to the designated Telegram channel via the Telegram Bot API.

**Live News Feed**

The application periodically scrapes the the institution's news website website through a dedicated n8n webhook. The retrieved headlines and links are displayed on the app's home screen, and tapping a headline opens the corresponding news page.

### Tech Stack

| Technology | Role |
|------------|------|
| n8n | Workflow automation and webhook management |
| Google Gemini AI | Text analysis, grammar correction, summarization |
| Google Drive | File storage and workflow trigger |
| Telegram Bot API | Content distribution |
| PWA + Service Worker | Mobile app experience and offline support |
| Vanilla JS | Zero-dependency frontend |

---

*n8n + Google Gemini AI Otomasyon Projesi**
