import { createRouter,createWebHistory } from "vue-router"; 
import homePage from "@/views/homePage.vue";
import ovqatRejim from "@/views/ovqatRejim.vue";
import davomad from "@/views/davomad.vue";
import AIForm from "@/views/AIForm.vue";
import Rasmlar from "@/views/rasmlar.vue";
Rasmlar
const routes=[
     {
          path:"/",
          name:"home",
          component:homePage
     },
     {
          path:"/ovqatlanish",
          name:"ovqatRejim",
          component:ovqatRejim
     },
     {
          path:"/davomat",
          name:"Davomat",
          component:davomad
     },
     {
          path:"/aiform",
          name:"AIForm",
          component:AIForm
     },
     {
          path:"/rasmlar",
          name:"Rasmlar",
          component:Rasmlar

     },
     {
          path:"/rasmlar",
          name:"Rasmlar",
          component:Rasmlar

     }
]
const router = createRouter({
     history: createWebHistory(),
     routes,
   })

export default router