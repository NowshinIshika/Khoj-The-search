import { useState } from "react"
import { useNavigate } from "react-router"
import formatDistanceToNow from "date-fns/formatDistanceToNow"

const ItemDetails = ({ item, onDelete, onEdit }) => {
  const navigate = useNavigate()
  const categories = ["Electronics", "Books", "Stationary", "Money", "Other"]

  const handleClick = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete this item?")

    if (isConfirmed) {
      try {
        const response = await fetch('api/items/' + item._id, {
          method: 'DELETE',
        })
        const json = await response.json()
        if (response.ok) {
          onDelete(item._id)
          console.log('Item Deleted', json)
        } else {
          console.error('Failed to delete item', json)
        }
      } catch (error) {
        console.error('Error:', error.message)
      }
    } else {
      console.log('Item deletion canceled')
    }
  }

  const [isEditing, setIsEditing] = useState(false)
  const [editedData, setEditedData] = useState({
    title: item.title,
    description: item.description,
    category: item.category,
  })

  const handleEdit = async () => {
    try {
      const updatedData = { 
        title: editedData.title, 
        description: editedData.description,
        category: editedData.category,
      }

      const response = await fetch('api/items/' + item._id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      })
      const json = await response.json()

      if (response.ok) {
        console.log('Item Updated:', json)
        onEdit(item._id, updatedData)
        navigate(0)
      } else {
        console.error('Failed to update item:', json.message || 'Unknown error')
      }
    } catch (error) {
      console.error('Error:', error.message)
    }
  }

  const handleCancel = () => {
    setEditedData({ title: item.title, description: item.description, category: item.category })
    setIsEditing(false)
  }


  if (item.photo) {
    console.log(item.photo);
  }
  return (
    <div className="item-details">
      {isEditing ? (
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={editedData.title}
            onChange={(e) =>
              setEditedData({ ...editedData, title: e.target.value })
            }
          />
          <label>Description:</label>
          <textarea
            value={editedData.description}
            onChange={(e) =>
              setEditedData({ ...editedData, description: e.target.value })
            }
          />
          <label>Category:</label>
          <select
            value={editedData.category}
            onChange={(e) =>
              setEditedData({ ...editedData, category: e.target.value })
            }
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          <button onClick={handleEdit}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <>
          <h4>{item.title}</h4>
          <p className="item-description">{item.description}</p>
          
          {item.photo &&  (
            
        <img
            src={`http://localhost:3000${item.photo}`}
            alt={item.title}
            style={{ width: 'auto', height: 'auto' }}
        />

            
          )}
          <p>Category: {item.category}</p>
          <p>
            Posted:{" "}
            {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
          </p>
          <p>Status: {item.status}</p>
          <span style={{ backgroundColor: 'green', color: 'white' ,padding: '10px 10px',marginRight: '45px'}}  onClick={() => setIsEditing(true)}>Edit</span>
          <span onClick={handleClick}>X</span>
        </>
      )}
    </div>
  )
  
}

export default ItemDetails
