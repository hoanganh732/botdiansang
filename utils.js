const people = require('./people');

export function getNextPersonIndex() {
  const today = new Date()
  const dayCount = Math.floor(today.getTime() / (1000 * 60 * 60 * 24))
  return dayCount % people.length
}

export function getTodayPerson() {
  return people[getNextPersonIndex()]
}
