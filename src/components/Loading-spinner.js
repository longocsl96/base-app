import React from 'react'
import { connect } from 'react-redux'
import TopBarProgress from 'react-topbar-progress-indicator'

TopBarProgress.config({
  shadowBlur: 5,
  barThickness : 5
})

const LoadingSpinner = ({ showLoadingBar }) => {
  return showLoadingBar ? <TopBarProgress /> : null
}
const mapStateToProps = (state) => {
  return {
    showLoadingBar: state.customizer.showLoadingBar
  }
}
export default connect(mapStateToProps)(LoadingSpinner)
