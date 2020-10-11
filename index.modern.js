import React, { useState, Component, PureComponent, useEffect } from 'react';
import { connect, Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import createDebounce from 'redux-debounced';
import thunk from 'redux-thunk';
import { PersistGate } from 'redux-persist/integration/react';
import { persistReducer, persistStore } from 'redux-persist';
import Axios from 'axios';
import * as Icon from 'react-feather';
import { AlertTriangle, Mail, Lock, Disc, Circle, X, ChevronRight, Search, Bell, PlusSquare, DownloadCloud, CheckCircle, File, User, Power, Menu, Star, Heart, Home, List, PlusCircle, Gift, MessageSquare, ArrowUp } from 'react-feather';
import { toast, ToastContainer } from 'react-toastify';
import { throttleAdapterEnhancer, cacheAdapterEnhancer } from 'axios-extensions';
import { createBrowserHistory } from 'history';
import sessionStorage from 'redux-persist/es/storage/session';
import { Link as Link$1, Router, Switch, Route } from 'react-router-dom';
import { FormattedMessage, IntlProvider } from 'react-intl';
export { FormattedMessage } from 'react-intl';
import { Row, Col, Card, CardHeader, CardTitle, CardBody, FormGroup, Input, Label, Button, NavLink, Badge, Media, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, NavItem, UncontrolledDropdown, Navbar as Navbar$1 } from 'reactstrap';
import classnames from 'classnames';
import Hammer from 'react-hammerjs';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ReactCountryFlag from 'react-country-flag';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ScrollToTop from 'react-scroll-up';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'react-toastify/dist/ReactToastify.css';
import TopBarProgress from 'react-topbar-progress-indicator';

const HttpClient = Axios.create({
  timeout: 5000,
  adapter: throttleAdapterEnhancer(cacheAdapterEnhancer(Axios.defaults.adapter, {
    threshold: 15 * 60 * 1000
  }))
});

const errorMessage = message => {
  return /*#__PURE__*/React.createElement("div", {
    className: "d-flex align-items-center"
  }, /*#__PURE__*/React.createElement(AlertTriangle, null), " ", /*#__PURE__*/React.createElement("span", {
    className: "ml-1"
  }, message));
};

const setUpHttpClient = store => {
  HttpClient.interceptors.request.use(config => {
    store.dispatch({
      type: 'SHOW_LOADING_BAR'
    });
    return config;
  });
  HttpClient.interceptors.response.use(response => {
    store.dispatch({
      type: 'HIDE_LOADING_BAR'
    });
    return response;
  }, e => {
    store.dispatch({
      type: 'HIDE_LOADING_BAR'
    });

    switch (e.response.status) {
      case 404:
        toast.error(errorMessage('API Not Found !'));
        break;

      case 400:
        toast.error(errorMessage('Bad Request !'));
        break;

      case 408:
        toast.error(errorMessage('Request Timeout !'));
        break;

      case 500:
        toast.error(errorMessage('Server error !'));
        break;

      default:
        return e.response;
    }
  });
};

const themeConfig = {
  layout: "vertical",
  theme: "light",
  sidebarCollapsed: false,
  navbarColor: "default",
  navbarType: "floating",
  footerType: "static",
  disableCustomizer: true,
  hideScrollToTop: false,
  disableThemeTour: false,
  menuTheme: "primary",
  direction: "ltr",
  showLoading: false
};

const customizerReducer = (state = { ...themeConfig
}, action) => {
  switch (action.type) {
    case 'CHANGE_MODE':
      return { ...state,
        theme: action.mode
      };

    case 'COLLAPSE_SIDEBAR':
      return { ...state,
        sidebarCollapsed: action.value
      };

    case 'CHANGE_NAVBAR_COLOR':
      return { ...state,
        navbarColor: action.color
      };

    case 'CHANGE_NAVBAR_TYPE':
      return { ...state,
        navbarType: action.style
      };

    case 'CHANGE_FOOTER_TYPE':
      return { ...state,
        footerType: action.style
      };

    case 'CHANGE_MENU_COLOR':
      return { ...state,
        menuTheme: action.style
      };

    case 'HIDE_SCROLL_TO_TOP':
      return { ...state,
        hideScrollToTop: action.value
      };

    case 'SHOW_LOADING_BAR':
      return { ...state,
        showLoadingBar: true
      };

    case 'HIDE_LOADING_BAR':
      return { ...state,
        showLoadingBar: false
      };

    default:
      return state;
  }
};

const API_LOGIN_URL = 'https://api.mocki.io/v1/5e448c60';
const API_LOGOUT_URL = 'https://api.mocki.io/v1/5e448c60';
const API_R_200 = 200;

const history = createBrowserHistory({
  basename: ''
});

class AuthService {}

AuthService.login = user => {
  return HttpClient.post(API_LOGIN_URL, user);
};

AuthService.logout = user => {
  return HttpClient.post(API_LOGOUT_URL, user);
};

AuthService.checkLoginByToken = authToken => {
  return HttpClient.post(API_LOGIN_URL, authToken);
};

const LOGIN_ACTION = 'LOGIN_ACTION';
const LOOUT_ACTION = 'LOGOUT_ACTION';
const checkLoginStatus = code => {
  return async dispatch => {
    if (!code) {
      return;
    }

    try {
      const respone = await AuthService.checkLoginByToken(code);

      if (respone.status === API_R_200) {
        dispatch({
          type: LOGIN_ACTION,
          payload: respone.data
        });
      } else {
        dispatch({
          type: LOOUT_ACTION
        });
      }

      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };
};
const loginAction = user => {
  return async dispatch => {
    try {
      const respone = await AuthService.login(user);

      if (respone.status === API_R_200) {
        dispatch({
          type: LOGIN_ACTION,
          payload: respone.data
        });
        history.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  };
};
const logoutAction = user => {
  return async dispatch => {
    try {
      const respone = await AuthService.logout(user);

      if (respone.status === API_R_200) {
        dispatch({
          type: LOOUT_ACTION
        });
        history.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const authInitialState = {
  authToken: '',
  username: '',
  name: '',
  role: ''
};
const authReducers = (state = { ...authInitialState
}, action) => {
  switch (action.type) {
    case LOGIN_ACTION:
      {
        return { ...state,
          ...action.payload
        };
      }

    case LOOUT_ACTION:
      {
        return { ...authInitialState
        };
      }

    default:
      return state;
  }
};

const defaultStarred = [].filter(item => {
  return item.starred === true;
});
const initialState = {
  suggestions: [],
  isLoading: false,
  value: "",
  starred: defaultStarred,
  noSuggestions: false,
  extraStarred: []
};

const navbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case "MAYBE_UPDATE_SUGGESTIONS":
      return { ...state,
        suggestions: action.suggestions,
        isLoading: false
      };

    case "UPDATE_STARRED":
      const starredState = state.starred.map(i => i.id);
      const extraStarredState = state.extraStarred.map(j => j.id);

      if (state) {
        state.suggestions.find(i => {
          if (i.id === action.object.id) {
            i.starred = !action.object.starred;
            return { ...state
            };
          } else {
            return null;
          }
        });
      }

      if (!starredState.includes(action.object.id) && state.starred.length < 10) {
        let newState = state.starred.push(action.object);
        return { ...state,
          newState
        };
      } else if (starredState.includes(action.object.id)) {
          if (state.extraStarred.length === 0) {
            let newState = state.starred.splice(starredState.indexOf(action.object.id), 1);
            return { ...state,
              newState
            };
          } else if (state.extraStarred.length > 0) {
            let getBookmark = state.extraStarred.splice(0, 1);
            state.starred.splice(starredState.indexOf(action.object.id), 1);
            let updatedState = state.starred.push(getBookmark[0]);
            return { ...state,
              updatedState
            };
          } else {
            return { ...state
            };
          }
        } else if (!extraStarredState.includes(action.object.id) && state.starred.length >= 10) {
            let extraStarred = state.extraStarred.concat(action.object);
            return { ...state,
              extraStarred
            };
          } else {
            return { ...state
            };
          }

    default:
      return state;
  }
};

const rootReducer = appReducer => combineReducers({
  customizer: customizerReducer,
  auth: persistReducer({
    storage: sessionStorage,
    key: 'root'
  }, authReducers),
  navbar: navbarReducer,
  app: appReducer
});

const Login = ({
  loginAction
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onClickLogin = () => {
    loginAction({
      username,
      password
    });
  };

  return /*#__PURE__*/React.createElement(Row, {
    className: "m-0 justify-content-center"
  }, /*#__PURE__*/React.createElement(Col, {
    sm: "8",
    xl: "7",
    lg: "10",
    md: "8",
    className: "d-flex justify-content-center"
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-authentication login-card rounded-0 mb-0 w-100"
  }, /*#__PURE__*/React.createElement(Row, {
    className: "m-0"
  }, /*#__PURE__*/React.createElement(Col, {
    lg: "6",
    className: "d-lg-block d-none text-center align-self-center px-1 py-0"
  }, /*#__PURE__*/React.createElement("img", {
    src: "https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/demo-4/static/media/login.fd58a052.png",
    alt: "loginImg"
  })), /*#__PURE__*/React.createElement(Col, {
    lg: "6",
    md: "12",
    className: "p-0"
  }, /*#__PURE__*/React.createElement(Card, {
    className: "rounded-0 mb-0 px-2 login-tabs-container"
  }, /*#__PURE__*/React.createElement(CardHeader, {
    className: "pb-1"
  }, /*#__PURE__*/React.createElement(CardTitle, null, /*#__PURE__*/React.createElement("h4", {
    className: "mb-0"
  }, "Login"))), /*#__PURE__*/React.createElement(CardBody, {
    className: "pt-1"
  }, /*#__PURE__*/React.createElement(FormGroup, {
    className: "form-label-group position-relative has-icon-left"
  }, /*#__PURE__*/React.createElement(Input, {
    type: "email",
    placeholder: "Email",
    value: username,
    onChange: e => setUsername(e.target.value),
    required: true
  }), /*#__PURE__*/React.createElement(Mail, {
    size: 15
  }), /*#__PURE__*/React.createElement(Label, null, "Email")), /*#__PURE__*/React.createElement(FormGroup, {
    className: "form-label-group position-relative has-icon-left"
  }, /*#__PURE__*/React.createElement(Input, {
    type: "password",
    placeholder: "Password",
    value: password,
    onChange: e => setPassword(e.target.value),
    required: true
  }), /*#__PURE__*/React.createElement(Lock, {
    size: 15
  }), /*#__PURE__*/React.createElement(Label, null, "Password")), /*#__PURE__*/React.createElement(Button, {
    color: "primary",
    type: "button",
    onClick: onClickLogin
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "Login"
  })))))))));
};

class SidebarHeader extends Component {
  render() {
    let {
      toggleSidebarMenu,
      activeTheme,
      collapsed,
      toggle,
      sidebarVisibility,
      menuShadow
    } = this.props;
    return /*#__PURE__*/React.createElement("div", {
      className: "navbar-header"
    }, /*#__PURE__*/React.createElement("ul", {
      className: "nav navbar-nav flex-row"
    }, /*#__PURE__*/React.createElement("li", {
      className: "nav-item mr-auto"
    }, /*#__PURE__*/React.createElement(NavLink, {
      to: "/",
      className: "navbar-brand"
    }, /*#__PURE__*/React.createElement("div", {
      className: "brand-logo"
    }), /*#__PURE__*/React.createElement("h2", {
      className: "brand-text mb-0"
    }, "Vuexy"))), /*#__PURE__*/React.createElement("li", {
      className: "nav-item nav-toggle"
    }, /*#__PURE__*/React.createElement("div", {
      className: "nav-link modern-nav-toggle"
    }, collapsed === false ? /*#__PURE__*/React.createElement(Disc, {
      onClick: () => {
        toggleSidebarMenu(true);
        toggle();
      },
      className: classnames("toggle-icon icon-x d-none d-xl-block font-medium-4", {
        "text-primary": activeTheme === "primary",
        "text-success": activeTheme === "success",
        "text-danger": activeTheme === "danger",
        "text-info": activeTheme === "info",
        "text-warning": activeTheme === "warning",
        "text-dark": activeTheme === "dark"
      }),
      size: 20,
      "data-tour": "toggle-icon"
    }) : /*#__PURE__*/React.createElement(Circle, {
      onClick: () => {
        toggleSidebarMenu(false);
        toggle();
      },
      className: classnames("toggle-icon icon-x d-none d-xl-block font-medium-4", {
        "text-primary": activeTheme === "primary",
        "text-success": activeTheme === "success",
        "text-danger": activeTheme === "danger",
        "text-info": activeTheme === "info",
        "text-warning": activeTheme === "warning",
        "text-dark": activeTheme === "dark"
      }),
      size: 20
    }), /*#__PURE__*/React.createElement(X, {
      onClick: sidebarVisibility,
      className: classnames("toggle-icon icon-x d-block d-xl-none font-medium-4", {
        "text-primary": activeTheme === "primary",
        "text-success": activeTheme === "success",
        "text-danger": activeTheme === "danger",
        "text-info": activeTheme === "info",
        "text-warning": activeTheme === "warning",
        "text-dark": activeTheme === "dark"
      }),
      size: 20
    })))), /*#__PURE__*/React.createElement("div", {
      className: classnames("shadow-bottom", {
        "d-none": menuShadow === false
      })
    }));
  }

}

class SideMenuGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      activeItem: this.props.activePath
    };

    this.handleActiveItem = url => {
      this.setState({
        activeItem: url
      });
    };

    this.flag = true;
    this.parentArray = [];
    this.childObj = {};
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.activePath !== this.props.activePath) {
      if (this.childObj.navLink && this.childObj.collapsed) {
        this.props.collapsedMenuPaths(this.childObj.navLink);
      }

      if (this.props.activePath === this.childObj.navLink && !this.props.parentArr.includes(this.parentArray[0])) {
        this.props.parentArr.splice(0, this.props.parentArr.length);
        this.props.parentArr.push(this.parentArray);
      } else if (this.props.parentArr.includes(this.parentArray)) {
        this.props.parentArr.splice(0, this.props.parentArr.length);
      }
    }
  }

  renderChild(item, activeGroup, handleGroupClick, handleActiveItem, parent) {
    return /*#__PURE__*/React.createElement("ul", {
      className: "menu-content"
    }, item.children ? item.children.map(child => {
      const CustomAnchorTag = child.type === "external-link" ? `a` : Link;

      if (!this.parentArray.includes(item.id) && this.flag) {
        this.parentArray.push(item.id);
      }

      if (child.navlink && child.collapsed) {
        this.props.collapsedMenuPaths(child.navLink);
      }

      if (this.props.activeItemState === child.navLink) {
        this.childObj = child;
        this.props.parentArr.push(this.parentArray);
        this.flag = false;
      }

      if (child.permissions && child.permissions.includes(this.props.currentUser) || child.permissions === undefined) {
        return /*#__PURE__*/React.createElement("li", {
          key: child.id,
          className: classnames({
            hover: this.props.hoverIndex === child.id,
            "has-sub": child.type === "collapse",
            open: child.type === "collapse" && activeGroup.includes(child.id),
            "sidebar-group-active": this.props.currentActiveGroup.includes(child.id),
            active: this.props.activeItemState === child.navLink && child.type === "item" || item.parentOf && item.parentOf.includes(this.props.activeItemState),
            disabled: child.disabled
          }),
          onClick: e => {
            e.stopPropagation();
            handleGroupClick(child.id, item.id, child.type);

            if (child.navLink && child.navLink !== undefined) {
              handleActiveItem(child.navLink);
            }

            if (this.props.deviceWidth <= 1200 && child.type === "item") {
              this.props.toggleMenu();
            }
          }
        }, /*#__PURE__*/React.createElement(CustomAnchorTag, {
          className: classnames({
            "d-flex justify-content-between": child.type === "collapse"
          }),
          to: child.navLink && child.type === "item" ? child.navLink : "",
          href: child.type === "external-link" ? child.navLink : "",
          onMouseEnter: () => {
            this.props.handleSidebarMouseEnter(child.id);
          },
          onMouseLeave: () => {
            this.props.handleSidebarMouseEnter(child.id);
          },
          key: child.id,
          onClick: e => {
            return child.type === "collapse" ? e.preventDefault() : "";
          },
          target: child.newTab ? "_blank" : undefined
        }, /*#__PURE__*/React.createElement("div", {
          className: "menu-text"
        }, child.icon, /*#__PURE__*/React.createElement("span", {
          className: "menu-item menu-title"
        }, /*#__PURE__*/React.createElement(FormattedMessage, {
          id: child.title
        }))), child.badge ? /*#__PURE__*/React.createElement(Badge, {
          color: child.badge,
          className: "float-right mr-2",
          pill: true
        }, child.badgeText) : "", child.type === "collapse" ? /*#__PURE__*/React.createElement(ChevronRight, {
          className: "menu-toggle-icon",
          size: 13
        }) : ""), child.children ? this.renderChild(child, activeGroup, handleGroupClick, handleActiveItem, item.id) : "");
      } else if (child.navLink === this.props.activePath && !child.permissions.includes(this.props.currentUser)) {
        return this.props.redirectUnauthorized();
      } else {
        return null;
      }
    }) : null);
  }

  render() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, this.renderChild(this.props.group, this.props.activeGroup, this.props.handleGroupClick, this.props.handleActiveItem, null));
  }

}

class SideMenuContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: true,
      isHovered: false,
      activeGroups: [],
      currentActiveGroup: [],
      tempArr: []
    };

    this.handleGroupClick = (id, parent = null, type = '') => {
      let open_group = this.state.activeGroups;
      let active_group = this.state.currentActiveGroup;
      let temp_arr = this.state.tempArr;

      if (type === 'item' && parent === null) {
        active_group = [];
        temp_arr = [];
      } else if (type === 'item' && parent !== null) {
        active_group = [];

        if (temp_arr.includes(parent)) {
          temp_arr.splice(temp_arr.indexOf(parent) + 1, temp_arr.length);
        } else {
          temp_arr = [];
          temp_arr.push(parent);
        }

        active_group = temp_arr.slice(0);
      } else if (type === 'collapse' && parent === null) {
        temp_arr = [];
        temp_arr.push(id);
      } else if (type === 'collapse' && parent !== null) {
        if (active_group.includes(parent)) {
          temp_arr = active_group.slice(0);
        }

        if (temp_arr.includes(id)) {
          temp_arr.splice(temp_arr.indexOf(id), temp_arr.length);
        } else {
          temp_arr.push(id);
        }
      } else {
        temp_arr = [];
      }

      if (type === 'collapse') {
        if (!open_group.includes(id)) {
          let temp = open_group.filter(function (obj) {
            return active_group.indexOf(obj) === -1;
          });

          if (temp.length > 0 && !open_group.includes(parent)) {
            open_group = open_group.filter(function (obj) {
              return !temp.includes(obj);
            });
          }

          if (open_group.includes(parent) && active_group.includes(parent)) {
            open_group = active_group.slice(0);
          }

          if (!open_group.includes(id)) {
            open_group.push(id);
          }
        } else {
          open_group.splice(open_group.indexOf(id), 1);
        }
      }

      if (type === 'item') {
        open_group = active_group.slice(0);
      }

      this.setState({
        activeGroups: open_group,
        tempArr: temp_arr,
        currentActiveGroup: active_group
      });
    };

    this.initRender = parentArr => {
      this.setState({
        activeGroups: parentArr.slice(0),
        currentActiveGroup: parentArr.slice(0),
        flag: false
      });
    };

    this.getExternalLink = link => {
      return `${link}/?code=${this.props.currentUser.authToken}`;
    };

    this.parentArr = [];
    this.collapsedPath = null;
    this.navigationConfig = props.navigationConfig;
  }

  componentDidMount() {
    this.initRender(this.parentArr[0] ? this.parentArr[0] : []);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.activePath !== this.props.activePath) {
      if (this.collapsedMenuPaths !== null) {
        this.props.collapsedMenuPaths(this.collapsedMenuPaths);
      }

      this.initRender(this.parentArr[0] ? this.parentArr[this.parentArr.length - 1] : []);
    }
  }

  render() {
    const menuItems = this.navigationConfig.map(item => {
      const CustomAnchorTag = item.type === 'external-link' ? `a` : Link$1;

      if (item.type === 'groupHeader') {
        return /*#__PURE__*/React.createElement("li", {
          className: "navigation-header",
          key: `group-header-${item.groupTitle}`
        }, /*#__PURE__*/React.createElement("span", null, item.groupTitle));
      }

      let renderItem = /*#__PURE__*/React.createElement("li", {
        className: classnames('nav-item', {
          'has-sub': item.type === 'collapse',
          open: this.state.activeGroups.includes(item.id),
          'sidebar-group-active': this.state.currentActiveGroup.includes(item.id),
          hover: this.props.hoverIndex === item.id,
          active: this.props.activeItemState === item.navLink && item.type === 'item' || item.parentOf && item.parentOf.includes(this.props.activeItemState),
          disabled: item.disabled
        }),
        key: item.id,
        onClick: e => {
          e.stopPropagation();

          if (item.type === 'item') {
            this.props.handleActiveItem(item.navLink);
            this.handleGroupClick(item.id, null, item.type);

            if (this.props.deviceWidth <= 1200 && item.type === 'item') {
              this.props.toggleMenu();
            }
          } else {
            this.handleGroupClick(item.id, null, item.type);
          }
        }
      }, /*#__PURE__*/React.createElement(CustomAnchorTag, {
        to: item.filterBase ? item.filterBase : item.navLink && item.type === 'item' ? item.navLink : '',
        href: item.type === 'external-link' ? this.getExternalLink(item.navLink) : '',
        className: `d-flex ${item.badgeText ? 'justify-content-between' : 'justify-content-start'}`,
        onMouseEnter: () => {
          this.props.handleSidebarMouseEnter(item.id);
        },
        onMouseLeave: () => {
          this.props.handleSidebarMouseEnter(item.id);
        },
        key: item.id,
        onClick: e => {
          return item.type === 'collapse' ? e.preventDefault() : '';
        },
        target: item.newTab ? '_blank' : undefined
      }, /*#__PURE__*/React.createElement("div", {
        className: "menu-text"
      }, item.icon, /*#__PURE__*/React.createElement("span", {
        className: "menu-item menu-title"
      }, /*#__PURE__*/React.createElement(FormattedMessage, {
        id: item.title
      }))), item.badge ? /*#__PURE__*/React.createElement("div", {
        className: "menu-badge"
      }, /*#__PURE__*/React.createElement(Badge, {
        color: item.badge,
        className: "mr-1",
        pill: true
      }, item.badgeText)) : '', item.type === 'collapse' ? /*#__PURE__*/React.createElement(ChevronRight, {
        className: "menu-toggle-icon",
        size: 13
      }) : ''), item.type === 'collapse' ? /*#__PURE__*/React.createElement(SideMenuGroup, {
        group: item,
        handleGroupClick: this.handleGroupClick,
        activeGroup: this.state.activeGroups,
        handleActiveItem: this.props.handleActiveItem,
        activeItemState: this.props.activeItemState,
        handleSidebarMouseEnter: this.props.handleSidebarMouseEnter,
        activePath: this.props.activePath,
        hoverIndex: this.props.hoverIndex,
        initRender: this.initRender,
        parentArr: this.parentArr,
        triggerActive: undefined,
        currentActiveGroup: this.state.currentActiveGroup,
        permission: this.props.permission,
        currentUser: this.props.currentUser,
        redirectUnauthorized: this.redirectUnauthorized,
        collapsedMenuPaths: this.props.collapsedMenuPaths,
        toggleMenu: this.props.toggleMenu,
        deviceWidth: this.props.deviceWidth
      }) : '');

      if (item.navLink && item.collapsed !== undefined && item.collapsed === true) {
        this.collapsedPath = item.navLink;
        this.props.collapsedMenuPaths(item.navLink);
      }

      if (item.type === 'collapse' || item.type === 'external-link' || item.type === 'item' && item.permissions && item.permissions.includes(this.props.currentUser.role) || item.permissions === undefined) {
        return renderItem;
      } else if (item.type === 'item' && item.navLink === this.props.activePath && !item.permissions.includes(this.props.currentUser.role)) {
        return this.redirectUnauthorized();
      }
    });
    return /*#__PURE__*/React.createElement(React.Fragment, null, menuItems);
  }

}

