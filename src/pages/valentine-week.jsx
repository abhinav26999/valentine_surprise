import { useState } from "react";
import { motion } from "framer-motion";
import { getToName } from "../utils/getName";
import "../styles/flip.css";

const cards = [
    {
        title: "Rose Day",
        frontImg: "/9.jpg",
        gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGJwb3QxMGtpOGxmZjkxbHozeXdyMnozY2poaDRmYzBwaGFzY2NpNCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/wvYNSqBAMDVx8CEYkt/giphy.gif"
    },
    {
        title: "Propose Day",
        frontImg: "/8.jpeg",
        gif: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXRlMGVyNjJ0bWdzZWY1b25td3A4c3dzemdra3NiOHl4eXNydzk4dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/mWiyKgqfvoZhNb63Cr/giphy.gif"
    },
    {
        title: "Chocolate Day",
        frontImg: "/6.jpg",
        gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjhjaHdraTU3YXhxd2hieDNoMzZmbWZ5Y3UydmNkbGowbGJkMmpuNSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Dly2Kpz0T5QI/giphy.gif"
    },
    {
        title: "Teddy Day",
        frontImg: "/3.jpg",
        gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXAyeW81dDRvZGpjcXA4Z3VvYXU3cmlleWV2cXVwaG5tNGdiNTE2aiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Czeb1IMh87osq7Qdb3/giphy.gif"
    },
    {
        title: "Promise Day",
        frontImg: "/5.jpg",
        gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXAyeW81dDRvZGpjcXA4Z3VvYXU3cmlleWV2cXVwaG5tNGdiNTE2aiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/0JukrbsMKZKIrwCF3D/giphy.gif"
    },
    {
        title: "Hug Day",
        frontImg: "/7.jpg",
        gif: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3eTZqeHNyMnd6azI4a2tzOHRmMXgzMzM2dTNtcWFyeDNna2Z4dWlqNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ZmYebl3YnJLUsYtV1h/giphy.gif"
    },
    {
        title: "Kiss Day",
        frontImg: "/2.jpg",
        gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzZ6bm5sa29yNzJuaTFxNTdxa3NiNXVyeHlzYmM4aG84aDRtNjU4YSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/13mcFKLbbLCkp2/giphy.gif"
    },
    {
        title: "Valentine's Day",
        frontImg: "/images (1).jpeg",
        gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGI1aGk3NHAzYWtmbml3Mm83MHdwcnpyb2Zya2M1bnZldmhobDBkaSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/WhaocJtBPXoBO/giphy.gif"
    },
];

const teasingMessages = [
    "😏 Hmm… luck is shy today",
    "💕 Someone is smiling already",
    "🧸 Teddy says: try once more",
    "💖 Okay okay… don’t stare like that",
];

export default function ValentineWeek() {
    const [tries, setTries] = useState(0);
    const [message, setMessage] = useState("");
    const [unlocked, setUnlocked] = useState(false);
    const toName = getToName();

    const playGame = () => {
        const nextTry = tries + 1;
        setTries(nextTry);

        const tease =
            teasingMessages[Math.floor(Math.random() * teasingMessages.length)];
        setMessage(tease);

        if (nextTry >= 2) {
            setUnlocked(true);
            setMessage(`💝 Okay ${toName}, cards are unlocked!`);
        }
    };

    return (
        <div className="min-h-screen bg-pink-100 p-8">
            <h1 className="text-4xl font-extrabold text-center mb-4">
                💖 For {toName} 💖
            </h1>

            {/* 🎲 Playful Game */}
            <div className="text-center mb-10">
                {!unlocked ? (
                    <>
                        <p className="mb-3 font-semibold">
                            Wanna see something special? 😏
                        </p>
                        <button
                            onClick={playGame}
                            className="bg-pink-500 text-white px-6 py-3 rounded-full font-bold hover:scale-105 transition"
                        >
                            🎲 Play a Little Game
                        </button>
                    </>
                ) : null}

                {message && (
                    <p className="mt-4 text-lg font-semibold text-pink-600">
                        {message}
                    </p>
                )}
            </div>

            {/* 💝 CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {cards.map((card, i) => (
                    <Card
                        key={i}
                        card={card}
                        unlocked={unlocked}
                        toName={toName}
                    />
                ))}
            </div>
        </div>
    );
}

/* ================= CARD ================= */

function Card({ card, unlocked, toName }) {
    const [flip, setFlip] = useState(false);

    return (
        <motion.div
            className={`relative h-64 rounded-2xl shadow-xl ${
                unlocked ? "cursor-pointer" : "opacity-50"
            } perspective`}
            onClick={() => unlocked && setFlip(!flip)}
        >
            <motion.div
                className="absolute inset-0"
                animate={{ rotateY: flip ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* FRONT (IMAGE CARD) */}
                <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden">
                    <img
                        src={card.frontImg}
                        alt={card.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <h2 className="text-white text-xl font-bold">
                            {card.title}
                        </h2>
                    </div>
                </div>

                {/* BACK (TEDDY GIF) */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl bg-white flex flex-col items-center justify-center">
                    <img src={card.gif} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <h2 className="text-white text-xl font-bold">
                            Happy {card.title}, {toName} 💕
                        </h2>
                    </div>
                </div>
            </motion.div>

            {!unlocked && (
                <div className="absolute inset-0 rounded-2xl bg-black/40 flex items-center justify-center">
                    <span className="text-3xl">🔒</span>
                </div>
            )}
        </motion.div>
    );
}
