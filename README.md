# 🎬 AI Video Showcase  

<p align="center">
  <a href="https://github.com/remotion-dev/logo">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-dark.apng">
      <img alt="Animated Remotion Logo" src="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-light.gif">
    </picture>
  </a>
</p>

## "Video is Engineered."

Bu proje, Remotion (TypeScript) kullanılarak geliştirilmiş, tamamen kod ile üretilen dinamik ve profesyonel bir video case study çalışmasıdır.

Biz bu projede videoyu **render etmiyoruz**, kodluyoruz.

---

# 🎯 Amaç

Bu çalışma aşağıdaki gereksinimleri karşılamak amacıyla geliştirilmiştir:

- Remotion ile geliştirilmiş
- En az 1 dakika uzunluğunda
- Dinamik geçişlere sahip
- Gerçek API verisi ile beslenen
- AI entegrasyonu içeren
- Reklam kalitesinde tasarlanmış

bir video üretmek.

Bu proje bir motion-design denemesi değil, bir **motion engineering** çalışmasıdır.

---

# 🧠 Seçilen İçerik Konsepti

Proje üç konsepti birleştirir:

- ✅ AI Showcase
- ✅ Data-Driven News
- ✅ Ürün Lansmanı anlatımı

Video akışı bilinçli bir hikaye yapısına sahiptir:

1. Geleneksel video üretim problemi
2. Kod ile üretim fikri
3. AI pipeline süreci
4. Gerçek zamanlı veri entegrasyonu
5. AI ile üretilmiş görsel
6. Sistem etkisi ve ölçeklenebilirlik
7. Final mesaj

---

# 🏗 Proje Mimarisi

```
AI-VIDEO-SHOWCASE
│
├── public/
│   ├── audio/
│   │   └── epic-cinematic-trailer.mp3
│   └── images/
│       └── ai-output.png
│
├── src/
│   ├── scenes/
│   │   ├── Intro.tsx
│   │   ├── Problem.tsx
│   │   ├── Shift.tsx
│   │   ├── AIScene.tsx
│   │   ├── PipelineScene.tsx
│   │   ├── AIOutputScene.tsx
│   │   ├── DataScene.tsx
│   │   ├── PreviewScene.tsx
│   │   ├── MomentumScene.tsx
│   │   ├── ImpactScene.tsx
│   │   └── Finale.tsx
│   │
│   ├── utils/
│   │   └── fetchStats.ts
│   │
│   ├── Master.tsx
│   ├── Root.tsx
│   └── index.ts
│
├── remotion.config.ts
├── package.json
└── README.md
```

Tüm zaman çizelgesi `Master.tsx` içerisinde otomatik olarak hesaplanır.  
Her sahne bağımsız ve modüler bir bileşendir.

---

# 🎬 Scene Akışı

## 1️⃣ Intro
Marka mesajı:  
**“The Future of Video is Code.”**

Dinamik gradient + scale animasyonu.

---

## 2️⃣ Problem
Geleneksel video üretim sürecinin yavaş, pahalı ve manuel olduğu vurgulanır.

---

## 3️⃣ Shift
Soru:
> "But what if video was generated from code?"

Paradigma değişimi başlatılır.

---

## 4️⃣ AIScene
AI üretim süreci simüle edilir:

- Prompt parsing
- Visual hierarchy design
- Timeline composition
- Render scheduling

LLM tabanlı metin üretimi kullanılmıştır.

---

## 5️⃣ PipelineScene
Kod ile video üretim pipeline'ı gösterilir:

```
<Pipeline>
  <Prompt />
  <Script />
  <DesignSystem />
  <DataOverlay />
  <Timeline />
  <Render />
</Pipeline>
```

Bu sahne “video = sistem” fikrini güçlendirir.

---

## 6️⃣ AIOutputScene
DALL·E ile üretilmiş görsel ekranda gösterilir:

```
public/images/ai-output.png
```

Bu sahne AI’nin gerçek çıktısını temsil eder.

---

## 7️⃣ DataScene
Gerçek Binance API bağlantısı yapılır:

```
https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT
```

Canlı veri:

- Fiyat animasyonu
- Yüzde değişim
- Grafik çizimi
- Ticker akışı

ile görselleştirilir.

API başarısız olursa fallback değeri kullanılır.

---

## 8️⃣ PreviewScene
Oluşturulan sistemin “final render preview” hissi verilir.

---

## 9️⃣ MomentumScene
Sistem ölçeklenebilirlik mesajı:

- Systems in motion.
- Intelligence in action.

---

## 🔟 ImpactScene
Sistem etkisi:

- Faster production
- Automated pipelines
- Scalable video infrastructure

---

## 1️⃣1️⃣ Finale
Final mesaj:

**Video is Engineered.**

---

# 🤖 AI Entegrasyonu

Bu projede AI iki farklı şekilde kullanılmıştır:

### 1️⃣ Görsel Üretimi
DALL·E ile üretildi:
```
public/images/ai-output.png
```

### 2️⃣ Metin ve Pipeline Kurgusu
LLM yardımıyla:

- Generative engine metinleri
- Pipeline tasarımı
- Hikaye yapısı

oluşturulmuştur.

AI sadece asset değil, anlatı sistemine entegre edilmiştir.

---

# 📊 Veri Entegrasyonu

DataScene gerçek API’den veri alır.

Render sırasında:

- delayRender
- continueRender
- fallback mekanizması

kullanılmıştır.

Bu sayede render süreci güvenlidir.

---

# 🎨 Tasarım Prensipleri

- Modern sans-serif + monospace kombinasyonu
- Mavi-mor AI renk paleti
- Grid sistem arka planlar
- Glow ve depth efektleri
- Minimal ama premium kompozisyon

Amaç: “startup launch trailer” estetiği.

---

# ⚙ Teknik Özellikler

- Remotion
- TypeScript
- React Hooks
- Modüler scene yapısı
- Otomatik timeline hesaplama
- Dinamik fade geçişleri
- API entegrasyonu
- AI asset kullanımı

Video Süresi: ~70 saniye  
FPS: 30  
Çözünürlük: 1920x1080  

---

# 🚀 Render Alma

```bash
npx remotion render AIShowcaseMaster out/video.mp4
```

---
# 🎬 Final Çıktı

Bu proje kapsamında üretilen nihai video çıktısı repository içerisinde yer almaktadır:

video.mp4

• Çözünürlük: 1920x1080 (Full HD)  
• Süre: ~70 saniye  
• Render Motoru: Remotion  
• Geliştirme Dili: TypeScript  
• Kodlanmış Video Mimarisi

---
# 📦 Teslim İçeriği

- GitHub repository
- Final mp4 dosyası
- Modüler kod yapısı

---

# 💡 Bu Proje Neyi Gösterir?

Bu çalışma şunları birlikte kanıtlar:

- Motion engineering yaklaşımı
- AI entegrasyonu
- Gerçek veri ile video üretimi
- Tasarım + yazılım birleşimi
- Ölçeklenebilir video mimarisi

---

# 🔥 Son Mesaj

Video artık bir medya formatı değildir.

Kod ile tasarlanabilir.  
AI ile beslenebilir.  
Veri ile dinamik hale getirilebilir.  
Sistem olarak ölçeklenebilir.

Video is Engineered.

# Hazırlayan

- Gürel BİLGİN
