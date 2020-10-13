function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var reactRedux = require('react-redux');
var redux = require('redux');
var createDebounce = _interopDefault(require('redux-debounced'));
var thunk = _interopDefault(require('redux-thunk'));
var react = require('redux-persist/integration/react');
var reduxPersist = require('redux-persist');
var Axios = _interopDefault(require('axios'));
var Icon = require('react-feather');
var reactToastify = require('react-toastify');
var axiosExtensions = require('axios-extensions');
var history$1 = require('history');
var sessionStorage = _interopDefault(require('redux-persist/es/storage/session'));
var reactRouterDom = require('react-router-dom');
var reactIntl = require('react-intl');
var reactstrap = require('reactstrap');
var classnames = _interopDefault(require('classnames'));
var Hammer = _interopDefault(require('react-hammerjs'));
var PerfectScrollbar = _interopDefault(require('react-perfect-scrollbar'));
var ReactCountryFlag = _interopDefault(require('react-country-flag'));
var ReactDOM = _interopDefault(require('react-dom'));
var PropTypes = _interopDefault(require('prop-types'));
var ScrollToTop = _interopDefault(require('react-scroll-up'));
var Yup = require('yup');
var formik = require('formik');
require('react-perfect-scrollbar/dist/css/styles.css');
require('prismjs/themes/prism-tomorrow.css');
require('react-toastify/dist/ReactToastify.css');
var TopBarProgress = _interopDefault(require('react-topbar-progress-indicator'));

var HttpClient = Axios.create({
  timeout: 5000,
  adapter: axiosExtensions.throttleAdapterEnhancer(axiosExtensions.cacheAdapterEnhancer(Axios.defaults.adapter, {
    threshold: 15 * 60 * 1000
  }))
});

var errorMessage = function errorMessage(message) {
  return /*#__PURE__*/React__default.createElement("div", {
    className: "d-flex align-items-center"
  }, /*#__PURE__*/React__default.createElement(Icon.AlertTriangle, null), " ", /*#__PURE__*/React__default.createElement("span", {
    className: "ml-1"
  }, message));
};

var setUpHttpClient = function setUpHttpClient(store) {
  HttpClient.interceptors.request.use(function (config) {
    store.dispatch({
      type: 'SHOW_LOADING_BAR'
    });
    return config;
  });
  HttpClient.interceptors.response.use(function (response) {
    store.dispatch({
      type: 'HIDE_LOADING_BAR'
    });
    return response;
  }, function (e) {
    store.dispatch({
      type: 'HIDE_LOADING_BAR'
    });

    switch (e.response.status) {
      case 404:
        reactToastify.toast.error(errorMessage('API Not Found !'));
        break;

      case 400:
        reactToastify.toast.error(errorMessage('Bad Request !'));
        break;

      case 408:
        reactToastify.toast.error(errorMessage('Request Timeout !'));
        break;

      case 500:
        reactToastify.toast.error(errorMessage('Server error !'));
        break;

      default:
        return e.response;
    }
  });
};

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var themeConfig = {
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

var customizerReducer = function customizerReducer(state, action) {
  if (state === void 0) {
    state = _extends({}, themeConfig);
  }

  switch (action.type) {
    case 'CHANGE_MODE':
      return _extends({}, state, {
        theme: action.mode
      });

    case 'COLLAPSE_SIDEBAR':
      return _extends({}, state, {
        sidebarCollapsed: action.value
      });

    case 'CHANGE_NAVBAR_COLOR':
      return _extends({}, state, {
        navbarColor: action.color
      });

    case 'CHANGE_NAVBAR_TYPE':
      return _extends({}, state, {
        navbarType: action.style
      });

    case 'CHANGE_FOOTER_TYPE':
      return _extends({}, state, {
        footerType: action.style
      });

    case 'CHANGE_MENU_COLOR':
      return _extends({}, state, {
        menuTheme: action.style
      });

    case 'HIDE_SCROLL_TO_TOP':
      return _extends({}, state, {
        hideScrollToTop: action.value
      });

    case 'SHOW_LOADING_BAR':
      return _extends({}, state, {
        showLoadingBar: true
      });

    case 'HIDE_LOADING_BAR':
      return _extends({}, state, {
        showLoadingBar: false
      });

    default:
      return state;
  }
};

// A type of promise-like that resolves synchronously and supports only one observer

const _iteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator"))) : "@@iterator";

const _asyncIteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator"))) : "@@asyncIterator";

// Asynchronously call a function and send errors to recovery continuation
function _catch(body, recover) {
	try {
		var result = body();
	} catch(e) {
		return recover(e);
	}
	if (result && result.then) {
		return result.then(void 0, recover);
	}
	return result;
}

var API_LOGIN_URL = 'https://api.mocki.io/v1/5e448c60';
var API_LOGOUT_URL = 'https://api.mocki.io/v1/5e448c60';
var API_R_200 = 200;
var APP_URL = {
  HOME: 'http://localhost:3000',
  USER: 'http://localhost:3001'
};

var history = history$1.createBrowserHistory({
  basename: ''
});

var AuthService = function AuthService() {};

AuthService.login = function (user) {
  return HttpClient.post(API_LOGIN_URL, user);
};

AuthService.logout = function (user) {
  return HttpClient.post(API_LOGOUT_URL, user);
};

AuthService.checkLoginByToken = function (authToken) {
  return HttpClient.post(API_LOGIN_URL, authToken);
};

var LOGIN_ACTION = 'LOGIN_ACTION';
var LOOUT_ACTION = 'LOGOUT_ACTION';
var checkLoginStatus = function checkLoginStatus(code) {
  return function (dispatch) {
    try {
      if (!code) {
        return Promise.resolve();
      }

      var _temp2 = _catch(function () {
        return Promise.resolve(AuthService.checkLoginByToken(code)).then(function (respone) {
          if (respone.status === API_R_200) {
            dispatch({
              type: LOGIN_ACTION,
              payload: respone.data
            });
          } else {
            dispatch({
              type: LOOUT_ACTION
            });
            history.push('/');
          }
        });
      }, function (error) {
        console.log(error);
      });

      return Promise.resolve(_temp2 && _temp2.then ? _temp2.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };
};
var loginAction = function loginAction(user) {
  return function (dispatch) {
    try {
      var _temp4 = _catch(function () {
        return Promise.resolve(AuthService.login(user)).then(function (respone) {
          if (respone.status === API_R_200) {
            dispatch({
              type: LOGIN_ACTION,
              payload: respone.data
            });
            history.push('/');
          }
        });
      }, function (error) {
        console.log(error);
      });

      return Promise.resolve(_temp4 && _temp4.then ? _temp4.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };
};
var logoutAction = function logoutAction(user) {
  return function (dispatch) {
    try {
      var _temp6 = _catch(function () {
        return Promise.resolve(AuthService.logout(user)).then(function (respone) {
          if (respone.status === API_R_200) {
            dispatch({
              type: LOOUT_ACTION
            });
            history.push('/');
          }
        });
      }, function (error) {
        console.log(error);
      });

      return Promise.resolve(_temp6 && _temp6.then ? _temp6.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };
};

var authInitialState = {
  authToken: '',
  username: '',
  name: '',
  role: ''
};
var authReducers = function authReducers(state, action) {
  if (state === void 0) {
    state = _extends({}, authInitialState);
  }

  switch (action.type) {
    case LOGIN_ACTION:
      {
        return _extends({}, state, action.payload);
      }

    case LOOUT_ACTION:
      {
        return _extends({}, authInitialState);
      }

    default:
      return state;
  }
};

var defaultStarred = [].filter(function (item) {
  return item.starred === true;
});
var initialState = {
  suggestions: [],
  isLoading: false,
  value: "",
  starred: defaultStarred,
  noSuggestions: false,
  extraStarred: []
};

var navbarReducer = function navbarReducer(state, action) {
  if (state === void 0) {
    state = initialState;
  }

  switch (action.type) {
    case "MAYBE_UPDATE_SUGGESTIONS":
      return _extends({}, state, {
        suggestions: action.suggestions,
        isLoading: false
      });

    case "UPDATE_STARRED":
      var starredState = state.starred.map(function (i) {
        return i.id;
      });
      var extraStarredState = state.extraStarred.map(function (j) {
        return j.id;
      });

      if (state) {
        state.suggestions.find(function (i) {
          if (i.id === action.object.id) {
            i.starred = !action.object.starred;
            return _extends({}, state);
          } else {
            return null;
          }
        });
      }

      if (!starredState.includes(action.object.id) && state.starred.length < 10) {
        var newState = state.starred.push(action.object);
        return _extends({}, state, {
          newState: newState
        });
      } else if (starredState.includes(action.object.id)) {
          if (state.extraStarred.length === 0) {
            var _newState = state.starred.splice(starredState.indexOf(action.object.id), 1);

            return _extends({}, state, {
              newState: _newState
            });
          } else if (state.extraStarred.length > 0) {
            var getBookmark = state.extraStarred.splice(0, 1);
            state.starred.splice(starredState.indexOf(action.object.id), 1);
            var updatedState = state.starred.push(getBookmark[0]);
            return _extends({}, state, {
              updatedState: updatedState
            });
          } else {
            return _extends({}, state);
          }
        } else if (!extraStarredState.includes(action.object.id) && state.starred.length >= 10) {
            var extraStarred = state.extraStarred.concat(action.object);
            return _extends({}, state, {
              extraStarred: extraStarred
            });
          } else {
            return _extends({}, state);
          }

    default:
      return state;
  }
};

var rootReducer = function rootReducer(appReducer) {
  return redux.combineReducers({
    customizer: customizerReducer,
    auth: reduxPersist.persistReducer({
      storage: sessionStorage,
      key: 'root'
    }, authReducers),
    navbar: navbarReducer,
    app: appReducer
  });
};

var Login = function Login(_ref) {
  var loginAction = _ref.loginAction;

  var _useState = React.useState(''),
      username = _useState[0],
      setUsername = _useState[1];

  var _useState2 = React.useState(''),
      password = _useState2[0],
      setPassword = _useState2[1];

  var onClickLogin = function onClickLogin() {
    loginAction({
      username: username,
      password: password
    });
  };

  return /*#__PURE__*/React__default.createElement(reactstrap.Row, {
    className: "m-0 justify-content-center"
  }, /*#__PURE__*/React__default.createElement(reactstrap.Col, {
    sm: "8",
    xl: "7",
    lg: "10",
    md: "8",
    className: "d-flex justify-content-center"
  }, /*#__PURE__*/React__default.createElement(reactstrap.Card, {
    className: "bg-authentication login-card rounded-0 mb-0 w-100"
  }, /*#__PURE__*/React__default.createElement(reactstrap.Row, {
    className: "m-0"
  }, /*#__PURE__*/React__default.createElement(reactstrap.Col, {
    lg: "6",
    className: "d-lg-block d-none text-center align-self-center px-1 py-0"
  }, /*#__PURE__*/React__default.createElement("img", {
    src: "https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/demo-4/static/media/login.fd58a052.png",
    alt: "loginImg"
  })), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
    lg: "6",
    md: "12",
    className: "p-0"
  }, /*#__PURE__*/React__default.createElement(reactstrap.Card, {
    className: "rounded-0 mb-0 px-2 login-tabs-container"
  }, /*#__PURE__*/React__default.createElement(reactstrap.CardHeader, {
    className: "pb-1"
  }, /*#__PURE__*/React__default.createElement(reactstrap.CardTitle, null, /*#__PURE__*/React__default.createElement("h4", {
    className: "mb-0"
  }, "Login"))), /*#__PURE__*/React__default.createElement(reactstrap.CardBody, {
    className: "pt-1"
  }, /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, {
    className: "form-label-group position-relative has-icon-left"
  }, /*#__PURE__*/React__default.createElement(reactstrap.Input, {
    type: "email",
    placeholder: "Email",
    value: username,
    onChange: function onChange(e) {
      return setUsername(e.target.value);
    },
    required: true
  }), /*#__PURE__*/React__default.createElement(Icon.Mail, {
    size: 15
  }), /*#__PURE__*/React__default.createElement(reactstrap.Label, null, "Email")), /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, {
    className: "form-label-group position-relative has-icon-left"
  }, /*#__PURE__*/React__default.createElement(reactstrap.Input, {
    type: "password",
    placeholder: "Password",
    value: password,
    onChange: function onChange(e) {
      return setPassword(e.target.value);
    },
    required: true
  }), /*#__PURE__*/React__default.createElement(Icon.Lock, {
    size: 15
  }), /*#__PURE__*/React__default.createElement(reactstrap.Label, null, "Password")), /*#__PURE__*/React__default.createElement(reactstrap.Button, {
    color: "primary",
    type: "button",
    onClick: onClickLogin
  }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "Login"
  })))))))));
};

var SidebarHeader = /*#__PURE__*/function (_Component) {
  _inheritsLoose(SidebarHeader, _Component);

  function SidebarHeader() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = SidebarHeader.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        toggleSidebarMenu = _this$props.toggleSidebarMenu,
        activeTheme = _this$props.activeTheme,
        collapsed = _this$props.collapsed,
        toggle = _this$props.toggle,
        sidebarVisibility = _this$props.sidebarVisibility,
        menuShadow = _this$props.menuShadow;
    return /*#__PURE__*/React__default.createElement("div", {
      className: "navbar-header"
    }, /*#__PURE__*/React__default.createElement("ul", {
      className: "nav navbar-nav flex-row"
    }, /*#__PURE__*/React__default.createElement("li", {
      className: "nav-item mr-auto"
    }, /*#__PURE__*/React__default.createElement(reactstrap.NavLink, {
      to: "/",
      className: "navbar-brand"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "brand-logo"
    }), /*#__PURE__*/React__default.createElement("h2", {
      className: "brand-text mb-0"
    }, "Vuexy"))), /*#__PURE__*/React__default.createElement("li", {
      className: "nav-item nav-toggle"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "nav-link modern-nav-toggle"
    }, collapsed === false ? /*#__PURE__*/React__default.createElement(Icon.Disc, {
      onClick: function onClick() {
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
    }) : /*#__PURE__*/React__default.createElement(Icon.Circle, {
      onClick: function onClick() {
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
    }), /*#__PURE__*/React__default.createElement(Icon.X, {
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
    })))), /*#__PURE__*/React__default.createElement("div", {
      className: classnames("shadow-bottom", {
        "d-none": menuShadow === false
      })
    }));
  };

  return SidebarHeader;
}(React.Component);

var SideMenuGroup = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(SideMenuGroup, _React$Component);

  function SideMenuGroup(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.state = {
      isOpen: false,
      activeItem: _this.props.activePath
    };

    _this.handleActiveItem = function (url) {
      _this.setState({
        activeItem: url
      });
    };

    _this.flag = true;
    _this.parentArray = [];
    _this.childObj = {};
    return _this;
  }

  var _proto = SideMenuGroup.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
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
  };

  _proto.renderChild = function renderChild(item, activeGroup, handleGroupClick, handleActiveItem, parent) {
    var _this2 = this;

    return /*#__PURE__*/React__default.createElement("ul", {
      className: "menu-content"
    }, item.children ? item.children.map(function (child) {
      var CustomAnchorTag = child.type === "external-link" ? "a" : Link;

      if (!_this2.parentArray.includes(item.id) && _this2.flag) {
        _this2.parentArray.push(item.id);
      }

      if (child.navlink && child.collapsed) {
        _this2.props.collapsedMenuPaths(child.navLink);
      }

      if (_this2.props.activeItemState === child.navLink) {
        _this2.childObj = child;

        _this2.props.parentArr.push(_this2.parentArray);

        _this2.flag = false;
      }

      if (child.permissions && child.permissions.includes(_this2.props.currentUser) || child.permissions === undefined) {
        return /*#__PURE__*/React__default.createElement("li", {
          key: child.id,
          className: classnames({
            hover: _this2.props.hoverIndex === child.id,
            "has-sub": child.type === "collapse",
            open: child.type === "collapse" && activeGroup.includes(child.id),
            "sidebar-group-active": _this2.props.currentActiveGroup.includes(child.id),
            active: _this2.props.activeItemState === child.navLink && child.type === "item" || item.parentOf && item.parentOf.includes(_this2.props.activeItemState),
            disabled: child.disabled
          }),
          onClick: function onClick(e) {
            e.stopPropagation();
            handleGroupClick(child.id, item.id, child.type);

            if (child.navLink && child.navLink !== undefined) {
              handleActiveItem(child.navLink);
            }

            if (_this2.props.deviceWidth <= 1200 && child.type === "item") {
              _this2.props.toggleMenu();
            }
          }
        }, /*#__PURE__*/React__default.createElement(CustomAnchorTag, {
          className: classnames({
            "d-flex justify-content-between": child.type === "collapse"
          }),
          to: child.navLink && child.type === "item" ? child.navLink : "",
          href: child.type === "external-link" ? child.navLink : "",
          onMouseEnter: function onMouseEnter() {
            _this2.props.handleSidebarMouseEnter(child.id);
          },
          onMouseLeave: function onMouseLeave() {
            _this2.props.handleSidebarMouseEnter(child.id);
          },
          key: child.id,
          onClick: function onClick(e) {
            return child.type === "collapse" ? e.preventDefault() : "";
          },
          target: child.newTab ? "_blank" : undefined
        }, /*#__PURE__*/React__default.createElement("div", {
          className: "menu-text"
        }, child.icon, /*#__PURE__*/React__default.createElement("span", {
          className: "menu-item menu-title"
        }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
          id: child.title
        }))), child.badge ? /*#__PURE__*/React__default.createElement(reactstrap.Badge, {
          color: child.badge,
          className: "float-right mr-2",
          pill: true
        }, child.badgeText) : "", child.type === "collapse" ? /*#__PURE__*/React__default.createElement(Icon.ChevronRight, {
          className: "menu-toggle-icon",
          size: 13
        }) : ""), child.children ? _this2.renderChild(child, activeGroup, handleGroupClick, handleActiveItem, item.id) : "");
      } else if (child.navLink === _this2.props.activePath && !child.permissions.includes(_this2.props.currentUser)) {
        return _this2.props.redirectUnauthorized();
      } else {
        return null;
      }
    }) : null);
  };

  _proto.render = function render() {
    return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, this.renderChild(this.props.group, this.props.activeGroup, this.props.handleGroupClick, this.props.handleActiveItem, null));
  };

  return SideMenuGroup;
}(React__default.Component);

var SideMenuContent = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(SideMenuContent, _React$Component);

  function SideMenuContent(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.state = {
      flag: true,
      isHovered: false,
      activeGroups: [],
      currentActiveGroup: [],
      tempArr: []
    };

    _this.handleGroupClick = function (id, parent, type) {
      if (parent === void 0) {
        parent = null;
      }

      if (type === void 0) {
        type = '';
      }

      var open_group = _this.state.activeGroups;
      var active_group = _this.state.currentActiveGroup;
      var temp_arr = _this.state.tempArr;

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
          var temp = open_group.filter(function (obj) {
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

      _this.setState({
        activeGroups: open_group,
        tempArr: temp_arr,
        currentActiveGroup: active_group
      });
    };

    _this.initRender = function (parentArr) {
      _this.setState({
        activeGroups: parentArr.slice(0),
        currentActiveGroup: parentArr.slice(0),
        flag: false
      });
    };

    _this.getExternalLink = function (link) {
      return link + "?code=" + _this.props.currentUser.authToken;
    };

    _this.parentArr = [];
    _this.collapsedPath = null;
    _this.navigationConfig = props.navigationConfig;
    return _this;
  }

  var _proto = SideMenuContent.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.initRender(this.parentArr[0] ? this.parentArr[0] : []);
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    if (prevProps.activePath !== this.props.activePath) {
      if (this.collapsedMenuPaths !== null) {
        this.props.collapsedMenuPaths(this.collapsedMenuPaths);
      }

      this.initRender(this.parentArr[0] ? this.parentArr[this.parentArr.length - 1] : []);
    }
  };

  _proto.render = function render() {
    var _this2 = this;

    var menuItems = this.navigationConfig.map(function (item) {
      var CustomAnchorTag = item.type === 'external-link' ? "a" : reactRouterDom.Link;

      if (item.type === 'groupHeader') {
        return /*#__PURE__*/React__default.createElement("li", {
          className: "navigation-header",
          key: "group-header-" + item.groupTitle
        }, /*#__PURE__*/React__default.createElement("span", null, item.groupTitle));
      }

      var renderItem = /*#__PURE__*/React__default.createElement("li", {
        className: classnames('nav-item', {
          'has-sub': item.type === 'collapse',
          open: _this2.state.activeGroups.includes(item.id),
          'sidebar-group-active': _this2.state.currentActiveGroup.includes(item.id),
          hover: _this2.props.hoverIndex === item.id,
          active: _this2.props.activeItemState === item.navLink && item.type === 'item' || item.parentOf && item.parentOf.includes(_this2.props.activeItemState),
          disabled: item.disabled
        }),
        key: item.id,
        onClick: function onClick(e) {
          e.stopPropagation();

          if (item.type === 'item') {
            _this2.props.handleActiveItem(item.navLink);

            _this2.handleGroupClick(item.id, null, item.type);

            if (_this2.props.deviceWidth <= 1200 && item.type === 'item') {
              _this2.props.toggleMenu();
            }
          } else {
            _this2.handleGroupClick(item.id, null, item.type);
          }
        }
      }, /*#__PURE__*/React__default.createElement(CustomAnchorTag, {
        to: item.filterBase ? item.filterBase : item.navLink && item.type === 'item' ? item.navLink : '',
        href: item.type === 'external-link' ? _this2.getExternalLink(item.navLink) : '',
        className: "d-flex " + (item.badgeText ? 'justify-content-between' : 'justify-content-start'),
        onMouseEnter: function onMouseEnter() {
          _this2.props.handleSidebarMouseEnter(item.id);
        },
        onMouseLeave: function onMouseLeave() {
          _this2.props.handleSidebarMouseEnter(item.id);
        },
        key: item.id,
        onClick: function onClick(e) {
          return item.type === 'collapse' ? e.preventDefault() : '';
        },
        target: item.newTab ? '_blank' : undefined
      }, /*#__PURE__*/React__default.createElement("div", {
        className: "menu-text"
      }, item.icon, /*#__PURE__*/React__default.createElement("span", {
        className: "menu-item menu-title"
      }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
        id: item.title
      }))), item.badge ? /*#__PURE__*/React__default.createElement("div", {
        className: "menu-badge"
      }, /*#__PURE__*/React__default.createElement(reactstrap.Badge, {
        color: item.badge,
        className: "mr-1",
        pill: true
      }, item.badgeText)) : '', item.type === 'collapse' ? /*#__PURE__*/React__default.createElement(Icon.ChevronRight, {
        className: "menu-toggle-icon",
        size: 13
      }) : ''), item.type === 'collapse' ? /*#__PURE__*/React__default.createElement(SideMenuGroup, {
        group: item,
        handleGroupClick: _this2.handleGroupClick,
        activeGroup: _this2.state.activeGroups,
        handleActiveItem: _this2.props.handleActiveItem,
        activeItemState: _this2.props.activeItemState,
        handleSidebarMouseEnter: _this2.props.handleSidebarMouseEnter,
        activePath: _this2.props.activePath,
        hoverIndex: _this2.props.hoverIndex,
        initRender: _this2.initRender,
        parentArr: _this2.parentArr,
        triggerActive: undefined,
        currentActiveGroup: _this2.state.currentActiveGroup,
        permission: _this2.props.permission,
        currentUser: _this2.props.currentUser,
        redirectUnauthorized: _this2.redirectUnauthorized,
        collapsedMenuPaths: _this2.props.collapsedMenuPaths,
        toggleMenu: _this2.props.toggleMenu,
        deviceWidth: _this2.props.deviceWidth
      }) : '');

      if (item.navLink && item.collapsed !== undefined && item.collapsed === true) {
        _this2.collapsedPath = item.navLink;

        _this2.props.collapsedMenuPaths(item.navLink);
      }

      if (item.type === 'collapse' || item.type === 'external-link' || item.type === 'item' && item.permissions && item.permissions.includes(_this2.props.currentUser.role) || item.permissions === undefined) {
        return renderItem;
      } else if (item.type === 'item' && item.navLink === _this2.props.activePath && !item.permissions.includes(_this2.props.currentUser.role)) {
        return _this2.redirectUnauthorized();
      }
    });
    return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, menuItems);
  };

  return SideMenuContent;
}(React__default.Component);

