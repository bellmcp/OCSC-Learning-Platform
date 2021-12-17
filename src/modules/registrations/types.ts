export interface MyCurriculumProps {
  id: number;
  userId: string;
  curriculumId: number;
  registrationDate: string;
  satisfactionScore?: number;
  isCompleted: boolean;
  completeDate?: string;
  code: string;
  name: string;
  learningObjective: string;
  learningTopic: string;
  targetGroup: string;
  assessment: string;
  thumbnail: string;
  localDateTime: string[];
}

export interface MyCourseProps {
  id: number;
  userId: string;
  curriculumRegistrationId: number;
  courseRoundId: number;
  courseRoundName: string;
  courseStart: string;
  courseEnd: string;
  registrationDate: string;
  satisfactionScore: number;
  isCompleted: boolean;
  completeDate?: string;
  courseId: number;
  code: string;
  name: string;
  categoryId: number;
  learningObjective: string;
  learningTopic: string;
  targetGroup: string;
  assessment: string;
  thumbnail: string;
  seqFlow: boolean;
  localDateTime: string[];
  showNumber?: boolean;
  index?: number;
}
