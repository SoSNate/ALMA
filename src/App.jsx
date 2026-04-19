import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// Alma's 100+ Words Database
const wordsData = [
    // Basic 50
    { en: "Always", he: "תמיד" }, { en: "Sometimes", he: "לפעמים" }, { en: "Never", he: "אף פעם" },
    { en: "Between", he: "בין" }, { en: "Under", he: "מתחת" }, { en: "Behind", he: "מאחורי" },
    { en: "Happy", he: "שמח" }, { en: "Sad", he: "עצוב" }, { en: "Angry", he: "כועס" },
    { en: "Tired", he: "עייף" }, { en: "Big", he: "גדול" }, { en: "Small", he: "קטן" },
    { en: "Beautiful", he: "יפה" }, { en: "Cheap", he: "זול" }, { en: "Expensive", he: "יקר" },
    { en: "Fast", he: "מהיר" }, { en: "Slow", he: "איטי" }, { en: "New", he: "חדש" },
    { en: "Old", he: "ישן/מבוגר" }, { en: "Important", he: "חשוב" }, { en: "Difficult", he: "קשה" },
    { en: "Easy", he: "קל" }, { en: "Before", he: "לפני" }, { en: "After", he: "אחרי" },
    { en: "To Buy", he: "לקנות" }, { en: "To Sell", he: "למכור" }, { en: "To Give", he: "לתת" },
    { en: "To Take", he: "לקחת" }, { en: "To Ask", he: "לשאול/לבקש" }, { en: "To Answer", he: "לענות" },
    { en: "To Remember", he: "לזכור" }, { en: "To Forget", he: "לשכוח" }, { en: "To Understand", he: "להבין" },
    { en: "To Believe", he: "להאמין" }, { en: "To Help", he: "לעזור" }, { en: "To Finish", he: "לסיים" },
    { en: "To Start", he: "להתחיל" }, { en: "To Wait", he: "לחכות" }, { en: "To Learn", he: "ללמוד" },
    { en: "To Travel", he: "לטייל" }, { en: "Word", he: "מילה" }, { en: "Sentence", he: "משפט" },
    { en: "Story", he: "סיפור" }, { en: "Example", he: "דוגמה" }, { en: "Friend", he: "חבר" },
    { en: "Family", he: "משפחה" }, { en: "Work", he: "עבודה" }, { en: "Life", he: "חיים" },
    { en: "Weather", he: "מזג אוויר" }, { en: "Thing", he: "דבר" },

    // 50+ Advanced
    { en: "Unemployed", he: "מובטל" }, { en: "Unhappy", he: "לא שמח" },
    { en: "Misunderstand", he: "להבין לא נכון" }, { en: "Homework", he: "שיעורי בית" },
    { en: "Newspaper", he: "עיתון" }, { en: "Afternoon", he: "אחר הצהריים" },
    { en: "Unbelievable", he: "לא ייאמן" }, { en: "Rent", he: "שכר דירה" },
    { en: "Career", he: "קריירה" }, { en: "Solution", he: "פתרון" },
    { en: "Suddenly", he: "לפתע" }, { en: "Shop", he: "חנות" },
    { en: "Coffee", he: "קפה" }, { en: "Tree", he: "עץ" }, { en: "Park", he: "פארק" },
    { en: "Advice", he: "עצה" }, { en: "Agree", he: "להסכים" }, { en: "Amazing", he: "מדהים" },
    { en: "Arrive", he: "להגיע" }, { en: "Borrow", he: "לשאול/להלוות" }, { en: "Catch", he: "לתפוס" },
    { en: "Decide", he: "להחליט" }, { en: "Delicious", he: "טעים" }, { en: "Dream", he: "חלום" },
    { en: "Early", he: "מוקדם" }, { en: "Future", he: "עתיד" }, { en: "Guess", he: "לנחש" },
    { en: "Heavy", he: "כבד" }, { en: "Late", he: "מאוחר" }, { en: "Mistake", he: "טעות" },
    { en: "Promise", he: "הבטחה" }, { en: "Quiet", he: "שקט" }, { en: "Secret", he: "סוד" },
    { en: "Strange", he: "מוזר" }, { en: "Surprise", he: "הפתעה" }, { en: "Terrible", he: "נורא" },
    { en: "Together", he: "ביחד" }, { en: "Useful", he: "שימושי" }, { en: "Voice", he: "קול" },
    { en: "Wonderful", he: "נפלא" },
    { en: "Challenge", he: "אתגר" }, { en: "Successful", he: "מוצלח" },
    { en: "Discover", he: "לגלות" }, { en: "Prepare", he: "להתכונן" },
    { en: "Improve", he: "לשפר" }, { en: "Focus", he: "להתרכז" },
    { en: "Imagine", he: "לדמיין" }, { en: "Protect", he: "להגן" },
    { en: "Explain", he: "להסביר" }, { en: "Create", he: "ליצור" },
    { en: "Helpful", he: "מועיל/עוזר" }, { en: "Careful", he: "זהיר" },
    { en: "Morning", he: "בוקר" }, { en: "Night", he: "לילה" }, { en: "Water", he: "מים" },
    { en: "Swim", he: "לשחות" }, { en: "Cut", he: "לחתוך" }, { en: "Book", he: "ספר" },
    { en: "Read", he: "לקרוא" }, { en: "Write", he: "לכתוב" }, { en: "Listen", he: "להקשיב" },
    { en: "Speak", he: "לדבר" }
];

