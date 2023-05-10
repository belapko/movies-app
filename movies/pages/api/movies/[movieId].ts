import {NextApiRequest, NextApiResponse} from "next";
import prismadb from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }

    try {
        await serverAuth(req, res);
        const {movieId} = req.query; // [] in file name means that we can search for movieId using queryparams
        if (typeof movieId !== 'string') {
            throw new Error('Invalid movie ID');
        }

        if (!movieId) {
            throw new Error('Invalid movie ID');
        }

        const movie = await prismadb.movie.findUnique({
            where: {
                id: movieId,
            },
        });

        if (!movie) {
            throw new Error('Invalid movie ID');
        }

        return res.status(200).json(movie);
    } catch (e) {
        console.log(e)
        return res.status(500).end();
    }
}