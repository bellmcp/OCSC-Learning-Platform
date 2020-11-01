import { CourseItemProps } from "../home/components/CourseItem/types"

export interface coursesDataType {
    id: number,
    name: string,
    courses: CourseItemProps[],
}

export interface CourseModuleProps {
    data: coursesDataType[],
}