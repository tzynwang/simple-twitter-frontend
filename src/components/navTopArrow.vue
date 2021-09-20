<template>
  <div class="nav-top">
    <button class="btn btn-arrow" @click="backToHome">
      <img src="@/assets/images/navTopArrow-back.svg" alt="back to previous page button">
    </button>
    <span class="title">推文</span>
  </div>
</template>

<script>
import { navMethods } from '@/utils/mixins'

export default {
  name: 'navTopArrow',
  mixins: [navMethods]
}
</script>

<style>
</style>
