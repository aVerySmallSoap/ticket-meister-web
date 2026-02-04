export interface Ticket {
    email: string,
    name: string,
    office: string,
    details: string | null,
    priority: number,
    request_type: number,
    date: string,
    id: string,
    personnel: string | null
}
