export default function link(href: string) {
    return () => location.href = href;
}