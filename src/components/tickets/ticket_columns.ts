import { h } from 'vue';
import type { Ticket } from '@/types/types.ts'
import type { ColumnDef } from '@tanstack/vue-table'
import { toast } from 'vue-sonner'
import TicketDropdownAction from '@/components/tickets/TicketDropdownAction.vue'

export const ticket_columns: ColumnDef<Ticket>[] = [
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
    accessorKey: 'priority',
    header: () => h('div', { class: 'text-left' }, 'Priority'),
    cell: ({ row }) => h('div', { class: 'text-center' }, row.getValue('priority')),
  },
  {
    accessorKey: 'request_type',
    header: () => h('div', { class: 'text-left' }, 'Request Type'),
    cell: ({ row }) => h('div', { class: 'text-center' }, row.getValue('request_type')),
  },
  {
    accessorKey: 'personnel',
    header: () => h('div', { class: 'text-left' }, 'Personnel'),
    cell: ({ row }) => h('div', { class: 'text-center' }, row.getValue('personnel')),
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
    cell: ({ row }) => {
      const ticket = row.original
      return h('div', { class: 'relative' }, h(TicketDropdownAction, { ticket }))
    },
  },
]
