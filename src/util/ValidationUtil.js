const status = {
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL',
}

const validateEmail = (email) => {
  ;({ status: status.SUCCESS, error: null })
}

const validatePassword = (password) => {
  ;({ status: status.SUCCESS, error: null })
}

export default { validateEmail, validatePassword }