var Sidebar = /*#__PURE__*/function (_Component) {
  _inheritsLoose(Sidebar, _Component);

  function Sidebar() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.state = {
      width: window.innerWidth,
      activeIndex: null,
      hoveredMenuItem: null,
      activeItem: _this.props.activePath,
      menuShadow: false,
      ScrollbarTag: PerfectScrollbar
    };
    _this.mounted = false;

    _this.updateWidth = function () {
      if (_this.mounted) {
        _this.setState(function (prevState) {
          return {
            width: window.innerWidth
          };
        });

        _this.checkDevice();
      }
    };

    _this.checkDevice = function () {
      var prefixes = " -webkit- -moz- -o- -ms- ".split(" ");

      var mq = function mq(query) {
        return window.matchMedia(query).matches;
      };

      if ("ontouchstart" in window || window.DocumentTouch) {
        _this.setState({
          ScrollbarTag: "div"
        });
      } else {
        _this.setState({
          ScrollbarTag: PerfectScrollbar
        });
      }

      var query = ["(", prefixes.join("touch-enabled),("), "heartz", ")"].join("");
      return mq(query);
    };

    _this.changeActiveIndex = function (id) {
      if (id !== _this.state.activeIndex) {
        _this.setState({
          activeIndex: id
        });
      } else {
        _this.setState({
          activeIndex: null
        });
      }
    };

    _this.handleSidebarMouseEnter = function (id) {
      if (id !== _this.state.hoveredMenuItem) {
        _this.setState({
          hoveredMenuItem: id
        });
      } else {
        _this.setState({
          hoveredMenuItem: null
        });
      }
    };

    _this.handleActiveItem = function (url) {
      _this.setState({
        activeItem: url
      });
    };

    return _this;
  }

  Sidebar.getDerivedStateFromProps = function getDerivedStateFromProps(props, state) {
    if (props.activePath !== state.activeItem) {
      return {
        activeItem: props.activePath
      };
    }

    return null;
  };

  var _proto = Sidebar.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.mounted = true;

    if (this.mounted) {
      if (window !== "undefined") {
        window.addEventListener("resize", this.updateWidth, false);
      }

      this.checkDevice();
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.mounted = false;
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        toggleSidebarMenu = _this$props.toggleSidebarMenu,
        visibilityState = _this$props.visibilityState,
        sidebarHover = _this$props.sidebarHover,
        toggle = _this$props.toggle,
        color = _this$props.color,
        sidebarVisibility = _this$props.sidebarVisibility,
        activeTheme = _this$props.activeTheme,
        collapsed = _this$props.collapsed,
        activePath = _this$props.activePath,
        sidebarState = _this$props.sidebarState,
        currentLang = _this$props.currentLang,
        permission = _this$props.permission,
        currentUser = _this$props.currentUser,
        collapsedMenuPaths = _this$props.collapsedMenuPaths;
    var _this$state = this.state,
        menuShadow = _this$state.menuShadow,
        activeIndex = _this$state.activeIndex,
        hoveredMenuItem = _this$state.hoveredMenuItem,
        activeItem = _this$state.activeItem,
        ScrollbarTag = _this$state.ScrollbarTag;

    var scrollShadow = function scrollShadow(container, dir) {
      if (container && dir === "up" && container.scrollTop >= 100) {
        _this2.setState({
          menuShadow: true
        });
      } else if (container && dir === "down" && container.scrollTop < 100) {
        _this2.setState({
          menuShadow: false
        });
      } else {
        return;
      }
    };

    return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(Hammer, {
      onSwipe: function onSwipe(e) {
        sidebarVisibility();
      }
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "menu-swipe-area d-xl-none d-block vh-100"
    })), /*#__PURE__*/React__default.createElement("div", {
      className: classnames("main-menu menu-fixed menu-light menu-accordion menu-shadow theme-" + activeTheme, {
        collapsed: sidebarState === true,
        "hide-sidebar": this.state.width < 1200 && visibilityState === false
      }),
      onMouseEnter: function onMouseEnter() {
        return sidebarHover(false);
      },
      onMouseLeave: function onMouseLeave() {
        return sidebarHover(true);
      }
    }, /*#__PURE__*/React__default.createElement(SidebarHeader, {
      toggleSidebarMenu: toggleSidebarMenu,
      toggle: toggle,
      sidebarBgColor: color,
      sidebarVisibility: sidebarVisibility,
      activeTheme: activeTheme,
      collapsed: collapsed,
      menuShadow: menuShadow,
      activePath: activePath,
      sidebarState: sidebarState
    }), /*#__PURE__*/React__default.createElement(ScrollbarTag, _extends({
      className: classnames("main-menu-content", {
        "overflow-hidden": ScrollbarTag !== "div",
        "overflow-scroll": ScrollbarTag === "div"
      })
    }, ScrollbarTag !== "div" && {
      options: {
        wheelPropagation: false
      },
      onScrollDown: function onScrollDown(container) {
        return scrollShadow(container, "down");
      },
      onScrollUp: function onScrollUp(container) {
        return scrollShadow(container, "up");
      },
      onYReachStart: function onYReachStart() {
        return menuShadow === true && _this2.setState({
          menuShadow: false
        });
      }
    }), /*#__PURE__*/React__default.createElement(Hammer, {
      onSwipe: function onSwipe() {
        sidebarVisibility();
      }
    }, /*#__PURE__*/React__default.createElement("ul", {
      className: "navigation navigation-main"
    }, /*#__PURE__*/React__default.createElement(SideMenuContent, {
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
  };

  return Sidebar;
}(React.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    currentUser: state.auth
  };
};

var Sidebar$1 = reactRedux.connect(mapStateToProps)(Sidebar);

var Context = React__default.createContext();

var IntlProviderWrapper = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(IntlProviderWrapper, _React$Component);

  function IntlProviderWrapper() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {
      locale: 'vi',
      messages: _this.props.appMessage['vi']
    };
    return _this;
  }

  var _proto = IntlProviderWrapper.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var children = this.props.children;
    var _this$state = this.state,
        locale = _this$state.locale,
        messages = _this$state.messages;
    return /*#__PURE__*/React__default.createElement(Context.Provider, {
      value: {
        state: this.state,
        switchLanguage: function switchLanguage(language) {
          _this2.setState({
            locale: language,
            messages: _this2.props.appMessage[language]
          });
        }
      }
    }, /*#__PURE__*/React__default.createElement(reactIntl.IntlProvider, {
      key: locale,
      locale: locale,
      messages: messages,
      defaultLocale: "vi"
    }, children));
  };

  return IntlProviderWrapper;
}(React__default.Component);

var Autocomplete = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Autocomplete, _React$Component);

  function Autocomplete(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.onSuggestionItemClick = function (url, e) {
      if (_this.props.onSuggestionClick) {
        _this.props.onSuggestionClick(e);
      }

      _this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: e.currentTarget.innerText
      });

      if (url) history.push(url);
    };

    _this.onSuggestionItemHover = function (index) {
      _this.setState({
        activeSuggestion: index
      });
    };

    _this.onChange = function (e) {
      var userInput = e.currentTarget.value;

      _this.setState({
        activeSuggestion: 0,
        showSuggestions: true,
        userInput: userInput
      });

      if (e.target.value < 1) {
        _this.setState({
          showSuggestions: false
        });
      }
    };

    _this.onInputClick = function (e) {
      e.stopPropagation();
    };

    _this.onKeyDown = function (e) {
      var _this$state = _this.state,
          activeSuggestion = _this$state.activeSuggestion,
          showSuggestions = _this$state.showSuggestions,
          userInput = _this$state.userInput;
      var filterKey = _this.props.filterKey;
      var suggestionList = ReactDOM.findDOMNode(_this.suggestionList);

      if (e.keyCode === 38 && activeSuggestion !== 0) {
        _this.setState({
          activeSuggestion: activeSuggestion - 1
        });

        if (e.target.value.length > -1 && suggestionList !== null && activeSuggestion <= _this.filteredData.length / 2) {
          suggestionList.scrollTop = 0;
        }
      } else if (e.keyCode === 40 && activeSuggestion < _this.filteredData.length - 1) {
          _this.setState({
            activeSuggestion: activeSuggestion + 1
          });

          if (e.target.value.length > -1 && suggestionList !== null && activeSuggestion >= _this.filteredData.length / 2) {
            suggestionList.scrollTop = suggestionList.scrollHeight;
          }
        } else if (e.keyCode === 27) {
            _this.setState({
              showSuggestions: false,
              userInput: ''
            });
          } else if (e.keyCode === 13 && showSuggestions) {
              _this.onSuggestionItemClick(_this.filteredData[activeSuggestion].link, e);

              _this.setState({
                userInput: _this.filteredData[activeSuggestion][filterKey],
                showSuggestions: false
              });
            } else {
              return;
            }

      if (_this.props.onKeyDown !== undefined && _this.props.onKeyDown !== null && _this.props.onKeyDown) {
        _this.props.onKeyDown(e, userInput);
      }
    };

    _this.renderGroupedSuggestion = function (arr) {
      var _this$props = _this.props,
          filterKey = _this$props.filterKey,
          customRender = _this$props.customRender;

      var _assertThisInitialize = _assertThisInitialized(_this),
          onSuggestionItemClick = _assertThisInitialize.onSuggestionItemClick,
          onSuggestionItemHover = _assertThisInitialize.onSuggestionItemHover,
          _assertThisInitialize2 = _assertThisInitialize.state,
          activeSuggestion = _assertThisInitialize2.activeSuggestion,
          userInput = _assertThisInitialize2.userInput;

      var renderSuggestion = function renderSuggestion(item, i) {
        if (!customRender) {
          return /*#__PURE__*/React__default.createElement("li", {
            className: classnames('suggestion-item', {
              active: _this.filteredData.indexOf(item) === activeSuggestion
            }),
            key: item[filterKey],
            onClick: function onClick(e) {
              return onSuggestionItemClick(item.link, e);
            },
            onMouseEnter: function onMouseEnter() {
              _this.onSuggestionItemHover(_this.filteredData.indexOf(item));
            }
          }, item[filterKey]);
        } else if (customRender) {
          return customRender(item, i, _this.filteredData, activeSuggestion, onSuggestionItemClick, onSuggestionItemHover, userInput);
        } else {
          return null;
        }
      };

      return arr.map(function (item, i) {
        return renderSuggestion(item, i);
      });
    };

    _this.renderUngroupedSuggestions = function () {
      var _this$filteredData;

      var _this$props2 = _this.props,
          filterKey = _this$props2.filterKey,
          suggestions = _this$props2.suggestions,
          customRender = _this$props2.customRender,
          suggestionLimit = _this$props2.suggestionLimit;

      var _assertThisInitialize3 = _assertThisInitialized(_this),
          onSuggestionItemClick = _assertThisInitialize3.onSuggestionItemClick,
          onSuggestionItemHover = _assertThisInitialize3.onSuggestionItemHover,
          _assertThisInitialize4 = _assertThisInitialize3.state,
          activeSuggestion = _assertThisInitialize4.activeSuggestion,
          userInput = _assertThisInitialize4.userInput;

      _this.filteredData = [];
      var sortSingleData = suggestions.filter(function (i) {
        var startCondition = i[filterKey].toLowerCase().startsWith(userInput.toLowerCase()),
            includeCondition = i[filterKey].toLowerCase().includes(userInput.toLowerCase());

        if (startCondition) {
          return startCondition;
        } else if (!startCondition && includeCondition) {
          return includeCondition;
        } else {
          return null;
        }
      }).slice(0, suggestionLimit);

      (_this$filteredData = _this.filteredData).push.apply(_this$filteredData, sortSingleData);

      return sortSingleData.map(function (suggestion, index) {
        if (!customRender) {
          return /*#__PURE__*/React__default.createElement("li", {
            className: classnames('suggestion-item', {
              active: _this.filteredData.indexOf(suggestion) === activeSuggestion
            }),
            key: suggestion[filterKey],
            onClick: function onClick(e) {
              return onSuggestionItemClick(suggestion.link ? suggestion.link : null, e);
            },
            onMouseEnter: function onMouseEnter() {
              return _this.onSuggestionItemHover(_this.filteredData.indexOf(suggestion));
            }
          }, suggestion[filterKey]);
        } else if (customRender) {
          return customRender(suggestion, index, _this.filteredData, activeSuggestion, onSuggestionItemClick, onSuggestionItemHover, userInput);
        } else {
          return null;
        }
      });
    };

    _this.renderSuggestions = function () {
      var _this$props3 = _this.props,
          filterKey = _this$props3.filterKey,
          grouped = _this$props3.grouped,
          filterHeaderKey = _this$props3.filterHeaderKey,
          suggestions = _this$props3.suggestions;

      var _assertThisInitialize5 = _assertThisInitialized(_this),
          renderUngroupedSuggestions = _assertThisInitialize5.renderUngroupedSuggestions,
          userInput = _assertThisInitialize5.state.userInput;

      if (grouped === undefined || grouped === null || !grouped) {
        return renderUngroupedSuggestions();
      } else {
        _this.filteredData = [];
        return suggestions.map(function (suggestion) {
          var _this$filteredData2;

          var sortData = suggestion.data.filter(function (i) {
            var startCondition = i[filterKey].toLowerCase().startsWith(userInput.toLowerCase()),
                includeCondition = i[filterKey].toLowerCase().includes(userInput.toLowerCase());

            if (startCondition) {
              return startCondition;
            } else if (!startCondition && includeCondition) {
              return includeCondition;
            } else {
              return null;
            }
          }).slice(0, suggestion.searchLimit);

          (_this$filteredData2 = _this.filteredData).push.apply(_this$filteredData2, sortData);

          return /*#__PURE__*/React__default.createElement(React__default.Fragment, {
            key: suggestion[filterHeaderKey]
          }, /*#__PURE__*/React__default.createElement("li", {
            className: "suggestion-item suggestion-title text-primary text-bold-600"
          }, suggestion[filterHeaderKey]), sortData.length ? _this.renderGroupedSuggestion(sortData) : /*#__PURE__*/React__default.createElement("li", {
            className: "suggestion-item no-result"
          }, /*#__PURE__*/React__default.createElement(Icon.AlertTriangle, {
            size: 15
          }), ' ', /*#__PURE__*/React__default.createElement("span", {
            className: "align-middle ml-50"
          }, "No Result")));
        });
      }
    };

    _this.clearInput = function (val) {
      if (_this.props.clearInput && !val) {
        _this.setState({
          userInput: ''
        });
      }
    };

    _this.handleExtenalClick = function (e) {
      var container = _this.refs.container;
      var target = e.target;

      if (target !== container && !container.contains(target)) {
        _this.setState({
          showSuggestions: false
        });

        if (_this.props.externalClick) _this.props.externalClick(e);
      }
    };

    _this.state = {
      activeSuggestion: 0,
      showSuggestions: false,
      userInput: '',
      focused: false,
      openUp: false
    };
    _this.filteredData = [];
    document.body.addEventListener('click', _this.handleExtenalClick);
    return _this;
  }

  var _proto = Autocomplete.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    var textInput = ReactDOM.findDOMNode(this.input);
    var _this$props4 = this.props,
        autoFocus = _this$props4.autoFocus,
        onSuggestionsShown = _this$props4.onSuggestionsShown,
        clearInput = _this$props4.clearInput;

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
  };

  _proto.componentDidMount = function componentDidMount() {
    if (this.props.defaultSuggestions && this.state.focused) {
      this.setState({
        showSuggestions: true
      });
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    document.body.removeEventListener('click', this.handleExtenalClick);
  };

  _proto.render = function render() {
    var _this2 = this;

    var _onChange = this.onChange,
        _onKeyDown = this.onKeyDown,
        _this$state2 = this.state,
        showSuggestions = _this$state2.showSuggestions,
        userInput = _this$state2.userInput,
        openUp = _this$state2.openUp;
    var suggestionsListComponent;

    if (showSuggestions) {
      suggestionsListComponent = /*#__PURE__*/React__default.createElement(PerfectScrollbar, {
        className: classnames('suggestions-list', {
          'open-up': openUp
        }),
        ref: function ref(el) {
          return _this2.suggestionList = el;
        },
        component: "ul",
        options: {
          wheelPropagation: false
        }
      }, this.renderSuggestions());
    }

    return /*#__PURE__*/React__default.createElement("div", {
      className: "vx-autocomplete-container",
      ref: "container"
    }, /*#__PURE__*/React__default.createElement("input", {
      type: "text",
      onChange: function onChange(e) {
        _onChange(e);

        if (_this2.props.onChange) {
          _this2.props.onChange(e);
        }
      },
      onKeyDown: function onKeyDown(e) {
        return _onKeyDown(e);
      },
      value: userInput,
      className: "vx-autocomplete-search " + (this.props.className ? this.props.className : ''),
      placeholder: this.props.placeholder,
      onClick: this.onInputClick,
      ref: function ref(el) {
        return _this2.input = el;
      },
      onFocus: function onFocus(e) {
        _this2.setState({
          focused: true
        });
      },
      autoFocus: this.props.autoFocus,
      onBlur: function onBlur(e) {
        if (_this2.props.onBlur) _this2.props.onBlur(e);

        _this2.setState({
          focused: false
        });
      }
    }), suggestionsListComponent);
  };

  return Autocomplete;
}(React__default.Component);
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

var UserDropdown = function UserDropdown(props) {
  var logoutAction = props.logoutAction;

  var handleNavigation = function handleNavigation(e, path) {
    e.preventDefault();
    history.push(path);
  };

  return /*#__PURE__*/React__default.createElement(reactstrap.DropdownMenu, {
    right: true
  }, /*#__PURE__*/React__default.createElement(reactstrap.DropdownItem, {
    tag: "a",
    href: "#",
    onClick: function onClick(e) {
      return handleNavigation(e, '/account-information');
    }
  }, /*#__PURE__*/React__default.createElement(Icon.User, {
    size: 14,
    className: "mr-50"
  }), /*#__PURE__*/React__default.createElement("span", {
    className: "align-middle"
  }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "setting.accountInformation"
  }))), /*#__PURE__*/React__default.createElement(reactstrap.DropdownItem, {
    divider: true
  }), /*#__PURE__*/React__default.createElement(reactstrap.DropdownItem, {
    tag: "a",
    href: "#",
    onClick: function onClick(e) {
      return handleNavigation(e, '/change-password');
    }
  }, /*#__PURE__*/React__default.createElement(Icon.Lock, {
    size: 14,
    className: "mr-50"
  }), /*#__PURE__*/React__default.createElement("span", {
    className: "align-middle"
  }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "setting.changePassword"
  }))), /*#__PURE__*/React__default.createElement(reactstrap.DropdownItem, {
    divider: true
  }), /*#__PURE__*/React__default.createElement(reactstrap.DropdownItem, {
    tag: "a",
    onClick: logoutAction
  }, /*#__PURE__*/React__default.createElement(Icon.Power, {
    size: 14,
    className: "mr-50"
  }), /*#__PURE__*/React__default.createElement("span", {
    className: "align-middle"
  }, "Log Out")));
};

