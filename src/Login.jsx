import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Login.css';

const validationSchema = Yup.object({
  username: Yup.string()
    .matches(/^[a-zA-Z0-9-_@]+$/, 'Username can only contain letters, numbers, - _ and @')
    .matches(/[A-Z]/, 'Username must contain at least one uppercase letter')
    .matches(/\d/, 'Username must contain at least one number')
    .required('Username is required'),
  password: Yup.string()
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/[^A-Za-z0-9]/, 'Password must contain at least one special character')
    .required('Password is required')
});

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    const credentials = [
      { username: 'Nishar123', password: 'Nishar123@@' },
      { username: 'Rahsin123', password: 'Rahsin123@@' }
    ];

    const validUser = credentials.find(
      (cred) => cred.username === values.username && cred.password === values.password
    );

    if (validUser) {
      sessionStorage.setItem('loggedInUser', values.username);
      navigate('/formpage');
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <Formik
        initialValues={{
          username: '',
          password: ''
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnChange={true}  
      >
        <Form>
          <div className="input-container">
            <label htmlFor="username">Username</label>
            <Field
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              className="input-field"
            />
            <ErrorMessage name="username" component="div" className="error-message" />
          </div>

          <div className="input-container">
            <label htmlFor="password">Password</label>
            <Field
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="input-field"
            />
            <ErrorMessage name="password" component="div" className="error-message" />
          </div>

          <button type="submit" className="login-btn">Login</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
