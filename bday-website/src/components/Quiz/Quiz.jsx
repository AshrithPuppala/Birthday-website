import { useEffect, useState } from 'react';
import SectionHead from '../SectionHead/SectionHead';
import { useTreasureHunt } from '../ButterflyHunt/TreasureHuntContext';
import quizData from '../../data/quizData';
import './Quiz.css';

export default function Quiz() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(null); // index of chosen option
  const { markTreasureFound } = useTreasureHunt();

  const done = index >= quizData.length;

  function choose(i, item) {
    if (answered !== null) return;
    setAnswered(i);
    if (i === item.correct) setScore((s) => s + 1);
    setTimeout(() => {
      setAnswered(null);
      setIndex((idx) => idx + 1);
    }, 900);
  }

  return (
    <section id="quiz-section">
      <SectionHead tag="put yourself to the test">How Well Do You Know Us?</SectionHead>
      <div className="quiz-box" id="quizBox">
        {done ? (
          <QuizResult score={score} total={quizData.length} onShown={() => markTreasureFound('quiz')} />
        ) : (
          <QuizQuestion
            item={quizData[index]}
            index={index}
            total={quizData.length}
            answered={answered}
            onChoose={(i) => choose(i, quizData[index])}
          />
        )}
      </div>
    </section>
  );
}

function QuizQuestion({ item, index, total, answered, onChoose }) {
  return (
    <>
      <div className="quiz-progress">
        <div className="quiz-progress-bar" style={{ width: `${(index / total) * 100}%` }} />
      </div>
      <div className="quiz-q">
        {index + 1}. {item.q}
      </div>
      <div id="quizOpts">
        {item.options.map((opt, i) => {
          let cls = 'quiz-opt';
          if (answered !== null) {
            if (i === item.correct) cls += ' correct';
            else if (i === answered) cls += ' wrong';
          }
          return (
            <button
              key={i}
              className={cls}
              disabled={answered !== null}
              onClick={() => onChoose(i)}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </>
  );
}

function QuizResult({ score, total, onShown }) {
  // markTreasureFound once, when the result first renders
  useEffect(() => onShown(), [onShown]);
  return (
    <div className="quiz-result">
      <div className="script" style={{ fontSize: '1.2rem' }}>
        you scored
      </div>
      <div className="score">
        {score} / {total}
      </div>
      <p>
        {score === total
          ? 'Ofc you got everything rightttt, Sugu the smarty'
          : 'What is this behaviour Sugandha, expected better'}
      </p>
    </div>
  );
}
