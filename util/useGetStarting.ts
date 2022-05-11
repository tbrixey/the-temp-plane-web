import useSWR from "swr";
import axios from "axios";

const fetcher = async (url: string) => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  return await axios.get(BASE_URL + url).then((res) => res.data.data);
};

export const useGetStartingCities = () => {
  const { data, error } = useSWR("cities", fetcher);

  return {
    cities: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useGetClasses = () => {
  const { data, error } = useSWR("class", fetcher);

  return {
    classes: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useGetRaces = () => {
  const { data, error } = useSWR("race", fetcher);

  return {
    races: data,
    isLoading: !error && !data,
    isError: error,
  };
};
