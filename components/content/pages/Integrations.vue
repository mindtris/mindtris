<template>
  <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">

    <!-- Page content -->
    <main class="grow">

      <IntegrationsHero />
      <IntegrationsList />
      <Cta04 />

    </main>

  </div>
</template>

<script>
import Header from '../partials/Header.vue'
import IntegrationsHero from '../partials/IntegrationsHero.vue'
import IntegrationsList from '../partials/IntegrationsList.vue'
import Cta04 from '../partials/Cta04.vue'

export default {
  name: 'Integrations',
  components: {
    Header,
    IntegrationsHero,
    IntegrationsList,
    Cta04,
  },
}
</script>