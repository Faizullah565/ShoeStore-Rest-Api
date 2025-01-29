import React, { useEffect, useState, useContext } from 'react'
import { GlobalContext } from '../../context/GlobalState';
import { toast } from 'react-toastify';
import axios from 'axios';

function CreateShoe() {
    const [pName, setName] = useState('');
    const [pPrice, setPrice] = useState(0);
    const [file, setFile] = useState('');
    const [image, setIamage] = useState('')
    const { addShoes } = useContext(GlobalContext)

    function handleChange(event) {
        setIamage(event.target.files[0])
        setFile(event.target.files[0])
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append("image", image)
        formData.append("name", pName)
        formData.append("price", pPrice)
        formData.append("qty", 1)
        formData.append("id", new Date().getTime())
        console.log(formData)

        const result = await axios.post(
            "http://localhost:5000/api/AddShoe/upload-image",
            formData,
            {
                headers: { "content-Type": "multipart/form-data" },
            }
        );
        console.log(pName, pPrice, file)
        const shoe = {
            id: new Date().getTime(),
            name: pName,
            price: pPrice,
            qty: 0,
            file: file.name
        }
        addShoes(shoe)
        toast.success("Successfully Created Shoe")
    }
    return (
        <div className="container mx-auto p-20">
  <form onSubmit={handleSubmit}>
    <div className="mb-4">
      <label htmlFor="pname" className="block text-gray-700 text-sm font-semibold">Product Name</label>
      <input
        type="text"
        required
        className="form-input mt-2 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        id="pname"
        onChange={(e) => setName(e.target.value)}
      />
    </div>
    
    <div className="mb-4">
      <label htmlFor="price" className="block text-gray-700 text-sm font-semibold">Price</label>
      <input
        type="number"
        required
        className="form-input mt-2 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        id="price"
        onChange={(e) => setPrice(e.target.value)}
      />
    </div>

    <div className="mb-4">
      <label htmlFor="fileInput" className="block text-gray-700 text-sm font-semibold">Choose File</label>
      <input
        type="file"
        accept="image/*"
        required
        className="form-input mt-2 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        id="fileInput"
        onChange={handleChange}
      />
    </div>

    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
      Submit
    </button>
  </form>
</div>

    )
}
export default CreateShoe
