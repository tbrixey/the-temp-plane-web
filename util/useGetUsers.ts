import useSWR from "swr";
import axios from "axios";

const fetcher = async (url: string) => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  return await axios.get(BASE_URL + url).then((res) => res.data.data);
};

export const useGetUsers = () => {
  const { data, error } = useSWR("players", fetcher);

  return {
    users: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useGetCities = () => {
  const { data, error } = useSWR("cities", fetcher);

  return {
    cities: data,
    isLoading: !error && !data,
    isError: error,
  };
};
