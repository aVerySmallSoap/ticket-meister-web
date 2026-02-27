import { h } from 'vue';
import type { Ticket } from '@/types/types.ts'
import type { ColumnDef } from '@tanstack/vue-table'
import { toast } from 'vue-sonner'
import TicketQuickActions from '@/components/tickets/ticket-quick-actions.vue'
import { Checkbox } from '@/components/ui/checkbox'
import PriorityBadges from '@/components/tickets/composable/priority-badges.vue'
import PersonnelBadges from '@/components/tickets/composable/personnel-badges.vue'

export const ticket_columns: ColumnDef<Ticket>[] = [
  {
    id: 'select',
    header: ({ table }) => {
      return h(Checkbox, {
        modelValue: table.getIsAllPageRowsSelected(),
        'onUpdate:modelValue': (value: boolean) => table.toggleAllPageRowsSelected(value),
        ariaLabel: 'Select all',
      })
    },
    cell: ({ row }) =>
      h(Checkbox, {
        modelValue: row.getIsSelected(),
        'onUpdate:modelValue': (value: boolean) => row.toggleSelected(value),
        ariaLabel: 'Select row',
      }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: () => h('div', { class: 'text-left' }, 'ID'),
    cell: ({ row }) =>
      h(
        'div',
        {
          class: 'text-center max-w-24 truncate',
          onClick: () => {
            navigator.clipboard.writeText(row.getValue('id'))
            toast.success('ID copied to clipboard')
          },
        },
        row.getValue('id'),
      ),
  },
  {
    accessorKey: 'date',
    header: () => h('div', { class: 'text-left' }, 'Date'),
    cell: ({ row }) => h('div', { class: 'text-center' }, row.getValue('date')),
  },
  {
    accessorKey: 'request_type',
    header: () => h('div', { class: 'text-left' }, 'Request Type'),
    cell: ({ row }) => h('div', { class: 'text-left' }, row.getValue('request_type')),
  },
  {
    accessorKey: 'priority',
    header: () => h('div', { class: 'text-left' }, 'Priority'),
    cell: ({ row }) => {
      const priority = row.getValue('priority')
      return h('div', { class: 'text-center' }, h(PriorityBadges, { priority }));
    },
  },
  {
    accessorKey: 'personnel',
    header: () => h('div', { class: 'text-left' }, 'Personnel'),
    cell: ({ row }) => {
      const personnel = row.getValue('personnel')
      return h('div', { class: 'text-center'},
        h(PersonnelBadges, { personnel })
      )
    },
  },
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left' }, 'Name'),
    cell: ({ row }) => h('div', { class: 'text-center' }, row.getValue('name')),
  },
  {
    accessorKey: 'email',
    header: () => h('div', { class: 'text-left' }, 'Email'),
    cell: ({ row }) => h('div', { class: 'text-center' }, row.getValue('email')),
  },
  {
    id: 'actions',
    enableHiding: false,
    header: () => h('div', { class: 'text-center' }, 'Actions'),
    cell: ({ row, table }) => {
      return h('div', { class: 'relative' },
        h(TicketQuickActions, {
          ticket: row.original,
          onUpdated: () => {
            table.options.meta?.requestRefresh?.()
            table.options.meta?.emitRowAction?.({ type: 'updated', row: row.original})
          }
        }))
    },
  },
]
