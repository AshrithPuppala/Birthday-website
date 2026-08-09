import { useState } from 'react';
import SectionHead from '../SectionHead/SectionHead';
import bucketListData from '../../data/bucketListData';
import './BucketList.css';

export default function BucketList() {
  const [checked, setChecked] = useState(() => bucketListData.map(() => false));

  function toggle(i) {
    setChecked((c) => c.map((v, idx) => (idx === i ? !v : v)));
  }

  return (
    <section id="bucket-section">
      <SectionHead tag="things we still owe each other">Our Bucket List</SectionHead>
      <div className="bucket-list" id="bucketList">
        {bucketListData.map((text, i) => (
          <label
            className={`bucket-item${checked[i] ? ' checked' : ''}`}
            key={i}
          >
            <input
              type="checkbox"
              id={`bucket-${i}`}
              checked={checked[i]}
              onChange={() => toggle(i)}
            />
            <span>{text}</span>
          </label>
        ))}
      </div>
    </section>
  );
}
