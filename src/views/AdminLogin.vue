<template>
  <main class="container-form">
    <formHeader />
    <transition name="translateY" appear>
      <loginForm />
    </transition>
  </main>
</template>

<script>
import formHeader from '@/components/formHeader'
import loginForm from '@/components/loginForm'

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
