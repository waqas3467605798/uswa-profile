import react, {Component} from 'react'
import '../App.css';
import firebase from './Fire'
// import {Link} from 'react-router-dom'


  class Logout extends Component{
    constructor(){
      super();
      this.state ={
        userEmail:null,
        user:null,
        image:'',
        objective:'',
        personalInfoHead:'',
        personalInfoAns:'',
        personalInfoOrder:'',
        degree:'',
        university:'',
        grade:'',
        passingYear:'',
        educationInfoOrder:'',
        viewDegree:'',
        organization:'',
        designation:'',
        period:'',
        organizationOrder:'',
        organizationArray:[],
        jd:'',
        jdOrder:'',
        computerSkills:'',
        computerOrder:'',
        reference:'',
        onlineDocLink:'',
        docName:'',
        loadingDefaultValue:'',
        pageRefresh:0
      }

  }



  // componentDidMount(){
  //   var userId = firebase.auth().currentUser.uid;
  //   var userEmail = firebase.auth().currentUser.email
    
  //   this.setState({user:userId,userEmail:userEmail})
  // }



  async componentDidMount(){
    // var dataPushPromise = new Promise( (res,rej)=>{
    var userId = firebase.auth().currentUser.uid;
    var userEmail = firebase.auth().currentUser.email
    this.setState({user:userId,userEmail:userEmail})
    
    
    firebase.database().ref('organization').on('child_added' , (data)=> { 
        //  this.state.personalInfoArray.push(data.val())
         this.state.organizationArray.push(data.val())
        }  )



    // res()
  // } )
  // dataPushPromise.then(()=>{
   
    
  // })

  setTimeout(() => {
  

    const inteId = setInterval(()=>{
      this.setState({pageRefresh: this.state.pageRefresh+1})
    },500)
    
    
    setTimeout(() => {
      clearInterval(inteId);
    }, 10000);
  
  
  
  }, 1000);




}


changeHandler = (e)=>{
this.setState({[e.target.name]: e.target.value})

console.log(this.state.image)
}



saveImage = ()=>{
firebase.database().ref('myImage').set({imageLink: this.state.image})
alert('Image saved successfully')
this.setState({image:''})
}




saveObjective = ()=>{
  firebase.database().ref('objective').set({objective: this.state.objective})
  alert('objective saved successfully')
  this.setState({objective:''})
  }




savePersonalInfo = ()=>{
var object = {}
// object.[this.state.personalInfoHead] = this.state.personalInfoAns;
object.head = this.state.personalInfoHead;
object.ans = this.state.personalInfoAns;
object.order = this.state.personalInfoOrder;

var key = firebase.database().ref('personalInfo').push().key
object.key = key;
      
firebase.database().ref('personalInfo').child(key).set(object)


alert('Information saved successfully')
  this.setState({personalInfoHead:'', personalInfoAns:'', personalInfoOrder:''})

}






saveEducationInfo = ()=>{
  var object = {}
  // object.[this.state.personalInfoHead] = this.state.personalInfoAns;
  object.degree = this.state.degree;
  object.university = this.state.university;
  object.grade = this.state.grade;
  object.order = this.state.educationInfoOrder;
  object.degreeImageLink = this.state.viewDegree;
  object.passingYear = this.state.passingYear;

  
  var key = firebase.database().ref('educationInfo').push().key
  object.key = key;
        
  firebase.database().ref('educationInfo').child(key).set(object)
  
  
  alert('Information saved successfully')
    this.setState({degree:'', university:'', grade:'', viewDegree:'', educationInfoOrder:'',passingYear:''})
}



saveOrganization = ()=>{
  var object = {}
  var jd = [{jd:'Job Description', order:0}]
  object.organization = this.state.organization;
  object.designation = this.state.designation;
  object.period = this.state.period;
  object.order = this.state.organizationOrder;
  object.jobDescription = jd


  var key = firebase.database().ref('organization').push().key
  object.key = key;
        
  firebase.database().ref('organization').child(key).set(object)


alert('Information saved successfully')
    this.setState({organization:'', designation:'', organizationOrder:'', period:''})

}



saveJd = ()=>{
var selectedOrg = document.getElementById('jdOrganization').value
var orgObject = this.state.organizationArray.find((org)=>{return org.organization === selectedOrg})

var obj = {jd: this.state.jd,
           order: this.state.jdOrder}

orgObject.jobDescription.push(obj)


firebase.database().ref('organization').child(orgObject.key).set(orgObject)


alert('added successfully')
this.setState({jd:'', jdOrder:''})
// console.log(orgObject)

}



saveComputerSkills = ()=>{

  var object = {}
// object.[this.state.personalInfoHead] = this.state.personalInfoAns;
object.skills = this.state.computerSkills;

object.order = this.state.computerOrder;

var key = firebase.database().ref('computerSkills').push().key
object.key = key;
      
firebase.database().ref('computerSkills').child(key).set(object)


alert('Information saved successfully')
  this.setState({computerSkills:'', computerOrder:''})



}



saveReference =()=>{
firebase.database().ref('reference').set({ref: this.state.reference})
  alert('Reference saved successfully')
  this.setState({reference:''})
}




onlineDoc=()=>{
  var obj = {};
  obj.link = this.state.onlineDocLink
  obj.docName = this.state.docName
  var key = firebase.database().ref('onlineDocs').push().key
  obj.key = key;

  firebase.database().ref('onlineDocs').child(key).set(obj)

  alert('saved successfully')
this.setState({docName:'',onlineDocLink:''})
}





saveLoadingDefaultValue=()=>{
  firebase.database().ref('loadingDefaultValue').set({defaultValue:this.state.loadingDefaultValue})
  }





    Logout= ()=>{
        firebase.auth().signOut();
    }







    render(){
        return(
          <div>
         <br/>
         <div className='container' style={{textAlign:'right'}}> <button className="waves-effect waves-dark btn red" onClick={this.Logout}>Logout</button> </div> 
         
         
         <p> <span>State has been refreshed for </span> <b>{this.state.pageRefresh}</b> <span> times</span></p>



          <div className='container'>
            <span style={{color:'blue'}}><b>Image Link</b></span>
          <input type='text' name='image' value={this.state.image} onChange={this.changeHandler} placeholder='Image link'/>
          <button onClick={this.saveImage}> Save </button>
          
<br/><br/><br/>
          <span style={{color:'blue'}}><b>objective</b></span>
          <input type='text' name='objective' value={this.state.objective} onChange={this.changeHandler} placeholder='Obective'/>
          <button onClick={this.saveObjective}> Save </button>
          

<br/><br/><br/>
          <span style={{color:'blue'}}><b>Personal Information</b></span>
          <input type='text' name='personalInfoHead' value={this.state.personalInfoHead} onChange={this.changeHandler} placeholder='Head Name'/>
          <input type='text' name='personalInfoAns' value={this.state.personalInfoAns} onChange={this.changeHandler} placeholder='Answer'/>
          <input type='Number' name='personalInfoOrder' value={this.state.personalInfoOrder} onChange={this.changeHandler} placeholder='Order'/>
          <button onClick={this.savePersonalInfo}> Save </button>

          


          <br/><br/><br/>
          <span style={{color:'blue'}}><b>Educational Information</b></span>
          <input type='text' name='degree' value={this.state.degree} onChange={this.changeHandler} placeholder='Certificate / Degree Name'/>
          <input type='text' name='university' value={this.state.university} onChange={this.changeHandler} placeholder='University / Board'/>
          <input type='text' name='grade' value={this.state.grade} onChange={this.changeHandler} placeholder='Grade / Percentage'/>
          <input type='Number' name='passingYear' value={this.state.passingYear} onChange={this.changeHandler} placeholder='Passing Year'/>
          <input type='text' name='viewDegree' value={this.state.viewDegree} onChange={this.changeHandler} placeholder='Image Link of your degree'/>
          
          
          <input type='Number' name='educationInfoOrder' value={this.state.educationInfoOrder} onChange={this.changeHandler} placeholder='Order'/>
          <button onClick={this.saveEducationInfo}> Save </button>



          <br/><br/><br/>
          <span style={{color:'blue'}}><b>Organization Name</b></span>
          <input type='text' name='organization' value={this.state.organization} onChange={this.changeHandler} placeholder='Organization Name'/>
          <input type='text' name='designation' value={this.state.designation} onChange={this.changeHandler} placeholder='designation'/>
          <input type='text' name='period' value={this.state.period} onChange={this.changeHandler} placeholder='period'/>
          <input type='Number' name='organizationOrder' value={this.state.organizationOrder} onChange={this.changeHandler} placeholder='Order'/>
          <button onClick={this.saveOrganization}> Save </button>
          
          
          <br/><br/><br/>
          <span style={{color:'blue'}}><b>Experience - J.D</b></span>
          <div style={{width:'100%', margin:'auto'}}> <select className='browser-default' id='jdOrganization'>  {this.state.organizationArray.map(  (item,i)=>{ return <option key={i} className='browser-default'>{item.organization}</option>}  )       }   </select> </div> <br/>
          <input type='text' name='jd' value={this.state.jd} onChange={this.changeHandler} placeholder='Add Job Description'/>
          <input type='Number' name='jdOrder' value={this.state.jdOrder} onChange={this.changeHandler} placeholder='Order'/>
          <button onClick={this.saveJd}> Add JD </button>
          {/* <p>{this.state.organizationArray.map(  (it,ind)=>{return <p>{it.organization}</p>}  )}</p> */}
          
          

          <br/><br/><br/>
          <span style={{color:'blue'}}><b>Computer/IT Skills</b></span>
          <input type='text' name='computerSkills' value={this.state.computerSkills} onChange={this.changeHandler} placeholder='Computer Skills'/>
          <input type='Number' name='computerOrder' value={this.state.computerOrder} onChange={this.changeHandler} placeholder='Order'/>
          <button onClick={this.saveComputerSkills}> Save </button>


<br/><br/><br/>
          <span style={{color:'blue'}}><b>Reference</b></span>
          <input type='text' name='reference' value={this.state.reference} onChange={this.changeHandler} placeholder='Reference'/>
          <button onClick={this.saveReference}> Save </button>





          <br/><br/><br/>

          <span style={{color:'blue'}}><b>Online Documents</b></span>
          <input type='text' name='onlineDocLink' value={this.state.onlineDocLink} onChange={this.changeHandler} placeholder='Image Link of Online Doc'/>
          <input type='text' name='docName' value={this.state.docName} onChange={this.changeHandler} placeholder='Document Name'/>
          <button onClick={this.onlineDoc}> Save </button>




<br/><br/><br/>

          <span style={{color:'blue'}}><b>Loading Default value</b></span>
          <input type='Number' name='loadingDefaultValue' value={this.state.loadingDefaultValue} placeholder='Loading default value' onChange={this.changeHandler}/>
          <button onClick={this.saveLoadingDefaultValue}>Save</button>







          </div>
         









       

        </div>
        )
    }


  }

export default Logout;