function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          className={`btn ${
            i === currentPage ? "btn-primary" : "btn-outline-light"
          }`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="d-flex justify-content-center align-items-center gap-2 mt-4">
      <button
        className="btn btn-outline-light"
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        Anterior
      </button>
      {renderPageNumbers()}
      <button
        className="btn btn-outline-light"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Siguiente
      </button>
    </div>
  );
}

export default Pagination;
