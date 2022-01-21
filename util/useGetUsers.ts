import useSWR from "swr";
import axios from "axios";

const fetcher = async (url: string) => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  return await axios.get(BASE_URL + url).then((res) => res.data);
};

export const useGetUsers = () => {
  const { data, error } = useSWR("players", fetcher);

  return {
    users: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useGetLocations = () => {
  const { data, error } = useSWR("locations", fetcher);

  return {
    locations: data,
    isLoading: !error && !data,
    isError: error,
  };
};
