import React from 'react'

const Main = ({ children, menuOpen }) => {
    return (
        <main id='main' role='main' className={menuOpen ? 'menu-open' : 'menu-closed'}>
            {children}
        </main >
    )
}

export default Main