var NavbarUser = /*#__PURE__*/function (_React$PureComponent) {
  _inheritsLoose(NavbarUser, _React$PureComponent);

  function NavbarUser() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;
    _this.state = {
      navbarSearch: false,
      langDropdown: false,
      shoppingCart: [],
      suggestions: []
    };

    _this.handleNavbarSearch = function () {
      _this.setState({
        navbarSearch: !_this.state.navbarSearch
      });
    };

    _this.removeItem = function (id) {
      var cart = _this.state.shoppingCart;
      var updatedCart = cart.filter(function (i) {
        return i.id !== id;
      });

      _this.setState({
        shoppingCart: updatedCart
      });
    };

    _this.handleLangDropdown = function () {
      return _this.setState({
        langDropdown: !_this.state.langDropdown
      });
    };

    _this.getCountryCode = function (locale) {
      var countryCode = {
        en: 'us',
        vi: 'vn'
      };
      return countryCode[locale];
    };

    return _this;
  }

  var _proto = NavbarUser.prototype;

  _proto.componentDidMount = function componentDidMount() {};

  _proto.render = function render() {
    var _this2 = this;

    var renderCartItems = this.state.shoppingCart.map(function (item) {
      return /*#__PURE__*/React__default.createElement("div", {
        className: "cart-item",
        key: item.id
      }, /*#__PURE__*/React__default.createElement(reactstrap.Media, {
        className: "p-0",
        onClick: function onClick() {
          return history.push('/ecommerce/product-detail');
        }
      }, /*#__PURE__*/React__default.createElement(reactstrap.Media, {
        className: "text-center pr-0 mr-1",
        left: true
      }, /*#__PURE__*/React__default.createElement("img", {
        className: "" + (item.imgClass ? item.imgClass + ' cart-item-img' : 'cart-item-img'),
        src: item.img,
        width: item.width,
        alt: "Cart Item"
      })), /*#__PURE__*/React__default.createElement(reactstrap.Media, {
        className: "overflow-hidden pr-1 py-1 pl-0",
        body: true
      }, /*#__PURE__*/React__default.createElement("span", {
        className: "item-title text-truncate text-bold-500 d-block mb-50"
      }, item.name), /*#__PURE__*/React__default.createElement("span", {
        className: "item-desc font-small-2 text-truncate d-block"
      }, item.desc), /*#__PURE__*/React__default.createElement("div", {
        className: "d-flex justify-content-between align-items-center mt-1"
      }, /*#__PURE__*/React__default.createElement("span", {
        className: "align-middle d-block"
      }, "1 x ", item.price), /*#__PURE__*/React__default.createElement(Icon.X, {
        className: "danger",
        size: 15,
        onClick: function onClick(e) {
          e.stopPropagation();

          _this2.removeItem(item.id);
        }
      })))));
    });
    return /*#__PURE__*/React__default.createElement("ul", {
      className: "nav navbar-nav navbar-nav-user float-right"
    }, /*#__PURE__*/React__default.createElement(Context.Consumer, null, function (context) {
      var langArr = {
        en: 'English',
        vi: 'Vietnamese'
      };
      return /*#__PURE__*/React__default.createElement(reactstrap.Dropdown, {
        tag: "li",
        className: "dropdown-language nav-item",
        isOpen: _this2.state.langDropdown,
        toggle: _this2.handleLangDropdown,
        "data-tour": "language"
      }, /*#__PURE__*/React__default.createElement(reactstrap.DropdownToggle, {
        tag: "a",
        className: "nav-link"
      }, /*#__PURE__*/React__default.createElement(ReactCountryFlag, {
        className: "country-flag",
        countryCode: _this2.getCountryCode(context.state.locale),
        svg: true
      }), /*#__PURE__*/React__default.createElement("span", {
        className: "d-sm-inline-block d-none text-capitalize align-middle ml-50"
      }, langArr[context.state.locale])), /*#__PURE__*/React__default.createElement(reactstrap.DropdownMenu, {
        right: true
      }, /*#__PURE__*/React__default.createElement(reactstrap.DropdownItem, {
        tag: "a",
        onClick: function onClick(e) {
          return context.switchLanguage('en');
        }
      }, /*#__PURE__*/React__default.createElement(ReactCountryFlag, {
        className: "country-flag",
        countryCode: "us",
        svg: true
      }), /*#__PURE__*/React__default.createElement("span", {
        className: "ml-1"
      }, "English")), /*#__PURE__*/React__default.createElement(reactstrap.DropdownItem, {
        tag: "a",
        onClick: function onClick(e) {
          return context.switchLanguage('vi');
        }
      }, /*#__PURE__*/React__default.createElement(ReactCountryFlag, {
        className: "country-flag",
        countryCode: "vn",
        svg: true
      }), /*#__PURE__*/React__default.createElement("span", {
        className: "ml-1"
      }, "Vietnamese"))));
    }), /*#__PURE__*/React__default.createElement(reactstrap.NavItem, {
      className: "nav-search",
      onClick: this.handleNavbarSearch
    }, /*#__PURE__*/React__default.createElement(reactstrap.NavLink, {
      className: "nav-link-search"
    }, /*#__PURE__*/React__default.createElement(Icon.Search, {
      size: 21,
      "data-tour": "search"
    })), /*#__PURE__*/React__default.createElement("div", {
      className: classnames('search-input', {
        open: this.state.navbarSearch,
        'd-none': this.state.navbarSearch === false
      })
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "search-input-icon"
    }, /*#__PURE__*/React__default.createElement(Icon.Search, {
      size: 17,
      className: "primary"
    })), /*#__PURE__*/React__default.createElement(Autocomplete, {
      className: "form-control",
      suggestions: this.state.suggestions,
      filterKey: "title",
      filterHeaderKey: "groupTitle",
      grouped: true,
      placeholder: "Explore Vuexy...",
      autoFocus: true,
      clearInput: this.state.navbarSearch,
      externalClick: function externalClick(e) {
        _this2.setState({
          navbarSearch: false
        });
      },
      onKeyDown: function onKeyDown(e) {
        if (e.keyCode === 27 || e.keyCode === 13) {
          _this2.setState({
            navbarSearch: false
          });

          _this2.props.handleAppOverlay('');
        }
      },
      customRender: function customRender(item, i, filteredData, activeSuggestion, onSuggestionItemClick, onSuggestionItemHover) {
        var IconTag = Icon[item.icon ? item.icon : 'X'];
        return /*#__PURE__*/React__default.createElement("li", {
          className: classnames('suggestion-item', {
            active: filteredData.indexOf(item) === activeSuggestion
          }),
          key: i,
          onClick: function onClick(e) {
            return onSuggestionItemClick(item.link, e);
          },
          onMouseEnter: function onMouseEnter() {
            return onSuggestionItemHover(filteredData.indexOf(item));
          }
        }, /*#__PURE__*/React__default.createElement("div", {
          className: classnames({
            'd-flex justify-content-between align-items-center': item.file || item.img
          })
        }, /*#__PURE__*/React__default.createElement("div", {
          className: "item-container d-flex"
        }, item.icon ? /*#__PURE__*/React__default.createElement(IconTag, {
          size: 17
        }) : item.file ? /*#__PURE__*/React__default.createElement("img", {
          src: item.file,
          height: "36",
          width: "28",
          alt: item.title
        }) : item.img ? /*#__PURE__*/React__default.createElement("img", {
          className: "rounded-circle mt-25",
          src: item.img,
          height: "28",
          width: "28",
          alt: item.title
        }) : null, /*#__PURE__*/React__default.createElement("div", {
          className: "item-info ml-1"
        }, /*#__PURE__*/React__default.createElement("p", {
          className: "align-middle mb-0"
        }, item.title), item.by || item.email ? /*#__PURE__*/React__default.createElement("small", {
          className: "text-muted"
        }, item.by ? item.by : item.email ? item.email : null) : null)), item.size || item.date ? /*#__PURE__*/React__default.createElement("div", {
          className: "meta-container"
        }, /*#__PURE__*/React__default.createElement("small", {
          className: "text-muted"
        }, item.size ? item.size : item.date ? item.date : null)) : null));
      },
      onSuggestionsShown: function onSuggestionsShown(userInput) {
        if (_this2.state.navbarSearch) {
          _this2.props.handleAppOverlay(userInput);
        }
      }
    }), /*#__PURE__*/React__default.createElement("div", {
      className: "search-input-close"
    }, /*#__PURE__*/React__default.createElement(Icon.X, {
      size: 24,
      onClick: function onClick(e) {
        e.stopPropagation();

        _this2.setState({
          navbarSearch: false
        });

        _this2.props.handleAppOverlay('');
      }
    })))), /*#__PURE__*/React__default.createElement(reactstrap.UncontrolledDropdown, {
      tag: "li",
      className: "dropdown-notification nav-item"
    }, /*#__PURE__*/React__default.createElement(reactstrap.DropdownToggle, {
      tag: "a",
      className: "nav-link nav-link-label"
    }, /*#__PURE__*/React__default.createElement(Icon.Bell, {
      size: 21
    }), /*#__PURE__*/React__default.createElement(reactstrap.Badge, {
      pill: true,
      color: "primary",
      className: "badge-up"
    }, ' ', "5", ' ')), /*#__PURE__*/React__default.createElement(reactstrap.DropdownMenu, {
      tag: "ul",
      right: true,
      className: "dropdown-menu-media"
    }, /*#__PURE__*/React__default.createElement("li", {
      className: "dropdown-menu-header"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "dropdown-header mt-0"
    }, /*#__PURE__*/React__default.createElement("h3", {
      className: "text-white"
    }, "5 New"), /*#__PURE__*/React__default.createElement("span", {
      className: "notification-title"
    }, "App Notifications"))), /*#__PURE__*/React__default.createElement(PerfectScrollbar, {
      className: "media-list overflow-hidden position-relative",
      options: {
        wheelPropagation: false
      }
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "d-flex justify-content-between"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Media, {
      className: "d-flex align-items-start"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Media, {
      left: true,
      href: "#"
    }, /*#__PURE__*/React__default.createElement(Icon.PlusSquare, {
      className: "font-medium-5 primary",
      size: 21
    })), /*#__PURE__*/React__default.createElement(reactstrap.Media, {
      body: true
    }, /*#__PURE__*/React__default.createElement(reactstrap.Media, {
      heading: true,
      className: "primary media-heading",
      tag: "h6"
    }, "You have new order!"), /*#__PURE__*/React__default.createElement("p", {
      className: "notification-text"
    }, "Are your going to meet me tonight?")), /*#__PURE__*/React__default.createElement("small", null, /*#__PURE__*/React__default.createElement("time", {
      className: "media-meta",
      dateTime: "2015-06-11T18:29:20+08:00"
    }, "9 hours ago")))), /*#__PURE__*/React__default.createElement("div", {
      className: "d-flex justify-content-between"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Media, {
      className: "d-flex align-items-start"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Media, {
      left: true,
      href: "#"
    }, /*#__PURE__*/React__default.createElement(Icon.DownloadCloud, {
      className: "font-medium-5 success",
      size: 21
    })), /*#__PURE__*/React__default.createElement(reactstrap.Media, {
      body: true
    }, /*#__PURE__*/React__default.createElement(reactstrap.Media, {
      heading: true,
      className: "success media-heading",
      tag: "h6"
    }, "99% Server load"), /*#__PURE__*/React__default.createElement("p", {
      className: "notification-text"
    }, "You got new order of goods?")), /*#__PURE__*/React__default.createElement("small", null, /*#__PURE__*/React__default.createElement("time", {
      className: "media-meta",
      dateTime: "2015-06-11T18:29:20+08:00"
    }, "5 hours ago")))), /*#__PURE__*/React__default.createElement("div", {
      className: "d-flex justify-content-between"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Media, {
      className: "d-flex align-items-start"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Media, {
      left: true,
      href: "#"
    }, /*#__PURE__*/React__default.createElement(Icon.AlertTriangle, {
      className: "font-medium-5 danger",
      size: 21
    })), /*#__PURE__*/React__default.createElement(reactstrap.Media, {
      body: true
    }, /*#__PURE__*/React__default.createElement(reactstrap.Media, {
      heading: true,
      className: "danger media-heading",
      tag: "h6"
    }, "Warning Notification"), /*#__PURE__*/React__default.createElement("p", {
      className: "notification-text"
    }, "Server has used 99% of CPU")), /*#__PURE__*/React__default.createElement("small", null, /*#__PURE__*/React__default.createElement("time", {
      className: "media-meta",
      dateTime: "2015-06-11T18:29:20+08:00"
    }, "Today")))), /*#__PURE__*/React__default.createElement("div", {
      className: "d-flex justify-content-between"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Media, {
      className: "d-flex align-items-start"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Media, {
      left: true,
      href: "#"
    }, /*#__PURE__*/React__default.createElement(Icon.CheckCircle, {
      className: "font-medium-5 info",
      size: 21
    })), /*#__PURE__*/React__default.createElement(reactstrap.Media, {
      body: true
    }, /*#__PURE__*/React__default.createElement(reactstrap.Media, {
      heading: true,
      className: "info media-heading",
      tag: "h6"
    }, "Complete the task"), /*#__PURE__*/React__default.createElement("p", {
      className: "notification-text"
    }, "One of your task is pending.")), /*#__PURE__*/React__default.createElement("small", null, /*#__PURE__*/React__default.createElement("time", {
      className: "media-meta",
      dateTime: "2015-06-11T18:29:20+08:00"
    }, "Last week")))), /*#__PURE__*/React__default.createElement("div", {
      className: "d-flex justify-content-between"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Media, {
      className: "d-flex align-items-start"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Media, {
      left: true,
      href: "#"
    }, /*#__PURE__*/React__default.createElement(Icon.File, {
      className: "font-medium-5 warning",
      size: 21
    })), /*#__PURE__*/React__default.createElement(reactstrap.Media, {
      body: true
    }, /*#__PURE__*/React__default.createElement(reactstrap.Media, {
      heading: true,
      className: "warning media-heading",
      tag: "h6"
    }, "Generate monthly report"), /*#__PURE__*/React__default.createElement("p", {
      className: "notification-text"
    }, "Reminder to generate monthly report")), /*#__PURE__*/React__default.createElement("small", null, /*#__PURE__*/React__default.createElement("time", {
      className: "media-meta",
      dateTime: "2015-06-11T18:29:20+08:00"
    }, "Last month"))))), /*#__PURE__*/React__default.createElement("li", {
      className: "dropdown-menu-footer"
    }, /*#__PURE__*/React__default.createElement(reactstrap.DropdownItem, {
      tag: "a",
      className: "p-1 text-center"
    }, /*#__PURE__*/React__default.createElement("span", {
      className: "align-middle"
    }, "Read all notifications"))))), /*#__PURE__*/React__default.createElement(reactstrap.UncontrolledDropdown, {
      tag: "li",
      className: "dropdown-user nav-item"
    }, /*#__PURE__*/React__default.createElement(reactstrap.DropdownToggle, {
      tag: "a",
      className: "nav-link dropdown-user-link"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "user-nav d-sm-flex d-none"
    }, /*#__PURE__*/React__default.createElement("span", {
      className: "user-name text-bold-600"
    }, this.props.userName), /*#__PURE__*/React__default.createElement("span", {
      className: "user-status"
    }, "Available")), /*#__PURE__*/React__default.createElement("span", {
      "data-tour": "user"
    }, /*#__PURE__*/React__default.createElement("img", {
      src: "https://storage.live.com/Users/-6155523327610065665/MyProfile/ExpressionProfile/ProfilePhoto:Win8Static,UserTileMedium,UserTileStatic",
      className: "round",
      height: "40",
      width: "40",
      alt: "avatar"
    }))), /*#__PURE__*/React__default.createElement(UserDropdown, this.props)));
  };

  return NavbarUser;
}(React__default.PureComponent);

var ThemeNavbar = function ThemeNavbar(props) {
  var colorsArr = ['primary', 'danger', 'success', 'info', 'warning', 'dark'];
  var navbarTypes = ['floating', 'static', 'sticky', 'hidden'];
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("div", {
    className: "content-overlay"
  }), /*#__PURE__*/React__default.createElement("div", {
    className: "header-navbar-shadow"
  }), /*#__PURE__*/React__default.createElement(reactstrap.Navbar, {
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
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "navbar-wrapper"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "navbar-container content"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "navbar-collapse d-flex justify-content-between align-items-center",
    id: "navbar-mobile"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "bookmark-wrapper"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "mr-auto float-left bookmark-wrapper d-flex align-items-center"
  }, /*#__PURE__*/React__default.createElement("ul", {
    className: "navbar-nav d-xl-none"
  }, /*#__PURE__*/React__default.createElement(reactstrap.NavItem, {
    className: "mobile-menu mr-auto"
  }, /*#__PURE__*/React__default.createElement(reactstrap.NavLink, {
    className: "nav-menu-main menu-toggle hidden-xs is-active",
    onClick: props.sidebarVisibility
  }, /*#__PURE__*/React__default.createElement(Icon.Menu, {
    className: "ficon"
  })))), /*#__PURE__*/React__default.createElement("ul", {
    className: "nav navbar-nav bookmark-icons"
  }, /*#__PURE__*/React__default.createElement(reactstrap.NavItem, null, /*#__PURE__*/React__default.createElement(reactstrap.NavLink, null, /*#__PURE__*/React__default.createElement(Icon.Star, {
    className: "text-warning",
    size: 21
  })))))), /*#__PURE__*/React__default.createElement(NavbarUser, {
    handleAppOverlay: props.handleAppOverlay,
    changeCurrentLang: props.changeCurrentLang,
    userName: props.name,
    isAuthenticated: props.isAuthenticated,
    logoutAction: props.logoutAction
  }))))));
};

var mapStateToProps$1 = function mapStateToProps(state) {
  return {
    name: state.auth.name,
    isAuthenticated: !!state.auth.name
  };
};

var Navbar = reactRedux.connect(mapStateToProps$1, {
  logoutAction: logoutAction
})(ThemeNavbar);

function useDeviceDetect() {
  var _React$useState = React__default.useState(false),
      isMobile = _React$useState[0],
      setMobile = _React$useState[1];

  React__default.useEffect(function () {
    var userAgent = typeof window.navigator === 'undefined' ? '' : navigator.userAgent;
    var mobile = Boolean(userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i));
    setMobile(mobile);
  }, []);
  return {
    isMobile: isMobile
  };
}

var Footer = function Footer(props) {
  var _useDeviceDetect = useDeviceDetect(),
      isMobile = _useDeviceDetect.isMobile;

  return /*#__PURE__*/React__default.createElement("footer", null, /*#__PURE__*/React__default.createElement("div", {
    className: classnames('footer footer-light', {
      'd-none': isMobile
    })
  }, /*#__PURE__*/React__default.createElement("p", {
    className: "mb-0 clearfix"
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "float-md-left d-block d-md-inline-block mt-25"
  }, "COPYRIGHT \xA9 ", new Date().getFullYear(), /*#__PURE__*/React__default.createElement("a", {
    href: "https://themeforest.net/user/pixinvent/portfolio?ref=pixinvent",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Pixinvent,"), "All rights reserved"), /*#__PURE__*/React__default.createElement("span", {
    className: "float-md-right d-none d-md-block"
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "align-middle"
  }, "Hand-crafted & Made with"), ' ', /*#__PURE__*/React__default.createElement(Icon.Heart, {
    className: "text-danger",
    size: 15
  })))), /*#__PURE__*/React__default.createElement("div", {
    className: classnames('footer footer-light footer-mobile', {
      'd-none': !isMobile
    })
  }, /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("a", {
    className: "tab-link",
    href: "#"
  }, /*#__PURE__*/React__default.createElement(Icon.Home, null))), /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("a", {
    className: "tab-link",
    href: "#"
  }, /*#__PURE__*/React__default.createElement(Icon.List, null))), /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("a", {
    className: "tab-link",
    href: "#"
  }, /*#__PURE__*/React__default.createElement(Icon.PlusCircle, null))), /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("a", {
    className: "tab-link",
    href: "#"
  }, /*#__PURE__*/React__default.createElement(Icon.Gift, null))), /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("a", {
    className: "tab-link"
  }, /*#__PURE__*/React__default.createElement(Icon.MessageSquare, null)))), props.hideScrollToTop === false ? /*#__PURE__*/React__default.createElement(ScrollToTop, {
    showUnder: 160
  }, /*#__PURE__*/React__default.createElement(reactstrap.Button, {
    color: "primary",
    className: "btn-icon scroll-top"
  }, /*#__PURE__*/React__default.createElement(Icon.ArrowUp, {
    size: 15
  }))) : null);
};

var changeMode = function changeMode(mode) {
  return function (dispatch) {
    return dispatch({
      type: "CHANGE_MODE",
      mode: mode
    });
  };
};
var collapseSidebar = function collapseSidebar(value) {
  return function (dispatch) {
    return dispatch({
      type: "COLLAPSE_SIDEBAR",
      value: value
    });
  };
};
var changeNavbarColor = function changeNavbarColor(color) {
  return function (dispatch) {
    return dispatch({
      type: "CHANGE_NAVBAR_COLOR",
      color: color
    });
  };
};
var changeNavbarType = function changeNavbarType(style) {
  return function (dispatch) {
    return dispatch({
      type: "CHANGE_NAVBAR_TYPE",
      style: style
    });
  };
};
var changeFooterType = function changeFooterType(style) {
  return function (dispatch) {
    return dispatch({
      type: "CHANGE_FOOTER_TYPE",
      style: style
    });
  };
};
var changeMenuColor = function changeMenuColor(style) {
  return function (dispatch) {
    return dispatch({
      type: "CHANGE_MENU_COLOR",
      style: style
    });
  };
};
var hideScrollToTop = function hideScrollToTop(value) {
  return function (dispatch) {
    return dispatch({
      type: "HIDE_SCROLL_TO_TOP",
      value: value
    });
  };
};

var Layout = /*#__PURE__*/function (_PureComponent) {
  _inheritsLoose(Layout, _PureComponent);

  function Layout() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _PureComponent.call.apply(_PureComponent, [this].concat(args)) || this;
    _this.state = {
      width: window.innerWidth,
      sidebarState: _this.props.customizer.sidebarCollapsed,
      layout: _this.props.customizer.theme,
      collapsedContent: _this.props.customizer.sidebarCollapsed,
      sidebarHidden: false,
      currentLang: 'en',
      appOverlay: false,
      customizer: false,
      currRoute: ''
    };
    _this.collapsedPaths = [];
    _this.mounted = false;

    _this.updateWidth = function () {
      if (_this.mounted) {
        _this.setState(function (prevState) {
          return {
            width: window.innerWidth
          };
        });
      }
    };

    _this.handleCustomizer = function (bool) {
      _this.setState({
        customizer: bool
      });
    };

    _this.handleCollapsedMenuPaths = function (item) {
      var collapsedPaths = _this.collapsedPaths;

      if (!collapsedPaths.includes(item)) {
        collapsedPaths.push(item);
        _this.collapsedPaths = collapsedPaths;
      }
    };

    _this.toggleSidebarMenu = function (val) {
      _this.setState({
        sidebarState: !_this.state.sidebarState,
        collapsedContent: !_this.state.collapsedContent
      });
    };

    _this.sidebarMenuHover = function (val) {
      _this.setState({
        sidebarState: val
      });
    };

    _this.handleSidebarVisibility = function () {
      if (_this.mounted) {
        if (window !== undefined) {
          window.addEventListener('resize', function () {
            if (_this.state.sidebarHidden) {
              _this.setState({
                sidebarHidden: !_this.state.sidebarHidden
              });
            }
          });
        }

        _this.setState({
          sidebarHidden: !_this.state.sidebarHidden
        });
      }
    };

    _this.handleCurrentLanguage = function (lang) {
      _this.setState({
        currentLang: lang
      });
    };

    _this.handleAppOverlay = function (value) {
      if (value.length > 0) {
        _this.setState({
          appOverlay: true
        });
      } else if (value.length < 0 || value === '') {
        _this.setState({
          appOverlay: false
        });
      }
    };

    _this.handleAppOverlayClick = function () {
      _this.setState({
        appOverlay: false
      });
    };

    return _this;
  }

  var _proto = Layout.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.mounted = true;
    var _this$props = this.props,
        pathname = _this$props.location.pathname,
        _this$props$customize = _this$props.customizer,
        theme = _this$props$customize.theme,
        direction = _this$props$customize.direction;

    if (this.mounted) {
      if (window !== 'undefined') {
        window.addEventListener('resize', this.updateWidth, false);
      }

      if (this.collapsedPaths.includes(pathname)) {
        this.props.collapseSidebar(true);
      }

      var layout = theme;
      var dir = direction;
      if (dir === 'rtl') document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');else document.getElementsByTagName('html')[0].setAttribute('dir', 'ltr');
      return layout === 'dark' ? document.body.classList.add('dark-layout') : layout === 'semi-dark' ? document.body.classList.add('semi-dark-layout') : null;
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    var _this$props2 = this.props,
        pathname = _this$props2.location.pathname,
        _this$props2$customiz = _this$props2.customizer,
        theme = _this$props2$customiz.theme,
        sidebarCollapsed = _this$props2$customiz.sidebarCollapsed;
    var layout = theme;

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
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.mounted = false;
  };

  _proto.render = function render() {
    var appProps = this.props.customizer;
    var menuThemeArr = ['primary', 'success', 'danger', 'info', 'warning', 'dark'];
    var sidebarProps = {
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
    var navbarProps = {
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
    var footerProps = {
      footerType: appProps.footerType,
      hideScrollToTop: appProps.hideScrollToTop
    };
    return /*#__PURE__*/React__default.createElement("div", {
      className: classnames("wrapper vertical-layout theme-" + appProps.menuTheme, {
        'menu-collapsed': this.state.collapsedContent === true && this.state.width >= 1200,
        'fixed-footer': appProps.footerType === 'sticky',
        'navbar-static': appProps.navbarType === 'static',
        'navbar-sticky': appProps.navbarType === 'sticky',
        'navbar-floating': appProps.navbarType === 'floating',
        'navbar-hidden': appProps.navbarType === 'hidden',
        'theme-primary': !menuThemeArr.includes(appProps.menuTheme)
      })
    }, /*#__PURE__*/React__default.createElement(Sidebar$1, sidebarProps), /*#__PURE__*/React__default.createElement("div", {
      className: classnames('app-content content', {
        'show-overlay': this.state.appOverlay === true
      }),
      onClick: this.handleAppOverlayClick
    }, /*#__PURE__*/React__default.createElement(Navbar, navbarProps), /*#__PURE__*/React__default.createElement("div", {
      className: "content-wrapper"
    }, this.props.children)), /*#__PURE__*/React__default.createElement(Footer, footerProps), /*#__PURE__*/React__default.createElement("div", {
      className: "sidenav-overlay",
      onClick: this.handleSidebarVisibility
    }));
  };

  return Layout;
}(React.PureComponent);

var mapStateToProps$2 = function mapStateToProps(state) {
  return {
    customizer: state.customizer
  };
};

var Layout$1 = reactRedux.connect(mapStateToProps$2, {
  changeMode: changeMode,
  collapseSidebar: collapseSidebar,
  changeNavbarColor: changeNavbarColor,
  changeNavbarType: changeNavbarType,
  changeFooterType: changeFooterType,
  changeMenuColor: changeMenuColor,
  hideScrollToTop: hideScrollToTop
})(Layout);

var FullPageLayout = function FullPageLayout(_ref) {
  var children = _ref.children,
      rest = _objectWithoutPropertiesLoose(_ref, ["children"]);

  return /*#__PURE__*/React__default.createElement("div", {
    style: {
      background: 'url("https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/demo-1/static/media/vuesax-login-bg.eb4e894d.jpg")'
    },
    className: classnames('full-layout wrapper bg-full-screen-image blank-page dark-layout', {
      'layout-dark': themeConfig.layoutDark
    })
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "app-content"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "content-wrapper"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "content-body"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "flexbox-container"
  }, /*#__PURE__*/React__default.createElement("main", {
    className: "main w-100"
  }, children))))));
};

