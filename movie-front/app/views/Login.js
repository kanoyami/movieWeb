import React from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'


export default class Login extends React.Component {

constructor(props) {
    super(props);
    this.state={email:'',password:'',errorLog:''};
    this.submitLogin = this.submitLogin.bind(this);
    }

handleEmailChange =(event)=>{
    this.setState({email: event.target.value});
  }
handlePasswordChange =(event)=>{
    this.setState({password: event.target.value});
  }

errorLog=()=>this.setState({errorLog:'password or email error'});

submitLogin = (e,callback)=>{

    fetch('/usersApi/login', {
    method: 'POST',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({email:this.state.email,password:this.state.password})
}).then((response)=>{
  return response.json();
}).then((datas)=>{
 //console.log(datas);
    if(datas['status']>=0){
      //console.log(datas);
      this.props.loginDo(datas['datas'],true);
    }else{
      console.log(datas);
      this.errorLog();
    }
}).catch((err)=>{
  console.log(err);
});
  

}
render(){
  return (

  <Form widths='equal' style={{margin:'10px',textAlign:'center'}}>
    <Form.Field>
      <label>email</label>
      <input name='email' onChange={this.handleEmailChange} placeholder='First Name' />
    </Form.Field>
    <Form.Field  >
      <label>密码</label>
      <input id='password' onChange={this.handlePasswordChange} type='password' name='password' placeholder='Last Name' />
    </Form.Field>
    <p style={{color:'red'}}>{this.state.errorLog}</p>
    <Button type='Button' onClick={this.submitLogin} >Submit</Button>
  </Form>

    );
}
  

}
