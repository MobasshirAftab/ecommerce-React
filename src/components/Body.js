import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/casrtSlice';
import AddProduct from './Addproduct';
import { uid } from 'uid';


function Body( ) {
  const [addproducts, setAddProducts] = useState({});
  const getProduct = (data) => {
    setAddProducts({ ...data });
  };

  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editProductTitle, setEditProductTitle] = useState("");
  const [editProductPrice, setEditProductPrice] = useState(null);
  const [editProductDescription, setEditProductDescription] = useState("");
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc"); // Default sorting order is ascending

  //API CALL
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        let mergedProducts = response.data;

        // Merge addproducts if it's an object
        if (addproducts && typeof addproducts === "object") {
          mergedProducts = [...mergedProducts, addproducts];
        }

        setProducts(mergedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [addproducts]);

  // Update Product
  const updateProduct = async () => {
    try {
      await axios.put(`https://fakestoreapi.com/products/${selectedProductId}`);
      const updatedProduct = products.map((product) => {
        if (product.id === selectedProductId) {
          product.title = editProductTitle;
          product.description = editProductDescription;
          product.price = editProductPrice;
        }
        return product;
      });
      setProducts(updatedProduct);
    } catch (error) {
      console.error("Error updating product:", error);
    }
    alert("Product updated successfully.");
  };
  // Edit Product
  const editProduct = (id) => {
    setShowForm(true);
    let newEditProduct = products.find((elem) => {
      return elem.id === id;
    });

    setSelectedProductId(id);
    setEditProductTitle(newEditProduct.title);
    setEditProductDescription(newEditProduct.description);
    setEditProductPrice(newEditProduct.price);
  };

  // delete PRODUCT
  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`https://fakestoreapi.com/products/${productId}`);
      const updatedProductList = products.filter(
        (product) => product.id !== productId
      );
      setProducts(updatedProductList);
      alert("Item deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  // Sort Products
  const sortProducts = () => {
    const sortedProducts = [...products].sort((a, b) => {
      if (sortOrder === "asc") {
        return b.price - a.price;
      } else {
        return a.price - b.price;
      }
    });
    setProducts(sortedProducts);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc"); // Toggle sorting order
  };

  return (
    <>
      <AddProduct onSubmit={getProduct} />
      <h1>Products list</h1>
      <button onClick={sortProducts}>
        Sort by Price ({sortOrder === "asc" ? "Low to High" : "High to Low"})
      </button>
      {showForm && (
        <div className="edit-album">
          <h2 className="form-title">Edit Product Details</h2>
          <label className="mx-2">Product Title</label>
          <input
            type="text"
            value={editProductTitle}
            onChange={(e) => setEditProductTitle(e.target.value)}
          />
          <label className="mx-2">Product Description</label>
          <input
            type="text"
            value={editProductDescription}
            onChange={(e) => setEditProductDescription(e.target.value)}
          />
          <label className="mx-2">Product Price</label>
          <input
            type="text"
            value={editProductPrice}
            onChange={(e) => setEditProductPrice(e.target.value)}
          />
          <button className="update-button mx-2" onClick={updateProduct}>
            Update
          </button>
        </div>
      )}
      <ul>
        {products.map((product) => (
          <li
            key={uid()}
            className="list-item my-4 mx-4"
            style={{ width: 300 }}
          >
            <div className="card">
              <img src={product.image} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <h5>Price: ${product.price}</h5>
                <p className="card-text">{product.description}</p>
                <button
                  className="btn btn-primary mx-2"
                  onClick={() =>
                    dispatch(
                      addToCart({
                        id: product.id,
                        image: product.image,
                        price: product.price,
                      })
                    )
                  }
                >
                  Add to Cart
                </button>
                <button
                  className="btn btn-primary mx-2"
                  onClick={() => editProduct(product.id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => deleteProduct(product.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Body;
