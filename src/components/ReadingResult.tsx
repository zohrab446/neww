import { useState, useEffect } from 'react';
import { RotateCcw, Home, Trash2 } from 'lucide-react';
import type { Reading } from '@/types';
import { ZODIAC_INFO } from '@/data/zodiac';

interface ReadingResultProps {
  reading: Reading;
  onNewReading: () => void;
  onHome: () => void;
  onDelete?: (id: string) => void;
}

export default function ReadingResult({ reading, onNewReading, onHome, onDelete }: ReadingResultProps) {
  const [visibleSections, setVisibleSections] = useState(0);

  useEffect(() => {
    setVisibleSections(0);
    const timers: ReturnType<typeof setTimeout>[] = [];
    reading.sections.forEach((_, i) => {
      timers.push(
        setTimeout(() => setVisibleSections(i + 1), 600 * (i + 1)),
      );
    });
    return () => timers.forEach(clearTimeout);
  }, [reading]);

  const modeLabel =
    reading.mode === 'coffee' ? 'Kahve Falı' : reading.mode === 'love' ? 'Aşk Falı' : reading.mode === 'tarot' ? 'Tarot / Enerji' : reading.mode === 'astrology' ? 'Doğum Haritası' : 'Soru Falı';
  const modeEmoji = reading.mode === 'coffee' ? '☕' : reading.mode === 'love' ? '💞' : reading.mode === 'tarot' ? '🔮' : reading.mode === 'astrology' ? '🌌' : '❓';
  const zodiacInfo = ZODIAC_INFO[reading.userInfo.zodiac];

  return (
    <div className="relative z-10 min-h-screen px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block px-4 py-1.5 rounded-full bg-stone-900/80 border border-amber-500/20 text-amber-400/70 text-xs tracking-[0.2em] uppercase font-serif mb-4">
            {modeEmoji} {modeLabel}
          </div>
          <p className="text-stone-500 text-sm font-serif">
            {new Date(reading.createdAt).toLocaleDateString('tr-TR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>

        <div className="bg-stone-950/60 backdrop-blur-xl rounded-3xl border border-amber-500/15 overflow-hidden shadow-2xl shadow-black/50">
          <div className="p-6 md:p-10">
            <div className="mb-8 pb-6 border-b border-stone-800/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-700 to-amber-900 border border-amber-500/20 flex items-center justify-center text-lg">
                  ✦
                </div>
                <div>
                  <p className="text-amber-200 font-serif text-lg">Mistikrehber AI</p>
                  <p className="text-stone-500 text-xs font-serif">
                    {reading.userInfo.name} · {reading.userInfo.zodiac} · {zodiacInfo.element}
                  </p>
                </div>
              </div>
              <p className="text-amber-100/90 font-serif text-lg leading-relaxed italic">
                {reading.greeting}
              </p>
            </div>

            {reading.mode === 'coffee' && reading.userInfo.coffeePhoto && (
              <div className="mb-8 rounded-2xl overflow-hidden border border-amber-500/15 bg-stone-900/40">
                <img
                  src={reading.userInfo.coffeePhoto}
                  alt="Fal bakılan fincan"
                  className="w-full max-h-72 object-cover"
                />
                <div className="px-4 py-2 bg-stone-950/60">
                  <p className="text-amber-400/50 text-xs font-serif tracking-wider uppercase">
                    Falı bakılan fincan
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-6">
              {reading.sections.map((section, i) => (
                <div
                  key={i}
                  className={`transition-all duration-700 ${
                    i < visibleSections
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4 pointer-events-none'
                  }`}
                >
                  <div className="bg-stone-900/40 rounded-2xl border border-stone-800/50 p-5 hover:border-amber-500/15 transition-colors duration-500">
                    <h3 className="flex items-center gap-2 text-amber-300 font-serif text-lg mb-3">
                      <span className="text-xl">{section.emoji}</span>
                      {section.title}
                    </h3>
                    <p className="text-stone-300 font-serif leading-relaxed whitespace-pre-line">
                      {renderContent(section.content)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {visibleSections >= reading.sections.length && (
              <div className="mt-8 pt-6 border-t border-stone-800/50 animate-fade-in-up">
                {/* Summary */}
                <div className="mb-6">
                  <h3 className="flex items-center gap-2 text-amber-300/80 font-serif text-sm tracking-wider uppercase mb-3">
                    <span className="text-base">📜</span>
                    Falın Özeti
                  </h3>
                  <div className="bg-stone-900/50 rounded-2xl border border-amber-500/10 p-4">
                    <p className="text-stone-300/90 font-serif text-sm leading-relaxed">
                      {reading.summary}
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-amber-950/40 to-stone-950/40 rounded-2xl border border-amber-500/10 p-5">
                  <p className="text-amber-200/90 font-serif italic leading-relaxed">
                    {reading.closing}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {visibleSections >= reading.sections.length && (
          <div className="flex flex-wrap justify-center gap-4 mt-8 animate-fade-in-up">
            <button
              onClick={onNewReading}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-700 to-amber-900 text-amber-50 font-serif border border-amber-500/30 hover:from-amber-600 hover:to-amber-800 transition-all duration-500 shadow-lg shadow-amber-900/30 hover:scale-105"
            >
              <RotateCcw className="w-4 h-4" strokeWidth={1.5} />
              Yeni Fal
            </button>
            <button
              onClick={onHome}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-stone-900/60 text-stone-300 font-serif border border-stone-700 hover:border-amber-500/30 hover:text-amber-200 transition-all duration-500"
            >
              <Home className="w-4 h-4" strokeWidth={1.5} />
              Ana Sayfa
            </button>
            {onDelete && (
              <button
                onClick={() => onDelete(reading.id)}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-stone-900/40 text-rose-400/60 font-serif border border-stone-800 hover:border-rose-500/20 hover:text-rose-400 transition-all duration-500"
              >
                <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                Sil
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function renderContent(content: string): React.ReactNode {
  const parts = content.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <span key={i} className="text-amber-200 font-semibold">
          {part.slice(2, -2)}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}
