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

// ── Builder Data (9th Grade - prefix/suffix patterns) ──
const builderData = [
    { type: "prefix", prefix: "Un", root: "Happy", rootMeaning: "שמח", word: "Unhappy", options: ["עצוב / לא שמח", "מאוד שמח", "מבולבל"], correct: 0, explanation: "הקידומת Un הופכת את המילה לשלילה. Un+Happy = לא שמח." },
    { type: "prefix", prefix: "Un", root: "Employed", rootMeaning: "מועסק", word: "Unemployed", options: ["עובד במשרה מלאה", "מובטל", "פנסיונר"], correct: 1, explanation: "Un+Employed = לא מועסק = מובטל." },
    { type: "prefix", prefix: "Mis", root: "Understand", rootMeaning: "להבין", word: "Misunderstand", options: ["להבין היטב", "להסביר", "להבין לא נכון"], correct: 2, explanation: "הקידומת Mis פירושה 'בצורה שגויה'. Mis+Understand = להבין לא נכון." },
    { type: "prefix", prefix: "Un", root: "Believable", rootMeaning: "ניתן להאמין", word: "Unbelievable", options: ["מדהים / לא ייאמן", "אמין מאוד", "ברור"], correct: 0, explanation: "Un+Believable = לא ניתן להאמין = מדהים, מפתיע." },
    { type: "compound", part1: "Home", part1Meaning: "בית", part2: "Work", part2Meaning: "עבודה", word: "Homework", options: ["בית ספר", "שיעורי בית", "ניקיון הבית"], correct: 1, explanation: "עבודה שעושים בבית = שיעורי בית." },
    { type: "compound", part1: "News", part1Meaning: "חדשות", part2: "Paper", part2Meaning: "נייר/עיתון", word: "Newspaper", options: ["מגזין", "ספר", "עיתון"], correct: 2, explanation: "נייר עם חדשות = עיתון." },
    { type: "compound", part1: "After", part1Meaning: "אחרי", part2: "Noon", part2Meaning: "צהריים", word: "Afternoon", options: ["לפנות ערב", "אחר הצהריים", "חצות"], correct: 1, explanation: "אחרי הצהריים = אחר הצהריים." },
    { type: "suffix", root: "Success", rootMeaning: "הצלחה", suffix: "ful", word: "Successful", options: ["כושל", "מוצלח", "מנסה"], correct: 1, explanation: "הסיומת ful פירושה 'מלא ב'. Success+ful = מלא הצלחה = מוצלח." },
    { type: "suffix", root: "Use", rootMeaning: "שימוש", suffix: "ful", word: "Useful", options: ["חסר ערך", "שימושי", "משומש"], correct: 1, explanation: "Use+ful = מלא שימוש = שימושי." },
    { type: "suffix", root: "Help", rootMeaning: "עזרה", suffix: "ful", word: "Helpful", options: ["עוזר / מועיל", "מפריע", "חסר תועלת"], correct: 0, explanation: "Help+ful = מלא עזרה = מועיל." },
];

// ── Analogies Data (9th Grade vocabulary) ──
const analogiesData = [
    { word1: "Happy", word2: "Sad", relation: "הפכים (Opposites)", word3: "Fast", options: ["Slow", "Run", "Early", "Dream"], correct: "Slow" },
    { word1: "Difficult", word2: "Easy", relation: "הפכים (Opposites)", word3: "Expensive", options: ["Cheap", "Buy", "Rent", "Useful"], correct: "Cheap" },
    { word1: "Morning", word2: "Night", relation: "הפכים (Opposites)", word3: "Before", options: ["After", "Between", "Behind", "Late"], correct: "After" },
    { word1: "Improve", word2: "Get Better", relation: "מילה ומשמעותה", word3: "Discover", options: ["To Find", "To Forget", "To Lose", "To Wait"], correct: "To Find" },
    { word1: "New", word2: "Old", relation: "הפכים (Opposites)", word3: "Early", options: ["Late", "Morning", "Night", "After"], correct: "Late" },
    { word1: "Career", word2: "Work", relation: "קשר של תחום", word3: "Advice", options: ["Suggestion", "Problem", "Mistake", "Solution"], correct: "Suggestion" },
    { word1: "To Forget", word2: "To Remember", relation: "הפכים (Opposites)", word3: "To Start", options: ["To Finish", "To Learn", "To Wait", "To Help"], correct: "To Finish" },
    { word1: "Dream", word2: "Imagine", relation: "מילים קרובות", word3: "Mistake", options: ["Error", "Advice", "Promise", "Voice"], correct: "Error" },
];

