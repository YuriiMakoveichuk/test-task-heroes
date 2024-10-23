import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage.jsx";
import DetailsHeroPage from "./pages/DetailsHeroPage/DetailsHeroPage.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:heroId" element={<DetailsHeroPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
