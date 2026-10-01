import { useState, useRef } from 'react';
import { ChevronRight, Sparkles, User as UserIcon, Heart, Coffee, Upload, X, Loader, Orbit, HelpCircle } from 'lucide-react';
import type { UserInfo, ZodiacSign, Gender, RelationshipStatus } from '@/types';
import { ZODIAC_SIGNS, ZODIAC_INFO } from '@/data/zodiac';
import { analyzeCoffeePhoto, fileToDataUrl } from '@/lib/photoAnalysis';

interface UserInfoFormProps {
  mode: 'coffee' | 'love' | 'tarot' | 'astrology' | 'question';
  onSubmit: (user: UserInfo) => void;
  onBack: () => void;
}

const GENDERS: Gender[] = ['kadın', 'erkek', 'belirtmek istemiyorum'];
const RELATIONSHIP_STATUSES: RelationshipStatus[] = [
  'bekar',
  'ilişkide',
  'evli',
  'ayrıldım',
  'karmaşık',
  'belirtmek istemiyorum',
];

export default function UserInfoForm({ mode, onSubmit, onBack }: UserInfoFormProps) {
  const [name, setName] = useState('');
  const [zodiac, setZodiac] = useState<ZodiacSign | ''>('');
  const [gender, setGender] = useState<Gender | ''>('');
  const [relationshipStatus, setRelationshipStatus] = useState<RelationshipStatus | ''>('');
  const [partnerName, setPartnerName] = useState('');
  const [partnerZodiac, setPartnerZodiac] = useState<ZodiacSign | ''>('');
  const [question, setQuestion] = useState('');
  const [error, setError] = useState('');

  const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(null);
  const [photoSeed, setPhotoSeed] = useState<number | null>(null);
  const [photoStatus, setPhotoStatus] = useState<'idle' | 'analyzing' | 'accepted' | 'rejected'>('idle');
  const [photoMessage, setPhotoMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isCoffeeMode = mode === 'coffee';
  const isLoveMode = mode === 'love';
  const isAstrologyMode = mode === 'astrology';
  const isQuestionMode = mode === 'question';

  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
  const [moonSign, setMoonSign] = useState<ZodiacSign | ''>('');
  const [risingSign, setRisingSign] = useState<ZodiacSign | ''>('');

  async function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setPhotoStatus('rejected');
      setPhotoMessage('Lütfen bir görsel dosya yükle.');
      return;
    }

    setPhotoStatus('analyzing');
    setPhotoMessage('Fincanın enerjisi okunuyor...');

    try {
      const [analysis, dataUrl] = await Promise.all([
        analyzeCoffeePhoto(file),
        fileToDataUrl(file),
      ]);

      if (analysis.isCoffeeCup) {
        setPhotoDataUrl(dataUrl);
        setPhotoSeed(analysis.seed);
        setPhotoStatus('accepted');
        setPhotoMessage(analysis.reason);
      } else {
        setPhotoDataUrl(null);
        setPhotoSeed(null);
        setPhotoStatus('rejected');
        setPhotoMessage(analysis.reason);
      }
    } catch {
      setPhotoStatus('rejected');
      setPhotoMessage('Fotoğraf işlenemedi, tekrar dene.');
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  function handleRemovePhoto() {
    setPhotoDataUrl(null);
    setPhotoSeed(null);
    setPhotoStatus('idle');
    setPhotoMessage('');
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !zodiac || !gender || !relationshipStatus) {
      setError('Lütfen tüm alanları doldur, Sevgili dostum.');
      return;
    }
    if (isLoveMode && !partnerName.trim() && !partnerZodiac) {
      setError('Aşk falı için sevgilinin adını veya burcunu da paylaş.');
      return;
    }
    if (isCoffeeMode && photoStatus !== 'accepted') {
      setError('Kahve falı için fincan fotoğrafı gerekli. Sadece kahve fincanı fotoğrafı kabul edilir.');
      return;
    }
    if (isAstrologyMode && !birthDate) {
      setError('Doğum haritası için doğum tarihi gerekli.');
      return;
    }
    if (isQuestionMode && !question.trim()) {
      setError('Soru falı için bir soru sorman gerekli. Kalbini dök.');
      return;
    }
    setError('');
    onSubmit({
      name: name.trim(),
      zodiac: zodiac as ZodiacSign,
      gender: gender as Gender,
      relationshipStatus: relationshipStatus as RelationshipStatus,
      partnerName: partnerName.trim() || undefined,
      partnerZodiac: partnerZodiac || undefined,
      question: question.trim() || undefined,
      coffeePhoto: photoDataUrl ?? undefined,
      coffeePhotoSeed: photoSeed ?? undefined,
      birthDate: birthDate || undefined,
      birthTime: birthTime || undefined,
      birthPlace: birthPlace.trim() || undefined,
      moonSign: moonSign || undefined,
      risingSign: risingSign || undefined,
    });
  }

  const modeLabel = mode === 'coffee' ? 'Kahve Falı' : mode === 'love' ? 'Aşk Falı' : mode === 'tarot' ? 'Tarot / Enerji' : mode === 'astrology' ? 'Doğum Haritası' : 'Soru Falı';

  return (
    <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <button
            onClick={onBack}
            className="text-stone-500 hover:text-amber-400 transition-colors text-sm mb-4 font-serif"
          >
            ← Geri
          </button>
          <div className="inline-flex items-center gap-2 text-amber-400/70 text-sm tracking-[0.2em] uppercase mb-3 font-serif">
            <Sparkles className="w-4 h-4" strokeWidth={1.5} />
            {modeLabel}
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-amber-100 mb-2">
            Enerjini Tanıyalım
          </h2>
          <p className="text-stone-400 font-serif text-sm">
            Sevgili dostum, senin hakkında ne fısıldandığını duyabilmem için birkaç bilgi paylaş.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-stone-950/60 backdrop-blur-xl rounded-3xl border border-amber-500/15 p-6 md:p-10 space-y-6 shadow-2xl shadow-black/50"
        >
          {isCoffeeMode && (
            <div className="space-y-3 pb-2 border-b border-stone-800/50">
              <label className="flex items-center gap-2 text-amber-300/80 text-sm font-serif">
                <Coffee className="w-4 h-4" strokeWidth={1.5} />
                Fincan Fotoğrafı
              </label>

              {photoStatus === 'accepted' && photoDataUrl ? (
                <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 bg-stone-900/60">
                  <img src={photoDataUrl} alt="Fincan" className="w-full max-h-64 object-contain" />
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-stone-950/80 border border-amber-500/30 flex items-center justify-center text-amber-300 hover:bg-rose-950/60 hover:text-rose-300 transition-all"
                  >
                    <X className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-stone-950/90 to-transparent px-4 py-3">
                    <p className="text-amber-300/90 text-sm font-serif flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      {photoMessage}
                    </p>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={photoStatus === 'analyzing'}
                  className="w-full border-2 border-dashed border-stone-700/60 hover:border-amber-500/40 rounded-2xl py-10 flex flex-col items-center gap-3 transition-all duration-500 group disabled:opacity-50"
                >
                  {photoStatus === 'analyzing' ? (
                    <>
                      <Loader className="w-10 h-10 text-amber-400 animate-spin" strokeWidth={1.5} />
                      <p className="text-amber-300/70 font-serif text-sm">{photoMessage}</p>
                    </>
                  ) : (
                    <>
                      <div className="w-14 h-14 rounded-full bg-stone-900/80 border border-amber-500/15 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <Upload className="w-7 h-7 text-amber-400/60" strokeWidth={1.5} />
                      </div>
                      <p className="text-stone-400 font-serif text-sm">
                        Fincan fotoğrafını yükle
                      </p>
                      <p className="text-stone-600 font-serif text-xs">
                        Kahve tortusu görünür şekilde çekilmiş bir fincan fotoğrafı gerekli
                      </p>
                    </>
                  )}
                </button>
              )}

              {photoStatus === 'rejected' && (
                <div className="flex items-start gap-2 bg-rose-950/30 border border-rose-800/30 rounded-xl px-4 py-3">
                  <X className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <p className="text-rose-300/80 font-serif text-sm">{photoMessage}</p>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </div>
          )}

          <div>
            <label className="flex items-center gap-2 text-amber-300/80 text-sm font-serif mb-2">
              <UserIcon className="w-4 h-4" strokeWidth={1.5} />
              Adın
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Adını fısılda..."
              className="w-full bg-stone-900/60 border border-stone-700/50 rounded-xl px-4 py-3 text-amber-50 placeholder-stone-600 font-serif focus:outline-none focus:border-amber-500/40 focus:bg-stone-900/80 transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-amber-300/80 text-sm font-serif mb-2 block">Burcun</label>
              <select
                value={zodiac}
                onChange={(e) => setZodiac(e.target.value as ZodiacSign)}
                className="w-full bg-stone-900/60 border border-stone-700/50 rounded-xl px-4 py-3 text-amber-50 font-serif focus:outline-none focus:border-amber-500/40 transition-all cursor-pointer"
              >
                <option value="" className="bg-stone-900">Burcunu seç...</option>
                {ZODIAC_SIGNS.map((sign) => (
                  <option key={sign} value={sign} className="bg-stone-900">
                    {sign} ({ZODIAC_INFO[sign].dateRange})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-amber-300/80 text-sm font-serif mb-2 block">Cinsiyetin</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as Gender)}
                className="w-full bg-stone-900/60 border border-stone-700/50 rounded-xl px-4 py-3 text-amber-50 font-serif focus:outline-none focus:border-amber-500/40 transition-all cursor-pointer"
              >
                <option value="" className="bg-stone-900">Seç...</option>
                {GENDERS.map((g) => (
                  <option key={g} value={g} className="bg-stone-900 capitalize">{g}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-amber-300/80 text-sm font-serif mb-2 block">İlişki Durumun</label>
            <div className="flex flex-wrap gap-2">
              {RELATIONSHIP_STATUSES.map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setRelationshipStatus(status)}
                  className={`px-4 py-2 rounded-full text-sm font-serif capitalize transition-all duration-300 ${
                    relationshipStatus === status
                      ? 'bg-amber-700/80 text-amber-50 border border-amber-500/50 shadow-lg shadow-amber-900/30'
                      : 'bg-stone-900/60 text-stone-400 border border-stone-700/50 hover:border-amber-500/20 hover:text-amber-300'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {isQuestionMode && (
            <div className="space-y-3 pb-2 border-b border-stone-800/50">
              <label className="flex items-center gap-2 text-emerald-300/80 text-sm font-serif">
                <HelpCircle className="w-4 h-4" strokeWidth={1.5} />
                Sorun
              </label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Kalbini meşgul eden sorunu buraya yaz... Örn: Para kazanabilir miyim?"
                rows={3}
                className="w-full bg-stone-900/60 border border-stone-700/50 rounded-xl px-4 py-3 text-amber-50 placeholder-stone-600 font-serif focus:outline-none focus:border-emerald-500/30 transition-all resize-none"
              />
              <p className="text-stone-600 font-serif text-xs">
                Enerjiler senin soruna evet, hayır ya da belki diye yanıt verecek. Sorunu net ve içten sor.
              </p>
            </div>
          )}

          {isAstrologyMode && (
            <div className="space-y-4 pb-2 border-b border-stone-800/50">
              <p className="flex items-center gap-2 text-cyan-300/80 text-sm font-serif">
                <Orbit className="w-4 h-4" strokeWidth={1.5} />
                Doğum Bilgilerin
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-amber-300/60 text-xs font-serif mb-1 block">Doğum Tarihi</label>
                  <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full bg-stone-900/60 border border-stone-700/50 rounded-xl px-4 py-3 text-amber-50 font-serif focus:outline-none focus:border-cyan-500/30 transition-all"
                  />
                </div>
                <div>
                  <label className="text-amber-300/60 text-xs font-serif mb-1 block">Doğum Saati (opsiyonel)</label>
                  <input
                    type="time"
                    value={birthTime}
                    onChange={(e) => setBirthTime(e.target.value)}
                    className="w-full bg-stone-900/60 border border-stone-700/50 rounded-xl px-4 py-3 text-amber-50 font-serif focus:outline-none focus:border-cyan-500/30 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="text-amber-300/60 text-xs font-serif mb-1 block">Doğum Yeri (opsiyonel)</label>
                <input
                  type="text"
                  value={birthPlace}
                  onChange={(e) => setBirthPlace(e.target.value)}
                  placeholder="Örn: İstanbul"
                  className="w-full bg-stone-900/60 border border-stone-700/50 rounded-xl px-4 py-3 text-amber-50 placeholder-stone-600 font-serif focus:outline-none focus:border-cyan-500/30 transition-all"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="text-amber-300/60 text-xs font-serif mb-1 block">Ay Burcun (opsiyonel)</label>
                  <select
                    value={moonSign}
                    onChange={(e) => setMoonSign(e.target.value as ZodiacSign)}
                    className="w-full bg-stone-900/60 border border-stone-700/50 rounded-xl px-4 py-3 text-amber-50 font-serif focus:outline-none focus:border-cyan-500/30 transition-all cursor-pointer"
                  >
                    <option value="" className="bg-stone-900">Bilmiyorsan boş bırak...</option>
                    {ZODIAC_SIGNS.map((sign) => (
                      <option key={sign} value={sign} className="bg-stone-900">{sign}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-amber-300/60 text-xs font-serif mb-1 block">Yükselen Burcun (opsiyonel)</label>
                  <select
                    value={risingSign}
                    onChange={(e) => setRisingSign(e.target.value as ZodiacSign)}
                    className="w-full bg-stone-900/60 border border-stone-700/50 rounded-xl px-4 py-3 text-amber-50 font-serif focus:outline-none focus:border-cyan-500/30 transition-all cursor-pointer"
                  >
                    <option value="" className="bg-stone-900">Bilmiyorsan boş bırak...</option>
                    {ZODIAC_SIGNS.map((sign) => (
                      <option key={sign} value={sign} className="bg-stone-900">{sign}</option>
                    ))}
                  </select>
                </div>
              </div>
              <p className="text-stone-600 font-serif text-xs">
                Doğum saati ve yükselen burcun bilmiyorsan, yalnızca güneş ve ay burcunla da analiz yapabilirim.
              </p>
            </div>
          )}

          {isLoveMode && (
            <div className="space-y-4 pt-2 border-t border-stone-800/50">
              <p className="flex items-center gap-2 text-rose-300/80 text-sm font-serif">
                <Heart className="w-4 h-4" strokeWidth={1.5} />
                Aklındaki Kişi (opsiyonel)
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  placeholder="Onun adı..."
                  className="w-full bg-stone-900/60 border border-stone-700/50 rounded-xl px-4 py-3 text-amber-50 placeholder-stone-600 font-serif focus:outline-none focus:border-rose-500/30 transition-all"
                />
                <select
                  value={partnerZodiac}
                  onChange={(e) => setPartnerZodiac(e.target.value as ZodiacSign)}
                  className="w-full bg-stone-900/60 border border-stone-700/50 rounded-xl px-4 py-3 text-amber-50 font-serif focus:outline-none focus:border-rose-500/30 transition-all cursor-pointer"
                >
                  <option value="" className="bg-stone-900">Onun burcu...</option>
                  {ZODIAC_SIGNS.map((sign) => (
                    <option key={sign} value={sign} className="bg-stone-900">{sign}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <div>
            <label className="text-amber-300/80 text-sm font-serif mb-2 block">
              Merak Ettiğin {isQuestionMode ? '' : '(opsiyonel)'}
            </label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Kalbini meşgul eden bir soru var mı?"
              rows={2}
              className="w-full bg-stone-900/60 border border-stone-700/50 rounded-xl px-4 py-3 text-amber-50 placeholder-stone-600 font-serif focus:outline-none focus:border-amber-500/40 transition-all resize-none"
            />
          </div>

          {error && (
            <p className="text-rose-400/80 text-sm font-serif text-center">{error}</p>
          )}

          <button
            type="submit"
            className="group w-full flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-amber-700 to-amber-900 text-amber-50 font-serif text-lg tracking-wide border border-amber-500/30 hover:from-amber-600 hover:to-amber-800 transition-all duration-500 shadow-lg shadow-amber-900/50 hover:scale-[1.02]"
          >
            Falını Aç
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
          </button>
        </form>
      </div>
    </div>
  );
}
