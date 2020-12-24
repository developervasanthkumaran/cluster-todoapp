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
          <input type="checkbox" @click="onSubTaskFinished(s)" :checked="s.isCompleted">
          <span :style="s.isCompleted?addLineThrough:''">{{ s.name }}</span>
          <input type="button" value="delete">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import InputBox from "../material/InputBox";
export default {
  components: {
    "input-box": InputBox,
  },
  methods: {
    async addSubTaskToMainTaskList(val) {
        if(val.length === 0){alert('empty string found');return;}
        const m_id = this.getParams.m_id;
        const payload = {
          m_id:m_id,
          sub:{
            name:val,
            isCompleted:false
          }  
        }
        this.$store.dispatch('addSubTaskAsync',payload);

    },
    setMainTaskName(name){
        console.log(this.subInput);
        this.SubTaskDescription = "add subtask for "+name;
    },
     onSubTaskFinished(subtask){
         console.log(subtask);
         subtask.isCompleted = !subtask.isCompleted
     }
  },
  computed: {
    getParams() {
      const mName = this.$route.params.mName;
      const m_id = this.$route.params.m_id;
      return {mName,m_id};
    },
    getsubTaskList() {
      const m_id = this.getParams.m_id;
      this.setMainTaskName(this.getParams.mName);
     const obj =  this.$store.getters.getUserTodoList.find(item => item.m_id === m_id);
     console.log('subtask list ', obj, obj.subtask);
     return obj.subtask;
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