import { Sparkles, Coffee, Heart, Stars, Orbit, HelpCircle, ScrollText } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
  onHistory: () => void;
}

export default function Hero({ onStart, onHistory }: HeroProps) {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-20 text-center">
      <div className="mb-8 animate-float">
        <div className="relative">
          <div className="absolute inset-0 blur-3xl opacity-30 bg-amber-400 rounded-full" />
          <div className="relative w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-amber-700 via-amber-900 to-stone-950 flex items-center justify-center border border-amber-500/30 shadow-2xl shadow-amber-900/50">
            <Sparkles className="w-12 h-12 text-amber-300" strokeWidth={1.5} />
          </div>
        </div>
      </div>

      <p className="text-amber-400/70 text-sm tracking-[0.3em] uppercase mb-4 font-serif animate-fade-in-up">
        Sezgisel Dijital Kehanet
      </p>

      <h1 className="text-5xl md:text-7xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-amber-600 mb-6 animate-fade-in-up animation-delay-100">
        Mistikrehber AI
      </h1>

      <p className="text-stone-300/80 text-lg md:text-xl max-w-2xl leading-relaxed mb-10 font-serif animate-fade-in-up animation-delay-200">
        Kahvenin sırlarından aşkın frekansına, yıldızların dizilişinden
        kartların fısıltısına, doğum haritanın ışığına ve kalbinin sorusuna kadar...
        Enerjiler bana senin için ne fısıldıyor, dinleyiver.
      </p>

      <div className="flex flex-wrap justify-center gap-6 mb-12 animate-fade-in-up animation-delay-300">
        <div className="flex flex-col items-center gap-2 text-stone-400">
          <div className="w-14 h-14 rounded-full bg-stone-900/80 border border-amber-500/20 flex items-center justify-center">
            <Coffee className="w-6 h-6 text-amber-500/70" strokeWidth={1.5} />
          </div>
          <span className="text-xs tracking-wider">Kahve Falı</span>
        </div>
        <div className="flex flex-col items-center gap-2 text-stone-400">
          <div className="w-14 h-14 rounded-full bg-stone-900/80 border border-amber-500/20 flex items-center justify-center">
            <Heart className="w-6 h-6 text-rose-500/70" strokeWidth={1.5} />
          </div>
          <span className="text-xs tracking-wider">Aşk Falı</span>
        </div>
        <div className="flex flex-col items-center gap-2 text-stone-400">
          <div className="w-14 h-14 rounded-full bg-stone-900/80 border border-amber-500/20 flex items-center justify-center">
            <Stars className="w-6 h-6 text-indigo-300/70" strokeWidth={1.5} />
          </div>
          <span className="text-xs tracking-wider">Tarot / Enerji</span>
        </div>
        <div className="flex flex-col items-center gap-2 text-stone-400">
          <div className="w-14 h-14 rounded-full bg-stone-900/80 border border-amber-500/20 flex items-center justify-center">
            <Orbit className="w-6 h-6 text-cyan-300/70" strokeWidth={1.5} />
          </div>
          <span className="text-xs tracking-wider">Doğum Haritası</span>
        </div>
        <div className="flex flex-col items-center gap-2 text-stone-400">
          <div className="w-14 h-14 rounded-full bg-stone-900/80 border border-amber-500/20 flex items-center justify-center">
            <HelpCircle className="w-6 h-6 text-emerald-300/70" strokeWidth={1.5} />
          </div>
          <span className="text-xs tracking-wider">Soru Falı</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-400">
        <button
          onClick={onStart}
          className="group relative px-10 py-4 rounded-full bg-gradient-to-r from-amber-700 to-amber-900 text-amber-50 font-serif text-lg tracking-wide border border-amber-500/30 hover:from-amber-600 hover:to-amber-800 transition-all duration-500 shadow-lg shadow-amber-900/50 hover:shadow-amber-700/50 hover:scale-105"
        >
          <span className="relative z-10">Falına Başla</span>
          <div className="absolute inset-0 rounded-full bg-amber-400/0 group-hover:bg-amber-400/10 transition-all duration-500" />
        </button>
        <button
          onClick={onHistory}
          className="px-10 py-4 rounded-full bg-stone-900/60 text-stone-300 font-serif text-lg tracking-wide border border-stone-700 hover:border-amber-500/30 hover:text-amber-200 transition-all duration-500 backdrop-blur-sm"
        >
          <span className="flex items-center gap-2">
            <ScrollText className="w-5 h-5" strokeWidth={1.5} />
            Geçmiş Fallar
          </span>
        </button>
      </div>

      <p className="mt-16 text-stone-500/50 text-xs font-serif italic max-w-md animate-fade-in-up animation-delay-500">
        "Gelecek kesin yazılmamıştır; yalnızca olasılıkların izleri vardır."
      </p>
    </div>
  );
}
