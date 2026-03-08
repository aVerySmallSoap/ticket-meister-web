<script setup lang="ts">
import type {Ticket} from "@/types/types.ts";
import {priorityToString, requestTypeToString} from "@/scripts/utils.ts";

defineProps<{
  tickets: Ticket[]
}>();
type TicketKey = keyof Ticket;
const ticketEntries = (t: Ticket) =>
  Object.entries(t) as [TicketKey, Ticket[TicketKey]][]
</script>

<template>
  <div v-for="item in tickets" :key="item.id">
    <div v-for="[k, v] of ticketEntries(item)" :key="k">
      <!-- We can assume that v is a number here since we type hint it as of type Ticket-->
      <div v-if="k === 'priority'">
        <span>{{k}}: {{priorityToString(v as number)}}</span>
      </div>
      <div v-else-if="k === 'request_type'">
        <span>{{k}}: {{requestTypeToString(v as number)}}</span>
      </div>
      <div v-else>
        <span>{{k}}: {{v}}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
