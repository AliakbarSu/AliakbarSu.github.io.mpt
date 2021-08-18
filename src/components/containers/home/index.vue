<template>
  <div>
    <Carousel />
    <Section />
    <GetStarted />
  </div>
</template>

<script>
import Carousel from './components/UI/carousel/carousel.vue'
import Section from './components/UI/section/section.vue'
import GetStarted from './components/UI/getStarted/getStarted.vue'

export default {
  components: {
    Carousel,
    Section,
    GetStarted
  }
}
</script>
