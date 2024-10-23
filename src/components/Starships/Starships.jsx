import { useEffect, useState } from "react";

import { getStarships, getStarshipsPage } from "../../apiServes/apiHeroes.js";

import css from "./Starships.module.css";

const Starships = ({ detailsStarships }) => {
  const [starships, setStarships] = useState([]);

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
      {filteredStarships.length > 0 && (
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
      )}
    </>
  );
};

export default Starships;
