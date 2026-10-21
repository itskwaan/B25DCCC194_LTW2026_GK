import BookRow from "./BookRow";

const BookTable = ({ books, onToggle, onDelete }) => {
  return (
    <table className="book-table">
      <thead>
        <tr>
          <th>Tên sách</th>
          <th>Tác giả</th>
          <th>Năm</th>
          <th>Thể loại</th>
          <th>Trạng thái</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <BookRow
            key={book.id}
            book={book}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
};

export default BookTable;
