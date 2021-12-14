import React from 'react'

export default function IconCart() {
    return (
        <svg viewBox="0 0 26.6 25.6" className="shopee-svg-icon navbar__link-icon icon-shopping-cart-2">
            <polyline
                fill="none"
                points="2 1.7 5.5 1.7 9.6 18.3 21.2 18.3 24.6 6.1 7 6.1"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth="2.5"
            />
            <circle cx="10.7" cy={23} r="2.2" stroke="none" />
            <circle cx="19.7" cy={23} r="2.2" stroke="none" />
        </svg>
    )
}
