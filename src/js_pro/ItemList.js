import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchItems } from "../api";
import withLoader from "./withLoader";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchItems();
        setItems(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const filtered = items
    .filter((i) => i.name.toLowerCase().includes(search.toLowerCase()))
    .filter((i) => (filter ? i.type === filter : true));

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>Campus Lost & Found</h1>
        <Link to="/report" style={styles.reportButton}>Report Item</Link>
      </div>

      <div style={styles.searchBox}>
        <input
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={styles.input}
        >
          <option value="">All</option>
          <option value="Lost">Lost</option>
          <option value="Found">Found</option>
        </select>
      </div>

      <div style={styles.cardGrid}>
        {filtered.map(({ id, name, type, location }) => (
          <Link to={`/item/${id}`} key={id} style={styles.card}>
            <h3 style={styles.cardTitle}>{name}</h3>
            <p><strong>Type:</strong> {type}</p>
            <p><strong>Location:</strong> {location}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f4f7fc",
    padding: "40px 20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
  },
  title: {
    color: "#2c3e50",
    margin: 0,
  },
  reportButton: {
    padding: "10px 20px",
    backgroundColor: "#3498db",
    color: "#fff",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  },
  searchBox: {
    display: "flex",
    gap: "15px",
    marginBottom: "30px",
  },
  input: {
    flex: 1,
    padding: "10px 12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    textDecoration: "none",
    color: "#2c3e50",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  cardTitle: {
    margin: "0 0 10px 0",
    color: "#3498db",
  },
};

export default withLoader(ItemList);
