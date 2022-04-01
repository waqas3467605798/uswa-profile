import react, {Component} from 'react'
import '../App.css';
import {Link, Route,BrowserRouter} from 'react-router-dom'
import firebase from './Fire'




class MyDocs extends Component{
  constructor(){
    super();
    this.state = {
      userEmail:null,
      image:'',
      objective:'',
      reference:'',
      personalInfoArray:[],
      educationInfoArray:[],
      organizationArray:[],
      computerSkillsArray:[],
      onlineDocsArray:[],
      // pageLoading:false,
      objectiveHeading:'Loading....',
      personalInfoHeading:'Loading....',
      educationInfoHeading:'Loading....',
      experience:'Loading....',
      computerSkills:'Loading....',
      pageRefresh:0
      
     
    }
  }

  
  async componentDidMount(){
    // var userId = firebase.auth().currentUser.uid;
    // var userEmail = firebase.auth().currentUser.email
    // this.setState({user:userId,userEmail:userEmail})
var dataPromise = new Promise( (res,rej)=>{


firebase.database().ref('myImage').on('child_added' , (data)=> { 
  this.setState({image:data.val()})
    //  this.state.image.push(data.val())
    }  )



firebase.database().ref('objective').on('child_added' , (data)=> { 
  this.setState({objective:data.val()})
    //  this.state.image.push(data.val())
    }  )



firebase.database().ref('reference').on('child_added' , (data)=> { 
  this.setState({reference:data.val()})
    //  this.state.image.push(data.val())
    }  )



var dataObject = {
  personalInfo:[],
  educationInfo:[],
  organization:[],
  computerSkill:[],
  onlineDocs:[]

}


firebase.database().ref('personalInfo').on('child_added' , (data)=> { 
    //  this.state.personalInfoArray.push(data.val())
     dataObject.personalInfo.push(data.val())
    }  )





firebase.database().ref('educationInfo').on('child_added' , (data)=> { 
    //  this.state.educationInfoArray.push(data.val())
     dataObject.educationInfo.push(data.val())
    }  )



    firebase.database().ref('organization').on('child_added' , (data)=> { 
      //  this.state.educationInfoArray.push(data.val())
       dataObject.organization.push(data.val())
      }  )



      firebase.database().ref('computerSkills').on('child_added' , (data)=> { 
        //  this.state.educationInfoArray.push(data.val())
         dataObject.computerSkill.push(data.val())
        }  )




        firebase.database().ref('onlineDocs').on('child_added' , (data)=> { 
          //  this.state.educationInfoArray.push(data.val())
           dataObject.onlineDocs.push(data.val())
          }  )



res(dataObject)




} )



dataPromise.then( (dataObj)=>{
this.setState({personalInfoArray:dataObj.personalInfo, educationInfoArray:dataObj.educationInfo, organizationArray:dataObj.organization , computerSkillsArray:dataObj.computerSkill,onlineDocsArray:dataObj.onlineDocs,objectiveHeading:'Objective', personalInfoHeading:'Personal Information', educationInfoHeading:'Education Information', experience:'Experience Record', computerSkills:'Computer/IT Skills'})




// below code is only for change in state for 20 seconds.
setTimeout(() => {
  

  const inteId = setInterval(()=>{
    this.setState({pageRefresh: this.state.pageRefresh+1})
  },2000)
  
  
  setTimeout(() => {
    clearInterval(inteId);
  }, 20000);



}, 1000);






} )


  }





