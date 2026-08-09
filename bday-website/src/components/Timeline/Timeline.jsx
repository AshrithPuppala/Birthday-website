import { useEffect, useRef } from 'react';
import SectionHead from '../SectionHead/SectionHead';
import SecretSpot from '../ButterflyHunt/SecretSpot';
import timelineData from '../../data/timelineData';
import './Timeline.css';

/**
 * "Our story so far" - each entry fades/slides in as it scrolls into view,
 * via the same IntersectionObserver approach as the original.
 */
export default function Timeline() {
  const itemRefs = useRef([]);
  itemRefs.current = [];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('in-view');
        });
      },
      { threshold: 0.2 }
    );
    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="timeline-section">
      <SectionHead tag="our story, so far">The Journey</SectionHead>
      <div className="timeline" id="timeline">
        {timelineData.map((item, i) => (
          <div
            className="t-item"
            key={i}
            ref={(el) => (itemRefs.current[i] = el)}
          >
            <div className="t-date">{item.date}</div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
      <SecretSpot id="s3" />
    </section>
  );
}
