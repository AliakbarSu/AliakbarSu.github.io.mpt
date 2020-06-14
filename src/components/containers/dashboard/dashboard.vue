<template>
  <div class="dashboard">
    <nav class="side__nav">
      <ul class="navbar">
        <li class="nav__item"><router-link to="/" tag="a">Dashboard</router-link></li>
        <li class="nav__item"><router-link to="/details" tag="a">Details</router-link></li>
        <li class="nav__item"><router-link to="/payments" tag="a">Payments</router-link></li>
        <li class="nav__item"><a href="" @click="logout">Logout</a></li>
      </ul>
      <div class="nav__button">
        <router-link to="/test" class="nav__btn" tag="button">New Test</router-link>
      </div>
    </nav>
    <div class="content">
      <div class="right__content">
        <div class="tiles__container">
          <div class="tiles tiles--orange">
            <p class="tiles__heading">Total Tests<p>
            <p class="tiles__text">3</p>
          </div>
          <div class="tiles tiles--green">
            <p class="tiles__heading">Passed Tests<p>
            <p class="tiles__text">2</p>
          </div>
          <div class="tiles tiles--red">
            <p class="tiles__heading">Failed Tests<p>
            <p class="tiles__text">1</p>
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
            <tr>
              <td>General</td>
              <td>20-4-2019</td>
              <td><span class="text__green">Passed</span></td>
              <td><button class="view__btn">View</button></td>
            </tr>
            <tr>
              <td>General</td>
              <td>20-4-2019</td>
              <td><span class="text__red">Failed</span></td>
              <td><button class="view__btn">View</button></td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("logout")
      this.$router.push("/auth")
    }
  }
}
</script>

<style lang="scss" scopped>

.dashboard {
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-items: center;
  font-family: 'Roboto', sans-serif;
}


.content {
  padding: 12px;
  width: 85%;
  @media(min-width: 1200px) {
    width: 1200px;
    margin: auto;
  }
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
  width: 15%;
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
  position: absolute;
  bottom: 40%;
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