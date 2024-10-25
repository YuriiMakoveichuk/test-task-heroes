import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
import ReactFlowPage from "./pages/ReactFlowPage/ReactFlowPage.jsx";
import HeroesPage from "./pages/HeroesPage/HeroesPage.jsx";
import Navigation from "./components/Navigation/Navigation.jsx";

const App = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/people" element={<HeroesPage />} />
        <Route path="/people/:heroId" element={<ReactFlowPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
