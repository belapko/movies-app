import React, {useCallback} from 'react';
import useBillboard from "@/hooks/useBillboard";
import {useRouter} from "next/router";
import useInfoModal from "@/hooks/useInfoModal";

const Billboard = () => {
    const router = useRouter();
    const {data} = useBillboard();
    const {openModal} = useInfoModal();
    const handleOpenModal = useCallback(() => {
        openModal(data?.id);
    }, [openModal, data?.id]);

    return (
        <div className='relative h-[56.25vw] lg:h-[45vw] cursor-pointer' onClick={handleOpenModal}>
            <video className='w-full h-[56.25vw] lg:h-[45vw] object-cover brightness-[60%]'
                   autoPlay muted loop poster={data?.thumbnailUrl} src={data?.videoUrl}>
            </video>
            <div className='absolute top-[30%] md:top-[40%] ml-4 md:ml-16'>
                <p className='text-white text-xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl'>
                    {data?.title}
                </p>
                <p className='text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl'>
                    {data?.description}
                </p>
                {/*<button className='mt-4 bg-white bg-opacity-30 text-white rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg*/}
                {/*                font-semibold flex flex-row items-center hover:bg-opacity-20 transition z-50'>*/}
                {/*    <AiOutlineInfoCircle className='mr-2'/>More info*/}
                {/*</button>*/}
            </div>
        </div>
    );
};

export default Billboard;