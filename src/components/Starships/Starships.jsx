import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Handle, Position } from "@xyflow/react";

// import Loader from "../Loader/Loader.jsx";

import {
  getDetailsHero,
  getStarships,
  getStarshipsPage,
} from "../../apiServes/apiHeroes.js";

import css from "./Starships.module.css";

const Starships = ({ isConnectable }) => {
  const { heroId } = useParams();
  const [starships, setStarships] = useState([]);
  const [detailsStarships, setDetailsStarships] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetailsHero = async () => {
      // setIsLoading(true);
      // setError(null);
      try {
        const data = await getDetailsHero(heroId);
        setDetailsStarships(data.starships);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetailsHero();
  }, [heroId]);

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

  return (
    <>
      {/* {isLoading && <Loader />}
      {error && <span>error</span>} */}
      {filteredStarships.length > 0 && (
        <div>
          <Handle
            type="target"
            position={Position.Top}
            isConnectable={isConnectable}
          />
          <div className={css.box}>
            <h3 className={css.title}>Ships</h3>
            <ul className={css.list}>
              {filteredStarships.length > 0 &&
                filteredStarships.map((ship) => (
                  <li className={css.item} key={ship.id}>
                    {ship.name}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Starships;
