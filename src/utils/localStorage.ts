export const setCredentials = (username: string, password: string) => {
    localStorage.setItem('user', JSON.stringify({ username, password }));
};

export const getCredentials = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

export const clearCredentials = () => {
    localStorage.removeItem('user');
};