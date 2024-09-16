import "./UserTable.css";
import loupeImg from "../assets/images/white-loupe.png";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  getUsers,
  setUserSearchValue,
  setFilterType,
  setFilteredData,
} from "../redux/usersSlice";
import { FilterType } from "../types";
import { useEffect } from "react";

const UserTable = () => {
  const dispatch = useAppDispatch();

  const users = useAppSelector((state) => state.users.filteredUsers);
  const searchValue = useAppSelector((state) => state.users.usersSearchValue);
  const filterType = useAppSelector((state) => state.users.filterType);
  const loading = useAppSelector((state) => state.users.loading);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    dispatch(setFilteredData());
  }, [searchValue, filterType]);

  return (
    <>
      <div className="user-table-component">
        <div className="container">
          <div className="filter-bar">
            <select
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                dispatch(setFilterType(e.target.value as FilterType))
              }
              name="column-names"
              defaultValue={filterType}
            >
              <option value={FilterType.name}>Name</option>
              <option value={FilterType.username}>Username</option>
              <option value={FilterType.email}>Email</option>
              <option value={FilterType.phone}>Phone</option>
            </select>
            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                dispatch(setUserSearchValue(e.target.value))
              }
              type="text"
              placeholder={`Search user by ${filterType}`}
            />
          </div>
          {users.length && !loading ? (
            <div className="table-wrapper">
              <table className="user-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => {
                    return (
                      <tr key={user.id}>
                        <td>
                          <span className="cell-header">Name:</span>
                          {user.name}
                        </td>
                        <td>
                          <span className="cell-header">Username:</span>
                          {user.username}
                        </td>
                        <td>
                          <span className="cell-header">Email:</span>
                          {user.email}
                        </td>
                        <td>
                          <span className="cell-header">Phone:</span>
                          {user.phone}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="no-results-msg-container">
              <img src={loupeImg} alt="Loupe" />
              <p className="no-results-msg">No results found</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserTable;
