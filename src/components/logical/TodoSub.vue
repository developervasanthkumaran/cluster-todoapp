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
          <input
            type="checkbox"
            @click="onSubTaskFinished(s)"
            :checked="s.isCompleted"
          />
          <span :style="s.isCompleted ? addLineThrough : ''">{{ s.name }}</span>
          <input
            class="del-btn"
            type="button"
            value="delete"
            @click="deleteSubTask(s)"
          />
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
      if (val.length === 0) {
        alert("empty string found");
        return;
      }
      const m_id = this.getParams.m_id;
      console.log(m_id);
      if(!m_id){
        alert('please enter primary todos');return;
      }
      const payload = {
        m_id: m_id,
        sub: {
          name: val,
          isCompleted: false,
        },
      };
      this.$store.dispatch("addSubTaskAsync", payload);
    },
    async deleteSubTask(s) {
      const mTask_id = this.getParams.m_id;
      const payload = {
        m_id: mTask_id,
        s_id: s.s_id,
      };
      this.$store.dispatch("deleteSubTaskAsync", payload);
    },
    async onSubTaskFinished(subtask) {
      console.log(subtask);
      subtask.isCompleted = !subtask.isCompleted;
      const mTask_id = this.getParams.m_id;
      const payload = {
        m_id: mTask_id,
        s_id: subtask.s_id,
        subtask: subtask,
      };
      this.$store.dispatch("updateSubTaskAsync", payload);
    },
    setMainTaskName(name) {
      console.log(this.subInput,'name ',name, name.length);
      this.SubTaskDescription = "add secondary todos for "+name;
    },
  },
  computed: {
    getParams() {
      const mName = this.$route.params.mName;
      const m_id = this.$route.params.m_id;
      return { mName, m_id };
    },
    getsubTaskList() {
      const m_id = this.getParams.m_id;
      this.setMainTaskName(this.getParams.mName);
      const todoList = this.$store.getters.getUserTodoList;
      let obj;
      if (todoList) {
        obj = this.$store.getters.getUserTodoList.find(
          (item) => item.m_id === m_id
        );
      }
      return obj ? obj.subtask : [];
    },
    addLineThrough() {
      return "text-decoration:line-through;text-decoration-color:darkblue;text-decoration-thickness: 3px;";
    },
  },
  data() {
    return {
      SubTaskDescription: "enter your secondary todos",
      subInput: "subtaskInput",
    };
  },
};
</script>
<style>
.clr {
  /* background-color: rgba(10, 33, 95, 0.925); */
  background-color: #8958c7;
  color: white;
  cursor: pointer;
}
</style>