import react, {Component , useRef} from 'react'
import '../App.css';
// import {Link, Route,BrowserRouter} from 'react-router-dom'
import firebase from './Fire'
import App from '../App'
import {useReactToPrint} from 'react-to-print'





class PublicView extends Component{
    constructor(){
        super();
        this.state ={
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
            // objectiveHeading:'Loading....',
            // personalInfoHeading:'Loading....',
            // educationInfoHeading:'Loading....',
            // experience:'Loading....',
            // computerSkills:'Loading....',
            pageRefresh:0,
            // show_CV_with_pic:false,
            // show_CV_without_pic:false,
            // showStylishCVwithPic:false,
            // showStylishCV:true,
            // simpleCV:false,
            loadingFromFirebase:1,
            seemsInternetIsSlow:''
                
        }

    }



componentWillMount(){
  firebase.database().ref('myImage').on('child_added' , (data)=> { 
    this.setState({image:data.val()})
      //  this.state.image.push(data.val())
      }  )
}

    
    async componentDidMount(){
        // var userId = firebase.auth().currentUser.uid;
        // var userEmail = firebase.auth().currentUser.email
        // this.setState({user:userId,userEmail:userEmail})
    var dataPromise = new Promise( (res,rej)=>{
    
    
    // firebase.database().ref('myImage').on('child_added' , (data)=> { 
    //   this.setState({image:data.val()})
    //     //  this.state.image.push(data.val())
    //     }  )
    
    
    
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
    this.setState({personalInfoArray:dataObj.personalInfo, educationInfoArray:dataObj.educationInfo, organizationArray:dataObj.organization , computerSkillsArray:dataObj.computerSkill, onlineDocsArray:dataObj.onlineDocs, objectiveHeading:'Objective', personalInfoHeading:'Personal Information', educationInfoHeading:'Education Information', experience:'Experience Record', computerSkills:'Computer/IT Skills'})
    
    
    
    
    // below code is only for change in state for 35 seconds.
    setTimeout(() => {
      
    
      const inteId = setInterval(()=>{
        this.setState({pageRefresh: this.state.pageRefresh+1})
      },1000)
      
      
      setTimeout(() => {
        clearInterval(inteId);
      }, 35000);
    
    
    
    }, 1000);
    
    
    

    
    } )
    
    




    setTimeout(()=>{
      this.setState({loadingFromFirebase:0})
    
    setTimeout(()=>{
      firebase.database().ref('loadingDefaultValue').on('child_added' , (data)=> {
        this.setState({loadingFromFirebase:data.val()})
      }  )
    },900)
    



    setTimeout(()=>{
      this.setState({seemsInternetIsSlow:'Seems internet speed is slow, try again later'})
    },8000)




    
    },200)




      }



      // cvWithPic=()=>{
      //   this.setState({show_CV_with_pic:true,showStylishCV:false,show_CV_without_pic:false})

      //   setTimeout(() => {
      
    
      //     const inteId = setInterval(()=>{
      //       this.setState({pageRefresh: this.state.pageRefresh+1})
      //     },1000)
          
          
      //     setTimeout(() => {
      //       clearInterval(inteId);
      //     }, 35000);
        
        
        
      //   }, 1000);



      // }


      // cvWithoutPic=()=>{
      //   this.setState({show_CV_with_pic:false,showStylishCV:false,showStylishCVwithPic:false, show_CV_without_pic:true})
      // }



      // stylishCV=()=>{
      //   this.setState({showStylishCVwithPic:false ,simpleCV:false, showStylishCV:true})
      // }

        
      // stylishCVwithPic =()=>{
      //   this.setState({showStylishCV:true, simpleCV:false, showStylishCVwithPic:true})
      // }

      // simpleCV=()=>{
      //   this.setState({showStylishCV:true, simpleCV:true, showStylishCVwithPic:false})
      // }





