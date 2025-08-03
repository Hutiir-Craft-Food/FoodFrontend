const statuses = {
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL',
}

const validateEmail = (email) => {
  const pattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/

  if (pattern.test(email)) {
    return { status: statuses.SUCCESS, error: null }
  }

  return {
    status: statuses.FAIL,
    error: 'Email має бути у форматі someone@example.com',
  }
}

const validatePassword = (password) => {
  const pattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=-])[A-Za-z\s\d!@#$%^&*()_+=-]{8,30}$/

  if (pattern.test(password)) {
    return { status: statuses.SUCCESS, error: null }
  }

  return {
    status: statuses.FAIL,
    error: 'Пароль має містити щонайменше 8 літер та один числовий символ.',
  }
}

const validateSellerName = (sellerName) => {
  const trimmedName = sellerName.trim()
  const pattern = /^[a-zA-Zа-яА-ЯІіЇїЄєҐґ\d&,`'\-\s"]{3,50}$/

  if (pattern.test(trimmedName)) {
    return { status: statuses.SUCCESS, error: null }
  }

  return {
    status: statuses.FAIL,
    error: 'Назва продавця має містити від 3 до 50 символів (UA або EN)',
  }
}

export { validateEmail, validatePassword, validateSellerName, statuses }
