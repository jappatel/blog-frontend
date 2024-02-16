import React, { useState, useEffect } from 'react';

function CategoryTree() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('http://localhost:5000/api/allblogs');
        const data = await response.json();
        setCategories(data.data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
    fetchCategories();
  }, []);



  function toggleCategoryVisibility(categoryId) {
    setCategories(prevCategories => {
      return prevCategories.map(category => {
        if (category._id === categoryId) {
          return { ...category, isExpanded: !category.isExpanded };
        } else {
          return { ...category, children: toggleChildrenVisibility(category.children, categoryId) };
        }
      });
    });
  }

  function toggleChildrenVisibility(children, categoryId) {
    return children.map(child => {
      if (child._id === categoryId) {
        return { ...child, isExpanded: !child.isExpanded };
      } else if (child.children.length > 0) {
        return { ...child, children: toggleChildrenVisibility(child.children, categoryId) };
      } else {
        return child;
      }
    });
  }

  function renderCategory(category) {
    return (
      <li key={category._id} className="border-b border-gray-200 py-2">
        <div className="flex items-center">
          {category.children.length > 0 && (
            <button className="mr-2" onClick={() => toggleCategoryVisibility(category._id)}>
              {category.isExpanded ? '-' : '+'}
            </button>
          )}
          <span>{category.name}</span>
        </div>
        {category.isExpanded && category.children.length > 0 && (
          <ul className="pl-4">
            {category.children.map(child => renderCategory(child))}
          </ul>
        )}
      </li>
    );
  }

  return (
    <div className='flex justify-center items-center'>
    <div className='flex flex-col'>
    <h1>Category Tree</h1>
      <ul>
        {categories.map(category => renderCategory(category))}
      </ul>
  </div>
  </div>
    
  );
}

export default CategoryTree;






// import React, { useEffect, useState } from 'react'
// import { fetchData } from './data'


// import TreeView from './Treeview';

// function Treeviewv(){

//     const [data,setData]= useState([]);

//     useEffect(()=>{
//         fetchData().then(fetchData => {
//             setData(fetchData);
//         })
//     },[])

//     console.log("data",data);
//   return (
//     <div className='flex justify-center items-center pb-80 '>
//         <div className="flex flex-col cursor-pointer "> 
//          <TreeView data={data}/>  
//     </div>
//     </div>
//   )
// }

// export default Treeviewv
