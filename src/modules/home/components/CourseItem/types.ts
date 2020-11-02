interface InstructorType {
    name: string;
    description: string;
    image: string;
}

export interface CourseItemProps {
    id: number;
    title: string;
    image: string;
    genre: string;
    instructor?: InstructorType;
    detail: string;
    fineprint?: string;
    objective?: string;
    criteria?: string;
    note?: string;
    availableSeat?: number;
    totalSeat?: number;
    isCurriculum?: boolean;
}
