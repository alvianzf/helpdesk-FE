import { post } from '@/api'

export default (to, from, next) => {
    if (localStorage.getItem('token') != null) {
        post('api/auth/check/token', {
            token : localStorage.getItem('token')
        })
        .then(res => {
            next()
        }).catch(error => {
            localStorage.clear()
            next('/auth/login')
        })
      
    } else {
      localStorage.removeItem('token')
      next('/auth/login')
    }
}
  