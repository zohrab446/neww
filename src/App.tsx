import { useState } from 'react';
import type { AppPhase, FortuneMode, UserInfo, Reading } from '@/types';
import { generateReading } from '@/engine/generateReading';
import { saveReading } from '@/lib/supabase';
import StarField from '@/components/StarField';
import Hero from '@/components/Hero';
import ModeSelect from '@/components/ModeSelect';
import UserInfoForm from '@/components/UserInfoForm';
import ReadingRitual from '@/components/ReadingRitual';
import ReadingResult from '@/components/ReadingResult';
import HistoryPanel from '@/components/HistoryPanel';

function App() {
  const [phase, setPhase] = useState<AppPhase>('intro');
  const [selectedMode, setSelectedMode] = useState<FortuneMode | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [reading, setReading] = useState<Reading | null>(null);
  const [saveError, setSaveError] = useState('');

  async function handleReadingComplete() {
    if (!userInfo || !selectedMode) return;
    const generated = generateReading(userInfo, selectedMode);
    setReading(generated);
    setPhase('result');
    try {
      await saveReading(generated);
    } catch {
      setSaveError('Falın oluşturuldu ama arşive kaydedilemedi. Yine de okuyabilirsin.');
    }
  }

  function handleModeSelect(mode: FortuneMode) {
    setSelectedMode(mode);
    setPhase('form');
  }

  function handleFormSubmit(user: UserInfo) {
    setUserInfo(user);
    setPhase('reading');
  }

  function handleNewReading() {
    setReading(null);
    setUserInfo(null);
    setSelectedMode(null);
    setSaveError('');
    setPhase('mode-select');
  }

  function handleHome() {
    setReading(null);
    setUserInfo(null);
    setSelectedMode(null);
    setSaveError('');
    setPhase('intro');
  }

  function handleHistorySelect(r: Reading) {
    setReading(r);
    setPhase('result');
  }

  return (
    <div className="min-h-screen bg-stone-950 relative overflow-hidden">
      <StarField />
      <div className="relative z-10">
        {phase === 'intro' && (
          <Hero onStart={() => setPhase('mode-select')} onHistory={() => setPhase('history')} />
        )}
        {phase === 'mode-select' && (
          <ModeSelect onSelect={handleModeSelect} onBack={handleHome} />
        )}
        {phase === 'form' && selectedMode && (
          <UserInfoForm
            mode={selectedMode}
            onSubmit={handleFormSubmit}
            onBack={() => setPhase('mode-select')}
          />
        )}
        {phase === 'reading' && selectedMode && (
          <ReadingRitual
            mode={selectedMode}
            onComplete={handleReadingComplete}
            coffeePhoto={userInfo?.coffeePhoto}
          />
        )}
        {phase === 'result' && reading && (
          <>
            {saveError && (
              <p className="text-center text-amber-400/60 text-sm font-serif pt-4">{saveError}</p>
            )}
            <ReadingResult
              reading={reading}
              onNewReading={handleNewReading}
              onHome={handleHome}
              onDelete={phase === 'result' && reading ? undefined : undefined}
            />
          </>
        )}
        {phase === 'history' && (
          <HistoryPanel onSelect={handleHistorySelect} onHome={handleHome} />
        )}
      </div>
    </div>
  );
}

export default App;
