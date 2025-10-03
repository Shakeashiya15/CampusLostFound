import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ItemList from "./js_pro/ItemList";
import ItemDetails from "./js_pro/ItemDetails";
import ReportItemForm from "./js_pro/ReportItemForm";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to /jsProject */}
        <Route path="/" element={<Navigate to="/jsProject" replace />} />

        {/* Main routes under /jsProject */}
        <Route path="/jsProject" element={<ItemList />} />
        <Route path="/jsProject/item/:id" element={<ItemDetails />} />
        <Route path="/jsProject/report" element={<ReportItemForm />} />
      </Routes>
    </Router>
  );
}

export default App;
