import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Layout } from "./components"
import { Books, Error, Home, Login, Profile, SignUp, SingleBook } from "./pages"
import { LoginProtected, UserProtected } from "./providers"



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/books' element={<Books />} />
          <Route path='/books/:id' element={<SingleBook />} />

          <Route element={<LoginProtected />}>
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
          </Route>

          <Route element={<UserProtected />}>
            <Route path='/profile' element={<Profile />} />
          </Route>

          <Route path='*' element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
