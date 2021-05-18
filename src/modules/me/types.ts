export interface CurriculumCertificateProps {
  id: number;
  curriculumid: string;
  userid: string;
  title: string;
  firstname: string;
  lastname: string;
  startdate: string;
  enddate: string;
  pass: boolean;
  note?: string;
  hour: number;
  satisfactionscore?: number;
  createdate: string;
  approved: number;
  curriculum: string;
  platform: string;
}

export interface CourseCertificateProps {
  id: number;
  courseid: string;
  userid: string;
  title: string;
  firstname: string;
  lastname: string;
  startdate: string;
  enddate: string;
  pass: boolean;
  note?: string;
  hour: number;
  satisfactionscore?: number;
  createdate: string;
  approved: number;
  course: string;
  platform: string;
}
