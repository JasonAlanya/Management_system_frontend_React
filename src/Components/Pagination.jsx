const Pagination = ({
  postPerpage,
  totalPosts,
  previousPage,
  nextPage,
  selectPage,
  currentPage,
}) => {
  //Components to create the pagnation section
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postPerpage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="container-pagination">
      <ul className="pagination">
        {currentPage === 1 || (
          <li>
            <a onClick={() => previousPage()} className="page-link">
              ◁
            </a>
          </li>
        )}
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a
              onClick={() => selectPage(number)}
              className={
                number === currentPage
                  ? "page-link page-link-active"
                  : "page-link"
              }
            >
              {number}
            </a>
          </li>
        ))}
        {currentPage === Math.ceil(totalPosts / postPerpage) ||
          totalPosts === 0 || (
            <li>
              <a onClick={() => nextPage()} className="page-link">
                ▷
              </a>
            </li>
          )}
      </ul>
    </nav>
  );
};

export default Pagination;
