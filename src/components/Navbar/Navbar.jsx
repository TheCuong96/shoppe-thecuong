import Popover from 'components/Popover/Popover'
import { path } from 'constants/path'
import { UserAuthenticated } from 'hooks/UseAuthenticated'
import UserPopover from 'hooks/UserPopover'
import { logout } from 'pages/Auth/auth.slice'
import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Drawer } from './StylesNavbar'
import { PopoverContent } from './StylesNavbar'
import { UserButton } from './StylesNavbar'
import { NavLink } from './StylesNavbar'
import { UserLink } from './StylesNavbar'
import { PopoverArrow } from './StylesNavbar'
import { UserName } from './StylesNavbar'
import { User } from './StylesNavbar'
import { UserImage } from './StylesNavbar'
import { NavMenu } from './StylesNavbar'
import { NavWrapper } from './StylesNavbar'

export default function Navbar() {
    const authenticated = UserAuthenticated()
    const profile = useSelector(state => state.auth.profile)


    const { activePopover, showPopover, hidePopover } = UserPopover()

    const dispatch = useDispatch(logout)
    const handleLogout = () => dispatch(logout())
    return (
        <NavWrapper>
            <NavMenu>
                {authenticated && (
                    <li>
                        <User onMouseEnter={showPopover} onMouseLeave={hidePopover}>
                            <UserImage src="https://cf.shopee.vn/file/952caa0f79501d0de00cf460cef8a283_tn" />
                            <UserName>{profile.name || profile.email}</UserName>
                        
                            <Popover active={activePopover}>
                                <UserLink to={path.user}>Tài khoản của tôi</UserLink>
                                <UserLink to="">Đơn mua</UserLink>
                                <UserButton onClick={handleLogout}>Đăng xuất</UserButton>
                            </Popover>
                        </User>
                    </li>
                )}
                {!authenticated && (
                    <Fragment>
                        <li>
                            <NavLink to={path.register}>Đăng ký</NavLink>
                        </li>
                        <li>
                            <NavLink to={path.login}>Đăng nhập</NavLink>
                        </li>
                    </Fragment>
                )}
            </NavMenu>
        </NavWrapper>
    )
}
