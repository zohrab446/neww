import { useEffect, useState } from 'react';
import { ScrollText, Trash2, ChevronRight, Home } from 'lucide-react';
import type { Reading } from '@/types';
import { fetchReadings, deleteReading } from '@/lib/supabase';

interface HistoryPanelProps {
  onSelect: (reading: Reading) => void;
  onHome: () => void;
}

export default function HistoryPanel({ onSelect, onHome }: HistoryPanelProps) {
  const [readings, setReadings] = useState<Reading[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadReadings();
  }, []);

  async function loadReadings() {
    try {
      setLoading(true);
      const data = await fetchReadings();
      setReadings(data);
    } catch (err) {
      setError('Fallar yüklenirken bir enerji kesintisi oldu. Tekrar dene.');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteReading(id);
      setReadings((prev) => prev.filter((r) => r.id !== id));
    } catch {
      setError('Fal silinemedi, enerji akışı kesildi.');
    }
  }

  const modeEmoji = (mode: string) =>
    mode === 'coffee' ? '☕' : mode === 'love' ? '💞' : mode === 'tarot' ? '🔮' : mode === 'astrology' ? '🌌' : '❓';
  const modeLabel = (mode: string) =>
    mode === 'coffee' ? 'Kahve Falı' : mode === 'love' ? 'Aşk Falı' : mode === 'tarot' ? 'Tarot / Enerji' : mode === 'astrology' ? 'Doğum Haritası' : 'Soru Falı';

  return (
    <div className="relative z-10 min-h-screen px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <button
            onClick={onHome}
            className="text-stone-500 hover:text-amber-400 transition-colors text-sm mb-4 font-serif"
          >
            ← Ana Sayfa
          </button>
          <div className="inline-flex items-center gap-2 text-amber-400/70 text-sm tracking-[0.2em] uppercase mb-3 font-serif">
            <ScrollText className="w-4 h-4" strokeWidth={1.5} />
            Fal Arşivi
          </div>
          <h2 className="text-4xl font-serif font-bold text-amber-100 mb-2">
            Geçmiş Falların
          </h2>
          <p className="text-stone-400 font-serif text-sm">
            Enerjilerin izlerini burada bulabilirsin, Sevgili dostum.
          </p>
        </div>

        {loading && (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 rounded-full border-2 border-amber-500/20 border-t-amber-500/60 animate-spin mb-4" />
            <p className="text-stone-500 font-serif">Enerjiler yükleniyor...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-10">
            <p className="text-rose-400/80 font-serif mb-4">{error}</p>
            <button
              onClick={loadReadings}
              className="px-6 py-2 rounded-full bg-stone-900/60 text-amber-300 font-serif border border-stone-700 hover:border-amber-500/30 transition-all"
            >
              Tekrar Dene
            </button>
          </div>
        )}

        {!loading && !error && readings.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-6 opacity-20">📜</div>
            <p className="text-stone-500 font-serif text-lg mb-2">Henüz fal yok</p>
            <p className="text-stone-600 font-serif text-sm mb-8">
              İlk falın seni bekliyor, gel başlayalım...
            </p>
            <button
              onClick={onHome}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-amber-700 to-amber-900 text-amber-50 font-serif border border-amber-500/30 hover:from-amber-600 hover:to-amber-800 transition-all shadow-lg shadow-amber-900/30"
            >
              Falına Başla
            </button>
          </div>
        )}

        {!loading && readings.length > 0 && (
          <div className="space-y-4">
            {readings.map((r) => (
              <div
                key={r.id}
                className="group bg-stone-950/60 backdrop-blur-xl rounded-2xl border border-amber-500/10 hover:border-amber-500/25 transition-all duration-500 overflow-hidden"
              >
                <div className="flex items-center gap-4 p-5 cursor-pointer" onClick={() => onSelect(r)}>
                  <div className="w-12 h-12 rounded-xl bg-stone-900/80 border border-amber-500/15 flex items-center justify-center text-2xl flex-shrink-0">
                    {modeEmoji(r.mode)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-amber-300/80 text-xs font-serif tracking-wider uppercase">
                        {modeLabel(r.mode)}
                      </span>
                    </div>
                    <p className="text-amber-100 font-serif text-sm truncate">
                      {r.userInfo.name} · {r.userInfo.zodiac}
                    </p>
                    <p className="text-stone-500 text-xs font-serif">
                      {new Date(r.createdAt).toLocaleDateString('tr-TR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(r.id);
                      }}
                      className="p-2 rounded-lg text-stone-600 hover:text-rose-400 hover:bg-rose-950/30 transition-all"
                    >
                      <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                    <ChevronRight className="w-5 h-5 text-stone-600 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
