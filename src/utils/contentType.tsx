import React from 'react'
import {
  PlayCircleFilled as VideoIcon,
  MenuBook as ReadIcon,
  LibraryBooks as QuizIcon,
  ThumbUp as SurveyIcon,
  Language as FileIcon,
} from '@material-ui/icons'

export function getContentType(url: string) {
  const lowerCaseUrl = url?.toLowerCase()
  if (lowerCaseUrl === null || lowerCaseUrl === undefined) {
    return 'unknown'
  }
  if (lowerCaseUrl.includes('.mp4')) {
    return 'video'
  } else if (lowerCaseUrl.includes('.pdf')) {
    return 'pdf'
  } else if (lowerCaseUrl.includes('.htm') || lowerCaseUrl.includes('.html')) {
    return 'iframe'
  } else if (
    lowerCaseUrl.includes('youtube') ||
    lowerCaseUrl.includes('youtu.be') ||
    lowerCaseUrl.includes('vimeo')
  ) {
    return 'video'
  } else {
    return 'unknown'
  }
}

export function getContentTypeTextDebug(url: string) {
  const lowerCaseUrl = url?.toLowerCase()
  if (lowerCaseUrl === null || lowerCaseUrl === undefined) {
    return 'ไม่ทราบชนิดเนื้อหา'
  }
  if (lowerCaseUrl.includes('.mp4')) {
    return 'วิดีโอ MP4'
  } else if (lowerCaseUrl.includes('.pdf')) {
    return 'เนื้อหา PDF'
  } else if (lowerCaseUrl.includes('.htm') || lowerCaseUrl.includes('.html')) {
    return 'เนื้อหา HTML'
  } else if (
    lowerCaseUrl.includes('youtube') ||
    lowerCaseUrl.includes('youtu.be')
  ) {
    return 'วิดีโอ YouTube'
  } else if (lowerCaseUrl.includes('vimeo')) {
    return 'วิดีโอ Vimeo'
  } else {
    return 'ไม่ทราบชนิดเนื้อหา'
  }
}

export function getContentTypeText(type: string) {
  switch (type) {
    case 'video':
      return 'วิดีโอ'
    case 'youtube':
      return 'วิดีโอ'
    case 'pdf':
      return 'เนื้อหา'
    case 'iframe':
      return 'เนื้อหา'
    default:
      return ''
  }
}

export function getContentTypeIcon(type: string, subType: string) {
  switch (type) {
    case 'c':
      if (subType === 'video') return <VideoIcon />
      else return <ReadIcon />
    case 't':
      return <QuizIcon />
    case 'e':
      return <SurveyIcon />
    default:
      return <FileIcon />
  }
}

export function getContentTypeTitle(type: string, subType: string) {
  switch (type) {
    case 'c':
      if (subType === 'video') return 'วิดีโอ'
      else return 'เนื้อหา'
    case 't':
      return 'แบบทดสอบ'
    case 'e':
      return 'แบบประเมิน'
    default:
      return 'ไม่มีชื่อ'
  }
}