// ── Sentence Completion Data (9th Grade) ──
const completionData = [
    { sentence: "I need to _______ for my English test tomorrow.", options: ["Prepare", "Forget", "Ignore", "Swim"], correct: "Prepare" },
    { sentence: "She gave me some great _______  about how to study.", options: ["Advice", "Mistake", "Career", "Voice"], correct: "Advice" },
    { sentence: "It is _______ to believe, but she finished the whole book in one day.", options: ["Unbelievable", "Terrible", "Strange", "Heavy"], correct: "Unbelievable" },
    { sentence: "I always try to _______ my English skills.", options: ["Improve", "Forget", "Catch", "Borrow"], correct: "Improve" },
    { sentence: "She made a _______ in the test and had to correct it.", options: ["Mistake", "Dream", "Promise", "Secret"], correct: "Mistake" },
    { sentence: "He couldn't _______ on his homework because it was too noisy.", options: ["Focus", "Travel", "Swim", "Sell"], correct: "Focus" },
    { sentence: "The weather in the morning is _______ than in the afternoon.", options: ["Different", "Quiet", "Heavy", "Strange"], correct: "Different" },
    { sentence: "She kept her _______ and nobody knew.", options: ["Secret", "Voice", "Family", "Career"], correct: "Secret" },
    { sentence: "I forgot to do my _______ and the teacher was not happy.", options: ["Homework", "Dream", "Advice", "Story"], correct: "Homework" },
    { sentence: "He is very _______  — he always helps everyone around him.", options: ["Helpful", "Terrible", "Heavy", "Unemployed"], correct: "Helpful" },
];

