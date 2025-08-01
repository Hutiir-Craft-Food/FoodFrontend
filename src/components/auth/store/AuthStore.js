import { create } from 'zustand'
import { combine } from 'zustand/middleware'
import apiClient from '~/services/apiClient'

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
  details: {},
  marketingConsent: false,
}

const payloadSlice = combine({ ...initialPayload }, (set, get) => ({
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setDetails: (details) => set({ details }),
  setMarketingConsent: (marketingConsent) => set({ marketingConsent }),
  clearPayload: () => set({ ...initialPayload }),
  isDirty: () => {
    const { action, role, details } = get()
    if (
      action == actions.REGISTER &&
      role == roles.SELLER &&
      JSON.stringify(details) !== JSON.stringify(initialPayload.details)
    ) {
      return true
    } else {
      return false
    }
  },
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
      const response = await apiClient.post('/v1/auth/login', {
        email,
        password,
      })
      const accessToken = response.data.jwt
      const role = get().role
      get().setUser({ email, role, accessToken })
      get().hideAuthWidget()
      get().clearPayload()
    } catch (error) {
      alert('Щось пішло не так:', error)
    }
  },
})

const registerSlice = (set, get) => ({
  register: async () => {
    const hasErrors = get().hasErrors
    if (hasErrors()) return
    const payload = {
      email: get().email,
      password: get().password,
      details: role === roles.SELLER ? get().details : null,
      marketingConsent: get().marketingConsent,
      role: get().role,
    }
    try {
      const response = await apiClient.post('/v1/auth/register', payload)

      const accessToken = response.data.jwt
      get().setUser({ payload, accessToken, role })
      get().clearPayload()
      get().switchToLogin()
      get().switchToBuyer()
      get().hideAuthWidget()
    } catch (error) {
      alert('Щось пішло не так:', error)
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
  role: roles.GUEST,
  setRole: (newRole) => set({ role: newRole }),
  switchToBuyer: () => set({ role: roles.BUYER }),
  switchToSeller: () => set({ role: roles.SELLER }),
})

const actionSlice = (set, get) => ({
  action: actions.LOGIN,
  switchToLogin: () => {
    get().setRole(roles.GUEST)
    set({ action: actions.LOGIN })
  },
  switchToRegister: () => {
    get().setRole(roles.BUYER)
    set({ action: actions.REGISTER })
  },
})

const validationSlice = (set, get) => ({
  errors: {},
  hasErrors: () => Object.keys(get().errors).length > 0,
  getError: (errorKey) => get().errors[errorKey] || [],
  addError: (errorObj) =>
    set((state) => ({ errors: { ...state.errors, ...errorObj } })),
  removeError: (errorKey) =>
    set((state) => {
      const newErrors = { ...state.errors }
      delete newErrors[errorKey]
      return { errors: newErrors }
    }),
  clearErrors: () => set({ errors: {} }),
})

const useAuthStore = create(
  (set, get) => ({
    ...roleSlice(set, get),
    ...actionSlice(set, get),
    ...payloadSlice(set, get),
    ...userSlice(set),
    ...registerSlice(set, get),
    ...loginSlice(set, get),
    ...logoutSlice(set, get),
    ...visibilitySlice(set),
    ...validationSlice(set, get),
  }),
  { name: 'auth-store' }
)

export { useAuthStore, roles, actions }
