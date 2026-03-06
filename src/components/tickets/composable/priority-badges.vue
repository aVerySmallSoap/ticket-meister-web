<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { computed } from 'vue'
import { Priorities } from '@/types/types.ts'

const props = defineProps<{
  priority: string
}>()

const checkVariant = computed(() => {
  return Priorities[props.priority] == 0 ? 'outline' : 'default'
})

const colors = computed(() => {
  switch (Priorities[props.priority]) {
    case 1:
      return 'bg-[#F9C74F]'
    case 2:
      return 'bg-[#F8961E]'
    case 3:
      return 'bg-[#F3722C]'
    case 4:
      return 'bg-[#F94144]'
    default:
      return ''
  }
})
</script>

<template>
  <Badge :class="colors" :variant="checkVariant">
    {{ props.priority }}
  </Badge>
</template>

<style scoped></style>