var setting = "Setting";
var messages_en = {
	"menu.home": "Home",
	"menu.user": "User Management",
	"menu.buyInsurance": "Buy Insurance",
	setting: setting,
	"setting.accountInfromation": "Account Information",
	"setting.changePassword": "Change password",
	"setting.partnerCode": "Partner code",
	"setting.referralCode": "Referral code",
	"setting.completeAccount": "Your account had completed information",
	"setting.unCompleteAccount": "Account need additional information",
	"changePassword.passwordMustMatch": "Password must match"
};

var setting$1 = "Cài đặt";
var messages_vi = {
	"menu.home": "Trang chủ",
	"menu.user": "Tài khoản",
	"menu.buyInsurance": "Mua bảo hiểm",
	setting: setting$1,
	"setting.accountInformation": "Thông tin tài khoản",
	"setting.changePassword": "Thay đổi mật khẩu",
	"setting.partnerCode": "Mã đối tác",
	"setting.referralCode": "Mã giới thiệu",
	"setting.completeAccount": "Tài khoản đã hoàn thiện thông tin",
	"setting.unCompleteAccount": "Tài khoản cần bổ sung thông tin",
	"changePassword.passwordMustMatch": "Mật khẩu không trùng khớp"
};

var AppId = {
  HOME: 'HOME',
  USER: 'USER',
  ACCOUNT: 'ACCOUNT',
  BUY_INSURANCE: 'BUY_INSURANCE',
  INSURANCE_FEE: 'INSURANCE_FEE'
};

var navigationConfig = [{
  id: AppId.HOME,
  type: 'item',
  title: 'menu.home',
  icon: /*#__PURE__*/React__default.createElement(Icon.Home, {
    size: 20
  }),
  navLink: '/'
}, {
  id: AppId.USER,
  type: 'item',
  title: 'menu.user',
  icon: /*#__PURE__*/React__default.createElement(Icon.Mail, {
    size: 20
  }),
  permissions: ['admin', 'editor'],
  navLink: '/'
}];

