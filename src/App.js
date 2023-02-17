import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchProducts = async () => {
    const response = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
    );
    console.log(response);
    const data = await response.json();
    console.log(data);

    if (data && data.products) {
      setProducts(data.products);
      setTotalPages(data.total / 10);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const updatePage = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPages &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };

  return (
    <>
      <div>
        {products.length > 0 && (
          <div className="products">
            {products.map((product) => {
              return (
                <span className="products__single" key={product.id}>
                  <img src={product.thumbnail} alt={product.title} />
                  <span>{product.title}</span>
                </span>
              );
            })}
          </div>
        )}
      </div>
      <div>
        {products.length > 0 && (
          <div className="pagination">
            <span
              className={page > 1 ? "" : "pagination__disable"}
              onClick={() => {
                updatePage(page - 1);
              }}
            >
              ⬅️
            </span>
            {[...Array(totalPages)].map((_, index) => {
              return (
                <span
                  className={page === index + 1 ? "pagination__selected" : ""}
                  key={index}
                  onClick={() => {
                    updatePage(index + 1);
                  }}
                >
                  {index + 1}
                </span>
              );
            })}
            <span
              className={page < totalPages ? "" : "pagination__disable"}
              onClick={() => {
                updatePage(page + 1);
              }}
            >
              ➡️
            </span>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
