import React from 'react'
import ScrollToTop from 'react-scroll-up'
import { Button } from 'reactstrap'
import * as Icon from 'react-feather'
import classnames from 'classnames'
import useDeviceDetect from '../../../customHooks/useDeviceDetect'

const Footer = (props) => {
  const { isMobile } = useDeviceDetect()
  return (
    <footer>
      <div
        className={classnames('footer footer-light', {
          'd-none': isMobile
        })}
      >
        <p className='mb-0 clearfix'>
          <span className='float-md-left d-block d-md-inline-block mt-25'>
            COPYRIGHT © {new Date().getFullYear()}
            <a
              href='https://themeforest.net/user/pixinvent/portfolio?ref=pixinvent'
              target='_blank'
              rel='noopener noreferrer'
            >
              Pixinvent,
            </a>
            All rights reserved
          </span>
          <span className='float-md-right d-none d-md-block'>
            <span className='align-middle'>Hand-crafted & Made with</span>{' '}
            <Icon.Heart className='text-danger' size={15} />
          </span>
        </p>
      </div>
      <div
        className={classnames('footer footer-light footer-mobile', {
          'd-none': !isMobile
        })}
      >
        <div>
          <a className='tab-link' href='#'>
            <Icon.Home />
          </a>
        </div>
        <div>
          <a className='tab-link' href='#'>
            <Icon.List />
          </a>
        </div>
        <div>
          <a className='tab-link' href='#'>
            <Icon.PlusCircle />
          </a>
        </div>
        <div>
          <a className='tab-link' href='#'>
            <Icon.Gift />
          </a>
        </div>
        <div>
          <a className='tab-link'>
            <Icon.MessageSquare />
          </a>
        </div>
      </div>
      {props.hideScrollToTop === false ? (
        <ScrollToTop showUnder={160}>
          <Button color='primary' className='btn-icon scroll-top'>
            <Icon.ArrowUp size={15} />
          </Button>
        </ScrollToTop>
      ) : null}
    </footer>
  )
}

export default Footer