const App = () => {
    const [view, setView] = useState('learn');
    const [masteredIndexes, setMasteredIndexes] = useState(() => {
        try {
            const saved = localStorage.getItem('alma_mastered_words');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    const [activeWordIndex, setActiveWordIndex] = useState(() => {
        const saved = localStorage.getItem('alma_last_active_index');
        return saved !== null ? parseInt(saved) : 0;
    });

    const [step, setStep] = useState(1);
    const [isListening, setIsListening] = useState(false);
    const [feedback, setFeedback] = useState(null);
    const [options, setOptions] = useState([]);
    const isProcessingRef = useRef(false);
    const currentWord = wordsData[activeWordIndex];

    useEffect(() => {
        localStorage.setItem('alma_mastered_words', JSON.stringify(masteredIndexes));
        localStorage.setItem('alma_last_active_index', activeWordIndex.toString());
    }, [masteredIndexes, activeWordIndex]);

    useEffect(() => {
        if (view === 'learn' && step === 2 && currentWord) {
            const others = wordsData.filter(w => w.en !== currentWord.en).sort(() => 0.5 - Math.random()).slice(0, 3);
            setOptions([...others, currentWord].sort(() => 0.5 - Math.random()));
        }
    }, [step, activeWordIndex, view, currentWord]);

    const playSound = (type) => {
        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);

            if (type === 'success') {
                osc.frequency.setValueAtTime(523, audioCtx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.1);
                gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
            } else {
                osc.type = 'square';
                osc.frequency.setValueAtTime(150, audioCtx.currentTime);
                gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
            }
            osc.start();
            osc.stop(audioCtx.currentTime + 0.3);
        } catch (e) {}
    };

    const speak = (text) => {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'en-US';
        u.rate = 0.85;
        u.pitch = 1.0;
        const voices = window.speechSynthesis.getVoices();
        const priorityVoices = ["Google US English", "Microsoft Samantha", "Samantha"];
        let voice = voices.find(v => priorityVoices.some(p => v.name.includes(p)));
        if (!voice) voice = voices.find(v => v.lang.startsWith('en'));
        if (voice) u.voice = voice;
        window.speechSynthesis.speak(u);
    };

    const handleSpeech = () => {
        if (isListening) return;
        const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!Recognition) return alert("זיהוי קולי לא נתמך");

        const rec = new Recognition();
        rec.lang = 'en-US';
        rec.onstart = () => setIsListening(true);
        rec.onend = () => setIsListening(false);
        rec.onresult = (e) => {
            if (isProcessingRef.current) return;
            const transcript = e.results[0][0].transcript.toLowerCase();
            const target = currentWord.en.toLowerCase().replace(/^to\s+/, "");

            if (transcript.includes(target)) {
                isProcessingRef.current = true;
                playSound('success');
                setFeedback({ type: 'success', message: `מעולה! זיהיתי "${transcript}"` });

                setMasteredIndexes(prev => {
                    const next = prev.includes(activeWordIndex) ? prev : [...prev, activeWordIndex];
                    setTimeout(() => {
                        setActiveWordIndex(prev => (prev + 1) % wordsData.length);
                        setStep(1);
                        setFeedback(null);
                        isProcessingRef.current = false;
                    }, 1500);
                    return next;
                });
            } else {
                playSound('error');
                setFeedback({ type: 'error', message: `שמעתי "${transcript}", נסי שוב.` });
            }
        };
        rec.start();
    };

    const checkTranslation = (he) => {
        if (he === currentWord.he) {
            playSound('success');
            setStep(3);
        } else {
            playSound('error');
            setFeedback({ type: 'error', message: "טעות, נסי שוב." });
            setTimeout(() => setFeedback(null), 1500);
        }
    };

    const resetProgress = () => {
        if (confirm("האם לאפס את כל ההתקדמות?")) {
            setMasteredIndexes([]);
            setActiveWordIndex(0);
            localStorage.clear();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 p-4 md:p-8" dir="rtl">
            <div className="max-w-4xl mx-auto">
                <header className="text-center mb-10">
                    <div className="flex justify-between items-center mb-8">
                        <button onClick={resetProgress} className="text-xs bg-white/60 hover:bg-white backdrop-blur-sm px-4 py-2 rounded-full text-slate-500 font-semibold border border-white/40 shadow-sm transition-all">איפוס 🔄</button>
                        <div className="flex flex-col items-center">
                            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">עלמה</h1>
                            <p className="text-slate-500 text-sm mt-1 font-light">עולם לימוד אנגלית מוסיקלי וכייף</p>
                        </div>
                        <div className="w-16"></div>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 bg-white/40 backdrop-blur-md p-2 rounded-2xl border border-white/60 shadow-sm">
                        <button onClick={() => setView('learn')} className={`px-6 py-2.5 rounded-xl font-semibold transition-all backdrop-blur-sm ${view === 'learn' ? 'bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-md scale-105' : 'bg-white/40 text-slate-700 hover:bg-white/60 border border-white/40'}`}>📖 למידה</button>
                        <button onClick={() => setView('library')} className={`px-6 py-2.5 rounded-xl font-semibold transition-all backdrop-blur-sm ${view === 'library' ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-md scale-105' : 'bg-white/40 text-slate-700 hover:bg-white/60 border border-white/40'}`}>📚 ספריה</button>
                        <button onClick={() => setView('stories')} className={`px-6 py-2.5 rounded-xl font-semibold transition-all backdrop-blur-sm ${view === 'stories' ? 'bg-gradient-to-r from-purple-400 to-pink-500 text-white shadow-md scale-105' : 'bg-white/40 text-slate-700 hover:bg-white/60 border border-white/40'}`}>✨ סיפורים</button>
                    </div>
                </header>

                {view === 'learn' && currentWord && (
                    <div className="bg-white/80 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 shadow-lg border border-white/60 text-center relative min-h-[500px] flex flex-col justify-center transition-all">
                        {feedback && (
                            <div className={`absolute top-0 left-0 w-full p-3 rounded-t-[2.5rem] text-white font-semibold backdrop-blur-sm ${feedback.type === 'success' ? 'bg-gradient-to-r from-emerald-400 to-teal-500' : 'bg-gradient-to-r from-rose-400 to-pink-500'}`}>
                                {feedback.message}
                            </div>
                        )}
                        <h2 className="text-7xl font-black bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent mb-10" dir="ltr">{currentWord.en}</h2>

                        {step === 1 && (
                            <div className="space-y-8">
                                <button onClick={() => speak(currentWord.en)} className="w-28 h-28 bg-gradient-to-br from-rose-400 to-pink-500 text-white rounded-full flex items-center justify-center mx-auto shadow-lg hover:shadow-2xl hover:scale-110 active:scale-95 transition-all border-4 border-white/40">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                                </button>
                                <button onClick={() => setStep(2)} className="mt-8 px-12 py-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xl rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all border-2 border-white/40 w-full max-w-sm mx-auto">
                                    אני מכירה, בואו נתרגם! ✨
                                </button>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {options.map((opt, i) => (
                                    <button key={i} onClick={() => checkTranslation(opt.he)} className="p-6 bg-gradient-to-br from-purple-100 to-pink-100 border-2 border-purple-300/50 rounded-2xl font-bold text-lg text-slate-700 hover:bg-gradient-to-br hover:from-purple-400 hover:to-pink-400 hover:text-white hover:border-purple-400 transition-all shadow-sm hover:shadow-md">
                                        {opt.he}
                                    </button>
                                ))}
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-8">
                                <p className="text-slate-600 font-semibold text-lg">עכשיו תורך! אמרי את המילה באנגלית:</p>
                                <button onClick={handleSpeech} className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto shadow-xl transition-all border-4 border-white/40 ${isListening ? 'bg-gradient-to-br from-amber-400 to-orange-500 scale-110 animate-pulse' : 'bg-gradient-to-br from-slate-600 to-slate-800 hover:from-slate-700 hover:to-slate-900'}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="white"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                                </button>
                                <p className="font-semibold text-slate-500">{isListening ? "💬 אני מקשיב..." : "🎤 לחצי על הכפתור"}</p>
                            </div>
                        )}

                        <div className="w-full bg-slate-200/50 h-3 rounded-full mt-12 overflow-hidden">
                            <div className="bg-gradient-to-r from-rose-400 to-purple-500 h-full transition-all duration-700" style={{width: `${(masteredIndexes.length / wordsData.length) * 100}%`}}></div>
                        </div>
                        <p className="text-slate-500 text-sm mt-3 font-medium">{masteredIndexes.length} מתוך {wordsData.length} מילים ✓</p>
                    </div>
                )}

                {view === 'library' && (
                    <div className="bg-white/80 backdrop-blur-md rounded-[2.5rem] p-8 shadow-lg border border-white/60">
                        <h2 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-8 text-center">ספריית המילים 📚</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 max-h-[65vh] overflow-y-auto pr-2">
                            {wordsData.map((w, i) => (
                                <div key={i} onClick={() => { setActiveWordIndex(i); setStep(1); setView('learn'); }} className={`p-4 rounded-xl border-2 cursor-pointer transition-all transform hover:scale-105 ${masteredIndexes.includes(i) ? 'bg-gradient-to-br from-emerald-100 to-teal-100 border-emerald-300/60 shadow-md' : 'bg-gradient-to-br from-slate-50 to-blue-50 border-slate-200/60 hover:border-purple-300'}`}>
                                    <p className="font-bold text-sm text-center text-slate-800" dir="ltr">{w.en}</p>
                                    <p className="text-xs text-slate-600 text-center mt-1">{w.he}</p>
                                    {masteredIndexes.includes(i) && <span className="text-emerald-500 text-center block mt-2 text-lg">✓</span>}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {view === 'stories' && (
                    <div className="bg-white/80 backdrop-blur-md rounded-[2.5rem] p-8 md:p-10 shadow-lg border border-white/60">
                        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 text-center">סיפור - The Big Challenge ✨</h2>
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-200/50 mb-8">
                            <p className="text-slate-700 mb-4 text-lg leading-relaxed" dir="ltr">
                                <span className="font-bold text-purple-700">Maya</span> wanted to <span className="font-semibold text-purple-600">improve</span> her English. She knew she had to <span className="font-semibold text-purple-600">prepare</span> for a <span className="font-semibold text-rose-600">difficult challenge</span>.
                            </p>
                            <p className="text-slate-700 mb-4 text-lg leading-relaxed" dir="ltr">
                                Her <span className="font-semibold text-emerald-600">friend</span> gave her <span className="font-semibold text-blue-600">helpful advice</span>: "<span className="font-semibold text-purple-600">Focus</span> on your goals, and be <span className="font-semibold text-amber-600">careful</span> not to waste time."
                            </p>
                            <p className="text-slate-700 text-lg leading-relaxed" dir="ltr">
                                She wanted to <span className="font-semibold text-pink-600">discover</span> a <span className="font-semibold text-emerald-600">new career</span>. It wasn't <span className="font-semibold text-emerald-600">easy</span>, but she was <span className="font-semibold text-purple-600">successful</span> because she never stopped trying to understand.
                            </p>
                        </div>
                        <button onClick={() => speak("The Big Challenge. Maya wanted to improve her English. She knew she had to prepare for a difficult challenge. Her friend gave her helpful advice. Focus on your goals and be careful not to waste time. Maya tried to imagine her future. She wanted to discover a new career. It wasn't easy, but she was successful because she never stopped trying to understand.")} className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold text-lg hover:shadow-lg transform hover:scale-105 active:scale-95 transition-all border-2 border-white/40">
                            🔊 השמע את הסיפור
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;