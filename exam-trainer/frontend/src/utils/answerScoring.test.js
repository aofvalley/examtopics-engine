import assert from 'node:assert/strict'
import test from 'node:test'
import { formatAnswers, isAnswerCorrect, normalizeAnswers } from './answerScoring.js'

test('normalizes comma-separated and compact answer formats', () => {
  assert.deepEqual(normalizeAnswers('A, B, D'), ['A', 'B', 'D'])
  assert.deepEqual(normalizeAnswers('DBA'), ['A', 'B', 'D'])
})

test('accepts the same multiple answers regardless of selection order', () => {
  assert.equal(isAnswerCorrect(['B', 'A'], 'A, B'), true)
})

test('rejects incomplete or excessive multiple answers', () => {
  assert.equal(isAnswerCorrect(['A'], 'A, B'), false)
  assert.equal(isAnswerCorrect(['A', 'B', 'C'], 'A, B'), false)
})

test('compares single and unanswered questions correctly', () => {
  assert.equal(isAnswerCorrect(['C'], 'C'), true)
  assert.equal(isAnswerCorrect([], 'C'), false)
  assert.equal(isAnswerCorrect(undefined, 'C'), false)
  assert.equal(isAnswerCorrect([], undefined), false)
})

test('formats normalized answers for the review screen', () => {
  assert.equal(formatAnswers('B, A'), 'A, B')
})
