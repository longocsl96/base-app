import React from 'react'
import * as Icon from 'react-feather'
import AppId from './appId'

const navigationConfig = [
  {
    id: AppId.HOME,
    title: 'menu.home',
    icon: <Icon.Home size={20} />,
    navLink: '/'
  },
  {
    id: AppId.USER,
    title: 'menu.user',
    icon: <Icon.Mail size={20} />,
    permissions: ['admin', 'editor'],
    navLink: 'http://localhost:3001'
  }
]

const getNativgationConfig = (appId) => {
  return navigationConfig.map((item) => {
    item.type = item.id === appId ? 'item' : 'external-link'
  })
}

export default getNativgationConfig
