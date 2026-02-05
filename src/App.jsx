import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Valentine from "./pages/Valentine";
import ValentineWeek from "./pages/valentine-week.jsx";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/v/:code" element={<Valentine />} />
                <Route path="/vw/:code" element={<ValentineWeek />} />

                {/* Safety redirect */}
                <Route path="/valentine-week" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}
