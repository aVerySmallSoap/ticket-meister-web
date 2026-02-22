<script setup lang="ts" generic="TData, TValue">
import { type ColumnDef, FlexRender, getCoreRowModel, useVueTable } from '@tanstack/vue-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ref } from 'vue'
import { valueUpdater } from '@/components/ui/table/utils.ts'
import { Button } from '@/components/ui/button'

const props = defineProps<{
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}>()

// define emits
defineEmits(['update:mark-all'])

const rowSelection = ref({})

const table = useVueTable({
  get data() {
    return props.data
  },
  get columns() {
    return props.columns
  },
  getCoreRowModel: getCoreRowModel(),
  onRowSelectionChange: updaterOrValue => valueUpdater(updaterOrValue, rowSelection),
  state: {
    get rowSelection() {return rowSelection.value}
  }
})

function getAssociatedData(): TData[] {
  const toBeUpdated: TData[] = []
  for (const row in rowSelection.value) {
    toBeUpdated.push(props.data[row])
  }
  return toBeUpdated
}

</script>

<template>
  <Button @click="$emit('update:mark-all', getAssociatedData())">Update
    Mark all as test
  </Button>
  <Table>
    <TableHeader>
      <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
        <TableHead v-for="header in headerGroup.headers" :key="header.id">
          <FlexRender
            v-if="!header.isPlaceholder"
            :render="header.column.columnDef.header"
            :props="header.getContext()"
          />
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <template v-if="table.getRowModel().rows?.length">
        <TableRow
          v-for="row in table.getRowModel().rows"
          :key="row.id"
          :data-state="row.getIsSelected() ? 'selected' : undefined"
        >
          <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
            <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
          </TableCell>
        </TableRow>
      </template>
      <template v-else>
        <TableRow>
          <TableCell :aria-colspan="columns.length" class="h-24 text-center">
            No results.
          </TableCell>
        </TableRow>
      </template>
    </TableBody>
  </Table>
</template>

<style scoped></style>
