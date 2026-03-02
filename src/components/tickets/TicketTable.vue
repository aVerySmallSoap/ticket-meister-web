<script setup lang="ts" generic="TData, TValue">
import {
  type ColumnDef,
  FlexRender,
  ColumnFiltersState,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  useVueTable,
} from '@tanstack/vue-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ref } from 'vue'
import { valueUpdater } from '@/components/ui/table/utils.ts'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import TestFacet from '@/components/filters/test-facet.vue'

const props = defineProps<{
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}>()

const emit = defineEmits<{
  (e: 'row-action', payload: { type: string; row: TData[] }): void
  (e: 'refresh'): void
}>()

const rowSelection = ref({})
const columnFilters = ref<ColumnFiltersState>([])

const table = useVueTable({
  get data() {
    return props.data
  },
  get columns() {
    return props.columns
  },
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getFacetedRowModel: getFacetedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getFacetedUniqueValues: getFacetedUniqueValues(),
  onColumnFiltersChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnFilters),
  onRowSelectionChange: (updaterOrValue) => valueUpdater(updaterOrValue, rowSelection),
  state: {
    get rowSelection() {
      return rowSelection.value
    },
    get columnFilters() {
      return columnFilters.value
    },
  },
  meta: {
    emitRowAction: (payload: { type: string; row: TData }) => emit('row-action', payload),
    requestRefresh: () => emit('refresh'),
  },
})
</script>

<template>
  <div class="min-w-full max-w-full">
    <div class="flex items-center py-4 gap-2">
      <Input
        class="max-w-sm"
        placeholder="Filter emails..."
        :model-value="table.getColumn('email')?.getFilterValue() as string"
        @update:model-value="table.getColumn('email')?.setFilterValue($event)"
      />
      <TestFacet
        :model-value="table.getColumn('priority')?._getFacetedUniqueValues()"
        @update:model-value="table.getColumn('priority')?.setFilterValue($event)"
      />
    </div>
    <Table class="min-w-24!">
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
    <!-- Pagination Controls -->
    <div class="flex items-center justify-end py-4 space-x-2">
      <Button
        variant="outline"
        size="sm"
        :disabled="!table.getCanPreviousPage()"
        @click="table.previousPage()"
      >
        Previous
      </Button>
      <Button
        variant="outline"
        size="sm"
        :disabled="!table.getCanNextPage()"
        @click="table.nextPage()"
      >
        Next
      </Button>
    </div>
  </div>
</template>

<style scoped></style>
