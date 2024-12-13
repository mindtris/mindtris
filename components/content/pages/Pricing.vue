<template>
  <div className="not-prose flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">

    <!-- Page content -->
    <main class="grow">

      <PricingHero />
      <Features05 />
      <CustomersPricing/>
      <Faqs />
      <Cta />

    </main>

  </div>
</template>

<script>
import PricingHero from '../partials/PricingHero.vue'
import Features05 from '../partials/Features05.vue'
import CustomersPricing from '../partials/Customers.vue'
import Faqs from '../partials/Faqs.vue'
import Cta from '../partials/Cta.vue'

export default {
  name: 'Pricing',
  components: {
    PricingHero,
    Features05,
    CustomersPricing,
    Faqs,
    Cta,
  },
}
</script>