<template>
  <div class="container">
    <h1 class="rasm__titel">📸 Bolangizning Bugungi Faoliyati</h1>

    <div class="grid">
      <div v-for="(faoliyat, index) in faoliyatlar" :key="index" class="card">
        <img :src="faoliyat.rasm" :alt="'Rasm ' + (index + 1)" />
        <div class="card-text">
          <span class="date">📅 {{ faoliyat.vaqt }}</span>
          <span>🤖 AI:</span>
          <p>{{ faoliyat.matn }}</p>
          <div class="actions">
            <button @click="like(index)">❤️ {{ faoliyat.likes }}</button>
            <button @click="openChat(index)">💬 Komment</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h3>Komment yozing:</h3>

        <div class="chat-window">
          <div
            v-for="(msg, i) in chatMessages"
            :key="i"
            :class="['message', msg.type]"
          >
            <strong v-if="msg.type === 'ai'">🤖 AI:</strong>
            <span>{{ msg.text }}</span>
          </div>
        </div>

        <textarea v-model="comment" placeholder="Savolingizni yozing..."></textarea>
        <button @click="sendComment">Yuborish</button>
        <button class="close" @click="closeModal">✖</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'



const faoliyatlar = ref([
  {
    rasm: new URL('../assets/img/bola1.jpg', import.meta.url).href,
    vaqt: 'Seshanba, 2024-04-14, 12:25',
    matn: 'Bolangiz bugun rasm chizish bilan band bo‘ldi.',
    likes: 0
  },
  {
    rasm: new URL('../assets/img/bola2.jpg', import.meta.url).href,
    vaqt: 'Seshanba, 2024-04-14, 12:25',
    matn: 'Kichkintoy konstruktor bilan ijod qildi.',
    likes: 0
  },
  {
    rasm: new URL('../assets/img/bola3.jpg', import.meta.url).href,
    vaqt: 'Seshanba, 2024-04-14, 12:25',
    matn: 'Dars vaqtida do‘stlari bilan o‘rgandi va kuldi.',
    likes: 0
  }
])

const showModal = ref(false)
const comment = ref('')
const chatMessages = ref([])
const activeIndex = ref(null)

function like(index) {
  faoliyatlar.value[index].likes++
}

function openChat(index) {
  showModal.value = true
  comment.value = ''
  chatMessages.value = []
  activeIndex.value = index
}

function closeModal() {
  showModal.value = false
}

function sendComment() {
  if (!comment.value.trim()) return

  chatMessages.value.push({
    type: 'user',
    text: comment.value
  })

  const aiResponse = `Siz yozgan komment bo‘yicha: "${comment.value}" — bu savol juda yaxshi, bolangizda ijobiy o‘sish kuzatilmoqda! ✅`

  chatMessages.value.push({
    type: 'ai',
    text: aiResponse
  })

  comment.value = ''
}

</script>

