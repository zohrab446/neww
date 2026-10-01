export interface PhotoAnalysisResult {
  isCoffeeCup: boolean;
  reason: string;
  dominantColor: { r: number; g: number; b: number };
  warmth: number;
  darkness: number;
  seed: number;
}

export async function analyzeCoffeePhoto(file: File): Promise<PhotoAnalysisResult> {
  const img = await loadImage(file);
  const canvas = document.createElement('canvas');
  const maxSize = 200;
  const scale = Math.min(maxSize / img.width, maxSize / img.height, 1);
  canvas.width = Math.max(1, Math.round(img.width * scale));
  canvas.height = Math.max(1, Math.round(img.height * scale));
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return fallbackResult('Görüntü işlenemedi, ama yine de fal bakalım.');
  }
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  let imageData: ImageData;
  try {
    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  } catch {
    return fallbackResult('Görüntü verisi okunamadı.');
  }

  const data = imageData.data;
  let totalR = 0, totalG = 0, totalB = 0;
  let warmPixels = 0;
  let darkPixels = 0;
  let brownPixels = 0;
  let totalPixels = 0;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];
    if (a < 128) continue;

    totalPixels++;
    totalR += r;
    totalG += g;
    totalB += b;

    const brightness = (r + g + b) / 3;
    if (brightness < 80) darkPixels++;

    const warmth = r - b;
    if (warmth > 20 && r > 50) warmPixels++;

    if (
      r > 40 && r < 200 &&
      g > 20 && g < r * 0.85 &&
      b > 10 && b < g * 0.8 &&
      r > g && g > b &&
      brightness < 180
    ) {
      brownPixels++;
    }
  }

  if (totalPixels === 0) {
    return fallbackResult('Görüntü boş görünüyor.');
  }

  const avgR = totalR / totalPixels;
  const avgG = totalG / totalPixels;
  const avgB = totalB / totalPixels;
  const avgBrightness = (avgR + avgG + avgB) / 3;
  const avgWarmth = avgR - avgB;

  const darkRatio = darkPixels / totalPixels;
  const warmRatio = warmPixels / totalPixels;
  const brownRatio = brownPixels / totalPixels;

  let score = 0;
  if (brownRatio > 0.08) score += 3;
  else if (brownRatio > 0.03) score += 2;
  else if (brownRatio > 0.01) score += 1;

  if (warmRatio > 0.25) score += 2;
  else if (warmRatio > 0.1) score += 1;

  if (darkRatio > 0.15 && darkRatio < 0.85) score += 1;

  if (avgWarmth > 10) score += 1;

  if (avgBrightness < 200 && avgBrightness > 20) score += 1;

  const isCoffeeCup = score >= 4;

  let reason = '';
  if (!isCoffeeCup) {
    if (avgBrightness > 200) {
      reason = 'Bu görüntü çok parlak, bir kahve fincanı değil gibi. Fincan fotoğrafını karanlık bir zeminde, tortu görünür şekilde çek.';
    } else if (brownRatio < 0.01 && warmRatio < 0.05) {
      reason = 'Bu görüntüde kahve rengi tonlar görünmüyor. İçinde kahve tortusu olan bir fincan fotoğrafı paylaş.';
    } else if (avgBrightness < 15) {
      reason = 'Bu görüntü çok karanlık, hiçbir şey seçilmiyor. Fincanı biraz daha aydınlıkta çek.';
    } else {
      reason = 'Bu bir kahve fincanı fotoğrafı gibi görünmüyor. Lütfen içi kahve tortulu bir fincanın fotoğrafını yükle.';
    }
  } else {
    reason = 'Fincanın enerjisi alındı, tortunun dili okunmaya hazır.';
  }

  const seed = Math.round(avgR * 1000 + avgG * 100 + avgB + brownPixels + warmPixels * 7) >>> 0;

  return {
    isCoffeeCup,
    reason,
    dominantColor: { r: Math.round(avgR), g: Math.round(avgG), b: Math.round(avgB) },
    warmth: avgWarmth,
    darkness: avgBrightness,
    seed,
  };
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Görüntü yüklenemedi.'));
    img.src = URL.createObjectURL(file);
  });
}

function fallbackResult(reason: string): PhotoAnalysisResult {
  return {
    isCoffeeCup: false,
    reason,
    dominantColor: { r: 128, g: 80, b: 40 },
    warmth: 20,
    darkness: 80,
    seed: 0,
  };
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Dosya okunamadı.'));
    reader.readAsDataURL(file);
  });
}
