import React from 'react';
import { Navbar, FormGroup, FormControl, Button } from 'react-bootstrap';


class Header extends React.Component {

  render() {
    return (
      <Navbar>
     <Navbar.Header>
       <Navbar.Brand>
         <a href="#">Brand</a>
       </Navbar.Brand>
       <Navbar.Toggle />
     </Navbar.Header>
     <Navbar.Collapse>
       <Navbar.Form pullRight>
         <FormGroup>
           <FormControl type="text" placeholder="Search" />
         </FormGroup>
         {' '}
         <Button type="submit">Submit</Button>
       </Navbar.Form>
     </Navbar.Collapse>
   </Navbar>
    );
  }

}

export default Header;
