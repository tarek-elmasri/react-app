import React, { useContext, useState } from 'react'
import appContext from '../../utilities/appContext'
import Loading from '../../utilities/Loading'
import useAuthByEmailAndPassword from '../../utilities/hooks/useAuthByEmailAndPassword'
import {Formik , Form , Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'


export default function Login() {
  //api keys
  const users_api = process.env.REACT_APP_API_USERS_SIGN_IN
  //global context
  const [,setUser] = useContext(appContext)
  //loading and errors states
  const [isLoading,setIsLoading]=useState(false)
  const [errors, setErrors] = useState("")
  // login auth func()
  const auth = useAuthByEmailAndPassword()

  return isLoading? <Loading/> : (
    <Formik 
    initialValues={{email: "" , password: ""}}
    onSubmit={(value) => {
      setIsLoading(true)
      auth(setIsLoading,setUser,users_api,{user: value},setErrors)
    }}
    validationSchema={Yup.object({
      email: Yup.string().required('Email is Required.').email('Invalid Email'),
      password: Yup.string().required('Password is required.').min(5,'Wrong Password')
    })}
    >
      {()=>(
        <div className='container-fluid bg-light'>
        <div className='row justify-content-center'>
          <div className='col-sm-10 col-md-4 mt-5' >
            <div className='card'>
              {errors.length > 0 ?
              <div className='alert alert-danger'>
                {errors}
              </div> : null
              }
              <div className='card-header form-head'>
                Login
              </div>
              <div className='card-body form-body'>
                <Form className='form-group'>
                  <label style={{paddingTop: 5}}>Email:</label><br/>
                  <Field className='form-control' type='email' name='email'  />
                  <ErrorMessage name='email'component='small' className='form-error-input'/>
                  <br/>
                  <label style={{paddingTop: 5}}>Password :</label>
                  <Field className='form-control' type='password' name='password' />
                  <ErrorMessage name='password' component='small' className='form-error-input'/>
                  <br/>
                  <br/>
                  <button className='btn btn-primary' type='submit' disabled={isLoading}>Login</button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </Formik>
  )
}
