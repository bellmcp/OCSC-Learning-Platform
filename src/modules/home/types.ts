import { AnnouncementItemProps } from "./components/AnnouncementItem/types"
import { coursesDataType } from '../courses/types'

export interface CourseModuleProps {
    announcements: AnnouncementItemProps[];
    data: coursesDataType[];
}