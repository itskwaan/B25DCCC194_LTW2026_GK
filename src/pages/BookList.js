import BookTable from "../components/BookTable";

const BookList = ({ books, onToggle, onDelete }) => {
  return (
    <div>
      <h1>Danh sách sách</h1>
      <BookTable books={books} onToggle={onToggle} onDelete={onDelete} />
    </div>
  );
};

export default BookList;
