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

const fullName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const fullNameError = ref('')
const emailError = ref('')
const passwordError = ref('')
const confirmPasswordError = ref('')
const isLoading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const validateFullName = () => {
  if (!fullName.value.trim()) {
    fullNameError.value = 'Full name is required'
    return false
  }
  if (fullName.value.trim().length < 2) {
    fullNameError.value = 'Full name must be at least 2 characters'
    return false
  }
  fullNameError.value = ''
  return true
}

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
  if (password.value.length < 8) {
    passwordError.value = 'Password must be at least 8 characters'
    return false
  }
  if (!/(?=.*[a-z])/.test(password.value)) {
    passwordError.value = 'Password must contain at least one lowercase letter'
    return false
  }
  if (!/(?=.*[A-Z])/.test(password.value)) {
    passwordError.value = 'Password must contain at least one uppercase letter'
    return false
  }
  if (!/(?=.*\d)/.test(password.value)) {
    passwordError.value = 'Password must contain at least one number'
    return false
  }
  passwordError.value = ''
  return true
}

const validateConfirmPassword = () => {
  if (!confirmPassword.value) {
    confirmPasswordError.value = 'Please confirm your password'
    return false
  }
  if (confirmPassword.value !== password.value) {
    confirmPasswordError.value = 'Passwords do not match'
    return false
  }
  confirmPasswordError.value = ''
  return true
}

const handleSubmit = async (e: Event) => {
  e.preventDefault()
  
  const isFullNameValid = validateFullName()
  const isEmailValid = validateEmail()
  const isPasswordValid = validatePassword()
  const isConfirmPasswordValid = validateConfirmPassword()
  
  if (!isFullNameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
    return
  }
  
  isLoading.value = true
  
  // Simulate API call
  setTimeout(() => {
    // Check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')
    const userExists = existingUsers.some((u: any) => u.email === email.value)
    
    if (userExists) {
      emailError.value = 'An account with this email already exists'
      isLoading.value = false
      return
    }
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      fullName: fullName.value,
      email: email.value,
      password: password.value, // In production, this should be hashed!
      createdAt: new Date().toISOString()
    }
    
    existingUsers.push(newUser)
    localStorage.setItem('users', JSON.stringify(existingUsers))
    
    // Auto-login after signup
    localStorage.setItem('userEmail', email.value)
    localStorage.setItem('ticketapp_session', JSON.stringify({
      userId: newUser.id,
      email: newUser.email,
      fullName: newUser.fullName
    }))
    
    isLoading.value = false
    router.push('/dashboard')
  }, 1000)
}

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value
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
            Create Your Account
          </CardTitle>
          <CardDescription>
            Sign up to start managing your tickets efficiently
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form @submit="handleSubmit" class="space-y-4">
            <!-- Full Name -->
            <div class="space-y-2">
              <Label for="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="John Doe"
                v-model="fullName"
                @input="() => fullNameError && validateFullName()"
                :class="{ 'border-red-500': fullNameError }"
              />
              <p v-if="fullNameError" class="text-sm text-red-500">{{ fullNameError }}</p>
            </div>

            <!-- Email -->
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
            
            <!-- Password -->
            <div class="space-y-2">
              <Label for="password">Password</Label>
              <div class="relative">
                <Input
                  id="password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Create a strong password"
                  v-model="password"
                  @input="() => {
                    passwordError && validatePassword()
                    if (confirmPassword) validateConfirmPassword()
                  }"
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
              <p v-else class="text-xs text-gray-500">
                Must be at least 8 characters with uppercase, lowercase, and number
              </p>
            </div>

            <!-- Confirm Password -->
            <div class="space-y-2">
              <Label for="confirmPassword">Confirm Password</Label>
              <div class="relative">
                <Input
                  id="confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  placeholder="Re-enter your password"
                  v-model="confirmPassword"
                  @input="() => confirmPasswordError && validateConfirmPassword()"
                  :class="{ 'border-red-500': confirmPasswordError, 'pr-10': true }"
                />
                <button
                  type="button"
                  @click="toggleConfirmPasswordVisibility"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  :aria-label="showConfirmPassword ? 'Hide password' : 'Show password'"
                >
                  <EyeOff v-if="showConfirmPassword" class="w-5 h-5" />
                  <Eye v-else class="w-5 h-5" />
                </button>
              </div>
              <p v-if="confirmPasswordError" class="text-sm text-red-500">{{ confirmPasswordError }}</p>
            </div>
            
            <Button type="submit" class="w-full bg-indigo-600 text-white" :disabled="isLoading">
              {{ isLoading ? 'Creating Account...' : 'Sign Up' }}
            </Button>
            
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <span class="w-full border-t" />
              </div>
              <div class="relative flex justify-center text-xs uppercase">
                <span class="bg-white px-2 text-muted-foreground">Or</span>
              </div>
            </div>
            
            
          </form>
          
          <p class="mt-6 text-center text-sm text-gray-600">
            Already have an account?
            <a href="/login" class="font-medium text-indigo-600 hover:text-indigo-500">
              Log In
            </a>
         
          </p>
        </CardContent>
      </Card>
    </main>

  </div>
</template>
