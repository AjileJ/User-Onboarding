import React, {useState, useEffect} from 'react';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';


const Forms = ({ values, errors, touched, status }) => {
  const [users , setUsers ] = useState([]);
  useEffect(() => {
    if (status) {
      setUsers ([...users, status]);
    }
  },[status]);
  return(
    <div className="user-form">
      <Form>
        <Field type='text' name='name' placeholder="Name"/>
        {touched.name && errors.name && (
          <p className='error'>{errors.name}</p>
        )}
        <Field type='text' name='email' placeholder='Email'/>
        {touched.email && errors.email && <p className='error'>{errors.email}</p>}
        <Field type='text' name='password' placeholder='Password' className=''/>
        <label className="checkbox-container">
          Terms Of Service
          <Field type="checkbox" name="termsofservice" checked={values.termsofservice}
        />
        <span className="checkmark" />
        </label>
        <button>Submit!</button>
      </Form>
      {users.map(user => (
        <ul key={user.id}>
          <li>Name: {user.name}</li>
          <li>Email: {user.email}</li>
          <li>Password: {user.password}</li>
        </ul>
      ))}
    </div>
  )
}

const FormikForms = withFormik ({
  mapPropsToValues({name, email, password, termsofservice}){
    return {
      name: name || '',
      email: email || '',
      password: password || '',
      termsofservice:termsofservice || false
    };
  },
  validationSchema:Yup.object().shape({
    name: Yup.string().required("Your name is required here!!!"),
    email: Yup.string().required("Your email is required here!!!"),
    password: Yup.string().required("Please insert a Password"),
    termsofservice: Yup.string().required("Please check the box!")
  }),
  handleSubmit(values,{setStatus}){
    axios
    .post('https://reqres.in/api/users', values)
    .then(res => {
      setStatus(res.data);
    })
    .catch(err => console.log(err.res))
  }
})(Forms);
export default FormikForms

