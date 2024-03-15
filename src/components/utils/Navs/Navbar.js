import React from 'react'
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = () => {
    return (
        <nav className='p-[8px] text-white' style={{}}>
            <div className='flex items-center'>
                <RxHamburgerMenu color="rgba(255, 255, 255, .87)" fontSize="30px" className='cursor-pointer m-8' />
                <div className='flex items-center'>
                    <img src='https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png' className="header-logo h-[40px] w-[40px]" alt='' />
                    <h2>Keep</h2>
                </div>
            </div>
            <div></div>
        </nav>
    )
}

export default Navbar