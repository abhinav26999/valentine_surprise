import { useState } from "react";
import { encodeData } from "../utils/encode";
import Valentine from "./Valentine";

export default function Home() {
    const [to, setTo] = useState("");
    const [from, setFrom] = useState("");
    const [link, setLink] = useState("");
    const [copied, setCopied] = useState(false);

    const generate = async () => {
        if (!to.trim()) {
            alert("Enter partner name");
            return;
        }

        // ✅ Save name ONLY when generating
        localStorage.setItem("last_to_name", to);

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
    };

    return (
        <div className="min-h-screen grid md:grid-cols-2">
            {/* LEFT */}
            <div className="p-10 flex flex-col justify-center bg-pink-100">
                <h1 className="text-4xl font-extrabold mb-6">
                    Make a Viral Valentine 💖
                </h1>

                <input
                    placeholder="Crush / Partner name 💕"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
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

                {/* 💝 Valentine Week CTA */}
                <a
                    href="/valentine-week"
                    className="mt-8 inline-block text-center bg-red-500 text-white px-6 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition shadow-lg animate-pulse"
                >
                    💝 Open Valentine Week Surprise
                </a>

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
