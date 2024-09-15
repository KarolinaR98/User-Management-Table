import './UserTable.css';
import loupeImg from '../assets/images/white-loupe.png';
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getUsers, setUserSearchValue, setFilterValue, setFilteredData } from "../redux/usersSlice";
import { Filter } from '../types';
import { useEffect } from 'react';



const UserTable = () => {

    const dispatch = useAppDispatch();
    const users = useAppSelector((state) => state.users.filteredData);
    const searchValue = useAppSelector((state) => state.users.usersSearchValue);
    const filterValue = useAppSelector((state) => state.users.usersFilter);

    useEffect(() => {
        dispatch(getUsers());
    }, []);

    useEffect(() => {
        dispatch(setFilteredData());
    }, [searchValue, filterValue]);

    return (
        <>
            <div className='user-table-component'>
                <div className='container'>
                    <div className='filter-bar'>
                        <select onChange={(e: React.ChangeEvent<HTMLSelectElement>) => dispatch(setFilterValue(e.target.value as Filter))} name='column-names'                       defaultValue={filterValue}>
                            <option value={Filter.name}>Name</option>
                            <option value={Filter.username}>Username</option>
                            <option value={Filter.email}>Email</option>
                            <option value={Filter.phone}>Phone</option>
                        </select>
                        <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(setUserSearchValue(e.target.value))} type='text' placeholder={`Search user by ${filterValue}`} />
                    </div>
                    {users.length !== 0 && <div className='table-wrapper'>
                        <table className='userTable'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users && users.map((user) => {
                                    return (
                                        <tr key={user.id}>
                                            <td>
                                                <span className='cell-header'>Name:</span>
                                                {user.name}
                                            </td>
                                            <td>
                                                <span className='cell-header'>Username:</span>
                                                {user.username}
                                            </td>
                                            <td>
                                                <span className='cell-header'>Email:</span>
                                                {user.email}
                                            </td>
                                            <td>
                                                <span className='cell-header'>Phone:</span>
                                                {user.phone}
                                            </td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>
                    </div>}
                    {users.length === 0 && <div className='no-results-msg-container'>
                        <img src={loupeImg} alt="Loupe" />
                        <p className='no-result-msg'>No results found</p>
                    </div>}
                </div>
            </div>
        </>
    )
}

export default UserTable;