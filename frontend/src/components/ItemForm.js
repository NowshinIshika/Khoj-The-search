import { useState } from "react"
import Navbar from "../components/Navbar"
import { useNavigate } from "react-router-dom"

const ItemForm = () => {
    const navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [error, setError] = useState("")
    const [photo, setPhoto] = useState(null)

    const categories = ["Electronics", "Books", "Stationary", "Money", "Other"]

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("title", title)
        formData.append("description", description)
        formData.append("category", category)
        formData.append("photo", photo)


        try {
            const response = await fetch('/api/items', {
                method: "POST",
                body: formData,
            })

            const json = await response.json()
            if (!response.ok) {
                setError(json.error)
            } else {
                setTitle("")
                setDescription("")
                setCategory("")
                setPhoto(null)
                setError(null)
                console.log("Posted new item", json)
                navigate(0)
            }
        } catch (err) {
            console.error("Error:", err)
            setError("Something went wrong!")
        }
    }

    const handlePhoto = (e) => {
        setPhoto(e.target.files[0])
    }

    return (
        <form className="create" onSubmit={handleSubmit} encType="multipart/form-data">
            <Navbar />
            <h3>What did you find?</h3>

            <label>Item Title</label>
            <input
                type='text'
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                required
            />

            <label>Item Description</label>
            <input
                type='text'
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                required
            />

            <label>Category</label>
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
            >
                <option value="">Select a Category</option>
                {categories.map((category, index) => (
                    <option key={index} value={category}>
                        {category}
                    </option>
                ))}
            </select>

            <label>Upload Photo</label>
            <input
                type="file"
                accept="image/*"
                onChange={handlePhoto}
            />

            <button type="submit" style={{ display: 'block', marginTop: '10px' }}>Post</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default ItemForm
