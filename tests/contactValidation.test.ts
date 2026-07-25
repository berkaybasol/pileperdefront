import assert from 'node:assert/strict'
import test from 'node:test'
import {
  normalizeContactEmail,
  normalizeContactPhone,
} from '../lib/contactValidation.ts'

test('normalizes supported Turkish formats to the same E.164 number', () => {
  const expected = '+905335127272'
  assert.equal(normalizeContactPhone('05335127272', 'TR'), expected)
  assert.equal(normalizeContactPhone('5335127272', 'TR'), expected)
  assert.equal(normalizeContactPhone('+905335127272', 'TR'), expected)
})

test('normalizes a valid international number using the selected country', () => {
  assert.equal(normalizeContactPhone('202 555 0123', 'US'), '+12025550123')
})

test('rejects incomplete or invalid phone numbers', () => {
  assert.equal(normalizeContactPhone('533512', 'TR'), null)
  assert.equal(normalizeContactPhone('123', 'US'), null)
})

test('trims and validates email addresses', () => {
  assert.equal(
    normalizeContactEmail('  musteri@example.com  '),
    'musteri@example.com'
  )
  assert.equal(normalizeContactEmail('hatali@'), null)
})
