import React from 'react'
import { Link } from 'react-router-dom'
import { HeaderIcon } from './StylesHeaderRegister'
import { HeaderTitle } from './StylesHeaderRegister'
import { HeaderBrand } from './StylesHeaderRegister'
import { Container } from './StylesHeaderRegister'
import { HeaderWrapped } from './StylesHeaderRegister'
import IconShopeeRegister from '../../assets/img/IconShopeeRegister'
import { PropTypes } from 'prop-types'
export default function HeaderRegister({ title }) {
    return (
        <HeaderWrapped>
            <Container className="container">
                <HeaderBrand>
                    <HeaderIcon to="">
                        <IconShopeeRegister />
                    </HeaderIcon>
                    <HeaderTitle>{title}</HeaderTitle>
                </HeaderBrand>
                <Link to="" className="link">
                    Cần trợ giúp
                </Link>
            </Container>
        </HeaderWrapped>
    )
}
HeaderRegister.propTypes = {
    title: PropTypes.string
}
