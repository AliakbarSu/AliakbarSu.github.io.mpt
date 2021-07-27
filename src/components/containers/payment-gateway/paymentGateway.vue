<template>

<v-container
      class="grey lighten-5 mb-6"
    >
    <v-row>
        <v-col>
            <h1>Your Billing Summary</h1>
        </v-col>
    </v-row>
    <v-row>
        <v-col>
           <p><span>Item: </span>Australian Medical Test</p>
        </v-col>
        <v-col>
           <p><span>Price: </span>$25 USD</p>
        </v-col>
    </v-row>
    <v-row>
        <v-col>
           <Card :amount="amount" @pay="payWithNewCard"/>
        </v-col>
    </v-row>

    </v-container>
  <!-- <div class="payment">
        <div class="content">
          <div class="content__left">
            <Card :amount="amount" @pay="payWithNewCard"/>
          </div>
          <div class="content__right">
            <div v-if="!paymentMethods.length && hasCardOnFile" class="spinner__container">
                <Jumper></Jumper>
            </div>
            <p v-if="!hasCardOnFile">You don't have any card saved on file. Enter a new credit card details to save it for future purchases.</p>
            <div v-if="hasCardOnFile" class="p-cards__container">
                <div class="p-cards">
                    <div v-for="method in paymentMethods" :key="method.id" class="p-card" :class="{'p-card--default': isDefault(method.id)}">
                        <div class="p-card__details">
                            <div class="p-card__image"><img class="p-card__img" :src="getThumbnail(method.brand)"></div>
                            <p>Ending In <span class="p-card__strong">{{method.object == "card" ? method.last4 : "unknown"}}</span></p>
                            <p>Expires <span class="p-card__strong">{{method.exp_month}}/{{method.exp_year}}</span></p>
                            <p class="p-card__strong">{{method.name}}</p>
                            <div class="p-card__controls">
                                <button class="p-card__btn" @click="makeDefault(method)">Make Default</button>
                                <span> | </span>
                                <button class="p-card__btn" @click="deleteCard(method.id)">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="default__content" v-if="hasCardOnFile">
                <p class="default__text">Your card ending in {{defaultPaymentMethod.object == "card" ? defaultPaymentMethod.last4 : "unknown"}} will be charged ${{amount}}</p>
                <button class="continue__btn" @click="payWithDefaultCard">Continue with default card</button>
            </div>
        </div>
      </div>
  </div> -->
</template>

<script>
import Card from './components/card/card'
import axios from 'axios'
import firebase from '../../../../firebase'
// import Jumper from 'vue-loading-spinner/src/components/Jumper'
import firestore from '../../../../firebase'

