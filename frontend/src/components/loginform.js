import { useState} from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
const LoginForm = ( ) =>
{
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState("")

    const navigate = useNavigate()
    // const[empty,setEmpty]=useState([])

    const handleSubmit = async(e) =>{
        e.preventDefault()
        if (!email || !password) {
            setError('All fields are required');
            return;
          }
        const user = {email,password}

        const response = await fetch('/auth/login', {
            method:"POST",
            body: JSON.stringify(user),
            headers:{
                'Content-Type':'application/json'
            }
        })

        const json =await response.json()
        if (!response.ok){
            setError('Wrong username or password')
            // setEmpty(json.empty)

        }
        if (response.ok){
            
            setEmail("")
            setPassword("")
            setError(null)

            if (json.success) {
                localStorage.setItem(
                    "user",
                    JSON.stringify({
                        _id: json._id,
                        email: json.email,
                        name: json.name,
                        jwtToken: json.jwtToken,
                    })
                );}
            // setEmpty([])
            navigate('/home')
           

        
    }
}
    return(
        <form className="signup" onSubmit={handleSubmit}>
            <h3 align="center">Login</h3>
        
                   
    
            <label>Email</label>
                <input type='text'
                onChange={(e)=> setEmail(e.target.value)}
                value={email}
                />
            <label>Password</label>
                <input type='password'
                onChange={(e)=> setPassword(e.target.value)}
                value={password}
                />
        <p align="center"><button >Login</button></p>
        {error && <div className='error'>{error}</div>}
        <Link to=''><p align="center">Forgot password?</p></Link>
        </form>
        

    )
}


export default LoginForm