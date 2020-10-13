import React from 'react'
import 'flatpickr/dist/themes/light.css'
import '../assets/scss/plugins/forms/flatpickr/flatpickr.scss'
import Flatpickr from 'react-flatpickr'

const DatePicker = (props) => <Flatpickr {...props} />

export default DatePicker
