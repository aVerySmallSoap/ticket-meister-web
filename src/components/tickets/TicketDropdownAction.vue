<script setup lang="ts">
import { MoreHorizontal } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { type Ticket } from '@/types/types.ts'
import { invertRequestType } from '@/scripts/utils.ts'
import TicketEditCard from '@/components/tickets/TicketEditCard.vue'
import { toast } from 'vue-sonner'

const props = defineProps<{
  ticket: Ticket
}>()

function copy(id: string) {
  navigator.clipboard.writeText(id)
}

function applyEdit(priority: number) {
  const copy: Ticket = props.ticket
  copy.priority = priority
  copy.request_type = invertRequestType(copy.request_type)
  console.log(copy)
  fetch(`http://localhost:8000/tickets/${copy.id}`, {
    method: 'PUT',
    body: JSON.stringify(copy),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    console.log(response.json())
    if (response.ok) {
      toast.success('Ticket updated successfully.')
    }
  })
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="w-8 h-8 p-0">
        <span class="sr-only">Open menu</span>
        <MoreHorizontal class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="copy(ticket.id)"> Copy ID </DropdownMenuItem>
      <TicketEditCard :ticket="ticket" @save="applyEdit">
        <DropdownMenuItem @select.prevent>Edit Ticket</DropdownMenuItem>
      </TicketEditCard>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
