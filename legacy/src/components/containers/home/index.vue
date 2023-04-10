<template>
  <div>
    <!-- <Carousel /> -->
    <Hero />
    <Section />
    <Examples />
    <Testimonial />
    <GetStarted />
  </div>
</template>

<script>
// import Carousel from './components/UI/carousel/carousel.vue'
import Section from './components/UI/section/section.vue'
import GetStarted from './components/UI/getStarted/getStarted.vue'
import Hero from './components/UI/hero/hero.vue'
import Examples from './components/examples/examples.vue'
import Testimonial from './components/testimonial/testimonial.vue'

export default {
  components: {
    Section,
    GetStarted,
    Hero,
    Examples,
    Testimonial
  }
}
</script>
