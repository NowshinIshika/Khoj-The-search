import { useState} from 'react'

const ItemForm = ( ) =>
{
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [error, setError] = useState("")
    // const[empty,setEmpty]=useState([])

    const handleSubmit = async(e) =>{
        
        const item = {title,description}

        const response = await fetch('/api/items', {
            method:"POST",
            body: JSON.stringify(item),
            headers:{
                'Content-Type':'application/json'
            }
        })

        const json =await response.json()
        if (!response.ok){
            setError(json.error)
            // setEmpty(json.empty)

        }
        if (response.ok){
            setTitle('')
            setDescription("")
            setError(null)
            // setEmpty([])
            console.log("posted new item",json)
        }

        
    }
    
    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>What did you find?</h3>

            <label>Item Title</label>
            <input type='text'
            onChange={(e)=> setTitle(e.target.value)}
            value={title}
            // className={empty.includes('title') ? 'error' : ''}
            
            />
        
        
               
    
            <label>Item Description</label>
                <input type='text'
                onChange={(e)=> setDescription(e.target.value)}
                value={description}
                />
        <button>Post</button>
        {error && <div className='error'>{error}</div>}
        </form>

    )
}

export default ItemForm