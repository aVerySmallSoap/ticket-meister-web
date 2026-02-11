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

export enum RequestType {
  hardware_repairs_and_configuration,
  network_or_internet_services,
  data_services,
  system_services,
  request_for_system_development,
  others,
}
