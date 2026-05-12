<script setup lang="ts">
import { ref, computed } from 'vue'
import { CalendarDate, today, getLocalTimeZone } from '@internationalized/date'

const open = defineModel<boolean>('open', { default: false })

// ── Steps ─────────────────────────────────────────────────────────────────
const step = ref<1 | 2 | 3>(1)

// ── Step 1 — Pick a date ──────────────────────────────────────────────────
const todayDate = today(getLocalTimeZone())
const selectedDate = ref<CalendarDate | undefined>(undefined)

// Disable past dates + weekends
function isDateDisabled(date: CalendarDate) {
  if (date.compare(todayDate) < 0) return true
  const jsDate = new Date(date.year, date.month - 1, date.day)
  const day = jsDate.getDay()
  return day === 0 || day === 6 // Sunday = 0, Saturday = 6
}

// ── Step 2 — Pick a time slot ─────────────────────────────────────────────
const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '1:00 PM',  '1:30 PM',
  '2:00 PM',  '2:30 PM',  '3:00 PM',  '3:30 PM',
  '4:00 PM',  '4:30 PM',
]
// Randomly mark some as taken so it looks real
const takenSlots = ['9:30 AM', '11:00 AM', '2:00 PM', '4:00 PM']
const selectedTime = ref<string | undefined>(undefined)

// ── Step 3 — Contact form ─────────────────────────────────────────────────
const form = ref({
  firstName: '',
  lastName:  '',
  email:     '',
  company:   '',
  teamSize:  '',
  message:   '',
})

const teamSizes = [
  { label: '1–10 people',    value: '1-10'    },
  { label: '11–50 people',   value: '11-50'   },
  { label: '51–200 people',  value: '51-200'  },
  { label: '200+ people',    value: '200+'    },
]

const submitted = ref(false)
const submitting = ref(false)

// ── Helpers ───────────────────────────────────────────────────────────────
const formattedDate = computed(() => {
  if (!selectedDate.value) return ''
  const d = new Date(
    selectedDate.value.year,
    selectedDate.value.month - 1,
    selectedDate.value.day,
  )
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
})

const canProceedStep1 = computed(() => !!selectedDate.value)
const canProceedStep2 = computed(() => !!selectedTime.value)
const canProceedStep3 = computed(() =>
  form.value.firstName &&
  form.value.lastName &&
  form.value.email &&
  form.value.company
)

function nextStep() {
  if (step.value < 3) step.value = (step.value + 1) as 1 | 2 | 3
}

function prevStep() {
  if (step.value > 1) step.value = (step.value - 1) as 1 | 2 | 3
}

async function submit() {
  submitting.value = true
  await new Promise(r => setTimeout(r, 1600))
  submitting.value = false
  submitted.value = true
}

function closeAndReset() {
  open.value = false
  setTimeout(() => {
    step.value = 1
    selectedDate.value = undefined
    selectedTime.value = undefined
    form.value = { firstName: '', lastName: '', email: '', company: '', teamSize: '', message: '' }
    submitted.value = false
  }, 400)
}

const steps = [
  { num: 1, label: 'Pick a date'  },
  { num: 2, label: 'Choose time'  },
  { num: 3, label: 'Your details' },
]
</script>

