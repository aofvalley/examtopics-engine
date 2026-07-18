export const normalizeAnswers = (answers) => {
  const values = Array.isArray(answers) ? answers : [answers]
  const letters = values.flatMap((value) => {
    const normalized = String(value ?? '').trim().toUpperCase()

    if (/^[A-Z]+$/.test(normalized)) {
      return normalized.split('')
    }

    return normalized.match(/\b[A-Z]\b/g) ?? []
  })

  return [...new Set(letters)].sort()
}

export const isAnswerCorrect = (userAnswer, correctAnswer) => {
  const normalizedUserAnswer = normalizeAnswers(userAnswer)
  const normalizedCorrectAnswer = normalizeAnswers(correctAnswer)

  return normalizedCorrectAnswer.length > 0
    && normalizedUserAnswer.length === normalizedCorrectAnswer.length
    && normalizedUserAnswer.every((answer, index) => answer === normalizedCorrectAnswer[index])
}

export const formatAnswers = (answers) => normalizeAnswers(answers).join(', ')
