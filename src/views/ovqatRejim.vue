<template>
     <div>
       <div class="ovqatRejim">
         <div class="contaner2">
           <div class="loadd" v-if="loadingg">
             <div class="loadingg"></div>
           </div>
           <div class="ovqatRejim__wr">
             <h2 class="ovqat__vaqti">
               {{ kun }}, {{ currentDate }}, <span>(Bugun)</span>
             </h2>
             <div class="card__wr">
               <!-- CARD 1: NONUSHTA -->
               <div class="card">
                 <div class="card__img">
                   <img src="../assets/img/nonushta.jpg" alt="Nonushta rasmi" />
                 </div>
                 <div class="card__text">
                   <h2 class="card__titel">Nonushta</h2>
                   <button @click="analyzeImage('nonushta')">AI bilan tekshir</button>
                   <p v-if="aiResult.nonushta" class="ai__javob">{{ aiResult.nonushta }}</p>
                 </div>
               </div>
   
               <!-- CARD 2: TUSHLIK -->
               <div class="card">
                 <div class="card__img">
                   <img src="../assets/img/tushlik.jpg" alt="Tushlik rasmi" />
                 </div>
                 <div class="card__text">
                   <h2 class="card__titel">Tushlik</h2>
                   <button @click="analyzeImage('tushlik')">AI bilan tekshir</button>
                   <p v-if="aiResult.tushlik" class="ai__javob">{{ aiResult.tushlik }}</p>
                 </div>
               </div>
   
               <!-- CARD 3: KECHGA OVQAT -->
               <div class="card">
                 <div class="card__img">
                   <img src="../assets/img/kechgaOvqat.jpg" alt="Kechga ovqat rasmi" />
                 </div>
                 <div class="card__text">
                   <h2 class="card__titel">Kechga ovqat</h2>
                   <button @click="analyzeImage('kechgaOvqat')">AI bilan tekshir</button>
                   <p v-if="aiResult.kechgaOvqat" class="ai__javob">{{ aiResult.kechgaOvqat }}</p>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   </template>
   
   <script>
   export default {
     data() {
       return {
         latestnew: {},
         loadingg: false,
         aiResult: {
           nonushta: '',
           tushlik: '',
           kechgaOvqat: ''
         }
       };
     },
     methods: {
       async getLatesNews() {
         try {
           this.loadingg = true;
           let res = await fetch('');
           this.latestnew = res.data?.last_news;
         } catch (err) {
           console.log(err);
         } finally {
           this.loadingg = false;
         }
       },
       kunniTop() {
         const hozir = new Date();
         const kunlar = ['Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba'];
         const index = hozir.getDay();
         this.kun = kunlar[index];
         this.currentDate = hozir.toLocaleDateString('uz-UZ');
       },
   
       async analyzeImage(ovqatNomi) {
         this.loadingg = true;
   
         let imagePath = '';
         if (ovqatNomi === 'nonushta') imagePath = 'nonushta.jpg';
         if (ovqatNomi === 'tushlik') imagePath = 'tushlik.jpg';
         if (ovqatNomi === 'kechgaOvqat') imagePath = 'kechgaOvqat.jpg';
   
         try {
           const res = await fetch('https://your-backend-api.com/analyze', {
             method: 'POST',
             headers: {
               'Content-Type': 'application/json'
             },
             body: JSON.stringify({ image: imagePath }) 
           });
           const data = await res.json();
           this.aiResult[ovqatNomi] = data.result; 
         } catch (err) {
           console.error('AI bilan bog‘lanishda xato:', err);
           this.aiResult[ovqatNomi] = 'AI hozircha bu rasmni tahlil qila olmadi.';
         } finally {
           this.loadingg = false;
         }
       }
     },
     mounted() {
       this.kunniTop();
       this.getLatesNews();
     }
   };
   </script>
   

   