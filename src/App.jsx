import {  useEffect, useState , useCallback } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { RoomReportLoader , Layout , Header , Footer , AuthLayout } from './components/index'
import { createBrowserRouter, createRoutesFromElements , Route  } from 'react-router-dom'
import {  Home , About , Articles , Login , SignUp , EditArticle , AddArticle , Article} from './Pages'
import { RouterProvider } from 'react-router-dom'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />} >
      <Route index element={<Home />} />

      <Route path='/about'  element={(<AuthLayout authentication={false} >
      <About />
      </AuthLayout>)} />

      <Route path='/login'  element={(<AuthLayout authentication={false} >
      <Login />
      </AuthLayout>)} />

      <Route path='/signup'  element={(<AuthLayout authentication={false} >
      <SignUp />
      </AuthLayout>)} />

      <Route path='/all-articles'  element={(<AuthLayout authentication={true} >
      <Articles />
      </AuthLayout>)} />

      <Route path='/new-article'  element={(<AuthLayout authentication={true} >
      <AddArticle />
      </AuthLayout>)} />

      <Route path='/edit-post/:slug'  element={(<AuthLayout authentication={true} >
      <EditArticle />
      </AuthLayout>)} />

      <Route path='/post/:slug'  element={<Article />} />
    </Route >
  )
  )


function App() {
  const dispatch = useDispatch();

  const [authLoading, setAuthLoading] = useState(true);
  const [loaderVisible, setLoaderVisible] = useState(true);

  const handleLoaderComplete = useCallback(() => {
    setLoaderVisible(false);
  }, []);

  useEffect(() => {
    let active = true;

    async function checkUser() {
      try {
        const userData = await authService.getCurrentUser();

        if (!active) return;

        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        if (!active) return;

        console.error("Unable to get current user:", error);
        dispatch(logout());
      } finally {
        if (active) {
          setAuthLoading(false);
        }
      }
    }

    checkUser();

  

    return () => {
      active = false;
    };
  }, [dispatch]);





  return (
    <>
      {loaderVisible && (
        <RoomReportLoader
          ready={!authLoading}
          onComplete={handleLoaderComplete}
        />
      )}

        
        <RouterProvider router={router} />
          
      
      
    </>
  );
}

export default App;

