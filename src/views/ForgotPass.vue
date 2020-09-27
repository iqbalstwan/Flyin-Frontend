<template>
  <div class="login-container">
    <b-row>
      <b-col md="12" sm="12" class="content">
        <Form />
      </b-col>
    </b-row>
  </div>
</template>

<style scoped>
.login-container {
  background-color: #e5e5e5;
  padding: 40px 75px;
  height: 100vh;
}
</style>

<script>
import Form from '../components/ForgotPassword'
export default {
  name: 'Forgot',
  components: {
    Form
  }
}
</script>
