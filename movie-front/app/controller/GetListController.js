import React from 'react';

import CardView from '../views/cardview.js'

export default class ViewList extends React.Component {

constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
      datas:[],
    };
  }

handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };



componentWillMount = ()=>{
	fetch('/moviesApi/movieLIst')
	.then(response => response.json())
	.then(results => {
		//console.log(results);
		this.setState({datas:results['datas']})
	})
  	.catch(e => console.log("Oops, error", e))
}

render(){

return (
	<div>
			{this.state.datas.map((data) =>
        	<CardView key={data.vid} data={data} />)}
  </div>
	)

}

}