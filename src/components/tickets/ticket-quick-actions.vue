<script setup lang="ts">
import { ButtonGroup } from '@/components/ui/button-group'
import { Button } from '@/components/ui/button'
import { CopyIcon, SquarePenIcon } from 'lucide-vue-next'
import type { Ticket } from '@/types/types.ts'
import { toast } from 'vue-sonner'
import TicketEditCard from '@/components/tickets/TicketEditCard.vue'
import { applyTicketEdits } from '@/scripts/api.ts'

const emit = defineEmits<{
  (e: 'updated'): void
}>()

const props = defineProps<{
  ticket: Ticket
}>()

function copy() {
  navigator.clipboard.writeText(props.ticket.id)
  toast.success('Ticket ID copied to clipboard')
}

async function onSave(n: any) {
  await applyTicketEdits(props.ticket, n)
  emit('updated')
}
</script>

<template>
  <ButtonGroup>
    <Button variant="outline" size="icon-sm" @click="copy">
      <CopyIcon />
    </Button>

    <TicketEditCard :ticket="ticket" @save="onSave">
      <Button variant="outline" size="icon-sm">
        <SquarePenIcon />
      </Button>
    </TicketEditCard>
  </ButtonGroup>
</template>
