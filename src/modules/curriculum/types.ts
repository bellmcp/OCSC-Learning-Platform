import { CourseItemProps } from "../home/components/CourseItem/types"

export interface CurriculumDataType {
    id: number,
    name: string,
    curricula: CourseItemProps[],
}

export interface CurriculumModuleProps {
    curriculum: CurriculumDataType[],
}