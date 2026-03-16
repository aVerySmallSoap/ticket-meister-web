import { type MappedStatus, type Personnel, Priorities, RequestType, Status, type Ticket } from '@/types/types.ts'

export function priorityToString(k: number): string {
  switch (k) {
    case 1:
      return 'Low'
    case 2:
      return 'Medium'
    case 3:
      return 'High'
    case 4:
      return 'Highest'
    default:
      return 'None'
  }
}

export function invertPriorityFromString(priority: string): number {
  switch (priority.toLowerCase()) {
    case 'low':
      return 1
    case 'medium':
      return 2
    case 'high':
      return 3
    case 'urgent':
      return 4
    default:
      return 0
  }
}

export function requestTypeToString(k: number): string {
  switch (k) {
    case 0:
      return 'Hardware Repairs and Configuration'
    case 1:
      return 'Network/Internet Services'
    case 2:
      return 'Data Services'
    case 3:
      return 'System Services'
    case 4:
      return 'Request for System Development'
    default:
      return 'Others'
  }
}

// might be deprecated
export function invertRequestType(value: RequestType): RequestType {
  const index = Object.values(RequestType).indexOf(value)
  return index as RequestType
}


// -- Formatting and Mapping to types and other stuff --

export function mapStatus(statusCode: number): MappedStatus {
  return {
    code: statusCode,
    name: Status[statusCode],
  } as MappedStatus
}

export function formatTickets(tickets: object) {
  const format_options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }
  return (tickets as any[]).map((t) => ({
    ...t,
    date: new Date(t.date).toLocaleDateString('en-US', format_options),
    priority: Priorities[t.priority],
    request_type: RequestType[t.request_type],
    personnel: t.personnel ? t.personnel : 'None',
  })) as Ticket[]
}

export function formatPersonnel(personnel: object){
  return (personnel as any[]).map( ({full_name, ...rest}) => ({
    ...rest,
    fullName: full_name,
  }) ) as Personnel[]
}

// SQLite specific functions i.e, it doesn't support array like objects
export function stringifyPersonnel(arr: string[]): string | null {
  if (arr.length == 0) return null
  let stringified = ''
  const length = arr.length
  for (let i = 0; i < length; i++) {
    if (i == length - 1) {
      stringified += arr[i]
      break
    }
    stringified += `${arr[i]},`
  }
  return stringified
}

//temporary fix for sqlite since it does not support array like objects on its database
export function personnelToArray(arr: string): string[] {
  if (arr == null || arr.length == 0 || arr == '' ) return []
  return arr.split(',')
}
