import sweetAlert2 from 'sweetalert2'
import 'animate.css'

const successIcon = require('@/assets/images/toast-success.png')
const failIcon = require('@/assets/images/toast-fail.png')

const successToast = sweetAlert2.mixin({
  toast: true,
  iconHtml: `<img class="animate__animated animate__bounceIn" src="${successIcon}">`,
  buttonsStyling: false,
  position: 'top-end',
  showConfirmButton: false,
  timer: 103000
})

const failToast = sweetAlert2.mixin({
  toast: true,
  iconHtml: `<img class="animate__animated animate__flash" src="${failIcon}">`,
  buttonsStyling: false,
  position: 'top-end',
  showConfirmButton: false,
  timer: 103000
})

export { successToast, failToast }
