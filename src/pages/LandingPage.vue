<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Ticket, BarChart3, Lock, Facebook, Twitter, Linkedin } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToLogin = () => {
  router.push('/login')
}

const goToSignup = () => {
  router.push('/signup')
}
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- Max width container -->
    <div class="mx-auto max-w-[1440px]">
      <!-- Hero Section with wavy background and decorative circles -->
      <section class="relative overflow-hidden bg-gradient-to-br from-purple-100 to-blue-100 pb-32 pt-20">
        <!-- Wavy bottom edge using clip-path -->
        <div
          class="absolute inset-0 bg-gradient-to-br from-purple-100 to-blue-600"
          style="clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%)"
        />
        <!-- Decorative circle - left side, in hero -->
        <div class="absolute top-[50px] h-[250px] w-[250px] rounded-full bg-purple-400/40 blur-lg" />
        <!-- Decorative circle - right side, overlapping hero section -->
        <div class="absolute right-[-50px] top-[200px] h-[400px] w-[400px] rounded-full bg-pink-400/30 blur-lg" />
        
        <!-- Hero Content -->
        <div class="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <!-- Logo/Brand -->
          <div class="mb-8 flex items-center justify-center gap-2">
            <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-black">
              <Ticket class="h-6 w-6 text-white" />
            </div>
            <span class="text-2xl font-bold text-foreground">TicketFlow</span>
          </div>
          
          <!-- Main Heading -->
          <h1 class="mb-6 text-balance text-5xl font-bold leading-tight text-foreground md:text-6xl">
            Streamline Your Support, One Ticket at a Time
          </h1>
          
          <!-- Subheading -->
          <p class="mb-8 text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
            Efficiently manage customer inquiries, track progress, and enhance team collaboration with TicketFlow's intuitive platform.
          </p>
          
          <!-- CTA Buttons -->
          <div class="flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="outline"
              size="lg"
              class="min-w-[120px] bg-white"
              @click="goToLogin"
            >
              Login
            </Button>
            <Button 
              size="lg" 
              class="min-w-[120px] bg-indigo-600 hover:bg-indigo-700 text-white"
              @click="goToSignup"
            >
              Get Started
            </Button>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="px-6 py-20">
        <div class="mx-auto max-w-6xl">
          <h2 class="mb-12 text-center text-4xl font-bold text-foreground">
            Key Features Designed for You
          </h2>
          <div class="grid gap-8 md:grid-cols-3">
            <!-- Feature 1 -->
            <Card class="p-8 text-center transition-shadow hover:shadow-lg">
              <div class="mb-6 flex justify-center">
                <div class="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
                  <svg
                    class="h-8 w-8 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
              </div>
              <h3 class="mb-4 text-xl font-bold text-foreground">
                Fast Ticket Resolution
              </h3>
              <p class="leading-relaxed text-muted-foreground">
                Automate workflows and prioritize urgent issues to ensure your team resolves tickets faster and more efficiently.
              </p>
            </Card>

            <!-- Feature 2 -->
            <Card class="p-8 text-center transition-shadow hover:shadow-lg">
              <div class="mb-6 flex justify-center">
                <div class="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
                  <BarChart3 class="h-8 w-8 text-indigo-600" />
                </div>
              </div>
              <h3 class="mb-4 text-xl font-bold text-foreground">
                Analytics Dashboard
              </h3>
              <p class="leading-relaxed text-muted-foreground">
                Gain deep insights into your support operations with powerful dashboards and reports, helping you make data-driven decisions.
              </p>
            </Card>

            <!-- Feature 3 -->
            <Card class="p-8 text-center transition-shadow hover:shadow-lg">
              <div class="mb-6 flex justify-center">
                <div class="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
                  <Lock class="h-8 w-8 text-indigo-600" />
                </div>
              </div>
              <h3 class="mb-4 text-xl font-bold text-foreground">
                Secure Access
              </h3>
              <p class="leading-relaxed text-muted-foreground">
                Protect your sensitive data with robust security features, ensuring that only authorized personnel can access critical information.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="border-t border-border px-6 py-12">
        <div class="mx-auto max-w-6xl">
          <div class="gap-8 flex flex-wrap justify-between">
            <!-- Brand Column -->
            <div class="md:col-span-2">
              <div class="mb-4 flex items-center gap-2">
                <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-black">
                  <Ticket class="h-5 w-5 text-white" />
                </div>
                <span class="text-lg font-bold text-foreground">TicketFlow</span>
              </div>
              <p class="mb-4 text-sm text-muted-foreground">
                Streamline your support, one ticket at a time.
              </p>
              <div class="flex gap-4">
                <a href="#" class="text-muted-foreground hover:text-foreground">
                  <Facebook class="h-5 w-5" />
                </a>
                <a href="#" class="text-muted-foreground hover:text-foreground">
                  <Twitter class="h-5 w-5" />
                </a>
                <a href="#" class="text-muted-foreground hover:text-foreground">
                  <Linkedin class="h-5 w-5" />
                </a>
              </div>
            </div>

            <!-- Product Column -->
            <div>
              <h4 class="mb-4 font-bold text-foreground">Product</h4>
              <ul class="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" class="hover:text-foreground">Features</a></li>
                <li><a href="#" class="hover:text-foreground">Integrations</a></li>
                <li><a href="#" class="hover:text-foreground">Pricing</a></li>
              </ul>
            </div>

            <!-- Resources Column -->
            <div>
              <h4 class="mb-4 font-bold text-foreground">Resources</h4>
              <ul class="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" class="hover:text-foreground">Blog</a></li>
                <li><a href="#" class="hover:text-foreground">Documentation</a></li>
                <li><a href="#" class="hover:text-foreground">Support</a></li>
              </ul>
            </div>

            <!-- Company Column -->
            <div>
              <h4 class="mb-4 font-bold text-foreground">Company</h4>
              <ul class="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" class="hover:text-foreground">About Us</a></li>
                <li><a href="#" class="hover:text-foreground">Careers</a></li>
                <li><a href="#" class="hover:text-foreground">Contact</a></li>
              </ul>
            </div>
          </div>

          <!-- CTA Section -->
          <div class="mt-12 rounded-lg border border-border bg-muted/30 p-8 text-center">
            <h3 class="mb-2 text-2xl font-bold text-foreground">
              Ready to streamline your support?
            </h3>
            <Button class="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white" @click="goToSignup">
              Get Started
            </Button>
          </div>

          <!-- Copyright -->
          <div class="mt-8 border-border pt-8 text-center text-sm text-muted-foreground">
            © 2025 TicketFlow. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>
