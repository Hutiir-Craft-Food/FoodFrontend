const status = {
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL',
}

const validateEmail = (email) => ({ status: status.SUCCESS, error: null })

const validatePassword = (password) => ({ status: status.SUCCESS, error: null })

const validateSellerName = (sellerName) => ({
  status: status.SUCCESS,
  error: null,
})

export { validateEmail, validatePassword, validateSellerName }