var getNativgationConfig = function getNativgationConfig(appId) {
  return [].concat(navigationConfig).map(function (item) {
    if (item.id === appId) {
      item.type = 'item';
    } else {
      item.type = 'external-link';
      item.navLink = APP_URL[item.id] + item.navLink;
    }

    return item;
  });
};

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var flatpickr = createCommonjsModule(function (module, exports) {
/* flatpickr v4.6.6, @license MIT */
(function (global, factory) {
     module.exports = factory() ;
}(commonjsGlobal, (function () {
    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }

    var HOOKS = [
        "onChange",
        "onClose",
        "onDayCreate",
        "onDestroy",
        "onKeyDown",
        "onMonthChange",
        "onOpen",
        "onParseConfig",
        "onReady",
        "onValueUpdate",
        "onYearChange",
        "onPreCalendarPosition",
    ];
    var defaults = {
        _disable: [],
        _enable: [],
        allowInput: false,
        allowInvalidPreload: false,
        altFormat: "F j, Y",
        altInput: false,
        altInputClass: "form-control input",
        animate: typeof window === "object" &&
            window.navigator.userAgent.indexOf("MSIE") === -1,
        ariaDateFormat: "F j, Y",
        autoFillDefaultTime: true,
        clickOpens: true,
        closeOnSelect: true,
        conjunction: ", ",
        dateFormat: "Y-m-d",
        defaultHour: 12,
        defaultMinute: 0,
        defaultSeconds: 0,
        disable: [],
        disableMobile: false,
        enable: [],
        enableSeconds: false,
        enableTime: false,
        errorHandler: function (err) {
            return typeof console !== "undefined" && console.warn(err);
        },
        getWeek: function (givenDate) {
            var date = new Date(givenDate.getTime());
            date.setHours(0, 0, 0, 0);
            // Thursday in current week decides the year.
            date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
            // January 4 is always in week 1.
            var week1 = new Date(date.getFullYear(), 0, 4);
            // Adjust to Thursday in week 1 and count number of weeks from date to week1.
            return (1 +
                Math.round(((date.getTime() - week1.getTime()) / 86400000 -
                    3 +
                    ((week1.getDay() + 6) % 7)) /
                    7));
        },
        hourIncrement: 1,
        ignoredFocusElements: [],
        inline: false,
        locale: "default",
        minuteIncrement: 5,
        mode: "single",
        monthSelectorType: "dropdown",
        nextArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>",
        noCalendar: false,
        now: new Date(),
        onChange: [],
        onClose: [],
        onDayCreate: [],
        onDestroy: [],
        onKeyDown: [],
        onMonthChange: [],
        onOpen: [],
        onParseConfig: [],
        onReady: [],
        onValueUpdate: [],
        onYearChange: [],
        onPreCalendarPosition: [],
        plugins: [],
        position: "auto",
        positionElement: undefined,
        prevArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>",
        shorthandCurrentMonth: false,
        showMonths: 1,
        static: false,
        time_24hr: false,
        weekNumbers: false,
        wrap: false,
    };

    var english = {
        weekdays: {
            shorthand: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            longhand: [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
            ],
        },
        months: {
            shorthand: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ],
            longhand: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
            ],
        },
        daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        firstDayOfWeek: 0,
        ordinal: function (nth) {
            var s = nth % 100;
            if (s > 3 && s < 21)
                return "th";
            switch (s % 10) {
                case 1:
                    return "st";
                case 2:
                    return "nd";
                case 3:
                    return "rd";
                default:
                    return "th";
            }
        },
        rangeSeparator: " to ",
        weekAbbreviation: "Wk",
        scrollTitle: "Scroll to increment",
        toggleTitle: "Click to toggle",
        amPM: ["AM", "PM"],
        yearAriaLabel: "Year",
        monthAriaLabel: "Month",
        hourAriaLabel: "Hour",
        minuteAriaLabel: "Minute",
        time_24hr: false,
    };

    var pad = function (number, length) {
        if (length === void 0) { length = 2; }
        return ("000" + number).slice(length * -1);
    };
    var int = function (bool) { return (bool === true ? 1 : 0); };
    /* istanbul ignore next */
    function debounce(func, wait, immediate) {
        if (immediate === void 0) { immediate = false; }
        var timeout;
        return function () {
            var context = this, args = arguments;
            timeout !== null && clearTimeout(timeout);
            timeout = window.setTimeout(function () {
                timeout = null;
                if (!immediate)
                    func.apply(context, args);
            }, wait);
            if (immediate && !timeout)
                func.apply(context, args);
        };
    }
    var arrayify = function (obj) {
        return obj instanceof Array ? obj : [obj];
    };

    function toggleClass(elem, className, bool) {
        if (bool === true)
            return elem.classList.add(className);
        elem.classList.remove(className);
    }
    function createElement(tag, className, content) {
        var e = window.document.createElement(tag);
        className = className || "";
        content = content || "";
        e.className = className;
        if (content !== undefined)
            e.textContent = content;
        return e;
    }
    function clearNode(node) {
        while (node.firstChild)
            node.removeChild(node.firstChild);
    }
    function findParent(node, condition) {
        if (condition(node))
            return node;
        else if (node.parentNode)
            return findParent(node.parentNode, condition);
        return undefined; // nothing found
    }
    function createNumberInput(inputClassName, opts) {
        var wrapper = createElement("div", "numInputWrapper"), numInput = createElement("input", "numInput " + inputClassName), arrowUp = createElement("span", "arrowUp"), arrowDown = createElement("span", "arrowDown");
        if (navigator.userAgent.indexOf("MSIE 9.0") === -1) {
            numInput.type = "number";
        }
        else {
            numInput.type = "text";
            numInput.pattern = "\\d*";
        }
        if (opts !== undefined)
            for (var key in opts)
                numInput.setAttribute(key, opts[key]);
        wrapper.appendChild(numInput);
        wrapper.appendChild(arrowUp);
        wrapper.appendChild(arrowDown);
        return wrapper;
    }
    function getEventTarget(event) {
        try {
            if (typeof event.composedPath === "function") {
                var path = event.composedPath();
                return path[0];
            }
            return event.target;
        }
        catch (error) {
            return event.target;
        }
    }

    var doNothing = function () { return undefined; };
    var monthToStr = function (monthNumber, shorthand, locale) { return locale.months[shorthand ? "shorthand" : "longhand"][monthNumber]; };
    var revFormat = {
        D: doNothing,
        F: function (dateObj, monthName, locale) {
            dateObj.setMonth(locale.months.longhand.indexOf(monthName));
        },
        G: function (dateObj, hour) {
            dateObj.setHours(parseFloat(hour));
        },
        H: function (dateObj, hour) {
            dateObj.setHours(parseFloat(hour));
        },
        J: function (dateObj, day) {
            dateObj.setDate(parseFloat(day));
        },
        K: function (dateObj, amPM, locale) {
            dateObj.setHours((dateObj.getHours() % 12) +
                12 * int(new RegExp(locale.amPM[1], "i").test(amPM)));
        },
        M: function (dateObj, shortMonth, locale) {
            dateObj.setMonth(locale.months.shorthand.indexOf(shortMonth));
        },
        S: function (dateObj, seconds) {
            dateObj.setSeconds(parseFloat(seconds));
        },
        U: function (_, unixSeconds) { return new Date(parseFloat(unixSeconds) * 1000); },
        W: function (dateObj, weekNum, locale) {
            var weekNumber = parseInt(weekNum);
            var date = new Date(dateObj.getFullYear(), 0, 2 + (weekNumber - 1) * 7, 0, 0, 0, 0);
            date.setDate(date.getDate() - date.getDay() + locale.firstDayOfWeek);
            return date;
        },
        Y: function (dateObj, year) {
            dateObj.setFullYear(parseFloat(year));
        },
        Z: function (_, ISODate) { return new Date(ISODate); },
        d: function (dateObj, day) {
            dateObj.setDate(parseFloat(day));
        },
        h: function (dateObj, hour) {
            dateObj.setHours(parseFloat(hour));
        },
        i: function (dateObj, minutes) {
            dateObj.setMinutes(parseFloat(minutes));
        },
        j: function (dateObj, day) {
            dateObj.setDate(parseFloat(day));
        },
        l: doNothing,
        m: function (dateObj, month) {
            dateObj.setMonth(parseFloat(month) - 1);
        },
        n: function (dateObj, month) {
            dateObj.setMonth(parseFloat(month) - 1);
        },
        s: function (dateObj, seconds) {
            dateObj.setSeconds(parseFloat(seconds));
        },
        u: function (_, unixMillSeconds) {
            return new Date(parseFloat(unixMillSeconds));
        },
        w: doNothing,
        y: function (dateObj, year) {
            dateObj.setFullYear(2000 + parseFloat(year));
        },
    };
    var tokenRegex = {
        D: "(\\w+)",
        F: "(\\w+)",
        G: "(\\d\\d|\\d)",
        H: "(\\d\\d|\\d)",
        J: "(\\d\\d|\\d)\\w+",
        K: "",
        M: "(\\w+)",
        S: "(\\d\\d|\\d)",
        U: "(.+)",
        W: "(\\d\\d|\\d)",
        Y: "(\\d{4})",
        Z: "(.+)",
        d: "(\\d\\d|\\d)",
        h: "(\\d\\d|\\d)",
        i: "(\\d\\d|\\d)",
        j: "(\\d\\d|\\d)",
        l: "(\\w+)",
        m: "(\\d\\d|\\d)",
        n: "(\\d\\d|\\d)",
        s: "(\\d\\d|\\d)",
        u: "(.+)",
        w: "(\\d\\d|\\d)",
        y: "(\\d{2})",
    };
    var formats = {
        // get the date in UTC
        Z: function (date) { return date.toISOString(); },
        // weekday name, short, e.g. Thu
        D: function (date, locale, options) {
            return locale.weekdays.shorthand[formats.w(date, locale, options)];
        },
        // full month name e.g. January
        F: function (date, locale, options) {
            return monthToStr(formats.n(date, locale, options) - 1, false, locale);
        },
        // padded hour 1-12
        G: function (date, locale, options) {
            return pad(formats.h(date, locale, options));
        },
        // hours with leading zero e.g. 03
        H: function (date) { return pad(date.getHours()); },
        // day (1-30) with ordinal suffix e.g. 1st, 2nd
        J: function (date, locale) {
            return locale.ordinal !== undefined
                ? date.getDate() + locale.ordinal(date.getDate())
                : date.getDate();
        },
        // AM/PM
        K: function (date, locale) { return locale.amPM[int(date.getHours() > 11)]; },
        // shorthand month e.g. Jan, Sep, Oct, etc
        M: function (date, locale) {
            return monthToStr(date.getMonth(), true, locale);
        },
        // seconds 00-59
        S: function (date) { return pad(date.getSeconds()); },
        // unix timestamp
        U: function (date) { return date.getTime() / 1000; },
        W: function (date, _, options) {
            return options.getWeek(date);
        },
        // full year e.g. 2016, padded (0001-9999)
        Y: function (date) { return pad(date.getFullYear(), 4); },
        // day in month, padded (01-30)
        d: function (date) { return pad(date.getDate()); },
        // hour from 1-12 (am/pm)
        h: function (date) { return (date.getHours() % 12 ? date.getHours() % 12 : 12); },
        // minutes, padded with leading zero e.g. 09
        i: function (date) { return pad(date.getMinutes()); },
        // day in month (1-30)
        j: function (date) { return date.getDate(); },
        // weekday name, full, e.g. Thursday
        l: function (date, locale) {
            return locale.weekdays.longhand[date.getDay()];
        },
        // padded month number (01-12)
        m: function (date) { return pad(date.getMonth() + 1); },
        // the month number (1-12)
        n: function (date) { return date.getMonth() + 1; },
        // seconds 0-59
        s: function (date) { return date.getSeconds(); },
        // Unix Milliseconds
        u: function (date) { return date.getTime(); },
        // number of the day of the week
        w: function (date) { return date.getDay(); },
        // last two digits of year e.g. 16 for 2016
        y: function (date) { return String(date.getFullYear()).substring(2); },
    };

    var createDateFormatter = function (_a) {
        var _b = _a.config, config = _b === void 0 ? defaults : _b, _c = _a.l10n, l10n = _c === void 0 ? english : _c, _d = _a.isMobile, isMobile = _d === void 0 ? false : _d;
        return function (dateObj, frmt, overrideLocale) {
            var locale = overrideLocale || l10n;
            if (config.formatDate !== undefined && !isMobile) {
                return config.formatDate(dateObj, frmt, locale);
            }
            return frmt
                .split("")
                .map(function (c, i, arr) {
                return formats[c] && arr[i - 1] !== "\\"
                    ? formats[c](dateObj, locale, config)
                    : c !== "\\"
                        ? c
                        : "";
            })
                .join("");
        };
    };
    var createDateParser = function (_a) {
        var _b = _a.config, config = _b === void 0 ? defaults : _b, _c = _a.l10n, l10n = _c === void 0 ? english : _c;
        return function (date, givenFormat, timeless, customLocale) {
            if (date !== 0 && !date)
                return undefined;
            var locale = customLocale || l10n;
            var parsedDate;
            var dateOrig = date;
            if (date instanceof Date)
                parsedDate = new Date(date.getTime());
            else if (typeof date !== "string" &&
                date.toFixed !== undefined // timestamp
            )
                // create a copy
                parsedDate = new Date(date);
            else if (typeof date === "string") {
                // date string
                var format = givenFormat || (config || defaults).dateFormat;
                var datestr = String(date).trim();
                if (datestr === "today") {
                    parsedDate = new Date();
                    timeless = true;
                }
                else if (/Z$/.test(datestr) ||
                    /GMT$/.test(datestr) // datestrings w/ timezone
                )
                    parsedDate = new Date(date);
                else if (config && config.parseDate)
                    parsedDate = config.parseDate(date, format);
                else {
                    parsedDate =
                        !config || !config.noCalendar
                            ? new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0)
                            : new Date(new Date().setHours(0, 0, 0, 0));
                    var matched = void 0, ops = [];
                    for (var i = 0, matchIndex = 0, regexStr = ""; i < format.length; i++) {
                        var token_1 = format[i];
                        var isBackSlash = token_1 === "\\";
                        var escaped = format[i - 1] === "\\" || isBackSlash;
                        if (tokenRegex[token_1] && !escaped) {
                            regexStr += tokenRegex[token_1];
                            var match = new RegExp(regexStr).exec(date);
                            if (match && (matched = true)) {
                                ops[token_1 !== "Y" ? "push" : "unshift"]({
                                    fn: revFormat[token_1],
                                    val: match[++matchIndex],
                                });
                            }
                        }
                        else if (!isBackSlash)
                            regexStr += "."; // don't really care
                        ops.forEach(function (_a) {
                            var fn = _a.fn, val = _a.val;
                            return (parsedDate = fn(parsedDate, val, locale) || parsedDate);
                        });
                    }
                    parsedDate = matched ? parsedDate : undefined;
                }
            }
            /* istanbul ignore next */
            if (!(parsedDate instanceof Date && !isNaN(parsedDate.getTime()))) {
                config.errorHandler(new Error("Invalid date provided: " + dateOrig));
                return undefined;
            }
            if (timeless === true)
                parsedDate.setHours(0, 0, 0, 0);
            return parsedDate;
        };
    };
    /**
     * Compute the difference in dates, measured in ms
     */
    function compareDates(date1, date2, timeless) {
        if (timeless === void 0) { timeless = true; }
        if (timeless !== false) {
            return (new Date(date1.getTime()).setHours(0, 0, 0, 0) -
                new Date(date2.getTime()).setHours(0, 0, 0, 0));
        }
        return date1.getTime() - date2.getTime();
    }
    var isBetween = function (ts, ts1, ts2) {
        return ts > Math.min(ts1, ts2) && ts < Math.max(ts1, ts2);
    };
    var duration = {
        DAY: 86400000,
    };

    if (typeof Object.assign !== "function") {
        Object.assign = function (target) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (!target) {
                throw TypeError("Cannot convert undefined or null to object");
            }
            var _loop_1 = function (source) {
                if (source) {
                    Object.keys(source).forEach(function (key) { return (target[key] = source[key]); });
                }
            };
            for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
                var source = args_1[_a];
                _loop_1(source);
            }
            return target;
        };
    }

    var DEBOUNCED_CHANGE_MS = 300;
    function FlatpickrInstance(element, instanceConfig) {
        var self = {
            config: __assign(__assign({}, defaults), flatpickr.defaultConfig),
            l10n: english,
        };
        self.parseDate = createDateParser({ config: self.config, l10n: self.l10n });
        self._handlers = [];
        self.pluginElements = [];
        self.loadedPlugins = [];
        self._bind = bind;
        self._setHoursFromDate = setHoursFromDate;
        self._positionCalendar = positionCalendar;
        self.changeMonth = changeMonth;
        self.changeYear = changeYear;
        self.clear = clear;
        self.close = close;
        self._createElement = createElement;
        self.destroy = destroy;
        self.isEnabled = isEnabled;
        self.jumpToDate = jumpToDate;
        self.open = open;
        self.redraw = redraw;
        self.set = set;
        self.setDate = setDate;
        self.toggle = toggle;
        function setupHelperFunctions() {
            self.utils = {
                getDaysInMonth: function (month, yr) {
                    if (month === void 0) { month = self.currentMonth; }
                    if (yr === void 0) { yr = self.currentYear; }
                    if (month === 1 && ((yr % 4 === 0 && yr % 100 !== 0) || yr % 400 === 0))
                        return 29;
                    return self.l10n.daysInMonth[month];
                },
            };
        }
        function init() {
            self.element = self.input = element;
            self.isOpen = false;
            parseConfig();
            setupLocale();
            setupInputs();
            setupDates();
            setupHelperFunctions();
            if (!self.isMobile)
                build();
            bindEvents();
            if (self.selectedDates.length || self.config.noCalendar) {
                if (self.config.enableTime) {
                    setHoursFromDate(self.config.noCalendar
                        ? self.latestSelectedDateObj || self.config.minDate
                        : undefined);
                }
                updateValue(false);
            }
            setCalendarWidth();
            var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
            /* TODO: investigate this further
        
              Currently, there is weird positioning behavior in safari causing pages
              to scroll up. https://github.com/chmln/flatpickr/issues/563
        
              However, most browsers are not Safari and positioning is expensive when used
              in scale. https://github.com/chmln/flatpickr/issues/1096
            */
            if (!self.isMobile && isSafari) {
                positionCalendar();
            }
            triggerEvent("onReady");
        }
        function bindToInstance(fn) {
            return fn.bind(self);
        }
        function setCalendarWidth() {
            var config = self.config;
            if (config.weekNumbers === false && config.showMonths === 1) {
                return;
            }
            else if (config.noCalendar !== true) {
                window.requestAnimationFrame(function () {
                    if (self.calendarContainer !== undefined) {
                        self.calendarContainer.style.visibility = "hidden";
                        self.calendarContainer.style.display = "block";
                    }
                    if (self.daysContainer !== undefined) {
                        var daysWidth = (self.days.offsetWidth + 1) * config.showMonths;
                        self.daysContainer.style.width = daysWidth + "px";
                        self.calendarContainer.style.width =
                            daysWidth +
                                (self.weekWrapper !== undefined
                                    ? self.weekWrapper.offsetWidth
                                    : 0) +
                                "px";
                        self.calendarContainer.style.removeProperty("visibility");
                        self.calendarContainer.style.removeProperty("display");
                    }
                });
            }
        }
        /**
         * The handler for all events targeting the time inputs
         */
        function updateTime(e) {
            if (self.selectedDates.length === 0) {
                var defaultDate = self.config.minDate !== undefined
                    ? new Date(self.config.minDate.getTime())
                    : new Date();
                var _a = getDefaultHours(), hours = _a.hours, minutes = _a.minutes, seconds = _a.seconds;
                defaultDate.setHours(hours, minutes, seconds, 0);
                self.setDate(defaultDate, false);
            }
            if (e !== undefined && e.type !== "blur") {
                timeWrapper(e);
            }
            var prevValue = self._input.value;
            setHoursFromInputs();
            updateValue();
            if (self._input.value !== prevValue) {
                self._debouncedChange();
            }
        }
        function ampm2military(hour, amPM) {
            return (hour % 12) + 12 * int(amPM === self.l10n.amPM[1]);
        }
        function military2ampm(hour) {
            switch (hour % 24) {
                case 0:
                case 12:
                    return 12;
                default:
                    return hour % 12;
            }
        }
        /**
         * Syncs the selected date object time with user's time input
         */
        function setHoursFromInputs() {
            if (self.hourElement === undefined || self.minuteElement === undefined)
                return;
            var hours = (parseInt(self.hourElement.value.slice(-2), 10) || 0) % 24, minutes = (parseInt(self.minuteElement.value, 10) || 0) % 60, seconds = self.secondElement !== undefined
                ? (parseInt(self.secondElement.value, 10) || 0) % 60
                : 0;
            if (self.amPM !== undefined) {
                hours = ampm2military(hours, self.amPM.textContent);
            }
            var limitMinHours = self.config.minTime !== undefined ||
                (self.config.minDate &&
                    self.minDateHasTime &&
                    self.latestSelectedDateObj &&
                    compareDates(self.latestSelectedDateObj, self.config.minDate, true) ===
                        0);
            var limitMaxHours = self.config.maxTime !== undefined ||
                (self.config.maxDate &&
                    self.maxDateHasTime &&
                    self.latestSelectedDateObj &&
                    compareDates(self.latestSelectedDateObj, self.config.maxDate, true) ===
                        0);
            if (limitMaxHours) {
                var maxTime = self.config.maxTime !== undefined
                    ? self.config.maxTime
                    : self.config.maxDate;
                hours = Math.min(hours, maxTime.getHours());
                if (hours === maxTime.getHours())
                    minutes = Math.min(minutes, maxTime.getMinutes());
                if (minutes === maxTime.getMinutes())
                    seconds = Math.min(seconds, maxTime.getSeconds());
            }
            if (limitMinHours) {
                var minTime = self.config.minTime !== undefined
                    ? self.config.minTime
                    : self.config.minDate;
                hours = Math.max(hours, minTime.getHours());
                if (hours === minTime.getHours())
                    minutes = Math.max(minutes, minTime.getMinutes());
                if (minutes === minTime.getMinutes())
                    seconds = Math.max(seconds, minTime.getSeconds());
            }
            setHours(hours, minutes, seconds);
        }
        /**
         * Syncs time input values with a date
         */
        function setHoursFromDate(dateObj) {
            var date = dateObj || self.latestSelectedDateObj;
            if (date) {
                setHours(date.getHours(), date.getMinutes(), date.getSeconds());
            }
        }
        function getDefaultHours() {
            var hours = self.config.defaultHour;
            var minutes = self.config.defaultMinute;
            var seconds = self.config.defaultSeconds;
            if (self.config.minDate !== undefined) {
                var minHr = self.config.minDate.getHours();
                var minMinutes = self.config.minDate.getMinutes();
                hours = Math.max(hours, minHr);
                if (hours === minHr)
                    minutes = Math.max(minMinutes, minutes);
                if (hours === minHr && minutes === minMinutes)
                    seconds = self.config.minDate.getSeconds();
            }
            if (self.config.maxDate !== undefined) {
                var maxHr = self.config.maxDate.getHours();
                var maxMinutes = self.config.maxDate.getMinutes();
                hours = Math.min(hours, maxHr);
                if (hours === maxHr)
                    minutes = Math.min(maxMinutes, minutes);
                if (hours === maxHr && minutes === maxMinutes)
                    seconds = self.config.maxDate.getSeconds();
            }
            return { hours: hours, minutes: minutes, seconds: seconds };
        }
        /**
         * Sets the hours, minutes, and optionally seconds
         * of the latest selected date object and the
         * corresponding time inputs
         * @param {Number} hours the hour. whether its military
         *                 or am-pm gets inferred from config
         * @param {Number} minutes the minutes
         * @param {Number} seconds the seconds (optional)
         */
        function setHours(hours, minutes, seconds) {
            if (self.latestSelectedDateObj !== undefined) {
                self.latestSelectedDateObj.setHours(hours % 24, minutes, seconds || 0, 0);
            }
            if (!self.hourElement || !self.minuteElement || self.isMobile)
                return;
            self.hourElement.value = pad(!self.config.time_24hr
                ? ((12 + hours) % 12) + 12 * int(hours % 12 === 0)
                : hours);
            self.minuteElement.value = pad(minutes);
            if (self.amPM !== undefined)
                self.amPM.textContent = self.l10n.amPM[int(hours >= 12)];
            if (self.secondElement !== undefined)
                self.secondElement.value = pad(seconds);
        }
        /**
         * Handles the year input and incrementing events
         * @param {Event} event the keyup or increment event
         */
        function onYearInput(event) {
            var eventTarget = getEventTarget(event);
            var year = parseInt(eventTarget.value) + (event.delta || 0);
            if (year / 1000 > 1 ||
                (event.key === "Enter" && !/[^\d]/.test(year.toString()))) {
                changeYear(year);
            }
        }
        /**
         * Essentially addEventListener + tracking
         * @param {Element} element the element to addEventListener to
         * @param {String} event the event name
         * @param {Function} handler the event handler
         */
        function bind(element, event, handler, options) {
            if (event instanceof Array)
                return event.forEach(function (ev) { return bind(element, ev, handler, options); });
            if (element instanceof Array)
                return element.forEach(function (el) { return bind(el, event, handler, options); });
            element.addEventListener(event, handler, options);
            self._handlers.push({
                element: element,
                event: event,
                handler: handler,
                options: options,
            });
        }
        function triggerChange() {
            triggerEvent("onChange");
        }
        /**
         * Adds all the necessary event listeners
         */
        function bindEvents() {
            if (self.config.wrap) {
                ["open", "close", "toggle", "clear"].forEach(function (evt) {
                    Array.prototype.forEach.call(self.element.querySelectorAll("[data-" + evt + "]"), function (el) {
                        return bind(el, "click", self[evt]);
                    });
                });
            }
            if (self.isMobile) {
                setupMobile();
                return;
            }
            var debouncedResize = debounce(onResize, 50);
            self._debouncedChange = debounce(triggerChange, DEBOUNCED_CHANGE_MS);
            if (self.daysContainer && !/iPhone|iPad|iPod/i.test(navigator.userAgent))
                bind(self.daysContainer, "mouseover", function (e) {
                    if (self.config.mode === "range")
                        onMouseOver(getEventTarget(e));
                });
            bind(window.document.body, "keydown", onKeyDown);
            if (!self.config.inline && !self.config.static)
                bind(window, "resize", debouncedResize);
            if (window.ontouchstart !== undefined)
                bind(window.document, "touchstart", documentClick);
            else
                bind(window.document, "click", documentClick);
            bind(window.document, "focus", documentClick, { capture: true });
            if (self.config.clickOpens === true) {
                bind(self._input, "focus", self.open);
                bind(self._input, "click", self.open);
            }
            if (self.daysContainer !== undefined) {
                bind(self.monthNav, "click", onMonthNavClick);
                bind(self.monthNav, ["keyup", "increment"], onYearInput);
                bind(self.daysContainer, "click", selectDate);
            }
            if (self.timeContainer !== undefined &&
                self.minuteElement !== undefined &&
                self.hourElement !== undefined) {
                var selText = function (e) {
                    return getEventTarget(e).select();
                };
                bind(self.timeContainer, ["increment"], updateTime);
                bind(self.timeContainer, "blur", updateTime, { capture: true });
                bind(self.timeContainer, "click", timeIncrement);
                bind([self.hourElement, self.minuteElement], ["focus", "click"], selText);
                if (self.secondElement !== undefined)
                    bind(self.secondElement, "focus", function () { return self.secondElement && self.secondElement.select(); });
                if (self.amPM !== undefined) {
                    bind(self.amPM, "click", function (e) {
                        updateTime(e);
                        triggerChange();
                    });
                }
            }
            if (self.config.allowInput)
                bind(self._input, "blur", onBlur);
        }
        /**
         * Set the calendar view to a particular date.
         * @param {Date} jumpDate the date to set the view to
         * @param {boolean} triggerChange if change events should be triggered
         */
        function jumpToDate(jumpDate, triggerChange) {
            var jumpTo = jumpDate !== undefined
                ? self.parseDate(jumpDate)
                : self.latestSelectedDateObj ||
                    (self.config.minDate && self.config.minDate > self.now
                        ? self.config.minDate
                        : self.config.maxDate && self.config.maxDate < self.now
                            ? self.config.maxDate
                            : self.now);
            var oldYear = self.currentYear;
            var oldMonth = self.currentMonth;
            try {
                if (jumpTo !== undefined) {
                    self.currentYear = jumpTo.getFullYear();
                    self.currentMonth = jumpTo.getMonth();
                }
            }
            catch (e) {
                /* istanbul ignore next */
                e.message = "Invalid date supplied: " + jumpTo;
                self.config.errorHandler(e);
            }
            if (triggerChange && self.currentYear !== oldYear) {
                triggerEvent("onYearChange");
                buildMonthSwitch();
            }
            if (triggerChange &&
                (self.currentYear !== oldYear || self.currentMonth !== oldMonth)) {
                triggerEvent("onMonthChange");
            }
            self.redraw();
        }
        /**
         * The up/down arrow handler for time inputs
         * @param {Event} e the click event
         */
        function timeIncrement(e) {
            var eventTarget = getEventTarget(e);
            if (~eventTarget.className.indexOf("arrow"))
                incrementNumInput(e, eventTarget.classList.contains("arrowUp") ? 1 : -1);
        }
        /**
         * Increments/decrements the value of input associ-
         * ated with the up/down arrow by dispatching an
         * "increment" event on the input.
         *
         * @param {Event} e the click event
         * @param {Number} delta the diff (usually 1 or -1)
         * @param {Element} inputElem the input element
         */
        function incrementNumInput(e, delta, inputElem) {
            var target = e && getEventTarget(e);
            var input = inputElem ||
                (target && target.parentNode && target.parentNode.firstChild);
            var event = createEvent("increment");
            event.delta = delta;
            input && input.dispatchEvent(event);
        }
        function build() {
            var fragment = window.document.createDocumentFragment();
            self.calendarContainer = createElement("div", "flatpickr-calendar");
            self.calendarContainer.tabIndex = -1;
            if (!self.config.noCalendar) {
                fragment.appendChild(buildMonthNav());
                self.innerContainer = createElement("div", "flatpickr-innerContainer");
                if (self.config.weekNumbers) {
                    var _a = buildWeeks(), weekWrapper = _a.weekWrapper, weekNumbers = _a.weekNumbers;
                    self.innerContainer.appendChild(weekWrapper);
                    self.weekNumbers = weekNumbers;
                    self.weekWrapper = weekWrapper;
                }
                self.rContainer = createElement("div", "flatpickr-rContainer");
                self.rContainer.appendChild(buildWeekdays());
                if (!self.daysContainer) {
                    self.daysContainer = createElement("div", "flatpickr-days");
                    self.daysContainer.tabIndex = -1;
                }
                buildDays();
                self.rContainer.appendChild(self.daysContainer);
                self.innerContainer.appendChild(self.rContainer);
                fragment.appendChild(self.innerContainer);
            }
            if (self.config.enableTime) {
                fragment.appendChild(buildTime());
            }
            toggleClass(self.calendarContainer, "rangeMode", self.config.mode === "range");
            toggleClass(self.calendarContainer, "animate", self.config.animate === true);
            toggleClass(self.calendarContainer, "multiMonth", self.config.showMonths > 1);
            self.calendarContainer.appendChild(fragment);
            var customAppend = self.config.appendTo !== undefined &&
                self.config.appendTo.nodeType !== undefined;
            if (self.config.inline || self.config.static) {
                self.calendarContainer.classList.add(self.config.inline ? "inline" : "static");
                if (self.config.inline) {
                    if (!customAppend && self.element.parentNode)
                        self.element.parentNode.insertBefore(self.calendarContainer, self._input.nextSibling);
                    else if (self.config.appendTo !== undefined)
                        self.config.appendTo.appendChild(self.calendarContainer);
                }
                if (self.config.static) {
                    var wrapper = createElement("div", "flatpickr-wrapper");
                    if (self.element.parentNode)
                        self.element.parentNode.insertBefore(wrapper, self.element);
                    wrapper.appendChild(self.element);
                    if (self.altInput)
                        wrapper.appendChild(self.altInput);
                    wrapper.appendChild(self.calendarContainer);
                }
            }
            if (!self.config.static && !self.config.inline)
                (self.config.appendTo !== undefined
                    ? self.config.appendTo
                    : window.document.body).appendChild(self.calendarContainer);
        }
        function createDay(className, date, dayNumber, i) {
            var dateIsEnabled = isEnabled(date, true), dayElement = createElement("span", "flatpickr-day " + className, date.getDate().toString());
            dayElement.dateObj = date;
            dayElement.$i = i;
            dayElement.setAttribute("aria-label", self.formatDate(date, self.config.ariaDateFormat));
            if (className.indexOf("hidden") === -1 &&
                compareDates(date, self.now) === 0) {
                self.todayDateElem = dayElement;
                dayElement.classList.add("today");
                dayElement.setAttribute("aria-current", "date");
            }
            if (dateIsEnabled) {
                dayElement.tabIndex = -1;
                if (isDateSelected(date)) {
                    dayElement.classList.add("selected");
                    self.selectedDateElem = dayElement;
                    if (self.config.mode === "range") {
                        toggleClass(dayElement, "startRange", self.selectedDates[0] &&
                            compareDates(date, self.selectedDates[0], true) === 0);
                        toggleClass(dayElement, "endRange", self.selectedDates[1] &&
                            compareDates(date, self.selectedDates[1], true) === 0);
                        if (className === "nextMonthDay")
                            dayElement.classList.add("inRange");
                    }
                }
            }
            else {
                dayElement.classList.add("flatpickr-disabled");
            }
            if (self.config.mode === "range") {
                if (isDateInRange(date) && !isDateSelected(date))
                    dayElement.classList.add("inRange");
            }
            if (self.weekNumbers &&
                self.config.showMonths === 1 &&
                className !== "prevMonthDay" &&
                dayNumber % 7 === 1) {
                self.weekNumbers.insertAdjacentHTML("beforeend", "<span class='flatpickr-day'>" + self.config.getWeek(date) + "</span>");
            }
            triggerEvent("onDayCreate", dayElement);
            return dayElement;
        }
        function focusOnDayElem(targetNode) {
            targetNode.focus();
            if (self.config.mode === "range")
                onMouseOver(targetNode);
        }
        function getFirstAvailableDay(delta) {
            var startMonth = delta > 0 ? 0 : self.config.showMonths - 1;
            var endMonth = delta > 0 ? self.config.showMonths : -1;
            for (var m = startMonth; m != endMonth; m += delta) {
                var month = self.daysContainer.children[m];
                var startIndex = delta > 0 ? 0 : month.children.length - 1;
                var endIndex = delta > 0 ? month.children.length : -1;
                for (var i = startIndex; i != endIndex; i += delta) {
                    var c = month.children[i];
                    if (c.className.indexOf("hidden") === -1 && isEnabled(c.dateObj))
                        return c;
                }
            }
            return undefined;
        }
        function getNextAvailableDay(current, delta) {
            var givenMonth = current.className.indexOf("Month") === -1
                ? current.dateObj.getMonth()
                : self.currentMonth;
            var endMonth = delta > 0 ? self.config.showMonths : -1;
            var loopDelta = delta > 0 ? 1 : -1;
            for (var m = givenMonth - self.currentMonth; m != endMonth; m += loopDelta) {
                var month = self.daysContainer.children[m];
                var startIndex = givenMonth - self.currentMonth === m
                    ? current.$i + delta
                    : delta < 0
                        ? month.children.length - 1
                        : 0;
                var numMonthDays = month.children.length;
                for (var i = startIndex; i >= 0 && i < numMonthDays && i != (delta > 0 ? numMonthDays : -1); i += loopDelta) {
                    var c = month.children[i];
                    if (c.className.indexOf("hidden") === -1 &&
                        isEnabled(c.dateObj) &&
                        Math.abs(current.$i - i) >= Math.abs(delta))
                        return focusOnDayElem(c);
                }
            }
            self.changeMonth(loopDelta);
            focusOnDay(getFirstAvailableDay(loopDelta), 0);
            return undefined;
        }
        function focusOnDay(current, offset) {
            var dayFocused = isInView(document.activeElement || document.body);
            var startElem = current !== undefined
                ? current
                : dayFocused
                    ? document.activeElement
                    : self.selectedDateElem !== undefined && isInView(self.selectedDateElem)
                        ? self.selectedDateElem
                        : self.todayDateElem !== undefined && isInView(self.todayDateElem)
                            ? self.todayDateElem
                            : getFirstAvailableDay(offset > 0 ? 1 : -1);
            if (startElem === undefined) {
                self._input.focus();
            }
            else if (!dayFocused) {
                focusOnDayElem(startElem);
            }
            else {
                getNextAvailableDay(startElem, offset);
            }
        }
        function buildMonthDays(year, month) {
            var firstOfMonth = (new Date(year, month, 1).getDay() - self.l10n.firstDayOfWeek + 7) % 7;
            var prevMonthDays = self.utils.getDaysInMonth((month - 1 + 12) % 12, year);
            var daysInMonth = self.utils.getDaysInMonth(month, year), days = window.document.createDocumentFragment(), isMultiMonth = self.config.showMonths > 1, prevMonthDayClass = isMultiMonth ? "prevMonthDay hidden" : "prevMonthDay", nextMonthDayClass = isMultiMonth ? "nextMonthDay hidden" : "nextMonthDay";
            var dayNumber = prevMonthDays + 1 - firstOfMonth, dayIndex = 0;
            // prepend days from the ending of previous month
            for (; dayNumber <= prevMonthDays; dayNumber++, dayIndex++) {
                days.appendChild(createDay(prevMonthDayClass, new Date(year, month - 1, dayNumber), dayNumber, dayIndex));
            }
            // Start at 1 since there is no 0th day
            for (dayNumber = 1; dayNumber <= daysInMonth; dayNumber++, dayIndex++) {
                days.appendChild(createDay("", new Date(year, month, dayNumber), dayNumber, dayIndex));
            }
            // append days from the next month
            for (var dayNum = daysInMonth + 1; dayNum <= 42 - firstOfMonth &&
                (self.config.showMonths === 1 || dayIndex % 7 !== 0); dayNum++, dayIndex++) {
                days.appendChild(createDay(nextMonthDayClass, new Date(year, month + 1, dayNum % daysInMonth), dayNum, dayIndex));
            }
            //updateNavigationCurrentMonth();
            var dayContainer = createElement("div", "dayContainer");
            dayContainer.appendChild(days);
            return dayContainer;
        }
        function buildDays() {
            if (self.daysContainer === undefined) {
                return;
            }
            clearNode(self.daysContainer);
            // TODO: week numbers for each month
            if (self.weekNumbers)
                clearNode(self.weekNumbers);
            var frag = document.createDocumentFragment();
            for (var i = 0; i < self.config.showMonths; i++) {
                var d = new Date(self.currentYear, self.currentMonth, 1);
                d.setMonth(self.currentMonth + i);
                frag.appendChild(buildMonthDays(d.getFullYear(), d.getMonth()));
            }
            self.daysContainer.appendChild(frag);
            self.days = self.daysContainer.firstChild;
            if (self.config.mode === "range" && self.selectedDates.length === 1) {
                onMouseOver();
            }
        }
        function buildMonthSwitch() {
            if (self.config.showMonths > 1 ||
                self.config.monthSelectorType !== "dropdown")
                return;
            var shouldBuildMonth = function (month) {
                if (self.config.minDate !== undefined &&
                    self.currentYear === self.config.minDate.getFullYear() &&
                    month < self.config.minDate.getMonth()) {
                    return false;
                }
                return !(self.config.maxDate !== undefined &&
                    self.currentYear === self.config.maxDate.getFullYear() &&
                    month > self.config.maxDate.getMonth());
            };
            self.monthsDropdownContainer.tabIndex = -1;
            self.monthsDropdownContainer.innerHTML = "";
            for (var i = 0; i < 12; i++) {
                if (!shouldBuildMonth(i))
                    continue;
                var month = createElement("option", "flatpickr-monthDropdown-month");
                month.value = new Date(self.currentYear, i).getMonth().toString();
                month.textContent = monthToStr(i, self.config.shorthandCurrentMonth, self.l10n);
                month.tabIndex = -1;
                if (self.currentMonth === i) {
                    month.selected = true;
                }
                self.monthsDropdownContainer.appendChild(month);
            }
        }
        function buildMonth() {
            var container = createElement("div", "flatpickr-month");
            var monthNavFragment = window.document.createDocumentFragment();
            var monthElement;
            if (self.config.showMonths > 1 ||
                self.config.monthSelectorType === "static") {
                monthElement = createElement("span", "cur-month");
            }
            else {
                self.monthsDropdownContainer = createElement("select", "flatpickr-monthDropdown-months");
                self.monthsDropdownContainer.setAttribute("aria-label", self.l10n.monthAriaLabel);
                bind(self.monthsDropdownContainer, "change", function (e) {
                    var target = getEventTarget(e);
                    var selectedMonth = parseInt(target.value, 10);
                    self.changeMonth(selectedMonth - self.currentMonth);
                    triggerEvent("onMonthChange");
                });
                buildMonthSwitch();
                monthElement = self.monthsDropdownContainer;
            }
            var yearInput = createNumberInput("cur-year", { tabindex: "-1" });
            var yearElement = yearInput.getElementsByTagName("input")[0];
            yearElement.setAttribute("aria-label", self.l10n.yearAriaLabel);
            if (self.config.minDate) {
                yearElement.setAttribute("min", self.config.minDate.getFullYear().toString());
            }
            if (self.config.maxDate) {
                yearElement.setAttribute("max", self.config.maxDate.getFullYear().toString());
                yearElement.disabled =
                    !!self.config.minDate &&
                        self.config.minDate.getFullYear() === self.config.maxDate.getFullYear();
            }
            var currentMonth = createElement("div", "flatpickr-current-month");
            currentMonth.appendChild(monthElement);
            currentMonth.appendChild(yearInput);
            monthNavFragment.appendChild(currentMonth);
            container.appendChild(monthNavFragment);
            return {
                container: container,
                yearElement: yearElement,
                monthElement: monthElement,
            };
        }
        function buildMonths() {
            clearNode(self.monthNav);
            self.monthNav.appendChild(self.prevMonthNav);
            if (self.config.showMonths) {
                self.yearElements = [];
                self.monthElements = [];
            }
            for (var m = self.config.showMonths; m--;) {
                var month = buildMonth();
                self.yearElements.push(month.yearElement);
                self.monthElements.push(month.monthElement);
                self.monthNav.appendChild(month.container);
            }
            self.monthNav.appendChild(self.nextMonthNav);
        }
        function buildMonthNav() {
            self.monthNav = createElement("div", "flatpickr-months");
            self.yearElements = [];
            self.monthElements = [];
            self.prevMonthNav = createElement("span", "flatpickr-prev-month");
            self.prevMonthNav.innerHTML = self.config.prevArrow;
            self.nextMonthNav = createElement("span", "flatpickr-next-month");
            self.nextMonthNav.innerHTML = self.config.nextArrow;
            buildMonths();
            Object.defineProperty(self, "_hidePrevMonthArrow", {
                get: function () { return self.__hidePrevMonthArrow; },
                set: function (bool) {
                    if (self.__hidePrevMonthArrow !== bool) {
                        toggleClass(self.prevMonthNav, "flatpickr-disabled", bool);
                        self.__hidePrevMonthArrow = bool;
                    }
                },
            });
            Object.defineProperty(self, "_hideNextMonthArrow", {
                get: function () { return self.__hideNextMonthArrow; },
                set: function (bool) {
                    if (self.__hideNextMonthArrow !== bool) {
                        toggleClass(self.nextMonthNav, "flatpickr-disabled", bool);
                        self.__hideNextMonthArrow = bool;
                    }
                },
            });
            self.currentYearElement = self.yearElements[0];
            updateNavigationCurrentMonth();
            return self.monthNav;
        }
        function buildTime() {
            self.calendarContainer.classList.add("hasTime");
            if (self.config.noCalendar)
                self.calendarContainer.classList.add("noCalendar");
            self.timeContainer = createElement("div", "flatpickr-time");
            self.timeContainer.tabIndex = -1;
            var separator = createElement("span", "flatpickr-time-separator", ":");
            var hourInput = createNumberInput("flatpickr-hour", {
                "aria-label": self.l10n.hourAriaLabel,
            });
            self.hourElement = hourInput.getElementsByTagName("input")[0];
            var minuteInput = createNumberInput("flatpickr-minute", {
                "aria-label": self.l10n.minuteAriaLabel,
            });
            self.minuteElement = minuteInput.getElementsByTagName("input")[0];
            self.hourElement.tabIndex = self.minuteElement.tabIndex = -1;
            self.hourElement.value = pad(self.latestSelectedDateObj
                ? self.latestSelectedDateObj.getHours()
                : self.config.time_24hr
                    ? self.config.defaultHour
                    : military2ampm(self.config.defaultHour));
            self.minuteElement.value = pad(self.latestSelectedDateObj
                ? self.latestSelectedDateObj.getMinutes()
                : self.config.defaultMinute);
            self.hourElement.setAttribute("step", self.config.hourIncrement.toString());
            self.minuteElement.setAttribute("step", self.config.minuteIncrement.toString());
            self.hourElement.setAttribute("min", self.config.time_24hr ? "0" : "1");
            self.hourElement.setAttribute("max", self.config.time_24hr ? "23" : "12");
            self.minuteElement.setAttribute("min", "0");
            self.minuteElement.setAttribute("max", "59");
            self.timeContainer.appendChild(hourInput);
            self.timeContainer.appendChild(separator);
            self.timeContainer.appendChild(minuteInput);
            if (self.config.time_24hr)
                self.timeContainer.classList.add("time24hr");
            if (self.config.enableSeconds) {
                self.timeContainer.classList.add("hasSeconds");
                var secondInput = createNumberInput("flatpickr-second");
                self.secondElement = secondInput.getElementsByTagName("input")[0];
                self.secondElement.value = pad(self.latestSelectedDateObj
                    ? self.latestSelectedDateObj.getSeconds()
                    : self.config.defaultSeconds);
                self.secondElement.setAttribute("step", self.minuteElement.getAttribute("step"));
                self.secondElement.setAttribute("min", "0");
                self.secondElement.setAttribute("max", "59");
                self.timeContainer.appendChild(createElement("span", "flatpickr-time-separator", ":"));
                self.timeContainer.appendChild(secondInput);
            }
            if (!self.config.time_24hr) {
                // add self.amPM if appropriate
                self.amPM = createElement("span", "flatpickr-am-pm", self.l10n.amPM[int((self.latestSelectedDateObj
                    ? self.hourElement.value
                    : self.config.defaultHour) > 11)]);
                self.amPM.title = self.l10n.toggleTitle;
                self.amPM.tabIndex = -1;
                self.timeContainer.appendChild(self.amPM);
            }
            return self.timeContainer;
        }
        function buildWeekdays() {
            if (!self.weekdayContainer)
                self.weekdayContainer = createElement("div", "flatpickr-weekdays");
            else
                clearNode(self.weekdayContainer);
            for (var i = self.config.showMonths; i--;) {
                var container = createElement("div", "flatpickr-weekdaycontainer");
                self.weekdayContainer.appendChild(container);
            }
            updateWeekdays();
            return self.weekdayContainer;
        }
        function updateWeekdays() {
            if (!self.weekdayContainer) {
                return;
            }
            var firstDayOfWeek = self.l10n.firstDayOfWeek;
            var weekdays = __spreadArrays(self.l10n.weekdays.shorthand);
            if (firstDayOfWeek > 0 && firstDayOfWeek < weekdays.length) {
                weekdays = __spreadArrays(weekdays.splice(firstDayOfWeek, weekdays.length), weekdays.splice(0, firstDayOfWeek));
            }
            for (var i = self.config.showMonths; i--;) {
                self.weekdayContainer.children[i].innerHTML = "\n      <span class='flatpickr-weekday'>\n        " + weekdays.join("</span><span class='flatpickr-weekday'>") + "\n      </span>\n      ";
            }
        }
        /* istanbul ignore next */
        function buildWeeks() {
            self.calendarContainer.classList.add("hasWeeks");
            var weekWrapper = createElement("div", "flatpickr-weekwrapper");
            weekWrapper.appendChild(createElement("span", "flatpickr-weekday", self.l10n.weekAbbreviation));
            var weekNumbers = createElement("div", "flatpickr-weeks");
            weekWrapper.appendChild(weekNumbers);
            return {
                weekWrapper: weekWrapper,
                weekNumbers: weekNumbers,
            };
        }
        function changeMonth(value, isOffset) {
            if (isOffset === void 0) { isOffset = true; }
            var delta = isOffset ? value : value - self.currentMonth;
            if ((delta < 0 && self._hidePrevMonthArrow === true) ||
                (delta > 0 && self._hideNextMonthArrow === true))
                return;
            self.currentMonth += delta;
            if (self.currentMonth < 0 || self.currentMonth > 11) {
                self.currentYear += self.currentMonth > 11 ? 1 : -1;
                self.currentMonth = (self.currentMonth + 12) % 12;
                triggerEvent("onYearChange");
                buildMonthSwitch();
            }
            buildDays();
            triggerEvent("onMonthChange");
            updateNavigationCurrentMonth();
        }
        function clear(triggerChangeEvent, toInitial) {
            if (triggerChangeEvent === void 0) { triggerChangeEvent = true; }
            if (toInitial === void 0) { toInitial = true; }
            self.input.value = "";
            if (self.altInput !== undefined)
                self.altInput.value = "";
            if (self.mobileInput !== undefined)
                self.mobileInput.value = "";
            self.selectedDates = [];
            self.latestSelectedDateObj = undefined;
            if (toInitial === true) {
                self.currentYear = self._initialDate.getFullYear();
                self.currentMonth = self._initialDate.getMonth();
            }
            if (self.config.enableTime === true) {
                var _a = getDefaultHours(), hours = _a.hours, minutes = _a.minutes, seconds = _a.seconds;
                setHours(hours, minutes, seconds);
            }
            self.redraw();
            if (triggerChangeEvent)
                // triggerChangeEvent is true (default) or an Event
                triggerEvent("onChange");
        }
        function close() {
            self.isOpen = false;
            if (!self.isMobile) {
                if (self.calendarContainer !== undefined) {
                    self.calendarContainer.classList.remove("open");
                }
                if (self._input !== undefined) {
                    self._input.classList.remove("active");
                }
            }
            triggerEvent("onClose");
        }
        function destroy() {
            if (self.config !== undefined)
                triggerEvent("onDestroy");
            for (var i = self._handlers.length; i--;) {
                var h = self._handlers[i];
                h.element.removeEventListener(h.event, h.handler, h.options);
            }
            self._handlers = [];
            if (self.mobileInput) {
                if (self.mobileInput.parentNode)
                    self.mobileInput.parentNode.removeChild(self.mobileInput);
                self.mobileInput = undefined;
            }
            else if (self.calendarContainer && self.calendarContainer.parentNode) {
                if (self.config.static && self.calendarContainer.parentNode) {
                    var wrapper = self.calendarContainer.parentNode;
                    wrapper.lastChild && wrapper.removeChild(wrapper.lastChild);
                    if (wrapper.parentNode) {
                        while (wrapper.firstChild)
                            wrapper.parentNode.insertBefore(wrapper.firstChild, wrapper);
                        wrapper.parentNode.removeChild(wrapper);
                    }
                }
                else
                    self.calendarContainer.parentNode.removeChild(self.calendarContainer);
            }
            if (self.altInput) {
                self.input.type = "text";
                if (self.altInput.parentNode)
                    self.altInput.parentNode.removeChild(self.altInput);
                delete self.altInput;
            }
            if (self.input) {
                self.input.type = self.input._type;
                self.input.classList.remove("flatpickr-input");
                self.input.removeAttribute("readonly");
            }
            [
                "_showTimeInput",
                "latestSelectedDateObj",
                "_hideNextMonthArrow",
                "_hidePrevMonthArrow",
                "__hideNextMonthArrow",
                "__hidePrevMonthArrow",
                "isMobile",
                "isOpen",
                "selectedDateElem",
                "minDateHasTime",
                "maxDateHasTime",
                "days",
                "daysContainer",
                "_input",
                "_positionElement",
                "innerContainer",
                "rContainer",
                "monthNav",
                "todayDateElem",
                "calendarContainer",
                "weekdayContainer",
                "prevMonthNav",
                "nextMonthNav",
                "monthsDropdownContainer",
                "currentMonthElement",
                "currentYearElement",
                "navigationCurrentMonth",
                "selectedDateElem",
                "config",
            ].forEach(function (k) {
                try {
                    delete self[k];
                }
                catch (_) { }
            });
        }
        function isCalendarElem(elem) {
            if (self.config.appendTo && self.config.appendTo.contains(elem))
                return true;
            return self.calendarContainer.contains(elem);
        }
        function documentClick(e) {
            if (self.isOpen && !self.config.inline) {
                var eventTarget_1 = getEventTarget(e);
                var isCalendarElement = isCalendarElem(eventTarget_1);
                var isInput = eventTarget_1 === self.input ||
                    eventTarget_1 === self.altInput ||
                    self.element.contains(eventTarget_1) ||
                    // web components
                    // e.path is not present in all browsers. circumventing typechecks
                    (e.path &&
                        e.path.indexOf &&
                        (~e.path.indexOf(self.input) ||
                            ~e.path.indexOf(self.altInput)));
                var lostFocus = e.type === "blur"
                    ? isInput &&
                        e.relatedTarget &&
                        !isCalendarElem(e.relatedTarget)
                    : !isInput &&
                        !isCalendarElement &&
                        !isCalendarElem(e.relatedTarget);
                var isIgnored = !self.config.ignoredFocusElements.some(function (elem) {
                    return elem.contains(eventTarget_1);
                });
                if (lostFocus && isIgnored) {
                    if (self.timeContainer !== undefined &&
                        self.minuteElement !== undefined &&
                        self.hourElement !== undefined &&
                        self.input.value !== "" &&
                        self.input.value !== undefined) {
                        updateTime();
                    }
                    self.close();
                    if (self.config &&
                        self.config.mode === "range" &&
                        self.selectedDates.length === 1) {
                        self.clear(false);
                        self.redraw();
                    }
                }
            }
        }
        function changeYear(newYear) {
            if (!newYear ||
                (self.config.minDate && newYear < self.config.minDate.getFullYear()) ||
                (self.config.maxDate && newYear > self.config.maxDate.getFullYear()))
                return;
            var newYearNum = newYear, isNewYear = self.currentYear !== newYearNum;
            self.currentYear = newYearNum || self.currentYear;
            if (self.config.maxDate &&
                self.currentYear === self.config.maxDate.getFullYear()) {
                self.currentMonth = Math.min(self.config.maxDate.getMonth(), self.currentMonth);
            }
            else if (self.config.minDate &&
                self.currentYear === self.config.minDate.getFullYear()) {
                self.currentMonth = Math.max(self.config.minDate.getMonth(), self.currentMonth);
            }
            if (isNewYear) {
                self.redraw();
                triggerEvent("onYearChange");
                buildMonthSwitch();
            }
        }
        function isEnabled(date, timeless) {
            if (timeless === void 0) { timeless = true; }
            var dateToCheck = self.parseDate(date, undefined, timeless); // timeless
            if ((self.config.minDate &&
                dateToCheck &&
                compareDates(dateToCheck, self.config.minDate, timeless !== undefined ? timeless : !self.minDateHasTime) < 0) ||
                (self.config.maxDate &&
                    dateToCheck &&
                    compareDates(dateToCheck, self.config.maxDate, timeless !== undefined ? timeless : !self.maxDateHasTime) > 0))
                return false;
            if (self.config.enable.length === 0 && self.config.disable.length === 0)
                return true;
            if (dateToCheck === undefined)
                return false;
            var bool = self.config.enable.length > 0, array = bool ? self.config.enable : self.config.disable;
            for (var i = 0, d = void 0; i < array.length; i++) {
                d = array[i];
                if (typeof d === "function" &&
                    d(dateToCheck) // disabled by function
                )
                    return bool;
                else if (d instanceof Date &&
                    dateToCheck !== undefined &&
                    d.getTime() === dateToCheck.getTime())
                    // disabled by date
                    return bool;
                else if (typeof d === "string" && dateToCheck !== undefined) {
                    // disabled by date string
                    var parsed = self.parseDate(d, undefined, true);
                    return parsed && parsed.getTime() === dateToCheck.getTime()
                        ? bool
                        : !bool;
                }
                else if (
                // disabled by range
                typeof d === "object" &&
                    dateToCheck !== undefined &&
                    d.from &&
                    d.to &&
                    dateToCheck.getTime() >= d.from.getTime() &&
                    dateToCheck.getTime() <= d.to.getTime())
                    return bool;
            }
            return !bool;
        }
        function isInView(elem) {
            if (self.daysContainer !== undefined)
                return (elem.className.indexOf("hidden") === -1 &&
                    elem.className.indexOf("flatpickr-disabled") === -1 &&
                    self.daysContainer.contains(elem));
            return false;
        }
        function onBlur(e) {
            var isInput = e.target === self._input;
            if (isInput &&
                !(e.relatedTarget && isCalendarElem(e.relatedTarget))) {
                self.setDate(self._input.value, true, e.target === self.altInput
                    ? self.config.altFormat
                    : self.config.dateFormat);
            }
        }
        function onKeyDown(e) {
            // e.key                      e.keyCode
            // "Backspace"                        8
            // "Tab"                              9
            // "Enter"                           13
            // "Escape"     (IE "Esc")           27
            // "ArrowLeft"  (IE "Left")          37
            // "ArrowUp"    (IE "Up")            38
            // "ArrowRight" (IE "Right")         39
            // "ArrowDown"  (IE "Down")          40
            // "Delete"     (IE "Del")           46
            var eventTarget = getEventTarget(e);
            var isInput = self.config.wrap
                ? element.contains(eventTarget)
                : eventTarget === self._input;
            var allowInput = self.config.allowInput;
            var allowKeydown = self.isOpen && (!allowInput || !isInput);
            var allowInlineKeydown = self.config.inline && isInput && !allowInput;
            if (e.keyCode === 13 && isInput) {
                if (allowInput) {
                    self.setDate(self._input.value, true, eventTarget === self.altInput
                        ? self.config.altFormat
                        : self.config.dateFormat);
                    return eventTarget.blur();
                }
                else {
                    self.open();
                }
            }
            else if (isCalendarElem(eventTarget) ||
                allowKeydown ||
                allowInlineKeydown) {
                var isTimeObj = !!self.timeContainer &&
                    self.timeContainer.contains(eventTarget);
                switch (e.keyCode) {
                    case 13:
                        if (isTimeObj) {
                            e.preventDefault();
                            updateTime();
                            focusAndClose();
                        }
                        else
                            selectDate(e);
                        break;
                    case 27: // escape
                        e.preventDefault();
                        focusAndClose();
                        break;
                    case 8:
                    case 46:
                        if (isInput && !self.config.allowInput) {
                            e.preventDefault();
                            self.clear();
                        }
                        break;
                    case 37:
                    case 39:
                        if (!isTimeObj && !isInput) {
                            e.preventDefault();
                            if (self.daysContainer !== undefined &&
                                (allowInput === false ||
                                    (document.activeElement && isInView(document.activeElement)))) {
                                var delta_1 = e.keyCode === 39 ? 1 : -1;
                                if (!e.ctrlKey)
                                    focusOnDay(undefined, delta_1);
                                else {
                                    e.stopPropagation();
                                    changeMonth(delta_1);
                                    focusOnDay(getFirstAvailableDay(1), 0);
                                }
                            }
                        }
                        else if (self.hourElement)
                            self.hourElement.focus();
                        break;
                    case 38:
                    case 40:
                        e.preventDefault();
                        var delta = e.keyCode === 40 ? 1 : -1;
                        if ((self.daysContainer &&
                            eventTarget.$i !== undefined) ||
                            eventTarget === self.input ||
                            eventTarget === self.altInput) {
                            if (e.ctrlKey) {
                                e.stopPropagation();
                                changeYear(self.currentYear - delta);
                                focusOnDay(getFirstAvailableDay(1), 0);
                            }
                            else if (!isTimeObj)
                                focusOnDay(undefined, delta * 7);
                        }
                        else if (eventTarget === self.currentYearElement) {
                            changeYear(self.currentYear - delta);
                        }
                        else if (self.config.enableTime) {
                            if (!isTimeObj && self.hourElement)
                                self.hourElement.focus();
                            updateTime(e);
                            self._debouncedChange();
                        }
                        break;
                    case 9:
                        if (isTimeObj) {
                            var elems = [
                                self.hourElement,
                                self.minuteElement,
                                self.secondElement,
                                self.amPM,
                            ]
                                .concat(self.pluginElements)
                                .filter(function (x) { return x; });
                            var i = elems.indexOf(eventTarget);
                            if (i !== -1) {
                                var target = elems[i + (e.shiftKey ? -1 : 1)];
                                e.preventDefault();
                                (target || self._input).focus();
                            }
                        }
                        else if (!self.config.noCalendar &&
                            self.daysContainer &&
                            self.daysContainer.contains(eventTarget) &&
                            e.shiftKey) {
                            e.preventDefault();
                            self._input.focus();
                        }
                        break;
                }
            }
            if (self.amPM !== undefined && eventTarget === self.amPM) {
                switch (e.key) {
                    case self.l10n.amPM[0].charAt(0):
                    case self.l10n.amPM[0].charAt(0).toLowerCase():
                        self.amPM.textContent = self.l10n.amPM[0];
                        setHoursFromInputs();
                        updateValue();
                        break;
                    case self.l10n.amPM[1].charAt(0):
                    case self.l10n.amPM[1].charAt(0).toLowerCase():
                        self.amPM.textContent = self.l10n.amPM[1];
                        setHoursFromInputs();
                        updateValue();
                        break;
                }
            }
            if (isInput || isCalendarElem(eventTarget)) {
                triggerEvent("onKeyDown", e);
            }
        }
        function onMouseOver(elem) {
            if (self.selectedDates.length !== 1 ||
                (elem &&
                    (!elem.classList.contains("flatpickr-day") ||
                        elem.classList.contains("flatpickr-disabled"))))
                return;
            var hoverDate = elem
                ? elem.dateObj.getTime()
                : self.days.firstElementChild.dateObj.getTime(), initialDate = self.parseDate(self.selectedDates[0], undefined, true).getTime(), rangeStartDate = Math.min(hoverDate, self.selectedDates[0].getTime()), rangeEndDate = Math.max(hoverDate, self.selectedDates[0].getTime());
            var containsDisabled = false;
            var minRange = 0, maxRange = 0;
            for (var t = rangeStartDate; t < rangeEndDate; t += duration.DAY) {
                if (!isEnabled(new Date(t), true)) {
                    containsDisabled =
                        containsDisabled || (t > rangeStartDate && t < rangeEndDate);
                    if (t < initialDate && (!minRange || t > minRange))
                        minRange = t;
                    else if (t > initialDate && (!maxRange || t < maxRange))
                        maxRange = t;
                }
            }
            for (var m = 0; m < self.config.showMonths; m++) {
                var month = self.daysContainer.children[m];
                var _loop_1 = function (i, l) {
                    var dayElem = month.children[i], date = dayElem.dateObj;
                    var timestamp = date.getTime();
                    var outOfRange = (minRange > 0 && timestamp < minRange) ||
                        (maxRange > 0 && timestamp > maxRange);
                    if (outOfRange) {
                        dayElem.classList.add("notAllowed");
                        ["inRange", "startRange", "endRange"].forEach(function (c) {
                            dayElem.classList.remove(c);
                        });
                        return "continue";
                    }
                    else if (containsDisabled && !outOfRange)
                        return "continue";
                    ["startRange", "inRange", "endRange", "notAllowed"].forEach(function (c) {
                        dayElem.classList.remove(c);
                    });
                    if (elem !== undefined) {
                        elem.classList.add(hoverDate <= self.selectedDates[0].getTime()
                            ? "startRange"
                            : "endRange");
                        if (initialDate < hoverDate && timestamp === initialDate)
                            dayElem.classList.add("startRange");
                        else if (initialDate > hoverDate && timestamp === initialDate)
                            dayElem.classList.add("endRange");
                        if (timestamp >= minRange &&
                            (maxRange === 0 || timestamp <= maxRange) &&
                            isBetween(timestamp, initialDate, hoverDate))
                            dayElem.classList.add("inRange");
                    }
                };
                for (var i = 0, l = month.children.length; i < l; i++) {
                    _loop_1(i, l);
                }
            }
        }
        function onResize() {
            if (self.isOpen && !self.config.static && !self.config.inline)
                positionCalendar();
        }
        function open(e, positionElement) {
            if (positionElement === void 0) { positionElement = self._positionElement; }
            if (self.isMobile === true) {
                if (e) {
                    e.preventDefault();
                    var eventTarget = getEventTarget(e);
                    eventTarget && eventTarget.blur();
                }
                if (self.mobileInput !== undefined) {
                    self.mobileInput.focus();
                    self.mobileInput.click();
                }
                triggerEvent("onOpen");
                return;
            }
            if (self._input.disabled || self.config.inline)
                return;
            var wasOpen = self.isOpen;
            self.isOpen = true;
            if (!wasOpen) {
                self.calendarContainer.classList.add("open");
                self._input.classList.add("active");
                triggerEvent("onOpen");
                positionCalendar(positionElement);
            }
            if (self.config.enableTime === true && self.config.noCalendar === true) {
                if (self.config.allowInput === false &&
                    (e === undefined ||
                        !self.timeContainer.contains(e.relatedTarget))) {
                    setTimeout(function () { return self.hourElement.select(); }, 50);
                }
            }
        }
        function minMaxDateSetter(type) {
            return function (date) {
                var dateObj = (self.config["_" + type + "Date"] = self.parseDate(date, self.config.dateFormat));
                var inverseDateObj = self.config["_" + (type === "min" ? "max" : "min") + "Date"];
                if (dateObj !== undefined) {
                    self[type === "min" ? "minDateHasTime" : "maxDateHasTime"] =
                        dateObj.getHours() > 0 ||
                            dateObj.getMinutes() > 0 ||
                            dateObj.getSeconds() > 0;
                }
                if (self.selectedDates) {
                    self.selectedDates = self.selectedDates.filter(function (d) { return isEnabled(d); });
                    if (!self.selectedDates.length && type === "min")
                        setHoursFromDate(dateObj);
                    updateValue();
                }
                if (self.daysContainer) {
                    redraw();
                    if (dateObj !== undefined)
                        self.currentYearElement[type] = dateObj.getFullYear().toString();
                    else
                        self.currentYearElement.removeAttribute(type);
                    self.currentYearElement.disabled =
                        !!inverseDateObj &&
                            dateObj !== undefined &&
                            inverseDateObj.getFullYear() === dateObj.getFullYear();
                }
            };
        }
        function parseConfig() {
            var boolOpts = [
                "wrap",
                "weekNumbers",
                "allowInput",
                "allowInvalidPreload",
                "clickOpens",
                "time_24hr",
                "enableTime",
                "noCalendar",
                "altInput",
                "shorthandCurrentMonth",
                "inline",
                "static",
                "enableSeconds",
                "disableMobile",
            ];
            var userConfig = __assign(__assign({}, JSON.parse(JSON.stringify(element.dataset || {}))), instanceConfig);
            var formats = {};
            self.config.parseDate = userConfig.parseDate;
            self.config.formatDate = userConfig.formatDate;
            Object.defineProperty(self.config, "enable", {
                get: function () { return self.config._enable; },
                set: function (dates) {
                    self.config._enable = parseDateRules(dates);
                },
            });
            Object.defineProperty(self.config, "disable", {
                get: function () { return self.config._disable; },
                set: function (dates) {
                    self.config._disable = parseDateRules(dates);
                },
            });
            var timeMode = userConfig.mode === "time";
            if (!userConfig.dateFormat && (userConfig.enableTime || timeMode)) {
                var defaultDateFormat = flatpickr.defaultConfig.dateFormat || defaults.dateFormat;
                formats.dateFormat =
                    userConfig.noCalendar || timeMode
                        ? "H:i" + (userConfig.enableSeconds ? ":S" : "")
                        : defaultDateFormat + " H:i" + (userConfig.enableSeconds ? ":S" : "");
            }
            if (userConfig.altInput &&
                (userConfig.enableTime || timeMode) &&
                !userConfig.altFormat) {
                var defaultAltFormat = flatpickr.defaultConfig.altFormat || defaults.altFormat;
                formats.altFormat =
                    userConfig.noCalendar || timeMode
                        ? "h:i" + (userConfig.enableSeconds ? ":S K" : " K")
                        : defaultAltFormat + (" h:i" + (userConfig.enableSeconds ? ":S" : "") + " K");
            }
            Object.defineProperty(self.config, "minDate", {
                get: function () { return self.config._minDate; },
                set: minMaxDateSetter("min"),
            });
            Object.defineProperty(self.config, "maxDate", {
                get: function () { return self.config._maxDate; },
                set: minMaxDateSetter("max"),
            });
            var minMaxTimeSetter = function (type) { return function (val) {
                self.config[type === "min" ? "_minTime" : "_maxTime"] = self.parseDate(val, "H:i:S");
            }; };
            Object.defineProperty(self.config, "minTime", {
                get: function () { return self.config._minTime; },
                set: minMaxTimeSetter("min"),
            });
            Object.defineProperty(self.config, "maxTime", {
                get: function () { return self.config._maxTime; },
                set: minMaxTimeSetter("max"),
            });
            if (userConfig.mode === "time") {
                self.config.noCalendar = true;
                self.config.enableTime = true;
            }
            Object.assign(self.config, formats, userConfig);
            for (var i = 0; i < boolOpts.length; i++)
                // https://github.com/microsoft/TypeScript/issues/31663
                self.config[boolOpts[i]] =
                    self.config[boolOpts[i]] === true ||
                        self.config[boolOpts[i]] === "true";
            HOOKS.filter(function (hook) { return self.config[hook] !== undefined; }).forEach(function (hook) {
                self.config[hook] = arrayify(self.config[hook] || []).map(bindToInstance);
            });
            self.isMobile =
                !self.config.disableMobile &&
                    !self.config.inline &&
                    self.config.mode === "single" &&
                    !self.config.disable.length &&
                    !self.config.enable.length &&
                    !self.config.weekNumbers &&
                    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            for (var i = 0; i < self.config.plugins.length; i++) {
                var pluginConf = self.config.plugins[i](self) || {};
                for (var key in pluginConf) {
                    if (HOOKS.indexOf(key) > -1) {
                        self.config[key] = arrayify(pluginConf[key])
                            .map(bindToInstance)
                            .concat(self.config[key]);
                    }
                    else if (typeof userConfig[key] === "undefined")
                        self.config[key] = pluginConf[key];
                }
            }
            if (!userConfig.altInputClass) {
                self.config.altInputClass =
                    getInputElem().className + " " + self.config.altInputClass;
            }
            triggerEvent("onParseConfig");
        }
        function getInputElem() {
            return self.config.wrap
                ? element.querySelector("[data-input]")
                : element;
        }
        function setupLocale() {
            if (typeof self.config.locale !== "object" &&
                typeof flatpickr.l10ns[self.config.locale] === "undefined")
                self.config.errorHandler(new Error("flatpickr: invalid locale " + self.config.locale));
            self.l10n = __assign(__assign({}, flatpickr.l10ns.default), (typeof self.config.locale === "object"
                ? self.config.locale
                : self.config.locale !== "default"
                    ? flatpickr.l10ns[self.config.locale]
                    : undefined));
            tokenRegex.K = "(" + self.l10n.amPM[0] + "|" + self.l10n.amPM[1] + "|" + self.l10n.amPM[0].toLowerCase() + "|" + self.l10n.amPM[1].toLowerCase() + ")";
            var userConfig = __assign(__assign({}, instanceConfig), JSON.parse(JSON.stringify(element.dataset || {})));
            if (userConfig.time_24hr === undefined &&
                flatpickr.defaultConfig.time_24hr === undefined) {
                self.config.time_24hr = self.l10n.time_24hr;
            }
            self.formatDate = createDateFormatter(self);
            self.parseDate = createDateParser({ config: self.config, l10n: self.l10n });
        }
        function positionCalendar(customPositionElement) {
            if (self.calendarContainer === undefined)
                return;
            triggerEvent("onPreCalendarPosition");
            var positionElement = customPositionElement || self._positionElement;
            var calendarHeight = Array.prototype.reduce.call(self.calendarContainer.children, (function (acc, child) { return acc + child.offsetHeight; }), 0), calendarWidth = self.calendarContainer.offsetWidth, configPos = self.config.position.split(" "), configPosVertical = configPos[0], configPosHorizontal = configPos.length > 1 ? configPos[1] : null, inputBounds = positionElement.getBoundingClientRect(), distanceFromBottom = window.innerHeight - inputBounds.bottom, showOnTop = configPosVertical === "above" ||
                (configPosVertical !== "below" &&
                    distanceFromBottom < calendarHeight &&
                    inputBounds.top > calendarHeight);
            var top = window.pageYOffset +
                inputBounds.top +
                (!showOnTop ? positionElement.offsetHeight + 2 : -calendarHeight - 2);
            toggleClass(self.calendarContainer, "arrowTop", !showOnTop);
            toggleClass(self.calendarContainer, "arrowBottom", showOnTop);
            if (self.config.inline)
                return;
            var left = window.pageXOffset + inputBounds.left;
            var isCenter = false;
            var isRight = false;
            if (configPosHorizontal === "center") {
                left -= (calendarWidth - inputBounds.width) / 2;
                isCenter = true;
            }
            else if (configPosHorizontal === "right") {
                left -= calendarWidth - inputBounds.width;
                isRight = true;
            }
            toggleClass(self.calendarContainer, "arrowLeft", !isCenter && !isRight);
            toggleClass(self.calendarContainer, "arrowCenter", isCenter);
            toggleClass(self.calendarContainer, "arrowRight", isRight);
            var right = window.document.body.offsetWidth -
                (window.pageXOffset + inputBounds.right);
            var rightMost = left + calendarWidth > window.document.body.offsetWidth;
            var centerMost = right + calendarWidth > window.document.body.offsetWidth;
            toggleClass(self.calendarContainer, "rightMost", rightMost);
            if (self.config.static)
                return;
            self.calendarContainer.style.top = top + "px";
            if (!rightMost) {
                self.calendarContainer.style.left = left + "px";
                self.calendarContainer.style.right = "auto";
            }
            else if (!centerMost) {
                self.calendarContainer.style.left = "auto";
                self.calendarContainer.style.right = right + "px";
            }
            else {
                var doc = getDocumentStyleSheet();
                // some testing environments don't have css support
                if (doc === undefined)
                    return;
                var bodyWidth = window.document.body.offsetWidth;
                var centerLeft = Math.max(0, bodyWidth / 2 - calendarWidth / 2);
                var centerBefore = ".flatpickr-calendar.centerMost:before";
                var centerAfter = ".flatpickr-calendar.centerMost:after";
                var centerIndex = doc.cssRules.length;
                var centerStyle = "{left:" + inputBounds.left + "px;right:auto;}";
                toggleClass(self.calendarContainer, "rightMost", false);
                toggleClass(self.calendarContainer, "centerMost", true);
                doc.insertRule(centerBefore + "," + centerAfter + centerStyle, centerIndex);
                self.calendarContainer.style.left = centerLeft + "px";
                self.calendarContainer.style.right = "auto";
            }
        }
        function getDocumentStyleSheet() {
            var editableSheet = null;
            for (var i = 0; i < document.styleSheets.length; i++) {
                var sheet = document.styleSheets[i];
                try {
                    sheet.cssRules;
                }
                catch (err) {
                    continue;
                }
                editableSheet = sheet;
                break;
            }
            return editableSheet != null ? editableSheet : createStyleSheet();
        }
        function createStyleSheet() {
            var style = document.createElement("style");
            document.head.appendChild(style);
            return style.sheet;
        }
        function redraw() {
            if (self.config.noCalendar || self.isMobile)
                return;
            buildMonthSwitch();
            updateNavigationCurrentMonth();
            buildDays();
        }
        function focusAndClose() {
            self._input.focus();
            if (window.navigator.userAgent.indexOf("MSIE") !== -1 ||
                navigator.msMaxTouchPoints !== undefined) {
                // hack - bugs in the way IE handles focus keeps the calendar open
                setTimeout(self.close, 0);
            }
            else {
                self.close();
            }
        }
        function selectDate(e) {
            e.preventDefault();
            e.stopPropagation();
            var isSelectable = function (day) {
                return day.classList &&
                    day.classList.contains("flatpickr-day") &&
                    !day.classList.contains("flatpickr-disabled") &&
                    !day.classList.contains("notAllowed");
            };
            var t = findParent(getEventTarget(e), isSelectable);
            if (t === undefined)
                return;
            var target = t;
            var selectedDate = (self.latestSelectedDateObj = new Date(target.dateObj.getTime()));
            var shouldChangeMonth = (selectedDate.getMonth() < self.currentMonth ||
                selectedDate.getMonth() >
                    self.currentMonth + self.config.showMonths - 1) &&
                self.config.mode !== "range";
            self.selectedDateElem = target;
            if (self.config.mode === "single")
                self.selectedDates = [selectedDate];
            else if (self.config.mode === "multiple") {
                var selectedIndex = isDateSelected(selectedDate);
                if (selectedIndex)
                    self.selectedDates.splice(parseInt(selectedIndex), 1);
                else
                    self.selectedDates.push(selectedDate);
            }
            else if (self.config.mode === "range") {
                if (self.selectedDates.length === 2) {
                    self.clear(false, false);
                }
                self.latestSelectedDateObj = selectedDate;
                self.selectedDates.push(selectedDate);
                // unless selecting same date twice, sort ascendingly
                if (compareDates(selectedDate, self.selectedDates[0], true) !== 0)
                    self.selectedDates.sort(function (a, b) { return a.getTime() - b.getTime(); });
            }
            setHoursFromInputs();
            if (shouldChangeMonth) {
                var isNewYear = self.currentYear !== selectedDate.getFullYear();
                self.currentYear = selectedDate.getFullYear();
                self.currentMonth = selectedDate.getMonth();
                if (isNewYear) {
                    triggerEvent("onYearChange");
                    buildMonthSwitch();
                }
                triggerEvent("onMonthChange");
            }
            updateNavigationCurrentMonth();
            buildDays();
            updateValue();
            // maintain focus
            if (!shouldChangeMonth &&
                self.config.mode !== "range" &&
                self.config.showMonths === 1)
                focusOnDayElem(target);
            else if (self.selectedDateElem !== undefined &&
                self.hourElement === undefined) {
                self.selectedDateElem && self.selectedDateElem.focus();
            }
            if (self.hourElement !== undefined)
                self.hourElement !== undefined && self.hourElement.focus();
            if (self.config.closeOnSelect) {
                var single = self.config.mode === "single" && !self.config.enableTime;
                var range = self.config.mode === "range" &&
                    self.selectedDates.length === 2 &&
                    !self.config.enableTime;
                if (single || range) {
                    focusAndClose();
                }
            }
            triggerChange();
        }
        var CALLBACKS = {
            locale: [setupLocale, updateWeekdays],
            showMonths: [buildMonths, setCalendarWidth, buildWeekdays],
            minDate: [jumpToDate],
            maxDate: [jumpToDate],
        };
        function set(option, value) {
            if (option !== null && typeof option === "object") {
                Object.assign(self.config, option);
                for (var key in option) {
                    if (CALLBACKS[key] !== undefined)
                        CALLBACKS[key].forEach(function (x) { return x(); });
                }
            }
            else {
                self.config[option] = value;
                if (CALLBACKS[option] !== undefined)
                    CALLBACKS[option].forEach(function (x) { return x(); });
                else if (HOOKS.indexOf(option) > -1)
                    self.config[option] = arrayify(value);
            }
            self.redraw();
            updateValue(true);
        }
        function setSelectedDate(inputDate, format) {
            var dates = [];
            if (inputDate instanceof Array)
                dates = inputDate.map(function (d) { return self.parseDate(d, format); });
            else if (inputDate instanceof Date || typeof inputDate === "number")
                dates = [self.parseDate(inputDate, format)];
            else if (typeof inputDate === "string") {
                switch (self.config.mode) {
                    case "single":
                    case "time":
                        dates = [self.parseDate(inputDate, format)];
                        break;
                    case "multiple":
                        dates = inputDate
                            .split(self.config.conjunction)
                            .map(function (date) { return self.parseDate(date, format); });
                        break;
                    case "range":
                        dates = inputDate
                            .split(self.l10n.rangeSeparator)
                            .map(function (date) { return self.parseDate(date, format); });
                        break;
                }
            }
            else
                self.config.errorHandler(new Error("Invalid date supplied: " + JSON.stringify(inputDate)));
            self.selectedDates = (self.config.allowInvalidPreload
                ? dates
                : dates.filter(function (d) { return d instanceof Date && isEnabled(d, false); }));
            if (self.config.mode === "range")
                self.selectedDates.sort(function (a, b) { return a.getTime() - b.getTime(); });
        }
        function setDate(date, triggerChange, format) {
            if (triggerChange === void 0) { triggerChange = false; }
            if (format === void 0) { format = self.config.dateFormat; }
            if ((date !== 0 && !date) || (date instanceof Array && date.length === 0))
                return self.clear(triggerChange);
            setSelectedDate(date, format);
            self.latestSelectedDateObj =
                self.selectedDates[self.selectedDates.length - 1];
            self.redraw();
            jumpToDate(undefined, triggerChange);
            setHoursFromDate();
            if (self.selectedDates.length === 0) {
                self.clear(false);
            }
            updateValue(triggerChange);
            if (triggerChange)
                triggerEvent("onChange");
        }
        function parseDateRules(arr) {
            return arr
                .slice()
                .map(function (rule) {
                if (typeof rule === "string" ||
                    typeof rule === "number" ||
                    rule instanceof Date) {
                    return self.parseDate(rule, undefined, true);
                }
                else if (rule &&
                    typeof rule === "object" &&
                    rule.from &&
                    rule.to)
                    return {
                        from: self.parseDate(rule.from, undefined),
                        to: self.parseDate(rule.to, undefined),
                    };
                return rule;
            })
                .filter(function (x) { return x; }); // remove falsy values
        }
        function setupDates() {
            self.selectedDates = [];
            self.now = self.parseDate(self.config.now) || new Date();
            // Workaround IE11 setting placeholder as the input's value
            var preloadedDate = self.config.defaultDate ||
                ((self.input.nodeName === "INPUT" ||
                    self.input.nodeName === "TEXTAREA") &&
                    self.input.placeholder &&
                    self.input.value === self.input.placeholder
                    ? null
                    : self.input.value);
            if (preloadedDate)
                setSelectedDate(preloadedDate, self.config.dateFormat);
            self._initialDate =
                self.selectedDates.length > 0
                    ? self.selectedDates[0]
                    : self.config.minDate &&
                        self.config.minDate.getTime() > self.now.getTime()
                        ? self.config.minDate
                        : self.config.maxDate &&
                            self.config.maxDate.getTime() < self.now.getTime()
                            ? self.config.maxDate
                            : self.now;
            self.currentYear = self._initialDate.getFullYear();
            self.currentMonth = self._initialDate.getMonth();
            if (self.selectedDates.length > 0)
                self.latestSelectedDateObj = self.selectedDates[0];
            if (self.config.minTime !== undefined)
                self.config.minTime = self.parseDate(self.config.minTime, "H:i");
            if (self.config.maxTime !== undefined)
                self.config.maxTime = self.parseDate(self.config.maxTime, "H:i");
            self.minDateHasTime =
                !!self.config.minDate &&
                    (self.config.minDate.getHours() > 0 ||
                        self.config.minDate.getMinutes() > 0 ||
                        self.config.minDate.getSeconds() > 0);
            self.maxDateHasTime =
                !!self.config.maxDate &&
                    (self.config.maxDate.getHours() > 0 ||
                        self.config.maxDate.getMinutes() > 0 ||
                        self.config.maxDate.getSeconds() > 0);
        }
        function setupInputs() {
            self.input = getInputElem();
            /* istanbul ignore next */
            if (!self.input) {
                self.config.errorHandler(new Error("Invalid input element specified"));
                return;
            }
            // hack: store previous type to restore it after destroy()
            self.input._type = self.input.type;
            self.input.type = "text";
            self.input.classList.add("flatpickr-input");
            self._input = self.input;
            if (self.config.altInput) {
                // replicate self.element
                self.altInput = createElement(self.input.nodeName, self.config.altInputClass);
                self._input = self.altInput;
                self.altInput.placeholder = self.input.placeholder;
                self.altInput.disabled = self.input.disabled;
                self.altInput.required = self.input.required;
                self.altInput.tabIndex = self.input.tabIndex;
                self.altInput.type = "text";
                self.input.setAttribute("type", "hidden");
                if (!self.config.static && self.input.parentNode)
                    self.input.parentNode.insertBefore(self.altInput, self.input.nextSibling);
            }
            if (!self.config.allowInput)
                self._input.setAttribute("readonly", "readonly");
            self._positionElement = self.config.positionElement || self._input;
        }
        function setupMobile() {
            var inputType = self.config.enableTime
                ? self.config.noCalendar
                    ? "time"
                    : "datetime-local"
                : "date";
            self.mobileInput = createElement("input", self.input.className + " flatpickr-mobile");
            self.mobileInput.tabIndex = 1;
            self.mobileInput.type = inputType;
            self.mobileInput.disabled = self.input.disabled;
            self.mobileInput.required = self.input.required;
            self.mobileInput.placeholder = self.input.placeholder;
            self.mobileFormatStr =
                inputType === "datetime-local"
                    ? "Y-m-d\\TH:i:S"
                    : inputType === "date"
                        ? "Y-m-d"
                        : "H:i:S";
            if (self.selectedDates.length > 0) {
                self.mobileInput.defaultValue = self.mobileInput.value = self.formatDate(self.selectedDates[0], self.mobileFormatStr);
            }
            if (self.config.minDate)
                self.mobileInput.min = self.formatDate(self.config.minDate, "Y-m-d");
            if (self.config.maxDate)
                self.mobileInput.max = self.formatDate(self.config.maxDate, "Y-m-d");
            if (self.input.getAttribute("step"))
                self.mobileInput.step = String(self.input.getAttribute("step"));
            self.input.type = "hidden";
            if (self.altInput !== undefined)
                self.altInput.type = "hidden";
            try {
                if (self.input.parentNode)
                    self.input.parentNode.insertBefore(self.mobileInput, self.input.nextSibling);
            }
            catch (_a) { }
            bind(self.mobileInput, "change", function (e) {
                self.setDate(getEventTarget(e).value, false, self.mobileFormatStr);
                triggerEvent("onChange");
                triggerEvent("onClose");
            });
        }
        function toggle(e) {
            if (self.isOpen === true)
                return self.close();
            self.open(e);
        }
        function triggerEvent(event, data) {
            // If the instance has been destroyed already, all hooks have been removed
            if (self.config === undefined)
                return;
            var hooks = self.config[event];
            if (hooks !== undefined && hooks.length > 0) {
                for (var i = 0; hooks[i] && i < hooks.length; i++)
                    hooks[i](self.selectedDates, self.input.value, self, data);
            }
            if (event === "onChange") {
                self.input.dispatchEvent(createEvent("change"));
                // many front-end frameworks bind to the input event
                self.input.dispatchEvent(createEvent("input"));
            }
        }
        function createEvent(name) {
            var e = document.createEvent("Event");
            e.initEvent(name, true, true);
            return e;
        }
        function isDateSelected(date) {
            for (var i = 0; i < self.selectedDates.length; i++) {
                if (compareDates(self.selectedDates[i], date) === 0)
                    return "" + i;
            }
            return false;
        }
        function isDateInRange(date) {
            if (self.config.mode !== "range" || self.selectedDates.length < 2)
                return false;
            return (compareDates(date, self.selectedDates[0]) >= 0 &&
                compareDates(date, self.selectedDates[1]) <= 0);
        }
        function updateNavigationCurrentMonth() {
            if (self.config.noCalendar || self.isMobile || !self.monthNav)
                return;
            self.yearElements.forEach(function (yearElement, i) {
                var d = new Date(self.currentYear, self.currentMonth, 1);
                d.setMonth(self.currentMonth + i);
                if (self.config.showMonths > 1 ||
                    self.config.monthSelectorType === "static") {
                    self.monthElements[i].textContent =
                        monthToStr(d.getMonth(), self.config.shorthandCurrentMonth, self.l10n) + " ";
                }
                else {
                    self.monthsDropdownContainer.value = d.getMonth().toString();
                }
                yearElement.value = d.getFullYear().toString();
            });
            self._hidePrevMonthArrow =
                self.config.minDate !== undefined &&
                    (self.currentYear === self.config.minDate.getFullYear()
                        ? self.currentMonth <= self.config.minDate.getMonth()
                        : self.currentYear < self.config.minDate.getFullYear());
            self._hideNextMonthArrow =
                self.config.maxDate !== undefined &&
                    (self.currentYear === self.config.maxDate.getFullYear()
                        ? self.currentMonth + 1 > self.config.maxDate.getMonth()
                        : self.currentYear > self.config.maxDate.getFullYear());
        }
        function getDateStr(format) {
            return self.selectedDates
                .map(function (dObj) { return self.formatDate(dObj, format); })
                .filter(function (d, i, arr) {
                return self.config.mode !== "range" ||
                    self.config.enableTime ||
                    arr.indexOf(d) === i;
            })
                .join(self.config.mode !== "range"
                ? self.config.conjunction
                : self.l10n.rangeSeparator);
        }
        /**
         * Updates the values of inputs associated with the calendar
         */
        function updateValue(triggerChange) {
            if (triggerChange === void 0) { triggerChange = true; }
            if (self.mobileInput !== undefined && self.mobileFormatStr) {
                self.mobileInput.value =
                    self.latestSelectedDateObj !== undefined
                        ? self.formatDate(self.latestSelectedDateObj, self.mobileFormatStr)
                        : "";
            }
            self.input.value = getDateStr(self.config.dateFormat);
            if (self.altInput !== undefined) {
                self.altInput.value = getDateStr(self.config.altFormat);
            }
            if (triggerChange !== false)
                triggerEvent("onValueUpdate");
        }
        function onMonthNavClick(e) {
            var eventTarget = getEventTarget(e);
            var isPrevMonth = self.prevMonthNav.contains(eventTarget);
            var isNextMonth = self.nextMonthNav.contains(eventTarget);
            if (isPrevMonth || isNextMonth) {
                changeMonth(isPrevMonth ? -1 : 1);
            }
            else if (self.yearElements.indexOf(eventTarget) >= 0) {
                eventTarget.select();
            }
            else if (eventTarget.classList.contains("arrowUp")) {
                self.changeYear(self.currentYear + 1);
            }
            else if (eventTarget.classList.contains("arrowDown")) {
                self.changeYear(self.currentYear - 1);
            }
        }
        function timeWrapper(e) {
            e.preventDefault();
            var isKeyDown = e.type === "keydown", eventTarget = getEventTarget(e), input = eventTarget;
            if (self.amPM !== undefined && eventTarget === self.amPM) {
                self.amPM.textContent =
                    self.l10n.amPM[int(self.amPM.textContent === self.l10n.amPM[0])];
            }
            var min = parseFloat(input.getAttribute("min")), max = parseFloat(input.getAttribute("max")), step = parseFloat(input.getAttribute("step")), curValue = parseInt(input.value, 10), delta = e.delta ||
                (isKeyDown ? (e.which === 38 ? 1 : -1) : 0);
            var newValue = curValue + step * delta;
            if (typeof input.value !== "undefined" && input.value.length === 2) {
                var isHourElem = input === self.hourElement, isMinuteElem = input === self.minuteElement;
                if (newValue < min) {
                    newValue =
                        max +
                            newValue +
                            int(!isHourElem) +
                            (int(isHourElem) && int(!self.amPM));
                    if (isMinuteElem)
                        incrementNumInput(undefined, -1, self.hourElement);
                }
                else if (newValue > max) {
                    newValue =
                        input === self.hourElement ? newValue - max - int(!self.amPM) : min;
                    if (isMinuteElem)
                        incrementNumInput(undefined, 1, self.hourElement);
                }
                if (self.amPM &&
                    isHourElem &&
                    (step === 1
                        ? newValue + curValue === 23
                        : Math.abs(newValue - curValue) > step)) {
                    self.amPM.textContent =
                        self.l10n.amPM[int(self.amPM.textContent === self.l10n.amPM[0])];
                }
                input.value = pad(newValue);
            }
        }
        init();
        return self;
    }
    /* istanbul ignore next */
    function _flatpickr(nodeList, config) {
        // static list
        var nodes = Array.prototype.slice
            .call(nodeList)
            .filter(function (x) { return x instanceof HTMLElement; });
        var instances = [];
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            try {
                if (node.getAttribute("data-fp-omit") !== null)
                    continue;
                if (node._flatpickr !== undefined) {
                    node._flatpickr.destroy();
                    node._flatpickr = undefined;
                }
                node._flatpickr = FlatpickrInstance(node, config || {});
                instances.push(node._flatpickr);
            }
            catch (e) {
                console.error(e);
            }
        }
        return instances.length === 1 ? instances[0] : instances;
    }
    /* istanbul ignore next */
    if (typeof HTMLElement !== "undefined" &&
        typeof HTMLCollection !== "undefined" &&
        typeof NodeList !== "undefined") {
        // browser env
        HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr = function (config) {
            return _flatpickr(this, config);
        };
        HTMLElement.prototype.flatpickr = function (config) {
            return _flatpickr([this], config);
        };
    }
    /* istanbul ignore next */
    var flatpickr = function (selector, config) {
        if (typeof selector === "string") {
            return _flatpickr(window.document.querySelectorAll(selector), config);
        }
        else if (selector instanceof Node) {
            return _flatpickr([selector], config);
        }
        else {
            return _flatpickr(selector, config);
        }
    };
    /* istanbul ignore next */
    flatpickr.defaultConfig = {};
    flatpickr.l10ns = {
        en: __assign({}, english),
        default: __assign({}, english),
    };
    flatpickr.localize = function (l10n) {
        flatpickr.l10ns.default = __assign(__assign({}, flatpickr.l10ns.default), l10n);
    };
    flatpickr.setDefaults = function (config) {
        flatpickr.defaultConfig = __assign(__assign({}, flatpickr.defaultConfig), config);
    };
    flatpickr.parseDate = createDateParser({});
    flatpickr.formatDate = createDateFormatter({});
    flatpickr.compareDates = compareDates;
    /* istanbul ignore next */
    if (typeof jQuery !== "undefined" && typeof jQuery.fn !== "undefined") {
        jQuery.fn.flatpickr = function (config) {
            return _flatpickr(this, config);
        };
    }
    // eslint-disable-next-line @typescript-eslint/camelcase
    Date.prototype.fp_incr = function (days) {
        return new Date(this.getFullYear(), this.getMonth(), this.getDate() + (typeof days === "string" ? parseInt(days, 10) : days));
    };
    if (typeof window !== "undefined") {
        window.flatpickr = flatpickr;
    }

    return flatpickr;

})));
});

