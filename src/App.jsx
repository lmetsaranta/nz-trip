import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import About from "./pages/About";
import Destination from "./pages/Destination";

function App() {
  return (
    <BrowserRouter basename="/nz-trip">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/map" element={<Home />} />
        <Route path="/destination/:id" element={<Destination />} />
        <Route element={<Layout />}>
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
