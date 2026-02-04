import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { useParams } from "react-router-dom";
import { decodeData } from "../utils/encode";

/* =======================
   Dynamic NO messages
======================= */
const getNoMessages = (name = "You") => [
    "Oh? 👀 You clicked No already?",
    "Wow. Bold choice. Very bold.",
    "Are you *sure* sure? Because my heart disagrees.",
    `${name}… that button is starting to look suspicious 😏`,
    "Okay but imagine saying No to *this face* 🥺",
    "This is getting awkward. Just say Yes already.",
    "At this point the No button is just decoration 😂",
    "Alright. Enough drama. You’re clearly meant to say Yes 💖"
];

/* =======================
   Random valentine message
======================= */
function generateValentineMessage(name = "You") {
    const openers = [
        "I was going to write something simple, but my heart had other plans.",
        "I tried to be logical… then I thought about you.",
        "Some questions deserve special courage."
    ];
    const middles = [
        `Every moment with ${name} feels warmer and more real.`,
        `You make ordinary days unforgettable.`,
        `Being around you feels like home.`
    ];
    const closers = [
        "So here I am, hoping this makes you smile.",
        "This isn’t just a question, it’s a feeling.",
        "Just a heart being honest."
    ];
    const pick = a => a[Math.floor(Math.random() * a.length)];
    return `${pick(openers)} ${pick(middles)} ${pick(closers)}`;
}

/* =======================
   Teddy GIF reactions
======================= */
const teddyGifs = [
    "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif",
    "https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif",
    "https://media.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif",
    "https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif"
];

/* =======================
   Floating hearts
======================= */
function FloatingHearts() {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {Array.from({ length: 18 }).map((_, i) => (
                <span
                    key={i}
                    className="absolute animate-float text-pink-400"
                    style={{
                        left: `${Math.random() * 100}%`,
                        fontSize: `${12 + Math.random() * 24}px`,
                        animationDuration: `${8 + Math.random() * 10}s`,
                        animationDelay: `${Math.random() * 5}s`
                    }}
                >
          ❤️
        </span>
            ))}
        </div>
    );
}

