<template >
  <div class="reg-form">
    <div class="reg-header">
      <span> Login </span>
    </div>
    <form @submit.prevent="logIn">
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

      <label for="password" class="reg-form-item">Password</label>
      <input
        type="password"
        id="password"
        v-model="password"
        name="password"
        placeholder="password"
        autocomplete="your password"
        required
      />

      <input type="submit" value="login" />
      <router-link to="/register"
        ><input type="button" value="New User? Register"
      /></router-link>
    </form>
  </div>
</template>
<script>
import { getRequest, postRequest } from "../../main";

export default {
  data() {
    return {
      username: null,
      password: null,
    };
  },
  methods: {
    async logIn() {
      const payload = { username: this.username, password: this.password };
      let token = await postRequest("auth/login/", payload);
      let access_token;
      if (token) {
        access_token = token.data.access_token;
      } else {
        alert("user not found!! register first");
        return false;
      }
      if (access_token) {
        sessionStorage.setItem("token", access_token);
        const user_profile = await getRequest("auth/profile/", {
          headers: { Authorization: "Bearer " + access_token },
        });

        if (user_profile) {
          const name = user_profile.data.username;
          const id = user_profile.data.user_id;
          this.$store.commit("setUserDetails", {
            user_id: id,
            username: name,
          });

          this.$store.commit("toggleUserSession");
          this.$store.dispatch("getTodoListAsync");
          this.$router.push("todoView");
          return true;
        } else {
          alert("user not found!!");
          return false;
        }
      } else {
        alert("login failed!! enter valid credentials");
        return false;
      }
    },
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
</style>