class Sidebar extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      width: window.innerWidth,
      activeIndex: null,
      hoveredMenuItem: null,
      activeItem: this.props.activePath,
      menuShadow: false,
      ScrollbarTag: PerfectScrollbar
    };
    this.mounted = false;

    this.updateWidth = () => {
      if (this.mounted) {
        this.setState(prevState => ({
          width: window.innerWidth
        }));
        this.checkDevice();
      }
    };

    this.checkDevice = () => {
      var prefixes = " -webkit- -moz- -o- -ms- ".split(" ");

      var mq = function (query) {
        return window.matchMedia(query).matches;
      };

      if ("ontouchstart" in window || window.DocumentTouch) {
        this.setState({
          ScrollbarTag: "div"
        });
      } else {
        this.setState({
          ScrollbarTag: PerfectScrollbar
        });
      }

      var query = ["(", prefixes.join("touch-enabled),("), "heartz", ")"].join("");
      return mq(query);
    };

    this.changeActiveIndex = id => {
      if (id !== this.state.activeIndex) {
        this.setState({
          activeIndex: id
        });
      } else {
        this.setState({
          activeIndex: null
        });
      }
    };

    this.handleSidebarMouseEnter = id => {
      if (id !== this.state.hoveredMenuItem) {
        this.setState({
          hoveredMenuItem: id
        });
      } else {
        this.setState({
          hoveredMenuItem: null
        });
      }
    };

    this.handleActiveItem = url => {
      this.setState({
        activeItem: url
      });
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.activePath !== state.activeItem) {
      return {
        activeItem: props.activePath
      };
    }

    return null;
  }

  componentDidMount() {
    this.mounted = true;

    if (this.mounted) {
      if (window !== "undefined") {
        window.addEventListener("resize", this.updateWidth, false);
      }

      this.checkDevice();
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    let {
      toggleSidebarMenu,
      visibilityState,
      sidebarHover,
      toggle,
      color,
      sidebarVisibility,
      activeTheme,
      collapsed,
      activePath,
      sidebarState,
      currentLang,
      permission,
      currentUser,
      collapsedMenuPaths
    } = this.props;
    let {
      menuShadow,
      activeIndex,
      hoveredMenuItem,
      activeItem,
      ScrollbarTag
    } = this.state;

    let scrollShadow = (container, dir) => {
      if (container && dir === "up" && container.scrollTop >= 100) {
        this.setState({
          menuShadow: true
        });
      } else if (container && dir === "down" && container.scrollTop < 100) {
        this.setState({
          menuShadow: false
        });
      } else {
        return;
      }
    };

    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Hammer, {
      onSwipe: e => {
        sidebarVisibility();
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "menu-swipe-area d-xl-none d-block vh-100"
    })), /*#__PURE__*/React.createElement("div", {
      className: classnames(`main-menu menu-fixed menu-light menu-accordion menu-shadow theme-${activeTheme}`, {
        collapsed: sidebarState === true,
        "hide-sidebar": this.state.width < 1200 && visibilityState === false
      }),
      onMouseEnter: () => sidebarHover(false),
      onMouseLeave: () => sidebarHover(true)
    }, /*#__PURE__*/React.createElement(SidebarHeader, {
      toggleSidebarMenu: toggleSidebarMenu,
      toggle: toggle,
      sidebarBgColor: color,
      sidebarVisibility: sidebarVisibility,
      activeTheme: activeTheme,
      collapsed: collapsed,
      menuShadow: menuShadow,
      activePath: activePath,
      sidebarState: sidebarState
    }), /*#__PURE__*/React.createElement(ScrollbarTag, Object.assign({
      className: classnames("main-menu-content", {
        "overflow-hidden": ScrollbarTag !== "div",
        "overflow-scroll": ScrollbarTag === "div"
      })
    }, ScrollbarTag !== "div" && {
      options: {
        wheelPropagation: false
      },
      onScrollDown: container => scrollShadow(container, "down"),
      onScrollUp: container => scrollShadow(container, "up"),
      onYReachStart: () => menuShadow === true && this.setState({
        menuShadow: false
      })
    }), /*#__PURE__*/React.createElement(Hammer, {
      onSwipe: () => {
        sidebarVisibility();
      }
    }, /*#__PURE__*/React.createElement("ul", {
      className: "navigation navigation-main"
    }, /*#__PURE__*/React.createElement(SideMenuContent, {
      setActiveIndex: this.changeActiveIndex,
      activeIndex: activeIndex,
      hoverIndex: hoveredMenuItem,
      handleSidebarMouseEnter: this.handleSidebarMouseEnter,
      activeItemState: activeItem,
      handleActiveItem: this.handleActiveItem,
      activePath: activePath,
      lang: currentLang,
      permission: permission,
      currentUser: currentUser,
      collapsedMenuPaths: collapsedMenuPaths,
      toggleMenu: sidebarVisibility,
      deviceWidth: this.props.deviceWidth,
      navigationConfig: this.props.navigationConfig
    }))))));
  }

}

