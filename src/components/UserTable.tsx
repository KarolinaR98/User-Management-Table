import './UserTable.css';
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getUsers, setUserSearchValue, setFilterValue, setFilteredData} from "../redux/usersSlice";
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
                        <select onChange={e => dispatch(setFilterValue(e.target.value as Filter))} name='column-names' value={filterValue} defaultValue={Filter.name}>
                            <option value={Filter.name}>Name</option>
                            <option value={Filter.username}>Username</option>
                            <option value={Filter.email}>Email</option>
                            <option value={Filter.phone}>Phone</option>
                        </select>
                        <input onChange={e => dispatch(setUserSearchValue(e.target.value))} type='text' placeholder={`Search user by ${filterValue}`}/>
                    </div>
                    <div className='table-wrapper'>
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserTable;