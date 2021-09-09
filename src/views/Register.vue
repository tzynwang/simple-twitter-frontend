<template>
  <main class="container-form">
    <formHeader />
    <registerForm />
  </main>
</template>

<script>
import formHeader from './../components/formHeader'
import registerForm from './../components/registerForm.vue'

export default {
  name: 'Register',
  components: {
    formHeader,
    registerForm
  }
}
</script>
