<script setup lang="ts">
import { ticket_columns } from '@/components/tickets/ticket_columns.ts'
import { type Ticket } from '@/types/types.ts'
import TicketTable from '@/components/tickets/TicketTable.vue'
import { fetchTickets } from '@/scripts/utils.ts';
import { onMounted, ref } from 'vue'
import { usePersonnelStore } from '@/stores/personnel.ts'

// TODO: Fetch list of personnel and store them in pinia store to persist in memory. Also load and pass it on a table.

const data = ref<Ticket[]>([])

async function refetch(){
  data.value = await fetchTickets()
}

onMounted(async () => {
  const personnelStore = usePersonnelStore()
  data.value = await fetchTickets()
  if (personnelStore.list.length == 0){
    await personnelStore.getPersonnel()
  }
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