// ── Stories Data ──
const storiesData = [
    {
        title: "The Big Challenge 🧗‍♀️",
        content: [
            "[[Maya|מאיה|מאיה|learned]] was a 9th grade student who wanted to [[improve|לשפר|אימפרוב|learned]] her English [[skills|כישורים|סקילס|new]]. She knew she had to [[prepare|להתכונן|פריפייר|learned]] for a [[difficult|קשה|דיפיקאלט|learned]] [[challenge|אתגר|צ'לנג|learned]] — an international [[competition|תחרות|קמפטישן|new]]. Every [[morning|בוקר|מורנינג|learned]], she would [[wake|לעורר|ווייק|new]] [[early|מוקדם|ארלי|learned]] to [[study|ללמוד|סטאדי|new]].",
            "Her [[best|הטוב ביותר|בסט|new]] [[friend|חבר/ה|פרנד|learned]] Sarah gave her [[helpful|מועיל|הלפּפול|learned]] [[advice|עצה|אדווייס|learned]]: '[[Focus|להתרכז|פוקוס|learned]] on your [[goal|מטרה|גול|new]], and [[always|תמיד|אולווייז|learned]] be [[careful|זהיר|קרפול|learned]] not to [[waste|לבזבז|ווייסט|new]] your [[time|זמן|טיים|learned]].' Maya [[understood|הבינה|אנדרסטוד|learned]] that [[success|הצלחה|סקסס|new]] required [[hard|קשה|הארד|new]] [[work|עבודה|וורק|learned]].",
            "After three [[month|חודש|מאנס|new]], Maya [[discovered|גילתה|דיסקאברד|learned]] she had a real [[talent|כישרון|טלנט|new]] for [[speaking|דיבור|ספיקינג|new]]. She became [[confident|בטוחה|קנפידנט|new]] and [[determined|נחושה|דיטרמינד|new]]. When the [[final|אחרון|פיינל|new]] [[exam|בדיקה|אגזאם|new]] came, she was [[ready|מוכנה|רדי|learned]].",
            "On the [[day|יום|דיי|learned]] of the [[competition|תחרות|קמפטישן|new]], Maya [[stood|עמדה|סטוד|new]] [[nervous|עצבנית|נרוואס|new]] but [[determined|נחושה|דיטרמינד|new]]. She [[spoke|דברה|ספוק|new]] clearly and [[confidently|בביטחון|קנפידנטלי|new]]. In the [[end|סוף|אנד|learned]], she didn't [[win|לנצח|וויין|new]] first [[place|מקום|פלייס|new]], but she [[discovered|גילתה|דיסקאברד|learned]] something more [[important|חשוב|אימפורטנט|learned]] — she [[believed|האמינה|بيליֵוד|new]] in [[herself|עצמה|הרסלף|new]]."
        ],
        audio: "Maya was a 9th grade student who wanted to improve her English skills. She knew she had to prepare for a difficult challenge — an international competition. Her best friend Sarah gave her helpful advice: Focus on your goal, and always be careful not to waste your time. Maya understood that success required hard work. After three months, Maya discovered she had a real talent for speaking. She became confident and determined. When the final exam came, she was ready. On the day of the competition, Maya stood nervous but determined. She spoke clearly and confidently. In the end, she didn't win first place, but she discovered something more important — she believed in herself."
    },
    {
        title: "The Secret Coffee Shop ☕",
        content: [
            "Every [[afternoon|אחר הצהריים|אפטרנון|learned]], [[Emma|אמה|אמה|new]] would [[walk|ללכת|וואק|new]] to a [[small|קטן|סמול|learned]], [[quiet|שקט|קווייט|learned]] [[shop|חנות|שופ|learned]] near the old [[park|פארק|פארק|learned]]. It was her [[favorite|אהוב|פייוריט|new]] [[place|מקום|פלייס|new]] — a [[hidden|מוסתר|הידן|new]] [[treasure|אוצר|טרז'ר|new]] that [[nobody|אף אחד|נובדי|new]] [[else|אחר|אלס|new]] seemed to [[know|לדעת|נוו|learned]].",
            "She [[loved|אהבה|לאווד|learned]] to [[sit|לשבת|סיט|new]] in the [[corner|פינה|קורנר|new]], [[read|לקרוא|ריד|learned]] books, and [[imagine|לדמיין|אימג'ין|learned]] [[different|שונה|דיפרנט|new]] [[life|חיים|לייף|learned]]. One [[afternoon|אחר הצהריים|אפטרנון|learned]], a [[boy|ילד|בוי|new]] [[named|בשם|נייمד|new]] [[David|דוד|דייווד|new]] [[sat|ישב|סאט|new]] [[next|ליד|נקסט|new]] to her. 'Can I [[borrow|לשאול|בורו|learned]] a [[pen|עט|פן|learned]]?' he [[asked|שאל|אסקד|new]].",
            "Emma was [[surprised|הופתעה|סרפרייזד|new]] but [[friendly|ידידותית|פרנדלי|new]]. They [[started|התחילו|סטארטד|new]] to [[talk|לדבר|טוק|new]] about books, [[life|חיים|לייף|learned]], and their [[dream|חלום|דרים|learned]]. Every [[day|יום|דיי|learned]] [[after|אחרי|אפטר|learned]] that, David would [[arrive|להגיע|אראיוו|learned]] at the [[coffee|קפה|קופי|learned]] [[shop|חנות|שופ|learned]]. Their [[friendship|חברות|פרנדשיפ|new]] [[grew|גדלה|גרו|new]] like a [[beautiful|יפה|ביוטיפול|learned]] [[flower|פרח|פלאוור|new]].",
            "[[Time|זמן|טיים|learned]] [[passed|עברה|פאסד|new]], and the [[coffee|קפה|קופי|learned]] [[shop|חנות|שופ|learned]] became their [[secret|סוד|סיקרט|learned]] [[place|מקום|פלייס|new]], where [[two|שתיים|טו|new]] young [[people|אנשים|פיפל|new]] could [[escape|להימלט|אסקייפ|new]] from the [[busy|עסוק|ביזי|new]] [[world|עולם|וורלד|new]]. Neither of them would ever [[forget|לשכוח|פורגט|learned]] those [[wonderful|נפלא|וונדרפול|learned]] [[afternoon|אחר הצהריים|אפטרנון|learned]]."
        ],
        audio: "Every afternoon, Emma would walk to a small, quiet shop near the old park. It was her favorite place — a hidden treasure that nobody else seemed to know. She loved to sit in the corner, read books, and imagine different lives. One afternoon, a boy named David sat next to her. Can I borrow a pen? he asked. Emma was surprised but friendly. They started to talk about books, life, and their dreams. Every day after that, David would arrive at the coffee shop. Their friendship grew like a beautiful flower. Time passed, and the coffee shop became their secret place, where two young people could escape from the busy world. Neither of them would ever forget those wonderful afternoons."
    },
    {
        title: "The Unexpected Journey 🚂",
        content: [
            "[[Yesterday|אתמול|יסטרדיי|new]], [[Michael|מיכאל|מייקל|new]] received an [[interesting|מעניין|אינטרסטינג|new]] [[letter|מכתב|לטר|new]] from his [[grandmother|סבתא|גראנמא|new]]. She [[wrote|כתבה|רוט|new]]: '[[Come|בוא|קאם|new]] and [[visit|בקר|וויזיט|new]] me this [[summer|קיץ|סמר|new]]. I have a special [[surprise|הפתעה|סרפרייז|learned]] for you.'",
            "Michael was [[curious|סקרן|קיוריאס|new]] but also a bit [[nervous|עצבני|נרוואס|new]]. He hadn't [[seen|ראה|סין|new]] his [[grandmother|סבתא|גראנמא|new]] for three [[years|שנים|יירס|new]]. When he [[arrived|הגיע|אראיוו|new]], she [[decided|החליטה|ديسايديد|new]] they would [[travel|לטייל|טראוול|learned]] together on an [[adventure|הרפתעה|אדוונצ'ר|new]] [[train|רכבת|טריין|new]] [[journey|מסע|ג'רני|new]].",
            "During the [[trip|טיול|טריפ|new]], they [[visited|בקרו|וויזיטד|new]] [[beautiful|יפה|ביוטיפול|learned]] [[cities|ערים|סיטיז|new]]. They [[ate|אכלו|אייט|new]] [[delicious|טעים|דליישאס|learned]] [[food|אוכל|פוד|new]], [[watched|צפו|וואטשד|new]] [[amazing|מדהים|אמייזינג|learned]] [[sunset|שקיעה|סאנסט|new]], and [[shared|חלקו|שירד|new]] many [[story|סיפור|סטורי|learned]]. His [[grandmother|סבתא|גראנמא|new]] [[told|ספרה|טולד|new]] him [[about|על|אבאוט|learned]] her [[life|חיים|לייף|learned]] and her [[dream|חלום|דרים|learned]].",
            "Michael [[realized|הבין|ריאלייזד|new]] that [[life|חיים|לייף|learned]] is [[precious|יקר|פרשאס|new]]. [[Moment|רגע|מוומנט|new]] with [[loved|אהוב|לאווד|learned]] ones are [[important|חשוב|אימפורטנט|learned]]. When he [[returned|חזר|ריטרند|new]] [[home|בית|הום|new]], he [[promised|הבטיח|פרומיסד|learned]] himself to [[visit|בקר|וויזיט|new]] his [[grandmother|סבתא|גראנמא|new]] every [[summer|קיץ|סמר|new]], and to [[never|אף פעם|נוור|learned]] [[forget|לשכוח|פורגט|learned]] the [[wonderful|נפלא|וונדרפול|learned]] [[memory|זיכרון|ממורי|new]]."
        ],
        audio: "Yesterday, Michael received an interesting letter from his grandmother. She wrote: Come and visit me this summer. I have a special surprise for you. Michael was curious but also a bit nervous. He hadn't seen his grandmother for three years. When he arrived, she decided they would travel together on an adventure train journey. During the trip, they visited beautiful cities. They ate delicious food, watched amazing sunsets, and shared many stories. His grandmother told him about her life and her dreams. Michael realized that life is precious. Moments with loved ones are important. When he returned home, he promised himself to visit his grandmother every summer, and to never forget the wonderful memories."
    }
];

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
    const pick = voices.find(v =>
        v.lang.startsWith('en') &&
        (v.name.includes("Premium") || v.name.includes("Enhanced") || v.name.includes("Online") || v.name.includes("Natural")) &&
        !v.name.toLowerCase().includes("male")
    ) || voices.find(v => ["Google US English","Microsoft Samantha","Samantha","Microsoft Zira"].some(p => v.name.includes(p)));
    if (pick) u.voice = pick;
    window.speechSynthesis.speak(u);
};

