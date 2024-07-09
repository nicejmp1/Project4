import React from 'react'

const Footer = ({ menuOpen }) => {
    return (
        <footer id='footer' className={menuOpen ? 'menu-open' : 'menu-closed'}>
            footer
        </footer>
    )
}

export default Footer
