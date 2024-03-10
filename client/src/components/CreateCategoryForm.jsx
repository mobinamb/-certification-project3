// CreateCategoryForm.jsx

import React, { useState } from 'react';
import axios from 'axios';
import config from '../../config';

const CreateCategoryForm = ({ personId, onCreateCategory }) => {
  const [categoryName, setCategoryName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCategorySubmit = async (event) => {
    event.preventDefault();
    try {
      // Make a POST request to create a new category
      const response = await axios.post(`${config.API_BASE_URL}/api/categories/${personId}`, {
        name: categoryName
      });
      
      console.log('Category created successfully:', response.data);
      setSuccessMessage('Category created successfully');
      // Update the person's categories array
      if (onCreateCategory) {
        onCreateCategory(response.data._id); // Pass the category ID to the parent component
      }
    } catch (error) {
      console.error('Error creating category:', error);
      setErrorMessage('Error creating category');
    }
  };

  return (
    <div>
      <h2>Create New Category</h2>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleCategorySubmit}>
        <label htmlFor="categoryName">Category Name:</label>
        <input
          type="text"
          id="categoryName"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          required
        />
        <button type="submit">Create Category</button>
      </form>
    </div>
  );
};

export default CreateCategoryForm;
