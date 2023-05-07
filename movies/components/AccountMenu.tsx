import React from 'react';
import {signOut} from "next-auth/react";

interface AccountMenuProps {
    visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({visible}) => {
    if (!visible) {
        return null;
    }

    return (
        <div className='bg-zinc-950 w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex'>
            <div className='flex flex-col gap-4'>
                <div className='px-3 group/item flex flex-row gap-3 items-center w-full'>
                    <img className='w-8 rounded-md' src='/images/default-blue.png' alt='profile'/>
                    <p className='text-white text-sm group-hover/item:underline'>Username</p>
                </div>
                <hr className='bg-gray-600 border-0 h-px'/>
                <div className='bg-red-900 text-center text-white hover:underline text-lg font-semibold' onClick={() => signOut()}>
                    Sign out
                </div>
            </div>
        </div>
    );
};

export default AccountMenu;