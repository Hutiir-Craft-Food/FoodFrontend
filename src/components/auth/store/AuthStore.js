import { create } from 'zustand'

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
  setUser: (newUser) => set({ user: newUser }),
})

// AuthSlice represents data for Signin or Signup forms:
const authSlice = (set) => ({
  email: '',
  setEmail: (newEmail) => set({ email: newEmail }),

  password: '',
  setPassword: (newPassword) => set({ password: newPassword }),

  details: null, // should be one for datatypes: null | object
  setDetails: (newDetails) => set({ details: newDetails }),

  subscription: false,
  setSubscription: (newSubscription) => ({ subscription: newSubscription }),
})

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
  login: () => {
    const email = get().email
    const password = get().password

    ;(async () => {
      // TODO: can we use apiClient here ?
      try {
        const response = await fetch('/api/v1/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        })

        if (response.ok) {
          const data = await response.json()
          const accessToken = data.jwt
          const role = get().role
          get().setUser({ email, role, accessToken })
          get().hideAuthWidget()
        }
      } catch (error) {
        console.error('Failed:', error)
      }
    })()
  },
})

const logoutSlice = (set, get) => ({
  logout: () => {
    get().setUser(null)
  },
})

const useAuthStore = create(
  (set, get) => ({
    // action slice:
    action: actions.LOGIN,
    setAction: (newAction) => set({ action: newAction }),

    // role slice:
    role: roles.BUYER,
    setRole: (newRole) => set({ role: newRole }),

    // other slices
    ...authSlice(set),
    ...userSlice(set),
    ...loginSlice(set, get),
    ...logoutSlice(set, get),
    ...visibilitySlice(set),
  }),
  { name: 'auth-store' }
)

export { useAuthStore, roles, actions }
