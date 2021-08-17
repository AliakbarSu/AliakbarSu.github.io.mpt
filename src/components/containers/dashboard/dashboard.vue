<template>
<v-container
      class="grey lighten-5 mb-6"
    >
 
            <Tabs/>
            <p>You can select from one of the following test types to proceed</p>
      <BookedTests :tests="userTests" />
    </v-container>
  <!-- <div class="dashboard">
    <nav class="side__nav">
      <ul class="navbar">
        <li class="nav__item"><router-link to="/" tag="a">Dashboard</router-link></li>
        <li class="nav__item"><router-link to="/details" tag="a">Details</router-link></li>
        <li class="nav__item"><router-link to="/payments" tag="a">Payments</router-link></li>
        <li class="nav__item"><router-link to="/admin" tag="a">Admin</router-link></li>
        <li class="nav__item"><a href="" @click="logout">Logout</a></li>
      </ul>
      <div class="nav__button">
        <router-link to="/checkout" class="nav__btn" tag="button">New Test</router-link>
      </div>
    </nav>
    <div class="content">
      <div class="right__content">
        <div class="tiles__container">
          <div class="tiles tiles--orange">
            <p class="tiles__heading">Total Tests<p>
            <p class="tiles__text">{{totalTests}}</p>
          </div>
          <div class="tiles tiles--green">
            <p class="tiles__heading">Passed Tests<p>
            <p class="tiles__text">{{passedTests}}</p>
          </div>
          <div class="tiles tiles--red">
            <p class="tiles__heading">Failed Tests<p>
            <p class="tiles__text">{{failedTests}}</p>
          </div>
        </div>
        <div class="history">
          <p class="history__title">Tests History</p>
          <table class="history__table">
            <tr>
              <th>Type</th>
              <th>Date</th>
              <th>Result</th>
              <th>Action</th>
            </tr>
            <tr v-for="test in testsHistory" :key="test.id">
              <td>{{test.category}}</td>
              <td>{{getDate(test.date)}}</td>
              <td><span :class="{'text__green': !isFail(test.status), 'text__red': isFail(test.status)}">{{test.status}}</span></td>
              <td><button class="view__btn">View</button></td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div> -->
</template>

<script>
import Tabs from './components/tabs/tabs.vue'
import BookedTests from './components/bookedTests/bookedTests.vue'

export default {
  mounted() {
    const userId = this.$auth.user.sub.split("|")[1]
    this.$store.dispatch('fetchTests', userId)
  },
  methods: {
    takeTest(prodId) {
      const testId = prodId
      const userId = this.$auth.user.sub.split("|")[1]
      this.$store.dispatch("loadTest", {userId, testId}).then(() => {
        this.$router.push("/test")
      }).catch(err => {
        console.log("failed to load the test", err)
      })
    },
    logout() {
      this.$store.dispatch("logout")
    },
    getDate(dateToParse) {
      var time = new Date(dateToParse)
      var date = new Date(time)
      return date.toString()
    },
    isFail(status) {
      return status.toLowerCase() == "failed"
    }
  },
  components: {
    Tabs,
    BookedTests
  },
  computed: {
    totalTests() {
      return this.$store.getters.getUserTestData.totalTests
    },
    passedTests() {
      return this.$store.getters.getUserTestData.passedTests
    },
    failedTests() {
      return this.$store.getters.getUserTestData.failedTests
    },
    testsHistory() {
      return this.$store.getters.getUserTestData.testsHistory
    },
    userTests() {
      return this.$store.getters.userTests
    }
  }
}
</script>

<style lang="scss" scoped>

.dashboard {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-items: center;
  font-family: 'Roboto', sans-serif;
}


.content {
  padding: 12px;
  overflow-y: scroll;
  width: 85%;
  height: 100vh;
  // @media(min-width: 1200px) {
  //   max-width: 1200px;
  // }
}

.tiles__container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 12px;
}

.tiles {
  padding: 12px;
  border-radius: 5px;
  background: white;
  width: 250px;
  height: 150px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
}

.tiles--orange {
  background-color: #fbb432;
}

.tiles--green {
  background-color: #67a967;
}

.tiles--red {
  background-color: #ff3434;
}


.tiles__heading {
  font-size: 1.5em;
  width: 100%;
  margin: 0;
  padding: 12px;
  text-align: center;
}

.tiles__text {
  font-size: 2em;
  width: 100%;
  margin: 0;
  text-align: center;
  padding: 12px;
}


.history {
  padding: 20px;
  margin-top: 10%;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  max-height: 370px;
  overflow-y: scroll;
}

.history__title {
  font-size: 1.5em;
  text-align: left;
}

.history__table {
  width: 100%;
  border-collapse: collapse;
}

th {
  text-align: left;
  padding: 12px;
}

td {
  border-top: 1px solid #e6e6e6;
  padding: 12px;
  text-align: left;
}

.text__red {
  color: red;
}

.text__green {
  color: green;
}

.view__btn {
  background: no-repeat;
  border: none;
  background-color: #7b7bf7;
  padding: 2px 10px;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
}

.side__nav {
  width: 200px;
  height: 100%;
  background: #f7f7f7;
  position: relative;
}

.navbar {
  padding: 0;
  margin: 0;
  margin-top: 80%;
}

.nav__item {
  padding: 10px;
  font-size: 1.1em;
  border-bottom: 1px solid #e0e0e0;
}

.nav__item > a {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  &:hover {
    color: grey;
    transition: 0.3s;
  }
}

.nav__button {
  width: 100%;
  text-align: center;
  padding-top: 15px;
}

.nav__btn {
  border: none;
  width: 160px;
  padding: 12px 0;
  text-align: center;
  background: #67a967;
  color: white;
  font-size: 1.1em;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    color: #67a967;
    background-color: white;
    border: 1px solid #67a967;
    transition: 0.3s;
  }
}

</style>