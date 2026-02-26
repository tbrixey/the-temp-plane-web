import useSWR from "swr";
import axios from "axios";
import { config } from "../config";

const fetcher = async (url: string) => {
  return await axios.get(config.apiUrl + url).then((res) => res.data.data);
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
