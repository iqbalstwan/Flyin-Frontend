<template>
  <b-container class="login">
    <h1 style="color:#7e98df">Login</h1>
    <p>Hi,Welcome back</p>
    <b-row class="login-form">
      <b-col>
        <b-alert show variant="danger" v-show="isError">{{ error }}</b-alert>
        <b-form @submit.prevent="onSubmit">
          <b-row class="component-form" style="margin-top:40px">
            <b-col class="text-left">
              <label for="email">Email</label>
              <b-input
                type="email"
                id="email"
                v-model="form.user_email"
                placeholder="Masukkan alamat email"
                required
              ></b-input>
            </b-col>
          </b-row>
          <b-row class="component-form">
            <b-col class="text-left">
              <label for="password">Password</label>
              <b-input
                type="password"
                id="password"
                v-model="form.user_password"
                placeholder="Masukkan kata sandi"
                required
              ></b-input>
            </b-col>
          </b-row>
          <b-row class="component-form">
            <b-col class="text-right">
              <router-link to="/reset">
                <p style="color: black">Forgot Password?</p>
              </router-link>
            </b-col>
          </b-row>
          <b-row class="component-form">
            <b-col class="btnLogin">
              <b-button type="submit" block>Login</b-button>
            </b-col>
          </b-row>
          <b-row class="component-form">
            <b-col class="btnGoogle">
              <b-button type="submit" block>Google</b-button>
            </b-col>
          </b-row>
        </b-form>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="text-center">
        <p>
          Don't have an account?
          <router-link to="/register">
            <span style="color: #7e98df;cursor:pointer" id="popover-target-1"
              >Sign up</span
            >
          </router-link>
          <!-- <b-popover
            target="popover-target-1"
            triggers="hover"
            placement="bottom"
          >
            <h6>Sign up</h6>
          </b-popover> -->
        </p>
      </b-col>
    </b-row>
  </b-container>
</template>

<style scoped>
p {
  margin: 0;
}

.login {
  padding: 3vh 0vw;
  /* position: absolute; */
  width: 500px;
  height: 710px;
  left: 433px;
  top: 157px;

  background: #ffffff;
  box-shadow: 0px 20px 20px rgba(126, 152, 223, 0.05);
  border-radius: 30px;
}

.component-form {
  padding: 10px;
}

.component-form input {
  border: none;
  border-bottom: 1px solid #555;
  background: transparent;
  width: 100%;
  padding: 8px 0 5px 0;
  font-size: 16px;
}

.component-form input:focus {
  box-shadow: none;
  border: none;
  outline: none;
  border-bottom: 2px solid #7e98df;
}

.component-form .btnLogin button {
  width: 360px;
  height: 60px;
  left: 503px;
  top: 563px;
  margin: 0 auto;
  margin-top: 50px;

  background-color: #7e98df;
  border-radius: 70px;
  border-color: transparent;
}

.component-form .btnGoogle button {
  width: 360px;
  height: 60px;
  left: 503px;
  top: 563px;
  margin: 0 auto;

  background: #ffffff;
  border: 1px solid #7e98df;
  color: #7e98df;
  box-sizing: border-box;
  border-radius: 70px;
}
</style>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'FormLogin',
  data() {
    return {
      form: {
        user_email: '',
        user_password: ''
      },
      isError: false,
      error: ''
    }
  },
  methods: {
    ...mapActions(['login']),
    onSubmit() {
      this.login(this.form)
        .then(result => {
          if (result.data.user_status === 1) {
            this.$router.push('/profile')
          } else {
            this.$router.push('/home')
          }
        })
        .catch(error => {
          this.isError = true
          this.error = error.data.msg
        })
    }
  }
}
</script>
