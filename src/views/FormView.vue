<script setup lang="ts">
import { useForm } from '@tanstack/vue-form'
import { toast } from 'vue-sonner'
import { z } from 'zod'
import {
  Field,
  FieldContent,
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

// String definitions of RequestType enums, this is used for labeling the Select element
const requestTypeLabels = [
  'Hardware Repairs and Configuration',
  'Network or Internet Services',
  'Data Services',
  'System Services',
  'Request for System Development',
  'Others',
]

// Convert the RequestType enum to its JSON or dict like counter-part i.e., { "key": value }
const requestTypeOptions = Object.values(RequestType)
  .filter((v): v is number => typeof v === 'number')
  .map((value) => ({
    label: requestTypeLabels[value],
    value,
  }))

const formSchema = z.object({
  name: z.string('Name is required!'),
  email: z.email('Email is required!'),
  office: z.string('Office is required!'),
  request_type: z.enum(RequestType, 'Please select a request type!'),
  details: z.string('Please describe your problem'),
})

const form = useForm({
  defaultValues: {
    request_type: RequestType['Hardware Repairs and Configuration'],
  },
  validators: {
    onSubmit: formSchema,
  },
  onSubmit: async ({ value }) => {
    fetch(`http://localhost:8000/tickets`, {
      method: 'POST',
      body: JSON.stringify(value),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      console.log(response.json())
      if (response.ok) {
        toast.success('form submitted')
      }
    })
  },
})

function isInvalid(field: any) {
  return field.state.meta.isTouched && !field.state.meta.isValid
}
</script>

<template>
  <div id="form-container" class="flex">
    <form id="form-ticket" class="flex flex-col grow gap-5" @submit.prevent="form.handleSubmit">
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
                placeholder="johndoe@email.com"
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
                placeholder="John Doe's Office"
                @blur="field.handleBlur"
                @input="field.handleChange($event.target.value)"
              />
            </Field>
          </template>
        </form.Field>

        <form.Field name="request_type">
          <template #default="{ field }">
            <Field orientation="responsive" :aria-invalid="isInvalid(field)" class="flex-col!">
              <FieldContent>
                <FieldLabel :for="field.name"> Request Type </FieldLabel>
                <FieldError v-if="isInvalid(field)" :errors="field.state.meta.errors" />
              </FieldContent>
              <Select
                :name="field.name"
                :model-value="field.state.value"
                @update:model-value="field.handleChange"
              >
                <SelectTrigger :aria-invalid="isInvalid(field)" class="grow">
                  <SelectValue placeholder="Select the type of request" />
                </SelectTrigger>
                <SelectContent position="item-aligned">
                  <SelectItem
                    v-for="type in requestTypeOptions"
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

        <form.Field name="details">
          <template #default="{ field }">
            <Field orientation="responsive" :aria-invalid="isInvalid(field)" class="flex-col!">
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
                class="grow min-w-full max-w-full resize-none max-h-64"
              />
            </Field>
          </template>
        </form.Field>
      </FieldGroup>
      <Button type="submit" form="form-ticket"> Submit </Button>
    </form>
  </div>
</template>

<style scoped>
#form-container {
  min-width: 512px;
}

@media (min-width: 1024px) {
  #form-container {
    min-width: 896px;
  }
}
</style>
