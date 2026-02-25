<script setup lang="ts">
import { ButtonGroup } from '@/components/ui/button-group'
import { Button } from '@/components/ui/button'
import { CopyIcon, SquarePenIcon } from 'lucide-vue-next'
import type { Ticket } from '@/types/types.ts'
import { invertRequestType } from '@/scripts/utils.ts'
import { toast } from 'vue-sonner'
import TicketEditCard from '@/components/tickets/TicketEditCard.vue'

const props = defineProps<{
  ticket: Ticket
}>()

function copy() {
  navigator.clipboard.writeText(props.ticket.id)
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
  <ButtonGroup>
    <Button variant="outline" size="icon-sm" @click="copy">
      <CopyIcon />
    </Button>
    <TicketEditCard :ticket="props.ticket" @save="applyEdit">
      <Button variant="outline" size="icon-sm">
        <SquarePenIcon />
      </Button>
    </TicketEditCard>
  </ButtonGroup>
</template>

<style scoped></style>
