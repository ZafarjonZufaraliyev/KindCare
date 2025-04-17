<template lang="">
  <div class="app-wrapper">
     
     <header>
  <div class="header"  :class="{'scrolled': isScrolled}">
    <div class="contaner2">
      <div class="header__wr">
        <div class="logo">
          <img src="@/assets/img/KindCare.png" alt="">
        </div>
        <button class="menu-toggle" @click="toggleMenu">
          ☰
        </button>
        <ul :class="['manu', { active: isMenuOpen }]">
          <li class="atem"><router-link to="/davomat">Davomat</router-link></li>
          <li class="atem"><router-link to="/Ovqatlanish">Ovqatlanish rejimi</router-link></li>
          <li class="atem"><router-link to="/rasmlar">Rasmlar qismi</router-link></li>
          <li class="atem"><router-link to="/aiform">Dori nazorati</router-link></li>
        </ul>
      </div>
    </div>
  </div>
</header>


     <!-- <div class="acount" >
          <div class="contaner">
             <div class="acount__wr">
               <div class="img">
                    <img src="@/assets/img/person.jpg" alt="">
               </div>
               <div class="text">
                    <h2 class="name">Zafarjon Zufaraiyev</h2>
                    <p class="tel">+998 88 667 4321</p>
               </div>
             </div>
          </div>
     </div> -->
     
     <main class="main-content">
          <RouterView />
     </main>
        
      <footer>
          <div class="footer">
               <div class="footer__wr">
                    <div class="contaner2">
                         <div class="footer__help">
                              <div class="footer__logo">
                                   <div class="logo">
                                       <img src="@/assets/img/KindCare.png" alt="">
                                   </div>
                                   <div class="footer__logo__text">
                                        <h2 class="footer__tel">+998 88 667 12 11</h2>
                                        <p class="footer__desc">
                                             Farg'ona shahar, Qikguli mavzesi,shukrona ko'chasi, 2A
                                        </p>
                                   </div>
                              </div>
                              <div class="footer__card__wr">
                                  
                                   <ul class="footer__card">
                                        <li class="card__atem-titel">Ma'lumot</li>
                                        <li class="card__atem"><a href="#">Bog'lanish</a></li>
                                        <li class="card__atem"><a href="#">Blog</a></li>
                                        <li class="card__atem"><a href="#">FAQ</a></li>
                                   </ul>
     
                              </div>
                         </div>
                         <div class="footer__icons">
                              <div class="text">
                                   <p class="desc">
                                        © KindCare 2025 .
                                   </p>
                              </div>
                              <div class="icons">
                                   <div class="insta">
                                        <a href="#"><i class="fa-brands fa-instagram"></i></a>
                                   </div>
                                   <div class="telegram">
                                        <a href="#"><i class="fa-brands fa-telegram"></i></a>
                                   </div>
     
                                   <div class="link">
                                        <a href="#"><i class="fa-brands fa-linkedin-in"></i></a>
                                   </div>
                                   <div class="twit">
                                        <a href="#"><i class="fa-brands fa-twitter"></i></a>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>

          </div>
     </footer> 
  </div>
</template>
<script>
export default {
  data() {
    return {
      isMenuOpen: false,
      isScrolled: false,
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    },
    handleScroll() {
      // Skrolning balandligini tekshirish
      this.isScrolled = window.scrollY > 50; // Agar skrol balandligi 50px dan katta bo'lsa
    },
  },
  mounted() {
     window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    // Scroll hodisasini olib tashlash
    window.removeEventListener('scroll', this.handleScroll);
  },
}
</script>

<style lang="">
  
</style>