<script setup lang="ts">
import { ticket_columns } from '@/components/tickets/ticket_columns.ts'
import { type Personnel, type Ticket } from '@/types/types.ts'
import TicketTable from '@/components/tickets/TicketTable.vue'
import { fetchTickets, personnelToArray } from '@/scripts/utils.ts'
import { onMounted, ref } from 'vue'
import { usePersonnelStore } from '@/stores/personnel.ts'
import { Skeleton } from '@/components/ui/skeleton'

// TODO: Fetch list of personnel and store them in pinia store to persist in memory. Also load and pass it on a table.

const personnelStore = usePersonnelStore()
const data = ref<Ticket[]>([])

async function refetch() {
  const res = await fetchTickets()
  data.value = morph(res)
}

//TODO: Tickets should not resolve to personnel name?
function resolve(ticket: Ticket): string[] {
  const temp: string[] = []
  let arr: Personnel[];
  if (typeof ticket.personnel == 'string') {
    arr = personnelStore.getList(personnelToArray(ticket.personnel))
  } else {
    arr = personnelStore.getList(ticket.personnel)
  }
  arr.forEach((item: Personnel) => temp.push(item.name))
  return temp
}

//TODO: change if DB supports arrays, if so, Tickets.personnel is always of type string[]
function morph(tickets: Ticket[]): Ticket[] {
  if (tickets.length == 0) return []
  let test: Ticket[] = []
  if (typeof tickets[0].personnel === 'string') {
    test = tickets.map((ticket: Ticket) => ({
      ...ticket,
      personnel: resolve(ticket),
    }))
  }
  if (typeof tickets.pop()?.personnel === typeof Array<string>) {
    test = tickets.map((ticket: Ticket) => ({
      ...ticket,
      personnel: resolve(ticket),
    }))
  }
  return test
}

onMounted(async () => {
  const res = await fetchTickets()
  if (personnelStore.list.length == 0) {
    await personnelStore.getPersonnel()
  }
  data.value = morph(res)
})
</script>

<template>
  <template v-if="personnelStore.isLoading">
    <Skeleton />
  </template>
  <template v-else>
    <TicketTable :columns="ticket_columns" :data="data" @refresh="refetch" />
  </template>
</template>

<style scoped></style>
