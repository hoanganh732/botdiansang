//const TelegramBot = require('node-telegram-bot-api');
const { getTodayIndex } = require('./utils');
const foodOptions = require('./food-options');
const people = require('./people');
require('dotenv').config();

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

const GROUP_ID = process.env.GROUP_ID;
const POLL_TIME = '12:21';
const REMINDER_TIME = '12:21';

function sendPoll() {
  const todayIndex = getTodayIndex();
  const todayPerson = people[todayIndex % people.length];
  const foodList = Object.keys(foodOptions);

  bot.sendPoll(GROUP_ID, 'Hôm nay ăn gì?', foodList, {
    is_anonymous: false,
    allows_multiple_answers: false,
  });

  const stickerId = 'CAACAgUAAxkBAAEFvU5mWnQXy1Zg5RwUdwEAAa-EwXN1NDgAAhkcAAIYBIVVNcuIDTpXGfowBA'; // Sticker vui
  bot.sendSticker(GROUP_ID, stickerId);
  bot.sendMessage(GROUP_ID, `Hôm nay <b>${todayPerson}</b> mở hàng nha mọi người!`, { parse_mode: 'HTML' });
}

function sendReminder() {
  const todayIndex = getTodayIndex();
  const todayPerson = people[todayIndex % people.length];

  bot.sendMessage(GROUP_ID, `@${todayPerson} ơi, nhớ gửi mã QR ngân hàng để mọi người chuyển khoản nha!`);
}

// Hàm kiểm tra giờ và chạy job
function scheduleJobs() {
  setInterval(() => {
    const now = new Date();
    const time = now.toTimeString().slice(0, 5);
    if (time === POLL_TIME) sendPoll();
    if (time === REMINDER_TIME) sendReminder();
  }, 60 * 1000);
}

scheduleJobs();

console.log("lên lịch",POLL_TIME);
console.log("Gửi QR",REMINDER_TIME);


