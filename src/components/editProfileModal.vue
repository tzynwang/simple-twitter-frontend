<template>
  <transition name="fade">
    <div class="modal-background">
      <form class="modal" @submit.prevent="handleSubmit">
        <!-- header -->
        <div class="modal-header">
          <img
            class="ml-15 mr-40"
            src="@/assets/images/modal-close.svg"
            alt="close modal"
            @click="closeModal"
          />
          <span class="modal-header-title">編輯個人資料</span>
          <button
            type="submit"
            class="btn btn-primary btn-profile-modal-save mr-15"
            :disabled="isProcessing"
          >
            儲存
          </button>
        </div>
        <!-- backgroundImg, avatar -->
        <div class="modal-body user-profile-image">
          <img
            class="profile-background-img"
            :src="cover"
            alt="user profile background image"
          />
          <div class="edit-container">
            <!-- upload cover -->
            <img
              class="mr-30"
              src="@/assets/images/profile-edit-upload.svg"
              alt="background image upload icon"
              @click="uploadCover"
            />
            <!-- remove cover -->
            <img
              src="@/assets/images/profile-edit-delete.svg"
              alt="background image delete icon"
              @click="removeCover"
            />
            <input
              type="file"
              name="cover"
              id="cover"
              class="d-none"
              ref="cover"
              accept="image/jpg, image/jpeg, image/png"
              @change="handleFileChange('cover')"
            />
          </div>
          <div class="avatar-container">
            <img class="profile-avatar-img" :src="avatar" alt="avatar" />
            <!-- upload avatar -->
            <img
              class="edit-icon"
              src="@/assets/images/profile-edit-upload.svg"
              alt="background image upload icon"
              @click="uploadAvatar"
            />
            <input
              type="file"
              name="avatar"
              id="avatar"
              class="d-none"
              ref="avatar"
              accept="image/jpg, image/jpeg, image/png"
              @change="handleFileChange('avatar')"
            />
          </div>
        </div>
        <!-- name, introduction edit -->
        <div class="modal-input-section user-profile pl-15 pr-15">
          <div :class="['input-group', { 'input-error': nameError }, 'mt-80']">
            <input type="text" id="name" name="name" v-model.trim="name" />
            <label for="name">名稱</label>
            <div class="input-hint-container">
              <div class="error-message" v-show="nameError">
                名稱長度限制在4至50字之間
              </div>
              <span class="length-hint">{{ nameLength }}/50</span>
            </div>
          </div>
          <div
            :class="[
              'input-group',
              { 'input-error': introductionError },
              'mt-20'
            ]"
          >
            <textarea
              name="introduction"
              id="introduction"
              v-model.trim="introduction"
            ></textarea>
            <label for="name">自我介紹</label>
            <div class="input-hint-container">
              <div class="error-message" v-show="introductionError">
                字數超出上限！
              </div>
              <span class="length-hint">{{ descriptionLength }}/160</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import isLength from 'validator/lib/isLength'
import { successToast, failToast } from '@/utils/toasts'
import userAPI from '@/apis/user'

export default {
  name: 'editProfileModal',
  data () {
    return {
      nameError: false,
      introductionError: false,
      cover: '',
      avatar: '',
      name: '',
      introduction: '',
      isProcessing: false
    }
  },
  mounted () {
    this.cover = this.getUser.cover || ''
    this.avatar = this.getUser.avatar || ''
    this.name = this.getUser.name || ''
    this.introduction = this.getUser.introduction || ''
  },
  beforeRouteUpdate (to, from, next) {
    this.$data = { ...this.$data }
    next()
  },
  methods: {
    ...mapActions(['setUserById', 'setUser']),
    closeModal () {
      this.$store.commit('toggleEditProfileModal')
    },
    uploadCover () {
      this.$refs.cover.click()
    },
    removeCover () {
      // 清空input:file與data()中的cover資料
      this.$refs.cover.value = ''
      this.cover = ''
    },
    uploadAvatar () {
      this.$refs.avatar.click()
    },
    handleFileChange (target) {
      const { files } = event.target
      if (!files.length) return

      if (files[0].size > 500000) {
        failToast.fire({
          title: '檔案大小限制為500KB'
        })
        return
      }

      const imageURL = window.URL.createObjectURL(files[0])
      // 即時顯示使用者上傳的圖片
      switch (target) {
        case 'cover':
          this.cover = imageURL
          break
        case 'avatar':
          this.avatar = imageURL
      }
    },
    async handleSubmit (event) {
      if (!isLength(this.name, { min: 4, max: 50 })) {
        this.nameError = true
        return
      }

      if (!isLength(this.introduction, { min: 0, max: 160 })) {
        this.introductionError = true
        return
      }

      const form = event.target
      const formData = new FormData(form)

      // 使用者選擇移除cover的場合
      if (!this.cover) {
        formData.set('cover', 'delete')
      }

      try {
        this.isProcessing = true
        // 資料推給後端
        const { data } = await userAPI.editUserProfile(this.getUser.id, formData)

        if (data.status !== '200') {
          throw new Error()
        }

        successToast.fire({
          title: '個人資料更新成功'
        })

        // 更新前端vuex authorization modules中user的資料
        this.setUserById({
          cover: data.cover, // 等後端回傳
          avatar: data.avatar, // 等後端回傳
          name: this.name,
          introduction: this.introduction
        })
        this.setUser({
          cover: data.cover, // 等後端回傳
          avatar: data.avatar, // 等後端回傳
          name: this.name,
          introduction: this.introduction
        })

        // 關掉modal
        this.closeModal()
        this.isProcessing = false
      } catch (error) {
        const { data } = error.response
        console.error(data)
        // 失敗ㄌ
        failToast.fire({
          title: '暫時無法修改個人資料，請稍候再嘗試'
        })
        this.isProcessing = false
      }
    }
  },
  computed: {
    ...mapGetters(['getUserByIdVuex', 'getUser']),
    nameLength () {
      return this.name.length
    },
    descriptionLength () {
      return this.introduction.length
    }
  },
  watch: {
    name: function (value) {
      if (!isLength(value, { min: 4, max: 50 })) {
        this.nameError = true
      } else {
        this.nameError = false
      }
    },
    introduction: function (value) {
      if (!isLength(value, { min: 0, max: 160 })) {
        this.introductionError = true
      } else {
        this.introductionError = false
      }
    }
  }
}
</script>

<style></style>
