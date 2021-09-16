import { apiHelper } from '@/utils/apis'

export default {
  login ({ account, password }) {
    return apiHelper.post('/login', { account, password })
  },
  register (data) {
    return apiHelper.post('/users', { ...data })
  }
}
