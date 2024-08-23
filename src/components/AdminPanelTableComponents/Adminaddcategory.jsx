import '../../styles/Adminaddcategory.css';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';

function AddCategory() {
    const categoryNameRef = useRef('');
    const imageRef = useRef(null); // for file upload
    const [categoryName, setCategoryName] = useState('');
    const navigate = useNavigate();

    function handleCategory(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('categoryName', categoryName);
        formData.append('image', imageRef.current.files[0]); // Assuming the image is uploaded

        fetch('http://localhost:5000/categories', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`, // Include JWT
            },
            body: formData, // Sending form data
        })
            .then(response => response.json())
            .then(data => {
                console.log("Category added:", data);
                if (data.status === 'success') {
                    // Redirect to homepage or another page after success
                    alert("The new category has been addded successfully")
                    handleCancel()
                }
            })
            .catch(err => console.error("Error:", err));
    }
    function handleCancel() {
        window.location.reload()
    }


    return (
        <div className="shadow rounded p-4 position-absolute w-50 top-50 start-50 translate-middle addcategoryCard">
            <h2 className="text-center">Add Category</h2>
            <form onSubmit={handleCategory}>
                <label htmlFor="categoryName">Category Name:</label>
                <input
                    type="text"
                    className="form-control mb-3 mt-1"
                    id="categoryName"
                    ref={categoryNameRef}
                    onChange={(e) => setCategoryName(e.target.value)}
                />
                <label htmlFor="categoryImage">Category Image:</label>
                <input
                    type="file"
                    className="form-control mb-3 mt-1"
                    id="categoryImage"
                    ref={imageRef}
                />
                <div>
                    <button className="btn btn-dark mt-4 px-5" type="submit">Add Category</button>
                    <button className="btn btn-secondary ms-2 mt-4 px-5" onClick={handleCancel} type="button">Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default AddCategory;
