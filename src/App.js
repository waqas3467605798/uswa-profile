import react, {Component} from 'react'
import Header from './components/Header'
import Logout from './components/Logout-Input'
import MyDocs from './components/View-Profile'
// import AccountsRecord from './components/AccountsRecord'
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom'





  class App extends Component{

  render(){
  return (
    <BrowserRouter>
    <div>
      <Header/>
      
      <Route exact path='/' component={Logout}/>
      {/* <Route path='/AccountsRecord' component={AccountsRecord}/> */}
      <Route path='/MyDocs' component={MyDocs}/>
      

{/* <br/><br/>
<div className='bottomLine'> 
Prepared By: Waqas Saleem <br/>
My Documents Management System<br/>
Contact: 0346-7605798 Email: waqas_mba86@yahoo.com
</div> */}
<br/><br/><br/>


    </div>
    </BrowserRouter>
  );
}
}

export default App;
