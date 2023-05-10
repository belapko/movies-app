import React, {useCallback, useEffect, useState} from 'react';
import {AiOutlineClose} from "react-icons/ai";
import playButton from "@/components/PlayButton";
import favoriteButton from "@/components/FavoriteButton";
import useInfoModal from "@/hooks/useInfoModal";
import useMovie from "@/hooks/useMovie";
import PlayButton from "@/components/PlayButton";
import FavoriteButton from "@/components/FavoriteButton";

interface InfoModalProps {
    visible?: boolean;
    onClose: any;
}

const InfoModal: React.FC<InfoModalProps> = ({visible, onClose}) => {
    const [isVisible, setIsVisible] = useState(!!visible);
    const {movieId} = useInfoModal();
    const {data = {}} = useMovie(movieId);

    useEffect(() => {
        setIsVisible(!!visible);
    }, [visible]);

    const handleClose = useCallback(() => {
        setIsVisible(false);
        setTimeout(() => {
            onClose();
        }, 300)
    }, [onClose]);

    if (!visible) {
        return null;
    }

    return (
        <div className='z-50 transition duration-300 bg-black/80 flex justify-center items-center overflow-x-hidden
                        overflow-y-auto fixed inset-0'>
            <div className='relative w-auto mx-auto max-w-3xl rounded-md overflow-hidden'>
                <div className={`${isVisible ? 'scale-100' : 'scale-0'} transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md`}>
                    <div className='relative h-96'>
                        <video className='w-full brightness-[60%] object-cover h-full'
                               autoPlay muted loop src={data?.videoUrl} poster={data?.thumbnailUrl}></video>
                        <div className='cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black/70 flex items-center justify-center'
                             onClick={handleClose}>
                            <AiOutlineClose color={'fff'} size={20}/>
                        </div>
                        <div className='absolute bottom-[10%] left-10'>
                            <p className='text-white text-3xl md:text-4xl lg:text-5xl h-full font-bold mb-8'>{data?.title}</p>
                            <div className='flex flex-row gap-4 items-center'>
                                <div className='cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center
                                        items-center transition hover:bg-neutral-300'>
                                    <PlayButton movieId={data?.id}/>
                                </div>
                                <FavoriteButton movieId={data?.id} />
                            </div>
                        </div>
                    </div>
                    <div className='px-12 py-8'>
                        <p className='text-white text-lg'>
                            {data?.duration}
                        </p>
                        <p className='text-white text-lg'>
                            {data?.genre}
                        </p>
                        <p className='text-white text-lg'>
                            {data?.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoModal;