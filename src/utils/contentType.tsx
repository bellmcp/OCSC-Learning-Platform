import React from "react";
import {
  PlayCircleFilled as VideoIcon,
  MenuBook as ReadIcon,
  LibraryBooks as QuizIcon,
  ThumbUp as SurveyIcon,
  Language as FileIcon,
} from "@material-ui/icons";

export function getContentType(url: string) {
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

export function getContentTypeText(type: string) {
  switch (type) {
    case "video":
      return "วิดีโอ";
    case "youtube":
      return "วิดีโอ";
    case "pdf":
      return "เนื้อหา";
    case "iframe":
      return "เนื้อหา";
    default:
      return "";
  }
}

export function getContentTypeIcon(type: string, subType: string) {
  switch (type) {
    case "c":
      if (subType === "video") return <VideoIcon />;
      else return <ReadIcon />;
    case "t":
      return <QuizIcon />;
    case "e":
      return <SurveyIcon />;
    default:
      return <FileIcon />;
  }
}
