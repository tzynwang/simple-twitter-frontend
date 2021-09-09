<template>
  <main class="container-form">
    <formHeader />
    <loginForm />
  </main>
</template>

<script>
import formHeader from './../components/formHeader'
import loginForm from './../components/loginForm'

export default {
  name: 'Login',
  components: {
    formHeader,
    loginForm
  }
}
</script>
