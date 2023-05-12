import React from 'react';
import MovieList from "@/components/MovieList";
import useMovieList from "@/hooks/useMovieList";

const Films = () => {
    const {data: movies = []} = useMovieList();

    return (
        <>
        <div className='mt-10'>
            <MovieList data={movies} title={"Films"}/>
        </div>
        </>
    );
};

export default Films;