const getNextRandom = (curr, length) => {
    if (length <= 1) return 0;
    let next = curr;
    while (next === curr) next = Math.floor(Math.random() * length);
    return next;
};

// ── App ───────────────────────────────────────
export default function App() {
    useEffect(() => {
        if (!customElements.get('dotlottie-wc')) {
            const script = document.createElement('script');
            script.src = "https://unpkg.com/@lottiefiles/dotlottie-wc@0.9.3/dist/dotlottie-wc.js";
            script.type = "module";
            document.head.appendChild(script);
        }
    }, []);

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
    const [activeAnim, setActiveAnim] = useState(null);

    // Game states
    const [builderIndex, setBuilderIndex] = useState(0);
    const [analogyIndex, setAnalogyIndex] = useState(0);
    const [compIndex, setCompIndex] = useState(0);
    const [storyIndex, setStoryIndex] = useState(0);
    const [quizSet, setQuizSet] = useState([]);
    const [quizIndex, setQuizIndex] = useState(0);
    const [quizScore, setQuizScore] = useState(0);
    const [matchCards, setMatchCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedPairs, setMatchedPairs] = useState([]);

    const isProcessingRef = useRef(false);
    const currentWord = wordsData[activeWordIndex] || wordsData[0];

    const options = useMemo(() => {
        const others = wordsData.filter(w => w.en !== currentWord.en).sort(() => Math.random() - 0.5).slice(0, 3);
        return [...others, currentWord].sort(() => Math.random() - 0.5);
    }, [activeWordIndex]);

    useEffect(() => {
        localStorage.setItem('alma_mastered_words', JSON.stringify(masteredIndexes));
        localStorage.setItem('alma_last_active_index', activeWordIndex.toString());
    }, [masteredIndexes, activeWordIndex]);

    const triggerAnimation = type => {
        setActiveAnim(type);
        setTimeout(() => setActiveAnim(null), 1800);
    };

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
                triggerAnimation('success-check');
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

    const startMatchGame = () => {
        const selected = [...wordsData].sort(() => 0.5 - Math.random()).slice(0, 6);
        let cards = [];
        selected.forEach((w, i) => {
            cards.push({ id: `en-${i}`, text: w.en, type: 'en', pairId: i });
            cards.push({ id: `he-${i}`, text: w.he, type: 'he', pairId: i });
        });
        setMatchCards(cards.sort(() => 0.5 - Math.random()));
        setFlippedCards([]); setMatchedPairs([]);
        setView('match');
    };

    const handleCardClick = card => {
        if (flippedCards.length === 2 || flippedCards.some(c => c.id === card.id) || matchedPairs.includes(card.pairId)) return;
        const newFlipped = [...flippedCards, card];
        setFlippedCards(newFlipped);
        if (newFlipped.length === 2) {
            if (newFlipped[0].pairId === newFlipped[1].pairId) {
                playSound('success');
                setTimeout(() => {
                    const newMatched = [...matchedPairs, newFlipped[0].pairId];
                    setMatchedPairs(newMatched);
                    setFlippedCards([]);
                    if (newMatched.length === 6) triggerAnimation('confetti');
                }, 500);
            } else {
                playSound('error');
                setTimeout(() => setFlippedCards([]), 1000);
            }
        }
    };

    const startQuiz = () => {
        const vocabQ = [...wordsData].sort(() => 0.5 - Math.random()).slice(0, 4).map(w => {
            const others = wordsData.filter(x => x.he !== w.he).sort(() => 0.5 - Math.random()).slice(0, 3);
            const opts = [...others.map(x => x.he), w.he].sort(() => 0.5 - Math.random());
            return { type: 'vocab', question: w.en, correct: w.he, options: opts };
        });
        const analogyQ = [...analogiesData].sort(() => 0.5 - Math.random()).slice(0, 3).map(a => ({
            type: 'analogy', data: a, correct: a.correct, options: a.options
        }));
        const compQ = [...completionData].sort(() => 0.5 - Math.random()).slice(0, 3).map(c => ({
            type: 'completion', data: c, correct: c.correct, options: c.options
        }));
        setQuizSet([...vocabQ, ...analogyQ, ...compQ].sort(() => 0.5 - Math.random()));
        setQuizIndex(0); setQuizScore(0);
        setView('quiz'); setFeedback(null);
    };

    const handleQuizAnswer = selected => {
        if (isProcessingRef.current) return;
        isProcessingRef.current = true;
        if (selected === quizSet[quizIndex].correct) {
            setQuizScore(prev => prev + 1);
            playSound('success');
            triggerAnimation('success-check');
        } else {
            playSound('error');
        }
        setTimeout(() => {
            if (quizIndex < quizSet.length - 1) setQuizIndex(prev => prev + 1);
            else setView('quiz-result');
            isProcessingRef.current = false;
        }, 1200);
    };

    const renderStoryText = text => {
        const parts = text.split(/(\[\[.*?\]\])/g);
        const typeStyles = {
            learned: "text-fuchsia-600 border-fuchsia-300",
            new: "text-pink-600 border-pink-300"
        };
        return parts.map((part, i) => {
            if (part.startsWith('[[') && part.endsWith(']]')) {
                const [word, he, pron, type] = part.slice(2, -2).split('|');
                const styleClass = typeStyles[type] || typeStyles.learned;
                return (
                    <span key={i} className={`relative group font-bold cursor-help inline-block border-b-2 transition-colors hover:bg-slate-50 rounded-sm px-1 ${styleClass}`}>
                        {word}
                        <span className="absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 w-max px-3 py-1.5 bg-slate-800 text-white rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 shadow-xl flex flex-col items-center" dir="rtl">
                            <span className="font-black text-sm">{he}</span>
                            <span className="text-pink-300 text-xs mt-0.5">{pron}</span>
                            <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"></span>
                        </span>
                    </span>
                );
            }
            return <span key={i}>{part}</span>;
        });
    };

    const NavBtn = ({ icon, label, id, action }) => (
        <button onClick={() => { if (action) action(); else setView(id); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all shadow-sm border border-transparent
                ${view === id || (view.startsWith('quiz') && id === 'quiz') ? 'bg-pink-500 text-white shadow-md scale-105 border-pink-600' : 'bg-white text-slate-700 hover:bg-pink-50 hover:text-pink-600 hover:border-pink-200'}`}>
            <span>{icon}</span><span>{label}</span>
        </button>
    );

    return (
        <div className="min-h-screen bg-rose-50 text-slate-800 p-4 md:p-8 font-sans" dir="rtl">
            <div className="max-w-5xl mx-auto">

                {/* Lottie Overlays */}
                {activeAnim === 'success-check' && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none bg-white/30 backdrop-blur-sm">
                        <dotlottie-wc src="https://lottie.host/21a44f7a-fb9f-4e6e-8ed5-647aa8455b43/jGVlPat0sl.lottie" style={{width:'300px',height:'300px'}} autoplay></dotlottie-wc>
                    </div>
                )}
                {activeAnim === 'confetti' && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none bg-white/30 backdrop-blur-sm">
                        <dotlottie-wc src="https://lottie.host/4c47d84e-6829-4be0-a686-d7a0817a318d/HgXH5VSCYu.lottie" style={{width:'100vw',height:'100vh'}} autoplay></dotlottie-wc>
                    </div>
                )}

                {/* Header */}
                <header className="text-center mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <button onClick={resetProgress} className="text-xs bg-white hover:bg-pink-100 text-pink-600 px-3 py-1 rounded-full font-bold shadow-sm">איפוס 🔄</button>
                        <h1 className="text-4xl md:text-5xl font-black text-pink-600 drop-shadow-sm">העולם של עלמה 🌟</h1>
                        <div className="w-16" />
                    </div>
                    <div className="flex flex-wrap justify-center gap-2">
                        <NavBtn icon="🎓" label="למידה"    id="learn" />
                        <NavBtn icon="📖" label="ספריה"    id="library" />
                        <NavBtn icon="🧩" label="הרכבה"    id="builder" action={() => { setView('builder'); setBuilderIndex(Math.floor(Math.random() * builderData.length)); }} />
                        <NavBtn icon="🔗" label="אנלוגיות" id="analogies" action={() => { setView('analogies'); setAnalogyIndex(Math.floor(Math.random() * analogiesData.length)); }} />
                        <NavBtn icon="✍️" label="משפטים"   id="completion" action={() => { setView('completion'); setCompIndex(Math.floor(Math.random() * completionData.length)); }} />
                        <NavBtn icon="📚" label="סיפור"    id="story" action={() => { setView('story'); setStoryIndex(Math.floor(Math.random() * storiesData.length)); }} />
                        <NavBtn icon="🃏" label="זוגות"    id="match" action={startMatchGame} />
                        <NavBtn icon="🏆" label="בוחן"     id="quiz" action={startQuiz} />
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
                        <h2 className="text-3xl font-black text-rose-500 mb-6 text-center">הספריה הגדולה ({wordsData.length} מילים) 📚</h2>
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

                {/* Builder */}
                {view === 'builder' && (
                    <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border-t-8 border-rose-400 text-center transition-all">
                        <h2 className="text-3xl font-black text-rose-600 mb-4">מילים מורכבות 🧩</h2>
                        <p className="text-slate-600 mb-8 font-bold text-lg">{builderData[builderIndex].explanation}</p>
                        <div className="flex justify-center items-center text-2xl md:text-5xl font-black gap-2 mb-8 bg-rose-50 p-6 rounded-3xl border-2 border-rose-100 flex-wrap" dir="ltr">
                            <span className="text-rose-500">
                                {builderData[builderIndex].type === 'prefix' ? builderData[builderIndex].prefix :
                                 builderData[builderIndex].type === 'suffix' ? builderData[builderIndex].root :
                                 builderData[builderIndex].part1}
                            </span>
                            <span className="text-pink-300">+</span>
                            <span className="text-slate-700">
                                {builderData[builderIndex].type === 'prefix' ? builderData[builderIndex].root :
                                 builderData[builderIndex].type === 'suffix' ? builderData[builderIndex].suffix :
                                 builderData[builderIndex].part2}
                            </span>
                            <span className="text-pink-300 mx-2">=</span>
                            <span className="text-rose-700 underline decoration-rose-300">{builderData[builderIndex].word}</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {builderData[builderIndex].options.map((opt, i) => (
                                <button key={i} onClick={() => {
                                    if (i === builderData[builderIndex].correct) {
                                        playSound('success'); triggerAnimation('success-check');
                                        setTimeout(() => setBuilderIndex(prev => getNextRandom(prev, builderData.length)), 1500);
                                    } else playSound('error');
                                }} className="p-6 bg-rose-50 border-2 border-rose-200 rounded-2xl font-bold text-xl text-rose-900 hover:bg-rose-500 hover:text-white transition-all shadow-sm">{opt}</button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Analogies */}
                {view === 'analogies' && (
                    <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border-t-8 border-fuchsia-400 text-center transition-all">
                        <h2 className="text-3xl font-black text-fuchsia-800 mb-8">אנלוגיות - מה הקשר? 🔗</h2>
                        <div className="bg-fuchsia-50 px-6 py-2 rounded-full inline-block mb-8 font-bold text-fuchsia-800 text-lg">{analogiesData[analogyIndex].relation}</div>
                        <div className="flex justify-center items-center gap-4 text-3xl md:text-4xl font-black bg-pink-50 p-6 rounded-2xl mb-4 border-2 border-pink-100 w-full max-w-lg mx-auto flex-wrap" dir="ltr">
                            <span className="text-slate-700">{analogiesData[analogyIndex].word1}</span>
                            <span className="text-fuchsia-400">↔️</span>
                            <span className="text-slate-700">{analogiesData[analogyIndex].word2}</span>
                        </div>
                        <div className="text-xl text-slate-400 font-bold mb-4">בדיוק כמו ש...</div>
                        <div className="flex justify-center items-center gap-4 text-3xl md:text-4xl font-black bg-fuchsia-100 p-6 rounded-2xl mb-10 border-4 border-fuchsia-200 w-full max-w-lg mx-auto flex-wrap" dir="ltr">
                            <span className="text-fuchsia-900">{analogiesData[analogyIndex].word3}</span>
                            <span className="text-fuchsia-400">↔️</span>
                            <span className="border-b-4 border-fuchsia-500 text-fuchsia-500 w-16 text-center">?</span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {analogiesData[analogyIndex].options.map((opt, i) => (
                                <button key={i} onClick={() => {
                                    if (opt === analogiesData[analogyIndex].correct) {
                                        playSound('success'); triggerAnimation('success-check');
                                        setTimeout(() => setAnalogyIndex(prev => getNextRandom(prev, analogiesData.length)), 1500);
                                    } else playSound('error');
                                }} className="p-5 bg-white border-2 border-fuchsia-200 rounded-2xl font-black text-xl text-fuchsia-800 hover:bg-fuchsia-500 hover:text-white transition-all shadow-sm" dir="ltr">{opt}</button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Completion */}
                {view === 'completion' && (
                    <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border-t-8 border-pink-500 text-center transition-all">
                        <h2 className="text-3xl font-black text-pink-800 mb-8">השלמת משפטים ✍️</h2>
                        <div className="bg-pink-50 p-8 rounded-2xl border-2 border-pink-200 mb-10 text-2xl font-bold text-slate-800 leading-loose shadow-inner" dir="ltr">
                            {completionData[compIndex].sentence.split('_______')[0]}
                            <span className="inline-block border-b-4 border-pink-500 text-pink-600 px-4">?</span>
                            {completionData[compIndex].sentence.split('_______')[1]}
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {completionData[compIndex].options.map((opt, i) => (
                                <button key={i} onClick={() => {
                                    if (opt === completionData[compIndex].correct) {
                                        playSound('success'); triggerAnimation('success-check');
                                        setTimeout(() => setCompIndex(prev => getNextRandom(prev, completionData.length)), 1500);
                                    } else playSound('error');
                                }} className="p-6 bg-white border-2 border-pink-200 rounded-2xl font-black text-xl text-pink-800 hover:bg-pink-500 hover:text-white transition-all shadow-sm" dir="ltr">{opt}</button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Story */}
                {view === 'story' && (
                    <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border-t-8 border-rose-400 relative transition-all">
                        <h2 className="text-4xl font-black text-rose-600 mb-6 text-center">{storiesData[storyIndex].title}</h2>
                        <div className="flex flex-wrap justify-center gap-2 mb-6 text-sm font-bold">
                            <span className="bg-fuchsia-100 text-fuchsia-800 px-3 py-1 rounded-full">מילים שלמדנו</span>
                            <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full">חדשות — עברו עם העכבר</span>
                        </div>
                        <div className="text-xl md:text-2xl leading-loose text-slate-800 bg-rose-50 p-6 md:p-8 rounded-2xl border-2 border-rose-200 shadow-inner" dir="ltr">
                            {storiesData[storyIndex].content.map((paragraph, idx) => (
                                <p key={idx} className="mb-4">{renderStoryText(paragraph)}</p>
                            ))}
                        </div>
                        <div className="flex justify-center gap-4 mt-8 flex-wrap">
                            <button onClick={() => speakText(storiesData[storyIndex].audio)} className="px-8 py-4 bg-rose-400 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-rose-500 shadow-md transition-colors">
                                🔊 השמע סיפור
                            </button>
                            <button onClick={() => setStoryIndex(prev => getNextRandom(prev, storiesData.length))} className="px-8 py-4 bg-white border-2 border-rose-400 text-rose-600 rounded-xl font-bold flex items-center gap-2 hover:bg-rose-50 shadow-sm transition-colors">
                                🎲 סיפור אחר
                            </button>
                        </div>
                    </div>
                )}

                {/* Match */}
                {view === 'match' && (
                    <div className="bg-white rounded-[3rem] p-8 shadow-xl border-t-8 border-purple-400 text-center transition-all min-h-[500px]">
                        <h2 className="text-3xl font-black text-purple-700 mb-2">זוגות - מצאי את ההתאמה 🃏</h2>
                        <p className="text-slate-500 font-bold mb-8">לחצי על קלף אנגלית והפירוש שלו בעברית</p>
                        {matchedPairs.length === 6 ? (
                            <div className="py-20">
                                <h3 className="text-5xl font-black text-fuchsia-500 mb-6">ניצחון! 🎉</h3>
                                <button onClick={startMatchGame} className="px-8 py-4 bg-purple-500 text-white rounded-xl font-bold hover:bg-purple-600">שחקי שוב</button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                                {matchCards.map((card, i) => {
                                    const isFlipped = flippedCards.some(c => c.id === card.id);
                                    const isMatched = matchedPairs.includes(card.pairId);
                                    return (
                                        <button key={i} onClick={() => handleCardClick(card)} disabled={isFlipped || isMatched}
                                            className={`h-24 md:h-32 rounded-2xl font-black text-lg md:text-xl transition-all shadow-md flex items-center justify-center border-4 ${isMatched ? 'opacity-0 scale-95 cursor-default bg-fuchsia-100 border-fuchsia-300' : isFlipped ? 'bg-pink-100 border-pink-400 text-pink-900 scale-105' : 'bg-purple-50 border-purple-200 text-purple-900 hover:bg-purple-100'}`}
                                            dir={card.type === 'en' ? 'ltr' : 'rtl'}>
                                            {card.text}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}

                {/* Quiz */}
                {view === 'quiz' && quizSet.length > 0 && (
                    <div className="bg-white rounded-[3rem] p-8 shadow-xl border-t-8 border-fuchsia-500 text-center transition-all">
                        <h2 className="text-xl font-bold text-fuchsia-700 mb-8">שאלה {quizIndex + 1} מתוך {quizSet.length}</h2>
                        {quizSet[quizIndex].type === 'vocab' && (
                            <h3 className="text-6xl font-black text-slate-900 mb-10" dir="ltr">{quizSet[quizIndex].question}</h3>
                        )}
                        {quizSet[quizIndex].type === 'analogy' && (
                            <div className="mb-10 flex flex-col items-center gap-4">
                                <div className="text-3xl font-black bg-slate-50 p-4 rounded-xl border-2 border-slate-200 w-full max-w-sm flex justify-center gap-4" dir="ltr">
                                    <span>{quizSet[quizIndex].data.word1}</span> ↔️ <span>{quizSet[quizIndex].data.word2}</span>
                                </div>
                                <div className="text-3xl font-black text-fuchsia-700 bg-fuchsia-50 p-4 rounded-xl border-2 border-fuchsia-200 w-full max-w-sm flex justify-center gap-4" dir="ltr">
                                    <span>{quizSet[quizIndex].data.word3}</span> ↔️ <span className="border-b-4 border-fuchsia-400 min-w-[50px]">?</span>
                                </div>
                            </div>
                        )}
                        {quizSet[quizIndex].type === 'completion' && (
                            <div className="mb-10 text-2xl font-bold bg-fuchsia-50 p-6 rounded-2xl border-2 border-fuchsia-200" dir="ltr">
                                {quizSet[quizIndex].data.sentence.split('_______')[0]}
                                <span className="border-b-4 border-fuchsia-500 px-4">?</span>
                                {quizSet[quizIndex].data.sentence.split('_______')[1]}
                            </div>
                        )}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {quizSet[quizIndex].options.map((opt, i) => (
                                <button key={i} onClick={() => handleQuizAnswer(opt)}
                                    className="p-5 bg-pink-50 border-2 border-pink-100 rounded-2xl font-bold text-xl text-pink-900 hover:bg-pink-500 hover:text-white transition-all shadow-sm">
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {view === 'quiz-result' && (
                    <div className="bg-white rounded-[3rem] p-12 shadow-xl border-t-8 border-fuchsia-500 text-center transition-all min-h-[400px] flex flex-col justify-center">
                        <h2 className="text-4xl font-black text-purple-900 mb-4">כל הכבוד! 🏆</h2>
                        <p className="text-2xl mb-4">הציון שלך:</p>
                        <div className="text-8xl font-black text-fuchsia-600 mb-8">{Math.round((quizScore / quizSet.length) * 100)}%</div>
                        <button onClick={() => setView('learn')} className="px-8 py-4 bg-fuchsia-500 text-white rounded-2xl font-bold text-xl hover:bg-fuchsia-600 transition-colors mx-auto">המשך למידה</button>
                    </div>
                )}

            </div>
        </div>
    );
}
