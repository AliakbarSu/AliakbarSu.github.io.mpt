<template>
     <!-- Profile dropdown -->
     <Menu as="div" class="relative ml-3">
              <div>
                <MenuButton class="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  <span class="sr-only">Open user menu</span>
                  <img class="h-8 w-8 rounded-full" :src="user.picture" alt="" />
                </MenuButton>
              </div>
              <transition enter-active-class="transition ease-out duration-200" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <MenuItem v-slot="{ active }">
                    <a href="#" @click="goTo('/account')" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Settings</a>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']" @click="logout">Sign out</a>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
</template>

<script lang="ts" >
import { user } from '@/store/user';
import {  Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'

export default {
  data() {
    return {
      user: this.$auth0.user.value
    }
  },
  methods: {
    logout() {
      this.$auth0.logout({ logoutParams: { returnTo: window.location.origin } });
    },
    goTo(link: string) {
      this.$router.push(link)
    }
  },
  components: {
    Menu, MenuButton, MenuItem, MenuItems
  }
}
</script>