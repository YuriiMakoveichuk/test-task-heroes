import axios from "axios";

axios.defaults.baseURL = "https://sw-api.starnavi.io/";

export const getHeroes = async (page) => {
  const { data } = await axios.get(`people/?page=${page}`);
  return data;
};

export const getDetailsHero = async (heroId) => {
  const { data } = await axios.get(`people/${heroId}`);
  return data;
};

export const getFilms = async () => {
  const { data } = await axios.get(`films`);
  return data;
};

export const getStarships = async () => {
  const { data } = await axios.get("starships");
  return data;
};

export const getStarshipsPage = async (page) => {
  const { data } = await axios.get(`starships/?page=${page}`);
  return data;
};
