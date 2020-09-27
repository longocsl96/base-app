import React from 'react'
import themeConfig from '../configs/themeConfig'
import classnames from 'classnames'

const FullPageLayout = ({ children, ...rest }) => {
  return (
    <div
      style={{
        background:
          'url("https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/demo-1/static/media/vuesax-login-bg.eb4e894d.jpg")'
      }}
      className={classnames(
        'full-layout wrapper bg-full-screen-image blank-page dark-layout',
        {
          'layout-dark': themeConfig.layoutDark
        }
      )}
    >
      <div className='app-content'>
        <div className='content-wrapper'>
          <div className='content-body'>
            <div className='flexbox-container'>
              <main className='main w-100'>{children}</main>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FullPageLayout
