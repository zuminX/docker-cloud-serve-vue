const { mockAPI } = require('./utils')

const security = require('./api/security')
const user = require('./api/user')

const mocks = [
  ...game,
  ...gameRace,
  ...gameRank,
  ...security,
  ...sudoku,
  ...user
]

for (const mock of mocks) {
  mockAPI(mock)
}

