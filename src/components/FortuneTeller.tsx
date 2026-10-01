export default function FortuneTeller() {
  return (
    <div className="relative flex flex-col items-center justify-end pointer-events-none select-none">
      {/* Smoke layers - behind and around the figure */}
      <div className="absolute inset-0 flex items-end justify-center overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-[32rem]">
          <div className="absolute bottom-0 left-[20%] w-32 h-32 rounded-full bg-stone-500/10 blur-2xl animate-smoke-1" />
          <div className="absolute bottom-8 left-[45%] w-28 h-28 rounded-full bg-stone-400/8 blur-2xl animate-smoke-2" />
          <div className="absolute bottom-4 right-[20%] w-36 h-36 rounded-full bg-amber-700/8 blur-3xl animate-smoke-3" />
          <div className="absolute bottom-12 left-[35%] w-24 h-24 rounded-full bg-stone-300/6 blur-xl animate-smoke-4" />
          <div className="absolute bottom-2 left-[55%] w-20 h-20 rounded-full bg-amber-600/6 blur-xl animate-smoke-1" />
          <div className="absolute bottom-16 right-[30%] w-28 h-28 rounded-full bg-stone-400/5 blur-2xl animate-smoke-2" />
        </div>
      </div>

      {/* Fortune teller figure - large and prominent */}
      <img
        src="/fortune-teller.webp"
        alt="Falçı kadın"
        className="relative z-10 w-72 h-72 md:w-96 md:h-96 object-contain animate-float-slow opacity-95 drop-shadow-2xl"
        style={{ filter: 'drop-shadow(0 0 30px rgba(180, 120, 40, 0.2))' }}
      />

      {/* Ambient glow at base */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72 h-16 rounded-full bg-amber-700/15 blur-2xl" />
    </div>
  );
}
