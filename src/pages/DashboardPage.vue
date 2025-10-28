<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Ticket, LogOut, LayoutDashboard, Menu, X } from 'lucide-vue-next'

interface TicketType {
  id: string
  title: string
  description: string
  status: 'Open' | 'In Progress' | 'Closed'
  createdAt: string
}

interface Activity {
  id: string
  action: string
  user: string
  timestamp: string
}

const router = useRouter()
const route = useRoute()
const userEmail = ref('')
const activities = ref<Activity[]>([])
const isSidebarOpen = ref(false)

const tickets = computed(() => {
  const storedTickets = localStorage.getItem('tickets')
  return storedTickets ? JSON.parse(storedTickets) : []
})

const ticketStats = computed(() => {
  const allTickets: TicketType[] = tickets.value
  return {
    total: allTickets.length,
    open: allTickets.filter(t => t.status === 'Open').length,
    inProgress: allTickets.filter(t => t.status === 'In Progress').length,
    closed: allTickets.filter(t => t.status === 'Closed').length
  }
})

const handleLogout = () => {
   localStorage.removeItem('userEmail')
  localStorage.removeItem("ticketapp_session");
  router.push('/login')
}

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const closeSidebar = () => {
  isSidebarOpen.value = false
}

const handleManageTickets = () => {
  router.push('/tickets')
}

const getRelativeTime = (timestamp: string) => {
  const now = new Date()
  const activityDate = new Date(timestamp)
  const diffMs = now.getTime() - activityDate.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
  return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
}

onMounted(() => {
  const storedEmail = localStorage.getItem('userEmail')
  if (!storedEmail) {
    router.push('/login')
    return
  }
  userEmail.value = storedEmail

  const storedActivities = localStorage.getItem('activities')
  if (storedActivities) {
    activities.value = JSON.parse(storedActivities)
  }
})
</script>

