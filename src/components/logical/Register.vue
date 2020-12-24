<template>
  <div class="reg-form">
    <div class="reg-header">
      <span> REGISTER </span>
    </div>
    <form @submit.prevent="validateUserDetail" id="register">
      <label for="name" class="reg-form-item">Name</label>
      <input
        type="text"
        id="username"
        name="username"
        placeholder="name"
        v-model="username"
        autocomplete="your name"
        required
      />
      <label for="email" class="reg-form-item">Email</label>
      <input
        type="text"
        id="email"
        v-model="email"
        name="email"
        placeholder="email"
        autocomplete="your email"
        required
      />

      <label for="password" class="reg-form-item">Password</label>
      <input
        type="password"
        id="password"
        v-model="password"
        name="password"
        placeholder="password"
        minlength="8"
        autocomplete="your password"
        required
      />
      <input type="submit" value="register" />
    </form>
  </div>
</template>
<script>
import { postRequest } from '../../main'
export default {
  name: "Register",
  data() {
    return {
      username: null,
      email: null,
      password: null,
    };
  },
  methods: {
    async validateUserDetail() {
      let isValidEmail = this.validateEmail(this.email);
      if (isValidEmail) {
        const payload = {
          username: this.username,
          email: this.email,
          password: this.password,
        };
        let statusCode = await postRequest('users/register/',payload);
        statusCode=statusCode.status;
        console.log(statusCode);
        if (statusCode) {
          if (200 >= statusCode <= 299) {
          alert("registered successfully");
            this.$router.push('/');
            return true;
          } else {
          alert("something went wrong!! try again");
            return false;
          }
        }
      }
      else{
        alert('enter valid email id');
        return false;
      }
    },

    validateEmail(email) {
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    }
  },
};
</script>
<style>
.reg-header {
  font-size: 40px;
  font-family: monospace;
  color: #f33e42;
  padding: 10px 10px 30px 0;
  text-align: center;
}

.reg-form {
  width: 500px;
  height: auto;
  /* border: 1px solid #F33E42; */
  padding: 10px;
}

.reg-form-item {
  color: #f36d42;
  font-family: monospace;
  font-size: 20px;
}

input:focus {
  outline: none !important;
}
input::placeholder {
  text-align: center;
}

/* input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 2px solid #1a1f3f;
  border-radius: 15px;
  box-sizing: border-box;
} */

input[type="submit"] {
  width: 100%;
  background-color: #f33e42;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

a input[type="submit"],a input[type='button'] {
  width: 100%;
  background-color: #f33e42;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

a input[type="submit"]:hover {
  background-color: #f33e42;
}
</style>