var build = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(React__default);

var _propTypes = _interopRequireDefault(PropTypes);

var _flatpickr = _interopRequireDefault(flatpickr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var hooks = ['onChange', 'onOpen', 'onClose', 'onMonthChange', 'onYearChange', 'onReady', 'onValueUpdate', 'onDayCreate'];

var hookPropType = _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].arrayOf(_propTypes["default"].func)]);

var callbacks = ['onCreate', 'onDestroy'];
var callbackPropTypes = _propTypes["default"].func;

var DateTimePicker = /*#__PURE__*/function (_Component) {
  _inherits(DateTimePicker, _Component);

  var _super = _createSuper(DateTimePicker);

  function DateTimePicker() {
    var _this;

    _classCallCheck(this, DateTimePicker);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "createFlatpickrInstance", function () {
      var options = _objectSpread({
        onClose: function onClose() {
          _this.node.blur && _this.node.blur();
        }
      }, _this.props.options); // Add prop hooks to options


      hooks.forEach(function (hook) {
        if (_this.props[hook]) {
          options[hook] = _this.props[hook];
        }
      });
      _this.flatpickr = (0, _flatpickr["default"])(_this.node, options);

      if (_this.props.hasOwnProperty('value')) {
        _this.flatpickr.setDate(_this.props.value, false);
      }

      var onCreate = _this.props.onCreate;
      if (onCreate) onCreate(_this.flatpickr);
    });

    _defineProperty(_assertThisInitialized(_this), "destroyFlatpickrInstance", function () {
      var onDestroy = _this.props.onDestroy;
      if (onDestroy) onDestroy(_this.flatpickr);

      _this.flatpickr.destroy();

      _this.flatpickr = null;
    });

    _defineProperty(_assertThisInitialized(_this), "handleNodeChange", function (node) {
      _this.node = node;

      if (_this.flatpickr) {
        _this.destroyFlatpickrInstance();

        _this.createFlatpickrInstance();
      }
    });

    return _this;
  }

  _createClass(DateTimePicker, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this2 = this;

      var options = this.props.options;
      var prevOptions = prevProps.options;
      hooks.forEach(function (hook) {
        if (_this2.props.hasOwnProperty(hook)) {
          options[hook] = _this2.props[hook];
        } // Add prev ones too so we can compare against them later


        if (prevProps.hasOwnProperty(hook)) {
          prevOptions[hook] = prevProps[hook];
        }
      });
      var optionsKeys = Object.getOwnPropertyNames(options);

      for (var index = optionsKeys.length - 1; index >= 0; index--) {
        var key = optionsKeys[index];
        var value = options[key];

        if (value !== prevOptions[key]) {
          // Hook handlers must be set as an array
          if (hooks.indexOf(key) !== -1 && !Array.isArray(value)) {
            value = [value];
          }

          this.flatpickr.set(key, value);
        }
      }

      if (this.props.hasOwnProperty('value') && this.props.value !== prevProps.value) {
        this.flatpickr.setDate(this.props.value, false);
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.createFlatpickrInstance();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.destroyFlatpickrInstance();
    }
  }, {
    key: "render",
    value: function render() {
      // eslint-disable-next-line no-unused-vars
      var _this$props = this.props,
          options = _this$props.options,
          defaultValue = _this$props.defaultValue,
          value = _this$props.value,
          children = _this$props.children,
          render = _this$props.render,
          props = _objectWithoutProperties(_this$props, ["options", "defaultValue", "value", "children", "render"]); // Don't pass hooks and callbacks to dom node


      hooks.forEach(function (hook) {
        delete props[hook];
      });
      callbacks.forEach(function (callback) {
        delete props[callback];
      });
      if (render) return render(_objectSpread(_objectSpread({}, props), {}, {
        defaultValue: defaultValue,
        value: value
      }), this.handleNodeChange);
      return options.wrap ? /*#__PURE__*/_react["default"].createElement("div", _extends({}, props, {
        ref: this.handleNodeChange
      }), children) : /*#__PURE__*/_react["default"].createElement("input", _extends({}, props, {
        defaultValue: defaultValue,
        ref: this.handleNodeChange
      }));
    }
  }]);

  return DateTimePicker;
}(_react.Component);

