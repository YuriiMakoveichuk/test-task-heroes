import { useEffect, useState } from "react";

import { Container } from "../../components/Container/Container.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import Heroes from "../../components/Heroes/Heroes.jsx";

import { getHeroes } from "../../apiServes/apiHeroes.js";

import css from "./HeroesPage.module.css";

const HeroesPage = () => {
  const [heroes, setHeroes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  let pagesArray = [];
  for (let index = 0; index < totalPages; index++) {
    pagesArray.push(index + 1);
  }

  useEffect(() => {
    const fetchHeroes = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getHeroes(page);
        const newHeroes = data.results;
        const counts = data.count;
        setTotalPages(Math.ceil(counts / 10));
        setHeroes(newHeroes);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHeroes();
  }, [page]);

  const changePage = (page) => {
    setPage(page);
  };

  return (
    <>
      <Container>
        {isLoading && <Loader />}
        {error && <span>error</span>}
        <h1 className={css.title}> Star Wars </h1>
        <Heroes
          heroes={heroes}
          pagesArray={pagesArray}
          changePage={changePage}
          page={page}
        />
      </Container>
    </>
  );
};

export default HeroesPage;
