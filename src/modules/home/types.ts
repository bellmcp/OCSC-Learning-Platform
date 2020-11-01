import { AnnouncementItemProps } from "./components/AnnouncementItem/types"
import { CourseItemProps } from "./components/CourseItem/types"

export interface CourseModuleProps {
    announcements: AnnouncementItemProps[];
    courses: CourseItemProps[];
    courses2: CourseItemProps[];
}