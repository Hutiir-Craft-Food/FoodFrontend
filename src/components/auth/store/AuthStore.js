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

const useAuthStore = create(set => ({
  role: roles.BUYER,
  user: {},
  jwtToken: '',
  showAuthWidget: false,
  action: actions.LOGIN,
  setAction: newAction => set(state => ({ action: newAction })),
  setShowAuthWidget: newShowAuthWidget => set(state => ({ showAuthWidget: newShowAuthWidget })),
  setUserRole: newRole => set(state => ({ role: newRole })),
  setJwtToken: newToken =>
    set(state => {
      state.showAuthWidget = false
      return { jwtToken: newToken }
    }),
}))

export { useAuthStore, roles, actions }