    render(){
        return(
<div style={{backgroundColor:'#ffe6ff'}}>
        <div className={this.state.loadingFromFirebase===0?'display':'container'}>

          <br/>
{/* Header & Name div */}
<fieldset style={{margin:'0px',borderRadius:'15px',border:'2px dotted brown'}}>
<legend style={{textAlign:'center', fontSize:'20px', color:'green'}}><b>Student Profile</b></legend>
{/* <legend className={this.state.showStylishCVwithPic===true?'':'display'} style={{textAlign:'center', fontSize:'22px', color:'green'}}><b>Curriculum Vitae</b><br/><span style={{fontSize:'10px'}}>https://waqas-cv.web.app</span></legend> */}
<div className='row'>
<div className='col s6' style={{border:'1px dotted green',padding:'8px',borderRadius:'9px',height:'150px',backgroundColor:'#ffccff'}}>
<span style={{fontSize:'140%'}}><b>Uswa Waqas</b></span><br/>
<span style={{fontSize:'90%'}}>https://uswa-profile.web.app</span><br/>
<span style={{fontSize:'90%'}}>waqas.mba86@gmail.com</span><br/>
<span style={{fontSize:'90%'}}>Mansoorabad, Faisalabad.</span>

   </div>

    {/* second column */}
         <div className='col s6'>


          {/* <div className={this.state.showStylishCVwithPic===true?'display':''} style={{backgroundColor:this.state.simpleCV===true?'':'', borderRadius:'15px',height:'150px',paddingTop:'30px'}}>
            <h5 style={{textAlign:'center', margin:'0px',padding:'7px',color:this.state.simpleCV===true?'':'blue'}}>Curriculum Vitae</h5>
            <p style={{textAlign:'center',margin:'0px', color:this.state.simpleCV===true?'':'blue'}}>https://waqas-cv.web.app</p>
          </div> */}



          <div style={{borderRadius:'15px',height:'150px', textAlign:'center'}}>
          <img src={this.state.image} alt='Picture Loading...' width='50%' height='90%' className='profile-image'/>
          </div>  



   </div>
   </div>
   </fieldset>

{/* <marquee> <b style={{color:'red',fontSize:'20px'}}>A </b><b style={{color:'green',fontSize:'20px'}}>B </b><b style={{color:'blue',fontSize:'20px'}}>C </b><b style={{color:'#ffa31a',fontSize:'20px'}}>D </b><b style={{color:'black',fontSize:'20px'}}>E </b><b style={{color:'brown',fontSize:'20px'}}>F </b><b style={{color:'brown',fontSize:'20px'}}>G </b><b style={{color:'brown',fontSize:'20px'}}>H </b><b style={{color:'brown',fontSize:'20px'}}>I </b><b style={{color:'brown',fontSize:'20px'}}>J </b><b style={{color:'brown',fontSize:'20px'}}>K </b><b style={{color:'brown',fontSize:'20px'}}>L </b><b style={{color:'brown',fontSize:'20px'}}>M </b><b style={{color:'brown',fontSize:'20px'}}>N </b><b style={{color:'brown',fontSize:'20px'}}>O </b><b style={{color:'brown',fontSize:'20px'}}>P </b><b style={{color:'brown',fontSize:'20px'}}>Q </b><b style={{color:'brown',fontSize:'20px'}}>R </b><b style={{color:'brown',fontSize:'20px'}}>S </b><b style={{color:'brown',fontSize:'20px'}}>T </b><b style={{color:'brown',fontSize:'20px'}}>U </b><b style={{color:'brown',fontSize:'20px'}}>V </b><b style={{color:'brown',fontSize:'20px'}}>W </b><b style={{color:'brown',fontSize:'20px'}}>X </b><b style={{color:'brown',fontSize:'20px'}}>Y </b><b style={{color:'brown',fontSize:'20px'}}>Z </b> </marquee> */}
<marquee> I AM A LITTLE GIRL HAVING BIG AIMS </marquee>




{/* Objective Div of stylishCV */}
{/* <br/><br/>
   <fieldset style={{borderRadius:'10px', border:'1px solid brown'}}>
<legend style={{fontSize:'20px', color:'green',marginLeft:'20px'}}><b>Objective</b></legend>
<div style={{backgroundColor:this.state.simpleCV===true?'':'lightblue', borderRadius:'10px', border:'1px solid gray', padding:'8px'}}>
{this.state.objective}
</div>
</fieldset> */}





{/* <br/><br/> */}
{/* Personal info Div */}
{/* <fieldset style={{borderRadius:'10px', border:'1px solid brown'}}>
<legend style={{fontSize:'20px', color:'green',marginLeft:'20px'}}><b>Personal Information</b></legend> */}

{/* <table style={{padding:'10px', borderRadius:'10px', width:'100%', margin:'auto'}}><tbody>{this.state.personalInfoArray.sort((a, b) => (a.order > b.order) ? 1 : -1).map((item,ind)=>{return <tr style={{borderRadius:'15px', backgroundColor:'lightblue'}} key={ind}><td><b>{item.head}</b></td><td>{item.ans}</td></tr>})}</tbody></table> */}
{/* {this.state.personalInfoArray.sort((a, b) => (a.order > b.order) ? 1 : -1).map((item,ind)=>{ */}
  {/* return <div style={{backgroundColor:this.state.simpleCV===true?'':'lightblue', margin:'4px', borderRadius:'10px', border:'1px solid gray'}}> */}
      {/* <div> */}
              {/* <sapn className='personalInfoSpan'><b>{item.head}</b></sapn>  */}
              {/* <sapn className='personalInfoSpan'>{item.ans}</sapn> */}
      {/* </div> */}
        {/* </div> */}
{/* })} */}


{/* </fieldset> */}








{/* <br/>

<fieldset style={{borderRadius:'10px', border:'1px solid brown'}}>
<legend style={{fontSize:'20px', color:'green',marginLeft:'20px'}}><b>Education</b></legend>



<div>
{this.state.educationInfoArray.sort((a, b) => (a.order > b.order) ? 1 : -1).map((item,ind)=>{
return <div key={ind} style={{marginBottom:'5px', border:'1px solid gray', padding:'7px', backgroundColor:this.state.simpleCV===true?'':'lightblue',borderRadius:'10px'  }}>
<b> {item.degree}  </b>
<span> From <u style={{color:'brown'}}> {item.university}</u></span>
<span> in {item.passingYear}  </span>  =&gt;
<i style={{textDecoration:'non', fontSize:'11px'}}><a href={item.degreeImageLink} target='_blank'><span style={{fontSize:'9px', color:'blue'}}>Click Here to view Certificate?</span></a></i>


</div>

})}
</div>



</fieldset> */}















{/* <br/><br/><br/><br/>



<fieldset style={{borderRadius:'10px', border:'1px solid brown'}}>
<legend style={{fontSize:'20px', color:'green',marginLeft:'20px'}}><b>Experience Record</b></legend>
{this.state.organizationArray.sort((a, b) => (a.order > b.order) ? 1 : -1).map((item,ind)=>{


  return <div key={ind}>
      
        <div style={{border:'1px dotted blue', padding:'10px', borderRadius:'15px',backgroundColor:this.state.simpleCV===true?'':'pink'}}>
            <span className="card-title"><b>{item.designation} =&gt; </b></span>
            <span><u style={{color:'blue'}}>{item.organization}</u> =&gt; </span>
            <span>{item.period}</span>
       </div>
       

<br/>
            <span style={{textDecoration:'underline'}}><b>Job Description</b></span><br/>     
            <ul>
                {item.jobDescription.sort((a, b) => (a.order > b.order) ? 1 : -1).map((it,i)=>{
                    return <li className={it.jd==='Job Description'?'display':''} style={{backgroundColor:this.state.simpleCV===true?'':'lightyellow', fontSize:'11px', paddingLeft:'5px'}}  key={i}>{it.jd}<hr/></li>
                })}
            </ul>
         
      
    </div>
  
  
  })}
  </fieldset> */}









{/* <br/><br/><br/><br/><br/>

  <fieldset style={{borderRadius:'10px', border:'1px solid brown'}}>
<legend style={{fontSize:'20px', color:'green',marginLeft:'20px'}}><b>I.T Skills</b></legend>


{this.state.computerSkillsArray.sort((a, b) => (a.order > b.order) ? 1 : -1).map((item,ind)=>{

return <div style={{marginBottom:'5px', border:'1px solid gray', padding:'7px', backgroundColor:this.state.simpleCV===true?'':'lightblue',borderRadius:'10px'  }} key={ind}>
        {item.skills}
       </div>


})}



</fieldset> */}





{/* <br/><br/><br/>

<fieldset style={{borderRadius:'10px', border:'1px solid brown'}}>
<legend style={{fontSize:'20px', color:'green',marginLeft:'20px'}}><b>Reference</b></legend>
<p style={{marginBottom:'5px', border:'1px solid gray', padding:'7px', backgroundColor:this.state.simpleCV===true?'':'lightblue',borderRadius:'10px'  }}>{this.state.reference}</p>
</fieldset>







<br/><br/><br/>

<fieldset style={{borderRadius:'10px', border:'1px solid brown'}}>
<legend style={{fontSize:'20px', color:'green',marginLeft:'20px'}}><b>Online Documents</b></legend>
<p>The following Documents can view/verify online, please visit <u style={{color:'blue'}}>https://waqas-cv.web.app</u>  and Click on one of the following document as you need. </p>

<ul>
  {this.state.onlineDocsArray.map((item,ind)=>{
    return <li key={ind} className='listItemOfOnlineDocs'>
           <a href={item.link} target='_blank'> {item.docName}</a>
          </li>
  })}
</ul>


</fieldset> */}












  {/* last closing div tag of stylishCV */}





{/* <p style={{textAlign:'center',letterSpacing:'15px'}}><abbr title='CV without pic' style={{cursor:'pointer'}} onClick={this.stylishCV}>*</abbr><abbr title='CV with Pic' style={{cursor:'pointer'}} onClick={this.stylishCVwithPic}>*</abbr><abbr title='Simple CV' style={{cursor:'pointer'}} onClick={this.simpleCV}>*</abbr> </p> */}

{/* <abbr title='CV with Pic' style={{cursor:'pointer'}} onClick={this.cvWithPic}>*</abbr><abbr title='CV Without Pic' style={{cursor:'pointer'}} onClick={this.cvWithoutPic}>*</abbr> */}




</div>





<div className={this.state.loadingFromFirebase===0?'container':'display'}>
  <br/><br/><br/>
  {/* <span style={{color:'green',fontSize:'23px'}}>Loading.....</span><br/> */}
  
  <span style={{color:'green',fontSize:'20px'}}>Please Wait....</span><br/>

{/* below is pre-loader code */}
  <div class="preloader-wrapper active">
    <div class="spinner-layer spinner-red-only">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div><div class="gap-patch">
        <div class="circle"></div>
      </div><div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>
  </div>
  

  <br/>
  
  
  <span style={{color:'red'}}>{this.state.seemsInternetIsSlow}</span>
</div>



        </div>
        )
    }
}





