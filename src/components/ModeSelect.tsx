import { Coffee, Heart, Stars, Orbit, HelpCircle, ChevronRight } from 'lucide-react';
import type { FortuneMode } from '@/types';

interface ModeSelectProps {
  onSelect: (mode: FortuneMode) => void;
  onBack: () => void;
}

const MODES = [
  {
    mode: 'coffee' as FortuneMode,
    label: 'Kahve Falı',
    description: 'Fincanın sırlarından yükselen semboller, geçmişin izlerini ve yolun fırsatlarını fısıldıyor.',
    icon: Coffee,
    gradient: 'from-amber-700/20 to-amber-950/40',
    border: 'border-amber-600/30',
    hoverBorder: 'hover:border-amber-500/50',
    glow: 'group-hover:shadow-amber-700/20',
    iconColor: 'text-amber-400',
    emoji: '☕',
  },
  {
    mode: 'love' as FortuneMode,
    label: 'Aşk Falı',
    description: 'Kalbin frekansı, aranızdaki bağın gizli akışı ve geleceğin potansiyeli okunmaya hazır.',
    icon: Heart,
    gradient: 'from-rose-800/20 to-rose-950/40',
    border: 'border-rose-600/30',
    hoverBorder: 'hover:border-rose-500/50',
    glow: 'group-hover:shadow-rose-700/20',
    iconColor: 'text-rose-400',
    emoji: '💞',
  },
  {
    mode: 'tarot' as FortuneMode,
    label: 'Tarot / Enerji',
    description: 'Kartların mistik bilgeliği, günün enerjisini ve yarının potansiyelini sana aynalar.',
    icon: Stars,
    gradient: 'from-indigo-700/20 to-indigo-950/40',
    border: 'border-indigo-500/30',
    hoverBorder: 'hover:border-indigo-400/50',
    glow: 'group-hover:shadow-indigo-700/20',
    iconColor: 'text-indigo-300',
    emoji: '🔮',
  },
  {
    mode: 'astrology' as FortuneMode,
    label: 'Doğum Haritası',
    description: 'Gökyüzünün doğum anındaki dizilişi; güneş, ay ve yükselen burcunun ışığında kim olduğunu okuyor.',
    icon: Orbit,
    gradient: 'from-cyan-800/20 to-teal-950/40',
    border: 'border-cyan-600/30',
    hoverBorder: 'hover:border-cyan-500/50',
    glow: 'group-hover:shadow-cyan-700/20',
    iconColor: 'text-cyan-300',
    emoji: '🌌',
  },
  {
    mode: 'question' as FortuneMode,
    label: 'Soru Falı',
    description: 'Kalbini meşgul eden bir soru var? Enerjiler sana evet, hayır ya da belki diye fısıldıyor.',
    icon: HelpCircle,
    gradient: 'from-emerald-800/20 to-green-950/40',
    border: 'border-emerald-600/30',
    hoverBorder: 'hover:border-emerald-500/50',
    glow: 'group-hover:shadow-emerald-700/20',
    iconColor: 'text-emerald-300',
    emoji: '❓',
  },
];

export default function ModeSelect({ onSelect, onBack }: ModeSelectProps) {
  return (
    <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="text-center mb-12">
        <button
          onClick={onBack}
          className="text-stone-500 hover:text-amber-400 transition-colors text-sm mb-4 font-serif"
        >
          ← Geri
        </button>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-amber-100 mb-4">
          Hangi Kapıyı Açalım?
        </h2>
        <p className="text-stone-400 font-serif max-w-xl mx-auto">
          Sevgili dostum, enerjini hangi yoldan okumamı istersin? Her kapının ardında farklı bir hikâye seni bekliyor.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
        {MODES.map((m) => {
          const Icon = m.icon;
          return (
            <button
              key={m.mode}
              onClick={() => onSelect(m.mode)}
              className={`group relative overflow-hidden rounded-3xl border ${m.border} ${m.hoverBorder} bg-gradient-to-br ${m.gradient} backdrop-blur-xl p-8 text-left transition-all duration-500 hover:scale-[1.03] shadow-xl ${m.glow}`}
            >
              <div className="absolute -top-4 -right-4 text-8xl opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                {m.emoji}
              </div>
              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-2xl bg-stone-950/60 border ${m.border} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  <Icon className={`w-8 h-8 ${m.iconColor}`} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-amber-50 mb-3">{m.label}</h3>
                <p className="text-stone-400 font-serif text-sm leading-relaxed mb-6">{m.description}</p>
                <div className={`flex items-center gap-2 text-sm font-serif ${m.iconColor} group-hover:gap-3 transition-all`}>
                  <span>Bu kapıyı aç</span>
                  <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
