import React, { useContext, useState } from 'react'
import { Formik,Field,ErrorMessage,Form } from 'formik'
import * as Yup from 'yup'
import appContext from '../../utilities/appContext'
import Axios from 'axios'
import { useHistory} from 'react-router-dom'
import ls from 'local-storage'

export default function Register() {
  
  const history=useHistory()
  const [isLoading, setisLoading] = useState(false)
  const [,setUser] = useContext(appContext)

  return (
    <Formik 
    initialValues={{username: "" , email: "" , password: "" , password_confirmation: ""}}
    onSubmit={(value, formikbag)=>{
      setisLoading(true)
      Axios.post('/api/sign_up',value)
        .then(res=>{
          setisLoading(false)
          setUser({...res.data.user,logged_in:true})
          ls.set('user',{...res.data.user,logged_in:true})
          history.replace('/')
        })
        .catch(err => {
          setisLoading(false)
          formikbag.setFieldError('username',err.response.data.errors.username)
          formikbag.setFieldError('email', err.response.data.errors.email)
        })
    }}

    validationSchema={Yup.object({
      username: Yup.string().required('Username is Required').min(4,'Username must be at least of 4 characters'),
      email: Yup.string().required('Email is required.').email('Invalid Email Address'),
      password: Yup.string().required('Password is required.').min(3,'Password must be at least of 3 characters'),
      password_confirmation: Yup.string().required('Required').oneOf([Yup.ref('password')],'Password does not match')
    })}
    >
      {()=>(
        <div className='container-fluid bg-light'>
        <div className='row justify-content-center'>
          <div className='col-sm-10 col-md-4 mt-5' >
            <div className='card'>
              <div className='card-header form-head'>
                Register
              </div>
              <div className='card-body form-body'>
                <Form className='form-group'>
                  <label >Username:</label><br/>
                  <Field className='form-control' type='text' name='username'  />
                  <ErrorMessage name='username' component='small' className='form-error-input' />
                  
                  <br/>
                  <label style={{paddingTop: 5}}>Email:</label><br/>
                  <Field className='form-control' type='email' name='email'  />
                  <ErrorMessage name='email'component='small' className='form-error-input'/>
                  <br/>
                  <label style={{paddingTop: 5}}>Password :</label>
                  <Field className='form-control' type='password' name='password' />
                  <ErrorMessage name='password' component='small' className='form-error-input'/>
                  <br/>
                  <label style={{paddingTop: 5}}>Password Confirmation :</label>
                  <Field className='form-control' type='password' name='password_confirmation' />
                  <ErrorMessage name='password_confirmation' component='small' className='form-error-input'/>
                  <br/><br/>
                  <button className='btn btn-primary' type='submit' disabled={isLoading}>Register</button>
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
