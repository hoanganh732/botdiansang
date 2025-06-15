function getTodayIndex() {
  const today = new Date();
  const start = new Date('2024-01-01');
  const diff = Math.floor((today - start) / (1000 * 60 * 60 * 24));
  return diff;
}

module.exports = { getTodayIndex };
