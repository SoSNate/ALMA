import { useState, useEffect, useRef, useMemo } from 'react';

// ── Data ──────────────────────────────────────
const wordsData = [
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
    { en: "Wonderful", he: "נפלא" }, { en: "Challenge", he: "אתגר" }, { en: "Successful", he: "מוצלח" },
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

const storyText = "Maya wanted to improve her English. She knew she had to prepare for a difficult challenge. Her friend gave her helpful advice: Focus on your goals, and be careful not to waste time. Maya tried to imagine her future. She wanted to discover a new career. It wasn't easy, but she was successful because she never stopped trying to understand.";

// ── Helpers ───────────────────────────────────
const playSound = type => {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        if (type === 'success') {
            osc.frequency.setValueAtTime(523, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);
            gain.gain.setValueAtTime(0.1, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        } else {
            osc.type = 'square';
            osc.frequency.setValueAtTime(150, ctx.currentTime);
            gain.gain.setValueAtTime(0.1, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
        }
        osc.start(); osc.stop(ctx.currentTime + 0.3);
    } catch (_) {}
};

const speakText = (text, rate = 0.85) => {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US'; u.rate = rate; u.pitch = 1.0;
    const voices = window.speechSynthesis.getVoices();
    const pick = voices.find(v => ["Google US English","Microsoft Samantha","Samantha","Microsoft Zira"].some(p => v.name.includes(p)));
    if (pick) u.voice = pick;
    window.speechSynthesis.speak(u);
};

// ── App ───────────────────────────────────────
export default function App() {
    const [view, setView] = useState('learn');
    const [masteredIndexes, setMasteredIndexes] = useState(() => {
        try { return JSON.parse(localStorage.getItem('alma_mastered_words') || '[]'); }
        catch { return []; }
    });
    const [activeWordIndex, setActiveWordIndex] = useState(() => {
        const s = localStorage.getItem('alma_last_active_index');
        return s !== null ? parseInt(s) : 0;
    });
    const [step, setStep] = useState(1);
    const [isListening, setIsListening] = useState(false);
    const [feedback, setFeedback] = useState(null);
    const isProcessingRef = useRef(false);
    const currentWord = wordsData[activeWordIndex];

    const options = useMemo(() => {
        const others = wordsData.filter(w => w.en !== currentWord.en).sort(() => Math.random() - 0.5).slice(0, 3);
        return [...others, currentWord].sort(() => Math.random() - 0.5);
    }, [activeWordIndex]);

    useEffect(() => {
        localStorage.setItem('alma_mastered_words', JSON.stringify(masteredIndexes));
        localStorage.setItem('alma_last_active_index', activeWordIndex.toString());
    }, [masteredIndexes, activeWordIndex]);

    const handleSpeech = () => {
        if (isListening) return;
        const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!Recognition) return alert("הדפדפן לא תומך בזיהוי קולי.");
        const rec = new Recognition();
        rec.lang = 'en-US'; rec.continuous = false; rec.interimResults = false; rec.maxAlternatives = 1;
        isProcessingRef.current = false;
        rec.onstart = () => setIsListening(true);
        rec.onend   = () => { setIsListening(false); isProcessingRef.current = false; };
        rec.onerror = e => {
            setIsListening(false); isProcessingRef.current = false;
            const msgs = { 'no-speech': 'לא שמעתי כלום, נסי שוב 🎤', 'not-allowed': 'נא לאשר גישה למיקרופון.' };
            setFeedback({ type: 'error', message: msgs[e.error] || 'שגיאת מיקרופון, נסי שוב.' });
            setTimeout(() => setFeedback(null), 2500);
        };
        rec.onresult = e => {
            if (isProcessingRef.current) return;
            const transcript = e.results[0][0].transcript.toLowerCase().trim();
            const target = currentWord.en.toLowerCase().replace(/^to\s+/, "");
            if (transcript.includes(target)) {
                isProcessingRef.current = true;
                setFeedback({ type: 'success', message: `מעולה! זיהיתי "${transcript}"` });
                playSound('success');
                setMasteredIndexes(prev => {
                    const next = prev.includes(activeWordIndex) ? prev : [...prev, activeWordIndex];
                    setTimeout(() => {
                        setActiveWordIndex(i => (i + 1) % wordsData.length);
                        setStep(1); setFeedback(null); isProcessingRef.current = false;
                    }, 1500);
                    return next;
                });
            } else {
                playSound('error');
                setFeedback({ type: 'error', message: `שמעתי "${transcript}", נסי שוב.` });
            }
        };
        try { rec.start(); } catch (_) { setIsListening(false); }
    };

    const checkTranslation = he => {
        if (he === currentWord.he) { playSound('success'); setStep(3); }
        else { playSound('error'); setFeedback({ type: 'error', message: 'טעות, נסי שוב.' }); setTimeout(() => setFeedback(null), 1500); }
    };

    const resetProgress = () => {
        if (confirm("לאפס את כל ההתקדמות?")) {
            setMasteredIndexes([]); setActiveWordIndex(0);
            localStorage.removeItem('alma_mastered_words'); localStorage.removeItem('alma_last_active_index');
            setView('learn'); setStep(1);
        }
    };

    const NavBtn = ({ icon, label, id }) => (
        <button onClick={() => setView(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all shadow-sm border border-transparent
                ${view === id ? 'bg-pink-500 text-white shadow-md scale-105 border-pink-600' : 'bg-white text-slate-700 hover:bg-pink-50 hover:text-pink-600 hover:border-pink-200'}`}>
            <span>{icon}</span><span>{label}</span>
        </button>
    );

    return (
        <div className="min-h-screen bg-rose-50 text-slate-800 p-4 md:p-8 font-sans" dir="rtl">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <header className="text-center mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <button onClick={resetProgress} className="text-xs bg-white hover:bg-pink-100 text-pink-600 px-3 py-1 rounded-full font-bold shadow-sm">איפוס 🔄</button>
                        <h1 className="text-4xl md:text-5xl font-black text-pink-600 drop-shadow-sm">העולם של עלמה 🌟</h1>
                        <div className="w-16" />
                    </div>
                    <div className="flex flex-wrap justify-center gap-2">
                        <NavBtn icon="🎓" label="למידה"   id="learn" />
                        <NavBtn icon="📖" label="ספריה"   id="library" />
                        <NavBtn icon="📚" label="סיפור"   id="story" />
                    </div>
                </header>

                {/* Learn */}
                {view === 'learn' && (
                    <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border-t-8 border-pink-400 text-center relative min-h-[450px] flex flex-col justify-center transition-all">
                        {feedback && (
                            <div className={`absolute top-0 left-0 w-full p-3 rounded-t-[3rem] text-white font-bold ${feedback.type === 'success' ? 'bg-fuchsia-500' : 'bg-rose-500'}`}>
                                {feedback.message}
                            </div>
                        )}
                        <h2 className="text-6xl font-black text-pink-900 mb-8" dir="ltr">{currentWord.en}</h2>

                        {step === 1 && (
                            <div className="space-y-6">
                                <button onClick={() => speakText(currentWord.en)}
                                    className="w-24 h-24 bg-pink-500 text-white rounded-full flex items-center justify-center mx-auto shadow-lg hover:scale-110 active:scale-95 transition-all">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                    </svg>
                                </button>
                                <button onClick={() => setStep(2)}
                                    className="mt-8 px-10 py-5 bg-white border-4 border-pink-400 text-pink-600 font-black text-2xl rounded-2xl shadow-xl hover:bg-pink-500 hover:text-white transition-all transform hover:scale-105 block mx-auto w-full max-w-sm">
                                    אני מכירה, נעבור לתרגום ✨
                                </button>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {options.map((opt, i) => (
                                    <button key={i} onClick={() => checkTranslation(opt.he)}
                                        className="p-6 bg-pink-50 border-2 border-pink-200 rounded-2xl font-bold text-xl text-pink-900 hover:bg-pink-500 hover:text-white transition-all shadow-sm">
                                        {opt.he}
                                    </button>
                                ))}
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-6">
                                <p className="text-slate-500 font-bold text-lg">עכשיו תורך! אמרי את המילה באנגלית:</p>
                                <button onClick={handleSpeech}
                                    className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto shadow-2xl transition-all relative ${isListening ? 'bg-rose-400 scale-110' : 'bg-pink-500 hover:bg-pink-600'}`}>
                                    {isListening && <span className="absolute inset-0 rounded-full border-4 border-rose-300 animate-ping" />}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="white">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                    </svg>
                                </button>
                                <p className="font-bold text-slate-400">{isListening ? "💬 אני מקשיב..." : "לחצי על המיקרופון"}</p>
                            </div>
                        )}

                        <div className="w-full bg-pink-100 h-4 rounded-full mt-10 overflow-hidden">
                            <div className="bg-pink-500 h-full transition-all duration-700" style={{ width: `${(masteredIndexes.length / wordsData.length) * 100}%` }} />
                        </div>
                        <p className="text-slate-400 text-sm mt-2 font-bold">{masteredIndexes.length} מתוך {wordsData.length} מילים נלמדו</p>
                    </div>
                )}

                {/* Library */}
                {view === 'library' && (
                    <div className="bg-white rounded-[3rem] p-8 shadow-xl border-t-8 border-orange-300 transition-all">
                        <h2 className="text-3xl font-black text-orange-800 mb-6 text-center">הספריה הגדולה ({wordsData.length} מילים)</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-h-[60vh] overflow-y-auto pr-2">
                            {wordsData.map((w, idx) => (
                                <div key={idx} onClick={() => { setActiveWordIndex(idx); setStep(1); setView('learn'); }}
                                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:scale-105
                                        ${masteredIndexes.includes(idx) ? 'bg-fuchsia-50 border-fuchsia-300' : 'bg-rose-50 border-rose-100 hover:border-pink-400'}`}>
                                    <p className="font-black text-lg text-center text-slate-800" dir="ltr">{w.en}</p>
                                    <p className="text-sm text-center text-slate-500 mt-1">{w.he}</p>
                                    {masteredIndexes.includes(idx) && <span className="text-fuchsia-500 text-center block mt-1 font-bold">✓</span>}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Story */}
                {view === 'story' && (
                    <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border-t-8 border-fuchsia-400 transition-all">
                        <h2 className="text-4xl font-black text-fuchsia-900 mb-6 text-center">The Big Challenge 🧗‍♀️</h2>
                        <div className="text-xl leading-loose text-slate-800 bg-fuchsia-50 p-6 md:p-8 rounded-2xl border-2 border-fuchsia-200 shadow-inner mb-8" dir="ltr">
                            <p className="mb-4">
                                Maya wanted to <strong className="text-fuchsia-600">improve</strong> her English.
                                She knew she had to <strong className="text-fuchsia-600">prepare</strong> for a <strong className="text-pink-600">difficult challenge</strong>.
                            </p>
                            <p className="mb-4">
                                Her <strong className="text-pink-600">friend</strong> gave her <strong className="text-fuchsia-600">helpful advice</strong>:
                                "<strong className="text-fuchsia-600">Focus</strong> on your goals, and be <strong className="text-fuchsia-600">careful</strong> not to waste time."
                            </p>
                            <p>
                                She wanted to <strong className="text-pink-600">discover</strong> a <strong className="text-pink-600">new career</strong>.
                                It wasn't <strong className="text-pink-600">easy</strong>, but she was <strong className="text-fuchsia-600">successful</strong> because she never stopped trying to <strong className="text-pink-600">understand</strong>.
                            </p>
                        </div>
                        <button onClick={() => speakText(storyText)}
                            className="px-8 py-4 bg-fuchsia-500 text-white rounded-xl font-bold mx-auto flex items-center justify-center gap-2 hover:bg-fuchsia-600 shadow-md transition-colors mb-8">
                            🔊 השמע קריאה
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
}
