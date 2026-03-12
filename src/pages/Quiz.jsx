import React, { useState, useEffect, useCallback, useMemo } from 'react';
import elementsData from '../data/PeriodicTableJSON.json';
import { translateElement } from '../data/translations';
import { Clock, CheckCircle2, ChevronRight, RotateCcw } from 'lucide-react';
import './Quiz.css';

const shuffle = (array) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

const difficulties = {
  easy: { len: 5, time: 60, points: 10 },
  medium: { len: 10, time: 120, points: 20 },
  hard: { len: 15, time: 180, points: 30 }
};

const Quiz = () => {
  const rawElements = elementsData.elements || elementsData;
  const elements = useMemo(() => rawElements.map(translateElement), []);
  const [difficulty, setDifficulty] = useState('medium');
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(difficulties.medium.time);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const generateQuestions = useCallback(() => {
    const diffSt = difficulties[difficulty];
    const pickedElements = shuffle([...elements]).slice(0, diffSt.len);
    
    const qs = pickedElements.map(el => {
      // Pick 3 wrong options
      const others = shuffle(elements.filter(e => e.number !== el.number)).slice(0, 3);
      const options = shuffle([...others.map(e => e.symbol), el.symbol]);
      
      return {
        element: el,
        questionText: `¿Cuál es el símbolo químico del ${el.name}?`,
        options,
        answer: el.symbol
      };
    });
    
    setQuestions(qs);
    setCurrentIndex(0);
    setScore(0);
    setTimeLeft(diffSt.time);
    setIsPlaying(true);
    setIsFinished(false);
    setSelectedAnswer(null);
    setHasAnswered(false);
  }, [difficulty, elements]);

  useEffect(() => {
    let timer;
    if (isPlaying && !hasAnswered && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && isPlaying) {
      handleTimeout();
    }
    return () => clearTimeout(timer);
  }, [isPlaying, timeLeft, hasAnswered]);

  const handleTimeout = () => {
    setHasAnswered(true);
    setSelectedAnswer('TIMEOUT');
  };

  const handleOptionClick = (opt) => {
    if (hasAnswered) return;
    setSelectedAnswer(opt);
    setHasAnswered(true);
    if (opt === questions[currentIndex].answer) {
      setScore(prev => prev + difficulties[difficulty].points);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setHasAnswered(false);
    } else {
      setIsPlaying(false);
      setIsFinished(true);
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!isPlaying && !isFinished) {
    return (
      <div className="quiz-start glass-panel">
        <h1>Quiz de Química</h1>
        <p>Pon a prueba tus conocimientos sobre la tabla periódica</p>
        
        <div className="diff-selector">
          <button className={`diff-btn ${difficulty==='easy'?'active':''}`} onClick={()=>setDifficulty('easy')}>Fácil</button>
          <button className={`diff-btn ${difficulty==='medium'?'active':''}`} onClick={()=>setDifficulty('medium')}>Medio</button>
          <button className={`diff-btn ${difficulty==='hard'?'active':''}`} onClick={()=>setDifficulty('hard')}>Difícil</button>
        </div>

        <button className="btn-primary start-btn" onClick={generateQuestions}>
          Comenzar Quiz
        </button>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="quiz-finish glass-panel">
        <h2>¡Quiz Terminado!</h2>
        <div className="final-score">
          <span className="score-num">{score}</span>
          <span className="score-label">Puntos Totales</span>
        </div>
        <button className="btn-primary start-btn" onClick={generateQuestions}>
          <RotateCcw size={18} /> Jugar de Nuevo
        </button>
      </div>
    );
  }

  const q = questions[currentIndex];
  const progressPercent = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="quiz-active">
      <div className="quiz-header glass-panel">
        <div>
          <h2>Quiz de Química</h2>
          <p>Pon a prueba tus conocimientos sobre la tabla periódica</p>
        </div>
        <div className="diff-selector small">
          <span className={`diff-lbl ${difficulty==='easy'?'active':''}`}>Fácil</span>
          <span className={`diff-lbl ${difficulty==='medium'?'active':''}`}>Medio</span>
          <span className={`diff-lbl ${difficulty==='hard'?'active':''}`}>Difícil</span>
        </div>
      </div>

      <div className="quiz-stats">
        <div className="stat-card glass-panel">
          <span className="stat-icon score-i">🏆</span>
          <div className="stat-info">
            <span className="stat-label">PUNTUACIÓN</span>
            <span className="stat-value">{score} pts</span>
          </div>
        </div>

        <div className="stat-card glass-panel">
          <Clock className="stat-icon time-i" />
          <div className="stat-info">
            <span className="stat-label">TIEMPO RESTANTE</span>
            <span className="stat-value">{formatTime(timeLeft)}</span>
          </div>
        </div>

        <div className="stat-card progress-card glass-panel">
          <div className="prog-header">
            <span className="stat-label">PROGRESO</span>
            <span className="prog-text">{currentIndex + 1} / {questions.length}</span>
          </div>
          <div className="prog-bar-bg">
            <div className="prog-bar-fill" style={{width: `${progressPercent}%`}}></div>
          </div>
        </div>
      </div>

      <div className="q-board glass-panel">
        <div className="q-label">PREGUNTA {currentIndex + 1}</div>
        
        <div className="q-content">
          <div className="q-left">
            <h3 className="q-text">{q.questionText}</h3>
            <div className="options-grid">
              {q.options.map((opt, i) => {
                let statusClass = '';
                if (hasAnswered) {
                  if (opt === q.answer) statusClass = 'correct';
                  else if (opt === selectedAnswer) statusClass = 'wrong';
                }
                const letter = String.fromCharCode(65 + i);

                return (
                  <button 
                    key={i} 
                    className={`option-btn ${statusClass} ${selectedAnswer === opt ? 'selected' : ''}`}
                    onClick={() => handleOptionClick(opt)}
                    disabled={hasAnswered}
                  >
                    <span className="opt-letter">{letter}</span>
                    <span className="opt-val">{opt}</span>
                    {hasAnswered && opt === q.answer && <CheckCircle2 size={18} className="correct-icon" />}
                  </button>
                );
              })}
            </div>
          </div>
          
          <div className="q-right">
            <div className={`element-visual ${hasAnswered ? 'revealed' : 'hidden'}`}>
              <div className="ev-num">{q.element.number}</div>
              <div className="ev-mass">{q.element.atomic_mass.toFixed(2)}</div>
              <div className="ev-sym">{hasAnswered ? q.element.symbol : '?'}</div>
              <div className="ev-name">{q.element.name}</div>
            </div>
            {hasAnswered && <p className="latin-lbl">"{q.element.named_by ? `Por: ${q.element.named_by}` : 'Descubierto: ' + q.element.discovered_by}"</p>}
          </div>
        </div>

        <div className="q-actions">
          <button className="btn-outline">← Anterior</button>
          <button 
            className="btn-primary next-btn" 
            disabled={!hasAnswered}
            onClick={handleNext}
          >
            Siguiente pregunta <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {hasAnswered && (
        <div className="fun-fact glass-panel">
          <span className="bulb">💡</span>
          <p><strong>Sabías que:</strong> {q.element.summary.split('.')[0]}.</p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
