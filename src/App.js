import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './containers/Home';
import Login from './containers/Login';
import Signup from './containers/Signup';
import ResetPassword from './containers/ResetPassword';
import ResetPasswordConfirm from './containers/ResetPasswordConfirm';
import Layout from './hocs/Layout';
import Activate from './containers/Activate';
import FileUpload from './containers/FileUpload';
import { Provider } from 'react-redux';
import store from './store';
import VideoList from './containers/VideoList';
import Summary from './containers/Summary';
import Analysis from './containers/Analysis';
import Auth from './containers/Auth';
import Player from './containers/AudioPlay';



const App = () => {
return(

  <Provider store={store}>
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/reset-password' element={<ResetPassword/>} />
          <Route path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm/>} />
          <Route path='/activate/:uid/:token' element={<Activate/>} />
          <Route path="/upload" element={<FileUpload/>} />
          <Route path="/list" element={<VideoList/>} />
          <Route path="/summary" element={<Summary/>} />
          <Route path="/analysis" element={<Analysis/>} />
          <Route path="/auth" element={<Auth/>} />
          <Route path="/play" element={<Player/>} />
          
          

        </Routes>
      </Layout>
    </Router>
  </Provider>

);
};

export default App;
