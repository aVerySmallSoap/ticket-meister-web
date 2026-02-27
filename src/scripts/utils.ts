import { Priorities, RequestType, type Ticket } from '@/types/types.ts'

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
    case 'highest':
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

export function invertRequestType(value: RequestType): RequestType {
  const index = Object.values(RequestType).indexOf(value)
  return index as RequestType
}

function formatTickets(tickets: object) {
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

export async function fetchTickets() {
  const response = await fetch(`http://localhost:8000/tickets/?offset=0&limit=100`)
  const tickets = await response.json()
  return formatTickets(tickets)
}

// SQLite specific functions i.e, it doesn't support array like objects
export function stringifyPersonnel(arr: string[]): string | null {
  if (arr == null || arr.length == 0) return null
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
