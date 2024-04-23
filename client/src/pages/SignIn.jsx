import Register from '../components/Register.jsx';
import Login from '../components/Login.jsx';

const SignIn = () => {
  return (
    <>
      <div className='row'>
        <div className='col'></div>
        <Register></Register>
      </div>
      <div className='col'></div>
      <Login></Login>
    </>
  )
}

export default SignIn;