import React, { useState } from 'react'
import { FormControl } from './StylesInputText'

export default function InputText({ ...props }) {
    const [focus, setFocus] = useState(false)
    return (
        <FormControl focus={focus}>
            <input {...props} onfocus={() => setFocus(true)} onBlur={() => setFocus(false)} />
        </FormControl>
    )
}
