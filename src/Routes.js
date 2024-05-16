import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { HomeComponent } from './components/Body/HomeComponent/HomeComponent'
import { ProductDetail } from './components/ProductDetail/ProductDetail'

const GameSpotRoutes = () => (
  <Router>
    <Routes>
      <Route path='/home' element={<HomeComponent />} />
      <Route path='/deal/:id' element={<ProductDetail />} />
      <Route path='/' element={<Navigate replace to='/home' />} />
    </Routes>
  </Router>
)



export default GameSpotRoutes