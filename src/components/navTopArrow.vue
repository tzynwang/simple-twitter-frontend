<template>
  <div class="nav-top">
    <button class="btn btn-arrow" @click="back">
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
