<template>
  <b-container class="forgot-pass">
    <div style="text-align:left;margin-left:20px">
      <router-link to="/login">
        <img src="../assets/icon/back.png" alt />
      </router-link>
    </div>
    <h3 style="color:#7e98df">Forgot Password</h3>
    <p>You'll get messages soon on your e-mail</p>
    <b-row class="login-form">
      <b-col>
        <!-- <b-alert show variant="danger" v-show="isError">{{ error }}</b-alert> -->
        <b-form @submit.prevent="onSubmit">
          <b-row class="component-form">
            <b-col class="text-left">
              <label for="email">Email</label>
              <b-input
                type="email"
                id="email"
                v-model="form.user_email"
                placeholder="Input Email"
                required
              ></b-input>
            </b-col>
          </b-row>
          <b-row class="component-form">
            <b-col class="btnForgot">
              <b-button type="submit" block>Send Email</b-button>
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

.forgot-pass {
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

.component-form .btnForgot button {
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
@media screen and (max-width: 728px) {
  .forgot-pass {
    padding: 3vh 0vw;
    /* position: absolute; */
    width: 100% !important;
    height: 710px;
  }
  .component-form .btnForgot button {
    width: 15em;
  }
}
@media (min-width: 729px) and (max-width: 1200px) {
  .forgot-pass {
    /* padding: 3vh 0vw; */
    /* position: relative; */
    width: 60% !important;
  }
  .component-form .btnForgot button {
    width: 15em;
  }
}
</style>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'FormResetPassword',
  data() {
    return {
      form: {},
      isError: false,
      isSuccess: false,
      error: ''
    }
  },
  methods: {
    ...mapActions(['sendEmail']),
    onSubmit() {
      this.sendEmail(this.form)
        .then(result => {
          console.log(result)
          this.$bvToast.toast(`${result.msg}`, {
            title: 'Success ',
            variant: 'success',
            solid: true
          })
          this.isError = false
          this.isSuccess = true
        })
        .catch(error => {
          this.isError = true
          this.error = error.data.msg
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
