import React from 'react'
import particeepLogo from './../images/particeepLogo.png'

function Header() {
    return (
        <div className="container-fluid">
            <div className="col-12 text-center mb-1 mt-5"><img src={particeepLogo} alt="Logo" /></div>
                        
        </div>
    )
}

export default Header
