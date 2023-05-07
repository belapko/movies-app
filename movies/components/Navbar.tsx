import React, {useCallback, useEffect, useState} from 'react';
import NavbarItem from "@/components/NavbarItem";
import {AiOutlineMenu, AiOutlineSearch} from 'react-icons/ai'
import MobileMenu from "@/components/MobileMenu";
import AccountMenu from "@/components/AccountMenu";

const TOP_OFFSET = 66;

const Navbar = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const [showBackground, setShowBackground] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > TOP_OFFSET) {
                setShowBackground(true);
            } else {
                setShowBackground(false);
            }
        }
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        } // unmountFunction
    }, []);

    const toggleMobileMenu = useCallback(() => {
        setShowMobileMenu((current) => !current);
    }, []);

    const toggleAccountMenu = useCallback(() => {
        setShowAccountMenu((current) => !current);
    }, []);

    return (
        <nav className='w-full fixed z-40'>
            <div className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${showBackground ? 'bg-zinc-900 bg-opacity-90': ''}`}>
                <img className='h-4 lg:h-7 cursor-pointer transition duration-500 hover:scale-125'
                     src="/images/logo.png" alt="Logo"/>
                <div className='hidden lg:flex flex-row ml-8 gap-7'>
                    <NavbarItem label={'Series'}/>
                    <NavbarItem label={'Films'}/>
                    <NavbarItem label={'New & Popular'}/>
                    <NavbarItem label={'My List'}/>
                    <NavbarItem label={'Browse by languages'}/>
                </div>
                <div className='lg:hidden w-full flex justify-end items-center mr-2'>
                    <div className="flex flex-row items-center cursor-pointer" onClick={toggleMobileMenu}>
                        <p className='text-white text-sm'>Menu</p><AiOutlineMenu className='text-white ml-1'/>
                    </div>
                </div>
                <MobileMenu visible={showMobileMenu}/>
                <div
                    className='flex flex-row ml-auto gap-2 items-center text-white cursor-pointer hover:text-gray-300 transition duration-500'>
                    Search<AiOutlineSearch className='text-white text-xl'/>
                </div>
                <div className='flex flex-row items-center ml-4 cursor-pointer relative' onClick={toggleAccountMenu}>
                    <div className='w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden'>
                        <img src='/images/default-blue.png' alt='profileImage'/>
                    </div>
                    <AccountMenu visible={showAccountMenu}/>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;