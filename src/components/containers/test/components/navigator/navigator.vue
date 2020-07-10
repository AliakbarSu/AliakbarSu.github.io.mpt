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
    position: relative;
    overflow: hidden;
    padding: 20px;
    width: 200px;
    background: #79e279;
    border: 1px solid #79e279;
    color: white;
    border-radius: 5px;
    margin: auto;
    text-transform: uppercase;
    font-size: 1.2em;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    &:hover {
        cursor: pointer;
        transition: 0.3s;
        background: white;
        color: #79e279;
        box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
    }
}

.navigator__btn:after {
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

.navigator__btn:active:after {
  padding: 0;
  margin: 0;
  opacity: 1;
  transition: 0s
}

</style>