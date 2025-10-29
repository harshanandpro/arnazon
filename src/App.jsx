import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Pages/Home";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        
      </Route>
        <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
