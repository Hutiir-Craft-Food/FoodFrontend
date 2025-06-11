const status = {
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL',
}

const validateEmail = (email) => {
  const pattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/

  if (pattern.test(email)) {
    return { status: status.SUCCESS, error: null }
  }

  return {
    status: status.FAIL,
    error: 'Email має бути у форматі someone@example.com',
  }
}

const validatePassword = (password) => {
  const errors = []

  if (!/\d/.test(password)) {
    errors.push('Пароль має містити хоча б одну цифру.')
  }

  const letterMatches = password.match(/[a-zA-Zа-яА-ЯїЇєЄґҐ]/g)

  if (!letterMatches || letterMatches.length < 8) {
    errors.push('Пароль має містити щонайменше 8 літер.')
  }

  return errors
}

const validateSellerName = (sellerName) => {
  const pattern = /^[a-zA-Zа-яА-ЯІіЇїЄєҐґ\d&,`'\-\s"]{3,50}$/

  if (pattern.test(sellerName)) {
    return { status: status.SUCCESS, error: null }
  }

  return {
    status: status.FAIL,
    error: 'Назва продавця має містити від 3 до 50 символів (UA або EN)',
  }
}

export { validateEmail, validatePassword, validateSellerName, status }
