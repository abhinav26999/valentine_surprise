import { useState } from "react";
import { encodeData } from "../utils/encode";
import Valentine from "./Valentine";
import { Link } from "react-router-dom";

export default function Home() {
    const [to, setTo] = useState("");
    const [from, setFrom] = useState("");

    const [valentineLink, setValentineLink] = useState("");
    const [weekLink, setWeekLink] = useState("");

    const [copiedType, setCopiedType] = useState(null); // "valentine" | "week" | "both"

    /* =======================
       Generate links only
    ======================= */
    const generate = () => {
        if (!to.trim()) {
            alert("Enter partner name");
            return;
        }

        const code = encodeData({ to, from });

        setValentineLink(`${window.location.origin}/v/${code}`);
        setWeekLink(`${window.location.origin}/vw/${code}`);
    };

    /* =======================
       Copy helpers
    ======================= */
    const copy = async (text, type) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedType(type);
            setTimeout(() => setCopiedType(null), 1500);
        } catch {
            setCopiedType(null);
        }
    };

    const copyBoth = () => {
        const text = `💖 Valentine Proposal:\n${valentineLink}\n\n💝 Valentine Week Surprise:\n${weekLink}`;
        copy(text, "both");
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
                    className="mb-4 p-3 rounded border"
                />

                <button
                    onClick={generate}
                    className="bg-pink-500 text-white py-3 rounded-full font-bold hover:scale-105 transition"
                >
                    Generate Links 🔗
                </button>

                {/* ================= LINKS ================= */}
                {valentineLink && (
                    <div className="mt-8 space-y-6 animate-pop">

                        {/* Valentine Proposal */}
                        <div>
                            <p className="text-sm mb-2 font-semibold text-gray-600">
                                💖 Valentine Proposal Link
                            </p>

                            <div className="relative">
                                <input
                                    value={valentineLink}
                                    readOnly
                                    onClick={() => copy(valentineLink, "valentine")}
                                    className="w-full p-3 rounded border bg-white text-sm cursor-pointer"
                                />

                                {copiedType === "valentine" && (
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 font-bold animate-pop">
                    ✓ Copied
                  </span>
                                )}
                            </div>
                        </div>

                        {/* Valentine Week */}
                        <div>
                            <p className="text-sm mb-2 font-semibold text-gray-600">
                                💝 Valentine Week Surprise Link
                            </p>

                            <div className="relative">
                                <input
                                    value={weekLink}
                                    readOnly
                                    onClick={() => copy(weekLink, "week")}
                                    className="w-full p-3 rounded border bg-white text-sm cursor-pointer"
                                />

                                {copiedType === "week" && (
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 font-bold animate-pop">
                    ✓ Copied
                  </span>
                                )}
                            </div>

                            <p className="mt-2 text-sm font-semibold text-pink-700">
                                💝 This one hits emotionally… send carefully 😏
                            </p>

                            <Link
                                to={weekLink}
                                className="inline-block mt-2 text-sm font-bold text-red-500 hover:underline"
                            >
                                Open Valentine Week →
                            </Link>
                        </div>

                        {/* Copy Both */}
                        <button
                            onClick={copyBoth}
                            className="w-full mt-4 bg-green-500 text-white py-3 rounded-full font-bold hover:scale-105 transition"
                        >
                            {copiedType === "both" ? "✓ Both Links Copied" : "📤 Copy Both Links"}
                        </button>
                    </div>
                )}

                {/* Footer */}
                <p className="mt-10 text-xs text-gray-500 opacity-70">
                    This site is created by{" "}
                    <span className="font-semibold text-gray-600">
            Abhinav Aryan
          </span>{" "}
                    — Full Stack Developer
                </p>

                <p className="mt-1 text-xs text-gray-500 opacity-70">
                    This is my portfolio 👉{" "}
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
