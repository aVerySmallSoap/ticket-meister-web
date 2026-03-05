<script setup lang="ts">
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Priorities, Status, type Ticket } from '@/types/types.ts'
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
import { ref } from 'vue'
import { invertPriorityFromString } from '@/scripts/utils.ts'
import PersonnelFilterDemo from '@/components/personnel/PersonnelFilterDemo.vue'
import { Button } from '@/components/ui/button'

const emit = defineEmits(['save', 'cancel'])

const isOpen = ref(false)
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

const statusOptions = Object.values(Status)
  .filter((v): v is number => typeof v === 'number')
  .map((value) => ({
    label: Status[value],
    value,
  }))

const formSchema = z.object({
  priority: z.number(),
  personnel: z.array(z.uuidv4()),
  status: z.number(),
})

const form = useForm({
  defaultValues: {
    priority: invertPriorityFromString(props.ticket.priority),
    personnel: props.ticket.personnel,
    status: props.ticket.status,
  },
  validators: {
    onSubmit: formSchema,
  },
  onSubmit: async ({ value }) => {
    emit('save', value)
    isOpen.value = false
  },
})

function isInvalid(field: any) {
  return field.state.meta.isTouched && !field.state.meta.isValid
}
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger as-child>
      <slot />
    </DialogTrigger>
    <DialogContent id="dialog-edit-ticket">
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
      <form id="form-edit-ticket" @submit.prevent="form.handleSubmit" class="grid gap-4">
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

          <form.Field name="status">
            <template #default="{ field }">
              <Field :data-invalid="isInvalid(field)">
                <FieldContent>
                  <FieldLabel :for="field.name"> Status </FieldLabel>
                  <FieldError v-if="isInvalid(field)" :errors="field.state.meta.errors" />
                </FieldContent>
                <Select
                  :name="field.name"
                  :model-value="field.state.value"
                  @update:model-value="field.handleChange"
                >
                  <SelectTrigger>
                    <SelectValue/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      v-for="option in statusOptions"
                      :key="option.value"
                      :value="option.value"
                    >
                      {{ option.label }}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </template>
          </form.Field>
        </FieldGroup>
        <FieldGroup>
          <form.Field name="personnel">
            <template #default="{ field }">
              <PersonnelFilterDemo
                :model-value="field.state.value"
                @update:model-value="field.handleChange"
              />
            </template>
          </form.Field>
        </FieldGroup>
        <div class="">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
</template>

<style scoped></style>
