<script setup lang="ts">
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { RangeCalendar } from '@/components/ui/range-calendar'
import { getLocalTimeZone, today } from '@internationalized/date'
import { Button } from '@/components/ui/button'
import { type Ref, ref} from 'vue'
import type { DateRange } from 'reka-ui'
import { Separator } from '@/components/ui/separator'

const emit = defineEmits<{
  (e: 'update:modelValue', value: DateRange): void
}>()

const selectedRange = ref<Date[]>()
const start = today(getLocalTimeZone())
const end = start.add({ days: 7 })
const dateRange = ref({
  start,
  end,
}) as Ref<DateRange>


function apply(e: DateRange) {
  //convert dates to local datetime
  if (e.start != undefined && e.end != undefined) {
    selectedRange.value = [e.start.toDate(), e.end.toDate()]
  }
  emit('update:modelValue', e)
}
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button>
        <div v-if="selectedRange">
          <span>{{selectedRange[0]}}</span>
          <separator />
          <span>{{selectedRange[1]}}</span>
        </div>
        <div v-else>
          Date
        </div>
      </Button>
    </PopoverTrigger>
    <PopoverContent>
      <RangeCalendar
        :model-value="dateRange"
        @update:model-value="apply"
        disable-days-outside-current-view
      />
    </PopoverContent>
  </Popover>
</template>

<style scoped></style>
