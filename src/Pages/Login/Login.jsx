import React , {useState} from 'react'
import authService from '../../appwrite/auth'
import { login as storeLogin } from '../../store/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Input , Button } from '../../components'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'



function Login() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [error , setError] = useState('')
  const {register , handleSubmit} = useForm();

  




  const login = async (data)=>{
    setError('')
    try {
      const session = await authService.login(data)
      if (session) 
        {
        const userData = await authService.getCurrentUser()
        
        if (userData) dispatch(storeLogin(userData))
      navigate('/')
      }
    } 
    catch (error) {
      setError(error.message)
    }
  }




  return (
    <div className="min-h-screen w-full flex font-jakrta bg-skin text-brown">
      
      {/* Left Column - Aesthetic Visual / Branding Panel */}
      <div className="h-dvh hidden lg:flex lg:w-1/2 bg-blue text-cream p-10  flex-col justify-between relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-light-blue/20 blur-3xl pointer-events-none"></div>
        
        <div>
          <span className="font-xanhMono text-one_two uppercase tracking-zero-zero_two_five bg-olive/30 px-3 py-1 rounded-full text-cream">
            The Roam Report
          </span>
        </div>

        <div className="my-auto space-y-6">
          <h1 className="font-gaseok text-four_five leading-[95%] tracking-minus_zero_eight text-cream">
              Welcome Back, Wanderer. 
          </h1>
          <p className="text-one_two text-cream/90 max-w-md font-jakrta">
            Stories and photos of long walks, wrong turns, and everyday discoveries. Access your saved itineraries and notes.
          </p>
        </div>

        <div className="text-one_eight_seven_five text-cream/70 font-xanhMono">
          © 2026 · Less rush. More wonder.
        </div>
      </div>

      {/* Right Column - Form Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 bg-skin">
        <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-gray/10">
          
         

          <div className="mb-6">
            <h2 className="font-gaseok text-two text-brown mb-2 text-center">
              Sign in to your account
            </h2>
            <p className='text-red-300 text-eight_seven_five text-start font-jakrta mt-2'>{error}</p>
          </div>

          {/* Form Fields */}
          <form onSubmit={handleSubmit(login)} className="space-y-5">
            
              <div>
                <Input 
                className='w-full px-4 py-3 bg-skin/50 border border-gray/30 rounded-xl text-one text-brown focus:outline-none focus:ring-2 focus:ring-blue transition-all'
                label = 'Email'
                placeholder = 'Enter Your Email'
                type='email'
               {...register(
                   'email' ,
                  {
                    required : true ,
                    validate : {
                      matchPattern : (value) => /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(value) || 'Email address must be a valid address '
                    }
                  }
                )}/>
                
                
              </div>
            

            <div>
              <Input 
              className='w-full px-4 py-3 bg-skin/50 border border-gray/30 rounded-xl text-one text-brown focus:outline-none focus:ring-2 focus:ring-blue transition-all'
              label='Password'
              placeholder='Enter Your Password'
              type='password'
              {...register(
                'password' ,
                {
                  required : true ,
                  validate : {
                    matchPattern : (value)=> /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(value) || 'Must contain Atleast one UPPERCASE and one lowercase and must be atleast 8 characters'
                  }
                }
              )}
              />
              
            </div>

            

            
              <Button 
              type='submit'
              className='w-full py-3.5 bg-blue text-cream font-semibold text-one_two rounded-xl hover:bg-dark-blue transition-colors shadow-lg shadow-blue/20 cursor-pointer'
              > Sign in </Button>
            
          </form>

          {/* Footer alternative switcher */}
          <div className="mt-8 text-center text-one text-gray">
            
              <p>
                Don't have an account?{' '}
                <button onClick={() => navigate('/signup')} className="text-blue font-semibold hover:underline">
                  Sign up
                </button>
              </p>
             
              
           
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login