<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Ticket, LogOut, LayoutDashboard, Menu, X } from 'lucide-vue-next'

interface TicketType {
  id: string
  title: string
  description: string
  status: 'Open' | 'In Progress' | 'Closed'
  createdAt: string
}

const router = useRouter()
const route = useRoute()
const userEmail = ref('')
const tickets = ref<TicketType[]>([])
const isSidebarOpen = ref(false)

// Create new ticket state
const newTicketTitle = ref('')
const newTicketDescription = ref('')
const newTicketStatus = ref<'Open' | 'In Progress' | 'Closed'>('Open')
const titleError = ref('')
const descriptionError = ref('')

// Edit ticket state
const editTicketId = ref<string | null>(null)
const editTicketTitle = ref('')
const editTicketDescription = ref('')
const editTicketStatus = ref<'Open' | 'In Progress' | 'Closed'>('Open')
const showEditDialog = ref(false)

// Delete ticket state
const deleteTicketId = ref<string | null>(null)
const showDeleteDialog = ref(false)

const handleLogout = () => {
  localStorage.removeItem('userEmail')
  router.push('/login')
}

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const closeSidebar = () => {
  isSidebarOpen.value = false
}

const validateCreateForm = () => {
  let isValid = true
  if (!newTicketTitle.value.trim()) {
    titleError.value = 'Ticket title is required'
    isValid = false
  } else {
    titleError.value = ''
  }
  if (!newTicketDescription.value.trim()) {
    descriptionError.value = 'Description is required'
    isValid = false
  } else {
    descriptionError.value = ''
  }
  return isValid
}

const handleCreateTicket = () => {
  if (!validateCreateForm()) {
    return
  }

  const newTicket: TicketType = {
    id: Date.now().toString(),
    title: newTicketTitle.value,
    description: newTicketDescription.value,
    status: newTicketStatus.value,
    createdAt: new Date().toISOString(),
  }

  const updatedTickets = [...tickets.value, newTicket]
  tickets.value = updatedTickets
  localStorage.setItem('tickets', JSON.stringify(updatedTickets))

  logActivity(`Created new ticket: "${newTicket.title}"`)

  newTicketTitle.value = ''
  newTicketDescription.value = ''
  newTicketStatus.value = 'Open'
}

const openEditDialog = (ticket: TicketType) => {
  editTicketId.value = ticket.id
  editTicketTitle.value = ticket.title
  editTicketDescription.value = ticket.description
  editTicketStatus.value = ticket.status
  showEditDialog.value = true
}

const handleEditTicket = () => {
  const updatedTickets = tickets.value.map((ticket) =>
    ticket.id === editTicketId.value
      ? {
          ...ticket,
          title: editTicketTitle.value,
          description: editTicketDescription.value,
          status: editTicketStatus.value,
        }
      : ticket
  )
  tickets.value = updatedTickets
  localStorage.setItem('tickets', JSON.stringify(updatedTickets))

  logActivity(`Updated ticket: "${editTicketTitle.value}"`)

  showEditDialog.value = false
  editTicketId.value = null
}

const openDeleteDialog = (ticketId: string) => {
  deleteTicketId.value = ticketId
  showDeleteDialog.value = true
}

const handleDeleteTicket = () => {
  const ticketToDelete = tickets.value.find((t) => t.id === deleteTicketId.value)
  const updatedTickets = tickets.value.filter((ticket) => ticket.id !== deleteTicketId.value)
  tickets.value = updatedTickets
  localStorage.setItem('tickets', JSON.stringify(updatedTickets))

  if (ticketToDelete) {
    logActivity(`Deleted ticket: "${ticketToDelete.title}"`)
  }

  showDeleteDialog.value = false
  deleteTicketId.value = null
}

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case 'Open':
      return 'bg-green-100 text-green-800 hover:bg-green-200'
    case 'In Progress':
      return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
    case 'Closed':
      return 'bg-gray-100 text-gray-800 hover:bg-gray-200'
    default:
      return ''
  }
}

const logActivity = (action: string) => {
  const activities = JSON.parse(localStorage.getItem('activities') || '[]')
  const newActivity = {
    id: Date.now().toString(),
    action,
    user: userEmail.value,
    timestamp: new Date().toISOString(),
  }
  const updatedActivities = [newActivity, ...activities].slice(0, 20)
  localStorage.setItem('activities', JSON.stringify(updatedActivities))
}

