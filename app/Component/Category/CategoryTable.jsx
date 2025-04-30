"use client";
import { useEffect, useState } from "react";

function CategoryTable({ refreshFlag }) {
  const [categorydata, SetCategoryData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Adjust as needed

  const fetchcategories = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/get-category`);
      const data = await response.json();
      SetCategoryData([...data]);
    } catch (error) {
      console.log("Failed to fetch categories");
    }
  };


  useEffect(() => {
    fetchcategories();
  }, [refreshFlag]);

  const deletecategory = async (id) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/delete-categories/${id}`, {
        method: 'DELETE'
      });
      const result = await response.json();
      console.log(result.message);
      SetCategoryData(prev => prev.filter(cat => cat._id !== id));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };






  // Pagination logic
  const totalPages = Math.ceil(categorydata.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = categorydata.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left py-3 px-4 border-b">ID</th>
            <th className="text-left py-3 px-4 border-b">Category Name</th>
            <th className="text-left py-3 px-4 border-b">Category URL</th>
            <th className="text-left py-3 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((cat) => (
            <tr key={cat._id} className="hover:bg-gray-50">
              <td className="py-3 px-4 border-b">{cat._id}</td>
              <td className="py-3 px-4 border-b">{cat.Categoryname}</td>
              <td className="py-3 px-4 border-b">{cat.CatURL}</td>
              <td className="py-3 px-4 border-b space-x-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Edit</button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => deletecategory(cat._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="flex justify-center items-center mt-4 space-x-2">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default CategoryTable;
