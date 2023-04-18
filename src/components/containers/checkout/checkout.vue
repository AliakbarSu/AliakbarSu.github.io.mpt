<!-- <template>
  <v-container>
    <p>This is checkout</p>
    <button @click="payWithNewCard">Continue To Pay</button>
  </v-container>
</template>

<script lang="ts">
export default {
  methods: {
    payWithNewCard() {
      this.$store
        .dispatch('bookTest', {
          productId: this.$route.params.testId,
          userId: this.$auth.user.sub,
          userEmail: this.$auth.user.email
        })
        .then((url) => {
          if (url) {
            window.location.href = url
          } else {
            alert('Something went wrong try again!')
          }
        })
    }
  }
}
</script>

<style></style> -->

<!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<template>
  <!--
    This example requires updating your template:

    ```
    <html class="h-full bg-white">
    <body class="h-full">
    ```
  -->
  <main class="lg:flex lg:min-h-full lg:flex-row-reverse lg:overflow-hidden">
    <h1 class="sr-only">Checkout</h1>

    <!-- Mobile order summary -->
    <section aria-labelledby="order-heading" class="bg-gray-50 px-4 py-6 sm:px-6 lg:hidden">
      <Disclosure as="div" class="mx-auto max-w-lg" v-slot="{ open }">
        <div class="flex items-center justify-between">
          <h2 id="order-heading" class="text-lg font-medium text-gray-900">Your Order</h2>
          <DisclosureButton class="font-medium text-indigo-600 hover:text-indigo-500">
            <span v-if="open">Hide full summary</span>
            <span v-if="!open">Show full summary</span>
          </DisclosureButton>
        </div>

        <DisclosurePanel>
          <ul role="list" class="divide-y divide-gray-200 border-b border-gray-200">
            <li v-for="product in products" :key="product.id" class="flex space-x-6 py-6">
              <img :src="product.imageSrc" :alt="product.imageAlt" class="h-40 w-40 flex-none rounded-md bg-gray-200 object-cover object-center" />
              <div class="flex flex-col justify-between space-y-4">
                <div class="space-y-1 text-sm font-medium">
                  <h3 class="text-gray-900">{{ product.name }}</h3>
                  <p class="text-gray-900">{{ product.price }}</p>
                  <p class="text-gray-500">{{ product.color }}</p>
                  <p class="text-gray-500">{{ product.size }}</p>
                </div>
                <div class="flex space-x-4">
                  <button type="button" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">Edit</button>
                  <div class="flex border-l border-gray-300 pl-4">
                    <button type="button" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
                  </div>
                </div>
              </div>
            </li>
          </ul>

          <form class="mt-10">
            <label for="discount-code-mobile" class="block text-sm font-medium text-gray-700">Discount code</label>
            <div class="mt-1 flex space-x-4">
              <input type="text" id="discount-code-mobile" name="discount-code-mobile" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              <button type="submit" class="rounded-md bg-gray-200 px-4 text-sm font-medium text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">Apply</button>
            </div>
          </form>

          <dl class="mt-10 space-y-6 text-sm font-medium text-gray-500">
            <div class="flex justify-between">
              <dt>Subtotal</dt>
              <dd class="text-gray-900">{{ subtotal }}</dd>
            </div>
            <div class="flex justify-between">
              <dt class="flex">
                Discount
                <span class="ml-2 rounded-full bg-gray-200 px-2 py-0.5 text-xs tracking-wide text-gray-600">{{ discount.code }}</span>
              </dt>
              <dd class="text-gray-900">-{{ discount.amount }}</dd>
            </div>
            <div class="flex justify-between">
              <dt>Taxes</dt>
              <dd class="text-gray-900">{{ taxes }}</dd>
            </div>
            <div class="flex justify-between">
              <dt>Shipping</dt>
              <dd class="text-gray-900">{{ shipping }}</dd>
            </div>
          </dl>
        </DisclosurePanel>

        <p class="mt-6 flex items-center justify-between border-t border-gray-200 pt-6 text-sm font-medium text-gray-900">
          <span class="text-base">Total</span>
          <span class="text-base">{{ total }}</span>
        </p>
      </Disclosure>
    </section>

    <!-- Order summary -->
    <section aria-labelledby="summary-heading" class="hidden w-full max-w-md flex-col bg-gray-50 lg:flex">
      <h2 id="summary-heading" class="sr-only">Order summary</h2>

      <ul role="list" class="flex-auto divide-y divide-gray-200 overflow-y-auto px-6">
        <li v-for="product in products" :key="product.id" class="flex space-x-6 py-6">
          <img :src="product.imageSrc" :alt="product.imageAlt" class="h-40 w-40 flex-none rounded-md bg-gray-200 object-cover object-center" />
          <div class="flex flex-col justify-between space-y-4">
            <div class="space-y-1 text-sm font-medium">
              <h3 class="text-gray-900">{{ product.name }}</h3>
              <p class="text-gray-900">{{ product.price }}</p>
              <p class="text-gray-500">{{ product.color }}</p>
              <p class="text-gray-500">{{ product.size }}</p>
            </div>
          </div>
        </li>
      </ul>

      <div class="sticky bottom-0 flex-none border-t border-gray-200 bg-gray-50 p-6">
        <form>
          <label for="discount-code" class="block text-sm font-medium text-gray-700">Discount code</label>
          <div class="mt-1 flex space-x-4">
            <input type="text" id="discount-code" name="discount-code" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            <button type="submit" class="rounded-md bg-gray-200 px-4 text-sm font-medium text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">Apply</button>
          </div>
        </form>

        <dl class="mt-10 space-y-6 text-sm font-medium text-gray-500">
          <div class="flex justify-between">
            <dt>Subtotal</dt>
            <dd class="text-gray-900">{{ subtotal }}</dd>
          </div>
          <div class="flex justify-between">
            <dt class="flex">
              Discount
              <span class="ml-2 rounded-full bg-gray-200 px-2 py-0.5 text-xs tracking-wide text-gray-600">{{ discount.code }}</span>
            </dt>
            <dd class="text-gray-900">-{{ discount.amount }}</dd>
          </div>
          <div class="flex justify-between">
            <dt>Taxes</dt>
            <dd class="text-gray-900">{{ taxes }}</dd>
          </div>
          
          <div class="flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900">
            <dt>Total</dt>
            <dd class="text-base">{{ total }}</dd>
          </div>
        </dl>
      </div>
    </section>

    <!-- Checkout form -->
    <section aria-labelledby="payment-heading" class="flex-auto overflow-y-auto px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pb-24 lg:pt-0">
      <h2 id="payment-heading" class="sr-only">Payment and shipping details</h2>

      <div class="mx-auto max-w-lg lg:pt-16">


        <form class="mt-6">
          <div class="grid grid-cols-12 gap-x-4 gap-y-6">
            <div class="col-span-full">
              <label for="email-address" class="block text-sm font-medium text-gray-700">Email address</label>
              <div class="mt-1">
                <input type="email" id="email-address" name="email-address" autocomplete="email" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </div>
            </div>

            <div class="col-span-full">
              <label for="name-on-card" class="block text-sm font-medium text-gray-700">Name on card</label>
              <div class="mt-1">
                <input type="text" id="name-on-card" name="name-on-card" autocomplete="cc-name" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </div>
            </div>

            <div class="col-span-full">
              <label for="card-number" class="block text-sm font-medium text-gray-700">Card number</label>
              <div class="mt-1">
                <input type="text" id="card-number" name="card-number" autocomplete="cc-number" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </div>
            </div>

            <div class="col-span-8 sm:col-span-9">
              <label for="expiration-date" class="block text-sm font-medium text-gray-700">Expiration date (MM/YY)</label>
              <div class="mt-1">
                <input type="text" name="expiration-date" id="expiration-date" autocomplete="cc-exp" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </div>
            </div>

            <div class="col-span-4 sm:col-span-3">
              <label for="cvc" class="block text-sm font-medium text-gray-700">CVC</label>
              <div class="mt-1">
                <input type="text" name="cvc" id="cvc" autocomplete="csc" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </div>
            </div>

            <div class="col-span-full">
              <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
              <div class="mt-1">
                <input type="text" id="address" name="address" autocomplete="street-address" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </div>
            </div>

            <div class="col-span-full sm:col-span-4">
              <label for="city" class="block text-sm font-medium text-gray-700">City</label>
              <div class="mt-1">
                <input type="text" id="city" name="city" autocomplete="address-level2" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </div>
            </div>

            <div class="col-span-full sm:col-span-4">
              <label for="region" class="block text-sm font-medium text-gray-700">State / Province</label>
              <div class="mt-1">
                <input type="text" id="region" name="region" autocomplete="address-level1" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </div>
            </div>

            <div class="col-span-full sm:col-span-4">
              <label for="postal-code" class="block text-sm font-medium text-gray-700">Postal code</label>
              <div class="mt-1">
                <input type="text" id="postal-code" name="postal-code" autocomplete="postal-code" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </div>
            </div>
          </div>

          <div class="mt-6 flex space-x-2">
            <div class="flex h-5 items-center">
              <input id="same-as-shipping" name="same-as-shipping" type="checkbox" checked class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
            </div>
            <label for="same-as-shipping" class="text-sm font-medium text-gray-900">Billing address is the same as shipping address</label>
          </div>

          <button type="submit" class="mt-6 w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Pay {{ total }}</button>

          <p class="mt-6 flex justify-center text-sm font-medium text-gray-500">
            <LockClosedIcon class="mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            Payment details stored in plain text
          </p>
        </form>
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { LockClosedIcon } from '@heroicons/vue/20/solid'

const subtotal = '$108.00'
const discount = { code: 'CHEAPSKATE', amount: '$16.00' }
const taxes = '$9.92'
const shipping = '$8.00'
const total = '$141.92'
const products = [
  {
    id: 1,
    name: 'Mountain Mist Artwork Tee',
    href: '#',
    price: '$36.00',
    color: 'Birch',
    size: 'L',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/checkout-form-04-product-01.jpg',
    imageAlt: 'Off-white t-shirt with circular dot illustration on the front of mountain ridges that fade.',
  },
  // More products...
]
</script>
