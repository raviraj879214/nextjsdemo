'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CategoryTable from './CategoryTable';



function CategoryAdd({ id }) {
  const [categorymessage , setCategoryMessage] = useState("");
  const [refreshFlag, setRefreshFlag] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit =async (data) => {
    console.log('Form submitted:', { id, ...data });
    const payload = {
      Categoryname: data.CategoryName,
      CatURL: data.CategoryURL
    };
    const response = await fetch("http://localhost:5000/api/create-product",{
      method : "POST",
      headers : { "Content-Type": "application/json"},
      body: JSON.stringify(payload)
    });
    const result = await response.json();
    if (response.ok)
    {
      reset({
        CategoryName: "",
        CategoryURL: "",
      });
      setCategoryMessage("Category created successfully!");
      delayedFunction();
    } 
    else
     {
      reset({
        CategoryName: "",
        CategoryURL: "",
      });
      setCategoryMessage(`Error: ${result.message}`);
      delayedFunction();
    }
  };

  const Categoryurlcreate=(data)=>{
    const slug = data
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
    setValue("CategoryURL",slug);
  }


  const delayedFunction = () => {
    setTimeout(() => {
      setCategoryMessage("");
    }, 3000);
    setRefreshFlag(prev => !prev);
  };
  

  return (<>
    <div className="w-full px-4 sm:px-6 lg:px-8 mt-10">
      <div className="w-full bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add New Category</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
           <p style={{color : "red"}}> {categorymessage}</p>

          <div>
            <label htmlFor="CategoryName" className="block text-sm font-medium text-gray-700">
              Category 
            </label>
            <input
              id="CategoryName"
              type="text"
              {...register('CategoryName', { required: 'Category name is required' })}
              placeholder="e.g. Clothes"
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.CategoryName ? 'border-red-500' : 'border-gray-300'
              } rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`} onChange={(e)=>Categoryurlcreate(e.target.value)}/>


            {errors.CategoryName && (
              <p className="text-red-500 text-sm mt-1">{errors.CategoryName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="CategoryURL" className="block text-sm font-medium text-gray-700">
              Category URL
            </label>
            <input
              id="CategoryURL"
              type="text"
              {...register('CategoryURL', {
                required: 'Category URL is required',
                pattern: {
                  value: /^[a-z0-9-]+$/,
                  message: 'Only lowercase letters, numbers, and dashes allowed',
                },
              })}
              placeholder="e.g. clothes"

              className={`mt-1 block w-full px-4 py-2 border ${
                errors.CategoryURL ? 'border-red-500' : 'border-gray-300'
              } rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`} disabled ={true}/>

          </div>
          <div>

            <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition duration-200">
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>

    <CategoryTable  refreshFlag = {refreshFlag} />


</>);
}

export default CategoryAdd;
