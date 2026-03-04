<script setup lang="ts">
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Check, PlusIcon } from 'lucide-vue-next'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { computed, onMounted, ref, watch } from 'vue'
import { Separator } from '@/components/ui/separator'

const props = defineProps<{
  modelValue?: Map<any, number>
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
}>()

const selected = ref<string[]>([])
const tags = ref()
const selectedFacets = computed(() => selected.value)
watch(selectedFacets, (ids) => {
  emit('update:modelValue', ids)
})

function isSelected(tag: string) {
  return selected.value.some((p) => p === tag)
}

function toggle(tag: string) {
  if (isSelected(tag)) {
    selected.value = selected.value.filter((p) => p !== tag)
  } else {
    selected.value = [...selected.value, tag]
  }
}

function clearAll() {
  selected.value = []
}

watch(
  () => props.modelValue,
  (newVal) => {
    tags.value = newVal
  },
)

onMounted(() => {
  tags.value = props.modelValue
})
</script>

<template>
  <Popover>
    <PopoverTrigger>
      <Button variant="outline" class="border-dashed">
        <span>Personnel</span>
        <PlusIcon />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="p-0">
      <Command>
        <CommandInput placeholder="Search for a tag" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Tags">
            <CommandItem
              v-for="[tag, count] in tags"
              :key="count"
              :value="tag"
              @select="toggle(tag)"
            >
              <div class="flex items-center gap-2 grow">
                <div
                  class="flex h-4 w-4 items-center justify-center rounded-sm border border-primary shrink-0"
                  :class="isSelected(tag) ? 'bg-primary text-primary-foreground' : 'opacity-50'"
                >
                  <Check v-if="isSelected(tag)" class="w-3 h-3" />
                </div>
                <span class="text-sm">{{ tag }}</span>
                <span class="ml-auto! text-xs text-muted-foreground">{{ count }}</span>
              </div>
            </CommandItem>
          </CommandGroup>
          <template v-if="selected.length">
            <Separator />
            <CommandGroup>
              <CommandItem
                value="clear"
                class="justify-center text-center text-sm text-muted-foreground"
                @select="clearAll"
              >
                Clear selection
              </CommandItem>
            </CommandGroup>
          </template>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
