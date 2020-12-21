<template>
  <div class="todo">
    <div class="todo-input">
      <input-box
        @getValue="addSubTaskToMainTaskList"
        :description="SubTaskDescription"
        :input="subInput"
      />
    </div>
    <div class="todo-inner">
      <div class="todo-items">
        <div class="todo-item clr" v-for="s in getsubTaskList" v-bind:key="s">
          <input type="checkbox" @click="onSubTaskFinished(s)" :checked="s.hasFinished"> <span :style="s.hasFinished?addLineThrough:''">{{ s.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import InputBox from "../material/InputBox";
// import TodoSubItem from "./TodoSubItem";
export default {
  components: {
    "input-box": InputBox,
    // "todo-sub-item": TodoSubItem,
  },
  methods: {
    addSubTaskToMainTaskList(val) {
        if(val.length === 0){alert('empty string found');return;}
      const maintaskName = this.getParams;
      this.$taskList.find((obj) => {
        if (obj.maintask.name === maintaskName) {
          obj.subtask.push({ name: val, hasFinished: false });
        }
      });
    },
    setMainTaskName(name){
        this.SubTaskDescription = "add subtask for "+name;
    },
     onSubTaskFinished(subtask){
         console.log(subtask);
         subtask.hasFinished = !subtask.hasFinished
     }
  },
  computed: {
    getParams() {
      console.log(this.$route.params);
      return this.$route.params.mt;
    },
    getsubTaskList() {
      const maintaskName = this.getParams;
      console.log(maintaskName);
      this.setMainTaskName(maintaskName);
      const subtasks = this.$taskList.find((obj) => {
        return obj.maintask.name === maintaskName;
      });
      console.log(subtasks);
      const allsubtask = subtasks.subtask
      return allsubtask?allsubtask:null;
    },
    addLineThrough(){
        return "text-decoration:line-through;text-decoration-color:darkblue;text-decoration-thickness: 3px;";
    }
  },
  data() 
  {
    return {
      SubTaskDescription: "add subtask",
      subInput: "subtaskInput",
  }
}
}
</script>
<style>
.clr {
  background-color: rgba(143, 12, 88, 0.699);
}
</style>