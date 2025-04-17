import 'dotenv/config';
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// AI tavsiyalarini olish uchun endpoint
app.post('/api/ai', async (req, res) => {
  const { prompt } = req.body;

  // prompt tekshiruvi
  if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
    return res.status(400).json({ error: 'Prompt yuborilmadi yoki noto‘g‘ri formatda' });
  }

  console.log(`📩 Yuborilgan prompt: ${prompt}`); // Tekshirish uchun log
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (data?.choices?.length > 0) {
      const aiResponse = data.choices[0].message.content;
      console.log('🤖 AI javobi:', aiResponse);
      res.json({ message: aiResponse });
    } else {
      console.error('❌ AI javobi topilmadi:', data);
      res.status(500).json({ error: 'AI javobi topilmadi' });
    }
  } catch (err) {
    console.error('🚨 Xatolik yuz berdi:', err);
    res.status(500).json({ error: 'API ga ulanishda xatolik' });
  }
});

// Serverni ishga tushirish
app.listen(port, () => {
  console.log(`✅ Server ishga tushdi: http://localhost:${port}`);
});