const mapStateToProps = state => {
  return {
    currentUser: state.auth
  };
};

var Sidebar$1 = connect(mapStateToProps)(Sidebar);

const Context = React.createContext();

class IntlProviderWrapper extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      locale: "en",
      messages: this.props.appMessage["en"]
    };
  }

  render() {
    const {
      children
    } = this.props;
    const {
      locale,
      messages
    } = this.state;
    return /*#__PURE__*/React.createElement(Context.Provider, {
      value: {
        state: this.state,
        switchLanguage: language => {
          this.setState({
            locale: language,
            messages: this.props.appMessage[language]
          });
        }
      }
    }, /*#__PURE__*/React.createElement(IntlProvider, {
      key: locale,
      locale: locale,
      messages: messages,
      defaultLocale: "en"
    }, children));
  }

}

class Autocomplete extends React.Component {
  constructor(props) {
    super(props);

    this.onSuggestionItemClick = (url, e) => {
      if (this.props.onSuggestionClick) {
        this.props.onSuggestionClick(e);
      }

      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: e.currentTarget.innerText
      });
      if (url) history.push(url);
    };

    this.onSuggestionItemHover = index => {
      this.setState({
        activeSuggestion: index
      });
    };

    this.onChange = e => {
      const userInput = e.currentTarget.value;
      this.setState({
        activeSuggestion: 0,
        showSuggestions: true,
        userInput
      });

      if (e.target.value < 1) {
        this.setState({
          showSuggestions: false
        });
      }
    };

    this.onInputClick = e => {
      e.stopPropagation();
    };

    this.onKeyDown = e => {
      const {
        activeSuggestion,
        showSuggestions,
        userInput
      } = this.state;
      const filterKey = this.props.filterKey;
      let suggestionList = ReactDOM.findDOMNode(this.suggestionList);

      if (e.keyCode === 38 && activeSuggestion !== 0) {
        this.setState({
          activeSuggestion: activeSuggestion - 1
        });

        if (e.target.value.length > -1 && suggestionList !== null && activeSuggestion <= this.filteredData.length / 2) {
          suggestionList.scrollTop = 0;
        }
      } else if (e.keyCode === 40 && activeSuggestion < this.filteredData.length - 1) {
          this.setState({
            activeSuggestion: activeSuggestion + 1
          });

          if (e.target.value.length > -1 && suggestionList !== null && activeSuggestion >= this.filteredData.length / 2) {
            suggestionList.scrollTop = suggestionList.scrollHeight;
          }
        } else if (e.keyCode === 27) {
            this.setState({
              showSuggestions: false,
              userInput: ''
            });
          } else if (e.keyCode === 13 && showSuggestions) {
              this.onSuggestionItemClick(this.filteredData[activeSuggestion].link, e);
              this.setState({
                userInput: this.filteredData[activeSuggestion][filterKey],
                showSuggestions: false
              });
            } else {
              return;
            }

      if (this.props.onKeyDown !== undefined && this.props.onKeyDown !== null && this.props.onKeyDown) {
        this.props.onKeyDown(e, userInput);
      }
    };

    this.renderGroupedSuggestion = arr => {
      const {
        filterKey,
        customRender
      } = this.props;
      const {
        onSuggestionItemClick,
        onSuggestionItemHover,
        state: {
          activeSuggestion,
          userInput
        }
      } = this;

      let renderSuggestion = (item, i) => {
        if (!customRender) {
          return /*#__PURE__*/React.createElement("li", {
            className: classnames('suggestion-item', {
              active: this.filteredData.indexOf(item) === activeSuggestion
            }),
            key: item[filterKey],
            onClick: e => onSuggestionItemClick(item.link, e),
            onMouseEnter: () => {
              this.onSuggestionItemHover(this.filteredData.indexOf(item));
            }
          }, item[filterKey]);
        } else if (customRender) {
          return customRender(item, i, this.filteredData, activeSuggestion, onSuggestionItemClick, onSuggestionItemHover, userInput);
        } else {
          return null;
        }
      };

      return arr.map((item, i) => {
        return renderSuggestion(item, i);
      });
    };

    this.renderUngroupedSuggestions = () => {
      const {
        filterKey,
        suggestions,
        customRender,
        suggestionLimit
      } = this.props;
      const {
        onSuggestionItemClick,
        onSuggestionItemHover,
        state: {
          activeSuggestion,
          userInput
        }
      } = this;
      this.filteredData = [];
      let sortSingleData = suggestions.filter(i => {
        let startCondition = i[filterKey].toLowerCase().startsWith(userInput.toLowerCase()),
            includeCondition = i[filterKey].toLowerCase().includes(userInput.toLowerCase());

        if (startCondition) {
          return startCondition;
        } else if (!startCondition && includeCondition) {
          return includeCondition;
        } else {
          return null;
        }
      }).slice(0, suggestionLimit);
      this.filteredData.push(...sortSingleData);
      return sortSingleData.map((suggestion, index) => {
        if (!customRender) {
          return /*#__PURE__*/React.createElement("li", {
            className: classnames('suggestion-item', {
              active: this.filteredData.indexOf(suggestion) === activeSuggestion
            }),
            key: suggestion[filterKey],
            onClick: e => onSuggestionItemClick(suggestion.link ? suggestion.link : null, e),
            onMouseEnter: () => this.onSuggestionItemHover(this.filteredData.indexOf(suggestion))
          }, suggestion[filterKey]);
        } else if (customRender) {
          return customRender(suggestion, index, this.filteredData, activeSuggestion, onSuggestionItemClick, onSuggestionItemHover, userInput);
        } else {
          return null;
        }
      });
    };

    this.renderSuggestions = () => {
      const {
        filterKey,
        grouped,
        filterHeaderKey,
        suggestions
      } = this.props;
      const {
        renderUngroupedSuggestions,
        state: {
          userInput
        }
      } = this;

      if (grouped === undefined || grouped === null || !grouped) {
        return renderUngroupedSuggestions();
      } else {
        this.filteredData = [];
        return suggestions.map(suggestion => {
          let sortData = suggestion.data.filter(i => {
            let startCondition = i[filterKey].toLowerCase().startsWith(userInput.toLowerCase()),
                includeCondition = i[filterKey].toLowerCase().includes(userInput.toLowerCase());

            if (startCondition) {
              return startCondition;
            } else if (!startCondition && includeCondition) {
              return includeCondition;
            } else {
              return null;
            }
          }).slice(0, suggestion.searchLimit);
          this.filteredData.push(...sortData);
          return /*#__PURE__*/React.createElement(React.Fragment, {
            key: suggestion[filterHeaderKey]
          }, /*#__PURE__*/React.createElement("li", {
            className: "suggestion-item suggestion-title text-primary text-bold-600"
          }, suggestion[filterHeaderKey]), sortData.length ? this.renderGroupedSuggestion(sortData) : /*#__PURE__*/React.createElement("li", {
            className: "suggestion-item no-result"
          }, /*#__PURE__*/React.createElement(AlertTriangle, {
            size: 15
          }), ' ', /*#__PURE__*/React.createElement("span", {
            className: "align-middle ml-50"
          }, "No Result")));
        });
      }
    };

    this.clearInput = val => {
      if (this.props.clearInput && !val) {
        this.setState({
          userInput: ''
        });
      }
    };

    this.handleExtenalClick = e => {
      let {
        container
      } = this.refs;
      const {
        target
      } = e;

      if (target !== container && !container.contains(target)) {
        this.setState({
          showSuggestions: false
        });
        if (this.props.externalClick) this.props.externalClick(e);
      }
    };

    this.state = {
      activeSuggestion: 0,
      showSuggestions: false,
      userInput: '',
      focused: false,
      openUp: false
    };
    this.filteredData = [];
    document.body.addEventListener('click', this.handleExtenalClick);
  }

  componentDidUpdate(prevProps, prevState) {
    let textInput = ReactDOM.findDOMNode(this.input);
    let {
      autoFocus,
      onSuggestionsShown,
      clearInput
    } = this.props;

    if (textInput !== null && autoFocus) {
      textInput.focus();
    }

    if (this.props.defaultSuggestions && prevState.showSuggestions === false && this.state.focused) {
      this.setState({
        showSuggestions: true
      });
    }

    if (clearInput === false && this.state.userInput.length) {
      this.setState({
        userInput: ''
      });
    }

    if (onSuggestionsShown && this.state.showSuggestions) {
      onSuggestionsShown(this.state.userInput);
    }

    if (this.props.defaultSuggestions && prevState.focused === false && this.state.focused === true) {
      this.setState({
        showSuggestions: true
      });
    }
  }

  componentDidMount() {
    if (this.props.defaultSuggestions && this.state.focused) {
      this.setState({
        showSuggestions: true
      });
    }
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.handleExtenalClick);
  }

  render() {
    const {
      onChange,
      onKeyDown,
      state: {
        showSuggestions,
        userInput,
        openUp
      }
    } = this;
    let suggestionsListComponent;

    if (showSuggestions) {
      suggestionsListComponent = /*#__PURE__*/React.createElement(PerfectScrollbar, {
        className: classnames('suggestions-list', {
          'open-up': openUp
        }),
        ref: el => this.suggestionList = el,
        component: "ul",
        options: {
          wheelPropagation: false
        }
      }, this.renderSuggestions());
    }

    return /*#__PURE__*/React.createElement("div", {
      className: "vx-autocomplete-container",
      ref: "container"
    }, /*#__PURE__*/React.createElement("input", {
      type: "text",
      onChange: e => {
        onChange(e);

        if (this.props.onChange) {
          this.props.onChange(e);
        }
      },
      onKeyDown: e => onKeyDown(e),
      value: userInput,
      className: `vx-autocomplete-search ${this.props.className ? this.props.className : ''}`,
      placeholder: this.props.placeholder,
      onClick: this.onInputClick,
      ref: el => {
        return this.input = el;
      },
      onFocus: e => {
        this.setState({
          focused: true
        });
      },
      autoFocus: this.props.autoFocus,
      onBlur: e => {
        if (this.props.onBlur) this.props.onBlur(e);
        this.setState({
          focused: false
        });
      }
    }), suggestionsListComponent);
  }

}
Autocomplete.propTypes = {
  suggestions: PropTypes.array.isRequired,
  filterKey: PropTypes.string.isRequired,
  filterHeaderKey: PropTypes.string,
  placeholder: PropTypes.string,
  suggestionLimit: PropTypes.number,
  grouped: PropTypes.bool,
  autoFocus: PropTypes.bool,
  onKeyDown: PropTypes.func,
  onChange: PropTypes.func,
  onSuggestionsShown: PropTypes.func,
  onSuggestionItemClick: PropTypes.func
};

