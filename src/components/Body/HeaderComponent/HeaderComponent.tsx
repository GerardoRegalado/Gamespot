//Package Imports
import { Navbar, Container, Nav } from 'react-bootstrap'

//Local Imports
import './HeaderComponent.scss'
import { CartComponent } from '../../Cart/CartComponent/CartComponent'
import SearchBar from '../../Common/Searchbar/Searchbar'


export const HeaderComponent: React.FC = () :JSX.Element => {
  
  return (
    <>
    <Navbar expand="xl" className="bg-body" bg="dark" data-bs-theme="dark">
      <Container>
        <div className="image">
          <img src="Gamespot.png" alt="" />
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Navbar.Brand href="/home">
            GameSpot
        </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home" className='navbar-opt'>Deals</Nav.Link>
            <Nav.Link href="#features" className='navbar-opt'>Trending</Nav.Link>
            <Nav.Link href="#pricing" className='navbar-opt'>Upcoming Releases</Nav.Link>
            <Nav.Link href="#pricing" className='navbar-opt'>Support</Nav.Link>
          </Nav>
          <SearchBar />
          <CartComponent />
        </Navbar.Collapse>
      </Container>

    </Navbar>
    </>
  )
}