export default {
    data() {
        return {
            defaultMethod: "",
            paymentMethods: [],
            amount: 0
        }
    },
    async created() {
        const data = await firestore.db.collection("prices").doc("amc").get()
        if(data.exists) {
            const pricesData = data.data()
            this.amount = pricesData.base
        }  
    },
    async mounted() {
        const url = 'https://us-central1-acm-test-e80ed.cloudfunctions.net/app/customer-payment-methods'
        const token = await firebase.auth.currentUser.getIdToken()
        axios.get(url, {headers: {'Authorization': "Bearer " + token }}).then(({data}) => {
            this.paymentMethods = data.sources
            this.defaultMethod = data.defaultCard
        })
    },
    components: {
        Card,
        // Jumper
    },
    computed: {
        hasCardOnFile() {
            return this.$store.getters.hasCardOnFile
        },
        defaultPaymentMethod() {
            const defaultMethod = this.paymentMethods.find(p => p.id == this.defaultMethod)
            return defaultMethod || {object: ""}
        }
    },
    methods: {
        payWithNewCard(result) {
            const cardToken = result.token.id;
            this.$store.dispatch("payForTest", cardToken).then(res => {
                console.log(res)
                this.$router.push("/")
            })
        },
        async payWithDefaultCard() {
            const url = "https://us-central1-acm-test-e80ed.cloudfunctions.net/app/pay"
            const token = await firebase.auth.currentUser.getIdToken()
            axios.post(url, {}, {headers: {'Authorization': "Bearer " + token }}).then(() => {
                this.$router.push("/test")
            }).catch(err => {
                console.log(err)
            })
        },
        getThumbnail(brand) {
            switch(brand) {
                case "Visa":
                    return "https://www.visa.co.nz/dam/VCOM/regional/lac/ENG/Default/Partner%20With%20Us/Payment%20Technology/visapos/full-color-800x450.jpg"
                case "Mastercard":
                    return "https://www.mastercard.co.nz/content/dam/mccom/global/logos/logo-mastercard-mobile.svg"
                case "Amex":
                    return "https://images.fastcompany.net/image/upload/w_596,c_limit,q_auto:best,f_auto/wp-cms/uploads/2018/04/4-you-might-not-notice-amex-new-brand.jpg"
                case "Unionpay":
                    return "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/UnionPay_logo.svg/1280px-UnionPay_logo.svg.png"
                case "Jcb":
                    return "https://zeinjcb.weebly.com/uploads/2/5/9/5/25951086/2514526_orig.jpg"
                case "Discover":
                    return "https://w7.pngwing.com/pngs/250/101/png-transparent-discover-financial-services-discover-card-credit-card-american-express-bank-credit-card-text-orange-logo.png"
                case "Diners_club":
                    return "https://lh3.googleusercontent.com/proxy/TbmWAoqHwBaXi-866B5TAVIo35Kdn-smfHtt0vy94AOf1XTOyfl3uktozC7_71csJQ7CqxCksrtnkX06-9JWYczZygFwKshXMyUU6zrVvVZkyCa6BGeEF35SrkVAN8ddqUin7tA"
                case "Cartes_bancaires":
                    return "https://storage.googleapis.com/adforum-media/34506363/ad_34506363_b0b0831318b62c47_web.jpg"
                default:
                    return "https://www.sonalia.com/wp-content/uploads/2019/04/credit_card_logo.png"
            }
        },
        isDefault(cardId) {
            return cardId == this.defaultMethod
        },
        async makeDefault(source) {
            const url = "https://us-central1-acm-test-e80ed.cloudfunctions.net/app/make-default-source"
            const token = await firebase.auth.currentUser.getIdToken()
            axios.post(url, {source: source.id}, {headers: {'Authorization': "Bearer " + token }}).then(() => {
                this.defaultMethod = source.id
            }).catch(err => {
                console.log(err)
            })
        },
        async deleteCard(sourceId) {
            const url = "https://us-central1-acm-test-e80ed.cloudfunctions.net/app/delete-source"
            const token = await firebase.auth.currentUser.getIdToken()
            axios.post(url, {source: sourceId}, {headers: {'Authorization': "Bearer " + token }}).then(() => {
                this.paymentMethods = this.paymentMethods.filter(p => p.id != sourceId)
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style lang="scss" scoped>

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
    display: flex;
  }
  font-family: 'Roboto', sans-serif;
}


.p-cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.p-card {
    position: relative;
    width: 250px;
    border: 4px solid #bfbfbf;
    border-radius: 5px;
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
}

.p-card--default {
    border: 4px solid #45bf5f;
}

.p-card__details {
    text-align: left;
    padding: 12px;
    width: 100%;
}

.p-card__controls {
    display: flex;
    justify-content: flex-end;
    display: flex;
    align-items: center;
}

.p-card__btn {
    border: none;
    outline: none;
    background: none;
    border-radius: 5px;
    padding: 4px;
    cursor: pointer;
    text-decoration: underline;
    &:hover {
        color: grey;
        transition: 0.3s;
    }
}

.p-card__image {
    position: absolute;
    top: 5px;
    right: 5px;
    height: 25px;
}

.p-card__img {
    height: 100%;
}

.p-card__strong {
    font-weight: 800;
}

.content__right, .content__left {
    width: 50%;
    padding: 20px;
}

.content__right {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: space-between;
}

.spinner__container {
    display: flex;
    justify-content: center;
    width: 100%;
}

.continue__btn {
    position: relative;
    overflow: hidden;
    border: 2px solid #45bf5f;
    background-color: #45bf5f;
    padding: 12px;
    width: 200px;
    color: white;
    border-radius: 5px;
    outline: none;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    cursor: pointer;
    &:hover {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
        transition: 0.3s;
    }
}

.continue__btn:after {
  content: "";
  background: #f1f1f1;
  display: block;
  position: absolute;
  padding-top: 300%;
  padding-left: 350%;
  margin-left: -20px !important;
  margin-top: -120%;
  opacity: 0;
  transition: all 0.8s
}

.continue__btn:active:after {
  padding: 0;
  margin: 0;
  opacity: 1;
  transition: 0s
}

.default__content {
    text-align: left;
}

.default__text {
}

</style>