const UserDropdown = props => {
  const {
    logoutAction
  } = props;

  const handleNavigation = (e, path) => {
    e.preventDefault();
    history.push(path);
  };

  return /*#__PURE__*/React.createElement(DropdownMenu, {
    right: true
  }, /*#__PURE__*/React.createElement(DropdownItem, {
    tag: "a",
    href: "#",
    onClick: e => handleNavigation(e, '/pages/profile')
  }, /*#__PURE__*/React.createElement(User, {
    size: 14,
    className: "mr-50"
  }), /*#__PURE__*/React.createElement("span", {
    className: "align-middle"
  }, "Edit Profile")), /*#__PURE__*/React.createElement(DropdownItem, {
    divider: true
  }), /*#__PURE__*/React.createElement(DropdownItem, {
    tag: "a",
    onClick: logoutAction
  }, /*#__PURE__*/React.createElement(Power, {
    size: 14,
    className: "mr-50"
  }), /*#__PURE__*/React.createElement("span", {
    className: "align-middle"
  }, "Log Out")));
};

class NavbarUser extends React.PureComponent {
  constructor(...args) {
    super(...args);
    this.state = {
      navbarSearch: false,
      langDropdown: false,
      shoppingCart: [],
      suggestions: []
    };

    this.handleNavbarSearch = () => {
      this.setState({
        navbarSearch: !this.state.navbarSearch
      });
    };

    this.removeItem = id => {
      let cart = this.state.shoppingCart;
      let updatedCart = cart.filter(i => i.id !== id);
      this.setState({
        shoppingCart: updatedCart
      });
    };

    this.handleLangDropdown = () => this.setState({
      langDropdown: !this.state.langDropdown
    });

    this.getCountryCode = locale => {
      const countryCode = {
        en: 'us',
        vi: 'vn'
      };
      return countryCode[locale];
    };
  }

  componentDidMount() {}

