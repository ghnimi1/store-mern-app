import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllUsers } from '../redux/actions/userActions/fetchAllUsers'
import { removeUser } from '../redux/actions/userActions/deleteUser'

const UsersListPage = ({ history }) => {
    const dispatch = useDispatch()
    const { currentUser } = useSelector(state => state.users)

    const { users } = useSelector((state) => state.users)

    useEffect(() => {
        if (currentUser && currentUser.isAdmin) {
            dispatch(fetchAllUsers())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, currentUser, users])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(removeUser(id))
        }
    }

    return (
        <>
            <h1>Users</h1>
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>ADMIN</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>
                                <a href={`mailto:${user.email}`}>{user.email}</a>
                            </td>
                            <td>
                                {user.isAdmin ? (
                                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                                ) : (
                                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                                )}
                            </td>
                            <td>
                                <NavLink to={`/admin/user/${user._id}/edit`}>
                                    <Button variant='light' className='btn-sm'>
                                        <i className='fas fa-edit'></i>
                                    </Button>
                                </NavLink>
                                <Button
                                    variant='danger'
                                    className='btn-sm'
                                    onClick={() => deleteHandler(user._id)}
                                >
                                    <i className='fas fa-trash'></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}

export default UsersListPage