//This Component is made to show the all App you made
class LoginCompo extends Component{
    constructor(){
        super();
        this.state ={
                user:null,
                
        }

    }


    componentDidMount(){
        this.authListener();
        
        }
        
        authListener = ()=>{
        firebase.auth().onAuthStateChanged( (user)=>{
            if(user){
                this.setState({user})
                // console.log(user.email)
        
        
            } else {
                this.setState({user:null})
            }
        })
        }

    render(){
        return(
        <div>

            

{this.state.user ? (<App/>) : <LoginForm/>}

        </div>
        )
    }
}

// export default Login;









//THis Component is made to login by the user (it is login form)
class LoginForm extends Component{
   
    constructor(){
        super();
        this.state ={
                forgetStatus:false,
                forgetEmial:'',
                wait:'',
                showForm:false
                
        }

    }




    signin = ()=>{
     const email = document.querySelector('#email').value;
     const password = document.querySelector('#password').value;
     
 
 
 
     firebase.auth().signInWithEmailAndPassword(email, password)
     .then( (u)=>{
 
         // console.log(u.user.uid)
         // console.log(u)
         
     } )
     .catch( (err)=>{
         alert('Your Password is incorrect or you are not registered.')
         console.log('error')
     } )
 




this.setState({wait:'Please Wait'})




    } 
 
 



