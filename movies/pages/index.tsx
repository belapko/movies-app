import {getSession} from "next-auth/react";
import {NextPageContext} from "next";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import useMovieList from "@/hooks/useMovieList";
import useFavorites from "@/hooks/useFavorites";



export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: '/auth',
                permanent: false,
            },
        };
    }
    return {
        props: {}
    };
}

export default function Home() {
    const {data: movies = []} = useMovieList();
    const {data: favorites = []} = useFavorites();

    return (
        <>
            <Billboard/>
            <div className='pb-40'>
                <MovieList title='Trending now' data={movies} sliceFor={4}/>
                <MovieList title='Favorites' data={favorites} sliceFor={4}/>
            </div>
        </>
    )
}