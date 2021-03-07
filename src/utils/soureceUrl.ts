export function generateContentSourceUrl(isMobile: boolean, url: string) {
  const lowerCaseUrl = url?.toLowerCase();
  if (lowerCaseUrl === null || lowerCaseUrl === undefined) {
    return url;
  } else {
    if (lowerCaseUrl.includes("youtube") || lowerCaseUrl.includes("youtu.be")) {
      return url;
    } else if (isMobile) {
      return lowerCaseUrl?.replace(".mp4", "-480.mp4");
    } else {
      return lowerCaseUrl?.replace(".mp4", "-720.mp4");
    }
  }
}
