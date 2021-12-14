import IconHidePassword from 'assets/img/IconHidePassword'
import IconShowPassword from 'assets/img/IconShowPassword'
import React, { useState } from 'react'
import { FormControl } from './StylesInputPassword'

export default function InputPassword({ ...props }) {
    const [focus, setFocus] = useState(false)
    const [visiblePassword, setVisiblePassword] = useState(false)
    const toggleVisiblePassword = () => {
        setVisiblePassword(visiblePassword => !visiblePassword)
    }
    return (
        <FormControl focus={focus}>
            <input
                {...props}
                type={visiblePassword ? 'text' : 'password'}
                onfocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
            />
            <button type="button" onClick={toggleVisiblePassword} tabIndex="-1">
                {visiblePassword && <IconShowPassword />}
                {!visiblePassword && <IconHidePassword />}
            </button>
        </FormControl>
    )
}
