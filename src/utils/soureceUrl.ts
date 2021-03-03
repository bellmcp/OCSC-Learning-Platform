export function generateContentSourceUrl(isMobile: boolean, url: string) {
  const lowerCaseUrl = url?.toLowerCase();
  if (lowerCaseUrl === null || lowerCaseUrl === undefined) {
    return url;
  }
  if (lowerCaseUrl.includes("youtube") || lowerCaseUrl.includes("youtu.be")) {
    return url;
  }
  switch (isMobile) {
    case true:
      return lowerCaseUrl?.replace(".mp4", "-480.mp4");
    case false:
      return lowerCaseUrl?.replace(".mp4", "-720.mp4");
    default:
      return url;
  }
}
