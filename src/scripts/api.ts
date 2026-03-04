// This file should contain functions related to API calls on the backend

import type { Personnel, Ticket } from '@/types/types.ts'
import { invertRequestType, personnelToArray, stringifyPersonnel } from '@/scripts/utils.ts'
import { toast } from 'vue-sonner'
import { type PersonnelList } from '@/types/types.ts'

export async function fetchPersonnel() {
  const response = await fetch(`http://localhost:8000/personnel/?offset=0&limit=100`)
  return await response.json() as Personnel[]
}

export async function fetchPersonnelList(list: string): Promise<Personnel[]> {
  if (!(list == null || list.length == 0 || list == 'None')){
    const personnel: PersonnelList = {
      ids: personnelToArray(list),
    }
    const test = await fetch(`http://localhost:8000/personnel/list`, {
      method: 'POST',
      body: JSON.stringify(personnel),
      headers: {
        "Content-Type": 'application/json',
      },
    })
    const temp = await test.json()
    return temp as Personnel[]
  }
  return []
}

// Calls with POST and PUT methods must accept either an object or any type.
// For POST requests, the parameter itself might be the object of a certain type.
// For PUT requests, the parameter itself will contain fields that are directly changed.
// Later, I may create specific types for objects these objects.

export async function applyTicketEdits(ticket: Ticket, changes: any){
  const copy: Ticket = ticket // copy the ticket if ever it itself is a prop
  copy.priority = changes.priority
  copy.request_type = invertRequestType(copy.request_type)
  copy.personnel = stringifyPersonnel(changes.personnel)
  fetch(`http://localhost:8000/tickets/${copy.id}`, {
    method: 'PUT',
    body: JSON.stringify(copy),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    if (response.ok) {
      toast.success('Ticket updated successfully.')
    }
  })
}
