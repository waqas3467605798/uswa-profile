import react, {Component} from 'react'
import '../App.css';
import firebase from './Fire'
import {Link} from 'react-router-dom'

  class Header extends Component{
      constructor(){
          super();
          this.state = {
            user:null,
            userEmail:null
            
          }
      }


      componentDidMount(){
        var userId = firebase.auth().currentUser.uid;
        var userEmail = firebase.auth().currentUser.email
        
        this.setState({user:userId,userEmail:userEmail})
      }
     


  render(){
    
    return (
    
    
    <div>
    
      <div id='div1'> 
      Manage Curriculum Vitae
      </div>

      <div id='div2'>
     
     <Link to='/' style={{textDecoration:'none', marginRight:'22px'}} > <b>CV-Input</b> </Link>
     {/* <Link to='/AccountsRecord' style={{textDecoration:'none', marginRight:'22px'}} > <b>Accounts-Record</b> </Link> */}
     <Link to='/MyDocs' style={{textDecoration:'none', marginRight:'22px'}} > <b>View-CV</b> </Link>
     
     
      </div>
      
    </div>
  );
}
}

export default Header;
