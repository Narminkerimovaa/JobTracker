export type Status = 'sent' | 'interview' | 'offer' | 'rejected'

export interface Application {
    id: string,
    company: string,
    position: string,
    date: string,
    link?: string,
    status: Status,
    note?: string
}