import React, { Fragment } from 'react'

import { PropTypes } from 'prop-types'
import { Drawer } from './StylesPopover'
import { PopoverArrow } from './StylesPopover'
import { PopoverContent } from './StylesPopover'

export default function Popover({ active, children }) {
    return (
        <Fragment>
            {active && (
                <Drawer>
                    <PopoverArrow />
                    <PopoverContent>
                        {children}
                    </PopoverContent>
                </Drawer>
            )}
        </Fragment>
    )
}
Popover.propTypes = {
    active: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
}
