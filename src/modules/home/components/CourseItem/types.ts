export interface CourseItemProps {
    id: number;
    title: string;
    image: string;
    genre: string;
    detail: string;
    availableSeat?: number;
    totalSeat?: number;
    isCurriculum?: boolean;
}