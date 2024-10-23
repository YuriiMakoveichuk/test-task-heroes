import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { Section } from "../../components/Section/Section.jsx";
import { Container } from "../../components/Container/Container.jsx";

import Loader from "../../components/Loader/Loader.jsx";
import GoBackBtn from "../../components/GoBackBtn/GoBackBtn.jsx";
import Films from "../../components/Films/Films.jsx";
import Starships from "../../components/Starships/Starships.jsx";

import { getDetailsHero } from "../../apiServes/apiHeroes.js";

import css from "./DetailsHeroPage.module.css";

const DetailsHeroPage = () => {
  const { heroId } = useParams();

  const [detailsHero, setDetailsHero] = useState(null);
  const [detailsFilms, setDetailsFilms] = useState([]);
  const [detailsStarships, setDetailsStarships] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const backLinkRef = useRef("/");

  useEffect(() => {
    const fetchDetailsHero = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getDetailsHero(heroId);
        setDetailsHero(data);
        setDetailsFilms(data.films);
        setDetailsStarships(data.starships);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetailsHero();
  }, [heroId]);

  return (
    <>
      {isLoading && <Loader />}
      {error && <span>error</span>}
      {detailsHero !== null && (
        <>
          <Section>
            <Container>
              <GoBackBtn backLinkRef={backLinkRef} />
              <h2 className={css.title}>{detailsHero.name}</h2>

              <div className={css.card}>
                <img
                  className={css.img}
                  src={`https://starwars-visualguide.com/assets/img/characters/${detailsHero.id}.jpg`}
                  alt={detailsHero.name}
                  width={250}
                />
              </div>
              <div className={css.boxFilters}>
                <Films detailsFilms={detailsFilms} />
                <Starships detailsStarships={detailsStarships} />
              </div>
            </Container>
          </Section>
        </>
      )}
    </>
  );
};

export default DetailsHeroPage;
