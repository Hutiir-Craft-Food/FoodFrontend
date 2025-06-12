import { create } from 'zustand'
import { combine } from 'zustand/middleware'
import ApiClient from '/src/services/apiClient'

import {
  validateEmail,
  validatePassword,
  validateSellerName,
} from '/src/util/ValidationUtil.js'

const roles = {
  GUEST: 'GUEST',
  BUYER: 'BUYER',
  SELLER: 'SELLER',
  ADMIN: 'ADMIN',
}

const actions = {
  LOGIN: 'LOGIN',
  REGISTER: 'REGISTER',
}

// We use `Slices Pattern` below:
// https://zustand.docs.pmnd.rs/guides/slices-pattern
// https://codesandbox.io/p/sandbox/magical-sky-ortp5q

// UserSlice represents data representing a logged in user:
const userSlice = (set) => ({
  user: null,
  setUser: (user) => set({ user }),
})

// Payload Slice represents data for Signin or Signup forms:
const initialPayload = {
  email: '',
  password: '',
  details: null,
  marketingConsent: false,
}

const payloadSlice = combine({ ...initialPayload }, (set, get) => ({
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setDetails: (details) => set({ details }),
  setMarketingConsent: (marketingConsent) => set({ marketingConsent }),
  clearPayload: () => set({ ...initialPayload }),
}))

// TODO: do we need to update user or user details partially ?
//  if yes, then use immer:
//  - https://zustand.docs.pmnd.rs/middlewares/immer
//  - https://github.com/pmndrs/zustand/blob/main/docs/integrations/immer-middleware.md

const visibilitySlice = (set) => ({
  isAuthWidgetVisible: false,
  showAuthWidget: () => set({ isAuthWidgetVisible: true }),
  hideAuthWidget: () => set({ isAuthWidgetVisible: false }),
})

const loginSlice = (set, get) => ({
  login: async () => {
    const hasErrors = get().hasErrors
    if (hasErrors()) return
    const email = get().email
    const password = get().password
    try {
      const response = ApiClient.post('/v1/auth/login', {
        email,
        password,
      })
      const accessToken = response.jwt
      const role = get().role
      get().setUser({ email, role, accessToken })
      get().hideAuthWidget()
      get().setEmail('')
      get().setPassword('')
    } catch (error) {
      console.error('Failed:', error)
    }
  },
})

const logoutSlice = (set, get) => ({
  logout: () => {
    get().setUser(null)
    get().hideAuthWidget()
  },
})

const roleSlice = (set) => ({
  role: roles.BUYER,
  setRole: (role) => set({ role }), // TODO: remove this
  switchToBuyer: () => set({ role: roles.BUYER }),
  switchToSeller: () => set({ role: roles.SELLER }),
})

const actionSlice = (set) => ({
  action: actions.LOGIN,
  setAction: (action) => set({ action }), // TODO: remove this
  switchToLogin: () => set({ action: actions.LOGIN }),
  switchToRegister: () => set({ action: actions.REGISTER }),
})

const errorsSlice = (set, get) => ({
  errors: {},
  hasErrors: () => Object.keys(get().errors).length > 0,
})

export const validationSlice = (set, get) => ({
  errors: {},
  hasErrors: () => Object.keys(get().errors).length > 0,
  getError: (field) => get().errors[field] || [],
  addError: (errorObj) =>
    set((state) => ({ errors: { ...state.errors, ...errorObj } })),
  removeError: (field) =>
    set((state) => {
      const newErrors = { ...state.errors }
      delete newErrors[field]
      return { errors: newErrors }
    }),
  clearErrors: () => set({ errors: {} }),
})

const useAuthStore = create(
  (set, get) => ({
    ...roleSlice(set),
    ...actionSlice(set),
    ...payloadSlice(set),
    ...userSlice(set),
    ...loginSlice(set, get),
    ...logoutSlice(set, get),
    ...visibilitySlice(set),
    ...errorsSlice(set, get),
    ...validationSlice(set, get),
  }),
  { name: 'auth-store' }
)

export { useAuthStore, roles, actions }
