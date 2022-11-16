const FilterOrder = ({
  searchBy,
  orderBy,
  setSearcher,
  setSearcherBy,
  setSearcherByAD,
  resetProductsQuantity,
  resetProducts,
  searcherValue,
  orderByValue,
  orderByADValue,
}) => {
  //Function to update the data in the tables
  const submit = (e) => {
    e.preventDefault();
    resetProductsQuantity();
    resetProducts();
  };
  return (
    <form className="search-form" onSubmit={submit}>
      <div className="form-group">
        <label>{searchBy}</label>
        <input
          defaultValue={searcherValue}
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          onChange={(e) => setSearcher(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Order by</label>
        <select
          value={orderByValue}
          className="form-control"
          id="exampleFormControlSelect1"
          onChange={(e) => setSearcherBy(e.target.value)}
        >
          {orderBy.map((opt, index) => (
            <option key={index} value={opt.db_column}>
              {opt.value}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label></label>
        <select
          value={orderByADValue}
          className="form-control"
          id="exampleFormControlSelect1"
          onChange={(e) => setSearcherByAD(e.target.value)}
        >
          <option value="ASC">Asc</option>
          <option value="DESC">Desc</option>
        </select>
      </div>
      <div>
        <button className="btn btn-success">Search</button>
      </div>
    </form>
  );
};

export default FilterOrder;
