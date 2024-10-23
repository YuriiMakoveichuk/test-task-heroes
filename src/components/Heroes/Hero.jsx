import { Link } from "react-router-dom";

import css from "./Heroes.module.css";

const Hero = ({ hero }) => {
  return (
    <>
      <Link key={hero.id} to={`/${hero.id}`}>
        <div className={css.box}>
          <img
            src={`https://starwars-visualguide.com/assets/img/characters/${hero.id}.jpg`}
            alt={hero.name}
            className={css.img}
          />
          <div className={css.titleCard}>{hero.name}</div>
        </div>
      </Link>
    </>
  );
};

export default Hero;
