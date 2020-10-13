import React from 'react'
import * as Icon from 'react-feather'
import AppId from './appId'
import { APP_URL } from './app-configs'

const navigationConfig = [
  {
    id: AppId.HOME,
    type: 'item',
    title: 'menu.home',
    icon: <Icon.Home size={20} />,
    navLink: '/'
  },
  {
    id: AppId.USER,
    type: 'item',
    title: 'menu.user',
    icon: <Icon.Mail size={20} />,
    permissions: ['admin', 'editor'],
    navLink: '/'
  }
]

const getNativgationConfig = (appId) => {
  return [...navigationConfig].map(item => {
    if (item.id === appId) {
      item.type = 'item'
    } else {
      item.type = 'external-link'
      item.navLink = APP_URL[item.id] + item.navLink
    }
    return item
  })
}

export default getNativgationConfig