_defineProperty(DateTimePicker, "propTypes", {
  defaultValue: _propTypes["default"].string,
  options: _propTypes["default"].object,
  onChange: hookPropType,
  onOpen: hookPropType,
  onClose: hookPropType,
  onMonthChange: hookPropType,
  onYearChange: hookPropType,
  onReady: hookPropType,
  onValueUpdate: hookPropType,
  onDayCreate: hookPropType,
  onCreate: callbackPropTypes,
  onDestroy: callbackPropTypes,
  value: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].array, _propTypes["default"].object, _propTypes["default"].number]),
  children: _propTypes["default"].node,
  className: _propTypes["default"].string,
  render: _propTypes["default"].func
});

_defineProperty(DateTimePicker, "defaultProps", {
  options: {}
});

var _default = DateTimePicker;
exports["default"] = _default;
});

var Flatpickr = unwrapExports(build);

var DatePicker = function DatePicker(props) {
  return /*#__PURE__*/React__default.createElement(Flatpickr, props);
};

var Radio = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Radio, _React$Component);

  function Radio() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Radio.prototype;

  _proto.render = function render() {
    return /*#__PURE__*/React__default.createElement("div", {
      className: classnames("vx-radio-con " + this.props.className + " vx-radio-" + this.props.color)
    }, /*#__PURE__*/React__default.createElement("input", {
      type: "radio",
      defaultChecked: this.props.defaultChecked,
      value: this.props.value,
      disabled: this.props.disabled,
      name: this.props.name,
      onClick: this.props.onClick,
      onChange: this.props.onChange,
      ref: this.props.ref,
      checked: this.props.checked
    }), /*#__PURE__*/React__default.createElement("span", {
      className: classnames("vx-radio", {
        "vx-radio-sm": this.props.size === "sm",
        "vx-radio-lg": this.props.size === "lg"
      })
    }, /*#__PURE__*/React__default.createElement("span", {
      className: "vx-radio--border"
    }), /*#__PURE__*/React__default.createElement("span", {
      className: "vx-radio--circle"
    })), /*#__PURE__*/React__default.createElement("span", null, this.props.label));
  };

  return Radio;
}(React__default.Component);

