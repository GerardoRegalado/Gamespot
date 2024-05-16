import { Navbar, Container, Nav } from 'react-bootstrap'
import './HeaderComponent.scss'
import { CartComponent } from '../../Cart/CartComponent/CartComponent'

export const HeaderComponent = () => {
  
  return (
    <>
    <Navbar expand="xl" className="bg-body" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">
            GameSpot
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" className='navbar-opt'>Deals</Nav.Link>
            <Nav.Link href="#features" className='navbar-opt'>Trending</Nav.Link>
            <Nav.Link href="#pricing" className='navbar-opt'>Upcoming Releases</Nav.Link>
            <Nav.Link href="#pricing" className='navbar-opt'>Support</Nav.Link>
            <CartComponent />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}