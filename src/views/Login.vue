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

import { successToast } from '@/utils/toasts'

export default {
  name: 'Login',
  components: {
    formHeader,
    loginForm
  },
  beforeRouteEnter (to, from, next) {
    const { register } = to.params
    if (register === 'success') {
      successToast.fire({
        title: '註冊成功'
      })
    }
    next()
  }
}
</script>
