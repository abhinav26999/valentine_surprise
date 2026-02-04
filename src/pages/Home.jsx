import { useEffect, useState } from "react";
import { encodeData } from "../utils/encode";
import Valentine from "./Valentine";

export default function Home() {
    const [to, setTo] = useState("");
    const [from, setFrom] = useState("");
    const [link, setLink] = useState("");
    const [copied, setCopied] = useState(false);
    const [visits, setVisits] = useState(0);
    const [nameHistory, setNameHistory] = useState([]);

    useEffect(() => {
        try {
            const count = Number(localStorage.getItem("site_visits") || 0) + 1;
            localStorage.setItem("site_visits", count);
            setVisits(count);

            const savedNames = JSON.parse(localStorage.getItem("name_history") || "[]");
            setNameHistory(savedNames);
        } catch {}
    }, []);


    const generate = async () => {
        if (!to.trim()) return alert("Enter partner name");

        const code = encodeData({ to, from });
        const generatedLink = `${window.location.origin}/v/${code}`;

        setLink(generatedLink);
        try {
            await navigator.clipboard.writeText(generatedLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            setCopied(false);
        }
        try {
            const savedNames = JSON.parse(localStorage.getItem("name_history") || "[]");

            if (!savedNames.includes(to)) {
                const updated = [to, ...savedNames].slice(0, 10); // keep last 10
                localStorage.setItem("name_history", JSON.stringify(updated));
                setNameHistory(updated);
            }
        } catch {}

    };

    return (
        <div className="min-h-screen grid md:grid-cols-2">

            {/* LEFT */}
            <div className="p-10 flex flex-col justify-center bg-pink-100">
                <h1 className="text-4xl font-extrabold mb-6">
                    Make a Viral Valentine 💖
                </h1>

                {/* 👀 Visitor Count */}
                <p className="mb-6 text-sm text-gray-600">
                    👀 Users visited this website:{" "}
                    <span className="font-semibold text-pink-600">
            {visits}
          </span>
                    {nameHistory.length > 0 && (
                        <div className="mb-4">
                            <p className="text-xs text-gray-500 mb-1">
                                💕 Recently used names
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {nameHistory.map((name, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setTo(name)}
                                        className="px-3 py-1 text-xs rounded-full bg-white border text-gray-700 hover:bg-pink-50 transition"
                                    >
                                        {name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                </p>

                <input
                    placeholder="Crush / Partner name 💕"
                    value={to}
                    onChange={e => setTo(e.target.value)}
                    className="mb-3 p-3 rounded border"
                />

                <button
                    onClick={generate}
                    className="bg-pink-500 text-white py-3 rounded-full font-bold hover:scale-105 transition"
                >
                    Generate Link 🔗
                </button>

                {link && (
                    <div className="mt-6 animate-pop">
                        <p className="text-sm mb-2 opacity-70">Your link:</p>

                        <input
                            value={link}
                            readOnly
                            className="w-full p-3 rounded bg-white text-sm"
                        />

                        <p className="mt-2 text-sm font-semibold text-pink-600">
                            {copied ? "Copied! 😈💖" : "Tap to copy 👆"}
                        </p>

                        <p className="mt-4 text-lg font-bold text-gray-700">
                            👉 Send this to your crush 😏
                        </p>
                    </div>
                )}

                {/* Creator credit */}
                <p className="mt-10 text-xs text-gray-500 opacity-70">
                    This site is created by{" "}
                    <span className="font-semibold text-gray-600">
    Abhinav Aryan
  </span>{" "}
                    — Full Stack Developer
                </p>

                <p className="mt-1 text-xs text-gray-500 opacity-70">
                    This is my portfolio, you can go through it 👉{" "}
                    <a
                        href="https://abhinav-portfollio.netlify.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-pink-600 hover:underline"
                    >
                        Visit
                    </a>
                </p>

            </div>

            {/* RIGHT (LIVE PREVIEW) */}
            <div className="relative overflow-hidden">
                <Valentine preview to={to || "Your Crush"} from={from} />
            </div>

        </div>
    );
}