    showForgetField = ()=>{
        this.setState({forgetStatus:true})
    }


    changeHandler = (e)=>{
        this.setState({forgetEmial: e.target.value})

        console.log(this.state.forgetEmial)
    }


    ressetPassword = ()=>{

        firebase.auth().sendPasswordResetEmail(this.state.forgetEmial)
        .then(()=>{
            alert('Please check email and reset your password')
        }).catch((error)=>{
            alert(error)
        })

    }





     render(){
         return (
             <div className='container'>
 
 {/* <div id='div1'> 
      My Documents
      </div> */}
      {/* <span style={{fontSize:'12px'}}>{navigator.onLine===true ? <span style={{color:'green'}}>You are online</span> : <span style={{color:'red'}}>You are OffLine</span>}</span> */}
<br/><br/>

<button style={{cursor:'pointer'}} onClick={()=>{this.setState({showForm:true})}}>Manage-CV</button>
<br/><br/><br/>
<div className={this.state.showForm===true?'':'display'}>
             <div className="row container">
             <div className="col s12">
              
              
              
               <div className="input-field">
              <input placeholder="Email" id="email" type="text" className="validate" />
              {/* <label forhtml="first_name">First Name</label> */}
               </div>
 
               <div className="input-field">
              <input placeholder="Password" id="password" type="password" className="validate" />
              {/* <label forhtml="first_name">First Name</label> */}
               </div>
 
               <button className="waves-effect btn-large" onClick={this.signin}>Login</button>

                <a href='#' onClick={this.showForgetField}>Forget Password ?</a>


                <p>{this.state.wait}</p>

<br/><br/><br/>

                
                <div className={this.state.forgetStatus === false ? 'display' : ''}>
                <p><b style={{color:'green'}}>Pleae enter your email address in below field on which you want to reset your Password</b></p>
                <input type='text' value={this.state.forgetEmial} name='forgetEmail' onChange={this.changeHandler} placeholder='Write Email here' />
                <button onClick={this.ressetPassword} className="waves-effect btn-large">Resset</button>
                
                </div>


              </div>
              </div>
 


              {/* <br/><br/>
<div className='bottomLine'> 
Prepared By: Waqas Saleem <br/>
Easy Accounts Management System<br/>
Contact: 0346-7605798 Email: waqas_mba86@yahoo.com
</div> */}

</div>
             </div>
         )
     }
 }










 const Login = ()=>{

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: ()=>componentRef.current,
    })
    
      return(
        <div>
        <PublicView ref={componentRef}/>
        <br/><br/><br/>
        <a id='printButton' onClick={handlePrint}>PDF/Print CV</a>
        <br/><br/><br/><br/>
        <LoginCompo />
    
    
        
        </div>
      )
    }
    
    
    
    export default Login;