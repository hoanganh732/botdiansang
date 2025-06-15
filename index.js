import TelegramBot from 'node-telegram-bot-api'
import cron from 'node-cron'
import dotenv from 'dotenv'
import people from './people.js'
import foodOptions from './food-options.js'
import { getTodayPerson, getNextPersonIndex } from './utils.js'

dotenv.config()

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true })

// Cron 6:30 sáng – gửi poll
cron.schedule('30 6 * * *', async () => {
  const todayIndex = getNextPersonIndex()
  const person = people[todayIndex]

  await bot.sendPoll(process.env.GROUP_ID, '🍽️ Hôm nay ăn gì?', foodOptions, {
    is_anonymous: false,
    allows_multiple_answers: true,
  })

  await bot.sendMessage(process.env.GROUP_ID, `📢 Hôm nay đến lượt ${person} đi mua đồ ăn sáng nha!`, {
    parse_mode: 'Markdown',
  })
})

// Cron 7:45 – nhắc người đó gửi mã QR
cron.schedule('45 7 * * *', () => {
  const todayIndex = getNextPersonIndex()
  const person = people[todayIndex]

  bot.sendMessage(process.env.GROUP_ID, `⏰ *${person}* ơi, nhớ gửi mã QR ngân hàng để mọi người chuyển khoản nha! 🏦`, {
    parse_mode: 'Markdown',
  })
})
