import { atom } from 'recoil'

export const atomLinkList = atom({
  key: 'MAIN/LINK_LIST',
  default: {
    list: []
  }
})