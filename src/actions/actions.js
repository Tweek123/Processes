export const addComment = (form, id) => ({ type: "ADD_COMMENT", formMessage: form, id: id});
export const addUser = (form) => ({ type: "ADD_USER", formAddUser: form });
export const refUsers = () => ({ type: "REF_PROCESSES" });
export const getUsers = () => ({ type: "GET_PROCESSES" });
export const refreshUsers = () => ({ type: "REFRESH_USERS"});
