
import './global.css';
import CourseList from './features/courses/CourseList';
import RootLayout from './RootLayout';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import CourseDetailsPage from './features/courses/CourseDetailsPage';
import RootPage from './features/user/SetUser';
import Dashboard from './features/user/Dashboard';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<RootLayout/>}>
        <Route index element ={<Dashboard/>}/>
          <Route path='/course'>
              <Route index element={<CourseList/>} />
              <Route path=':id' element ={<CourseDetailsPage/>}/>
          </Route>
          
          
        </Route>
      </Routes>
    </Router>

  );
}

export default App;
