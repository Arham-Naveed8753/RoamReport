import React , {useState} from 'react'
import authService from '../../appwrite/auth'
import { login as storeLogin } from '../../store/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Input , Button } from '../../components'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
function SignUp() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [error , setError] = useState('')
  const {register , handleSubmit , watch , formState : {errors}} = useForm()

  

  const password = watch('password' , '')

  

  const signUp = async (data) => {
     setError('')
     try {
      const userData = await authService.signUp(data)
      if (userData) {
        const user = await authService.getCurrentUser()
        if (user) {
          dispatch(storeLogin(user))
          navigate('/')
        }
      }
      
     } catch (error) {
      setError(error.message)
     }
     
  }


 return (
    <div className="min-h-screen w-full flex font-jakrta bg-skin text-brown">
      
      
      <div className="h-dvh hidden lg:flex lg:w-1/2 bg-blue text-cream p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-light-blue/20 blur-3xl pointer-events-none"></div>
        
        <div>
          <span className="font-xanhMono text-one_two uppercase tracking-zero-zero_two_five bg-olive/30 px-3 py-1 rounded-full text-cream">
            The Roam Report
          </span>
        </div>

        <div className="my-auto space-y-6">
          <h1 className="font-gaseok text-four_five leading-[95%] tracking-minus_zero_eight text-cream">
            Begin Your Journey.
          </h1>
          <p className="text-one_two text-cream/90 max-w-md font-jakrta">
            Stories and photos of long walks, wrong turns, and everyday discoveries. Create an account to save your favorite itineraries.
          </p>
        </div>

        <div className="text-one_eight_seven_five text-cream/70 font-xanhMono">
          © 2026 · Less rush. More wonder.
        </div>
      </div>

      {/* Right Column - Signup Form Panel */}
      <div className=" w-full lg:w-1/2 flex items-center justify-center p-8 sm:py-2 sm:p-12 bg-skin">
        <div className="w-full max-w-md bg-white p-8 sm:p-10 sm:py-8 rounded-3xl shadow-xl border border-gray/10">
          
          <div className="mb-2">
            <h2 className="font-gaseok text-two text-brown mb-1">
              Create an account
            </h2>
           
          </div>

          {/* Form Fields */}
          <form onSubmit={handleSubmit(signUp)} className="space-y-2">
            <div>
              <Input
              label='Full Name'
              placeholder='Enter your FullName'
              type='text'
              className='w-full px-4 py-3 bg-skin/50 border border-gray/30 rounded-xl text-one text-brown focus:outline-none focus:ring-2 focus:ring-blue transition-all'
              {...register('name' , {
                required : true ,
                min : 2 ,
                max : 20
              })}

              />
            </div>

            <div>
             <Input 
             label='Email'
             placeholder='Enter your Email'
             type='email'
             className='w-full px-4 py-3 bg-skin/50 border border-gray/30 rounded-xl text-one text-brown focus:outline-none focus:ring-2 focus:ring-blue transition-all'
             {...register(
                   'email' ,
                  {
                    required : true ,
                    validate : {
                      matchPattern : (value) => /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(value) || 'Email address must be a valid address '
                    }
                  }
                )}
              />
              {errors.email && <p className='text-red-300 text-eight_seven_five text-start font-jakrta mt-2'>{errors.email.message}</p>}
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
                {errors.password && <p className='text-red-300 text-eight_seven_five text-start font-jakrta mt-2'>{errors.password.message}</p>}
            </div>

            <div>
              <Input 
              label='Confirm Password'
              placeholder='Pleace Confirm your Password'
              type='password'
              className='w-full px-4 py-3 bg-skin/50 border border-gray/30 rounded-xl text-one text-brown focus:outline-none focus:ring-2 focus:ring-blue transition-all'
              {...register(
                'confirmPassword' ,
                {
                  required : true ,
                  validate : (value)=> value === password || 'Password do not match'
                }
              )}
              />
              {errors.confirmPassword && <p className='text-red-300 text-eight_seven_five text-start font-jakrta mt-2'>{errors.confirmPassword.message}</p>}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 bg-blue text-cream font-semibold text-one_two rounded-xl hover:bg-dark-blue transition-colors shadow-lg shadow-blue/20 cursor-pointer"
              >
                Create Account
              </button>
            </div>
          </form>

          {/* Footer alternative switcher */}
          <div className="mt-6 text-center text-one text-gray">
            <p>
              Already have an account?{' '}
              <button onClick={() => navigate('/login')} className="text-blue font-semibold hover:underline cursor-pointer">
                  Sign in
                </button>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default SignUp