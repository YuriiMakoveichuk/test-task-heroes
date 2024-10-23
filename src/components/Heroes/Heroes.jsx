import { Section } from "../Section/Section.jsx";
import { Container } from "../../components/Container/Container.jsx";
import Hero from "../../components/Heroes/Hero.jsx";
import Pagination from "../../components/Pagination/Pagination.jsx";

import css from "./Heroes.module.css";

const Heroes = ({ heroes, pagesArray, changePage, page }) => {
  return (
    <>
      <Section>
        <Container>
          <ul className={css.list}>
            {heroes.length > 0 &&
              heroes.map((hero) => (
                <li key={hero.id} className={css.card}>
                  <Hero hero={hero} />
                </li>
              ))}
          </ul>
          <Pagination
            pagesArray={pagesArray}
            changePage={changePage}
            page={page}
          />
        </Container>
      </Section>
    </>
  );
};

export default Heroes;
