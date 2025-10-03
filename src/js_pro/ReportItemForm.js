import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { reportItem } from "../api";

const ReportItemForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    type: "Lost",
    location: "",
    reporter: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await reportItem(form);
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Report Lost or Found Item</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="name"
          placeholder="Item Name"
          value={form.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          style={styles.input}
        >
          <option value="Lost">Lost</option>
          <option value="Found">Found</option>
        </select>
        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="reporter"
          placeholder="Your Name"
          value={form.reporter}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
          style={{ ...styles.input, height: "80px" }}
        />
        <button type="submit" style={styles.button}>
          Submit
        </button>
      </form> 
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "500px",
    margin: "40px auto",
    padding: "25px",
    borderRadius: "12px",
    backgroundColor: "#f0f4f8",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    textAlign: "center",
    color: "#333",
    marginBottom: "25px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.3s",
  },
  button: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#1976d2",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default ReportItemForm;
