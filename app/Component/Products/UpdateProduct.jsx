'use client';

import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import Sidebar from '../Sidebar';
import { green, red } from '@mui/material/colors';
import { useRouter } from 'next/navigation';

export default function UpdateProduct({id}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();
  const router = useRouter();
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [categories,SetCategories] = useState([]);
  const [prodmsg,SetProdMessage] = useState("");
 
  const fetchcategories=async ()=>{
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/get-category`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      SetCategories(data);


      const productResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/get-product-id/${id}`);
      const product = await productResponse.json();
      setValue("categoryId", product.categoryId);
  }

  useEffect(()=>{
    fetchcategories();
  },[]);

  const onDrop = useCallback((acceptedFiles) => {
    const newPreviews = acceptedFiles.map(file => URL.createObjectURL(file));
    setImageFiles(prev => [...prev, ...acceptedFiles]);
    setImagePreviews(prev => [...prev, ...newPreviews]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    multiple: true,
    onDrop,
  });

  const removeImage = (index) => {
    setImageFiles(prev => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });

    setImagePreviews(prev => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  };



  const fetchProductById = async (id) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/get-product-id/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
  
      const result = await response.json();
  
      if (response.ok) {
        console.log("Fetched product:", result);

        setValue("name", result.name);
        setValue("description", result.description);
        setValue("price", result.price);
        setValue("stock", result.stock);
        setValue("categoryId", result.categoryId);

        console.log(`${process.env.NEXT_PUBLIC_APP_URL}${result.imageUrl}`);
        setImagePreviews([`${process.env.NEXT_PUBLIC_APP_URL}${result.imageUrl}`]);
        
        return result; // return the data if needed
      } else {
        console.log("Error fetching product:", result.message || result);
      }
    } catch (error) {
      console.log("Fetch failed:", error.message);
    }
  };
  

      useEffect(()=>{
        fetchProductById(id);
      },[]);






  const onSubmit = async (data) => {
    debugger;
    

    if (imagePreviews.length === 0) {
      alert('Please upload at least one image.');
      return;
    }


    const formData = new FormData();
    formData.append('id',id);
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', parseFloat(data.price));
    formData.append('stock', parseInt(data.stock, 10));
    formData.append('categoryId', data.categoryId);

    imageFiles.forEach(file => {
      formData.append('images', file);
    });
    
    try {
     
      console.log('Submitting Product:', formData);


      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/update-product`, {
        method: "PUT",
        body: (formData)
      });
      
      const data = await response.json();
    
      SetProdMessage("Product updated successfully!");
      

      reset();
      setImageFiles([]);
      setImagePreviews([]);
      router.push("/manage-product");
    } catch (err) {
      console.error(err);
      alert('Error creating product.');
    }
  };

  return (
    <div className="flex min-h-screen">
      <aside className="text-white">
        <Sidebar />
      </aside>
      <main className="flex-1 bg-gray-100 p-6">
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white w-full max-w-2xl p-8 rounded-2xl shadow-lg space-y-6"
          >
            <p style={{color:green}}>{prodmsg}</p>
            <h2 className="text-2xl font-bold text-gray-800">Update  Product </h2>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Name</label>
              <input
                {...register('name', { required: 'Name is required' })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Description</label>
              <textarea
                {...register('description', { required: 'Description is required' })}
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium text-gray-700">Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  {...register('price', {
                    required: 'Price is required',
                    min: { value: 0, message: 'Price must be positive' },
                  })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">Stock</label>
                <input
                  type="number"
                  {...register('stock', {
                    required: 'Stock is required',
                    min: { value: 0, message: 'Stock must be positive' },
                  })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>}
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Product Images</label>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-6 cursor-pointer transition ${
                  isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'
                }`}
              >
                <input {...getInputProps()} />
                <p className="text-center text-gray-500">
                  {isDragActive ? 'Drop the images here...' : 'Drag & drop images here, or click to browse'}
                </p>
              </div>

              <div className="flex gap-4 mt-4 flex-wrap">
                {imagePreviews.map((src, index) => (
                  <div key={index} className="relative">
                    <img
                      src={src}
                      alt={`Preview ${index}`}
                      className="w-24 h-24 object-cover rounded border"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center -translate-x-1 translate-y-1"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Category</label>
              <select
                {...register('categoryId', { required: 'Category is required' })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat._id} value={cat._id}>
                    {cat.Categoryname}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <p className="text-red-500 text-sm mt-1">{errors.categoryId.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
            >
              Update Product
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