  deletePersonalInfo =(i)=>{
    var delKey = prompt("write 'Y' and Press OK")
  
    if(delKey === 'Y'){
    var reqObj = this.state.personalInfoArray[i]
    var objKey = reqObj.key
    
  
  

    //for delete in firebase
    firebase.database().ref('personalInfo').child(objKey).remove()
    //code ended
  
  
    //for delete updation in state
    this.state.personalInfoArray.splice(i,1) //for test delete
    //Code ended
  
  
    // this.setState({ledgerDeleteUpdate:true, sum:[], deleteRefresh:true})
      alert('Deleted successfully')
    }else{
        alert('You have entered Wrong key') 
      }
  }






editPersonalInfo=(i)=>{
var reqObj = this.state.personalInfoArray[i]
var key = reqObj.key


var editOrder = prompt('Please edit Order',reqObj.order)
if(editOrder === null){
  editOrder = reqObj.order
}



var editHead = prompt('Please edit Head Name',reqObj.head)
if(editHead === null){
  editHead = reqObj.head
}



var editAns = prompt('Please edit Answer',reqObj.ans)
if(editAns === null){
  editAns = reqObj.ans
}







reqObj.head = editHead.replace(/  +/g, ' ').trim();
reqObj.ans = editAns.replace(/  +/g, ' ').trim()
reqObj.order = editOrder.replace(/  +/g, ' ').trim()



firebase.database().ref('personalInfo').child(key).set(reqObj)


this.state.personalInfoArray.splice(i,1,reqObj)



}




deleteEducationInfo = (i)=>{
  var delKey = prompt("write 'Y' and Press OK")
  
  if(delKey === 'Y'){
  var reqObj = this.state.educationInfoArray[i]
  var objKey = reqObj.key
  



  //for delete in firebase
  firebase.database().ref('educationInfo').child(objKey).remove()
  //code ended


  //for delete updation in state
  this.state.educationInfoArray.splice(i,1) //for test delete
  //Code ended


  // this.setState({ledgerDeleteUpdate:true, sum:[], deleteRefresh:true})
    alert('Deleted successfully')
  }else{
      alert('You have entered Wrong key') 
    }
}




editEducationInfo = (i)=>{
  var reqObj = this.state.educationInfoArray[i]
  var key = reqObj.key
  
  
  var editOrder = prompt('Please edit Order',reqObj.order)
  if(editOrder === null){
    editOrder = reqObj.order
  }
  
  
  
  var editDegree = prompt('Please edit Head Name',reqObj.degree)
  if(editDegree === null){
    editDegree = reqObj.degree
  }
  
  
  
  var editUniversity = prompt('Please edit Answer',reqObj.university)
  if(editUniversity === null){
    editUniversity = reqObj.university
  }
  
  
  
  
var editGrade = prompt('Please edit Answer',reqObj.grade)
  if(editGrade === null){
    editGrade = reqObj.grade
  }



var editImageLink = prompt('Please edit Answer',reqObj.degreeImageLink)
  if(editImageLink === null){
    editImageLink = reqObj.degreeImageLink
  }


  
  
  
  reqObj.order = editOrder.replace(/  +/g, ' ').trim();
  reqObj.degree = editDegree.replace(/  +/g, ' ').trim();
  reqObj.university = editUniversity.replace(/  +/g, ' ').trim()
  reqObj.grade = editGrade.replace(/  +/g, ' ').trim()
  reqObj.degreeImageLink = editImageLink.replace(/  +/g, ' ').trim()
  
  
  
  firebase.database().ref('educationInfo').child(key).set(reqObj)
  
  
  this.state.educationInfoArray.splice(i,1,reqObj)
}
  



deleteOrg = (i)=>{
  var delKey = prompt("write 'Y' and Press OK")
  
  if(delKey === 'Y'){
  var reqObj = this.state.organizationArray[i]
  var objKey = reqObj.key
  



  //for delete in firebase
  firebase.database().ref('organization').child(objKey).remove()
  //code ended


  //for delete updation in state
  this.state.organizationArray.splice(i,1) //for test delete
  //Code ended


  // this.setState({ledgerDeleteUpdate:true, sum:[], deleteRefresh:true})
    alert('Deleted successfully')
  }else{
      alert('You have entered Wrong key') 
    }
}






editOrg = (i)=>{
  var reqObj = this.state.organizationArray[i]
  var key = reqObj.key
  
  
  var editOrder = prompt('Please edit Order',reqObj.order)
  if(editOrder === null){
    editOrder = reqObj.order
  }
  
  

  var editOrganization = prompt('Please edit Answer',reqObj.organization)
  if(editOrganization === null){
    editOrganization = reqObj.organization
  }



  
  var editDesignation = prompt('Please edit Head Name',reqObj.designation)
  if(editDesignation === null){
    editDesignation = reqObj.designation
  }
  
  

  
  
var editPeriod = prompt('Please edit Answer',reqObj.period)
  if(editPeriod === null){
    editPeriod = reqObj.period
  }




  reqObj.order = editOrder.replace(/  +/g, ' ').trim();
  reqObj.designation = editDesignation.replace(/  +/g, ' ').trim();
  reqObj.organization = editOrganization.replace(/  +/g, ' ').trim()
  reqObj.period = editPeriod.replace(/  +/g, ' ').trim()
  
  
  
  
  firebase.database().ref('organization').child(key).set(reqObj)
  
  
  this.state.organizationArray.splice(i,1,reqObj)
}






deleteExperience = (objIndx,jdIndx)=>{
  var delKey = prompt("write 'Y' and Press OK")
  
  if(delKey === 'Y'){
  var reqObj = this.state.organizationArray[objIndx]
  reqObj.jobDescription.splice(jdIndx,1)
  // var objKey = reqObj.key
  



  //for delete in firebase
  firebase.database().ref('organization').child(reqObj.key).set(reqObj)
  //code ended


  //for delete updation in state
  // this.state.organizationArray[objIndx].jobDescription.splice(jdIndx,1) //for test delete
  //Code ended


  // this.setState({ledgerDeleteUpdate:true, sum:[], deleteRefresh:true})
    alert('Deleted successfully')
  }else{
      alert('You have entered Wrong key') 
    }
}






editExperience = (objIndx,jdIndx)=>{
  var reqObj = this.state.organizationArray[objIndx]
  var key = reqObj.key
  
  
  var editOrder = prompt('Please edit Order',reqObj.jobDescription[jdIndx].order)
  if(editOrder === null){
    editOrder = reqObj.order
  }
  
  

  var editJd = prompt('Please edit Answer',reqObj.jobDescription[jdIndx].jd)
  if(editJd === null){
    editJd = reqObj.jd
  }





  reqObj.jobDescription[jdIndx].order = editOrder.replace(/  +/g, ' ').trim();
  reqObj.jobDescription[jdIndx].jd = editJd.replace(/  +/g, ' ').trim();
  
  
  
  
  
  firebase.database().ref('organization').child(key).set(reqObj)
  
  
  // this.state.organizationArray[objIndx].jobDescription.splice(jdIndx,1,reqObj)
  this.state.organizationArray.splice(objIndx,1,reqObj)
}




deleteItSkills = (i)=>{
  var delKey = prompt("write 'Y' and Press OK")
  
  if(delKey === 'Y'){
  var reqObj = this.state.computerSkillsArray[i]
  var objKey = reqObj.key
  



  //for delete in firebase
  firebase.database().ref('computerSkills').child(objKey).remove()
  //code ended


  //for delete updation in state
  this.state.computerSkillsArray.splice(i,1) //for test delete
  //Code ended


  // this.setState({ledgerDeleteUpdate:true, sum:[], deleteRefresh:true})
    alert('Deleted successfully')
  }else{
      alert('You have entered Wrong key') 
    }
}







editItSkills = (i)=>{
  var reqObj = this.state.computerSkillsArray[i]
  var key = reqObj.key
  
  
  var editOrder = prompt('Please edit Order',reqObj.order)
  if(editOrder === null){
    editOrder = reqObj.order
  }
  
  
  
  var editSkills = prompt('Please edit Head Name',reqObj.skills)
  if(editSkills === null){
    editSkills = reqObj.skills
  }
  
  
  
  

  
  reqObj.order = editOrder.replace(/  +/g, ' ').trim();
  reqObj.skills = editSkills.replace(/  +/g, ' ').trim();
  
  
  
  firebase.database().ref('computerSkills').child(key).set(reqObj)
  
  
  this.state.computerSkillsArray.splice(i,1,reqObj)
}







deleteOnlineDocs=(i)=>{
  
    var delKey = prompt("write 'Y' and Press OK")
  
    if(delKey === 'Y'){
    var reqObj = this.state.onlineDocsArray[i]
    var objKey = reqObj.key
    
  
  

    //for delete in firebase
    firebase.database().ref('onlineDocs').child(objKey).remove()
    //code ended
  
  
    //for delete updation in state
    this.state.onlineDocsArray.splice(i,1) //for test delete
    //Code ended
  
  
    // this.setState({ledgerDeleteUpdate:true, sum:[], deleteRefresh:true})
      alert('Deleted successfully')
    }else{
        alert('You have entered Wrong key') 
      }
  }







editOnlineDocs=(i)=>{
  var reqObj = this.state.onlineDocsArray[i]
var key = reqObj.key


var editDocName = prompt('Please Document Name',reqObj.docName)
if(editDocName === null){
  editDocName = reqObj.docName
}



var editLink = prompt('Please edit Link',reqObj.link)
if(editLink === null){
  editLink = reqObj.link
}




reqObj.docName = editDocName.replace(/  +/g, ' ').trim();
reqObj.link = editLink.replace(/  +/g, ' ').trim()




firebase.database().ref('onlineDocs').child(key).set(reqObj)


this.state.onlineDocsArray.splice(i,1,reqObj)


alert('Edited successfully')
}






