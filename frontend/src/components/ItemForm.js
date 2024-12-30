import { useState } from "react"
import Navbar from "../components/Navbar"
import { useNavigate } from "react-router-dom"

const ItemForm = () => {
    const navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [error, setError] = useState("")

    const categories = ["Electronics", "Books", "Stationary", "Money", "Other"]

    const handleSubmit = async (e) => {
        e.preventDefault()
        const item = { title, description, category }

        const response = await fetch('/api/items', {
            method: "POST",
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()
        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setTitle('')
            setDescription('')
            setCategory('')
            setError(null)
            console.log("Posted new item", json)
            navigate(0)
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <Navbar />
            <h3>What did you find?</h3>

            <label>Item Title</label>
            <input
                type='text'
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />

            <label>Item Description</label>
            <input
                type='text'
                onChange={(e) => setDescription(e.target.value)}
                value={description}
            />

            <label>Category</label>
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="">Select a Category</option>
                {categories.map((category, index) => (
                    <option key={index} value={category}>
                        {category}
                    </option>
                ))}
            </select>

            <button type="submit" style={{ display: 'block', marginTop: '10px' }}>Post</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default ItemForm
