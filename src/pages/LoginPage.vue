<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Eye, EyeOff, Ticket } from 'lucide-vue-next'

const router = useRouter()

const email = ref('')
const password = ref('')
const emailError = ref('')
const passwordError = ref('')
const isLoading = ref(false)
const showPassword = ref(false)

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email.value.trim()) {
    emailError.value = 'Email is required'
    return false
  }
  if (!emailRegex.test(email.value)) {
    emailError.value = 'Please enter a valid email address'
    return false
  }
  emailError.value = ''
  return true
}

const validatePassword = () => {
  if (!password.value) {
    passwordError.value = 'Password is required'
    return false
  }
  if (password.value.length < 6) {
    passwordError.value = 'Password must be at least 6 characters'
    return false
  }
  passwordError.value = ''
  return true
}

const handleSubmit = async (e: Event) => {
  e.preventDefault()

  // Clear previous errors
  emailError.value = ''
  passwordError.value = ''

  // Validate inputs (these functions set the error messages and return true when valid)
  const isEmailValid = validateEmail()
  const isPasswordValid = validatePassword()

  if (!isEmailValid || !isPasswordValid) {
    return
  }

  isLoading.value = true
  type User = { email: string; password: string; fullName?: string }
  const existingUsers = JSON.parse(localStorage.getItem('users') || '[]') as User[]
 

  // Simulate API call
  setTimeout(() => {

    
    // Mock authentication - accept demo@ticketflow.com / password123
    if ((email.value === 'demo@ticketflow.com' && password.value === 'password123') || (existingUsers.map(u => u.email).includes(email.value) && password.value === existingUsers.find(u => u.email === email.value)?.password)) {
      // Store auth token in localStorage
      const mockToken = btoa(`${email.value}:${Date.now()}`)
      localStorage.setItem('ticketapp_session', mockToken)
      localStorage.setItem('userEmail', email.value)

      // Redirect to dashboard
      router.push('/dashboard')
    } else {
      isLoading.value = false
      // Provide feedback for invalid credentials
      passwordError.value = 'Invalid email or password. Try demo@ticketflow.com / password123'
    }
  }, 1000)
}

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <div class="flex min-h-screen flex-col bg-gray-50">
    <!-- Header -->
    <header class="border-b bg-white">
      <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div class="flex items-center gap-2">
          <a
            href="/"
            class="flex items-center gap-2 text-xl font-bold text-gray-900"
          >
            <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
              <Ticket class="h-5 w-5 text-white" />
            </div>
            TicketFlow
          </a>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex flex-1 items-center justify-center px-4 py-12">
      <Card class="w-full max-w-md">
        <CardHeader class="space-y-1 text-center">
          <CardTitle class="text-2xl font-bold">
            Welcome Back to TicketFlow
          </CardTitle>
          <CardDescription>
            Log in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form @submit="handleSubmit" class="space-y-4">
            <div class="space-y-2">
              <Label for="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                v-model="email"
                @input="() => emailError && validateEmail()"
                :class="{ 'border-red-500': emailError }"
              />
              <p v-if="emailError" class="text-sm text-red-500">{{ emailError }}</p>
            </div>
            
            <div class="space-y-2">
              <Label for="password">Password</Label>
              <div class="relative">
                <Input
                  id="password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Enter your password"
                  v-model="password"
                  @input="() => passwordError && validatePassword()"
                  :class="{ 'border-red-500': passwordError, 'pr-10': true }"
                />
                <button
                  type="button"
                  @click="togglePasswordVisibility"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  :aria-label="showPassword ? 'Hide password' : 'Show password'"
                >
                  <EyeOff v-if="showPassword" class="w-5 h-5" />
                  <Eye v-else class="w-5 h-5" />
                </button>
              </div>
              <p v-if="passwordError" class="text-sm text-red-500">{{ passwordError }}</p>
              <div class="flex justify-end">
                <a href="#" class="text-sm text-indigo-600 hover:text-indigo-500">
                  Forgot Password?
                </a>
              </div>
            </div>
            
            <Button type="submit" class="w-full bg-indigo-600 text-white" :disabled="isLoading">
              {{ isLoading ? 'Logging in...' : 'Log In' }}
            </Button>
            
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">OR</span>
                </div>
              </div>

              
              <Button
              type="button"
              variant="outline"
              class="w-full"
              @click="() => router.push('/signup')"
            >
              Create New Account
            </Button>
          </form>
          
          

          <!-- <div className="mt-4 rounded-md bg-blue-50 p-4">
              <p className="text-sm text-blue-800">
                <strong>Demo credentials:</strong>
                <br />
                Email: demo@ticketflow.com
                <br />
                Password: password123
              </p>
            </div> -->
        </CardContent>
      </Card>
    </main>

    <!-- Footer -->
    <footer class="border-t bg-white py-6">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p class="text-center text-sm text-gray-500">
          © 2025 TicketFlow. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>
