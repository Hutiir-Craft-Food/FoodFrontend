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
  setRole: newRole => set(state => ({ role: newRole })),
  setJwtToken: newToken =>
    set(state => {
      // TODO: research if this needs to be part of the returned object
      state.showAuthWidget = false
      // maybe { jwtToken: newToken, showAuthWidget: false } ?

      return { jwtToken: newToken }
    }),
}))

export { useAuthStore, roles, actions }