<template>
  <UModal
    v-model:open="open"
    :dismissible="!submitting"
    :ui="{ content: 'max-w-2xl' }"
  >
    <template #content>
      <div class="flex flex-col">
        <!-- ── Header ──────────────────────────────────────────────────── -->
        <div class="relative px-6 pt-6 pb-5 border-b border-(--ui-border)">
          <!-- Close -->
          <button
            class="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-(--ui-text-muted) hover:text-(--ui-text-highlighted) hover:bg-(--ui-bg-elevated) transition-all"
            @click="closeAndReset"
          >
            <UIcon
              name="i-lucide-x"
              class="w-4 h-4"
            />
          </button>

          <!-- Brand -->
          <div class="flex items-center gap-2 mb-4">
            <div class="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <UIcon
                name="i-lucide-git-merge"
                class="w-4 h-4 text-white"
              />
            </div>
            <span class="font-bold text-sm text-(--ui-text-highlighted)">Deduply</span>
          </div>

          <h2 class="text-xl font-extrabold text-(--ui-text-highlighted) mb-1">
            Book a 30-min demo
          </h2>
          <p class="text-sm text-(--ui-text-muted)">
            See how Deduply cleans your CRM in real time — no prep needed.
          </p>

          <!-- Step indicators -->
          <div
            v-if="!submitted"
            class="flex items-center gap-2 mt-5"
          >
            <template
              v-for="(s, i) in steps"
              :key="s.num"
            >
              <div class="flex items-center gap-2">
                <div
                  class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 flex-shrink-0"
                  :class="step > s.num
                    ? 'bg-primary text-white'
                    : step === s.num
                      ? 'bg-primary/15 text-primary border-2 border-primary'
                      : 'bg-(--ui-bg-elevated) text-(--ui-text-muted) border border-(--ui-border)'"
                >
                  <UIcon
                    v-if="step > s.num"
                    name="i-lucide-check"
                    class="w-3.5 h-3.5"
                  />
                  <span v-else>{{ s.num }}</span>
                </div>
                <span
                  class="text-xs font-medium hidden sm:block transition-colors duration-300"
                  :class="step >= s.num ? 'text-(--ui-text)' : 'text-(--ui-text-dimmed)'"
                >{{ s.label }}</span>
              </div>
              <!-- Connector -->
              <div
                v-if="i < steps.length - 1"
                class="flex-1 h-px transition-all duration-500"
                :class="step > s.num ? 'bg-primary' : 'bg-(--ui-border)'"
              />
            </template>
          </div>
        </div>

        <!-- ── Body ────────────────────────────────────────────────────── -->
        <div class="px-6 py-6 min-h-[340px]">
          <Transition
            name="step-slide"
            mode="out-in"
          >
            <!-- Step 1: Calendar -->
            <div
              v-if="step === 1 && !submitted"
              key="step1"
            >
              <p class="text-sm font-semibold text-(--ui-text-highlighted) mb-4">
                Select a date for your demo
              </p>
              <div class="flex justify-center">
                <UCalendar
                  v-model="selectedDate"
                  :min-value="todayDate"
                  :is-date-disabled="isDateDisabled"
                  color="primary"
                  size="md"
                  class="w-full"
                />
              </div>
              <div
                v-if="selectedDate"
                class="mt-4 flex items-center gap-2 text-sm text-primary bg-primary/10 px-4 py-2.5 rounded-xl"
              >
                <UIcon
                  name="i-lucide-calendar-check"
                  class="w-4 h-4"
                />
                <span><strong>{{ formattedDate }}</strong> selected</span>
              </div>
            </div>

            <!-- Step 2: Time slots -->
            <div
              v-else-if="step === 2 && !submitted"
              key="step2"
            >
              <div class="flex items-center gap-2 mb-5">
                <UIcon
                  name="i-lucide-calendar"
                  class="w-4 h-4 text-primary"
                />
                <p class="text-sm font-semibold text-(--ui-text-highlighted)">
                  {{ formattedDate }} — Pick a time
                </p>
                <UBadge
                  size="xs"
                  color="neutral"
                  variant="soft"
                  label="30 min"
                  class="ml-auto"
                />
              </div>

              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  v-for="slot in timeSlots"
                  :key="slot"
                  :disabled="takenSlots.includes(slot)"
                  class="relative px-3 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 text-center"
                  :class="takenSlots.includes(slot)
                    ? 'opacity-40 cursor-not-allowed border-(--ui-border) text-(--ui-text-dimmed) line-through'
                    : selectedTime === slot
                      ? 'border-primary bg-primary/10 text-primary font-bold shadow-sm shadow-primary/20'
                      : 'border-(--ui-border) text-(--ui-text) hover:border-primary/40 hover:text-primary hover:bg-primary/5'"
                  @click="!takenSlots.includes(slot) && (selectedTime = slot)"
                >
                  {{ slot }}
                  <span
                    v-if="takenSlots.includes(slot)"
                    class="absolute -top-1.5 -right-1.5 text-[9px] bg-(--ui-bg-accented) text-(--ui-text-dimmed) px-1 rounded-full"
                  >Full</span>
                </button>
              </div>

              <div
                v-if="selectedTime"
                class="mt-4 flex items-center gap-2 text-sm text-primary bg-primary/10 px-4 py-2.5 rounded-xl"
              >
                <UIcon
                  name="i-lucide-clock"
                  class="w-4 h-4"
                />
                <span><strong>{{ formattedDate }}</strong> at <strong>{{ selectedTime }}</strong></span>
              </div>
            </div>

            <!-- Step 3: Contact form -->
            <div
              v-else-if="step === 3 && !submitted"
              key="step3"
            >
              <!-- Booking summary pill -->
              <div class="flex items-center gap-3 p-3 rounded-xl bg-(--ui-bg-elevated) border border-(--ui-border) mb-6">
                <div class="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <UIcon
                    name="i-lucide-calendar-check"
                    class="w-4 h-4 text-primary"
                  />
                </div>
                <div>
                  <div class="text-sm font-bold text-(--ui-text-highlighted)">
                    {{ formattedDate }} · {{ selectedTime }}
                  </div>
                  <div class="text-xs text-(--ui-text-muted)">
                    30-minute product demo · Google Meet
                  </div>
                </div>
                <UBadge
                  size="xs"
                  color="success"
                  variant="soft"
                  label="Confirmed"
                  class="ml-auto"
                />
              </div>

              <div class="grid grid-cols-2 gap-4">
                <UFormField
                  label="First name"
                  required
                >
                  <UInput
                    v-model="form.firstName"
                    placeholder="Alicia"
                    leading-icon="i-lucide-user"
                    class="w-full"
                  />
                </UFormField>

                <UFormField
                  label="Last name"
                  required
                >
                  <UInput
                    v-model="form.lastName"
                    placeholder="Torres"
                    class="w-full"
                  />
                </UFormField>

                <UFormField
                  label="Work email"
                  required
                  class="col-span-2"
                >
                  <UInput
                    v-model="form.email"
                    type="email"
                    placeholder="alicia@meridian.com"
                    leading-icon="i-lucide-mail"
                    class="w-full"
                  />
                </UFormField>

                <UFormField
                  label="Company"
                  required
                >
                  <UInput
                    v-model="form.company"
                    placeholder="Meridian SaaS"
                    leading-icon="i-lucide-building-2"
                    class="w-full"
                  />
                </UFormField>

                <UFormField label="Team size">
                  <USelect
                    v-model="form.teamSize"
                    :items="teamSizes"
                    placeholder="Select…"
                    class="w-full"
                  />
                </UFormField>

                <UFormField
                  label="Anything you'd like us to know?"
                  class="col-span-2"
                >
                  <UTextarea
                    v-model="form.message"
                    placeholder="We have 80K contacts in HubSpot with a lot of duplicates from old imports…"
                    :rows="3"
                    class="w-full"
                  />
                </UFormField>
              </div>
            </div>

            <!-- Success state -->
            <div
              v-else-if="submitted"
              key="success"
              class="flex flex-col items-center justify-center text-center py-6"
            >
              <div class="w-16 h-16 rounded-full bg-success/15 flex items-center justify-center mb-5">
                <UIcon
                  name="i-lucide-check-circle-2"
                  class="w-8 h-8 text-success"
                />
              </div>
              <h3 class="text-xl font-extrabold text-(--ui-text-highlighted) mb-2">
                You're booked! 🎉
              </h3>
              <p class="text-(--ui-text-muted) text-sm max-w-sm mb-6">
                A calendar invite has been sent to <strong class="text-(--ui-text)">{{ form.email }}</strong>.
                We'll see you on <strong class="text-(--ui-text)">{{ formattedDate }}</strong> at
                <strong class="text-(--ui-text)">{{ selectedTime }}</strong>.
              </p>

              <!-- Confirmation card -->
              <div class="w-full max-w-sm p-4 rounded-2xl border border-(--ui-border) bg-(--ui-bg-elevated) text-left space-y-3 mb-6">
                <div class="flex items-center gap-2 text-sm">
                  <UIcon
                    name="i-lucide-calendar"
                    class="w-4 h-4 text-primary flex-shrink-0"
                  />
                  <span class="text-(--ui-text)">{{ formattedDate }} · {{ selectedTime }}</span>
                </div>
                <div class="flex items-center gap-2 text-sm">
                  <UIcon
                    name="i-lucide-clock"
                    class="w-4 h-4 text-primary flex-shrink-0"
                  />
                  <span class="text-(--ui-text)">30 minutes · Google Meet</span>
                </div>
                <div class="flex items-center gap-2 text-sm">
                  <UIcon
                    name="i-lucide-user"
                    class="w-4 h-4 text-primary flex-shrink-0"
                  />
                  <span class="text-(--ui-text)">{{ form.firstName }} {{ form.lastName }} · {{ form.company }}</span>
                </div>
              </div>

              <UButton
                label="Close"
                variant="soft"
                @click="closeAndReset"
              />
            </div>
          </Transition>
        </div>

        <!-- ── Footer ──────────────────────────────────────────────────── -->
        <div
          v-if="!submitted"
          class="px-6 pb-6 flex items-center justify-between gap-3"
        >
          <UButton
            v-if="step > 1"
            variant="ghost"
            label="Back"
            leading-icon="i-lucide-arrow-left"
            @click="prevStep"
          />
          <div v-else />

          <div class="flex items-center gap-3">
            <!-- Trust micro-copy -->
            <span class="hidden sm:flex items-center gap-1.5 text-xs text-(--ui-text-dimmed)">
              <UIcon
                name="i-lucide-shield-check"
                class="w-3.5 h-3.5 text-success"
              />
              No spam, ever
            </span>

            <UButton
              v-if="step < 3"
              label="Continue"
              trailing-icon="i-lucide-arrow-right"
              :disabled="(step === 1 && !canProceedStep1) || (step === 2 && !canProceedStep2)"
              @click="nextStep"
            />
            <UButton
              v-else
              label="Confirm booking"
              leading-icon="i-lucide-calendar-check"
              :loading="submitting"
              :disabled="!canProceedStep3"
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
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.step-slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.step-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
