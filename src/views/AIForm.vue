<template>
  <div class="container">
    <div class="ai-form">
      <h3>Bolaning o'zlashtrish darajasi</h3>
      <div class="form-group">
        <label for="nutq">Nutq:</label>
        <span>{{ nutq }}</span>
      </div>
      <div class="form-group">
        <label for="fikr">Fikrlash:</label>
        <span>{{ fikr }}</span>
      </div>
      <div class="form-group">
        <label for="ijtimoiy">Ijtimoiylik:</label>
        <span>{{ ijtimoiy }}</span>
      </div>
      <div class="form-group">
        <label for="harakat">Harakat:</label>
        <span>{{ harakat }}</span>
      </div>

      <button @click="getAiAdvice">Tavsiyalarni Ko‘rish</button>
    </div>

    <div v-if="aiNutq || aiFikr || aiIjtimoiy || aiHarakat || umumiy" class="result">
      <h3>AI Tavsiyasi:</h3>
      <ul>
        <li v-if="aiNutq">🗣️ <strong>Nutq:</strong> {{ aiNutq }}</li>
        <li v-if="aiFikr">💡 <strong>Fikrlash:</strong> {{ aiFikr }}</li>
        <li v-if="aiIjtimoiy">👥 <strong>Ijtimoiylik:</strong> {{ aiIjtimoiy }}</li>
        <li v-if="aiHarakat">🏃 <strong>Harakat:</strong> {{ aiHarakat }}</li>
      </ul>
      <p><strong>Umumiy baho:</strong> {{ umumiy }}</p>
    </div>

    <!-- Chat Modal -->
    <div v-if="showChat" class="chat-modal">
      <div class="chat-box">
        <h3>🗨️ Tarbiyachi bilan suhbat:</h3>
        <div class="messages">
          <div v-for="(message, index) in chatMessages" :key="index" :class="message.sender">
            <strong>{{ message.sender }}:</strong> {{ message.text }}
          </div>
        </div>
        <textarea v-model="newMessage" placeholder="Sizning xabaringiz..."></textarea>
        <button @click="sendMessage">Yuborish</button>
        <button @click="closeChat">Yopish</button>
      </div>
    </div>
    
    <!-- Open Chat Button -->
    <button class="open-chat-btn" @click="openChat">Chat</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nutq: 4, // Tarbiyachining baholari
      fikr: 3,
      ijtimoiy: 5,
      harakat: 2,
      aiNutq: '',
      aiFikr: '',
      aiIjtimoiy: '',
      aiHarakat: '',
      umumiy: '',
      showChat: false,
      newMessage: '',
      chatMessages: [],
    };
  },
  methods: {
    getAiAdvice() {
      const prompt = `
        Bola quyidagi baholarga ega:Nutq:${this.nutq}Fikrlash:${this.fikr}Ijtimoiylik:${this.ijtimoiy}Harakat:${this.harakat}
      `.trim();

      fetch('http://localhost:5000/api/ai', { // Backend URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt })
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const result = data.result;
          this.aiNutq = this.extractAdvice(result, 'Nutq');
          this.aiFikr = this.extractAdvice(result, 'Fikrlash');
          this.aiIjtimoiy = this.extractAdvice(result, 'Ijtimoiylik');
          this.aiHarakat = this.extractAdvice(result, 'Harakat');

          const umumiyStart = result.indexOf('Umumiy') !== -1 ? result.indexOf('Umumiy') : result.length;
          this.umumiy = result.slice(umumiyStart).trim();
        } else {
          this.umumiy = 'AI tavsiyasini olishda muammo yuz berdi.';
        }
      })
      .catch(err => {
        console.error('AI bilan bog‘lanishda xatolik:', err);
        this.umumiy = 'AI tavsiyasini olishda muammo yuz berdi.';
      });
    },

    extractAdvice(text, section) {
      const regex = new RegExp(`${section}\\s*[:\\-–]?\\s*(.+?)(?=\\n\\s*\\S|$)`, 'is');
      const match = text.match(regex);
      return match ? match[1].trim() : '';
    },

    openChat() {
      this.showChat = true;
    },

    closeChat() {
      this.showChat = false;
    },

    sendMessage() {
      if (this.newMessage.trim() !== '') {
        this.chatMessages.push({
          sender: 'Ota-ona',
          text: this.newMessage
        });
        this.newMessage = '';

        // Backendga xabar yuborish
        fetch('http://localhost:5000/api/chat', { // Backend URL
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ message: this.chatMessages[this.chatMessages.length - 1].text })
        })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            // Tarbiyachi javobi
            this.chatMessages.push({
              sender: 'Tarbiyachi',
              text: data.response
            });
          }
        })
        .catch(err => {
          console.error('Chat yuborishda xatolik:', err);
        });
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

.ai-form {
  margin-top: 250px;
  background: #ffffff;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 15px;
}

h3 {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
}

.form-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

label {
  font-weight: 600;
  font-size: 16px;
}

span {
  font-size: 16px;
}

button {
  background-color: #3a86ff;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #265dd1;
}

.result {
  margin-top: 20px;
  background-color: #f5f5f5;
  padding: 20px;
  border-left: 5px solid #3a86ff;
  border-radius: 8px;
  color: #444;
}

.result h3 {
  font-size: 20px;
  font-weight: bold;
}

.result ul {
  list-style-type: none;
  padding: 0;
}

.result li {
  margin-bottom: 12px;
}

.result p {
  font-size: 18px;
  font-weight: bold;
}

/* Chat Modal Styles */
.chat-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.chat-box {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 60%;
  max-width: 600px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.messages {
  height: 200px;
  overflow-y: auto;
  margin-bottom: 15px;
}

.messages div {
  padding: 8px;
  background-color: #f1f1f1;
  border-radius: 8px;
}

textarea {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-bottom: 12px;
}

.open-chat-btn {
  background-color: rgb(58, 134, 255,0.5);
  color: white;
  border: none;
  border-radius: 3  0%;
  padding: 15px;
  position: fixed;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.);
  transition: background-color 0.3s;
}

.open-chat-btn:hover {
  background-color: #265dd1;
}
</style>
