// This file should contain functions related to API calls on the backend

import type { Personnel, Ticket } from '@/types/types.ts'
import { formatPersonnel, formatTickets, invertRequestType, stringifyPersonnel } from '@/scripts/utils.ts'
import { toast } from 'vue-sonner'
import api from '@/lib/api.ts'

export async function fetchPersonnel() {
  const response = await api.get('/users/?offset=0&limit=100')
  const personnel = await response.data
  return formatPersonnel(personnel)
}


export async function fetchTickets() {
  const response = await api.get('/tickets/?offset=0&limit=100')
  const tickets = await response.data
  return formatTickets(tickets)
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
  copy.status = changes.status

  const response = await api.put(`/tickets/${copy.id}`, copy, {
    headers: {
      'Content-Type': 'application/json',
    }
  })
  if (response.status == 200){
    toast.success('Ticket updated successfully.')
  }
}
