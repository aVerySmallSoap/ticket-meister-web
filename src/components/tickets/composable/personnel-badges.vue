<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { onMounted, ref, watch } from 'vue'

const props = defineProps<{
  personnel: string[]
}>()

// Always initialize as an array so v-for can render immediately (even if empty)
const personnelList = ref<string[]>([])

async function load() {
  personnelList.value = props.personnel
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
        :key="technician"
        variant="secondary"
      >
        {{ technician }}
      </Badge>
    </template>

    <span v-else class="text-xs text-muted-foreground">None</span>
  </div>
</template>
