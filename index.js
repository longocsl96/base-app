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
          }

          history.push('/');
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
      return link + "/?code=" + _this.props.currentUser.authToken;
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
      locale: "en",
      messages: _this.props.appMessage["en"]
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
      defaultLocale: "en"
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
      return handleNavigation(e, '/pages/profile');
    }
  }, /*#__PURE__*/React__default.createElement(Icon.User, {
    size: 14,
    className: "mr-50"
  }), /*#__PURE__*/React__default.createElement("span", {
    className: "align-middle"
  }, "Edit Profile")), /*#__PURE__*/React__default.createElement(reactstrap.DropdownItem, {
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
    "class": "tab-link"
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
  navLink: 'http://localhost:3001'
}];

var getNativgationConfig = function getNativgationConfig(appId) {
  return navigationConfig.map(function (item) {
    item.type = item.id === appId ? 'item' : 'external-link';
    return item;
  });
};

var AppRouter = function AppRouter(_ref) {
  var _extends2, _extends3;

  var checkLoginStatus = _ref.checkLoginStatus,
      appId = _ref.appId,
      isAuthentication = _ref.isAuthentication,
      loginAction = _ref.loginAction,
      authToken = _ref.authToken,
      children = _ref.children,
      message = _ref.message;
  React.useEffect(function () {
    var code = new URLSearchParams(document.location.search).get('code');
    checkLoginStatus(code || authToken);
  }, []);
  var appMessage = {
    en: _extends({}, messages_en, (_extends2 = {}, _extends2[appId] = _extends({}, message.en), _extends2)),
    vi: _extends({}, messages_vi, (_extends3 = {}, _extends3[appId] = _extends({}, message.vi), _extends3))
  };
  return /*#__PURE__*/React__default.createElement(IntlProviderWrapper, {
    appMessage: appMessage
  }, /*#__PURE__*/React__default.createElement(reactRouterDom.Router, {
    history: history
  }, /*#__PURE__*/React__default.createElement(reactRouterDom.Switch, null, /*#__PURE__*/React__default.createElement(reactRouterDom.Route, {
    path: "/",
    render: function render(props) {
      return isAuthentication ? /*#__PURE__*/React__default.createElement(Layout$1, _extends({
        navigationConfig: getNativgationConfig(appId)
      }, props), children) : /*#__PURE__*/React__default.createElement(FullPageLayout, null, /*#__PURE__*/React__default.createElement(Login, {
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

var App = function App(_ref) {
  var children = _ref.children,
      appId = _ref.appId,
      appReducer = _ref.appReducer,
      message = _ref.message;
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
    children: children
  }), /*#__PURE__*/React__default.createElement(reactToastify.ToastContainer, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true
  })));
};

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
exports.FallbackSpinner = FallbackSpinner;
exports.HttpClient = HttpClient;
exports.useDeviceDetect = useDeviceDetect;
exports.useWindowDimensions = useWindowDimensions;
//# sourceMappingURL=index.js.map
