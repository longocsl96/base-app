import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, Router, Switch } from 'react-router-dom'
import { history } from '../history'
import Login from '../pages/Login'
import Layout from '../layouts/Layout'
import { checkLoginStatus, loginAction } from '../redux/actions/auth/index'
import FullPageLayout from '../layouts/FullpageLayout'
import { IntlProviderWrapper } from '../utility/context/Internationalization'
import messages_en from '../assets/data/locales/en.json'
import messages_vi from '../assets/data/locales/vi.json'
import getNativgationConfig from '../configs/navigationConfig'
import AccountInfo from '../pages/AccountInfo'
import ChangePassword from '../pages/ChangePassword'

const AppRouter = ({
  checkLoginStatus,
  appId,
  isAuthentication,
  loginAction,
  authToken,
  children,
  navigationConfig,
  message
}) => {
  useEffect(() => {
    const code = new URLSearchParams(document.location.search).get('code')
    checkLoginStatus(code || authToken)
  }, [])

  const setMessages = (message = {}) => {
    const newMessage = {}
    Object.keys(message).forEach((key) => {
      newMessage[appId + '.' + key] = message[key]
    })
    return newMessage
  }

  const appMessage = {
    en: { ...messages_en, ...setMessages(message.en) },
    vi: { ...messages_vi, ...setMessages(message.vi) }
  }

  const navConfigs = navigationConfig || getNativgationConfig(appId)

  return (
    <IntlProviderWrapper appMessage={appMessage}>
      <Router history={history}>
        <Switch>
          <Route
            path='/'
            render={(props) =>
              isAuthentication ? (
                <Layout navigationConfig={navConfigs} {...props}>
                  <Switch>
                    <Route
                      path='/account-information'
                      component={AccountInfo}
                    ></Route>
                     <Route
                      path='/change-password'
                      component={ChangePassword}
                    ></Route>
                    <Route path='/' render={() => children}></Route>
                  </Switch>
                </Layout>
              ) : (
                <FullPageLayout>
                  <Login loginAction={loginAction} />
                </FullPageLayout>
              )
            }
          ></Route>
        </Switch>
      </Router>
    </IntlProviderWrapper>
  )
}

const mapStateToProps = (state) => {
  return {
    isAuthentication: !!state.auth.username,
    authToken: state.auth.authToken
  }
}
export default connect(mapStateToProps, { checkLoginStatus, loginAction })(
  AppRouter
)
