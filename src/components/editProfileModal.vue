<template>
  <transition name="fade">
    <div class="modal-background">
      <div class="modal">
        <!-- header -->
        <div class="modal-header">
          <img class="ml-15 mr-40" src="@/assets/images/modal-close.svg" alt="close modal" @click="closeModal">
          <span class="modal-header-title">編輯個人資料</span>
          <button class="btn btn-primary btn-profile-save mr-15">儲存</button>
        </div>
        <!-- backgroundImg, avatar -->
        <div class="modal-body user-profile-image">
          <img class="profile-background-img" src="" alt="user profile background image">
          <div class="edit-container">
            <img class="mr-30" src="@/assets/images/profile-edit-upload.svg" alt="background image upload icon">
            <img src="@/assets/images/profile-edit-delete.svg" alt="background image delete icon">
          </div>
          <div class="avatar-container">
            <img class="profile-avatar-img" src="" alt="avatar">
            <img class="edit-icon" src="@/assets/images/profile-edit-upload.svg" alt="background image upload icon">
          </div>
        </div>
        <!-- name, description edit -->
        <div class="modal-input-section user-profile pl-15 pr-15">
          <div :class="['input-group', { 'input-error': nameError }, 'mt-80']">
            <input type="text" id="name" name="name" v-model.trim="name" />
            <label for="name">名稱</label>
            <div class="input-hint-container">
              <div class="error-message" v-show="nameError">字數超出上限！</div>
              <span class="length-hint">{{ nameLength }}/50</span>
            </div>
          </div>
          <div :class="['input-group', { 'input-error': descriptionError }, 'mt-40']">
            <textarea name="description" id="description" v-model.trim="description"></textarea>
            <label for="name">自我介紹</label>
            <div class="input-hint-container">
              <div class="error-message" v-show="descriptionError">字數超出上限！</div>
              <span class="length-hint">{{ descriptionLength }}/160</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'editProfileModal',
  data () {
    return {
      nameError: false,
      descriptionError: false,
      name: '',
      description: ''
    }
  },
  methods: {
    closeModal () {
      this.$store.commit('toggleEditProfileModal')
    }
  },
  computed: {
    nameLength () {
      return this.name.length
    },
    descriptionLength () {
      return this.description.length
    }
  }
}
</script>

<style>

</style>
