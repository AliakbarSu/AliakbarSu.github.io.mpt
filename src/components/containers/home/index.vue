<template>
  <div>
    <!-- <Carousel /> -->
    <Hero />
    <Section />
    <GetStarted />
  </div>
</template>

<script>
// import Carousel from './components/UI/carousel/carousel.vue'
import Section from './components/UI/section/section.vue'
import GetStarted from './components/UI/getStarted/getStarted.vue'
import Hero from './components/UI/hero/hero.vue'

export default {
  components: {
    Section,
    GetStarted,
    Hero
  }
}
</script>