  render() {
    const renderCartItems = this.state.shoppingCart.map(item => {
      return /*#__PURE__*/React.createElement("div", {
        className: "cart-item",
        key: item.id
      }, /*#__PURE__*/React.createElement(Media, {
        className: "p-0",
        onClick: () => history.push('/ecommerce/product-detail')
      }, /*#__PURE__*/React.createElement(Media, {
        className: "text-center pr-0 mr-1",
        left: true
      }, /*#__PURE__*/React.createElement("img", {
        className: `${item.imgClass ? item.imgClass + ' cart-item-img' : 'cart-item-img'}`,
        src: item.img,
        width: item.width,
        alt: "Cart Item"
      })), /*#__PURE__*/React.createElement(Media, {
        className: "overflow-hidden pr-1 py-1 pl-0",
        body: true
      }, /*#__PURE__*/React.createElement("span", {
        className: "item-title text-truncate text-bold-500 d-block mb-50"
      }, item.name), /*#__PURE__*/React.createElement("span", {
        className: "item-desc font-small-2 text-truncate d-block"
      }, item.desc), /*#__PURE__*/React.createElement("div", {
        className: "d-flex justify-content-between align-items-center mt-1"
      }, /*#__PURE__*/React.createElement("span", {
        className: "align-middle d-block"
      }, "1 x ", item.price), /*#__PURE__*/React.createElement(X, {
        className: "danger",
        size: 15,
        onClick: e => {
          e.stopPropagation();
          this.removeItem(item.id);
        }
      })))));
    });
    return /*#__PURE__*/React.createElement("ul", {
      className: "nav navbar-nav navbar-nav-user float-right"
    }, /*#__PURE__*/React.createElement(Context.Consumer, null, context => {
      let langArr = {
        en: 'English',
        vi: 'Vietnamese'
      };
      return /*#__PURE__*/React.createElement(Dropdown, {
        tag: "li",
        className: "dropdown-language nav-item",
        isOpen: this.state.langDropdown,
        toggle: this.handleLangDropdown,
        "data-tour": "language"
      }, /*#__PURE__*/React.createElement(DropdownToggle, {
        tag: "a",
        className: "nav-link"
      }, /*#__PURE__*/React.createElement(ReactCountryFlag, {
        className: "country-flag",
        countryCode: this.getCountryCode(context.state.locale),
        svg: true
      }), /*#__PURE__*/React.createElement("span", {
        className: "d-sm-inline-block d-none text-capitalize align-middle ml-50"
      }, langArr[context.state.locale])), /*#__PURE__*/React.createElement(DropdownMenu, {
        right: true
      }, /*#__PURE__*/React.createElement(DropdownItem, {
        tag: "a",
        onClick: e => context.switchLanguage('en')
      }, /*#__PURE__*/React.createElement(ReactCountryFlag, {
        className: "country-flag",
        countryCode: "us",
        svg: true
      }), /*#__PURE__*/React.createElement("span", {
        className: "ml-1"
      }, "English")), /*#__PURE__*/React.createElement(DropdownItem, {
        tag: "a",
        onClick: e => context.switchLanguage('vi')
      }, /*#__PURE__*/React.createElement(ReactCountryFlag, {
        className: "country-flag",
        countryCode: "vn",
        svg: true
      }), /*#__PURE__*/React.createElement("span", {
        className: "ml-1"
      }, "Vietnamese"))));
    }), /*#__PURE__*/React.createElement(NavItem, {
      className: "nav-search",
      onClick: this.handleNavbarSearch
    }, /*#__PURE__*/React.createElement(NavLink, {
      className: "nav-link-search"
    }, /*#__PURE__*/React.createElement(Search, {
      size: 21,
      "data-tour": "search"
    })), /*#__PURE__*/React.createElement("div", {
      className: classnames('search-input', {
        open: this.state.navbarSearch,
        'd-none': this.state.navbarSearch === false
      })
    }, /*#__PURE__*/React.createElement("div", {
      className: "search-input-icon"
    }, /*#__PURE__*/React.createElement(Search, {
      size: 17,
      className: "primary"
    })), /*#__PURE__*/React.createElement(Autocomplete, {
      className: "form-control",
      suggestions: this.state.suggestions,
      filterKey: "title",
      filterHeaderKey: "groupTitle",
      grouped: true,
      placeholder: "Explore Vuexy...",
      autoFocus: true,
      clearInput: this.state.navbarSearch,
      externalClick: e => {
        this.setState({
          navbarSearch: false
        });
      },
      onKeyDown: e => {
        if (e.keyCode === 27 || e.keyCode === 13) {
          this.setState({
            navbarSearch: false
          });
          this.props.handleAppOverlay('');
        }
      },
      customRender: (item, i, filteredData, activeSuggestion, onSuggestionItemClick, onSuggestionItemHover) => {
        const IconTag = Icon[item.icon ? item.icon : 'X'];
        return /*#__PURE__*/React.createElement("li", {
          className: classnames('suggestion-item', {
            active: filteredData.indexOf(item) === activeSuggestion
          }),
          key: i,
          onClick: e => onSuggestionItemClick(item.link, e),
          onMouseEnter: () => onSuggestionItemHover(filteredData.indexOf(item))
        }, /*#__PURE__*/React.createElement("div", {
          className: classnames({
            'd-flex justify-content-between align-items-center': item.file || item.img
          })
        }, /*#__PURE__*/React.createElement("div", {
          className: "item-container d-flex"
        }, item.icon ? /*#__PURE__*/React.createElement(IconTag, {
          size: 17
        }) : item.file ? /*#__PURE__*/React.createElement("img", {
          src: item.file,
          height: "36",
          width: "28",
          alt: item.title
        }) : item.img ? /*#__PURE__*/React.createElement("img", {
          className: "rounded-circle mt-25",
          src: item.img,
          height: "28",
          width: "28",
          alt: item.title
        }) : null, /*#__PURE__*/React.createElement("div", {
          className: "item-info ml-1"
        }, /*#__PURE__*/React.createElement("p", {
          className: "align-middle mb-0"
        }, item.title), item.by || item.email ? /*#__PURE__*/React.createElement("small", {
          className: "text-muted"
        }, item.by ? item.by : item.email ? item.email : null) : null)), item.size || item.date ? /*#__PURE__*/React.createElement("div", {
          className: "meta-container"
        }, /*#__PURE__*/React.createElement("small", {
          className: "text-muted"
        }, item.size ? item.size : item.date ? item.date : null)) : null));
      },
      onSuggestionsShown: userInput => {
        if (this.state.navbarSearch) {
          this.props.handleAppOverlay(userInput);
        }
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "search-input-close"
    }, /*#__PURE__*/React.createElement(X, {
      size: 24,
      onClick: e => {
        e.stopPropagation();
        this.setState({
          navbarSearch: false
        });
        this.props.handleAppOverlay('');
      }
    })))), /*#__PURE__*/React.createElement(UncontrolledDropdown, {
      tag: "li",
      className: "dropdown-notification nav-item"
    }, /*#__PURE__*/React.createElement(DropdownToggle, {
      tag: "a",
      className: "nav-link nav-link-label"
    }, /*#__PURE__*/React.createElement(Bell, {
      size: 21
    }), /*#__PURE__*/React.createElement(Badge, {
      pill: true,
      color: "primary",
      className: "badge-up"
    }, ' ', "5", ' ')), /*#__PURE__*/React.createElement(DropdownMenu, {
      tag: "ul",
      right: true,
      className: "dropdown-menu-media"
    }, /*#__PURE__*/React.createElement("li", {
      className: "dropdown-menu-header"
    }, /*#__PURE__*/React.createElement("div", {
      className: "dropdown-header mt-0"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "text-white"
    }, "5 New"), /*#__PURE__*/React.createElement("span", {
      className: "notification-title"
    }, "App Notifications"))), /*#__PURE__*/React.createElement(PerfectScrollbar, {
      className: "media-list overflow-hidden position-relative",
      options: {
        wheelPropagation: false
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "d-flex justify-content-between"
    }, /*#__PURE__*/React.createElement(Media, {
      className: "d-flex align-items-start"
    }, /*#__PURE__*/React.createElement(Media, {
      left: true,
      href: "#"
    }, /*#__PURE__*/React.createElement(PlusSquare, {
      className: "font-medium-5 primary",
      size: 21
    })), /*#__PURE__*/React.createElement(Media, {
      body: true
    }, /*#__PURE__*/React.createElement(Media, {
      heading: true,
      className: "primary media-heading",
      tag: "h6"
    }, "You have new order!"), /*#__PURE__*/React.createElement("p", {
      className: "notification-text"
    }, "Are your going to meet me tonight?")), /*#__PURE__*/React.createElement("small", null, /*#__PURE__*/React.createElement("time", {
      className: "media-meta",
      dateTime: "2015-06-11T18:29:20+08:00"
    }, "9 hours ago")))), /*#__PURE__*/React.createElement("div", {
      className: "d-flex justify-content-between"
    }, /*#__PURE__*/React.createElement(Media, {
      className: "d-flex align-items-start"
    }, /*#__PURE__*/React.createElement(Media, {
      left: true,
      href: "#"
    }, /*#__PURE__*/React.createElement(DownloadCloud, {
      className: "font-medium-5 success",
      size: 21
    })), /*#__PURE__*/React.createElement(Media, {
      body: true
    }, /*#__PURE__*/React.createElement(Media, {
      heading: true,
      className: "success media-heading",
      tag: "h6"
    }, "99% Server load"), /*#__PURE__*/React.createElement("p", {
      className: "notification-text"
    }, "You got new order of goods?")), /*#__PURE__*/React.createElement("small", null, /*#__PURE__*/React.createElement("time", {
      className: "media-meta",
      dateTime: "2015-06-11T18:29:20+08:00"
    }, "5 hours ago")))), /*#__PURE__*/React.createElement("div", {
      className: "d-flex justify-content-between"
    }, /*#__PURE__*/React.createElement(Media, {
      className: "d-flex align-items-start"
    }, /*#__PURE__*/React.createElement(Media, {
      left: true,
      href: "#"
    }, /*#__PURE__*/React.createElement(AlertTriangle, {
      className: "font-medium-5 danger",
      size: 21
    })), /*#__PURE__*/React.createElement(Media, {
      body: true
    }, /*#__PURE__*/React.createElement(Media, {
      heading: true,
      className: "danger media-heading",
      tag: "h6"
    }, "Warning Notification"), /*#__PURE__*/React.createElement("p", {
      className: "notification-text"
    }, "Server has used 99% of CPU")), /*#__PURE__*/React.createElement("small", null, /*#__PURE__*/React.createElement("time", {
      className: "media-meta",
      dateTime: "2015-06-11T18:29:20+08:00"
    }, "Today")))), /*#__PURE__*/React.createElement("div", {
      className: "d-flex justify-content-between"
    }, /*#__PURE__*/React.createElement(Media, {
      className: "d-flex align-items-start"
    }, /*#__PURE__*/React.createElement(Media, {
      left: true,
      href: "#"
    }, /*#__PURE__*/React.createElement(CheckCircle, {
      className: "font-medium-5 info",
      size: 21
    })), /*#__PURE__*/React.createElement(Media, {
      body: true
    }, /*#__PURE__*/React.createElement(Media, {
      heading: true,
      className: "info media-heading",
      tag: "h6"
    }, "Complete the task"), /*#__PURE__*/React.createElement("p", {
      className: "notification-text"
    }, "One of your task is pending.")), /*#__PURE__*/React.createElement("small", null, /*#__PURE__*/React.createElement("time", {
      className: "media-meta",
      dateTime: "2015-06-11T18:29:20+08:00"
    }, "Last week")))), /*#__PURE__*/React.createElement("div", {
      className: "d-flex justify-content-between"
    }, /*#__PURE__*/React.createElement(Media, {
      className: "d-flex align-items-start"
    }, /*#__PURE__*/React.createElement(Media, {
      left: true,
      href: "#"
    }, /*#__PURE__*/React.createElement(File, {
      className: "font-medium-5 warning",
      size: 21
    })), /*#__PURE__*/React.createElement(Media, {
      body: true
    }, /*#__PURE__*/React.createElement(Media, {
      heading: true,
      className: "warning media-heading",
      tag: "h6"
    }, "Generate monthly report"), /*#__PURE__*/React.createElement("p", {
      className: "notification-text"
    }, "Reminder to generate monthly report")), /*#__PURE__*/React.createElement("small", null, /*#__PURE__*/React.createElement("time", {
      className: "media-meta",
      dateTime: "2015-06-11T18:29:20+08:00"
    }, "Last month"))))), /*#__PURE__*/React.createElement("li", {
      className: "dropdown-menu-footer"
    }, /*#__PURE__*/React.createElement(DropdownItem, {
      tag: "a",
      className: "p-1 text-center"
    }, /*#__PURE__*/React.createElement("span", {
      className: "align-middle"
    }, "Read all notifications"))))), /*#__PURE__*/React.createElement(UncontrolledDropdown, {
      tag: "li",
      className: "dropdown-user nav-item"
    }, /*#__PURE__*/React.createElement(DropdownToggle, {
      tag: "a",
      className: "nav-link dropdown-user-link"
    }, /*#__PURE__*/React.createElement("div", {
      className: "user-nav d-sm-flex d-none"
    }, /*#__PURE__*/React.createElement("span", {
      className: "user-name text-bold-600"
    }, this.props.userName), /*#__PURE__*/React.createElement("span", {
      className: "user-status"
    }, "Available")), /*#__PURE__*/React.createElement("span", {
      "data-tour": "user"
    }, /*#__PURE__*/React.createElement("img", {
      src: "https://storage.live.com/Users/-6155523327610065665/MyProfile/ExpressionProfile/ProfilePhoto:Win8Static,UserTileMedium,UserTileStatic",
      className: "round",
      height: "40",
      width: "40",
      alt: "avatar"
    }))), /*#__PURE__*/React.createElement(UserDropdown, this.props)));
  }

}

