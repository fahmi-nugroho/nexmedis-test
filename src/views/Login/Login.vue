<script lang="ts">
export default {
  name: 'Login',
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/Auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

const email = ref<string>('')
const password = ref<string>('')
const showPassword = ref<boolean>(false)

const login = async () => {
  try {
    const response = await authStore.loginApi({
      email: email.value,
      password: password.value,
    })
    if (response.token) {
      router.push('homepage')
    }
    console.log('🚀 ~ login ~ response:', response)
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div class="flex justify-center flex-col h-screen px-[25%]">
    <Card class="mx-auto">
      <template #title>Login</template>
      <template #content>
        <div class="!mt-5">
          <InputGroup class="!mb-4">
            <InputGroupAddon>
              <i class="pi pi-at"></i>
            </InputGroupAddon>
            <InputText v-model="email" placeholder="Email" type="email" />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-key"></i>
            </InputGroupAddon>
            <InputText
              v-model="password"
              placeholder="Password"
              :type="showPassword ? 'text' : 'password'"
            />
            <InputGroupAddon>
              <i v-if="showPassword" @click="showPassword = false" class="pi pi-eye-slash"></i>
              <i v-else @click="showPassword = true" class="pi pi-eye"></i>
            </InputGroupAddon>
          </InputGroup>
        </div>
        <Button @click="login" class="!mt-4" label="Login" fluid />
      </template>
    </Card>
  </div>
</template>
