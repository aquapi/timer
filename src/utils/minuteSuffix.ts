export default function minuteSuffix(duration: number) {
    return duration + (duration > 1 ? " minutes" : " minute");
}