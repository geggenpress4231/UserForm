import React, { ChangeEvent } from "react";
import { User, fetchUsers, fetchUserById, updateUser, deleteUser } from '../api/api';
import { Link } from "react-router-dom";
import './App.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import Button from './Button'; // Import the Button component

interface State {
    users: User[];
    currentPage: number;
    pageSize: number;
    searchTerm: string;
    hasMoreUsers: boolean;
    showModal: boolean;
    editingUser: User | null;
}

export class Example extends React.Component<{}, State> {
    private debounceTimeout: NodeJS.Timeout | null = null;

    constructor(props: {}) {
        super(props);
        this.state = {
            users: [],
            currentPage: 1,
            pageSize: 30,
            searchTerm: "",
            hasMoreUsers: true,
            showModal: false,
            editingUser: null,
        };
    }

    componentDidMount() {
        document.title = "Example - My React Application";
        this.loadUsers(); // Load users when the component mounts
    }

    componentDidUpdate(prevProps: {}, prevState: State) {
        // Reload users if pagination or search term changes
        if (prevState.currentPage !== this.state.currentPage || prevState.pageSize !== this.state.pageSize || prevState.searchTerm !== this.state.searchTerm) {
            this.loadUsers();
        }
    }

    loadUsers = () => {
        // Fetch users from the API
        const { currentPage, pageSize, searchTerm } = this.state;
        fetchUsers(currentPage, pageSize, searchTerm)
            .then(apiUsers => {
                this.setState({
                    users: apiUsers,
                    hasMoreUsers: apiUsers.length === pageSize,
                });
            })
            .catch(error => {
                console.error("Failed to load users", error);
            });
    };

    handleDeleteUser = (userId: string) => {
        // Handle user deletion
        deleteUser(userId)
            .then(() => {
                this.setState(prevState => ({
                    users: prevState.users.filter(user => user.id !== userId)
                }));
            })
            .catch(error => {
                console.error("Failed to delete user", error);
            });
    };

    handleEditUser = (userId: string) => {
        // Handle user edit request
        fetchUserById(userId)
            .then(user => {
                this.setState({ editingUser: user, showModal: true });
            })
            .catch(error => {
                console.error("Failed to fetch user", error);
            });
    };

    handleSaveUser = () => {
        // Save updated user information
        if (this.state.editingUser) {
            updateUser(this.state.editingUser)
                .then(() => {
                    this.setState({ showModal: false, editingUser: null });
                    this.loadUsers();
                })
                .catch(error => {
                    console.error("Failed to update user", error);
                });
        }
    };

    handlePrevious = () => {
        // Handle pagination (previous page)
        this.setState(
            prevState => ({ currentPage: Math.max(prevState.currentPage - 1, 1) }),
            this.loadUsers
        );
    };

    handleNext = () => {
        // Handle pagination (next page)
        this.setState(
            prevState => ({ currentPage: prevState.currentPage + 1 }),
            this.loadUsers
        );
    };

    handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        // Handle search input change with debouncing
        const searchTerm = e.target.value;
        this.setState({ searchTerm, currentPage: 1 });

        if (this.debounceTimeout) {
            clearTimeout(this.debounceTimeout);
        }

        this.debounceTimeout = setTimeout(() => {
            this.loadUsers();
        }, 300);
    };

    handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        // Handle form input change for editing user
        const { name, value } = e.target;
        if (this.state.editingUser) {
            this.setState(prevState => ({
                editingUser: { ...prevState.editingUser, [name]: value } as User
            }));
        }
    };

    closeModal = () => {
        // Close the edit modal
        this.setState({ showModal: false, editingUser: null });
    };

    formatDate = (dateString: string) => {
        // Format date for display
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    render() {
        const { users, currentPage, searchTerm, hasMoreUsers, showModal, editingUser } = this.state;

        return (
            <div className="example-container">
                <div className="search-container mb-3">
                    <div className="search-wrapper">
                        <input
                            type="text"
                            className="form-control search-input"
                            value={searchTerm}
                            onChange={this.handleSearchChange}
                            placeholder="Find a User"
                        />
                    </div>
                    <div className="add-user-wrapper">
                        {/* Add User Button */}
                        <Link to="/exam" className="btn btn-info rounded-pill">Add User</Link>
                    </div>
                </div>
                <div className="table-container">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Date Created</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.first_name}</td>
                                    <td>{user.last_name}</td>
                                    <td>{user.email}</td>
                                    <td>{this.formatDate(user.date_created)}</td>
                                    <td>
                                        <Button className="btn-light" onClick={() => this.handleEditUser(user.id)}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </Button>
                                        <Button className="btn-light" onClick={() => this.handleDeleteUser(user.id)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="pagination-buttons">
                    <Button
                        className="btn-info rounded-pill"
                        type="button"
                        onClick={this.handlePrevious}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </Button>
                    <Button
                        className="btn-info rounded-pill"
                        type="button"
                        onClick={this.handleNext}
                        disabled={!hasMoreUsers}
                    >
                        Next
                    </Button>
                </div>

                {showModal && editingUser && (
                    <div className="modal" onClick={this.closeModal}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <h2>Update User</h2>
                            <form>
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input
                                        type="text"
                                        name="first_name"
                                        value={editingUser.first_name}
                                        onChange={this.handleInputChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input
                                        type="text"
                                        name="last_name"
                                        value={editingUser.last_name}
                                        onChange={this.handleInputChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={editingUser.email}
                                        onChange={this.handleInputChange}
                                        className="form-control"
                                    />
                                </div>
                                <Button type="button" className="btn-info" onClick={this.handleSaveUser}>
                                    Update
                                </Button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default Example;
