<script setup lang="ts">
import { ticket_columns } from '@/components/tickets/ticket_columns.ts'
import { type Ticket } from '@/types/types.ts'
import TicketTable from '@/components/tickets/TicketTable.vue'
import { fetchTickets } from '@/scripts/utils.ts';
import { onMounted, ref } from 'vue'

const data = ref<Ticket[]>([])

async function refetch(){
  data.value = await fetchTickets()
}

onMounted(async () => {
  data.value = await fetchTickets()
})
</script>

<template>
  <TicketTable
    :columns="ticket_columns"
    :data="data"
    @refresh="refetch"
  />
</template>

<style scoped></style>
