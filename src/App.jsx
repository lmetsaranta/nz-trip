import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AccessProvider } from "./context/AccessContext";
import { MapStateProvider } from "./context/MapStateContext";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import About from "./pages/About";
import DestinationRouter from "./pages/DestinationRouter";

function App() {
  return (
    <BrowserRouter basename="/nz-trip">
      <AccessProvider>
        <MapStateProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/map" element={<Home />} />
            <Route path="/destination/:id" element={<DestinationRouter />} />
            <Route element={<Layout />}>
              <Route path="/about" element={<About />} />
            </Route>
          </Routes>
        </MapStateProvider>
      </AccessProvider>
    </BrowserRouter>
  );
}

export default App;
