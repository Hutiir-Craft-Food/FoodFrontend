const status = {
  SUCCESS: 'success',
  FAIL: 'fail',
}

const validateEmail = (email) => {
  return { status: status.SUCCESS, error: null }
}

const validatePassword = (password) => ({ status: status.SUCCESS, error: null })

const validateSellerName = (sellerName) => ({
  status: status.SUCCESS,
  error: null,
})

export { validateEmail, validatePassword, validateSellerName }
