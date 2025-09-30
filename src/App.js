import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ItemList from "./js_pro/ItemList";
import ItemDetails from "./js_pro/ItemDetails";
import ReportItemForm from "./js_pro/ReportItemForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ItemList />} />
        <Route path="/item/:id" element={<ItemDetails />} />
        <Route path="/report" element={<ReportItemForm />} />
      </Routes>
    </Router>
  );
}

export default App;
