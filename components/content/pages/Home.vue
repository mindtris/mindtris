<template>
  <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">

    <!-- Page content -->
    <main class="grow">

      <Hero />
      <Clients />
      <Features />
      <Features02 />
      <Features03 />
      <TestimonialsCarousel />
      <Features04 />
      <LazyPricingHome />
      <Testimonials />
      <Cta />

    </main>
  </div>
</template>

<script>
import Hero from '../partials/Hero.vue'
import Clients from '../partials/Clients.vue'
import Features from '../partials/Features.vue'
import Features02 from '../partials/Features02.vue'
import Features03 from '../partials/Features03.vue'
import TestimonialsCarousel from '../partials/TestimonialsCarousel.vue'
import Features04 from '../partials/Features04.vue'
import Pricing from '../partials/PricingHome.vue'
import Testimonials from '../partials/Testimonials.vue'
import Cta from '../partials/Cta.vue'

export default {
  name: 'Home',
  components: {
    Hero,
    Clients,
    Features,
    Features02,
    Features03,
    TestimonialsCarousel,
    Features04,
    Pricing,
    Testimonials,
    Cta,
  },
}
</script>