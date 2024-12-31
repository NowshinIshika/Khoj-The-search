import { useEffect, useState } from "react"

//components
import ItemDetails from '../components/ItemDetails'
import ItemForm from "../components/ItemForm"


const Home = () => {
    const [items,setItems]=useState(null)
    
    

    useEffect(()=>{
        const fetchItems = async() =>{
            const response = await fetch('/api/items')
            const json = await response.json()

            if (response.ok){
                setItems(json)
            }
        }
        fetchItems()
    }, [])

    const deleteItem = async(id) =>
    {
        setItems((prevItems)=> prevItems.filter((item)=>item._id !==id))
        const updatedItems = await fetchItems(); 
        setItems(updatedItems);
    
    }

    const fetchItems = async () => {
        const response = await fetch('/api/items')
        const json = await response.json()
        return json
    }

    return (
                
        <div className = "home">
            
            <ItemForm />
            <div className='item-list'>
                {items && items.map((item)=>(
                    <ItemDetails key={item._id} item={item} onDelete={deleteItem}/>
      

                ))}
            </div>
            
        </div>
    )
}

export default Home