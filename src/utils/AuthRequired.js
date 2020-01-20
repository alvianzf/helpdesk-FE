export default (to, from, next) => {
  if (localStorage.getItem('token') != null) {
    // verify with firebase or jwt
    next()
  } else {
    localStorage.removeItem('token')
    next('/user/login')
  }
}
