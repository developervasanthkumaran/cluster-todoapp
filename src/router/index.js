import { createWebHistory, createRouter } from "vue-router";
import Login from '../components/logical/Login.vue';
import Register from '../components/logical/Register.vue'
import TodoView from '../components/logical/TodoView.vue'
import TodoSub from '../components/logical/TodoSub.vue'


const routes = [
     {
        path: "/register",
        name: "register",
        component: Register,
      
      },
      {
        path: "/",
        name: "login",
        component: Login,
      
      },
      {
        path: "/todoView",
        name: "todoView",
        component: TodoView,
        props:true,
        children:[
            { path:"/todoSub/:mName/:m_id",
              component:TodoSub,
              name:'todoSub',
              props:true,
           
            }
        ]
      }
    ];

const router = createRouter({
  history: createWebHistory(),routes
});


export default router;