<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Mobile Overlay -->
    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
      @click="closeSidebar"
    />

    <!-- Sidebar -->
    <aside
      :class="[
        'fixed lg:static bg-white inset-y-0 left-0 z-50 w-64 border-r bg-background transform transition-transform duration-200 ease-in-out lg:transform-none',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      ]"
    >
      <div class="flex h-full flex-col">
        <!-- Logo and Close Button -->
        <div class="border-b p-6 flex items-center justify-between">
          <a
            href="/"
            class="flex items-center gap-2 text-xl font-bold text-dark-900 "
          >
            <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
              <Ticket class="h-5 w-5 text-white" />
            </div>
            TicketFlow
          </a>
          <button
            @click="closeSidebar"
            class="lg:hidden text-gray-500 hover:text-gray-700"
            aria-label="Close sidebar"
          >
            <X class="h-6 w-6" />
          </button>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 space-y-1 p-4">
          <button
            :class="`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-900 ${
              route.path === '/dashboard'
                ? 'bg-indigo-50 dark:bg-indigo-50'
                : 'hover:bg-gray-50 hover:text-gray-900'
            }`"
            @click="() => router.push('/dashboard')"
          >
            <LayoutDashboard class="h-5 w-5" />
            Dashboard
          </button>
          <button
            :class="`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-900 ${
              route.path === '/tickets'
                ? 'bg-indigo-50 dark:bg-indigo-50'
                : 'hover:bg-gray-50 hover:text-gray-900'
            }`"
            @click="handleManageTickets"
          >
            <Ticket class="h-5 w-5" />
            Manage Tickets
          </button>
        </nav>

        <!-- Logout Button -->
        <div class="border-t p-4">
          <Button
            variant="destructive"
            class="w-full bg-red-600"
            @click="handleLogout"
          >
            <LogOut class="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 overflow-y-auto h-screen">
      <!-- Header -->
      <header class="sticky top-0 z-50 border-b bg-white shadow-sm">
        <div class="flex h-16 items-center justify-between px-6">
          <div class="flex items-center gap-4">
            <button
              @click="toggleSidebar"
              class="lg:hidden text-gray-500 hover:text-gray-700"
              aria-label="Toggle sidebar"
            >
              <Menu class="h-6 w-6" />
            </button>
            <h2 class="text-xl font-semibold text-gray-900">Dashboard</h2>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-sm font-medium text-white">
              {{userEmail.charAt(0).toUpperCase()}}
         </div>
        </div>
      </header>

      <main class="bg-[#FBFCF8] dark:bg-accent p-8">
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-foreground">Dashboard Overview</h1>
          <p class="mt-2 text-gray-600 dark:text-gray-400">
            Get a quick snapshot of your ticket management metrics.
          </p>
        </div>

        <!-- Stats Cards -->
        <div class="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <!-- Total Tickets -->
        <Card class="bg-blue-100">
          <CardContent class="p-6 py-2">
            <div class="mb-2 flex items-center gap-2 text-sm font-bold text-gray-600">
              <Ticket class="h-4 w-4" />
              Total Tickets
            </div>
            <div class="mb-2 text-4xl font-bold text-blue-600">
              {{ ticketStats.total }}
            </div>
            <p class="text-sm text-gray-600">
              Overall count of all tickets.
            </p>
          </CardContent>
        </Card>

        <!-- Open Tickets -->
        <Card class="bg-green-100">
          <CardContent class="p-6 py-2">
            <div class="mb-2 flex items-center justify-between">
              <div class="flex items-center gap-2 text-sm font-bold text-gray-600">
                <Ticket class="h-4 w-4" />
                Open Tickets
              </div>
            </div>
            <div class="mb-2 text-4xl font-bold text-green-600">
              {{ ticketStats.open }}
            </div>
            <p class="text-sm text-gray-600">
              Tickets awaiting resolution.
            </p>
          </CardContent>
        </Card>

        <!-- In Progress Tickets -->
        <Card class="bg-yellow-100">
          <CardContent class="p-6 py-2">
            <div class="mb-2 flex items-center justify-between">
              <div class="flex items-center gap-2 text-sm font-bold text-gray-600">
                <Ticket class="h-4 w-4" />
                In Progress Tickets
              </div>
            </div>
            <div class="mb-2 text-4xl font-bold text-yellow-600">
              {{ ticketStats.inProgress }}
            </div>
            <p class="text-sm text-gray-600">
              Tickets currently being handled.
            </p>
          </CardContent>
        </Card>

        <!-- Closed Tickets -->
        <Card class="bg-gray-100">
          <CardContent class="p-6 py-2">
            <div class="mb-2 flex items-center justify-between">
              <div class="flex items-center gap-2 text-sm font-bold text-gray-600">
                <Ticket class="h-4 w-4" />
                Closed Tickets
              </div>
            </div>
            <div class="mb-2 text-4xl font-bold text-gray-600">
              {{ ticketStats.closed }}
            </div>
            <p class="text-sm text-gray-600">
              Tickets successfully resolved.
            </p>
          </CardContent>
        </Card>
      </div>

      <!-- Recent Activity -->
      <div>
        <h2 class="mb-2 text-2xl font-bold text-foreground">
          Recent Activity
        </h2>
        <p class="mb-6 text-gray-600 dark:text-gray-400">
          Monitor the latest updates and interactions across your support tickets.
        </p>
        <div class="space-y-2">
          <!-- Activity Items -->
          <template v-if="activities.length > 0">
            <div
              v-for="activity in activities.slice(0, 5)"
              :key="activity.id"
              class="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm"
            >
              <p class="text-gray-900 text-sm">{{ activity.action }}</p>
              <span class="text-sm text-gray-500">
                {{ getRelativeTime(activity.timestamp) }}
              </span>
            </div>
          </template>
          <div v-else class="rounded-lg bg-white p-8 text-center shadow-sm">
            <p class="text-gray-500">
              No recent activity. Create, edit, or delete tickets to see activity here.
            </p>
          </div>
        </div>
      </div>
      </main>
    </div>
  </div>
</template>
