const API_BASE_URL = 'http://localhost:5225/users';

export const fetchUsers = async (currentPage: number, pageSize: number, searchTerm: string = ''): Promise<User[]> => {
    const searchQuery = searchTerm ? `&searchTerm=${searchTerm}` : '';
    const response = await fetch(`${API_BASE_URL}/?pageNumber=${currentPage}&pageSize=${pageSize}${searchQuery}`);
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    const data = await response.json();
    return data;
};

export const fetchUserById = async (userId: string): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/${userId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch user');
    }
    const data = await response.json();
    return data;
};

export const updateUser = async (user: User): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/${user.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    if (!response.ok) {
        throw new Error('Failed to update user');
    }
};

export const deleteUser = async (userId: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/${userId}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete user');
    }
};

export const addUser = async (user: Omit<User, 'id' | 'date_created'>): Promise<void> => {
    const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    if (!response.ok) {
        throw new Error('Failed to add user');
    }
};

export interface User {
    id: string;  // User ID as a string representing a GUID
    first_name: string;
    last_name: string;
    email: string;
    date_created: string;
}
