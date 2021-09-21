<template>
  <main class="container-form">
    <formHeader />
    <transition name="translateY" appear>
      <registerForm />
    </transition>
  </main>
</template>

<script>
import formHeader from '@/components/formHeader'
import registerForm from '@/components/registerForm.vue'

export default {
  name: 'Register',
  components: {
    formHeader,
    registerForm
  }
}
</script>
