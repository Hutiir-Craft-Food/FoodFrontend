import { create } from 'zustand'
import { combine } from 'zustand/middleware'
import ApiClient from '../../../services/apiClient'

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

const payloadSlice = combine({ ...initialPayload }, (set) => ({
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
      const response = await ApiClient.post('/v1/auth/login', {
        email,
        password,
      })
      const accessToken = response.data.jwt
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

const registerSlice = (set, get) => ({
  register: async () => {
    const hasErrors = get().hasErrors
    if (hasErrors()) return
    const payload = {
      email: get().email,
      password: get().password,
      details: get().details,
      marketingConsent: get().marketingConsent,
    }
    const role = get().role
    try {
      const response = await ApiClient.post('/v1/auth/register', {
        payload,
        role,
      })
      const accessToken = response.data.jwt
      get().setUser({ payload, accessToken, role })
      get().clearPayload()
      get().switchToLogin()
      get().switchToBuyer()
      get().hideAuthWidget()
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

const useAuthStore = create(
  (set, get) => ({
    ...roleSlice(set),
    ...actionSlice(set),
    ...payloadSlice(set),
    ...userSlice(set),
    ...registerSlice(set, get),
    ...loginSlice(set, get),
    ...logoutSlice(set, get),
    ...visibilitySlice(set),
    ...errorsSlice(set, get),
  }),
  { name: 'auth-store' }
)

export { useAuthStore, roles, actions }
