import React from 'react';
import MovieList from "@/components/MovieList";
import useFavorites from "@/hooks/useFavorites";

const Favorites = () => {
    const {data: favorites = []} = useFavorites();

    return (
        <div>
            <MovieList data={favorites} title={'Favorites'} />
        </div>
    );
};

export default Favorites;