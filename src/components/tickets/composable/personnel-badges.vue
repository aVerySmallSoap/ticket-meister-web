<script setup lang="ts">

// personnel is defined as a string for now since sqlite does not support arrays.
// Once the database is migrated to MariaDB, if it allows arrays, this should be string[].
import { Badge } from '@/components/ui/badge'
import { personnelToArray } from '@/scripts/utils.ts'

const props = defineProps<{
  personnel: string
}>()
const personnel = personnelToArray(props.personnel)

if (!(props.personnel == null || props.personnel.length == 0 || props.personnel == 'None')){
  const test = await fetch(`http://localhost:8000/personnel/${personnel}`)
  const items = await test.json()
  console.log("its not empty!", items)
}

</script>

<template>
  <Badge
    v-for="technician in props.personnel"
    :key="technician"
    variant="secondary">

  </Badge>
</template>

<style scoped></style>
