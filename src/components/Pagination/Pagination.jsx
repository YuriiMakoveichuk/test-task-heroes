import { Section } from "../Section/Section.jsx";
import { Container } from "../Container/Container.jsx";

import css from "./Pagination.module.css";

const Pagination = ({ pagesArray, changePage, page }) => {
  return (
    <>
      <Section>
        <Container>
          <ul className={css.list}>
            {pagesArray.map((p) => (
              <li
                key={p}
                className={p === page ? css.active : css.item}
                onClick={() => changePage(p)}
              >
                {p}
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
};

export default Pagination;
