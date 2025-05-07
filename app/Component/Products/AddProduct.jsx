'use client';

import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import Sidebar from '../Sidebar';
import { green, red } from '@mui/material/colors';

export default function AddProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();


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



  const onSubmit = async (data) => {
    debugger;
    if (imageFiles.length === 0) {
      alert('Please upload at least one image.');
      return;
    }

    const slugify = (name) =>
      name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '') // remove special chars
        .replace(/\s+/g, '-')         // replace spaces with -
    
    const productUrl = slugify(data.name)

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', parseFloat(data.price));
    formData.append('stock', parseInt(data.stock, 10));
    formData.append('categoryId', data.categoryId);
    formData.append('ProductUrl',productUrl);

    imageFiles.forEach(file => {
      formData.append('images', file);
    });

    try {
     
      console.log('Submitting Product:', formData);


      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/create-products`, {
        method: "POST",
       
        body: (formData)
      });
      
      const data = await response.json();
    
      SetProdMessage("Product created successfully!");
      
      reset();
      setImageFiles([]);
      setImagePreviews([]);
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
            <h2 className="text-2xl font-bold text-gray-800">Create New Product</h2>

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
              Create Product
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
