import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Valentine from "./pages/Valentine";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/v/:code" element={<Valentine />} />
            </Routes>
        </BrowserRouter>
    );
}
