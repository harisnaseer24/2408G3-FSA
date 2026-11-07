import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";


//prop
const Products = ({apiProducts}) => {
  return (
    <div className="container py-5">
      {/* Elegant Heading */}
      <div className="text-center mb-5">
        <p 
          style={{
            color: "#a05260",
            fontSize: "0.9rem",
            letterSpacing: "3px",
            fontWeight: "600",
            fontFamily: "'Poppins', sans-serif",
            textTransform: "uppercase"
          }}
        >
          Our Products
        </p>

        <h2 
          style={{
            fontSize: "2.7rem",
            fontFamily: "'Playfair Display', serif",
            fontWeight: "600",
            fontStyle: "italic",
            color: "#a05260",
            marginBottom: "0"
          }}
        >
      Discover the Essence of Dior
        </h2>
      </div>

      {/* Products */}
      <div className="row">
        {apiProducts.map((item, index) => (
          <div className="col-md-3 mb-4" key={index}>
            <Link to={`/product/${index}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <ProductCard
                id={index}
                img={item.images[0]}
                title={item.title}
                oldPrice={item.price}
                newPrice={item.price}
              />
            </Link>
          </div>
        ))}
      </div>

      {/* View Button */}
      <div className="text-center mt-4">
        <button className="btn btn-danger btn-lg rounded-pill px-5">
          View All Perfumes
        </button>
      </div>
    </div>
  );
};

export default Products;