onMounted(() => {
  const storedEmail = localStorage.getItem('userEmail')
  if (!storedEmail) {
    router.push('/login')
    return
  }
  userEmail.value = storedEmail

  const storedTickets = localStorage.getItem('tickets')
  if (storedTickets) {
    tickets.value = JSON.parse(storedTickets)
  } else {
    // Sample tickets
    const sampleTickets: TicketType[] = [
      {
        id: '1',
        title: 'Login authentication failure on mobile app',
        description:
          'Users are unable to log in to the mobile application since 9:00 AM UTC. Investigation is ongoing. High priority',
        status: 'In Progress',
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Request for new user onboarding flow documentation',
        description:
          'The current onboarding process lacks clear documentation for new hires. Need a comprehensive guide.',
        status: 'Open',
        createdAt: new Date().toISOString(),
      },
      {
        id: '3',
        title: 'Database connection intermittent on production',
        description:
          'Intermittent connection drops observed on the main production database. Performance degradation reported.',
        status: 'Open',
        createdAt: new Date().toISOString(),
      },
      {
        id: '4',
        title: 'Feature request: Dark mode for web application',
        description:
          'Users have requested a dark mode option for improved accessibility and user preference, especially during night usage.',
        status: 'Closed',
        createdAt: new Date().toISOString(),
      },
      {
        id: '5',
        title: 'Bug: Password reset link not delivered',
        description:
          'Multiple users unable to receive password reset emails. Check SMTP server logs and mail delivery service.',
        status: 'In Progress',
        createdAt: new Date().toISOString(),
      },
      {
        id: '6',
        title: 'Update security protocols for API endpoints',
        description:
          'Review and update all API endpoint security protocols to comply with the latest industry standards.',
        status: 'Open',
        createdAt: new Date().toISOString(),
      },
    ]
    tickets.value = sampleTickets
    localStorage.setItem('tickets', JSON.stringify(sampleTickets))
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
                ? 'bg-indigo-50 bg-indigo-50'
                : 'hover:bg-gray-50 hover:text-gray-900'
            }`"
            @click="() => router.push('/tickets')"
          >
            <Ticket class="h-5 w-5" />
            Manage Tickets
          </button>
        </nav>

        <!-- Logout Button -->
        <div class="border-t p-4">
          <Button
            variant="destructive"
            class="w-full bg-red-600 hover:bg-red-700"
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
            <h2 class="text-xl font-semibold text-gray-900">Manage Tickets</h2>
          </div>
           <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-sm font-medium text-white">
              {{userEmail.charAt(0).toUpperCase()}}
            </div>
        </div>
      </header>

      <main class="bg-[#FBFCF8] dark:bg-accent p-8">
      <!-- Create New Ticket Section -->
      <div class="mb-12">
        <h1 class="text-3xl font-bold text-foreground">
          Create New Ticket
        </h1>
        <p class="mt-2 text-gray-600 dark:text-gray-400">
          Submit a new support request for your team.
        </p>
        <div class="mt-6 space-y-6">
          <div>
            <Label for="title">Ticket Title</Label>
            <Input
              id="title"
              placeholder="e.g., VPN connection issue"
              v-model="newTicketTitle"
              @input="() => titleError && (titleError = '')"
              class="mt-2"
            />
            <p v-if="titleError" class="mt-1 text-sm text-red-500">{{ titleError }}</p>
          </div>
          <div>
            <Label for="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Provide details about the issue..."
              v-model="newTicketDescription"
              @input="() => descriptionError && (descriptionError = '')"
              class="mt-2 min-h-[100px]"
            />
            <p v-if="descriptionError" class="mt-1 text-sm text-red-500">{{ descriptionError }}</p>
          </div>
          <div>
            <Label for="status">Status</Label>
            <Select v-model="newTicketStatus">
              <SelectTrigger class="mt-2">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent class="bg-white">
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            @click="handleCreateTicket"
            class="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Create Ticket
          </Button>
        </div>
      </div>

      <!-- All Tickets Section -->
      <div>
        <h2 class="text-2xl font-bold text-foreground">All Tickets</h2>
        <div class="mt-6 grid gap-6 md:grid-cols-2">
          <div
            v-for="ticket in tickets"
            :key="ticket.id"
            class="rounded-lg border bg-background p-6 shadow-sm"
          >
            <div class="mb-4">
              <h3 class="text-lg font-semibold text-foreground">
                {{ ticket.title }}
              </h3>
              <Badge :class="`mt-2 ${getStatusBadgeVariant(ticket.status)}`">
                {{ ticket.status }}
              </Badge>
            </div>
            <p class="mb-6 text-sm text-gray-600 dark:text-gray-400">
              {{ ticket.description }}
            </p>
            <div class="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                @click="() => openEditDialog(ticket)"
              >
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                class=" hover:text-red-700 bg-red-600"
                @click="() => openDeleteDialog(ticket.id)"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>

    <!-- Edit Dialog -->
    <Dialog v-model:open="showEditDialog">
      <DialogContent class="bg-white">
        <DialogHeader>
          <DialogTitle>Edit Ticket</DialogTitle>
          <DialogDescription>
            Update the details of your ticket below.
          </DialogDescription>
        </DialogHeader>
        <div class="space-y-4">
          <div>
            <Label for="edit-title">Ticket Title</Label>
            <Input
              id="edit-title"
              v-model="editTicketTitle"
              class="mt-2"
            />
          </div>
          <div>
            <Label for="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              v-model="editTicketDescription"
              class="mt-2 min-h-[100px]"
            />
          </div>
          <div>
            <Label for="edit-status">Status</Label>
            <Select v-model="editTicketStatus">
              <SelectTrigger class="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent class="bg-white">
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="() => (showEditDialog = false)">
            Cancel
          </Button>
          <Button @click="handleEditTicket" class="bg-indigo-600 hover:bg-indigo-700 text-white">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- Delete Confirmation Dialog -->
    <AlertDialog v-model:open="showDeleteDialog">
      <AlertDialogContent class="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the ticket.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction @click="handleDeleteTicket" class="bg-red-600 hover:bg-red-700">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
      </main>
    </div>
  </div>
</template>
