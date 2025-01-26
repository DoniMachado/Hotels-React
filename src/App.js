import "./styles.css";
import "react-responsive-modal/styles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "./Contexts/ThemeContext.jsx";

import Layout from "./Components/Layout/Layout";
import Home from "./Pages/Home/Home";
import Details from "./Pages/Details/Details";
import NotFound from "./Pages/NotFound/NotFound";

export default function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`App ${theme}`}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="details/:id" element={<Details />} />
            {/* <Route path="favorite" element={<Home />} /> */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}
