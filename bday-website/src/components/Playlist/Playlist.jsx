import SectionHead from '../SectionHead/SectionHead';
import { SPOTIFY_EMBED_URL } from '../../config';
import './Playlist.css';

export default function Playlist() {
  return (
    <section id="playlist-section">
      <SectionHead tag="our soundtrack">Songs That Sound Like Us</SectionHead>
      <div className="playlist-wrap">
        <iframe
          id="spotifyFrame"
          title="Our playlist"
          style={{ borderRadius: 18 }}
          src={SPOTIFY_EMBED_URL || 'about:blank'}
          width="100%"
          height="352"
          frameBorder="0"
          allowFullScreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
        <p style={{ opacity: 0.7, fontSize: '0.85rem', marginTop: 8 }}>
          [Paste a link to your playlist here]
        </p>
      </div>
    </section>
  );
}