/* =======================
   Main Component
======================= */
export default function Valentine({ preview = false, to: previewTo, from: previewFrom }) {
    const { code } = useParams();

    const decoded = !preview && code ? decodeData(code) : null;

    const to = preview
        ? previewTo || "Someone"
        : decoded?.to || "Someone";

    const from = preview
        ? previewFrom || ""
        : decoded?.from || "";
    const zoneRef = useRef(null);
    const noBtnRef = useRef(null);
    const canvasRef = useRef(null);

    const [step, setStep] = useState("intro");
    const [yesScale, setYesScale] = useState(1);
    const [noStage, setNoStage] = useState(0);
    const [reactionGif, setReactionGif] = useState(null);

    const messages = getNoMessages(to);

    /* =======================
       Canvas resize
    ======================= */
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const resize = () => {
            const dpr = Math.max(1, window.devicePixelRatio || 1);
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
        };

        resize();
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, []);

    /* =======================
       Helpers
    ======================= */
    const fireConfetti = () => {
        confetti({
            particleCount: 260,
            spread: 150,
            startVelocity: 60,
            origin: { x: 0.5, y: 0.5 }
        });
    };

    const showReaction = () => {
        const gif = teddyGifs[Math.floor(Math.random() * teddyGifs.length)];
        setReactionGif(gif);
        setTimeout(() => setReactionGif(null), 2000);
    };

    const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

    const moveNo = (x, y) => {
        if (!zoneRef.current || !noBtnRef.current) return;

        const zone = zoneRef.current.getBoundingClientRect();
        const btn = noBtnRef.current.getBoundingClientRect();

        let dx = btn.left + btn.width / 2 - x;
        let dy = btn.top + btn.height / 2 - y;
        const mag = Math.hypot(dx, dy) || 1;
        dx /= mag;
        dy /= mag;

        let left = btn.left - zone.left + dx * 160;
        let top = btn.top - zone.top + dy * 160;

        noBtnRef.current.style.left =
            clamp(left, 0, zone.width - btn.width) + "px";
        noBtnRef.current.style.top =
            clamp(top, 0, zone.height - btn.height) + "px";

        setYesScale(s => Math.min(2.3, s + 0.12));
    };

    /* =======================
       Render
    ======================= */
    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-200 via-pink-300 to-rose-400">
            <FloatingHearts />
            <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50" />

            <div className="min-h-screen flex items-center justify-center">
                <main className="relative z-10 w-[92vw] max-w-xl rounded-3xl p-8 text-center shadow-2xl bg-white/80 backdrop-blur-xl">

                    {reactionGif && (
                        <img
                            src={reactionGif}
                            alt="reaction"
                            className="mx-auto mb-4 max-w-[200px] animate-pop"
                        />
                    )}

                    {step === "intro" && (
                        <div className="animate-pop">
                            <h1 className="text-4xl font-extrabold mb-6">
                                Hey {to} 💕
                            </h1>
                            <p className="mb-8 opacity-80">
                                I have something important to ask you…
                            </p>
                            <button
                                onClick={() => {
                                    showReaction();
                                    setStep("question");
                                }}
                                className="px-10 py-4 bg-pink-500 text-white rounded-full text-xl font-bold hover:scale-105 transition"
                            >
                                Continue →
                            </button>
                        </div>
                    )}

                    {step === "question" && (
                        <>
                            <h1 className="text-4xl font-extrabold mb-8">
                                {from
                                    ? `${to}, will you be my Valentine? 💖`
                                    : `Will you be my Valentine? 💖`}
                            </h1>

                            {noStage > 0 && (
                                <div className="mb-6 space-y-3">
                                    {messages.slice(0, noStage + 1).map((msg, i) => (
                                        <p
                                            key={i}
                                            className={`text-lg font-semibold animate-pop
                        ${i === noStage ? "text-pink-600 scale-105" : "text-pink-400 opacity-70"}`}
                                        >
                                            {msg}
                                        </p>
                                    ))}
                                </div>
                            )}

                            <section
                                ref={zoneRef}
                                onPointerMove={e => {
                                    const b = noBtnRef.current.getBoundingClientRect();
                                    const d = Math.hypot(
                                        b.left + b.width / 2 - e.clientX,
                                        b.top + b.height / 2 - e.clientY
                                    );
                                    if (d < 140) moveNo(e.clientX, e.clientY);
                                }}
                                className="relative mx-auto w-full max-w-md h-40 touch-none"
                            >
                                <button
                                    onClick={() => {
                                        showReaction();
                                        fireConfetti();
                                        setStep("celebration");
                                    }}
                                    style={{
                                        transform: `translateY(-50%) scale(${yesScale})`
                                    }}
                                    className="absolute left-[18%] top-1/2 bg-pink-500 text-white px-8 py-4 rounded-full font-bold shadow-lg transition animate-glow"
                                >
                                    Yes 💘
                                </button>

                                <button
                                    ref={noBtnRef}
                                    onClick={() => {
                                        showReaction();
                                        setNoStage(s => {
                                            const next = Math.min(messages.length - 1, s + 1);
                                            if (next === messages.length - 1) {
                                                setTimeout(() => {
                                                    fireConfetti();
                                                    setStep("celebration");
                                                }, 1500);
                                            }
                                            return next;
                                        });
                                        setYesScale(s => Math.min(3.2, s + 0.3));
                                    }}
                                    className="absolute left-[62%] top-1/2 -translate-y-1/2
                    px-8 py-4 rounded-full font-bold shadow-lg bg-gray-200 transition-all"
                                >
                                    No 😐
                                </button>
                            </section>
                        </>
                    )}

                    {step === "celebration" && (
                        <div className="animate-pop">
                            <h2 className="text-5xl font-extrabold text-pink-600 animate-glow mb-6">
                                YAY 💖🎉
                            </h2>
                            <p className="max-w-md mx-auto opacity-90">
                                {generateValentineMessage(to)}
                            </p>
                        </div>
                    )}

                </main>
            </div>
        </div>
    );
}
