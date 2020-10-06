import React from 'react'
import {
  NavItem,
  NavLink,
  UncontrolledDropdown,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Media,
  Badge
} from 'reactstrap'
import PerfectScrollbar from 'react-perfect-scrollbar'
import * as Icon from 'react-feather'
import classnames from 'classnames'
import ReactCountryFlag from 'react-country-flag'
import { history } from '../../../history'
import { IntlContext } from '../../../utility/context/Internationalization'
import Autocomplete from '../../../components/AutoCompleteComponent'

const UserDropdown = (props) => {
  const { logoutAction } = props

  const handleNavigation = (e, path) => {
    e.preventDefault()
    history.push(path)
  }

  return (
    <DropdownMenu right>
      <DropdownItem
        tag='a'
        href='#'
        onClick={(e) => handleNavigation(e, '/pages/profile')}
      >
        <Icon.User size={14} className='mr-50' />
        <span className='align-middle'>Edit Profile</span>
      </DropdownItem>
      <DropdownItem divider />
      <DropdownItem tag='a' onClick={logoutAction}>
        <Icon.Power size={14} className='mr-50' />
        <span className='align-middle'>Log Out</span>
      </DropdownItem>
    </DropdownMenu>
  )
}

class NavbarUser extends React.PureComponent {
  state = {
    navbarSearch: false,
    langDropdown: false,
    shoppingCart: [],
    suggestions: []
  }

  componentDidMount() {}

  handleNavbarSearch = () => {
    this.setState({
      navbarSearch: !this.state.navbarSearch
    })
  }

  removeItem = (id) => {
    let cart = this.state.shoppingCart

    let updatedCart = cart.filter((i) => i.id !== id)

    this.setState({
      shoppingCart: updatedCart
    })
  }

  handleLangDropdown = () =>
    this.setState({ langDropdown: !this.state.langDropdown })

  getCountryCode = (locale) => {
    const countryCode = { en: 'us', vi: 'vn' }
    return countryCode[locale]
  }

