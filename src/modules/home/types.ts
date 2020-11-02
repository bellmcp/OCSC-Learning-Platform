import { AnnouncementItemProps } from "./components/AnnouncementItem/types"
import { CoursesDataType } from '../courses/types'
import { CurriculumDataType } from '../curriculum/types'

export interface CourseModuleProps {
    announcements: AnnouncementItemProps[];
    courses: CoursesDataType[];
    curriculum: CurriculumDataType[];
}