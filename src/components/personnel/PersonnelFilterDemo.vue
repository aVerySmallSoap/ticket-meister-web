<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { PlusCircle, X, Check } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Personnel } from '@/types/types.ts'

// make this reactive later
const personnelList = ref<Personnel[]>([])

async function fetchPersonnels() {
  const response = await fetch(`http://localhost:8000/personnel/?offset=0&limit=100`)
  return await response.json()
}

// const personnelList: Personnel[] = [
//   { id: 1, name: 'Romel Cadungon',  role: 'IT Technician',    avatar: 'RC' },
//   { id: 2, name: 'Angelo Mariano',  role: 'Systems Admin',    avatar: 'AM' },
//   { id: 3, name: 'Sofia Reyes',     role: 'Network Engineer', avatar: 'SR' },
//   { id: 4, name: 'Mark Dela Cruz',  role: 'Help Desk',        avatar: 'MD' },
//   { id: 5, name: 'Lena Santos',     role: 'IT Technician',    avatar: 'LS' },
//   { id: 6, name: 'Carlo Bautista',  role: 'Systems Admin',    avatar: 'CB' },
//   { id: 7, name: 'Rina Villanueva', role: 'Security Analyst', avatar: 'RV' },
//   { id: 8, name: 'James Ong',       role: 'Help Desk',        avatar: 'JO' },
// ]

const selected = ref<Personnel[]>([])

function isSelected(person: Personnel) {
  return selected.value.some((p) => p.id === person.id)
}

function toggle(person: Personnel) {
  if (isSelected(person)) {
    selected.value = selected.value.filter((p) => p.id !== person.id)
  } else {
    selected.value = [...selected.value, person]
  }
}

function remove(person: Personnel) {
  selected.value = selected.value.filter((p) => p.id !== person.id)
}

function clearAll() {
  selected.value = []
}

onMounted(async () => {
  personnelList.value = await fetchPersonnels()
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <Popover>
      <PopoverTrigger as-child>
        <Button variant="outline" class="h-9 border-dashed flex gap-2">
          <PlusCircle class="w-4 h-4" />
          Assign Personnel
          <template v-if="selected.length">
            <Separator orientation="vertical" class="h-4" />
            <Badge
              v-for="person in selected.slice(0, 2)"
              :key="person.id"
              variant="secondary"
              class="rounded-sm px-1 font-normal"
            >
              {{ person.name }}
            </Badge>
            <Badge
              v-if="selected.length > 2"
              variant="secondary"
              class="rounded-sm px-1 font-normal"
            >
              +{{ selected.length - 2 }} more
            </Badge>
          </template>
        </Button>
      </PopoverTrigger>
      <PopoverContent class="w-72 p-0" align="start">
        <Command>
          <CommandInput placeholder="Search personnel..." />
          <CommandList>
            <CommandEmpty>No personnel found.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                v-for="person in personnelList"
                :key="person.id"
                :value="person.name"
                @select="toggle(person)"
              >
                <div class="flex items-center gap-2 w-full">
                  <!-- Checkmark -->
                  <div
                    class="flex h-4 w-4 items-center justify-center rounded-sm border border-primary shrink-0"
                    :class="
                      isSelected(person) ? 'bg-primary text-primary-foreground' : 'opacity-50'
                    "
                  >
                    <Check v-if="isSelected(person)" class="w-3 h-3" />
                  </div>
                  <!-- Avatar -->
                  <div
                    class="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-[10px] font-semibold shrink-0"
                  >
<!--                    {{ person.avatar }}-->
                  </div>
                  <!-- Info -->
                  <div class="flex flex-col">
                    <span class="text-sm font-medium">{{ person.name }}</span>
<!--                    <span class="text-xs text-muted-foreground">{{ person.role }}</span>-->
                  </div>
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

    <!-- Selected badges -->
    <div v-if="selected.length" class="flex flex-wrap gap-2">
      <Badge
        v-for="person in selected"
        :key="person.id"
        variant="secondary"
        class="flex items-center gap-1 pr-1"
      >
        <div
          class="flex h-4 w-4 items-center justify-center rounded-full bg-muted text-[8px] font-bold"
        >
          {{ person.avatar }}
        </div>
        {{ person.name }}
        <button
          class="ml-1 rounded-full hover:bg-muted p-0.5 transition-colors"
          @click="remove(person)"
        >
          <X class="w-3 h-3" />
        </button>
      </Badge>
    </div>
  </div>
</template>