    render(){
      return(
        <div>
          {/* <span style={{fontSize:'12px'}}><b style={{color:'green',marginLeft:'30px'}}>{this.state.userEmail}</b> / {navigator.onLine===true ? <span style={{color:'green'}}>You are online</span> : <span style={{color:'red'}}>You are OffLine</span>}</span> */}
        <div className='container'>
         
         <p> <span>State has been refreshed for </span> <b>{this.state.pageRefresh}</b> <span> times</span></p>
        
        <img src={this.state.image} alt='Picture Loading.....' width='27%' height='27%' className='profile-image'/>
         <br/>
        <span style={{color:'blue'}}><b>{this.state.objectiveHeading}</b></span>
        <p>{this.state.objective}</p>


        <span style={{color:'blue'}}><b>{this.state.personalInfoHeading}</b></span>
        <table><tbody>{this.state.personalInfoArray.sort((a, b) => (a.order > b.order) ? 1 : -1).map((item,ind)=>{return <tr key={ind}><td>{item.order}</td><td>{item.head}</td><td>{item.ans}</td><td><a href='#' style={{fontSize:'16px', color:'red'}} className="material-icons" onClick={()=>this.deletePersonalInfo(ind)}>delete</a><a href='#' style={{fontSize:'16px', color:'green'}} className="small material-icons" onClick={()=> this.editPersonalInfo(ind)}>edit</a></td></tr>})}</tbody></table>



      <span style={{color:'blue'}}><b>{this.state.educationInfoHeading}</b></span><br/>
      <table><tbody>{this.state.educationInfoArray.sort((a, b) => (a.order > b.order) ? 1 : -1).map((item,ind)=>{return <tr key={ind}><td>{item.order}</td><td>{item.degree}</td><td>{item.university}</td><td>{item.grade}</td><td> <a href={item.degreeImageLink} target='_blank'> View Degree </a> </td><td><a href='#' style={{fontSize:'16px', color:'red'}} className="material-icons" onClick={()=>this.deleteEducationInfo(ind)}>delete</a><a href='#' style={{fontSize:'16px', color:'green'}} className="small material-icons" onClick={()=> this.editEducationInfo(ind)}>edit</a></td></tr>})}</tbody></table>




      <span style={{color:'blue'}}><b>{this.state.experience}</b></span><br/>
      <table><tbody>{this.state.organizationArray.sort((a, b) => (a.order > b.order) ? 1 : -1).map((item,ind)=>{return <tr key={ind}><td>{item.order}</td><td>{item.organization}</td><td>{item.designation}</td><td>{item.period}</td><td><a href='#' style={{fontSize:'16px', color:'red'}} className="material-icons" onClick={()=>this.deleteOrg(ind)}>delete</a><a href='#' style={{fontSize:'16px', color:'green'}} className="small material-icons" onClick={()=> this.editOrg(ind)}>edit</a></td>  <td><ul>{item.jobDescription.sort((a, b) => (a.order > b.order) ? 1 : -1).map((j,indx)=>{return <li key={indx}>{j.order}-{j.jd}-<a href='#' style={{fontSize:'16px', color:'red'}} className="material-icons" onClick={()=>this.deleteExperience(ind,indx)}>delete</a><a href='#' style={{fontSize:'16px', color:'green'}} className="small material-icons" onClick={()=> this.editExperience(ind,indx)}>edit</a></li>})}</ul></td> </tr>})}</tbody></table>
      {/* <table><tbody>{this.state.organizationArray.sort((a, b) => (a.order > b.order) ? 1 : -1).map((item,ind)=>{return <tr key={ind}><td>{item.order}</td><td>{item.organization}</td><td>{item.designation}</td><td>{item.period}</td> </tr>})}</tbody></table> */}
     

        <br/>
      <span style={{color:'blue'}}><b>{this.state.computerSkills}</b></span><br/>
       <ul> {this.state.computerSkillsArray.map((item,ind)=>{return <li key={ind}>{item.order}-{item.skills}- <a href='#' style={{fontSize:'16px', color:'red'}} className="material-icons" onClick={()=>this.deleteItSkills(ind)}>delete</a><a href='#' style={{fontSize:'16px', color:'green'}} className="small material-icons" onClick={()=> this.editItSkills(ind)}>edit</a></li>})}</ul>



<br/>
        <span style={{color:'blue'}}><b>Reference</b></span>
        <p>{this.state.reference}</p>



<br/>




{this.state.onlineDocsArray.map((item,ind)=>{
    return <div style={{backgroundColor:'lightblue', padding:'8px',margin:'5px'}}>
            
            <p>{item.docName}</p>
            <p>{item.link}</p>
            <p><a href='#' style={{fontSize:'16px', color:'red'}} className="material-icons" onClick={()=>this.deleteOnlineDocs(ind)}>delete</a><a href='#' style={{fontSize:'16px', color:'green'}} className="small material-icons" onClick={()=> this.editOnlineDocs(ind)}>edit</a></p>
           </div>

 } )}









        </div>


        





</div>
      );
    }
  
}

export default MyDocs






