<script setup lang="ts">
import { ticket_columns } from '@/components/tickets/ticket_columns.ts'
import { type Ticket } from '@/types/types.ts'
import TicketTable from '@/components/tickets/TicketTable.vue'
import { fetchTickets, personnelToArray } from '@/scripts/utils.ts';
import { onMounted, ref } from 'vue'
import { usePersonnelStore } from '@/stores/personnel.ts'
import { Skeleton } from '@/components/ui/skeleton'

// TODO: Fetch list of personnel and store them in pinia store to persist in memory. Also load and pass it on a table.

const personnelStore = usePersonnelStore()
const data = ref<Ticket[]>([])

async function refetch(){
  data.value = await fetchTickets()
}

function morph(tickets: Ticket[]): Ticket[] {
  if (tickets.length == 0) return []
  if (typeof tickets[0].personnel === 'string'){
    return tickets.map((ticket: Ticket) => ({
      ...ticket,
      personnel: personnelStore.getList(personnelToArray(ticket.personnel))
    }))
  }
  if (typeof tickets.pop()?.personnel === typeof Array<string> ){
    return tickets.map((ticket: Ticket) => ({
      ...ticket,
      personnel: personnelStore.getList(ticket.personnel)
    }))
  }
  return tickets
}

onMounted(async () => {
  const res = await fetchTickets()
  data.value = res
  if (personnelStore.list.length == 0){
    await personnelStore.getPersonnel()
  }
  morph(res)
})
</script>

<template>
  <template v-if="personnelStore.isLoading">
    <Skeleton />
  </template>
  <template v-else>
    <TicketTable
      :columns="ticket_columns"
      :data="data"
      @refresh="refetch"
    />
  </template>
</template>

<style scoped></style>
