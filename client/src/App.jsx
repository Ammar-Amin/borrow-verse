import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Layout } from "./components"
import { Books, Cart, Error, Home, Login, Profile, ReadList, SignUp, SingleBook } from "./pages"
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
            <Route path='/read-list' element={<ReadList />} />
            <Route path='/cart' element={<Cart />} />
          </Route>

          <Route path='*' element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
