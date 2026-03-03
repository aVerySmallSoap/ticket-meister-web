<script setup lang="ts" generic="TData, TValue">
import {
  type ColumnDef,
  FlexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  useVueTable,
  type ColumnFiltersState,
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
import FacetFilter from '@/components/filters/facet-filter.vue'
import DateFilter from "@/components/filters/date-filter.vue";

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
const globalFilter = ref()

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
  globalFilterFn: 'includesString',
  state: {
    get rowSelection() {
      return rowSelection.value
    },
    get columnFilters() {
      return columnFilters.value
    },
    get globalFilter() {
      return globalFilter.value
    },
  },
  meta: {
    emitRowAction: (payload: { type: string; row: TData }) => emit('row-action', payload),
    requestRefresh: () => emit('refresh'),
  },
  onGlobalFilterChange: (updater) => {
    globalFilter.value = typeof updater === 'function' ? updater(globalFilter.value) : updater;
  },
})
</script>

<template>
  <div class="min-w-full w-full">
    <div class="flex items-center py-4 gap-2">
      <Input
        class="max-w-sm"
        placeholder="Search..."
        @update:model-value="(e) => table.setGlobalFilter(String(e))"
      />
      <FacetFilter
        :model-value="table.getColumn('priority')?._getFacetedUniqueValues()"
        @update:model-value="table.getColumn('priority')?.setFilterValue($event)"
      >
        Priority
      </FacetFilter>
      <FacetFilter
        :model-value="table.getColumn('request_type')?._getFacetedUniqueValues()"
        @update:model-value="table.getColumn('request_type')?.setFilterValue($event)"
      >
        Request Type
      </FacetFilter>
      <DateFilter
      />
    </div>
    <Table class="w-full">
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
            <TableCell :colspan="columns.length" class="h-24 text-center">
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
