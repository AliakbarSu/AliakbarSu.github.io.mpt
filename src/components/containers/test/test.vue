<template>
  <div class="test">
    <div class="content">
      <div class="content__thumbnail">
        <img src="https://getuikit.com/v2/docs/images/placeholder_600x400.svg" class="content__img">
      </div>
      <div class="question">
        <p class="question__explanation">A 65-years-old Caucasian male known to have chronic alcohol induced sever liver disease is admitted to surgical ward for inquinal hernia repair.<br>
        On second day after admission, he starts yelling at nursing staff and becomes agitated. He looks anxious, sweaty and feels nauseated.<br>
        He also complains of visual hallucinations. All laboratory investigations are normal.<br>
        </p>
        <p class="question__question">
          What will be your next step in management of this patient?
        </p>
        <!-- <CircularTimer/> -->
        <ul class="question__answers">
          <li class="question__answer"><span class="answer__text">a. Give diazepam 10 to 20 mg every two hourly until symptoms subside</span></li>
          <li class="question__answer"><span class="answer__text">b. Consider oxazepam instead of diazepam</span></li>
          <li class="question__answer"><span class="answer__text">c. Give thiamine orally</span></li>
          <li class="question__answer"><span class="answer__text">d. Give thiamine 100mg intramuscular, oxazepam and consider specialist review if needed</span></li>
          <li class="question__answer"><span class="answer__text">e. Give morphiine to sedate the patient</span></li>
        </ul>
      </div>
      <div class="actions">
        <button class="actions__action" @click="next">Next</button>
        <button class="actions__action" @click="skip">Skip</button>
        <button class="actions__action" @click="endTest">End test</button>
      </div>
    </div>
  </div>
</template>

<script>
// import CircularTimer from '../../UI/circular-timer/circular-timer'

export default {
  data() {
    return {
      questions: [
        {
          
        }
      ]
    }
  },
  components: {
    // CircularTimer
  },
  methods: {
    next() {

    },
    skip() {

    },
    endTest() {
      alert("Are you sure you want to end the test?")
    }
  }
}
</script>

<style lang="scss">

.test {
  height: 100vh;
  display: flex;
  align-items: center;
}

.content {
  padding: 12px;
  @media(min-width: 1200px) {
    width: 1200px;
    margin: auto;
  }
  font-family: 'Roboto', sans-serif;
}

.content__thumbnail {
  display: flex;
  justify-content: center;
}

.question__question {
  margin-top: 20px;
}

.question__answer {
  padding: 5px;
}

.answer__text {
  cursor: pointer;
  &:hover {
    color: grey;
    transition: 0.3s;
  }
}


.question__answers {
  border-top: 1px solid #e6e6e6;
  padding: 12px 50px;
}

.actions {
  display: flex;
  justify-content: flex-end;
}

.actions__action {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
  &:hover {
    cursor: pointer;
    transition: 0.3s;
  }
}

</style>