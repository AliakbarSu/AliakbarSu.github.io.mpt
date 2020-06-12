<template>
  <div class="navigator">
    <p class="navigator__text">You have 3 hours and 30 minutes to complete the test. You can skip the questions that you are not sure about and if there was any time remaining you can return to those questions and have a second try.</p>
    <p class="navigator__text"><b>Note: </b>You can skip a question as many times as you like</p>
    <div class="navigator__button">
        <button class="navigator__btn" @click="start">Start</button>
    </div>
    
  </div>
</template>

<script>
export default {
    methods: {
        start() {
            this.$emit("start")
        }
    }
}
</script>

<style lang="scss" scopped>

.navigator {
    text-align: center;
}

.navigator__text {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    text-align: left;
}

.navigator__button {
    display: flex;
    justify-content: center;
    margin-top: 10%;
}

.navigator__btn {
    padding: 20px;
    width: 200px;
    background: #79e279;
    border: none;
    color: white;
    border-radius: 5px;
    margin: auto;
    cursor: pointer;
    text-transform: uppercase;
    font-size: 1.2em;
}

</style>