<script setup lang="ts">
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Priorities, type Ticket } from '@/types/types.ts'
import { Label } from '@/components/ui/label'
import z from 'zod'
import { useForm } from '@tanstack/vue-form'
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { invertPriorityFromString } from '@/scripts/utils.ts'
import PersonnelFilterDemo from '@/components/personnel/PersonnelFilterDemo.vue'
import { Button } from '@/components/ui/button'

const emit = defineEmits(['save', 'cancel'])

const props = defineProps<{
  ticket: Ticket
}>()

const priorityTypeLabels = ['None', 'Low', 'Medium', 'High', 'Highest']

const priorityTypeOptions = Object.values(Priorities)
  .filter((v): v is number => typeof v === 'number')
  .map((value) => ({
    label: priorityTypeLabels[value],
    value,
  }))

const formSchema = z.object({
  priority: z.number(),
})

const form = useForm({
  defaultValues: {
    priority: invertPriorityFromString(props.ticket.priority),
  },
  validators: {
    onSubmit: formSchema,
  },
  onSubmit: async ({ value }) => {
    emit('save', value.priority)
  },
})

function isInvalid(field: any) {
  return field.state.meta.isTouched && !field.state.meta.isValid
}
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <slot />
    </DialogTrigger>
    <DialogContent>
      <DialogTitle> Edit Ticket </DialogTitle>
      <DialogDescription>{{ props.ticket.id }}</DialogDescription>
      <div>
        <Label>Request Type: {{ props.ticket.request_type }}</Label>
        <Label>Submitted: {{ props.ticket.date }}</Label>
        <Label>Submitted by: {{ props.ticket.name }}</Label>
        <div>
          <Label>Additional Information</Label>
          <Label>Email: {{ props.ticket.email }}</Label>
          <Label>Office: {{ props.ticket.office }}</Label>
        </div>
      </div>
      <div>
        <Label>Problem details:</Label>
        <Label>{{ props.ticket.details }}</Label>
      </div>
      <form id="form-edit-ticket" @submit="form.handleSubmit">
        <FieldGroup>
          <form.Field name="priority">
            <template #default="{ field }">
              <Field :data-invalid="isInvalid(field)">
                <FieldContent>
                  <FieldLabel :for="field.name"> Priority </FieldLabel>
                  <FieldError v-if="isInvalid(field)" :errors="field.state.meta.errors" />
                </FieldContent>
                <Select
                  :name="field.name"
                  :model-value="field.state.value"
                  @update:model-value="field.handleChange"
                >
                  <SelectTrigger :aria-invalid="isInvalid(field)" class="grow">
                    <SelectValue placeholder="Assign a priority" />
                  </SelectTrigger>
                  <SelectContent position="item-aligned">
                    <SelectItem
                      v-for="type in priorityTypeOptions"
                      :key="type.value"
                      :value="type.value"
                    >
                      {{ type.label }}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </template>
          </form.Field>
          <PersonnelFilterDemo/>
        </FieldGroup>
        <Button type="submit">Save</Button>
      </form>
    </DialogContent>
  </Dialog>
</template>

<style scoped></style>
