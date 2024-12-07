import { useEffect, useState } from "react"

//components
import ItemDetails from '../components/ItemDetails'


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

    return (
        <div classname = "home">
            <div className='items'>
                {items && items.map((item)=>(
                    <ItemDetails key={item._id} item={item}/>
      

                ))}
            </div>
        </div>
    )
}

export default Home