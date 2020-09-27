import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, Router, Switch } from 'react-router-dom'
import { history } from '../history'
import Login from '../pages/Login'
import Layout from './Layout'
import { checkLoginStatus, loginAction } from '../redux/actions/auth/index'
import FullPageLayout from './FullpageLayout'
import { IntlProviderWrapper } from '../utility/context/Internationalization'
import messages_en from '../assets/data/locales/en.json'
import messages_vi from '../assets/data/locales/vi.json'

const AppRouter = ({
  checkLoginStatus,
  navigationConfig,
  isAuthentication,
  loginAction,
  authToken,
  children,
  message
}) => {
  useEffect(() => {
    checkLoginStatus(authToken)
  }, [])

  const appMessage = {
    en: { ...messages_en, ...message.en },
    vi: { ...messages_vi, ...message.vi }
  }

  return (
    <IntlProviderWrapper appMessage={appMessage}>
      <Router history={history}>
        <Switch>
          <Route
            path='/'
            render={(props) =>
              isAuthentication ? (
                <Layout navigationConfig={navigationConfig} {...props}>
                  {children}
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
