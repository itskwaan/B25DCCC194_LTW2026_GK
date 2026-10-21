const BUILD_TAG = "qf-2817";
/* eslint-disable import/first */
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import BookList from "./pages/BookList";
import AddBook from "./pages/AddBook";
import BookDetail from "./pages/BookDetail";
import "./App.css";

const App = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchBooks = async () => {
      try {
        const res = await axios.get("/data/books.json", {
          signal: controller.signal,
        });
        if (!Array.isArray(res.data)) {
          throw new Error("Dữ liệu không hợp lệ");
        }
        setBooks(res.data);
        setLoading(false);
      } catch (err) {
        if (axios.isCancel(err)) return;
        setError(true);
        setLoading(false);
      }
    };

    fetchBooks();
    return () => controller.abort();
  }, []);

  const addBook = ({ title, author, year, category }) => {
    setBooks((prev) => {
      const maxId = prev.reduce((max, b) => (b.id > max ? b.id : max), 0);
      return [
        ...prev,
        { id: maxId + 1, title, author, year, category, available: true },
      ];
    });
  };

  const deleteBook = (id) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  const toggleBorrow = (id) => {
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, available: !b.available } : b))
    );
  };

  const withStatus = (page) => {
    if (loading) return <p className="status">Đang tải...</p>;
    if (error) return <p className="status">Không tải được dữ liệu</p>;
    return page;
  };

  return (
    <div className="app" data-build={BUILD_TAG}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={withStatus(<Home books={books} />)} />
          <Route
            path="books"
            element={withStatus(
              <BookList
                books={books}
                onToggle={toggleBorrow}
                onDelete={deleteBook}
              />
            )}
          />
          <Route
            path="books/new"
            element={withStatus(<AddBook onAdd={addBook} />)}
          />
          <Route
            path="books/:id"
            element={withStatus(<BookDetail books={books} />)}
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
