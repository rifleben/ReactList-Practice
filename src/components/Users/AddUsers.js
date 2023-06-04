import React, {useState} from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';

import classes from './AddUsers.module.css';


const AddUsers = (props) => {
    const[userName, setUserName] = useState("");
    const[age, setAge] = useState("");
    const [error, setError] = useState();

    const addUserHandler = (event) => {
        event.preventDefault();

        if (userName.trim().length === 0 || age.trim().length === 0) {
            setError({
                title: "Invalid input",
                message: "Please enter a valid name and age (non-empty values)."
            });
            return;
        };

        if (+age < 1) {
            setError({
                title: "Invalid age",
                message: "Please enter a valid age (> 0)."
            });
            return;
        };

        props.onAddUser(userName, age);
        setUserName("");
        setAge("");
        
    };

    const userNameChangeHandler = (event) => {
        setUserName(event.target.value);
    };

    const ageChangeHandler = (event) => {
        setAge(event.target.value);
    };

    const errorHandle = () => {
        setError(null);
    }

    return (
        <div>
        {error && <ErrorModal onConfirm={errorHandle} title="An error occured!" message="Something went wrong!" />}
        <Card className={classes.input}>
          <form onSubmit={addUserHandler}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={userName}
              onChange={userNameChangeHandler}
            />
            <label htmlFor="age">Age (Years)</label>
            <input
              id="age"
              type="number"
              value={age}
              onChange={ageChangeHandler}
            />
            <Button type="submit">Add User</Button>
          </form>
        </Card>
      </div>
    );
  };

export default AddUsers;