import React from "react";

interface MobileMenuProps {
    visible?: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({visible}) => {
    if (!visible) {
        return null;
    }

    return (
        <div className='bg-zinc-950 w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex mr-16'>
            <div className='flex flex-col gap-4'>

                <div className='px-3 text-center text-white hover:underline cursor-pointer'>Series</div>
                <div className='px-3 text-center text-white hover:underline cursor-pointer'>Films</div>
                <div className='px-3 text-center text-white hover:underline cursor-pointer'>New & Popular</div>
                <div className='px-3 text-center text-white hover:underline cursor-pointer'>My List</div>
                <div className='px-3 text-center text-white hover:underline cursor-pointer'>Browse by languages</div>

            </div>
        </div>
    )
};

export default MobileMenu;