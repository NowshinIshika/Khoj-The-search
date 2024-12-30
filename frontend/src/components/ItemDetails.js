import formatDistanceToNow from 'date-fns/formatDistanceToNow'


const ItemDetails = ({item, onDelete}) =>
{ 
    const handleClick = async ( ) =>{

        const response = await fetch('api/items/' + item._id,{
            method:'DELETE'
        })
        const json = await response.json()
        if(response.ok){
        onDelete(item._id)
        console.log('Item Deleted', json)
            
        }
        if(!response.ok){
            console.error('Failed')

        }
    }
    
    return(
    <div className="item-details">
        <h4>{item.title}</h4>
        
        <p className= "item-description">{item.description}</p>
        <p>Posted: {formatDistanceToNow(new Date(item.createdAt),{addSuffix: true})}</p>
        <p>Status: {item.status}</p>
        <span onClick={handleClick}>X</span>
        

    </div>
)
}

export default ItemDetails