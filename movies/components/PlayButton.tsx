import React from 'react';
import {BsFillPlayFill} from "react-icons/bs";
import {useRouter} from "next/router";

interface PlayButtonProps {
    movieId: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({movieId}) => {
    const router = useRouter();

    return (
        <button onClick={() => router.push(`/watch/${movieId}`)}>
            <BsFillPlayFill size={30} color={'b20710'} />
        </button>
    );
};

export default PlayButton;