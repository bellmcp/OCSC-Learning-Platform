interface InstructorType {
    name: string;
    description: string;
    image: string;
}

interface CourseRoundType {
    id: number;
    duration: string;
    unit: string;
    target: string;
    goal: string;
    platform: string;
}

export interface CourseItemProps {
    id: number;
    title: string;
    image: string;
    genre: string;
    instructor?: InstructorType;
    round?: CourseRoundType;
    detail: string;
    fineprint?: string;
    objective?: string;
    criteria?: string;
    note?: string;
    availableSeat?: number;
    totalSeat?: number;
    isCurriculum?: boolean;
}
