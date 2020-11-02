import { CourseItemProps } from "../home/components/CourseItem/types"

export interface CoursesDataType {
    id: number,
    name: string,
    courses: CourseItemProps[],
}

export interface CourseModuleProps {
    courses: CoursesDataType[],
}