import { CourseItemProps } from "../home/components/CourseItem/types"

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