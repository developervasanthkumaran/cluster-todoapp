<template >
 <div class="reg-form">
   <div class="reg-header">
    <span>
      Login
    </span>
</div>
  <form @submit.prevent="logIn">
   <label for="name" class="reg-form-item">Name</label>
      <input
        type="text"
        id="username"
        name="username"
        placeholder="name"
        v-model="username"
        autocomplete="your name" required/>

    <label for="password" class="reg-form-item">Password</label>
    <input 
      type="password" 
      id="password" 
      v-model='password' 
      name="password" 
      placeholder="password" 
      autocomplete="your password" required/>

      <router-link to="/todoView"><input type="submit" value="login"></router-link>
     <router-link to="/register"><input type="submit" value="New User? Register"></router-link>
  </form>
</div>
</template>
<script>
export default {
   props:['uname','pass'],
   computed:{

   }
}
</script>
<style >
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

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 2px solid #1a1f3f;
  border-radius: 15px;
  box-sizing: border-box;
}

</style>