"use client"
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect,useState } from 'react';
import { useRouter } from 'next/navigation';








export default function ManageProduct() {

    const [rows,setRows] = useState([]);
    const router = useRouter();




    const columns = [
        { field: 'name', headerName: 'Name', width: 150, editable: true },
        { field: 'price', headerName: 'Price', type: 'number', width: 100, editable: true },
        { field: 'stock', headerName: 'Stock', type: 'number', width: 100, editable: true },
        {
            field: 'imageUrl',
            headerName: 'Image',
            width: 120,
            renderCell: (params) => (
                <img
                src={params.value}
                alt="Product"
                style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }}
                />
            ),
        },

        { field: 'categoryId', headerName: 'Category Name', width: 200 },
        {
          field: 'actions',
          headerName: 'Actions',
          width: 150,
          renderCell: (params) => (
            <Box>
         
              <IconButton onClick={() => handleEdit(params.row)} aria-label="edit">
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDelete(params.row)} aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </Box>
          ),
        },
      ];
      
     
      
      const rowsd = [
        {
          id: 1,
          name: 'Product A',
          price: 29.99,
          stock: 50,
          imageUrl: 'https://example.com/product-a.jpg',
          categoryId: '64fe7ab5dc3b2f6f2bc6e987',
        },
        {
          id: 2,
          name: 'Product B',
          price: 45.0,
          stock: 30,
          imageUrl: 'https://example.com/product-b.jpg',
          categoryId: '64fe7ab5dc3b2f6f2bc6e988',
        },
      ];
      

      
      const handleEdit = (row) => {
        console.log('Edit', row);


          router.push(`/update-product/${row.id}`);


      };
      
      const handleDelete =async (row) => 
      {
            debugger;
        const response  = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/delete-product/${row.id}`,{

            method: "DELETE",
            headers:{

                "Content-Type" : "application/json"
            }
        });

        const result = response.json();

        if (response.ok) {
            console.log('Deleted:', result.message);
            fetchProductByCategories();
          } else {
            console.log('Failed to delete:', result.message);
          }
      };
      

      const fetchProductByCategories = async () => {
        try {
          debugger;
          const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/get-products`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          });
      
          
      
          const result = await response.json();
      
          // If your API returns an array of products with _id instead of id
          // You may need to map _id to id for DataGrid compatibility
          const formattedData = result.map((product, index) => ({
            id: product._id || index, // fallback to index if _id not available
            name: product.name,
            price: product.price,
            stock: product.stock,
            imageUrl: `${process.env.NEXT_PUBLIC_APP_URL}${product.imageUrl}`,
            categoryId: product.categoryId?.Categoryname || product.categoryId, // optional chaining for populated category
          }));
      
          setRows(formattedData);
        
        } catch (error) {
          console.log("Error fetching products:", error.message);
        }
      };


      useEffect(()=>{
        fetchProductByCategories();
      },[]);









  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      <Box sx={{ minWidth: 850 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
}
