import {getSession, signOut} from "next-auth/react";
import {NextPageContext} from "next";
import useCurrentUser from "@/hooks/useCurrentUser";

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
    const {data: user} = useCurrentUser();

    return (
        <>
            <p className='bg-white'>Logged in as {user?.name}</p>
            <button className='text-white h-12' onClick={() => signOut()}>Logout</button>
        </>
    )
}