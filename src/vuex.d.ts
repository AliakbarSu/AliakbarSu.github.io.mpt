// vuex.d.ts
import { Store } from 'vuex'
import { Auth0Plugin } from '@auth0/auth0-vue'
import { Auth0VueClient } from '@auth0/auth0-vue'

declare module '@vue/runtime-core' {
  // declare your own store states
  interface State {
    count: number
    token: string
    userId: string
    status: string
    redirect: string
    currentTest: string[]
    testResult: { score: number }
    testHistory: string[]
    testId: string
    products: string[]
    user: {
      tests: string[]
      email: string
      name: string
      avatar: string
    }
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>
    $auth: Auth0VueClient<'Auth'>
  }
}
