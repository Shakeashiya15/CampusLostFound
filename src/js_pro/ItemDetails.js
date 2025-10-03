import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchItemById } from "../api";
import Loader from "./withLoader";

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadItem = async () => {
      try {
        setLoading(true);
        const data = await fetchItemById(id);
        setItem(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadItem();
  }, [id]);

  if (loading) return <Loader />;
  if (!item) return <div style={styles.notFound}>Item not found</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{item.name}</h2>
      <div style={styles.infoBox}>
        <p><strong>Type:</strong> {item.type}</p>
        <p><strong>Location:</strong> {item.location}</p>
        <p><strong>Reporter:</strong> {item.reporter || "N/A"}</p>
        <p><strong>Description:</strong> {item.description}</p>
      </div>
      <Link to="/" style={styles.backLink}>← Back to Item List</Link>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#f0f4f8",
    boxShadow: "0 4px 12px rgba(70, 60, 60, 0.1)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
  },
  infoBox: {
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    lineHeight: "1.6",
    marginBottom: "20px",
  },
  backLink: {
    display: "inline-block",
    textDecoration: "none",
    color: "#1976d2",
    fontWeight: "bold",
    transition: "color 0.3s",
  },
  notFound: {
    textAlign: "center",
    marginTop: "50px",
    color: "#d32f2f",
    fontWeight: "bold",
    fontSize: "18px",
  },
};

export default ItemDetails;
