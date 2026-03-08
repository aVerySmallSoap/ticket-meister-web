<script setup lang="ts">
import { z } from 'zod'

const formSchema = z.object({
  username: z.string(),
  password: z.string()
  }
)

fetch('http://localhost:8000/user', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({full_name: 'Testificate test', password:'test', email:'test@test.com'}),
}).then(res => res.json()).then(data => console.log(data))

</script>

<template>
</template>

<style scoped>

</style>