const ThemeNavbar = props => {
  const colorsArr = ['primary', 'danger', 'success', 'info', 'warning', 'dark'];
  const navbarTypes = ['floating', 'static', 'sticky', 'hidden'];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "content-overlay"
  }), /*#__PURE__*/React.createElement("div", {
    className: "header-navbar-shadow"
  }), /*#__PURE__*/React.createElement(Navbar$1, {
    className: classnames('header-navbar navbar-expand-lg navbar navbar-with-menu navbar-shadow', {
      'navbar-light': props.navbarColor === 'default' || !colorsArr.includes(props.navbarColor),
      'navbar-dark': colorsArr.includes(props.navbarColor),
      'bg-primary': props.navbarColor === 'primary' && props.navbarType !== 'static',
      'bg-danger': props.navbarColor === 'danger' && props.navbarType !== 'static',
      'bg-success': props.navbarColor === 'success' && props.navbarType !== 'static',
      'bg-info': props.navbarColor === 'info' && props.navbarType !== 'static',
      'bg-warning': props.navbarColor === 'warning' && props.navbarType !== 'static',
      'bg-dark': props.navbarColor === 'dark' && props.navbarType !== 'static',
      'd-none': props.navbarType === 'hidden' && !props.horizontal,
      'floating-nav': props.navbarType === 'floating' && !props.horizontal || !navbarTypes.includes(props.navbarType) && !props.horizontal,
      'navbar-static-top': props.navbarType === 'static' && !props.horizontal,
      'fixed-top': props.navbarType === 'sticky' || props.horizontal,
      scrolling: props.horizontal && props.scrolling
    })
  }, /*#__PURE__*/React.createElement("div", {
    className: "navbar-wrapper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "navbar-container content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "navbar-collapse d-flex justify-content-between align-items-center",
    id: "navbar-mobile"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bookmark-wrapper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mr-auto float-left bookmark-wrapper d-flex align-items-center"
  }, /*#__PURE__*/React.createElement("ul", {
    className: "navbar-nav d-xl-none"
  }, /*#__PURE__*/React.createElement(NavItem, {
    className: "mobile-menu mr-auto"
  }, /*#__PURE__*/React.createElement(NavLink, {
    className: "nav-menu-main menu-toggle hidden-xs is-active",
    onClick: props.sidebarVisibility
  }, /*#__PURE__*/React.createElement(Menu, {
    className: "ficon"
  })))), /*#__PURE__*/React.createElement("ul", {
    className: "nav navbar-nav bookmark-icons"
  }, /*#__PURE__*/React.createElement(NavItem, null, /*#__PURE__*/React.createElement(NavLink, null, /*#__PURE__*/React.createElement(Star, {
    className: "text-warning",
    size: 21
  })))))), /*#__PURE__*/React.createElement(NavbarUser, {
    handleAppOverlay: props.handleAppOverlay,
    changeCurrentLang: props.changeCurrentLang,
    userName: props.name,
    isAuthenticated: props.isAuthenticated,
    logoutAction: props.logoutAction
  }))))));
};

const mapStateToProps$1 = state => {
  return {
    name: state.auth.name,
    isAuthenticated: !!state.auth.name
  };
};

var Navbar = connect(mapStateToProps$1, {
  logoutAction
})(ThemeNavbar);

function useDeviceDetect() {
  const [isMobile, setMobile] = React.useState(false);
  React.useEffect(() => {
    const userAgent = typeof window.navigator === 'undefined' ? '' : navigator.userAgent;
    const mobile = Boolean(userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i));
    setMobile(mobile);
  }, []);
  return {
    isMobile
  };
}

const Footer = props => {
  const {
    isMobile
  } = useDeviceDetect();
  return /*#__PURE__*/React.createElement("footer", null, /*#__PURE__*/React.createElement("div", {
    className: classnames('footer footer-light', {
      'd-none': isMobile
    })
  }, /*#__PURE__*/React.createElement("p", {
    className: "mb-0 clearfix"
  }, /*#__PURE__*/React.createElement("span", {
    className: "float-md-left d-block d-md-inline-block mt-25"
  }, "COPYRIGHT \xA9 ", new Date().getFullYear(), /*#__PURE__*/React.createElement("a", {
    href: "https://themeforest.net/user/pixinvent/portfolio?ref=pixinvent",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Pixinvent,"), "All rights reserved"), /*#__PURE__*/React.createElement("span", {
    className: "float-md-right d-none d-md-block"
  }, /*#__PURE__*/React.createElement("span", {
    className: "align-middle"
  }, "Hand-crafted & Made with"), ' ', /*#__PURE__*/React.createElement(Heart, {
    className: "text-danger",
    size: 15
  })))), /*#__PURE__*/React.createElement("div", {
    className: classnames('footer footer-light footer-mobile', {
      'd-none': !isMobile
    })
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("a", {
    className: "tab-link",
    href: "#"
  }, /*#__PURE__*/React.createElement(Home, null))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("a", {
    className: "tab-link",
    href: "#"
  }, /*#__PURE__*/React.createElement(List, null))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("a", {
    className: "tab-link",
    href: "#"
  }, /*#__PURE__*/React.createElement(PlusCircle, null))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("a", {
    className: "tab-link",
    href: "#"
  }, /*#__PURE__*/React.createElement(Gift, null))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("a", {
    class: "tab-link"
  }, /*#__PURE__*/React.createElement(MessageSquare, null)))), props.hideScrollToTop === false ? /*#__PURE__*/React.createElement(ScrollToTop, {
    showUnder: 160
  }, /*#__PURE__*/React.createElement(Button, {
    color: "primary",
    className: "btn-icon scroll-top"
  }, /*#__PURE__*/React.createElement(ArrowUp, {
    size: 15
  }))) : null);
};

const changeMode = mode => {
  return dispatch => dispatch({
    type: "CHANGE_MODE",
    mode
  });
};
const collapseSidebar = value => {
  return dispatch => dispatch({
    type: "COLLAPSE_SIDEBAR",
    value
  });
};
const changeNavbarColor = color => {
  return dispatch => dispatch({
    type: "CHANGE_NAVBAR_COLOR",
    color
  });
};
const changeNavbarType = style => {
  return dispatch => dispatch({
    type: "CHANGE_NAVBAR_TYPE",
    style
  });
};
const changeFooterType = style => {
  return dispatch => dispatch({
    type: "CHANGE_FOOTER_TYPE",
    style
  });
};
const changeMenuColor = style => {
  return dispatch => dispatch({
    type: "CHANGE_MENU_COLOR",
    style
  });
};
const hideScrollToTop = value => {
  return dispatch => dispatch({
    type: "HIDE_SCROLL_TO_TOP",
    value
  });
};

class Layout extends PureComponent {
  constructor(...args) {
    super(...args);
    this.state = {
      width: window.innerWidth,
      sidebarState: this.props.customizer.sidebarCollapsed,
      layout: this.props.customizer.theme,
      collapsedContent: this.props.customizer.sidebarCollapsed,
      sidebarHidden: false,
      currentLang: 'en',
      appOverlay: false,
      customizer: false,
      currRoute: ''
    };
    this.collapsedPaths = [];
    this.mounted = false;

    this.updateWidth = () => {
      if (this.mounted) {
        this.setState(prevState => ({
          width: window.innerWidth
        }));
      }
    };

    this.handleCustomizer = bool => {
      this.setState({
        customizer: bool
      });
    };

    this.handleCollapsedMenuPaths = item => {
      let collapsedPaths = this.collapsedPaths;

      if (!collapsedPaths.includes(item)) {
        collapsedPaths.push(item);
        this.collapsedPaths = collapsedPaths;
      }
    };

    this.toggleSidebarMenu = val => {
      this.setState({
        sidebarState: !this.state.sidebarState,
        collapsedContent: !this.state.collapsedContent
      });
    };

    this.sidebarMenuHover = val => {
      this.setState({
        sidebarState: val
      });
    };

    this.handleSidebarVisibility = () => {
      if (this.mounted) {
        if (window !== undefined) {
          window.addEventListener('resize', () => {
            if (this.state.sidebarHidden) {
              this.setState({
                sidebarHidden: !this.state.sidebarHidden
              });
            }
          });
        }

        this.setState({
          sidebarHidden: !this.state.sidebarHidden
        });
      }
    };

    this.handleCurrentLanguage = lang => {
      this.setState({
        currentLang: lang
      });
    };

    this.handleAppOverlay = value => {
      if (value.length > 0) {
        this.setState({
          appOverlay: true
        });
      } else if (value.length < 0 || value === '') {
        this.setState({
          appOverlay: false
        });
      }
    };

    this.handleAppOverlayClick = () => {
      this.setState({
        appOverlay: false
      });
    };
  }

  componentDidMount() {
    this.mounted = true;
    let {
      location: {
        pathname
      },
      customizer: {
        theme,
        direction
      }
    } = this.props;

    if (this.mounted) {
      if (window !== 'undefined') {
        window.addEventListener('resize', this.updateWidth, false);
      }

      if (this.collapsedPaths.includes(pathname)) {
        this.props.collapseSidebar(true);
      }

      let layout = theme;
      let dir = direction;
      if (dir === 'rtl') document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');else document.getElementsByTagName('html')[0].setAttribute('dir', 'ltr');
      return layout === 'dark' ? document.body.classList.add('dark-layout') : layout === 'semi-dark' ? document.body.classList.add('semi-dark-layout') : null;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let {
      location: {
        pathname
      },
      customizer: {
        theme,
        sidebarCollapsed
      }
    } = this.props;
    let layout = theme;

    if (this.mounted) {
      if (layout === 'dark') {
        document.body.classList.remove('semi-dark-layout');
        document.body.classList.add('dark-layout');
      }

      if (layout === 'semi-dark') {
        document.body.classList.remove('dark-layout');
        document.body.classList.add('semi-dark-layout');
      }

      if (layout !== 'dark' && layout !== 'semi-dark') {
        document.body.classList.remove('dark-layout', 'semi-dark-layout');
      }

      if (prevProps.customizer.sidebarCollapsed !== this.props.customizer.sidebarCollapsed) {
        this.setState({
          collapsedContent: sidebarCollapsed,
          sidebarState: sidebarCollapsed
        });
      }

      if (prevProps.customizer.sidebarCollapsed === this.props.customizer.sidebarCollapsed && pathname !== prevProps.location.pathname && this.collapsedPaths.includes(pathname)) {
        this.props.collapseSidebar(true);
      }

      if (prevProps.customizer.sidebarCollapsed === this.props.customizer.sidebarCollapsed && pathname !== prevProps.location.pathname && !this.collapsedPaths.includes(pathname)) {
        this.props.collapseSidebar(false);
      }
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const appProps = this.props.customizer;
    const menuThemeArr = ['primary', 'success', 'danger', 'info', 'warning', 'dark'];
    const sidebarProps = {
      toggleSidebarMenu: this.props.collapseSidebar,
      toggle: this.toggleSidebarMenu,
      sidebarState: this.state.sidebarState,
      sidebarHover: this.sidebarMenuHover,
      sidebarVisibility: this.handleSidebarVisibility,
      visibilityState: this.state.sidebarHidden,
      activePath: this.props.match.path,
      collapsedMenuPaths: this.handleCollapsedMenuPaths,
      currentLang: this.state.currentLang,
      activeTheme: appProps.menuTheme,
      collapsed: this.state.collapsedContent,
      permission: '',
      deviceWidth: this.state.width,
      navigationConfig: this.props.navigationConfig
    };
    const navbarProps = {
      toggleSidebarMenu: this.toggleSidebarMenu,
      sidebarState: this.state.sidebarState,
      sidebarVisibility: this.handleSidebarVisibility,
      currentLang: this.state.currentLang,
      changeCurrentLang: this.handleCurrentLanguage,
      handleAppOverlay: this.handleAppOverlay,
      appOverlayState: this.state.appOverlay,
      navbarColor: appProps.navbarColor,
      navbarType: appProps.navbarType
    };
    const footerProps = {
      footerType: appProps.footerType,
      hideScrollToTop: appProps.hideScrollToTop
    };
    return /*#__PURE__*/React.createElement("div", {
      className: classnames(`wrapper vertical-layout theme-${appProps.menuTheme}`, {
        'menu-collapsed': this.state.collapsedContent === true && this.state.width >= 1200,
        'fixed-footer': appProps.footerType === 'sticky',
        'navbar-static': appProps.navbarType === 'static',
        'navbar-sticky': appProps.navbarType === 'sticky',
        'navbar-floating': appProps.navbarType === 'floating',
        'navbar-hidden': appProps.navbarType === 'hidden',
        'theme-primary': !menuThemeArr.includes(appProps.menuTheme)
      })
    }, /*#__PURE__*/React.createElement(Sidebar$1, sidebarProps), /*#__PURE__*/React.createElement("div", {
      className: classnames('app-content content', {
        'show-overlay': this.state.appOverlay === true
      }),
      onClick: this.handleAppOverlayClick
    }, /*#__PURE__*/React.createElement(Navbar, navbarProps), /*#__PURE__*/React.createElement("div", {
      className: "content-wrapper"
    }, this.props.children)), /*#__PURE__*/React.createElement(Footer, footerProps), /*#__PURE__*/React.createElement("div", {
      className: "sidenav-overlay",
      onClick: this.handleSidebarVisibility
    }));
  }

}

const mapStateToProps$2 = state => {
  return {
    customizer: state.customizer
  };
};

var Layout$1 = connect(mapStateToProps$2, {
  changeMode,
  collapseSidebar,
  changeNavbarColor,
  changeNavbarType,
  changeFooterType,
  changeMenuColor,
  hideScrollToTop
})(Layout);

const FullPageLayout = ({
  children,
  ...rest
}) => {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'url("https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/demo-1/static/media/vuesax-login-bg.eb4e894d.jpg")'
    },
    className: classnames('full-layout wrapper bg-full-screen-image blank-page dark-layout', {
      'layout-dark': themeConfig.layoutDark
    })
  }, /*#__PURE__*/React.createElement("div", {
    className: "app-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "content-wrapper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "content-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flexbox-container"
  }, /*#__PURE__*/React.createElement("main", {
    className: "main w-100"
  }, children))))));
};

