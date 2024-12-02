import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar: React.FC = () => {
    return (
        <div className=' text-white flex gap-4 justify-between text-2xl'>
            <div className='space-x-4 sm:space-x-10'>
                <Link className=' link-style' to="/">Home</Link>
                <Link className=' link-style' to="/profile">Profile</Link>
            </div>
            <div className=' flex space-x-4 sm:space-x-10'>
                <Link className=' link-style' to="/signin">
                    <Button className=' bg-white text-black hover:text-white'>Sign In</Button>
                </Link>
                <Link className=' link-style' to="/signup">
                    <Button className=' bg-white text-black hover:text-white'>Sign Up</Button>
                </Link>
            </div>
        </div>
    )
}

export default Navbar