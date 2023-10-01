import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from '../redux/casrtSlice';


export default function AddProduct(props) {

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    image:'',
    id: '',
    title: '',
    description: '',
    price: '',
  });

  // handles Changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handles Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct({ ...formData }));
    // Call the onSubmit function from props
    if (props.onSubmit) {
      props.onSubmit(formData);
    }
    

  };

  return (
    <>
      <form className='container' onSubmit={handleSubmit}>
        <h3>Enter Product Details</h3>
        <div className=" row">
          <div className="form-group my-2 col-md-3">
            <label>Product ID</label>
            <input type="text" className="form-control" id="id" name="id" onChange={handleChange} required />
          </div>
          <div className="form-group my-2 col-md-3">
            <label>Product Image</label>
            <input type="url" className="form-control" id="image" name="image" onChange={handleChange} required />
          </div>

        </div>
        <div className='row'>
          <div className="form-group my-2 col-md-3">
            <label>Product Description</label>
            <input type="text" className="form-control" id="description" name="description" onChange={handleChange} required />
          </div>
          <div className="form-group my-2 col-md-3">
            <label>Product Price</label>
            <input type="text" className="form-control" id="price" name='price' onChange={handleChange} required />
          </div>
          <div className='row'>
            <div className="form-group my-2 col-md-3">
              <label>Product Title</label>
              <input type="text" className="form-control" id="title" name="title" onChange={handleChange} required />
            </div>
            <div className='col-md-3 mt-4'>
              <button type='submit' className="btn btn-primary w-50 p-2 mt-2">Add</button>
            </div>
          </div>
        </div>
      </form>
   
    </>
  );
}
