<template>
  <Tabs v-on:tabClicked="activateTab">
    <v-tab-item>
      <v-container>
        <BookedTests
          v-on:takeTest="takeTest"
          v-if="isTabActive('bookedTests')"
          :tests="userTests"
        />
      </v-container>
    </v-tab-item>
    <v-tab-item>
      <v-container>
        <TestHistory :history="testHistory" v-if="isTabActive('testHistory')" />
      </v-container>
    </v-tab-item>
  </Tabs>
</template>

<script>
import Tabs from './components/tabs/tabs.vue'
import BookedTests from './components/bookedTests/bookedTests.vue'
import TestHistory from './components/UI/test-history/test-history.vue'

export default {
  mounted() {
    const userId = this.$auth.user.sub.split('|')[1]
    this.$store.dispatch('fetchTests', userId)
    this.$store.dispatch('fetchTestHistory', userId)
  },
  data() {
    return {
      tabs: [
        { name: 'bookedTests', active: true },
        { name: 'testHistory', active: false }
      ]
    }
  },
  methods: {
    takeTest(prodId) {
      const testId = prodId
      const userId = this.$auth.user.sub.split('|')[1]
      this.$store
        .dispatch('loadTest', { userId, testId })
        .then(() => {
          this.$router.push('/test')
        })
        .catch((err) => {
          console.log('failed to load the test', err)
        })
    },
    logout() {
      this.$store.dispatch('logout')
    },
    getDate(dateToParse) {
      var time = new Date(dateToParse)
      var date = new Date(time)
      return date.toString()
    },
    isFail(status) {
      return status.toLowerCase() == 'failed'
    },
    activateTab(clickedTab) {
      this.tabs = this.tabs.map((tb) => {
        if (tb.name.toLowerCase() == clickedTab.toLowerCase()) {
          return { ...tb, active: true }
        }
        return { ...tb, active: false }
      })
    },
    isTabActive(tabValue) {
      const activeTab = this.tabs.find(
        (tb) => tb.name.toLowerCase() == tabValue.toLowerCase()
      )
      return activeTab.active
    }
  },
  components: {
    Tabs,
    BookedTests,
    TestHistory
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
    },
    testHistory() {
      return this.$store.getters.getTestHistory
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
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
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
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
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
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
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
