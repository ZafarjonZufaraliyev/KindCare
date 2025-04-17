<template lang="">
     <div>
          <div class="banner">
               <div class="contaner2">
                    <div class="banner__wr">
                         <div class="banner__text">
                              <h2 class="banner__titel">
                                   KindCare har doim siz bilan
                              </h2>
                              
                         </div>
                         <div class="image">
                              <img src="../assets/img/bannerR.png" alt="">
                         </div>
                    </div>
               </div>
          </div>
    <div class="hamkorlar">
      <div class="contaner2">
        <div class="hamkorlar__wr">
          <div class="hamkor__logo">
            <img src="../assets/img/market.png" class="hamkor__rasm" />
            <h2 class="hamkorlar__titel">Uzum</h2>
          </div>
          <div class="hamkorlar__card">
            <!-- Karta elementlari -->
            <div class="card" v-for="(item, index) in items" :key="index" @click="openModal(item)">
              <img :src="item.image" :alt="item.name" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="selectedItem" class="modal">
  <div class="modal-content">
    <h2>{{ selectedItem.name }}</h2>
    <img :src="selectedItem.image" alt="" />
    <p>{{ selectedItem.description }}</p>

    <!-- Quantity changer -->
    <div class="quantity-control">
      <button @click="decreaseQuantity">-</button>
      <span>{{ quantity }}</span>
      <button @click="increaseQuantity">+</button>
    </div>

    <div class="modal-footer">
      <button @click="addToCart">Buyurtma berish</button>
      <button @click="closeModal">Yopish</button>
    </div>
  </div>
</div>
     </div>
</template>
<script>
import kiyim1 from '../assets/img/kiyim1.png';
import kiyim2 from '../assets/img/kiyim2.png';
import kiyim3 from '../assets/img/kiyim3.jpg';
import kiyim4 from '../assets/img/kiyim4.png';


export default {
     
     data() {
    return {
      items: [
        { name: 'Kiyim 1', image: kiyim1, description: 'Stylish dress for all occasions.' },
        { name: 'Kiyim 2', image: kiyim2, description: 'Comfortable and elegant.' },
        { name: 'Kiyim 3', image: kiyim3, description: 'Perfect for summer wear.' },
        { name: 'Kiyim 4', image:kiyim4 , description: 'Trendy and fashionable.' },
      ],
      selectedItem: null,
      quantity: 1,
      cart: [],
    };
  },
  methods: {
    openModal(item) {
      this.selectedItem = item;
      this.quantity = 1;
    },
    closeModal() {
      this.selectedItem = null;
    },
    increaseQuantity() {
      this.quantity++;
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    addToCart() {
      if (this.selectedItem) {
        this.cart.push({ ...this.selectedItem, quantity: this.quantity });
        this.closeModal();
        alert(`${this.selectedItem.name} (${this.quantity} ta) savatchaga qo‘shildi!`);
      }
    },
  },
};
</script>