import React from 'react'
import { Link } from 'react-router-dom'

const Navbar: React.FC = () => {
    return (
        <div className=' text-white flex justify-between text-2xl'>
            <div className=' space-x-10'>
                <Link className=' link-style' to="/">Home</Link>
                <Link className=' link-style' to="/profile">Profile</Link>
            </div>
            <div className=' space-x-10'>
                <Link className=' link-style'
                    to="/signin">Sign In</Link>
                <Link className=' link-style' to="/signup">Sign Up</Link>
            </div>
        </div>
    )
}

export default Navbar