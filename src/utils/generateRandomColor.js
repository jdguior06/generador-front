export default function generateRandomColor() {
    const colors = [
        "#3b82f6",
        "#f59e0b",
        "#10b981",
        "#ef4444",
        "#8b5cf6",
        "#ec4899",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}
