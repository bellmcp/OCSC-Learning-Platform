import { AnnouncementItemProps } from "./components/AnnouncementItem/types"
import { coursesDataType } from '../courses/types'
import { curriculumDataType } from '../curriculum/types'

export interface CourseModuleProps {
    announcements: AnnouncementItemProps[];
    courses: coursesDataType[];
    curriculum: curriculumDataType[];
}