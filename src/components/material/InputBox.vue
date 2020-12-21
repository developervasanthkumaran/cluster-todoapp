<template >

<div class="textbox">
    <input :id="input" type="text" v-bind:placeholder="description" v-bind:maxlength="maxLen" required>
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

<style scoped>

.textbox{
    color: black;
    display: flex;
    justify-content: space-between;
    padding: 10px;
}

input[type="text"]{
  width: 80%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 2px solid #1a1f3f;
  border-radius: 15px;
  box-sizing: border-box;
}

input[type="button"] {
  width: 20%;
  background-color: #f33e42;
  color: white;
  padding: 12px 20px;
  margin: 8px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
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