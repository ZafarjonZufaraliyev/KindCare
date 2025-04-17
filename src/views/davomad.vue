<template lang="">
     <div>
       <div class="davomad">
         <div class="contaner2">
           <div class="davomad__wr">
             <swiper dir="rtl"
            :modules="modules"
            :pagination="{ clickable: true }"
            :space-between="20"
            :breakpoints="{
            320: { slidesPerView: 1 },
            480: { slidesPerView: 1.3 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 2.75 }
          }">
               <swiper-slide class="item" v-for="kun in davomadlar" :key="kun.sana">
                 <p>
                   <strong>{{ kun.hafta }}, {{ kun.sana }}</strong>
                 </p>
                 <p>
                   Status: 
                   <span :class="kun.status">
                     {{ kun.status === 'bor' ? 'Bog‘chada' : 'Kelmagan' }}
                   </span>
                 </p>
                 <p v-if="kun.status === 'yoq' && kun.sabab">
                   Sabab: {{ kun.sabab }}
                 </p>
               </swiper-slide>
             </swiper>
           </div>
         </div>
       </div>
     </div>
   </template>
   
   <script>
   import { Swiper, SwiperSlide } from 'swiper/vue';
   import { Navigation, Pagination } from 'swiper/modules';
   import 'swiper/css';
   import 'swiper/css/navigation';
   import 'swiper/css/pagination';
   
   export default {
     components: {
       Swiper,
       SwiperSlide,
     },
     data() {
       return {
         modules: [Navigation, Pagination],
         davomadlar: [
           { hafta: 'Dushanba', sana: '2025-04-14', status: 'bor' },
           { hafta: 'Juma', sana: '2025-04-13', status: 'yoq', sabab: 'Isitma' },
           { hafta: 'Payshanba', sana: '2025-04-12', status: 'bor' },
           { hafta: 'Chorshanba', sana: '2025-04-11', status: 'bor' },
           { hafta: 'Seyshanba', sana: '2025-04-10', status: 'yoq', sabab: 'Isitma' },
           { hafta: 'Dushanba', sana: '2025-04-09', status: 'bor' },
         ],
         showChat: false, 
         chatMessages: [],
         newMessage: '', 
       };
     },
     methods: {
       openChat() {
         this.showChat = true;
       },
       closeChat() {
         this.showChat = false;
       },
       sendMessage() {
         if (this.newMessage.trim()) {
           this.chatMessages.push({ sender: 'Ota-Onaga', text: this.newMessage });
           
           this.getAIAdvice(this.newMessage).then(advice => {
             this.chatMessages.push({ sender: 'Tarbiyachi', text: advice });
           });
           this.newMessage = '';
         }
       },
       async getAIAdvice(message) {
         try {
           const response = await fetch('API_URL/ai', {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ prompt: message }),
           });
           const result = await response.json();
           return result.message || 'AI javobi topilmadi';
         } catch (error) {
           console.error('AI xatosi:', error);
           return 'AI bilan bog‘lanishda xatolik yuz berdi';
         }
       },
     },
   };
   </script>
     