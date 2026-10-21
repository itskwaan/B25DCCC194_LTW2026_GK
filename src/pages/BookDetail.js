import { useParams, useNavigate } from "react-router-dom";

const BookDetail = ({ books }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = books.find((b) => b.id === Number(id));

  return (
    <div>
      {book ? (
        <div className="detail">
          <h1>Chi tiết sách</h1>
          <p>Tên sách: {book.title}</p>
          <p>Tác giả: {book.author}</p>
          <p>Năm xuất bản: {book.year}</p>
          <p>Thể loại: {book.category}</p>
          <p>Trạng thái: {book.available ? "Có sẵn" : "Đang mượn"}</p>
        </div>
      ) : (
        <p className="status">Không tìm thấy sách</p>
      )}
      <button type="button" onClick={() => navigate(-1)}>
        Quay lại
      </button>
    </div>
  );
};

export default BookDetail;
