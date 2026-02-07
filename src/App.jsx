import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MapStateProvider } from "./context/MapStateContext";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import About from "./pages/About";
import Destination from "./pages/Destination";

function App() {
  return (
    <BrowserRouter basename="/nz-trip">
      <MapStateProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/map" element={<Home />} />
          <Route path="/destination/:id" element={<Destination />} />
          <Route element={<Layout />}>
            <Route path="/about" element={<About />} />
          </Route>
        </Routes>
      </MapStateProvider>
    </BrowserRouter>
  );
}

export default App;
