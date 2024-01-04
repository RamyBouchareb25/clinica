import { Button, Nav, Navbar } from 'react-bootstrap'
import '../scss/landing.scss'
import { useAuth0 } from '@auth0/auth0-react'
export default function Login() {
  const { loginWithRedirect } = useAuth0()
  return (
    <>
      <div className='nav-container'>
        <Navbar bg="#2B2B2B" variant="dark" className="w-100">
          <Navbar.Brand>
          <h1 style={{color:"#2166bc"}}><img
              alt="clinica logo"
              src="clinica_logo2.png"
              width="50"
              height="50"
              className="d-inline-block align-top"
            />{' '}
            Clinica</h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
            <Button variant='warning' onClick={() => loginWithRedirect()}>
              Login
            </Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <div className='main-container'>
        <div className='second-container'>
          <h1 className='landing-title'>
            Welcome to Clinica Your favorite Clinic Management System
          </h1>
          <p className='subtitle'>
            Get started today by logging in to your admin account and start managing your clinic ! 
          </p>
          <Button variant='warning' className='w-25 mt-2' onClick={() => loginWithRedirect()}>
            Get Started !
          </Button>

        </div>
        <img src="Analitics.png" alt="analitics" />
      </div>
    </>
  )
}
