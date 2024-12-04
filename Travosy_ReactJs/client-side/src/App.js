import React from "react";
import { Route, Routes } from "react-router-dom";
import './assets/css/tailwind.css'
import './assets/css/materialdesignicons.min.css'

import Index from './pages/index/index'
import Grid from './pages/listing/tour-grid/grid' 
import GridLeftSidebar from './pages/listing/tour-grid/grid-left-sidebar'
import GridRightSidebar from './pages/listing/tour-grid/grid-right-sidebar'
import List from './pages/listing/tour-list/list'
import ListLeftSidebar from './pages/listing/tour-list/list-left-sidebar'
import ListRightSidebar from './pages/listing/tour-list/list-right-sidebar'
import TourDetailTwo from './pages/listing/tour-detail/tour-detail-two'
import Aboutus from './pages/aboutus'
import Login from './pages/auth/login'
import Signup from './pages/auth/signup'
import SignupSuccess from './pages/auth/signup-success'
import ForgotPassword from './pages/auth/forgot-password'
import Terms from './pages/utility/terms'
import Privacy from './pages/utility/privacy'
import Comingsoon from './pages/special/comingsoon'
import Maintenance from './pages/special/maintenance'
import Error from './pages/special/404'
import Contact from './pages/contact'
import Inquiry from './pages/inquiryForm'
import Adventure from './pages/adventure'
import Domestic from './pages/domestic'
import International from './pages/international'
import Dashboard from './pages/dashboard/Dashboard';
import AddTour from './pages/dashboard/Admin/addTour';
import Explore from './pages/explore-now';
import EditTour from './pages/dashboard/Admin/editTour';
import EditTourModal from './pages/dashboard/Admin/editTourModal';
import FormDataTable from './pages/dashboard/Admin/formDataTable';
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";


function App() {
  return (
   <Routes>
    <Route path="/" element={<Index/>}/>
   
    <Route path="/grid" element={<Grid/>}/>
    <Route path="/grid-left-sidebar" element={<GridLeftSidebar/>}/>
    <Route path="/grid-right-sidebar" element={<GridRightSidebar/>}/>
    <Route path="/list" element={<List/>}/>
    <Route path="/list-left-sidebar" element={<ListLeftSidebar/>}/>
    <Route path="/list-right-sidebar" element={<ListRightSidebar/>}/>
    <Route path="/tour-detail-two" element={<TourDetailTwo/>}/>
    <Route path="/aboutus" element={<Aboutus/>}/>
    <Route path="/login" element={<Login/>}/>
     {/* Protected Routes */}
     <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/addTour"
        element={
          <PrivateRoute>
            <AddTour />
          </PrivateRoute>
        }
      />
      <Route
        path="/editTour"
        element={
          <PrivateRoute>
            <EditTour />
          </PrivateRoute>
        }
      />
      <Route
        path="/editTourModal"
        element={
          <PrivateRoute>
            <EditTourModal />
          </PrivateRoute>
        }
      />
      <Route
        path="/formDataTable"
        element={
          <PrivateRoute>
            <FormDataTable />
          </PrivateRoute>
        }
      />
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/signup-success" element={<SignupSuccess/>}/>
    <Route path="/forgot-password" element={<ForgotPassword/>}/>
    <Route path="/terms" element={<Terms/>}/>
    <Route path="/privacy" element={<Privacy/>}/>
    <Route path="/comingsoon" element={<Comingsoon/>}/>
    <Route path="/maintenance" element={<Maintenance/>}/>
    <Route path="/404" element={<Error/>}/>
    <Route path="/contact" element={<Contact/>}/>
    <Route path="/inquiryForm" element={<Inquiry/>}/>
    <Route path="/adventure" element={<Adventure />}/>
    <Route path="/domestic" element={<Domestic/>}/>
    <Route path="/international" element={<International/>}/>
    <Route path="/explore-now" element={<Explore/>} />
    <Route path="/tour/:id" element={<Explore />} />
   </Routes>
  );
}

export default App;
