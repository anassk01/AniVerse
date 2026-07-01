function Pagination({ page, hasNextPage, onPageChange }) {
  return (
    <div className="pagination">
      <button onClick={() => onPageChange(page - 1)} disabled={page <= 1}>
        ← Prev
      </button>
      <span className="pagination-current">Page {page}</span>
      <button onClick={() => onPageChange(page + 1)} disabled={!hasNextPage}>
        Next →
      </button>
    </div>
  );
}

export default Pagination;
