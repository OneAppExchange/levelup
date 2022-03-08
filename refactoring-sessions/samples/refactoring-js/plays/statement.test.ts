import { statement } from "./statement"

require('./statement')
const play = require('./play.json')
const invoices = require('./invoices.json');

test('statement for invoice', () => {  
  expect(statement(invoices[0], play)).toEqual(`Statement for BigCo
  Hamlet: $650.00 (55 seats)
  As You Like It: $580.00 (35 seats)
  Othello: $500.00 (40 seats)
Amount owed is $1,730.00
You earned 47 credits
`);
});