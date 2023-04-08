import {createBrowserRouter , RouterProvider} from "react-router-dom"
import './App.css'
import Main from "./layouts/Main"
import Dashboard from "./pages/Dashboard"
import SignIn from "./pages/SignIn"
import Explore from "./pages/Explore"
import Search from "./pages/Search"
import PlaylistView from "./pages/PlaylistView"
import EnrolledPlaylist from "./pages/EnrolledPlaylist"
import PlaylistWatch from "./pages/PlaylistWatch"
import LandingPage from "./pages/LandingPage"
import Onboarding from "./pages/Onboarding"


function App() {
  const router = createBrowserRouter([
    {
      path : '/',
      element : <Main/>,
      children : [
        {
          index : true,
          element : <LandingPage/>
        } , 
        {
          path : 'signin',
          element : <SignIn/>
        },
        {
          path : 'onboarding',
          element : <Onboarding/>
        },
        {
          path : 'explore',
          element : <Explore/>
        },
        {
          path : 'search',
          element : <Search/>
        },
        {
          path : 'playlistview',
          element : <PlaylistView/>
        },
        {
          path : 'enrolledplaylist',
          element : <EnrolledPlaylist/>
        },
        {
          path : 'playlistwatch',
          element : <PlaylistWatch/>
        },
        {
          path : 'dashboard',
          element : <Dashboard/>
        }
      ]
    }
  ])
  return (
    <div className="App font-poppins">
      <RouterProvider router = {router}/>
    </div>
  )
}

export default App
