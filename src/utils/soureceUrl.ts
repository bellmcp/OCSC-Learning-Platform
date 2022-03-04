export function generateContentSourceUrl(isMobile: boolean, url: string) {
  if (isMobile) {
    if (url?.includes('.mp4')) return url?.replace('.mp4', '-480.mp4')
    else if (url?.includes('.MP4')) return url?.replace('.MP4', '-480.MP4')
    else return url
  } else {
    return url
  }
}
