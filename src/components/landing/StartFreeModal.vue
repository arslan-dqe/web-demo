<script setup lang="ts">
import { ref, computed } from 'vue'

const open = defineModel<boolean>('open', { default: false })

const step = ref<1 | 2>(1)
const submitting  = ref(false)
const submitted   = ref(false)
const emailError  = ref('')
const showPassword = ref(false)

const state = ref({
  email:     '',
  firstName: '',
  lastName:  '',
  company:   '',
  password:  '',
})

// ── Business email gate ───────────────────────────────────────────────────
const freeProviders = [
  'gmail.com','yahoo.com','hotmail.com','outlook.com','icloud.com',
  'aol.com','protonmail.com','mail.com','zoho.com','yandex.com',
  'gmx.com','live.com','msn.com','me.com','inbox.com',
]

const emailDomain  = computed(() => state.value.email.split('@')[1]?.toLowerCase() ?? '')
const isPersonal   = computed(() => freeProviders.includes(emailDomain.value))
const isValidEmail = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.value.email))
const isBusinessEmail = computed(() => isValidEmail.value && !isPersonal.value)

// ── Step validation ───────────────────────────────────────────────────────
function validateStep1(): boolean {
  emailError.value = ''
  if (!state.value.email) {
    emailError.value = 'Email is required'
    return false
  }
  if (!isValidEmail.value) {
    emailError.value = 'Enter a valid email address'
    return false
  }
  if (isPersonal.value) {
    emailError.value = 'Please use your work email address'
    return false
  }
  return true
}

type FieldErrors = Partial<Record<'firstName' | 'lastName' | 'company' | 'password', string>>
const errors = ref<FieldErrors>({})

function validateStep2(): boolean {
  const e: FieldErrors = {}
  if (!state.value.firstName) e.firstName = 'Required'
  if (!state.value.lastName)  e.lastName  = 'Required'
  if (!state.value.company)   e.company   = 'Required'
  if (!state.value.password)       e.password = 'Password is required'
  else if (state.value.password.length < 8) e.password = 'At least 8 characters'
  errors.value = e
  return Object.keys(e).length === 0
}

function nextStep() {
  if (validateStep1()) {
    emailError.value = ''
    errors.value     = {}
    step.value       = 2
  }
}

async function submit() {
  if (!validateStep2()) return
  submitting.value = true
  await new Promise(r => setTimeout(r, 1600))
  submitting.value = false
  submitted.value  = true
}

function closeAndReset() {
  open.value = false
  setTimeout(() => {
    step.value    = 1
    submitted.value  = false
    submitting.value = false
    emailError.value = ''
    errors.value     = {}
    state.value = { email: '', firstName: '', lastName: '', company: '', password: '' }
  }, 400)
}

// ── Password strength ─────────────────────────────────────────────────────
const passwordStrength = computed(() => {
  const p = state.value.password
  if (!p) return 0
  let s = 0
  if (p.length >= 8)          s++
  if (/[A-Z]/.test(p))        s++
  if (/[0-9]/.test(p))        s++
  if (/[^A-Za-z0-9]/.test(p)) s++
  return s
})
const strengthLabel     = computed(() => ['', 'Weak', 'Fair', 'Good', 'Strong'][passwordStrength.value])
const strengthColor     = computed(() => ['', 'bg-error', 'bg-warning', 'bg-info', 'bg-success'][passwordStrength.value])
const strengthTextColor = computed(() => ['', 'text-error', 'text-warning', 'text-info', 'text-success'][passwordStrength.value])
</script>

