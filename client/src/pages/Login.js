import { Button, Form, Input, Select } from 'antd';
import React, { useEffect } from 'react';
import { Link,useNavigate } from "react-router-dom";
import Register from './Register';
import axios from "axios";
import { useDispatch } from "react-redux";
import { message } from 'antd';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (value) => {
    try {
      dispatch({
        type: 'SHOW_LOADING',
      });
  
      const res = await axios.post("/api/users/login", value);
  
      if (res.data && res.data.verified) {
        dispatch({
          type: 'HIDE_LOADING',
        });
  
        message.success("User Login Successfully");
        localStorage.setItem('auth', JSON.stringify(res.data));
        navigate('/');
      } else {
        dispatch({
          type: 'HIDE_LOADING',
        });
  
        message.error("Invalid email or password. Please try again.");
      }
    } catch (error) {
      dispatch({
        type: 'HIDE_LOADING',
      });
  
      message.error("Something went wrong. Please try again.");
      console.log(error);
    }
  };
  
    //currently login user
    useEffect(()=>{
      if(localStorage.getItem('auth'))
      {localStorage.getItem('auth');
      navigate('/');}
    },[navigate]);

  return (
    <>  <center>
        <div className='register'>
            <div className='register-form'>
            <h1>Nav Bharat Khadi Store</h1>
            <h3>Login Page</h3>
            <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item name="userId" label="User ID" >
              <Input/>
            </Form.Item>
            <Form.Item name="password" label="Password" >
              <Input type='password'/>
            </Form.Item>
            <div className="d-flex justify-content-between">
                <p>
                    Not a user please
                    <Link to="/register"> Register Here !</Link>
                </p>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </div>
        </Form>
        </div>
        </div>
        </center>
    </>
  )
}

export default Login;