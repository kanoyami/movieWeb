import React from 'react';

import Comments from '../views/comments.js'
import { Comment,Form,Button } from 'semantic-ui-react'
export default class CommentList extends React.Component {

constructor(props) {
    super(props);
    console.log(props.vid)
    this.state = {
      comments: '',
      datas:[],
    };
  }

handleChange = (event) => {
    this.setState({
      comments: event.target.value
    });
  };

submitComment=()=>{
  if(window.localStorage.loginState){

    fetch('/usersApi/postComment', {
    method: 'POST',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({vid:this.props.vid,comment:this.state.comments,token:window.localStorage.token})
}).then((response)=>{
  return response.json();
}).then((datas)=>{
 //console.log(datas);
    if(datas['status']>=0){
      //console.log(datas);
      this.getData();

    }else{
      console.log(datas);
    }
}).catch((err)=>{
  console.log(err);
});
  }else{
    alert('please login to do');
  }
}


getData = () =>{
  fetch('/moviesApi/movieComment?vid='+this.props.vid)
  .then(response => response.json())
  .then(results => {
    console.log(results);
    this.setState({datas:results['datas']})
  })
    .catch(e => console.log("Oops, error", e))
}

componentWillMount = ()=>{
	this.getData();
}

render(){

return (
	<Comment.Group>
			{this.state.datas.map((data) =>
        	<Comments key={data.mc_id} data={data} />)}
      
    <Form reply onSubmit={e => e.preventDefault()}>
      <Form.TextArea onChange={this.handleChange}/>
      <Button onClick={this.submitComment} content='Add Reply' labelPosition='left' icon='edit' primary />
    </Form>

  </Comment.Group>
	)

}

}