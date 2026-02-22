import { type Priorities, RequestType } from '@/types/types.ts'

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
