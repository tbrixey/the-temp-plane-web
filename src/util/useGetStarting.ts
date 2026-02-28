import useSWR from "swr";
import axios from "axios";
import { Classes } from "../types/classes";
import { Races } from "../types/races";
import { Location } from "../types/location";
import { config } from "../config";

const fetcher = async (url: string) => {
  return await axios.get(config.apiUrl + url).then((res) => res.data.data);
};

/** GET /gameapi/locations - returns raw array, not wrapped in data */
const locationsFetcher = async (url: string) => {
  const res = await axios.get(config.apiUrl + url);
  return Array.isArray(res.data) ? res.data : res.data.data ?? [];
};

export const useGetStartingCities = () => {
  const { data, error } = useSWR<Location[]>("cities", fetcher);

  return {
    cities: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useGetClasses = () => {
  const { data, error } = useSWR<Classes[]>("class", fetcher);

  return {
    classes: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useGetRaces = () => {
  const { data, error } = useSWR<Races[]>("race", fetcher);

  return {
    races: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useGetLocations = () => {
  const { data, error } = useSWR<Location[]>("locations", locationsFetcher);

  return {
    locations: data,
    isLoading: !error && !data,
    isError: error,
  };
};
