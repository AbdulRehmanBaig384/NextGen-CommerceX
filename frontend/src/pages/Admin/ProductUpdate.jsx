import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from '../../redux/api/productApiSlice.js';
import { useFetchCategoriesQuery } from '../../redux/api/CategoryApiSlice.js';
import { toast } from 'react-toastify';
import AdminMenu from './AdminMenu.jsx';

const ProductUpdate = () => {
  const params = useParams();
  const { data: formData = {}, isLoading } = useGetProductByIdQuery(params._id);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [stock, setStock] = useState(0);

  const navigate = useNavigate();

  const { data: categories = [] } = useFetchCategoriesQuery();
  const [uploadProductImage] = useUploadProductImageMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (formData && formData._id) {
      setName(formData.name || '');
      setDescription(formData.description || '');
      setPrice(formData.price || '');
      setCategory(formData.category || '');
      setQuantity(formData.quantity || '');
      setBrand(formData.brand || '');
      setImage(formData.image || '');
      setStock(formData.countInStock || 0);
    }
  }, [formData]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const result = await uploadProductImage(formData).unwrap();
      toast.success('Image uploaded successfully');
      setImage(result.image); // Make sure your backend returns { image: "url" }
    } catch (error) {
      toast.error('Image upload failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare data as an object (not FormData)
      // Your backend likely expects JSON, not FormData, for update
      const productData = {
        name,
        description,
        price,
        category,
        quantity,
        brand,
        countInStock: stock,
        image,
      };

      const { data } = await updateProduct({ productId: params._id, productData });

      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success('Product has been successfully updated');
        navigate('/admin/allproductslist');
      }
    } catch (error) {
      console.error(error);
      toast.error('Product update failed. Try again.');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      const { data } = await deleteProduct(params._id);
      toast.success(`${data.name} is deleted`);
      navigate('/admin/allproductslist');
    } catch (error) {
      console.error(error);
      toast.error('Delete failed. Try again.');
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-3">
          <div className="h-12">Update Product</div>

          {image && (
            <div className="text-center">
              <img src={image} alt="product" className="block mx-auto max-h-[200px]" />
            </div>
          )}
          <div className="mb-3">
            <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className="hidden"
              />
              Upload Image
            </label>
          </div>

          <form onSubmit={handleSubmit} className="p-3">
            <div className="flex flex-wrap">
              <div className="one">
                <label htmlFor="name">Name</label>
                <br />
                <input
                  type="text"
                  id="name"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="two ml-10">
                <label htmlFor="price">Price</label>
                <br />
                <input
                  type="number"
                  id="price"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex flex-wrap">
              <div className="one">
                <label htmlFor="quantity">Quantity</label>
                <br />
                <input
                  type="number"
                  id="quantity"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </div>

              <div className="two ml-10">
                <label htmlFor="brand">Brand</label>
                <br />
                <input
                  type="text"
                  id="brand"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  required
                />
              </div>
            </div>

            <label htmlFor="description" className="my-5">
              Description
            </label>
            <textarea
              id="description"
              className="p-2 mb-3 bg-[#101011] border rounded-lg w-[95%] text-white"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>

            <div className="flex justify-between">
              <div>
                <label htmlFor="stock">Count In Stock</label>
                <br />
                <input
                  type="number"
                  id="stock"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="category">Category</label>
                <br />
                <select
                  id="category"
                  value={category}
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011]"
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-green-600 mr-6"
              >
                Update
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600"
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;

