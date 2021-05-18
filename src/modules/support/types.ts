export interface SupportProps {
  id: number;
  userId: string;
  subject: string;
  message: string;
  contact: string;
  attachFile?: string;
  createDate: string;
  replyMessage?: string;
  replyDate?: string;
  isAcknowledged: boolean;
}
