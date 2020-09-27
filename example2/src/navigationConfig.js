import React from "react"
import * as Icon from "react-feather"


const navigationConfig = [
  {
    id: "home",
    title: "Home",
    type: "external-link",
    icon: <Icon.Home size={20} />,
    navLink: "http://localhost:3000/home",
  },
  {
    id: "email",
    title: "App1",
    type: "item",
    icon: <Icon.Mail size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/",
  }

]

export default navigationConfig
