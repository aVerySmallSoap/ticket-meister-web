<script setup lang="ts">
import { useForm } from '@tanstack/vue-form'
import { toast } from 'vue-sonner'
import { z } from 'zod'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { RequestType } from '@/types/types.ts'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

// Convert the RequestType enum to its array form i.e, [0,1,2,3...]
const requestTypes: RequestType[] = Object.values(RequestType).filter(
  (value) => typeof value === 'number',
) as RequestType[]

const formSchema = z.object({
  name: z.string(),
  email: z.email(),
  office: z.string(),
  request_type: z.enum(RequestType),
  details: z.string().optional(),
})

const form = useForm({
  defaultValues: {
    name: '',
    email: '',
    office: '',
    request_type: RequestType.hardware_repairs_and_configuration,
    details: '',
  },
  validators: {
    onSubmit: formSchema,
  },
  onSubmit: async ({ value }) => {
    toast.success('form submitted')
    console.log(value)
  },
})

function isInvalid(field: any) {
  return field.state.meta.isTouched && !field.state.meta.isValid
}
</script>

<template>
  <form id="form-ticket" @submit.prevent="form.handleSubmit">
    <FieldGroup>
      <form.Field name="name">
        <template #default="{ field }">
          <Field :data-invalid="isInvalid(field)">
            <FieldContent>
              <FieldLabel :for="field.name"> Name </FieldLabel>
              <FieldError v-if="isInvalid(field)" :errors="field.state.meta.errors" />
            </FieldContent>
            <Input
              :id="field.name"
              :name="field.name"
              :model-value="field.state.value"
              :aria-invalid="isInvalid(field)"
              placeholder="John Doe"
              @blur="field.handleBlur"
              @input="field.handleChange($event.target.value)"
            />
          </Field>
        </template>
      </form.Field>

      <form.Field name="email">
        <template #default="{ field }">
          <Field :data-invalid="isInvalid(field)">
            <FieldContent>
              <FieldLabel :for="field.name"> Email </FieldLabel>
              <FieldError v-if="isInvalid(field)" :errors="field.state.meta.errors" />
            </FieldContent>
            <Input
              :id="field.name"
              :name="field.name"
              :model-value="field.state.value"
              :aria-invalid="isInvalid(field)"
              placeholder="John Doe"
              @blur="field.handleBlur"
              @input="field.handleChange($event.target.value)"
            />
          </Field>
        </template>
      </form.Field>

      <form.Field name="office">
        <template #default="{ field }">
          <Field :data-invalid="isInvalid(field)">
            <FieldContent>
              <FieldLabel :for="field.name"> Office </FieldLabel>
              <FieldError v-if="isInvalid(field)" :errors="field.state.meta.errors" />
            </FieldContent>
            <Input
              :id="field.name"
              :name="field.name"
              :model-value="field.state.value"
              :aria-invalid="isInvalid(field)"
              placeholder="John Doe"
              @blur="field.handleBlur"
              @input="field.handleChange($event.target.value)"
            />
          </Field>
        </template>
      </form.Field>

      <form.Field name="request_type">
        <template #default="{ field }">
          <Field orientation="responsive" :aria-invalid="isInvalid(field)">
            <FieldContent>
              <FieldLabel :for="field.name"> Request Type </FieldLabel>
              <FieldError v-if="isInvalid(field)" :errors="field.state.meta.errors" />
            </FieldContent>
            <Select
              :name="field.name"
              :model-value="field.state.value"
              @update:model-value="field.handleChange"
            >
              <SelectTrigger :aria-invalid="isInvalid(field)">
                <SelectValue placeholder="Select the type of request" />
              </SelectTrigger>
              <SelectContent position="item-aligned">
                <SelectItem v-for="type in requestTypes" :key="type" :value="type">
                  {{ RequestType[type] }}
                </SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </template>
      </form.Field>

      <form.Field name="details">
        <template #default="{ field }">
          <Field orientation="responsive" :aria-invalid="isInvalid(field)">
            <FieldContent>
              <FieldLabel :for="field.name"> Details </FieldLabel>
              <FieldError v-if="isInvalid(field)" :errors="field.state.meta.errors" />
            </FieldContent>
            <Textarea
              :name="field.name"
              :model-value="field.state.value"
              :aria-invalid="isInvalid(field)"
              placeholder="Describe your problem..."
              @blur="field.handleBlur"
              @input="field.handleChange($event.target.value)"
            />
          </Field>
        </template>
      </form.Field>
    </FieldGroup>
    <Button type="submit" form="form-ticket"> Submit </Button>
  </form>
</template>

<style scoped></style>
