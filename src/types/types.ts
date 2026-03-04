export interface Ticket {
  email: string,
  name: string,
  office: string,
  details: string | null,
  priority: number,
  request_type: RequestType,
  date: string,
  id: string,
  personnel: string | string[] | Personnel[],
  status: number,
}

export interface Personnel {
  id: string,
  name: string,
}

export interface PersonnelList {
  ids: string[]
}

export enum RequestType {
  "Hardware Repairs and Configuration",
  "Network or Internet Services",
  "Data Services",
  "System Services",
  "Request for System Services",
  "Others",
  "Equipment Repair Report"
}

export enum Status {
  "Pending",
  "IN Progress",
  "Completed",
  "Failed",
  "No Fix"
}

export interface MappedStatus {
  code: number
  name: string
}

export enum Priorities {
  None,
  Low,
  Medium,
  High,
  Highest
}
