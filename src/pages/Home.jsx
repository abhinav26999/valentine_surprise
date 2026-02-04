import { useState } from "react";
import { encodeData } from "../utils/encode";
import Valentine from "./Valentine";

export default function Home() {
    const [to, setTo] = useState("");
    const [from, setFrom] = useState("");
    const [link, setLink] = useState("");

    const generate = () => {
        if (!to.trim()) return alert("Enter partner name");
        const code = encodeData({ to, from });
        setLink(`${window.location.origin}/v/${code}`);
    };

    return (
        <div className="min-h-screen grid md:grid-cols-2">

            {/* LEFT */}
            <div className="p-10 flex flex-col justify-center bg-pink-100">
                <h1 className="text-4xl font-extrabold mb-6">
                    Make a Viral Valentine 💖
                </h1>

                <input
                    placeholder="Partner name"
                    value={to}
                    onChange={e => setTo(e.target.value)}
                    className="mb-3 p-3 rounded border"
                />
                <button
                    onClick={generate}
                    className="bg-pink-500 text-white py-3 rounded-full font-bold"
                >
                    Generate Link 🔗
                </button>

                {link && (
                    <div className="mt-6">
                        <p className="text-sm mb-2">Your link:</p>
                        <input
                            value={link}
                            readOnly
                            className="w-full p-3 rounded bg-white"
                        />
                    </div>
                )}
            </div>

            {/* RIGHT (LIVE PREVIEW) */}
            <div className="relative overflow-hidden">
                <Valentine preview to={to || "Your Partner"} from={from} />
            </div>
        </div>
    );
}
