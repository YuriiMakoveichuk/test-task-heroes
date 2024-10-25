import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getDetailsHero,
  getFilms,
  getStarships,
  getStarshipsPage,
} from "../../apiServes/apiHeroes.js";

import css from "./Films.module.css";
import { Handle, Position } from "@xyflow/react";

const Films = ({ isConnectable }) => {
  const { heroId } = useParams();
  const [films, setFilms] = useState([]);
  const [starships, setStarships] = useState([]);
  const [detailsFilms, setDetailsFilms] = useState([]);
  const [detailsStarships, setDetailsStarships] = useState([]);

  useEffect(() => {
    const fetchDetailsHero = async () => {
      try {
        const data = await getDetailsHero(heroId);
        setDetailsFilms(data.films);
        setDetailsStarships(data.starships);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetailsHero();
  }, [heroId]);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const data = await getFilms();
        setFilms(data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFilms();
  }, []);

  const filteredFilms = films.filter((film) => detailsFilms.includes(film.id));

  useEffect(() => {
    const fetchStarships = async () => {
      try {
        const data = await getStarships();
        const totalPages = Math.ceil(data.count / 10);

        const requests = [];
        for (let page = 1; page <= totalPages; page++) {
          requests.push(getStarshipsPage(page));
        }
        const allRequests = await Promise.all(requests);

        const allStarships = allRequests.reduce((acc, data) => {
          return [...acc, ...data.results];
        }, []);

        setStarships(allStarships);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStarships();
  }, []);

  const filteredStarships = starships.filter((ship) =>
    detailsStarships.includes(ship.id)
  );

  const renderFilmStarships = (film) => {
    const heroStarshipsInFilm = filteredStarships.filter((starship) =>
      film.starships.includes(starship.id)
    );
    return (
      filteredStarships.length > 0 && (
        <ul className={css.list}>
          {heroStarshipsInFilm.map((ship) => (
            <li className={css.item} key={ship.id}>
              {ship.name}
            </li>
          ))}
        </ul>
      )
    );
  };

  return (
    <>
      {filteredFilms.length > 0 && (
        <div>
          <div className={css.box}>
            <ul className={css.list}>
              {filteredFilms.length > 0 &&
                filteredFilms.map((film) => (
                  <li className={css.item} key={film.id}>
                    <h3 className={css.title}>{film.title}</h3>
                    <Handle
                      type="target"
                      position={Position.Top}
                      isConnectable={isConnectable}
                    />
                    {renderFilmStarships(film)}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Films;
