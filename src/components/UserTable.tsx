import './UserTable.css';
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getUsers } from "../redux/usersSlice";
import { User } from '../types';

enum Filter {
    name = "name",
    username = "username",
    email = "email",
    phone = "phone"
}

const UserTable = () => {

    const dispatch = useAppDispatch();
    const users = useAppSelector(state => state.users.data);

    const [selectedFilter, setSelectedFilter] = useState<string>("");
    const [searchValue, setSearchValue] = useState<string>("");
    const [filteredUsers, setFilteredUsers] = useState<User[]>(users);

    const filterTable = (searchValue: string) => {

        if (selectedFilter === Filter.name) {
            setFilteredUsers(users?.filter(user => user.name.toLowerCase().includes(searchValue.toLocaleLowerCase())));
        }
        else if (selectedFilter === Filter.username) {
            setFilteredUsers(users?.filter(user => user.username.toLowerCase().includes(searchValue.toLocaleLowerCase())));
        }
        else if (selectedFilter === Filter.email) {
            setFilteredUsers(users?.filter(user => user.email.toLowerCase().includes(searchValue.toLocaleLowerCase())));
        }
        else if (selectedFilter === Filter.phone) {
            setFilteredUsers(users?.filter(user => user.phone.toLowerCase().includes(searchValue.toLocaleLowerCase())));
        }
    }


    useEffect(() => {
        dispatch(getUsers());
        setFilteredUsers(users);
    }, []);

    useEffect(()=>{
        filterTable(searchValue);
    }, [searchValue, selectedFilter]);

    return (
        <>
            <div className='user-table-component'>
                <div className='container'>
                    <div className='filter-bar'>
                        <select onChange={e => setSelectedFilter(e.target.value)} name='collumn-names' value={selectedFilter}>
                            <option disabled value={""}></option>
                            <option value={Filter.name}>Name</option>
                            <option value={Filter.username}>Username</option>
                            <option value={Filter.email}>Email</option>
                            <option value={Filter.phone}>Phone</option>
                        </select>
                        <input onChange={e => setSearchValue(e.target.value)} type='text' placeholder={selectedFilter !== "" ? `Search user by ${selectedFilter}` : "Choose filter"}
                            disabled={selectedFilter !== "" ? false : true}></input>
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
                                {filteredUsers && filteredUsers.map((user) => {
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