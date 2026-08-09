import { useEffect, useState } from 'react';
import { TreasureHuntProvider, useTreasureHunt } from './components/ButterflyHunt/TreasureHuntContext';
import ButterflyHunt from './components/ButterflyHunt/ButterflyHunt';
import AmbientLayer from './components/AmbientLayer/AmbientLayer';
import PasscodeGate from './components/PasscodeGate/PasscodeGate';
import IntroAnimation from './components/IntroAnimation/IntroAnimation';
import DangerButton from './components/DangerButton/DangerButton';
import Timeline from './components/Timeline/Timeline';
import Polaroids from './components/Polaroids/Polaroids';
import Jokes from './components/Jokes/Jokes';
import Quiz from './components/Quiz/Quiz';
import Envelopes from './components/Envelopes/Envelopes';
import Playlist from './components/Playlist/Playlist';
import Filmstrip from './components/Filmstrip/Filmstrip';
import PhotoHunt from './components/PhotoHunt/PhotoHunt';
import MarkCanvas from './components/MarkCanvas/MarkCanvas';
import BucketList from './components/BucketList/BucketList';
import SlotMachine from './components/SlotMachine/SlotMachine';
import SecretVault from './components/SecretVault/SecretVault';
import Finale from './components/Finale/Finale';

function SiteContent({ unlocked, onUnlock }) {
  const { vaultUnlocked } = useTreasureHunt();

  // Lock page scroll while the passcode gate is up, same as the original.
  useEffect(() => {
    document.body.style.overflow = unlocked ? '' : 'hidden';
  }, [unlocked]);

  return (
    <>
      <AmbientLayer />
      <PasscodeGate unlocked={unlocked} onUnlock={onUnlock} />

      <IntroAnimation />
      <DangerButton />
      <Timeline />
      <Polaroids />
      <Jokes />
      <Quiz />
      <Envelopes />
      <Playlist />
      <Filmstrip />
      <PhotoHunt />
      <MarkCanvas />
      <BucketList />
      <SlotMachine />
      {vaultUnlocked && <SecretVault />}
      <Finale />
      <footer>made with a lot of love, just for you &#129419;</footer>

      <ButterflyHunt />
    </>
  );
}

export default function App() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <TreasureHuntProvider>
      <SiteContent unlocked={unlocked} onUnlock={() => setUnlocked(true)} />
    </TreasureHuntProvider>
  );
}
