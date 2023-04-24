<template>
  <main class="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">
    <div
      class="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none"
    >
      <div>
        <h2 class="text-base font-semibold leading-7 text-gray-900">
          Security
        </h2>
        <p class="mt-1 text-sm leading-6 text-gray-500">
          This information will be displayed publicly so be careful what you
          share.
        </p>

        <dl
          class="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6"
        >
          <div class="pt-6 sm:flex">
            <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
              Email Address
            </dt>
            <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <div class="text-gray-900">{{ profile?.email }}</div>
              <!-- <button
                disabled
                type="button"
                class="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Update
              </button> -->
            </dd>
          </div>
          <div class="pt-6 sm:flex">
            <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
              Password
            </dt>
            <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <div class="text-gray-900">*****************</div>
              <button
                @click="resetPassword"
                type="button"
                class="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Reset
              </button>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import type { Profile } from '@/types/user'
import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import axios from 'axios'

export default defineComponent({
  name: 'Security',
  props: {
    profile: {
      type: Object as PropType<Profile>
    }
  },
  methods: {
    async resetPassword() {
      const response = await axios.get(
        `${import.meta.env.VITE_API_ENDPOINT}/user/reset-password`
      )
      console.log(response)
      const link = response.data.body.ticket
      window.location.replace(link)
    }
  }
})
</script>
