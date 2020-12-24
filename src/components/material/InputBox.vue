<template >

<div class="textbox">
    <input v-bind:id="input" type="text" v-bind:placeholder="description" v-bind:maxlength="maxLen" required>
    <input class="txtbox" type="button" value="Add" @click="callback">
</div>
</template>
<script>
export default {
   props:{
       description:{type:String},maxLen:{type:Number},getValue:{type:Function},input:{type:String}
    },
    methods:{
        callback(){
           let currentValue =  document.getElementById(this.input).value;
           this.$emit('getValue',currentValue);
        }
    }
}
</script>

<style >

.textbox{
    color: black;
    display: flex;
    justify-content: space-between;
    padding: 10px;
}


input[type="button"] {
  width: 100px;
  background-color: #f33e42;
  color: white;
  padding: 12px 20px;
  margin: 8px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border-radius: 15px;
  box-sizing: border-box;
}


input:focus {
  outline: none !important;
}

input::-webkit-input-placeholder{
  color: black;
  font-size: 20px;
  font-family: Cambria;
  text-align: left;
}


</style>