  render() {
    const renderCartItems = this.state.shoppingCart.map((item) => {
      return (
        <div className='cart-item' key={item.id}>
          <Media
            className='p-0'
            onClick={() => history.push('/ecommerce/product-detail')}
          >
            <Media className='text-center pr-0 mr-1' left>
              <img
                className={`${
                  item.imgClass
                    ? item.imgClass + ' cart-item-img'
                    : 'cart-item-img'
                }`}
                src={item.img}
                width={item.width}
                alt='Cart Item'
              />
            </Media>
            <Media className='overflow-hidden pr-1 py-1 pl-0' body>
              <span className='item-title text-truncate text-bold-500 d-block mb-50'>
                {item.name}
              </span>
              <span className='item-desc font-small-2 text-truncate d-block'>
                {item.desc}
              </span>
              <div className='d-flex justify-content-between align-items-center mt-1'>
                <span className='align-middle d-block'>1 x {item.price}</span>
                <Icon.X
                  className='danger'
                  size={15}
                  onClick={(e) => {
                    e.stopPropagation()
                    this.removeItem(item.id)
                  }}
                />
              </div>
            </Media>
          </Media>
        </div>
      )
    })

    return (
      <ul className='nav navbar-nav navbar-nav-user float-right'>
        <IntlContext.Consumer>
          {(context) => {
            let langArr = {
              en: 'English',
              vi: 'Vietnamese'
            }
            return (
              <Dropdown
                tag='li'
                className='dropdown-language nav-item'
                isOpen={this.state.langDropdown}
                toggle={this.handleLangDropdown}
                data-tour='language'
              >
                <DropdownToggle tag='a' className='nav-link'>
                  <ReactCountryFlag
                    className='country-flag'
                    countryCode={this.getCountryCode(context.state.locale)}
                    svg
                  />
                  <span className='d-sm-inline-block d-none text-capitalize align-middle ml-50'>
                    {langArr[context.state.locale]}
                  </span>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem
                    tag='a'
                    onClick={(e) => context.switchLanguage('en')}
                  >
                    <ReactCountryFlag
                      className='country-flag'
                      countryCode='us'
                      svg
                    />
                    <span className='ml-1'>English</span>
                  </DropdownItem>
                  <DropdownItem
                    tag='a'
                    onClick={(e) => context.switchLanguage('vi')}
                  >
                    <ReactCountryFlag
                      className='country-flag'
                      countryCode='vn'
                      svg
                    />
                    <span className='ml-1'>Vietnamese</span>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            )
          }}
        </IntlContext.Consumer>

        <NavItem className="nav-search" onClick={this.handleNavbarSearch}>
          <NavLink className='nav-link-search'>
            <Icon.Search size={21} data-tour='search' />
          </NavLink>
          <div
            className={classnames('search-input', {
              open: this.state.navbarSearch,
              'd-none': this.state.navbarSearch === false
            })}
          >
            <div className='search-input-icon'>
              <Icon.Search size={17} className='primary' />
            </div>
            <Autocomplete
              className='form-control'
              suggestions={this.state.suggestions}
              filterKey='title'
              filterHeaderKey='groupTitle'
              grouped={true}
              placeholder='Explore Vuexy...'
              autoFocus={true}
              clearInput={this.state.navbarSearch}
              externalClick={(e) => {
                this.setState({ navbarSearch: false })
              }}
              onKeyDown={(e) => {
                if (e.keyCode === 27 || e.keyCode === 13) {
                  this.setState({
                    navbarSearch: false
                  })
                  this.props.handleAppOverlay('')
                }
              }}
              customRender={(
                item,
                i,
                filteredData,
                activeSuggestion,
                onSuggestionItemClick,
                onSuggestionItemHover
              ) => {
                const IconTag = Icon[item.icon ? item.icon : 'X']
                return (
                  <li
                    className={classnames('suggestion-item', {
                      active: filteredData.indexOf(item) === activeSuggestion
                    })}
                    key={i}
                    onClick={(e) => onSuggestionItemClick(item.link, e)}
                    onMouseEnter={() =>
                      onSuggestionItemHover(filteredData.indexOf(item))
                    }
                  >
                    <div
                      className={classnames({
                        'd-flex justify-content-between align-items-center':
                          item.file || item.img
                      })}
                    >
                      <div className='item-container d-flex'>
                        {item.icon ? (
                          <IconTag size={17} />
                        ) : item.file ? (
                          <img
                            src={item.file}
                            height='36'
                            width='28'
                            alt={item.title}
                          />
                        ) : item.img ? (
                          <img
                            className='rounded-circle mt-25'
                            src={item.img}
                            height='28'
                            width='28'
                            alt={item.title}
                          />
                        ) : null}
                        <div className='item-info ml-1'>
                          <p className='align-middle mb-0'>{item.title}</p>
                          {item.by || item.email ? (
                            <small className='text-muted'>
                              {item.by
                                ? item.by
                                : item.email
                                ? item.email
                                : null}
                            </small>
                          ) : null}
                        </div>
                      </div>
                      {item.size || item.date ? (
                        <div className='meta-container'>
                          <small className='text-muted'>
                            {item.size
                              ? item.size
                              : item.date
                              ? item.date
                              : null}
                          </small>
                        </div>
                      ) : null}
                    </div>
                  </li>
                )
              }}
              onSuggestionsShown={(userInput) => {
                if (this.state.navbarSearch) {
                  this.props.handleAppOverlay(userInput)
                }
              }}
            />
            <div className='search-input-close'>
              <Icon.X
                size={24}
                onClick={(e) => {
                  e.stopPropagation()
                  this.setState({
                    navbarSearch: false
                  })
                  this.props.handleAppOverlay('')
                }}
              />
            </div>
          </div>
        </NavItem>
        <UncontrolledDropdown
          tag='li'
          className='dropdown-notification nav-item'
        >
          <DropdownToggle tag='a' className='nav-link nav-link-label'>
            <Icon.Bell size={21} />
            <Badge pill color='primary' className='badge-up'>
              {' '}
              5{' '}
            </Badge>
          </DropdownToggle>
          <DropdownMenu tag='ul' right className='dropdown-menu-media'>
            <li className='dropdown-menu-header'>
              <div className='dropdown-header mt-0'>
                <h3 className='text-white'>5 New</h3>
                <span className='notification-title'>App Notifications</span>
              </div>
            </li>
            <PerfectScrollbar
              className='media-list overflow-hidden position-relative'
              options={{
                wheelPropagation: false
              }}
            >
              <div className='d-flex justify-content-between'>
                <Media className='d-flex align-items-start'>
                  <Media left href='#'>
                    <Icon.PlusSquare
                      className='font-medium-5 primary'
                      size={21}
                    />
                  </Media>
                  <Media body>
                    <Media heading className='primary media-heading' tag='h6'>
                      You have new order!
                    </Media>
                    <p className='notification-text'>
                      Are your going to meet me tonight?
                    </p>
                  </Media>
                  <small>
                    <time
                      className='media-meta'
                      dateTime='2015-06-11T18:29:20+08:00'
                    >
                      9 hours ago
                    </time>
                  </small>
                </Media>
              </div>
              <div className='d-flex justify-content-between'>
                <Media className='d-flex align-items-start'>
                  <Media left href='#'>
                    <Icon.DownloadCloud
                      className='font-medium-5 success'
                      size={21}
                    />
                  </Media>
                  <Media body>
                    <Media heading className='success media-heading' tag='h6'>
                      99% Server load
                    </Media>
                    <p className='notification-text'>
                      You got new order of goods?
                    </p>
                  </Media>
                  <small>
                    <time
                      className='media-meta'
                      dateTime='2015-06-11T18:29:20+08:00'
                    >
                      5 hours ago
                    </time>
                  </small>
                </Media>
              </div>
              <div className='d-flex justify-content-between'>
                <Media className='d-flex align-items-start'>
                  <Media left href='#'>
                    <Icon.AlertTriangle
                      className='font-medium-5 danger'
                      size={21}
                    />
                  </Media>
                  <Media body>
                    <Media heading className='danger media-heading' tag='h6'>
                      Warning Notification
                    </Media>
                    <p className='notification-text'>
                      Server has used 99% of CPU
                    </p>
                  </Media>
                  <small>
                    <time
                      className='media-meta'
                      dateTime='2015-06-11T18:29:20+08:00'
                    >
                      Today
                    </time>
                  </small>
                </Media>
              </div>
              <div className='d-flex justify-content-between'>
                <Media className='d-flex align-items-start'>
                  <Media left href='#'>
                    <Icon.CheckCircle
                      className='font-medium-5 info'
                      size={21}
                    />
                  </Media>
                  <Media body>
                    <Media heading className='info media-heading' tag='h6'>
                      Complete the task
                    </Media>
                    <p className='notification-text'>
                      One of your task is pending.
                    </p>
                  </Media>
                  <small>
                    <time
                      className='media-meta'
                      dateTime='2015-06-11T18:29:20+08:00'
                    >
                      Last week
                    </time>
                  </small>
                </Media>
              </div>
              <div className='d-flex justify-content-between'>
                <Media className='d-flex align-items-start'>
                  <Media left href='#'>
                    <Icon.File className='font-medium-5 warning' size={21} />
                  </Media>
                  <Media body>
                    <Media heading className='warning media-heading' tag='h6'>
                      Generate monthly report
                    </Media>
                    <p className='notification-text'>
                      Reminder to generate monthly report
                    </p>
                  </Media>
                  <small>
                    <time
                      className='media-meta'
                      dateTime='2015-06-11T18:29:20+08:00'
                    >
                      Last month
                    </time>
                  </small>
                </Media>
              </div>
            </PerfectScrollbar>
            <li className='dropdown-menu-footer'>
              <DropdownItem tag='a' className='p-1 text-center'>
                <span className='align-middle'>Read all notifications</span>
              </DropdownItem>
            </li>
          </DropdownMenu>
        </UncontrolledDropdown>
        <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
          <DropdownToggle tag='a' className='nav-link dropdown-user-link'>
            <div className='user-nav d-sm-flex d-none'>
              <span className='user-name text-bold-600'>
                {this.props.userName}
              </span>
              <span className='user-status'>Available</span>
            </div>
            <span data-tour='user'>
              <img
                src='https://storage.live.com/Users/-6155523327610065665/MyProfile/ExpressionProfile/ProfilePhoto:Win8Static,UserTileMedium,UserTileStatic'
                className='round'
                height='40'
                width='40'
                alt='avatar'
              />
            </span>
          </DropdownToggle>
          <UserDropdown {...this.props} />
        </UncontrolledDropdown>
      </ul>
    )
  }
}
export default NavbarUser
