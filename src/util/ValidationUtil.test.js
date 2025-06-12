import {
  validateEmail,
  validatePassword,
  validateSellerName,
  status,
} from './ValidationUtil'

//  npx jest src/util/ValidationUtil.test.js   -- this command only runs validationUtil.test

describe('ValidationUtil', () => {
  describe('validateEmail', () => {
    it('should return SUCCESS for a valid email', () => {
      const result = validateEmail('user@example.com')
      expect(result.status).toBe(status.SUCCESS)
      expect(result.error).toBeNull()
    })

    it('should return FAIL for an email without domain', () => {
      const result = validateEmail('user@')
      expect(result.status).toBe(status.FAIL)
      expect(result.error).toBe('Email має бути у форматі someone@example.com')
    })

    it('should return FAIL for an invalid email without "@"', () => {
      const result = validateEmail('invalidemail.com')
      expect(result.status).toBe(status.FAIL)
      expect(result.error).toBe('Email має бути у форматі someone@example.com')
    })

    it('should return FAIL for an empty email string', () => {
      const result = validateEmail('')
      expect(result.status).toBe(status.FAIL)
      expect(result.error).toBe('Email має бути у форматі someone@example.com')
    })
  })

  describe('validatePassword', () => {
    it('should return SUCCESS for a valid password containing letters and numbers, 9+ characters', () => {
      const result = validatePassword('Pass12345')
      expect(result.status).toBe(status.SUCCESS)
      expect(result.error).toBeNull()
    })

    it('should return FAIL for a password with numbers only', () => {
      const result = validatePassword('123456789')
      expect(result.status).toBe(status.FAIL)
      expect(result.error).toBe(
        'Пароль має містити щонайменше 8 літер та один числовий символ.'
      )
    })

    it('should return FAIL for a password without numbers', () => {
      const result = validatePassword('Password')
      expect(result.status).toBe(status.FAIL)
      expect(result.error).toBe(
        'Пароль має містити щонайменше 8 літер та один числовий символ.'
      )
    })

    it('should return FAIL for a password shorter than 9 characters', () => {
      const result = validatePassword('P1short')
      expect(result.status).toBe(status.FAIL)
      expect(result.error).toBe(
        'Пароль має містити щонайменше 8 літер та один числовий символ.'
      )
    })

    it('should return FAIL for an empty password string', () => {
      const result = validatePassword('')
      expect(result.status).toBe(status.FAIL)
      expect(result.error).toBe(
        'Пароль має містити щонайменше 8 літер та один числовий символ.'
      )
    })
  })

  describe('validateSellerName', () => {
    it('should return SUCCESS for a valid seller name within 3-50 characters', () => {
      const result = validateSellerName('Best Shop')
      expect(result.status).toBe(status.SUCCESS)
      expect(result.error).toBeNull()
    })

    it('should return FAIL for a name shorter than 3 characters', () => {
      const result = validateSellerName('AB')
      expect(result.status).toBe(status.FAIL)
      expect(result.error).toBe(
        'Назва продавця має містити від 3 до 50 символів (UA або EN)'
      )
    })

    it('should return FAIL for a name longer than 50 characters', () => {
      const longName = 'A'.repeat(51)
      const result = validateSellerName(longName)
      expect(result.status).toBe(status.FAIL)
      expect(result.error).toBe(
        'Назва продавця має містити від 3 до 50 символів (UA або EN)'
      )
    })

    it('should return FAIL for an empty seller name', () => {
      const result = validateSellerName('')
      expect(result.status).toBe(status.FAIL)
      expect(result.error).toBe(
        'Назва продавця має містити від 3 до 50 символів (UA або EN)'
      )
    })
  })
})
