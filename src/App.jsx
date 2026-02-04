import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Valentine from "./pages/Valentine";
import ValentineWeek from "./pages/valentine-week.jsx";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/v/:code" element={<Valentine />} />

                {/* 💖 Valentine Week Page */}
                <Route path="/valentine-week" element={<ValentineWeek />} />
            </Routes>
        </BrowserRouter>
    );
}
