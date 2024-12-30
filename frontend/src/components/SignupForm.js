import { useState} from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
const SignupForm = ( ) =>
{
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState("")

    const navigate = useNavigate()
    // const[empty,setEmpty]=useState([])

    const handleSubmit = async(e) =>{
        e.preventDefault()
        if (!name || !email || !password) {
            setError('All fields are required');
            return;
          }
        const user = {name,email,password}

        const response = await fetch('/auth/signup', {
            method:"POST",
            body: JSON.stringify(user),
            headers:{
                'Content-Type':'application/json'
            }
        })

        const json =await response.json()
        if (!response.ok){
            setError('Signup failed')
            // setEmpty(json.empty)

        }
        if (response.ok){
            setName('')
            setEmail("")
            setPassword("")
            setError(null)
            // setEmpty([])
            navigate('/auth/login')
            console.log("new member",json)
        }

        
    }
    
    return(
        <form className="signup" onSubmit={handleSubmit}>
            <h4>Signup</h4>

            <label>Name</label>
            <input type='text'
            onChange={(e)=> setName(e.target.value)}
            value={name}
            // className={empty.includes('title') ? 'error' : ''}
            
            />
        
        
               
    
            <label>Email</label>
                <input type='text'
                onChange={(e)=> setEmail(e.target.value)}
                value={email}
                />
            <label>Password</label>
                <input type='text'
                onChange={(e)=> setPassword(e.target.value)}
                value={password}
                />
        <p align="center"><button >Sign up</button></p>
        {error && <div className='error'>{error}</div>}
        <Link to='/auth/login'><p align="center">Already a user?</p></Link>
        </form>
        

    )
}

export default SignupForm