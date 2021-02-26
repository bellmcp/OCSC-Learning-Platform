export default function contentType(url: string) {
  if (url === null || url === undefined) {
    return "unknown";
  }

  if (url.includes(".mp4")) {
    return "video";
  } else if (url.includes(".pdf")) {
    return "pdf";
  } else if (url.includes(".htm") || url.includes(".html")) {
    return "iframe";
  } else if (url.includes("youtube") || url.includes("youtu.be")) {
    return "video";
  } else {
    return "unknown";
  }
}
