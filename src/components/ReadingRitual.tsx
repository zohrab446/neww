import { useEffect, useState } from 'react';
import { Coffee, Heart, Stars, Orbit, HelpCircle } from 'lucide-react';
import type { FortuneMode } from '@/types';
import FortuneTeller from '@/components/FortuneTeller';

interface ReadingRitualProps {
  mode: FortuneMode;
  onComplete: () => void;
  coffeePhoto?: string;
}

const RITUAL_STEPS: Record<FortuneMode, string[]> = {
  coffee: [
    'Fincan elinde, buharı yükseliyor...',
    'Kahvenin tortusu yavaşça çöküyor...',
    'Semboller fincanın duvarında belirmeye başlıyor...',
    'Enerjiler okunuyor, sırlar çözülüyor...',
  ],
  love: [
    'Kalbinin frekansına ayarlanıyorum...',
    'Aranızdaki görünmez bağı okuyorum...',
    'Gizli kalmış duygular yüzeye vuruyor...',
    'Aşkın kozmik haritası netleşiyor...',
  ],
  tarot: [
    'Kartlar karışıyor, enerjini emiyor...',
    'Görünmez el kartları diziyor...',
    'Sezgilerin senin için kartı seçiyor...',
    'Kartın sırrı açılıyor...',
  ],
  astrology: [
    'Gökyüzünün haritası açılıyor...',
    'Doğum anındaki yıldızlar uyanıyor...',
    'Güneş, Ay ve yükselen burcun dizilişi netleşiyor...',
    'Gezegenlerin fısıltısı okunuyor...',
  ],
  question: [
    'Sorun enerjilere ulaşıyor...',
    'Evren senin için cevap arıyor...',
    'Sezgiler netleşiyor, cevap yüzeye vuruyor...',
    'Sessizliğin içinden bir yankı geliyor...',
  ],
};

export default function ReadingRitual({ mode, onComplete, coffeePhoto }: ReadingRitualProps) {
  const [step, setStep] = useState(0);
  const steps = RITUAL_STEPS[mode];
  const Icon = mode === 'coffee' ? Coffee : mode === 'love' ? Heart : mode === 'tarot' ? Stars : mode === 'astrology' ? Orbit : HelpCircle;
  const iconColor = mode === 'coffee' ? 'text-amber-400' : mode === 'love' ? 'text-rose-400' : mode === 'tarot' ? 'text-indigo-300' : mode === 'astrology' ? 'text-cyan-300' : 'text-emerald-300';

  useEffect(() => {
    if (step >= steps.length) {
      const timer = setTimeout(onComplete, 500);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => setStep((s) => s + 1), 1200);
    return () => clearTimeout(timer);
  }, [step, steps.length, onComplete]);

  return (
    <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
      {/* Fortune teller woman with smoke - bottom of screen */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-0 opacity-80">
        <FortuneTeller />
      </div>

      {/* Central ritual icon */}
      <div className="relative mb-12 z-10">
        <div className="absolute inset-0 blur-3xl opacity-40 bg-amber-500 rounded-full animate-pulse" />
        {mode === 'coffee' && coffeePhoto ? (
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-amber-500/30 shadow-2xl shadow-amber-900/50">
            <img src={coffeePhoto} alt="Fincan" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 to-transparent" />
          </div>
        ) : (
          <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-stone-900 to-stone-950 border border-amber-500/20 flex items-center justify-center">
            <Icon
              className={`w-16 h-16 ${iconColor} animate-pulse`}
              strokeWidth={1}
            />
          </div>
        )}
        <div className="absolute inset-0 rounded-full border-2 border-amber-500/20 animate-spin-slow pointer-events-none" />
        <div className="absolute inset-[-12px] rounded-full border border-amber-500/10 animate-spin-slower pointer-events-none" />
      </div>

      <div className="space-y-3 max-w-md text-center z-10">
        {steps.map((s, i) => (
          <p
            key={i}
            className={`font-serif text-lg transition-all duration-700 ${
              i < step
                ? 'text-amber-300/80 opacity-60'
                : i === step
                  ? 'text-amber-100 opacity-100 scale-105'
                  : 'text-stone-700 opacity-30'
            }`}
          >
            {s}
          </p>
        ))}
      </div>

      <div className="mt-12 flex gap-2 z-10">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-500 ${
              i <= step ? 'w-8 bg-amber-500/60' : 'w-4 bg-stone-800'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
