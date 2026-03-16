<script setup lang="ts">
import { z } from 'zod'
import { useForm } from '@tanstack/vue-form'
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/auth.ts'
import router from '@/router'

const formSchema = z.object({
  username: z.string(),
  password: z.string(),
})

const form = useForm({
  validators: {
    onSubmitAsync: async ({value}) => {
      const auth = useAuthStore()
      try{
        await auth.login(value["username"], value["password"])
        console.log(auth.accessToken)
        await router.push("/dashboard")
      }catch(error){
        // throw errors & push them to fields
        console.log(error)
      }
    },
    onChange: formSchema
  },
})

function isInvalid(field: any) {
  return field.state.meta.isTouched && !field.state.meta.isValid
}
</script>

<template>
  <form id="form-login" @submit.prevent="form.handleSubmit">
    <FieldGroup>
      <form.Field name="username">
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
              placeholder="Email"
              type="email"
              @blur="field.handleBlur"
              @input="field.handleChange($event.target.value)"
            />
          </Field>
        </template>
      </form.Field>
    </FieldGroup>

    <FieldGroup>
      <form.Field name="password">
        <template #default="{ field }">
          <Field :data-invalid="isInvalid(field)">
            <FieldContent>
              <FieldLabel :for="field.name"> Password </FieldLabel>
              <FieldError v-if="isInvalid(field)" :errors="field.state.meta.errors" />
            </FieldContent>
            <Input
              :id="field.name"
              :name="field.name"
              :model-value="field.state.value"
              :aria-invalid="isInvalid(field)"
              placeholder="password"
              type="password"
              @blur="field.handleBlur"
              @input="field.handleChange($event.target.value)"
            />
          </Field>
        </template>
      </form.Field>
    </FieldGroup>

    <Button type="submit">Submit</Button>
  </form>
</template>

<style scoped></style>
