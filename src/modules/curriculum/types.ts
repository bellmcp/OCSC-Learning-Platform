import { CourseItemProps } from "../home/components/CourseItem/types"


interface InstructorType {
    name: string;
    description: string;
    image: string;
}

interface CurriculumRoundType {
    id: number;
    duration: string;
    unit: string;
    target: string;
    goal: string;
    platform: string;
}

export interface CurriculumDataType {
    id: number,
    name: string,
    curricula: CourseItemProps[],
    title?: string;
    image?: string;
    genre?: string;
    instructor?: InstructorType;
    round?: CurriculumRoundType;
    detail?: string;
    fineprint?: string;
    objective?: string;
    criteria?: string;
    note?: string;
    availableSeat?: number;
    totalSeat?: number;
    isCurriculum?: boolean;
}

export interface CurriculumModuleProps {
    curriculum: CurriculumDataType[],
}