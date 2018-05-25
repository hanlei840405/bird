export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      debugger
      this.$axios.post('api-system/login',{'username': this.username, 'password': this.password}).then(res => {
        var authorization = res.headers.authorization
        debugger
        if (authorization) {
          sessionStorage.setItem('Authorization', authorization)
          this.$router.push('/')
        }else {
          this.$q.notify({
            message: '账号密码错误'
          })
        }

      }).catch(reason => {
        this.$q.notify({
          message: reason
        })
      })
    }
  }
}
