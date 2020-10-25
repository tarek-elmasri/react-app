import React, { useContext, useState } from 'react'
import appContext from '../../utilities/appContext'
import { Formik , Field , Form , ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Axios from 'axios'
import { useHistory } from 'react-router-dom'

export default function NewPost() {

  const history=useHistory()
  const[user] = useContext(appContext)
  const [isLoading, setIsLoading] = useState(false)

  return (
    <Formik 
    initialValues={{title: "" , body: ""}}
    onSubmit={(value)=> {
      setIsLoading(true)
      Axios.post("/api/v1/posts", {...value, token: user.token})
        .then(res => {
          setIsLoading(false)
          history.push("/posts")
        })
        .catch(res => {
          setIsLoading(false)
          console.log(res)
        })
    }}
    validationSchema={Yup.object({
      title: Yup.string().required('Title is required.').min(3,'Title must be at least of 3 chars'),
      body: Yup.string().required('Body is required.').min(3,'Body must be a least of 3 chars')
    })}
    >
      {()=>(
      <div className='container-fluid bg-light'>
        <div className='row justify-content-center'>
          <div className='col-sm-10 col-md-9 mt-5' >
            <div className='card'>
              <div className='card-header form-head'>
                Create New Post
              </div>
              <div className='card-body form-body'>
                <Form className='form-group'>
                    <label>Title:</label><br/>
                    <Field className='form-control' name='title' type='text' />
                    <ErrorMessage  name="title" className='form-error-input' component='small'/><br/>
                    <label>Body:</label><br/>
                    <Field className='form-control' as='textarea'  name='body'/>
                    <ErrorMessage name="body" className='form-error-input' component='small' /><br/><br/>
                    <button className='btn btn-primary' type='submit' disabled={isLoading}>Save</button>
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
