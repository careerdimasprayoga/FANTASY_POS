<template>
  <div>
    <h1>Login Page</h1>
    <b-form @submit.prevent="onSubmit" @reset.prevent="onReset">
      <input type="email" v-model="form.email" placeholder="Email" />
      <br />
      <input type="password" v-model="form.password" placeholder="Password" />
      <br />
      <button type="submit">Submit</button>
      <button type="reset">Reset</button>
    </b-form>
    <hr>
    <!-- <h3>{{name}}</h3> -->
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Login',
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapState(['name'])
  },
  methods: {
    ...mapActions(['login']),
    onSubmit() {
      this.login(this.form).then(result => {
        console.log(result)
        this.$router.push('/')
      }).catch(error => {
        console.log(error)
      })
    },
    onReset() {
      this.form = {
        email: '',
        password: ''
      }
    }
  }
}
</script>
