import { useMemo, useState } from 'react';
import SectionHead from '../SectionHead/SectionHead';
import Modal from '../Modal/Modal';
import wallGameLevels from '../../data/wallGameLevels';
import { fireConfetti } from '../../utils/confetti';
import './PhotoHunt.css';

function gridSizeForLevel(levelIndex) {
  return Math.min(3 + Math.floor(levelIndex / 3), 5); // grows from 3x3 up to 5x5
}

/**
 * "The Photo Hunt": a small tile-matching game where clearing a level
 * unlocks one more photo on the wall below. Combines what were three
 * separate pieces of DOM-manipulation in the original (renderLevel,
 * renderPhotoWall, the lightbox) into one component with local state.
 */
export default function PhotoHunt() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [wrongTile, setWrongTile] = useState(null);
  const [justUnlockedIndex, setJustUnlockedIndex] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const allCleared = currentLevel >= wallGameLevels.length;

  // Recompute the grid + target tile only when the level changes, so the
  // "different" tile doesn't jump around on every re-render.
  const { size, total, targetIndex, level } = useMemo(() => {
    if (allCleared) return { size: 0, total: 0, targetIndex: -1, level: null };
    const size = gridSizeForLevel(currentLevel);
    const total = size * size;
    return {
      size,
      total,
      targetIndex: Math.floor(Math.random() * total),
      level: wallGameLevels[currentLevel],
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLevel]);

  function handleTileClick(i) {
    if (i === targetIndex) {
      clearLevel();
    } else {
      setWrongTile(i);
      setTimeout(() => setWrongTile(null), 350);
    }
  }

  function clearLevel() {
    const clearedIndex = currentLevel;
    fireConfetti({ particleCount: 70, spread: 65, origin: { y: 0.6 } });
    if (clearedIndex + 1 >= wallGameLevels.length) {
      setTimeout(
        () => fireConfetti({ particleCount: 220, spread: 150, origin: { y: 0.5 } }),
        300
      );
    }
    setJustUnlockedIndex(clearedIndex);
    setTimeout(() => setCurrentLevel((l) => l + 1), 650);
  }

  return (
    <section id="wall-section">
      <SectionHead tag="clear a level, unlock a photo">The Photo Hunt</SectionHead>

      <div className="game-box">
        <div className="game-progress">
          <div
            className="game-progress-bar"
            id="gameProgressBar"
            style={{ width: `${(currentLevel / wallGameLevels.length) * 100}%` }}
          />
        </div>
        <div className="game-label" id="gameLevelLabel">
          {allCleared ? 'All 10 levels cleared! 🎉' : `Level ${currentLevel + 1} of ${wallGameLevels.length}`}
        </div>
        <div className="game-hint" id="gameHint">
          {allCleared ? (
            <div className="game-complete">
              You found every memory on the wall. Happy Birthday, love. 💛
            </div>
          ) : (
            "Find the tile that doesn't match!"
          )}
        </div>
        {!allCleared && (
          <div
            className="game-grid"
            id="gameGrid"
            style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
          >
            {Array.from({ length: total }).map((_, i) => (
              <button
                key={i}
                className={`game-tile${wrongTile === i ? ' wrong' : ''}`}
                onClick={() => handleTileClick(i)}
              >
                {i === targetIndex ? level.target : level.base}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="wall-grid" id="wallGrid">
        {wallGameLevels.map((lvl, i) => {
          const unlocked = i < currentLevel;
          const isNew = i === justUnlockedIndex && i === currentLevel - 1;
          return (
            <div
              key={i}
              className={`wall-tile${unlocked ? '' : ' locked'}${isNew ? ' just-unlocked' : ''}`}
              data-index={i}
              onClick={() => unlocked && setLightboxIndex(i)}
            >
              {unlocked ? (
                lvl.type === 'video' ? (
                  <>
                    <video
                      src={lvl.src}
                      muted
                      playsInline
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <span className="wall-play">▶</span>
                  </>
                ) : (
                  <img src={lvl.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                )
              ) : (
                '🔒'
              )}
            </div>
          );
        })}
      </div>

      <Modal open={lightboxIndex !== null} onClose={() => setLightboxIndex(null)}>
        {lightboxIndex !== null && (
          <WallLightboxContent level={wallGameLevels[lightboxIndex]} />
        )}
      </Modal>
    </section>
  );
}

function WallLightboxContent({ level }) {
  return (
    <>
      <div id="wallModalEmoji" style={{ fontSize: '3.2rem', marginBottom: 10 }}>
        {level.type === 'video' ? (
          <video
            src={level.src}
            controls
            autoPlay
            playsInline
            style={{ width: '100%', borderRadius: 12, maxHeight: '55vh' }}
          />
        ) : (
          <img
            src={level.src}
            alt=""
            style={{ width: '100%', borderRadius: 12, maxHeight: '55vh', objectFit: 'contain' }}
          />
        )}
      </div>
      <p id="wallModalText" style={{ display: level.caption ? '' : 'none' }}>
        {level.caption || ''}
      </p>
    </>
  );
}
