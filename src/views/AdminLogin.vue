<template>
  <main>
    <formHeader />
    <loginForm />
  </main>
</template>

<script>
import formHeader from './../components/formHeader'
import loginForm from './../components/loginForm'

export default {
  name: 'AdminLogin',
  components: {
    formHeader,
    loginForm
  }
}
</script>

<style>

</style>
