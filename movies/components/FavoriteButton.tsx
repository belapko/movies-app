import axios from "axios";
import React, {useCallback, useMemo} from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";
import {MdFavorite} from "react-icons/md";


interface FavoriteButtonProps {
    movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({movieId}) => {
    const {mutate: mutateFavorites} = useFavorites();
    const {data: currentUser, mutate} = useCurrentUser();

    const isFavorite = useMemo(() => {
        const list = currentUser?.favoriteIds || [];
        return list.includes(movieId);
    }, [currentUser, movieId]);

    const toggleFavorites = useCallback(async () => {
        let response;
        if (isFavorite) {
            response = await axios.patch('/api/favorite', { movieId });
        } else {
            response = await axios.post('/api/favorite', {movieId});
        }

        const updatedFavoriteIds = response?.data?.favoriteIds;
        mutate({
            ...currentUser,
            favoriteIds: updatedFavoriteIds
        });
        mutateFavorites();
    }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

    const iconColor = isFavorite ? 'b20710' : 'fff';

    return (
        <div className='cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex
                        justify-center items-center transition hover:border-neutral-300' onClick={toggleFavorites}>
            <MdFavorite color={iconColor} size={20} />
        </div>
    )
}

export default FavoriteButton;