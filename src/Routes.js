import { Route, Routes, Navigate } from 'react-router-dom'
import { HomeComponent } from './components/Body/HomeComponent/HomeComponent'
import { ProductDetail } from './components/ProductDetail/ProductDetail'
//! Disabled since this is a Javascript file, we cannot strong type here
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const GameSpotRoutes = () => (
    <Routes>
      <Route path='/home' element={<HomeComponent />} />
      <Route path='/deal/:id' element={<ProductDetail />} />
      <Route path='/' element={<Navigate replace to='/home' />} />
    </Routes>
)



export default GameSpotRoutes