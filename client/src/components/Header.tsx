import * as React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Tv } from 'react-feather';
import logo from '../logo.svg';

import { useNavigate } from 'react-router-dom';

interface IHeaderProps {
}

// const navigate = useNavigate();
// const navigateToContact = () => {
//   navigate("/");
//   setTimeout(() => {
//     const contactSection = document.getElementById("contact");
//     if (contactSection) {
//       contactSection.scrollIntoView({ behavior: "smooth" });
//     }
//   }, 100); // Delay for smoother scroll
// };

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary Header">
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          Collaboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/generate_room">Get Started</Nav.Link>
            <Nav.Link href="/#about">About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
