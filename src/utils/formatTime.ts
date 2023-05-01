function n(num: number) {
    return num < 10 ? "0" + num : num;
};

export default function formatTime(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    seconds -= hours * 3600;

    const minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;

    // Hour can only be 0, 1 or 2
    return `0${hours}:${n(minutes)}:${n(seconds)}`;
};