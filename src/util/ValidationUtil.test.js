import {
  validateEmail,
  validatePassword,
  validateSellerName,
  status,
} from './ValidationUtil'

//  npx jest src/util/ValidationUtil.test.js   -- this command only runs validationUtil.test

describe('ValidationUtil', () => {
  describe('validateEmail', () => {
    test('should return SUCCESS for a valid email', () => {
      const result = validateEmail('user@example.com')
      expect(result.status).toBe(status.SUCCESS)
      expect(result.error).toBeNull()
    })

    test('should return FAIL for an email without domain', () => {
      const result = validateEmail('user@')
      expect(result.status).toBe(status.FAIL)
      expect(result.error).toBe('Email має бути у форматі someone@example.com')
    })

    test('should return FAIL for an invalid email without "@"', () => {
      const result = validateEmail('invalidemail.com')
      expect(result.status).toBe(status.FAIL)
      expect(result.error).toBe('Email має бути у форматі someone@example.com')
    })

    test('should return FAIL for an empty email string', () => {
      const result = validateEmail('')
      expect(result.status).toBe(status.FAIL)
      expect(result.error).toBe('Email має бути у форматі someone@example.com')
    })
  })

  describe('validatePassword', () => {
    test('should return SUCCESS for a valid password containing letters and numbers, 9+ characters', () => {
      const result = validatePassword('Pass12345')
      expect(result.status).toBe(status.SUCCESS)
      expect(result.error).toBeNull()
    })

    test('should return FAIL for a password shorter than 9 characters', () => {
      const result = validatePassword('Pass12')
      expect(result.status).toBe(status.FAIL)
      expect(result.error).toBe(
        'Пароль має містити щонайменше 8 літер та один числовий символ.'
      )
    })

    test('should return FAIL for a password with spaces', () => {
      const result = validatePassword('Pass 1234')
      expect(result.status).toBe(status.FAIL)
      expect(result.error).toBe(
        'Пароль має містити щонайменше 8 літер та один числовий символ.'
      )
    })

    test('should return FAIL for a password with special characters', () => {
      const result = validatePassword('Password!23')
      expect(result.status).toBe(status.FAIL)
      expect(result.error).toBe(
        'Пароль має містити щонайменше 8 літер та один числовий символ.'
      )
    })

    test('should return FAIL for a password with numbers only', () => {
      const result = validatePassword('123456789')
      expect(result.status).toBe(status.FAIL)
      expect(result.error).toBe(
        'Пароль має містити щонайменше 8 літер та один числовий символ.'
      )
    })

    test('should return FAIL for a password without numbers', () => {
      const result = validatePassword('Password')
      expect(result.status).toBe(status.FAIL)
      expect(result.error).toBe(
        'Пароль має містити щонайменше 8 літер та один числовий символ.'
      )
    })

    test('should return FAIL for a password with Cyrillic letters', () => {
      const result = validatePassword('Пароль123')
      expect(result.status).toBe(status.FAIL)
      expect(result.error).toBe(
        'Пароль має містити щонайменше 8 літер та один числовий символ.'
      )
    })

    test('should return FAIL for a password with only special characters', () => {
      const result = validatePassword('@#$%^&*!')
      expect(result.status).toBe(status.FAIL)
      expect(result.error).toBe(
        'Пароль має містити щонайменше 8 літер та один числовий символ.'
      )
    })

    test('should return FAIL for an empty password string', () => {
      const result = validatePassword('')
      expect(result.status).toBe(status.FAIL)
      expect(result.error).toBe(
        'Пароль має містити щонайменше 8 літер та один числовий символ.'
      )
    })
  })

  describe('validateSellerName', () => {
    test('should return SUCCESS for a valid seller name within 3-50 characters', () => {
      const result = validateSellerName('Best Shop')
      expect(result.status).toBe(status.SUCCESS)
      expect(result.error).toBeNull()
    })

    test('should return SUCCESS for a valid name with leading and trailing spaces (trimmed)', () => {
      const result = validateSellerName('   Best Shop   ')
      expect(result.status).toBe(status.SUCCESS)
      expect(result.error).toBeNull()
    })

    test('should return FAIL for a name with unsupported special character (@)', () => {
      const result = validateSellerName('Shop@Name')
      expect(result.status).toBe(status.FAIL)
      expect(result.error).toBe(
        'Назва продавця має містити від 3 до 50 символів (UA або EN)'
      )
    })

    test('should return FAIL for a name with HTML-like tags', () => {
      const result = validateSellerName('<b>Shop</b>')
      expect(result.status).toBe(status.FAIL)
      expect(result.error).toBe(
        'Назва продавця має містити від 3 до 50 символів (UA або EN)'
      )
    })

    test('should return FAIL for a name with forward slash', () => {
      const result = validateSellerName('Shop/Name')
      expect(result.status).toBe(status.FAIL)
      expect(result.error).toBe(
        'Назва продавця має містити від 3 до 50 символів (UA або EN)'
      )
    })

    test('should return FAIL for a name with backslash', () => {
      const result = validateSellerName('Shop\\Name')
      expect(result.status).toBe(status.FAIL)
      expect(result.error).toBe(
        'Назва продавця має містити від 3 до 50 символів (UA або EN)'
      )
    })

    test('should return FAIL for a name with parentheses', () => {
      const result = validateSellerName('Shop(Name)')
      expect(result.status).toBe(status.FAIL)
      expect(result.error).toBe(
        'Назва продавця має містити від 3 до 50 символів (UA або EN)'
      )
    })

    test('should return FAIL for a name with dot', () => {
      const result = validateSellerName('Shop.Name')
      expect(result.status).toBe(status.FAIL)
      expect(result.error).toBe(
        'Назва продавця має містити від 3 до 50 символів (UA або EN)'
      )
    })

    test('should return FAIL for a name with question mark', () => {
      const result = validateSellerName('Shop?Name')
      expect(result.status).toBe(status.FAIL)
      expect(result.error).toBe(
        'Назва продавця має містити від 3 до 50 символів (UA або EN)'
      )
    })

    test('should return FAIL for a name with exclamation mark', () => {
      const result = validateSellerName('Shop!Name')
      expect(result.status).toBe(status.FAIL)
      expect(result.error).toBe(
        'Назва продавця має містити від 3 до 50 символів (UA або EN)'
      )
    })

    test('should return FAIL for a name with colon', () => {
      const result = validateSellerName('Shop:Name')
      expect(result.status).toBe(status.FAIL)
      expect(result.error).toBe(
        'Назва продавця має містити від 3 до 50 символів (UA або EN)'
      )
    })

    test('should return FAIL for a name shorter than 3 characters', () => {
      const result = validateSellerName('AB')
      expect(result.status).toBe(status.FAIL)
      expect(result.error).toBe(
        'Назва продавця має містити від 3 до 50 символів (UA або EN)'
      )
    })

    test('should return FAIL for a name longer than 50 characters', () => {
      const longName = 'A'.repeat(51)
      const result = validateSellerName(longName)
      expect(result.status).toBe(status.FAIL)
      expect(result.error).toBe(
        'Назва продавця має містити від 3 до 50 символів (UA або EN)'
      )
    })

    test('should return FAIL for an empty seller name', () => {
      const result = validateSellerName('')
      expect(result.status).toBe(status.FAIL)
      expect(result.error).toBe(
        'Назва продавця має містити від 3 до 50 символів (UA або EN)'
      )
    })
  })
})
