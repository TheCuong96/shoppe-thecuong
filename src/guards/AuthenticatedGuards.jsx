import { path } from 'constants/path'
import { UserAuthenticated } from 'hooks/UseAuthenticated'
import React, { Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { PropTypes } from 'prop-types'
export default function AuthenticatedGuards({ children }) {
    const authenticated = UserAuthenticated()
    if (!authenticated) {
        return <Redirect to={path.login} />
    }
    return <Fragment>{children}</Fragment>
}
AuthenticatedGuards.propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
}
