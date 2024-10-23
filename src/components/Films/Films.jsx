import { useEffect, useState } from "react";

import { getFilms } from "../../apiServes/apiHeroes.js";

import css from "./Films.module.css";

const Films = ({ detailsFilms }) => {
  const [films, setFilms] = useState([]);

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

  return (
    <>
      {filteredFilms.length > 0 && (
        <div className={css.box}>
          <h3 className={css.title}>Films</h3>
          <ul className={css.list}>
            {filteredFilms.length > 0 &&
              filteredFilms.map((film) => (
                <li className={css.item} key={film.id}>
                  {film.title}
                </li>
              ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Films;