<template>
  <UModal
    v-model:open="open"
    :dismissible="!submitting"
    :ui="{ content: 'max-w-md' }"
  >
    <template #content>
      <div class="flex flex-col">
        <!-- ── Header ───────────────────────────────────────────────── -->
        <div class="relative px-6 pt-6 pb-5 border-b border-(--ui-border)">
          <button
            class="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-(--ui-text-muted) hover:text-(--ui-text-highlighted) hover:bg-(--ui-bg-elevated) transition-all"
            @click="closeAndReset"
          >
            <UIcon
              name="i-lucide-x"
              class="w-4 h-4"
            />
          </button>

          <!-- Logo -->
          <div class="flex items-center gap-2 mb-4">
            <div class="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center shadow-sm">
              <UIcon
                name="i-lucide-shield-check"
                class="w-4 h-4 text-white"
              />
            </div>
            <span class="font-bold text-sm text-(--ui-text-highlighted)">DQE Validate</span>
          </div>

          <Transition
            name="fade"
            mode="out-in"
          >
            <div
              v-if="!submitted"
              key="h-active"
            >
              <h2 class="text-xl font-extrabold text-(--ui-text-highlighted) mb-1">
                {{ step === 1 ? 'Validate 100 records free' : 'Almost done' }}
              </h2>
              <p class="text-sm text-(--ui-text-muted)">
                {{ step === 1
                  ? 'Results in minutes. No credit card. No SFTP.'
                  : 'Set up your workspace and get instant access.' }}
              </p>
            </div>
            <div
              v-else
              key="h-done"
            >
              <h2 class="text-xl font-extrabold text-(--ui-text-highlighted) mb-1">
                You're in. 🎉
              </h2>
              <p class="text-sm text-(--ui-text-muted)">
                Your free account is ready — 100 validations waiting.
              </p>
            </div>
          </Transition>

          <!-- Step dots -->
          <div
            v-if="!submitted"
            class="flex items-center gap-2 mt-4"
          >
            <div
              v-for="s in 2"
              :key="s"
              class="h-1.5 rounded-full transition-all duration-300"
              :class="s === step ? 'w-6 bg-primary' : s < step ? 'w-4 bg-primary/40' : 'w-4 bg-(--ui-border)'"
            />
          </div>
        </div>

        <!-- ── Body ─────────────────────────────────────────────────── -->
        <div class="px-6 py-6">
          <Transition
            name="step-slide"
            mode="out-in"
          >
            <!-- Step 1: Email ─────────────────────────────────────── -->
            <div
              v-if="step === 1 && !submitted"
              key="s1"
              class="space-y-4"
            >
              <!-- SSO buttons -->
              <div class="grid grid-cols-2 gap-3">
                <button class="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-(--ui-border) bg-(--ui-bg) hover:bg-(--ui-bg-elevated) hover:border-primary/30 transition-all text-sm font-medium text-(--ui-text)">
                  <svg
                    class="w-4 h-4"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Google</span>
                </button>
                <button class="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-(--ui-border) bg-(--ui-bg) hover:bg-(--ui-bg-elevated) hover:border-primary/30 transition-all text-sm font-medium text-(--ui-text)">
                  <svg
                    class="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4c-.2 1.3-1 2.4-2.1 3.1v2.6h3.4c2-1.8 3.1-4.5 2.9-7.5z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 22c2.7 0 5-.9 6.7-2.4l-3.3-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.2H3v2.6C4.8 19.8 8.1 22 12 22z"
                      fill="#34A853"
                    />
                    <path
                      d="M6.4 13.9c-.2-.6-.3-1.2-.3-1.9s.1-1.3.3-1.9V7.5H3C2.4 8.7 2 10.3 2 12s.4 3.3 1 4.5l3.4-2.6z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.4c1.5 0 2.8.5 3.8 1.5l2.9-2.9C16.9 2.4 14.6 1.4 12 1.4 8.1 1.4 4.8 3.6 3 7l3.4 2.6c.8-2.4 3-4.2 5.6-4.2z"
                      fill="#EA4335"
                    />
                  </svg>
                  <span>Microsoft</span>
                </button>
              </div>

              <!-- Divider -->
              <div class="flex items-center gap-3">
                <div class="flex-1 h-px bg-(--ui-border)" />
                <span class="text-xs text-(--ui-text-dimmed) font-medium">or use work email</span>
                <div class="flex-1 h-px bg-(--ui-border)" />
              </div>

              <!-- Work email field -->
              <UFormField
                label="Work email"
                required
                :error="emailError"
              >
                <UInput
                  v-model="state.email"
                  type="email"
                  placeholder="you@yourcompany.com"
                  leading-icon="i-lucide-mail"
                  size="lg"
                  class="w-full"
                  :color="emailError ? 'error' : isBusinessEmail ? 'success' : undefined"
                  @keyup.enter="nextStep"
                />
              </UFormField>

              <!-- Live business email feedback -->
              <Transition name="fade">
                <div v-if="state.email && isValidEmail && !emailError">
                  <div
                    v-if="isPersonal"
                    class="flex items-center gap-2 text-xs text-warning bg-warning/10 border border-warning/20 px-3 py-2 rounded-lg"
                  >
                    <UIcon
                      name="i-lucide-alert-triangle"
                      class="w-3.5 h-3.5 flex-shrink-0"
                    />
                    Please use your work email — personal addresses are not eligible for the free trial.
                  </div>
                  <div
                    v-else
                    class="flex items-center gap-2 text-xs text-success bg-success/8 border border-success/20 px-3 py-2 rounded-lg"
                  >
                    <UIcon
                      name="i-lucide-check-circle-2"
                      class="w-3.5 h-3.5 flex-shrink-0"
                    />
                    Work email confirmed — you're eligible for 100 free validations.
                  </div>
                </div>
              </Transition>

              <!-- What you get -->
              <div class="p-4 rounded-xl bg-(--ui-bg-elevated) border border-(--ui-border) space-y-2.5">
                <p class="text-xs font-bold text-(--ui-text-highlighted) mb-3">
                  Your free account includes:
                </p>
                <div
                  v-for="item in [
                    { icon: 'i-lucide-map-pin', label: '100 validations', sub: 'Address + Email + Phone — your choice' },
                    { icon: 'i-lucide-zap', label: 'Results in minutes', sub: 'Not hours. Not days. Minutes.' },
                    { icon: 'i-lucide-code-2', label: 'Full API access', sub: 'REST API + CSV upload included' },
                    { icon: 'i-lucide-credit-card', label: 'No credit card required', sub: 'Start validating immediately' },
                  ]"
                  :key="item.label"
                  class="flex items-center gap-2.5"
                >
                  <div class="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <UIcon
                      :name="item.icon"
                      class="w-3.5 h-3.5 text-primary"
                    />
                  </div>
                  <div>
                    <span class="text-xs font-semibold text-(--ui-text-highlighted)">{{ item.label }}</span>
                    <span class="text-xs text-(--ui-text-muted)"> — {{ item.sub }}</span>
                  </div>
                </div>
              </div>

              <!-- Abuse note -->
              <p class="text-[11px] text-(--ui-text-dimmed) text-center leading-relaxed">
                Free trial is limited to 100 validations per organisation.
                Business email required to prevent abuse.
              </p>
            </div>

            <!-- Step 2: Details ───────────────────────────────────── -->
            <div
              v-else-if="step === 2 && !submitted"
              key="s2"
              class="space-y-4"
            >
              <!-- Email chip -->
              <div class="flex items-center gap-2 px-3 py-2 rounded-xl bg-(--ui-bg-elevated) border border-(--ui-border) text-sm">
                <UIcon
                  name="i-lucide-mail"
                  class="w-4 h-4 text-primary flex-shrink-0"
                />
                <span class="text-(--ui-text) truncate flex-1">{{ state.email }}</span>
                <button
                  class="text-xs text-primary hover:underline flex-shrink-0"
                  @click="step = 1"
                >
                  Change
                </button>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <UFormField
                  label="First name"
                  required
                  :error="errors.firstName"
                >
                  <UInput
                    v-model="state.firstName"
                    placeholder="Alex"
                    class="w-full"
                    :color="errors.firstName ? 'error' : undefined"
                  />
                </UFormField>
                <UFormField
                  label="Last name"
                  required
                  :error="errors.lastName"
                >
                  <UInput
                    v-model="state.lastName"
                    placeholder="Torres"
                    class="w-full"
                    :color="errors.lastName ? 'error' : undefined"
                  />
                </UFormField>
              </div>

              <UFormField
                label="Company name"
                required
                :error="errors.company"
              >
                <UInput
                  v-model="state.company"
                  placeholder="Acme Corp"
                  leading-icon="i-lucide-building-2"
                  class="w-full"
                  :color="errors.company ? 'error' : undefined"
                />
              </UFormField>

              <UFormField
                label="Password"
                required
                :error="errors.password"
              >
                <UInput
                  v-model="state.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Min. 8 characters"
                  leading-icon="i-lucide-lock"
                  class="w-full"
                  :color="errors.password ? 'error' : undefined"
                >
                  <template #trailing>
                    <button
                      type="button"
                      class="text-(--ui-text-muted) hover:text-(--ui-text) transition-colors"
                      @click="showPassword = !showPassword"
                    >
                      <UIcon
                        :name="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                        class="w-4 h-4"
                      />
                    </button>
                  </template>
                </UInput>
              </UFormField>

              <!-- Password strength -->
              <div
                v-if="state.password"
                class="space-y-1.5"
              >
                <div class="flex gap-1">
                  <div
                    v-for="i in 4"
                    :key="i"
                    class="flex-1 h-1 rounded-full transition-all duration-300"
                    :class="i <= passwordStrength ? strengthColor : 'bg-(--ui-border)'"
                  />
                </div>
                <p
                  class="text-xs font-medium"
                  :class="strengthTextColor"
                >
                  {{ strengthLabel }} password
                </p>
              </div>
            </div>

            <!-- Success ────────────────────────────────────────────── -->
            <div
              v-else-if="submitted"
              key="success"
              class="flex flex-col items-center text-center py-4"
            >
              <div class="relative mb-5">
                <div class="w-16 h-16 rounded-full bg-success/15 flex items-center justify-center">
                  <UIcon
                    name="i-lucide-check-circle-2"
                    class="w-8 h-8 text-success"
                  />
                </div>
                <div class="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <UIcon
                    name="i-lucide-sparkles"
                    class="w-3.5 h-3.5 text-white"
                  />
                </div>
              </div>

              <h3 class="text-lg font-extrabold text-(--ui-text-highlighted) mb-2">
                Welcome, {{ state.firstName }}!
              </h3>
              <p class="text-sm text-(--ui-text-muted) mb-6 max-w-xs">
                Your 100 free validations are ready.
                Drag and drop a file or make your first API call — results in minutes.
              </p>

              <!-- Next steps -->
              <div class="w-full space-y-2 mb-6 text-left">
                <div
                  v-for="(next, i) in [
                    { icon: 'i-lucide-upload', label: 'Upload a CSV file', sub: 'Drag and drop — up to 100 records' },
                    { icon: 'i-lucide-code-2', label: 'Make an API call', sub: 'Your API key is in the dashboard' },
                    { icon: 'i-lucide-download', label: 'Download clean results', sub: 'Enriched CSV ready in minutes' },
                  ]"
                  :key="next.label"
                  class="flex items-center gap-3 p-3 rounded-xl border border-(--ui-border) bg-(--ui-bg-elevated)"
                >
                  <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <UIcon
                      :name="next.icon"
                      class="w-4 h-4 text-primary"
                    />
                  </div>
                  <div>
                    <div class="text-sm font-semibold text-(--ui-text-highlighted)">
                      {{ next.label }}
                    </div>
                    <div class="text-xs text-(--ui-text-muted)">
                      {{ next.sub }}
                    </div>
                  </div>
                  <div class="ml-auto w-5 h-5 rounded-full border-2 border-(--ui-border) flex items-center justify-center flex-shrink-0 text-xs font-bold text-(--ui-text-dimmed)">
                    {{ i + 1 }}
                  </div>
                </div>
              </div>

              <UButton
                block
                size="lg"
                label="Go to dashboard"
                trailing-icon="i-lucide-arrow-right"
                class="shadow-lg shadow-primary/20"
                @click="closeAndReset"
              />

              <!-- API docs nudge for developers -->
              <a
                href="/developers"
                class="flex items-center justify-center gap-1.5 text-xs text-(--ui-text-dimmed) hover:text-primary transition-colors mt-2"
              >
                <UIcon
                  name="i-lucide-code-2"
                  class="w-3.5 h-3.5"
                />
                View API documentation →
              </a>
            </div>
          </Transition>
        </div>

        <!-- ── Footer ───────────────────────────────────────────────── -->
        <div
          v-if="!submitted"
          class="px-6 pb-6 space-y-3"
        >
          <!-- Legal consent — shown only on step 2, just above the CTA -->
          <Transition name="fade">
            <p
              v-if="step === 2"
              class="text-[11px] text-(--ui-text-dimmed) leading-relaxed text-center px-1"
            >
              By clicking "Create free account" you agree to the DQE
              <a
                href="/legal/subscription"
                class="text-primary hover:underline font-medium"
              >Subscription&nbsp;Agreement</a>,
              <a
                href="/legal/terms"
                class="text-primary hover:underline font-medium"
              >Terms&nbsp;of&nbsp;Service</a>,
              and
              <a
                href="/legal/privacy"
                class="text-primary hover:underline font-medium"
              >Privacy&nbsp;Policy</a>.
            </p>
          </Transition>

          <div class="flex items-center justify-between gap-3">
            <p class="text-xs text-(--ui-text-dimmed)">
              Already have an account?
              <a
                href="/login"
                class="text-primary font-semibold hover:underline"
              >Sign in</a>
            </p>

            <!-- Step 1 CTA -->
            <UButton
              v-if="step === 1"
              label="Continue"
              trailing-icon="i-lucide-arrow-right"
              :disabled="!isBusinessEmail"
              @click="nextStep"
            />

            <!-- Step 2 CTA -->
            <UButton
              v-else
              label="Create free account"
              leading-icon="i-lucide-shield-check"
              :loading="submitting"
              :disabled="!state.firstName || !state.lastName || !state.company || !state.password"
              class="shadow-lg shadow-primary/20"
              @click="submit"
            />
          </div>
        </div>
      </div>
    </template>
  </UModal>
</template>

<style scoped>
.step-slide-enter-active,
.step-slide-leave-active {
  transition: opacity 0.22s ease, transform 0.22s ease;
}
.step-slide-enter-from { opacity: 0; transform: translateX(18px);  }
.step-slide-leave-to   { opacity: 0; transform: translateX(-18px); }

.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to       { opacity: 0; }
</style>