var AccountInfo = function AccountInfo() {
  return /*#__PURE__*/React__default.createElement(reactstrap.Card, null, /*#__PURE__*/React__default.createElement(reactstrap.CardBody, null, /*#__PURE__*/React__default.createElement(reactstrap.Media, null, /*#__PURE__*/React__default.createElement(reactstrap.Media, {
    className: "mr-1",
    left: true,
    href: "#"
  }, /*#__PURE__*/React__default.createElement(reactstrap.Media, {
    className: "rounded-circle",
    object: true,
    src: 'https://storage.live.com/Users/-6155523327610065665/MyProfile/ExpressionProfile/ProfilePhoto:Win8Static,UserTileMedium,UserTileStatic',
    alt: "User",
    height: "64",
    width: "64"
  })), /*#__PURE__*/React__default.createElement(reactstrap.Media, {
    className: "mt-25",
    body: true
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "d-flex flex-sm-row flex-column justify-content-start px-0"
  }, /*#__PURE__*/React__default.createElement(reactstrap.Button, {
    tag: "label",
    className: "mr-50 cursor-pointer",
    color: "primary",
    outline: true
  }, "Upload Photo", /*#__PURE__*/React__default.createElement(reactstrap.Input, {
    type: "file",
    name: "file",
    id: "uploadImg",
    hidden: true
  })), /*#__PURE__*/React__default.createElement(reactstrap.Button, {
    color: "flat-danger"
  }, "Remove")), /*#__PURE__*/React__default.createElement("p", {
    className: "text-muted mt-50"
  }, /*#__PURE__*/React__default.createElement("small", null, "Allowed JPG, GIF or PNG. Max size of 800kB")))), /*#__PURE__*/React__default.createElement(reactstrap.Form, {
    className: "mt-2",
    onSubmit: function onSubmit(e) {
      return e.preventDefault();
    }
  }, /*#__PURE__*/React__default.createElement(reactstrap.Row, null, /*#__PURE__*/React__default.createElement(reactstrap.Col, {
    sm: "12"
  }, /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, null, /*#__PURE__*/React__default.createElement(reactstrap.Label, {
    "for": "userName"
  }, "Username"), /*#__PURE__*/React__default.createElement(reactstrap.Input, {
    id: "userName",
    defaultValue: "johny_01"
  }))), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
    sm: "12"
  }, /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, null, /*#__PURE__*/React__default.createElement(reactstrap.Label, {
    "for": "name"
  }, "Name"), /*#__PURE__*/React__default.createElement(reactstrap.Input, {
    id: "name",
    defaultValue: "John Doe"
  }))), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
    sm: "12"
  }, /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, null, /*#__PURE__*/React__default.createElement("div", {
    className: "d-inline-block mr-1"
  }, /*#__PURE__*/React__default.createElement(Radio, {
    label: "Male",
    defaultChecked: true,
    name: "gender"
  })), /*#__PURE__*/React__default.createElement("div", {
    className: "d-inline-block mr-1"
  }, /*#__PURE__*/React__default.createElement(Radio, {
    label: "Female",
    defaultChecked: false,
    name: "gender"
  })), /*#__PURE__*/React__default.createElement("div", {
    className: "d-inline-block"
  }, /*#__PURE__*/React__default.createElement(Radio, {
    label: "Other",
    defaultChecked: false,
    name: "gender"
  })))), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
    sm: "12"
  }, /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, null, /*#__PURE__*/React__default.createElement(reactstrap.Label, {
    className: "d-block",
    "for": "date"
  }, "Date"), /*#__PURE__*/React__default.createElement(DatePicker, {
    className: "form-control",
    value: new Date(),
    options: {
      dateFormat: 'M \\ d \\, Y'
    }
  }))), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
    sm: "12"
  }, /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, null, /*#__PURE__*/React__default.createElement(reactstrap.Label, {
    "for": "email"
  }, "Email"), /*#__PURE__*/React__default.createElement(reactstrap.Input, {
    id: "email",
    defaultValue: "john@admin.com"
  }))), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
    sm: "12"
  }, /*#__PURE__*/React__default.createElement(reactstrap.Alert, {
    className: "mb-2",
    color: "warning",
    isOpen: false,
    toggle: false
  }, /*#__PURE__*/React__default.createElement("p", {
    className: "mb-0"
  }, "Your email is not confirmed. Please check your inbox.", /*#__PURE__*/React__default.createElement("span", {
    className: "text-primary"
  }, " Resend Confirmation")))), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
    sm: "12"
  }, /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, null, /*#__PURE__*/React__default.createElement(reactstrap.Label, {
    "for": "company"
  }, "Company"), /*#__PURE__*/React__default.createElement(reactstrap.Input, {
    id: "company",
    defaultValue: "SnowMash Technologies Pvt Ltd"
  }))), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
    className: "d-flex justify-content-start flex-wrap",
    sm: "12"
  }, /*#__PURE__*/React__default.createElement(reactRouterDom.Link, {
    to: "/"
  }, /*#__PURE__*/React__default.createElement(reactstrap.Button, {
    className: "mr-50",
    type: "submit",
    color: "danger"
  }, "Cancel")), /*#__PURE__*/React__default.createElement(reactstrap.Button, {
    type: "submit",
    color: "primary"
  }, "Save Changes"))))));
};

var formSchema = Yup.object().shape({
  oldpass: Yup.string().required('Required'),
  newpass: Yup.string().required('Required'),
  confirmpass: Yup.string().oneOf([Yup.ref('newpass'), null], function () {
    return /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "changePassword.passwordMustMatch"
    });
  }).required('Required')
});

var ChangePassword = function ChangePassword() {
  return /*#__PURE__*/React__default.createElement(reactstrap.Card, null, /*#__PURE__*/React__default.createElement(reactstrap.CardBody, null, /*#__PURE__*/React__default.createElement(reactstrap.Row, {
    className: "pt-1"
  }, /*#__PURE__*/React__default.createElement(reactstrap.Col, {
    sm: "12"
  }, /*#__PURE__*/React__default.createElement(formik.Formik, {
    initialValues: {
      oldpass: '',
      newpass: '',
      confirmpass: ''
    },
    validationSchema: formSchema
  }, function (_ref) {
    var errors = _ref.errors,
        touched = _ref.touched;
    return /*#__PURE__*/React__default.createElement(reactstrap.Form, {
      className: "mt-2",
      onSubmit: function onSubmit(e) {
        return e.preventDefault();
      }
    }, /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, null, /*#__PURE__*/React__default.createElement(formik.Field, {
      name: "oldpass",
      id: "oldpass",
      className: "form-control " + (errors.oldpass && touched.oldpass && 'is-invalid'),
      placeholder: "Old Password"
    }), errors.oldpass && touched.oldpass ? /*#__PURE__*/React__default.createElement("div", {
      className: "text-danger"
    }, errors.oldpass) : null), /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, null, /*#__PURE__*/React__default.createElement(formik.Field, {
      name: "newpass",
      placeholder: "New Password",
      id: "newpass",
      className: "form-control " + (errors.newpass && touched.newpass && 'is-invalid')
    }), errors.newpass && touched.newpass ? /*#__PURE__*/React__default.createElement("div", {
      className: "text-danger"
    }, errors.newpass) : null), /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, null, /*#__PURE__*/React__default.createElement(formik.Field, {
      name: "confirmpass",
      id: "confirmpass",
      className: "form-control " + (errors.confirmpass && touched.confirmpass && 'is-invalid'),
      placeholder: "Confirm Password"
    }), errors.confirmpass && touched.confirmpass ? /*#__PURE__*/React__default.createElement("div", {
      className: "text-danger"
    }, errors.confirmpass) : null), /*#__PURE__*/React__default.createElement("div", {
      className: "d-flex justify-content-start flex-wrap"
    }, /*#__PURE__*/React__default.createElement(reactRouterDom.Link, null, /*#__PURE__*/React__default.createElement(reactstrap.Button, {
      className: "mb-1 mr-1 ",
      color: "danger",
      type: "reset",
      outline: true
    }, "Cancel")), /*#__PURE__*/React__default.createElement(reactstrap.Button, {
      className: "mb-1",
      color: "primary",
      type: "submit"
    }, "Save Changes")));
  })))));
};

var AppRouter = function AppRouter(_ref) {
  var checkLoginStatus = _ref.checkLoginStatus,
      appId = _ref.appId,
      isAuthentication = _ref.isAuthentication,
      loginAction = _ref.loginAction,
      authToken = _ref.authToken,
      children = _ref.children,
      navigationConfig = _ref.navigationConfig,
      message = _ref.message;
  React.useEffect(function () {
    var code = new URLSearchParams(document.location.search).get('code');
    checkLoginStatus(code || authToken);
  }, []);

  var setMessages = function setMessages(message) {
    if (message === void 0) {
      message = {};
    }

    var newMessage = {};
    Object.keys(message).forEach(function (key) {
      newMessage[appId + '.' + key] = message[key];
    });
    return newMessage;
  };

  var appMessage = {
    en: _extends({}, messages_en, setMessages(message.en)),
    vi: _extends({}, messages_vi, setMessages(message.vi))
  };
  var navConfigs = navigationConfig || getNativgationConfig(appId);
  return /*#__PURE__*/React__default.createElement(IntlProviderWrapper, {
    appMessage: appMessage
  }, /*#__PURE__*/React__default.createElement(reactRouterDom.Router, {
    history: history
  }, /*#__PURE__*/React__default.createElement(reactRouterDom.Switch, null, /*#__PURE__*/React__default.createElement(reactRouterDom.Route, {
    path: "/",
    render: function render(props) {
      return isAuthentication ? /*#__PURE__*/React__default.createElement(Layout$1, _extends({
        navigationConfig: navConfigs
      }, props), /*#__PURE__*/React__default.createElement(reactRouterDom.Switch, null, /*#__PURE__*/React__default.createElement(reactRouterDom.Route, {
        path: "/account-information",
        component: AccountInfo
      }), /*#__PURE__*/React__default.createElement(reactRouterDom.Route, {
        path: "/change-password",
        component: ChangePassword
      }), /*#__PURE__*/React__default.createElement(reactRouterDom.Route, {
        path: "/",
        render: function render() {
          return children;
        }
      }))) : /*#__PURE__*/React__default.createElement(FullPageLayout, null, /*#__PURE__*/React__default.createElement(Login, {
        loginAction: loginAction
      }));
    }
  }))));
};

var mapStateToProps$3 = function mapStateToProps(state) {
  return {
    isAuthentication: !!state.auth.username,
    authToken: state.auth.authToken
  };
};

var AppRouter$1 = reactRedux.connect(mapStateToProps$3, {
  checkLoginStatus: checkLoginStatus,
  loginAction: loginAction
})(AppRouter);

TopBarProgress.config({
  shadowBlur: 5,
  barThickness: 5
});

var LoadingSpinner = function LoadingSpinner(_ref) {
  var showLoadingBar = _ref.showLoadingBar;
  return showLoadingBar ? /*#__PURE__*/React__default.createElement(TopBarProgress, null) : null;
};

var mapStateToProps$4 = function mapStateToProps(state) {
  return {
    showLoadingBar: state.customizer.showLoadingBar
  };
};

var LoadingSpinner$1 = reactRedux.connect(mapStateToProps$4)(LoadingSpinner);

var isLocalhost = Boolean(window.location.hostname === 'localhost' || window.location.hostname === '[::1]' || window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));

function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(function (registration) {
      registration.unregister();
    });
  }
}

var App = function App(_ref) {
  var children = _ref.children,
      appId = _ref.appId,
      appReducer = _ref.appReducer,
      message = _ref.message,
      navigationConfig = _ref.navigationConfig;
  var middlewares = [thunk, createDebounce()];
  var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux.compose;
  var store = redux.createStore(rootReducer(appReducer), {}, composeEnhancers(redux.applyMiddleware.apply(void 0, middlewares)));
  var persistor = reduxPersist.persistStore(store);
  setUpHttpClient(store);
  return /*#__PURE__*/React__default.createElement(reactRedux.Provider, {
    store: store
  }, /*#__PURE__*/React__default.createElement(react.PersistGate, {
    loading: null,
    persistor: persistor
  }, /*#__PURE__*/React__default.createElement(LoadingSpinner$1, null), /*#__PURE__*/React__default.createElement(AppRouter$1, {
    message: message,
    appId: appId,
    navigationConfig: navigationConfig,
    children: children
  }), /*#__PURE__*/React__default.createElement(reactToastify.ToastContainer, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true
  })));
};

unregister();

var FallbackSpinner = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(FallbackSpinner, _React$Component);

  function FallbackSpinner() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = FallbackSpinner.prototype;

  _proto.render = function render() {
    return /*#__PURE__*/React__default.createElement("div", {
      className: "fallback-spinner vh-100"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "loading"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "effect-1 effects"
    }), /*#__PURE__*/React__default.createElement("div", {
      className: "effect-2 effects"
    }), /*#__PURE__*/React__default.createElement("div", {
      className: "effect-3 effects"
    })));
  };

  return FallbackSpinner;
}(React__default.Component);

function getWindowDimensions() {
  var _window = window,
      width = _window.innerWidth,
      height = _window.innerHeight;
  return {
    width: width,
    height: height
  };
}

function useWindowDimensions() {
  var _useState = React.useState(getWindowDimensions()),
      windowDimensions = _useState[0],
      setWindowDimensions = _useState[1];

  React.useEffect(function () {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return function () {
      return window.removeEventListener('resize', handleResize);
    };
  }, []);
  return windowDimensions;
}

Object.defineProperty(exports, 'FormattedMessage', {
  enumerable: true,
  get: function () {
    return reactIntl.FormattedMessage;
  }
});
exports.AppId = AppId;
exports.BaseApp = App;
exports.DatePicker = DatePicker;
exports.FallbackSpinner = FallbackSpinner;
exports.HttpClient = HttpClient;
exports.Radio = Radio;
exports.useDeviceDetect = useDeviceDetect;
exports.useWindowDimensions = useWindowDimensions;
//# sourceMappingURL=index.js.map
