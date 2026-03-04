<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { onMounted, ref, watch } from 'vue'
import type { Personnel } from '@/types/types.ts'

const props = defineProps<{
  // personnel: Promise<Personnel[]>
  personnel: any
}>()

// Always initialize as an array so v-for can render immediately (even if empty)
const personnelList = ref<Personnel[]>([])

async function load() {
  personnelList.value = await props.personnel
}

onMounted(load)

// If the table row changes and this component is reused, keep it in sync
watch(() => props.personnel, load)
</script>

<template>
  <div class="flex flex-wrap justify-center gap-1">
    <template v-if="personnelList.length">
      <Badge
        v-for="technician in personnelList"
        :key="technician.id"
        variant="secondary"
      >
        {{ technician.name }}
      </Badge>
    </template>

    <span v-else class="text-xs text-muted-foreground">None</span>
  </div>
</template>
