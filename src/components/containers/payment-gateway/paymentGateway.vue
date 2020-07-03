<template>
  <div class="payment">
      <div class="content">
          <div v-if="hasCardOnFile">
              <p>Your card ending in {{defaultPaymentMethod.object == "card" ? defaultPaymentMethod.last4 : "unknown"}} will be charged ${{amount}}</p>
              <p v-for="method in paymentMethods" :key="method.id">{{method.object == "card" ? method.last4 : "unknown"}}</p>
              <button @click="continueCheckout">Continue</button>
          </div>
          <Card v-else :amount="amount"/>
      </div>
  </div>
</template>

<script>
import Card from './components/card/card'
import axios from 'axios'

export default {
    data() {
        return {
            defaultMethod: "",
            paymentMethods: []
        }
    },
    mounted() {
        axios.get('https://us-central1-acm-test-e80ed.cloudfunctions.net/app/customer-payment-methods', {headers: {
            'Authorization': "Bearer " + this.$store.getters.getAuth.token
        }}).then(({data}) => {
            this.paymentMethods = data.sources
            this.defaultMethod = data.defaultCard
        })
    },
    components: {
        Card
    },
    computed: {
        amount() {
            return 200
        },
        hasCardOnFile() {
            return this.$store.getters.hasCardOnFile
        },
        defaultPaymentMethod() {
            const defaultMethod = this.paymentMethods.find(p => p.id == this.defaultMethod)
            return defaultMethod || {object: ""}
        }
    },
    methods: {
        continueCheckout() {
            this.$router.push("/test")
        }
    }
}
</script>

<style lang="scss" scopped>

.payment {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.content {
  padding: 12px;
  @media(min-width: 1200px) {
    width: 1200px;
    margin: auto;
  }
  font-family: 'Roboto', sans-serif;
}

</style>