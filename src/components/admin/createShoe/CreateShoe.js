import React, { useEffect, useState, useContext } from 'react'
import { GlobalContext } from '../../../context/GlobalState';
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
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Product Name</label>
                    <input type="text" required class="form-control" id="pname" aria-describedby="emailHelp" onChange={(e) => setName(e.target.value)} />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Price</label>
                    <input type="Number" required class="form-control" id="exampleInputPassword1" onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Choose File</label>
                    <input type="file" accept='image/*' required class="form-control" id="pname" aria-describedby="emailHelp" onChange={handleChange} />
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
export default CreateShoe
