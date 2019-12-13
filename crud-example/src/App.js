import React, { useState } from 'react';
import './App.css';
import UserTable from './components/UserTable';
import AddUserForm from './components/AddUserForm';
import EditUserForm from './components/EditUserForm';

function App() {
  const usersData = [
    { id: 1, name: 'Alex', username: 'alex1'},
    { id: 2, name: 'Roman', username: 'roman1'},
    { id: 3, name: 'Gill', username: 'gill1'}
  ]

  const initialFormState = {id: null, name: '', username: ''}

  const [users, setUsers] = useState(usersData)
  const [currentUser, setCurrentUser] = useState(initialFormState)
  const [editing, setEditing] = useState(false)

  const addUser = user => {
    user.id = users.length + 1
    setUsers([...users, user])
  }

  const deleteUser = id => {
    setEditing(false)
    setUsers(users.filter(user => user.id !== id))
  }

  const editRow = user => {
    setEditing(true)
    setCurrentUser({ id: user.id, name: user.name, username: user.username })
  }

  const updateUser = (id, updatedUser) => {
    setEditing(false);
    setUsers(users.map(user => (user.id === id ? updatedUser : user)))
  }

  return (
    <div className="container">
        <h1 className="App-header">REACT CRUD APP</h1>
      <div className="flex-row">
        <div className="flex-large">

          {editing ? (
            <>
              <h2>Edit User</h2>
              <EditUserForm
                    editing={editing}
                    setEditing={setEditing}
                    currentUser={currentUser}
                    updateUser={updateUser}
                    />
              </>
          ) : (
              <>
           <h2>Add New User</h2>
           <AddUserForm addUser = {addUser} />
           </>
          )}
           </div>
        <div className="flex-large">
          <h2>View All Users</h2>
          <UserTable users={users} deleteUser={deleteUser} editRow={editRow} />
      </div>
      </div>
    </div>
  );
} 

export default App