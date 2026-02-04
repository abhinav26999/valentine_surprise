export function getToName() {
    if (typeof window === "undefined") return "My Love";

    // priority: localStorage
    const stored = localStorage.getItem("last_to_name");
    return stored || "My Love";
}
