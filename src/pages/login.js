export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      this.$axios.post('api-system/login',{'username': this.username, 'password': this.password}).then(res => {
        var token = res.headers.token
        debugger
        if (token) {
          sessionStorage.setItem('token', token)
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
