import React, { useEffect } from 'react';
import { Navbar, Container, Button, NavDropdown, Badge, NavLink } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { fetchUserProfile } from '../redux/actions/userActions/userProfile'

function Header(props) {
    const { currentUser } = useSelector(state => state.users)
    const { cartItems } = useSelector(state => state.cart)

    const token = localStorage.getItem('token')
    const dispatch = useDispatch()
    const Logout = () => {
        localStorage.removeItem('token')
        window.location.replace('/login')
    }
    useEffect(() => {
        dispatch(fetchUserProfile())
    }, [dispatch])
    return (
        <div style={{ borderBottom: '1px solid #ccc' }}>
            <Navbar>
                <Container>
                    <Link to="/" style={{ textDecoration: 'none' }} >
                        <Navbar.Brand>E-SHOP</Navbar.Brand>
                    </Link>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Link to='/cart'>
                            <i className="fas fa-shopping-cart">
                                <Badge bg="danger">
                                    {cartItems?.length}
                                </Badge></i>
                        </Link>
                        {!token && (<Link to='/login'>
                            <Button variant="outline-secondary">Sign in</Button>
                        </Link>)}
                    </Navbar.Collapse>
                    {currentUser?.isAdmin === false && (<NavDropdown title={currentUser?.name} id='username'>
                        <NavLink>
                            <NavDropdown.Item as={Link} to='/profile'>Profile</NavDropdown.Item>
                        </NavLink>
                        <NavDropdown.Item
                            onClick={Logout}>
                            Logout
                        </NavDropdown.Item>
                    </NavDropdown>)}
                    {currentUser && currentUser?.isAdmin && (
                        <NavDropdown title={currentUser?.name} id='adminmenu'>
                            <NavLink>
                                <NavDropdown.Item as={Link} to='/profile'>
                                    Profile
                                </NavDropdown.Item>
                            </NavLink>
                            <NavLink>
                                <NavDropdown.Item as={Link} to='/admin/userlist' >Users</NavDropdown.Item>
                            </NavLink>
                            <NavLink >
                                <NavDropdown.Item as={Link} to='/admin/productlist'>Products</NavDropdown.Item>
                            </NavLink>
                            <NavLink>
                                <NavDropdown.Item as={Link} to='/admin/orderlist'>Orders</NavDropdown.Item>
                            </NavLink>
                            <NavLink>
                                <NavDropdown.Item as={Link} to='/admin/categorylist'>Category</NavDropdown.Item>
                            </NavLink>
                            <NavDropdown.Item
                                onClick={Logout}>
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    )}
                </Container>
            </Navbar>
        </div >
    );
}

export default Header;