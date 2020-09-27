import React from 'react'
import { Navbar, NavItem, NavLink } from 'reactstrap'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { logoutAction } from '../../../redux/actions/auth/index'
import NavbarUser from './NavbarUser'
import { Menu, Star } from 'react-feather'

const ThemeNavbar = (props) => {
  const colorsArr = ['primary', 'danger', 'success', 'info', 'warning', 'dark']
  const navbarTypes = ['floating', 'static', 'sticky', 'hidden']
  return (
    <React.Fragment>
      <div className='content-overlay' />
      <div className='header-navbar-shadow' />
      <Navbar
        className={classnames(
          'header-navbar navbar-expand-lg navbar navbar-with-menu navbar-shadow',
          {
            'navbar-light':
              props.navbarColor === 'default' ||
              !colorsArr.includes(props.navbarColor),
            'navbar-dark': colorsArr.includes(props.navbarColor),
            'bg-primary':
              props.navbarColor === 'primary' && props.navbarType !== 'static',
            'bg-danger':
              props.navbarColor === 'danger' && props.navbarType !== 'static',
            'bg-success':
              props.navbarColor === 'success' && props.navbarType !== 'static',
            'bg-info':
              props.navbarColor === 'info' && props.navbarType !== 'static',
            'bg-warning':
              props.navbarColor === 'warning' && props.navbarType !== 'static',
            'bg-dark':
              props.navbarColor === 'dark' && props.navbarType !== 'static',
            'd-none': props.navbarType === 'hidden' && !props.horizontal,
            'floating-nav':
              (props.navbarType === 'floating' && !props.horizontal) ||
              (!navbarTypes.includes(props.navbarType) && !props.horizontal),
            'navbar-static-top':
              props.navbarType === 'static' && !props.horizontal,
            'fixed-top': props.navbarType === 'sticky' || props.horizontal,
            scrolling: props.horizontal && props.scrolling
          }
        )}
      >
        <div className='navbar-wrapper'>
          <div className='navbar-container content'>
            <div
              className='navbar-collapse d-flex justify-content-between align-items-center'
              id='navbar-mobile'
            >
              <div className='bookmark-wrapper'>
                <div className='mr-auto float-left bookmark-wrapper d-flex align-items-center'>
                  <ul className='navbar-nav d-xl-none'>
                    <NavItem className='mobile-menu mr-auto'>
                      <NavLink
                        className='nav-menu-main menu-toggle hidden-xs is-active'
                        onClick={props.sidebarVisibility}
                      >
                        <Menu className='ficon' />
                      </NavLink>
                    </NavItem>
                  </ul>
                  <ul className="nav navbar-nav bookmark-icons">
                    <NavItem>
                      <NavLink>
                        <Star className='text-warning' size={21} />
                      </NavLink>
                    </NavItem>
                  </ul>
                </div>
              </div>
              <NavbarUser
                handleAppOverlay={props.handleAppOverlay}
                changeCurrentLang={props.changeCurrentLang}
                userName={props.name}
                isAuthenticated={props.isAuthenticated}
                logoutAction={props.logoutAction}
              ></NavbarUser>
            </div>
          </div>
        </div>
      </Navbar>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    name: state.auth.name,
    isAuthenticated: !!state.auth.name
  }
}
export default connect(mapStateToProps, { logoutAction })(ThemeNavbar)
