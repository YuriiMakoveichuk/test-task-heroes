import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Handle, Position } from "@xyflow/react";

// import Loader from "../Loader/Loader.jsx";

import { getDetailsHero, getFilms } from "../../apiServes/apiHeroes.js";

import css from "./Films.module.css";

const Films = ({ isConnectable }) => {
  const { heroId } = useParams();
  const [films, setFilms] = useState([]);
  const [detailsFilms, setDetailsFilms] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetailsHero = async () => {
      // setIsLoading(true);
      // setError(null);
      try {
        const data = await getDetailsHero(heroId);
        setDetailsFilms(data.films);
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

  return (
    <>
      {/* {isLoading && <Loader />}
      {error && <span>error</span>} */}
      {filteredFilms.length > 0 && (
        <div>
          <Handle
            type="target"
            position={Position.Top}
            isConnectable={isConnectable}
          />
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
        </div>
      )}
    </>
  );
};

export default Films;
