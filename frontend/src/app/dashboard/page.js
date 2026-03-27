"use client";

import { useEffect, useState } from "react";
import { getAllHistory } from "../../firebase/db";
import Navbar from "../../components/Navbar";

export default function Dashboard() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllHistory();
      setHistory(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="container">
        <h1>📊 Your History</h1>

        <div className="result">
          {history.map((item) => (
            <div key={item.id} className="card">
              <img
                src={item.image}
                className="thumbnail"
                alt="thumb"
              />

              <h4>{item.topic}</h4>

              <ul>
                {item.titles?.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>

              <small>
                {new Date(item.createdAt?.seconds * 1000).toLocaleString()}
              </small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}