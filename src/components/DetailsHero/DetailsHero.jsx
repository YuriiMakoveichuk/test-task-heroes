import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Handle, Position } from "@xyflow/react";

// import { Section } from "../Section/Section.jsx";
// import { Container } from "../Container/Container.jsx";

// import Loader from "../Loader/Loader.jsx";
import GoBackBtn from "../GoBackBtn/GoBackBtn.jsx";

import { getDetailsHero } from "../../apiServes/apiHeroes.js";

import css from "./DetailsHero.module.css";

const DetailsHero = ({ isConnectable }) => {
  const { heroId } = useParams();
  const [detailsHero, setDetailsHero] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  const backLinkRef = useRef("/");

  useEffect(() => {
    const fetchDetailsHero = async () => {
      // setIsLoading(true);
      // setError(null);
      try {
        const data = await getDetailsHero(heroId);
        setDetailsHero(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetailsHero();
  }, [heroId]);

  return (
    <>
      {/* {isLoading && <Loader />}
      {error && <span>error</span>} */}
      {detailsHero !== null && (
        <>
          <div>
            {/* <Section>
            <Container> */}
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
            {/* <div className={css.boxFilters}>
              <Films detailsFilms={detailsFilms} />
              <Starships detailsStarships={detailsStarships} />
            </div> */}
            {/* </Container>
          </Section> */}
            <Handle
              type="source"
              position={Position.Bottom}
              id="a"
              // style={handleStyle}
              isConnectable={isConnectable}
            />
          </div>
        </>
      )}
    </>
  );
};

export default DetailsHero;