var menu = {
	home: "Home",
	user: "User Management",
	buyInsurance: "Buy Insurance"
};
var messages_en = {
	menu: menu
};

var menu$1 = {
	home: "Trang chủ",
	user: "Tài khoản",
	buyInsurance: "Mua bảo hiểm"
};
var messages_vi = {
	menu: menu$1
};

const AppId = {
  HOME: 'HOME',
  USER: 'USER',
  ACCOUNT: 'ACCOUNT',
  BUY_INSURANCE: 'BUY_INSURANCE',
  INSURANCE_FEE: 'INSURANCE_FEE'
};

const navigationConfig = [{
  id: AppId.HOME,
  type: 'item',
  title: 'menu.home',
  icon: /*#__PURE__*/React.createElement(Home, {
    size: 20
  }),
  navLink: '/'
}, {
  id: AppId.USER,
  type: 'item',
  title: 'menu.user',
  icon: /*#__PURE__*/React.createElement(Mail, {
    size: 20
  }),
  permissions: ['admin', 'editor'],
  navLink: 'http://localhost:3001'
}];

const getNativgationConfig = appId => {
  return navigationConfig.map(item => {
    item.type = item.id === appId ? 'item' : 'external-link';
    return item;
  });
};

const AppRouter = ({
  checkLoginStatus,
  appId,
  isAuthentication,
  loginAction,
  authToken,
  children,
  message
}) => {
  useEffect(() => {
    const code = new URLSearchParams(document.location.search).get('code');
    checkLoginStatus(code || authToken);
  }, []);
  const appMessage = {
    en: { ...messages_en,
      [appId]: { ...message.en
      }
    },
    vi: { ...messages_vi,
      [appId]: { ...message.vi
      }
    }
  };
  return /*#__PURE__*/React.createElement(IntlProviderWrapper, {
    appMessage: appMessage
  }, /*#__PURE__*/React.createElement(Router, {
    history: history
  }, /*#__PURE__*/React.createElement(Switch, null, /*#__PURE__*/React.createElement(Route, {
    path: "/",
    render: props => isAuthentication ? /*#__PURE__*/React.createElement(Layout$1, Object.assign({
      navigationConfig: getNativgationConfig(appId)
    }, props), children) : /*#__PURE__*/React.createElement(FullPageLayout, null, /*#__PURE__*/React.createElement(Login, {
      loginAction: loginAction
    }))
  }))));
};

const mapStateToProps$3 = state => {
  return {
    isAuthentication: !!state.auth.username,
    authToken: state.auth.authToken
  };
};

var AppRouter$1 = connect(mapStateToProps$3, {
  checkLoginStatus,
  loginAction
})(AppRouter);

TopBarProgress.config({
  shadowBlur: 5,
  barThickness: 5
});

const LoadingSpinner = ({
  showLoadingBar
}) => {
  return showLoadingBar ? /*#__PURE__*/React.createElement(TopBarProgress, null) : null;
};

const mapStateToProps$4 = state => {
  return {
    showLoadingBar: state.customizer.showLoadingBar
  };
};

var LoadingSpinner$1 = connect(mapStateToProps$4)(LoadingSpinner);

const App = ({
  children,
  appId,
  appReducer,
  message
}) => {
  const middlewares = [thunk, createDebounce()];
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(rootReducer(appReducer), {}, composeEnhancers(applyMiddleware(...middlewares)));
  const persistor = persistStore(store);
  setUpHttpClient(store);
  return /*#__PURE__*/React.createElement(Provider, {
    store: store
  }, /*#__PURE__*/React.createElement(PersistGate, {
    loading: null,
    persistor: persistor
  }, /*#__PURE__*/React.createElement(LoadingSpinner$1, null), /*#__PURE__*/React.createElement(AppRouter$1, {
    message: message,
    appId: appId,
    children: children
  }), /*#__PURE__*/React.createElement(ToastContainer, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true
  })));
};

class FallbackSpinner extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "fallback-spinner vh-100"
    }, /*#__PURE__*/React.createElement("div", {
      className: "loading"
    }, /*#__PURE__*/React.createElement("div", {
      className: "effect-1 effects"
    }), /*#__PURE__*/React.createElement("div", {
      className: "effect-2 effects"
    }), /*#__PURE__*/React.createElement("div", {
      className: "effect-3 effects"
    })));
  }

}

function getWindowDimensions() {
  const {
    innerWidth: width,
    innerHeight: height
  } = window;
  return {
    width,
    height
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowDimensions;
}

export { AppId, App as BaseApp, FallbackSpinner, HttpClient, useDeviceDetect, useWindowDimensions };
//# sourceMappingURL=index.modern.js.map
