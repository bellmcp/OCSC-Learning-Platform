import { CourseItemProps } from "../home/components/CourseItem/types"

interface coursesData {
    id: number,
    name: string,
    courses: CourseItemProps[],
}

export interface CourseModuleProps {
    data: coursesData[],
}