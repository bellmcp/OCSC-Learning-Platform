import { CoursesDataType } from '../courses/types'
import { CurriculumDataType } from '../curriculum/types'

export interface CourseModuleProps {
    courses: CoursesDataType[];
    curriculum: CurriculumDataType[];
}