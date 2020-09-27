import React from "react"
import * as Icon from "react-feather"


const navigationConfig = [
  {
    id: "home",
    title: "Home",
    type: "item",
    icon: <Icon.Home size={20} />,
    navLink: "/",
  },
  {
    id: "email",
    title: "App1",
    type: "external-link",
    icon: <Icon.Mail size={20} />,
    permissions: ["admin", "editor"],
    navLink: "http://localhost:3002",
  }

]

export default navigationConfig
