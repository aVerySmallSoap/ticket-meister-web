// This file should contain functions related to API calls on the backend

import type { Ticket } from '@/types/types.ts'
import { invertRequestType, stringifyPersonnel } from '@/scripts/utils.ts'
import { toast } from 'vue-sonner'

export async function fetchPersonnel() {
  const response = await fetch(`http://localhost:8000/personnel/?offset=0&limit=100`)
  return await response.json()
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
