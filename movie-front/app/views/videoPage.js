import React from 'react'
import { Container ,Grid, Image, Divider } from 'semantic-ui-react'
import CommentList from '../controller/CommentsListController.js'
import ReactPlayer from 'react-player'

export default class VideoPage extends React.Component {
	constructor(props) {
    super(props);
    this.state={datas:[],adv_data:[],controls:false};
  }

  componentWillMount = ()=>{
  fetch('/moviesApi/movieList?vid='+this.props.match.params.vid)
  .then(response => response.json())
  .then(results => {
    if(!window.localStorage.loginState){
      fetch('/moviesApi/movieAdv')
  .then(response => response.json())
  .then(results_adv => {
    ///console.log(results);
    this.setState({datas:results,adv_data:results_adv['datas']});
  }).catch(e => console.log("Oops, error", e));
    }else
    this.setState({datas:results['datas'][0]});
  })
    .catch(e => console.log("Oops, error", e));
}

   changeVideo=()=>{

    this.setState({adv_data:this.state.datas.datas[0],controls:true});
   }


  render(){
  //	console.log(this.state);
    return(
   <Grid centered columns={1}>
      <Grid.Column>
      


      	<h1>{this.state.datas.name}</h1>
        <Container text>
        {(window.localStorage.loginState)?<ReactPlayer playing  url={this.state.datas.src}  controls={true} />:
        <ReactPlayer playing url={this.state.adv_data.src} onEnded={this.changeVideo}  controls={this.state.controls} />

      }
        
        </Container>
      </Grid.Column>
       <Divider horizontal>Content</Divider>

      <Grid.Column centered columns={1}>
      <div style={{marginRight:'100px'}} >
        <p>{this.state.datas.tinycontent}</p>
      </div>
      </Grid.Column>
      <Divider horizontal>Comments</Divider>
      <Grid.Column centered columns={1}>
      <div style={{marginRight:'100px'}} >
        <Container text textAlign={'left'}>
         <CommentList vid={this.props.match.params.vid}/>
   	    </Container>
     </div>
      </Grid.Column>
    </Grid>
    	)
}
}