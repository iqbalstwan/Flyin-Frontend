<template>
  <b-container class="register">
    <div style="text-align:left;margin-left:20px">
      <router-link to="/login">
        <img src="../assets/icon/back.png" alt />
      </router-link>
    </div>
    <h1 style="color:#7e98df">Register</h1>
    <p>Let's create your account</p>
    <b-row class="login-form">
      <b-col>
        <b-form>
          <b-row class="component-form" style="margin-top:10px">
            <b-col class="text-left">
              <label for="name">Name</label>
              <b-input id="name" v-model="form.user_name" placeholder="Input your name" required></b-input>
            </b-col>
          </b-row>
          <b-row class="component-form">
            <b-col class="text-left">
              <label for="email">Email</label>
              <b-input
                type="email"
                id="email"
                v-model="form.user_email"
                placeholder="Input Your Email"
                required
              ></b-input>
            </b-col>
          </b-row>
          <b-row class="component-form">
            <b-col class="text-left">
              <label for="phone">Phone Number</label>
              <b-input
                id="phoneNumber"
                v-model="form.user_phone"
                placeholder="Input Your Phone Number"
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
                placeholder="Input Password"
                required
              ></b-input>
            </b-col>
          </b-row>
          <b-row class="component-form">
            <b-col class="text-left">
              <label for="confirmPassword">Confirm Password</label>
              <b-input
                type="password"
                id="confirm-password"
                v-model="form.confirm_password"
                placeholder="Match your password"
                required
              ></b-input>
            </b-col>
          </b-row>
          <b-row class="component-form">
            <b-col class="btnRegister">
              <b-button type="submit" @click.prevent="userRegister" block>Register</b-button>
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
  </b-container>
</template>

<style scoped>
p {
  margin: 0;
}

.register {
  padding: 3vh 0vw;
  /* position: absolute; */
  width: 40%;
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
  border-bottom: 3px solid #7e98df;
}

.component-form .btnRegister button {
  width: 360px;
  height: 40px;
  left: 503px;
  top: 563px;
  margin: 0 auto;
  margin-top: 0px;

  background-color: #7e98df;
  border-radius: 70px;
  border-color: transparent;
}

.component-form .btnGoogle button {
  width: 360px;
  height: 40px;
  left: 503px;
  top: 563px;
  margin: 0 auto;

  background: #ffffff;
  border: 1px solid #7e98df;
  color: #7e98df;
  box-sizing: border-box;
  border-radius: 70px;
}

/* //responsive */
@media screen and (max-width: 425px) {
  .register {
    padding: 3vh 0vw;
    /* position: absolute; */
    width: 100% !important;
    height: auto;
  }
  .component-form .btnRegister button {
    width: 10em;
  }

  .component-form .btnGoogle button {
    width: 10em;
  }
}
@media (min-width: 426px) and (max-width: 728px) {
  .register {
    padding: 3vh 0vw;
    width: 100% !important;
    height: 710px;
  }
  .component-form .btnRegister button {
    width: 15em;
  }

  .component-form .btnGoogle button {
    width: 15em;
  }
}
@media (min-width: 729px) and (max-width: 1200px) {
  .register {
    width: 60% !important;
  }
  .component-form .btnRegister button {
    width: 15em;
  }
  .component-form .btnGoogle button {
    width: 15em;
  }
}
</style>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'FormRegister',
  data() {
    return {
      form: {
        user_email: '',
        user_password: '',
        user_name: '',
        user_phone: ''
      },
      isError: false,
      error: ''
    }
  },
  methods: {
    ...mapActions(['register']),
    userRegister() {
      this.register(this.form)
        .then(response => {
          console.log(response)
          this.$bvToast.toast('Register success', {
            title: 'Success',
            variant: 'success',
            solid: true
          })
          setTimeout(() => {
            this.$router.push('/login')
          }, 2000)
        })
        .catch(error => {
          console.log(error)
          this.$bvToast.toast(`${error.data.msg}`, {
            title: 'Check it again ',
            variant: 'danger',
            solid: true
          })
        })
    }
  }
}
</script>
