import useSWR from "swr";
// @ts-ignore
import fetcher from "@/libs/fetcher";


const useCurrentUser = () => {
    const {data, error, isLoading, mutate} = useSWR('/api/current', fetcher);
    return {
        data,
        error,
        isLoading,
        mutate
    }
};

export default useCurrentUser;