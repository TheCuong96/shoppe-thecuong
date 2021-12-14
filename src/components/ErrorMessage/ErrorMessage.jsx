import React from 'react'
import PropsTypes from 'prop-types'
import { Message } from './StylesErrorMessage'
export default function ErrorMessage({ errors, name }) {
    const error = errors[name]
    return <Message>{error && error.message}</Message>
}

ErrorMessage.prototype = {
    error: PropsTypes.object,
    name: PropsTypes.string
}
