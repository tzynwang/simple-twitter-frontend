<template>
  <main class="container">
    <!-- mobile -->
    <template v-if="windowWidth < 768">
      <navTop />
      <section class="container-body">
        <settingForm />
      </section>
      <navBottom />
    </template>
    <!-- tablet and desktop -->
    <template v-else>
      <navLeft v-if="windowWidth >= 768 && windowWidth < 1200"/>
      <navLeftDesktop v-else />
      <section class="container-body-column-merge">
        <navTop />
        <section class="container-body">
          <settingForm />
        </section>
      </section>
    </template>
  </main>
</template>

<script>
import navTop from './../components/navTop'
import settingForm from './../components/settingForm'
import navBottom from './../components/navBottom'

// tablet
import navLeft from './../components/navLeft'

// desktop
import navLeftDesktop from './../components/navLeftDesktop'

import { mapState } from 'vuex'

export default {
  name: 'Setting',
  components: {
    navTop,
    settingForm,
    navBottom,
    navLeft,
    navLeftDesktop
  },
  computed: {
    ...mapState(['windowWidth'])
  }
}
</script>
