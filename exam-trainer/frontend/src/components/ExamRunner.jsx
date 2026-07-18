import { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, ArrowLeft, ArrowRight, Home, Repeat, Eye, EyeOff, Edit2, LogOut, MessageSquare } from 'lucide-react';
import QuestionEditor from './QuestionEditor';
import { API_URL } from '../config';
import { formatAnswers, isAnswerCorrect, normalizeAnswers } from '../utils/answerScoring';

const ExamRunner = ({ filename, config, initialQuestions, onRetry, onExit }) => {
    const [allQuestions, setAllQuestions] = useState([]);
    const [sessionQuestions, setSessionQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [editingQuestion, setEditingQuestion] = useState(null);

    const [userAnswers, setUserAnswers] = useState({});
    const [showAnswer, setShowAnswer] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [savedResult, setSavedResult] = useState(false);

    useEffect(() => {
        if (isFinished || loading) return;
        const interval = setInterval(() => {
            setTimeElapsed(prev => prev + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [isFinished, loading]);

    useEffect(() => {
        // If retry mode, use provided questions immediately
        if (initialQuestions && initialQuestions.length > 0) {
            setSessionQuestions(initialQuestions);
            // We still fetch allQuestions to allow editing/syncing if needed, 
            // but for now, let's just use what we have or fetch silently.
            // Actually, to support editing, we should fetch the file.
            // But let's prioritize the session.
            setLoading(false);
            // Background fetch to keep 'allQuestions' populated for editing logic if needed
            fetch(`${API_URL}/api/exams/${filename}`)
                .then(res => res.json())
                .then(data => setAllQuestions(data.questions))
                .catch(console.error);
            return;
        }

        fetch(`${API_URL}/api/exams/${filename}`)
            .then(res => res.json())
            .then(data => {
                const raw = data.questions;
                setAllQuestions(raw);

                let processed = [...raw];

                if (config.mode === 'range' && config.range) {
                    // Range mode: Filter by index range first
                    const start = Math.max(0, config.range.start - 1);
                    const end = config.range.end;
                    processed = processed.slice(start, end);

                    // Then shuffle if requested (shuffle questions WITHIN that range)
                    if (config.shuffle) {
                        processed.sort(() => Math.random() - 0.5);
                    }
                } else {
                    // Random mode: Shuffle first (if requested), then take count
                    if (config.shuffle) {
                        processed.sort(() => Math.random() - 0.5);
                    }

                    const count = config.count ? parseInt(config.count, 10) : 0;
                    if (count > 0 && count < processed.length) {
                        processed = processed.slice(0, count);
                    }
                }
                setSessionQuestions(processed);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load exam", err);
                setLoading(false);
            });
    }, [filename, config, initialQuestions]);

    const handleUpdateQuestion = async (updatedQ) => {
        const newAll = allQuestions.map(q =>
            (q.id === updatedQ.id && q.topic === updatedQ.topic) ? updatedQ : q
        );
        // Also update session questions so user sees changes immediately
        const newSession = sessionQuestions.map(q =>
            (q.id === updatedQ.id && q.topic === updatedQ.topic) ? updatedQ : q
        );
        setAllQuestions(newAll);
        setSessionQuestions(newSession);
        setEditingQuestion(null);

        try {
            await fetch(`${API_URL}/api/exams/${filename}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ questions: newAll })
            });
        } catch (err) {
            console.error("Failed to save", err);
            alert('Failed to save changes.');
        }
    };

    const getQuestionKey = (q) => `${q.topic}-${q.id}`;

    const isMultipleChoice = (q) => {
        return normalizeAnswers(q.answer).length > 1;
    };

    const handleOptionSelect = (q, optionText) => {
        if (isFinished) return;
        const match = optionText.match(/^([A-Z])\./);
        const letter = match ? match[1] : null;
        if (!letter) return;

        const questionKey = getQuestionKey(q);
        const isMultiple = isMultipleChoice(q);

        setUserAnswers(prev => {
            if (isMultiple) {
                // Multiple choice mode: toggle the option
                const currentAnswers = prev[questionKey] || [];
                const newAnswers = currentAnswers.includes(letter)
                    ? currentAnswers.filter(l => l !== letter)
                    : [...currentAnswers, letter].sort();
                return {
                    ...prev,
                    [questionKey]: newAnswers
                };
            } else {
                // Single choice mode: replace the answer
                return {
                    ...prev,
                    [questionKey]: [letter]
                };
            }
        });
    };

    const calculateScore = () => {
        let correctCount = 0;
        sessionQuestions.forEach(q => {
            const userAns = userAnswers[getQuestionKey(q)] || [];
            if (isAnswerCorrect(userAns, q.answer)) {
                correctCount++;
            }
        });
        return correctCount;
    };

    const formatTime = (s) => {
        const mins = Math.floor(s / 60);
        const secs = s % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Finish & Save Logic
    useEffect(() => {
        if (isFinished && !savedResult) {
            const score = calculateScore();
            const total = sessionQuestions.length;
            const percent = total > 0 ? Math.round((score / total) * 100) : 0;
            const passed = percent >= 70;

            const resultEntry = {
                date: new Date().toISOString(),
                filename,
                score,
                total,
                percent,
                passed,
                timeElapsed: formatTime(timeElapsed)
            };

            const oldHistory = JSON.parse(localStorage.getItem('exam_history') || '[]');
            localStorage.setItem('exam_history', JSON.stringify([...oldHistory, resultEntry]));
            setSavedResult(true);
        }
    }, [isFinished, savedResult, sessionQuestions, filename, timeElapsed, userAnswers]);


    // Reset view state when question changes
    useEffect(() => {
        setShowAnswer(false);
        setShowComments(false);
    }, [currentIndex, sessionQuestions]);

    if (loading) return <div>Loading questions...</div>;
    if (sessionQuestions.length === 0) return <div>No questions found.</div>;

    if (isFinished) {
        const score = calculateScore();
        const total = sessionQuestions.length;
        const percent = total > 0 ? Math.round((score / total) * 100) : 0;
        const passed = percent >= 70;

        const wrongQuestions = sessionQuestions.filter(q => {
            const userAns = userAnswers[getQuestionKey(q)] || [];
            return !isAnswerCorrect(userAns, q.answer);
        });

        return (
            <div className="exam-results glass-panel">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
                    {passed ? <CheckCircle size={64} color="var(--success)" /> : <XCircle size={64} color="var(--danger)" />}
                    <h1 style={{ color: passed ? 'var(--success)' : 'var(--danger)', margin: '1rem 0 0.5rem 0' }}>
                        {passed ? 'Passed!' : 'Failed'}
                    </h1>
                    <h2 style={{ fontSize: '2rem', margin: '0.5rem 0' }}>{score} / {total} <span style={{ fontSize: '0.6em', opacity: 0.7 }}>({percent}%)</span></h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: 0.7 }}>
                        <Clock size={16} />
                        <h3>{formatTime(timeElapsed)}</h3>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
                    <button onClick={onExit} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Home size={18} /> Back to Home
                    </button>
                    {wrongQuestions.length > 0 && (
                        <button
                            className="secondary"
                            onClick={() => onRetry && onRetry(wrongQuestions)}
                            title="Start a new exam with only the questions you missed"
                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                            <Repeat size={18} />
                            Retry Missed ({wrongQuestions.length})
                        </button>
                    )}
                </div>

                <div style={{ textAlign: 'left', marginTop: '3rem' }}>
                    <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>Review</h3>
                    {sessionQuestions.map((q, idx) => {
                        const userAns = userAnswers[getQuestionKey(q)] || [];
                        const isCorrect = isAnswerCorrect(userAns, q.answer);
                        return (
                            <div key={idx} style={{
                                padding: '1.5rem',
                                margin: '1rem 0',
                                borderLeft: `4px solid ${isCorrect ? 'var(--success)' : 'var(--danger)'}`,
                                borderRadius: '0 8px 8px 0',
                                background: 'rgba(255,255,255,0.05)'
                            }}>
                                <div style={{ fontWeight: 'bold', marginBottom: '1rem', color: isCorrect ? 'var(--success)' : 'var(--danger)' }}>
                                    Question {idx + 1}
                                </div>
                                <div style={{ marginBottom: '1rem' }}>{q.questionText}</div>
                                <div style={{ marginTop: '0.5rem', display: 'flex', gap: '2rem' }}>
                                    <span style={{ color: isCorrect ? 'var(--success)' : 'var(--danger)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        {isCorrect ? <CheckCircle size={16} /> : <XCircle size={16} />}
                                        Your Answer: {userAns.length > 0 ? userAns.join(', ') : 'None'}
                                    </span>
                                    {!isCorrect && <span style={{ color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <CheckCircle size={16} />
                                        Correct: {formatAnswers(q.answer)}
                                    </span>}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    const currentQ = sessionQuestions[currentIndex];
    const currentKey = getQuestionKey(currentQ);
    const selectedAnswers = userAnswers[currentKey] || [];
    const isMultiple = isMultipleChoice(currentQ);
    const correctAnswers = normalizeAnswers(currentQ.answer);

    return (
        <div className="exam-runner">
            {editingQuestion && (
                <QuestionEditor
                    question={editingQuestion}
                    onSave={handleUpdateQuestion}
                    onCancel={() => setEditingQuestion(null)}
                />
            )}

            <div className="header glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', padding: '0.8rem 1.5rem' }}>
                <span style={{ fontWeight: 'bold' }}>Question {currentIndex + 1} <span style={{ opacity: 0.5 }}>/ {sessionQuestions.length}</span></span>
                <span style={{ fontFamily: 'monospace', fontSize: '1.2em', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0,0,0,0.2)', padding: '0.3rem 0.8rem', borderRadius: '4px' }}>
                    <Clock size={16} /> {formatTime(timeElapsed)}
                </span>
                <button onClick={onExit} className="small secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <LogOut size={16} /> Exit
                </button>
            </div>

            <div className="question-card glass-panel" style={{ position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9em' }}>Topic {currentQ.topic} | #{currentQ.id}</span>
                    <button onClick={() => setEditingQuestion(currentQ)} className="small secondary" style={{ fontSize: '0.8em', padding: '0.3em 0.8em', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Edit2 size={14} /> Edit
                    </button>
                </div>

                <p style={{ fontSize: '1.2em', whiteSpace: 'pre-wrap', textAlign: 'left', margin: '1.5rem 0', lineHeight: '1.6' }}>
                    {currentQ.questionText}
                </p>

                <div className="options" style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {isMultiple && (
                        <div style={{ fontSize: '0.9em', color: 'var(--primary-color)', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                            ℹ️ Multiple choice - Select all correct answers
                        </div>
                    )}
                    {currentQ.options.map((opt, idx) => {
                        const letter = opt.match(/^([A-Z])\./)?.[1];
                        const isSelected = selectedAnswers.includes(letter);
                        const isCorrectAnswer = correctAnswers.includes(letter);

                        let borderColor = 'transparent';
                        let bgColor = 'rgba(255,255,255,0.05)';
                        let transform = 'scale(1)';

                        if (isSelected) {
                            borderColor = 'var(--primary-color)';
                            bgColor = 'rgba(100, 108, 255, 0.15)';
                            transform = 'scale(1.01)';
                        }
                        if (showAnswer && isCorrectAnswer) {
                            borderColor = 'var(--success)';
                            bgColor = 'rgba(46, 204, 113, 0.15)';
                        }

                        return (
                            <div
                                key={idx}
                                className="option-item"
                                onClick={() => handleOptionSelect(currentQ, opt)}
                                style={{
                                    padding: '1.2rem',
                                    background: bgColor,
                                    borderRadius: '12px',
                                    border: `2px solid ${borderColor}`,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)',
                                    display: 'flex',
                                    gap: '1rem',
                                    transform: transform
                                }}
                            >
                                <span style={{ fontWeight: 'bold', minWidth: '1.5rem' }}>{letter}.</span>
                                <div style={{ flex: 1 }}>{opt.substring(opt.indexOf('.') + 1).trim()}</div>
                                {isSelected && <CheckCircle size={20} color="var(--primary-color)" />}
                            </div>
                        );
                    })}
                </div>

                <div className="actions" style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button onClick={() => setShowAnswer(!showAnswer)} className="secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            {showAnswer ? <EyeOff size={18} /> : <Eye size={18} />}
                            {showAnswer ? 'Hide Answer' : 'Reveal Answer'}
                        </button>
                        {currentQ.comments && (
                            <button onClick={() => setShowComments(!showComments)} className="secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <MessageSquare size={18} />
                                {showComments ? 'Hide Comments' : 'Comments'}
                            </button>
                        )}
                    </div>

                    {showAnswer && (
                        <div style={{ fontSize: '1.2em', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', animation: 'fadeIn 0.3s ease' }}>
                            <CheckCircle size={20} color="var(--success)" />
                            Correct: <span style={{ color: 'var(--success)' }}>{formatAnswers(currentQ.answer)}</span>
                        </div>
                    )}
                </div>


                {showComments && currentQ.comments && (
                    <div className="comments-section" style={{
                        marginTop: '1.5rem',
                        padding: '1rem',
                        background: 'rgba(0,0,0,0.2)',
                        borderRadius: '8px',
                        textAlign: 'left',
                        fontSize: '0.9em',
                        borderLeft: '3px solid var(--primary-color)',
                        animation: 'fadeIn 0.3s ease',
                        whiteSpace: 'pre-wrap'
                    }}>
                        <strong>Comments:</strong><br />
                        {currentQ.comments}
                    </div>
                )}
            </div>

            <div className="navigation" style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                <button
                    disabled={currentIndex === 0}
                    onClick={() => { setCurrentIndex(c => c - 1); setShowAnswer(false); }}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ArrowLeft size={18} /> Previous
                </button>

                {currentIndex < sessionQuestions.length - 1 ? (
                    <button
                        onClick={() => { setCurrentIndex(c => c + 1); setShowAnswer(false); }}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        Next <ArrowRight size={18} />
                    </button>
                ) : (
                    <button
                        className="primary"
                        style={{ backgroundColor: 'var(--success)', borderColor: 'var(--success)', marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        onClick={() => setIsFinished(true)}>
                        <CheckCircle size={18} /> Finish Exam
                    </button>
                )}
            </div>
        </div >
    );
};

export default ExamRunner;
