import _ from 'lodash'
import React, { Component } from 'react'
import { Search, Grid, Header,Label } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';



const resultRenderer = ({ name, vid }) => (
  <Link to={'/home/'+vid}>
  <Label content={name} />
  </Link>
)

resultRenderer.propTypes = {
  name: PropTypes.string,
  vid: PropTypes.string,
}

export default class SearchNav extends Component {

    state = {datas:[]}

  componentWillMount() {
     fetch('/moviesApi/movieList')
  .then(response => response.json())
  .then(results => {
    //console.log(results);
    this.setState({datas:results['datas']})
        this.resetComponent()
  })
    .catch(e => console.log("Oops, error", e))
  }



  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, result) => this.setState({ value: result.name })

  handleSearchChange = (e, value) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(this.state.value, 'i')
      const isMatch = (result) => re.test(result.name)
      //console.log(this.props.source)
      this.setState({
        isLoading: false,
        results: _.filter(this.state.datas, isMatch),
      })
    }, 500)
  }

  render() {
    const { isLoading, value, results } = this.state

    return (
          <Search resultRenderer={resultRenderer}
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={this.handleSearchChange}
            results={results}
            value={value}
            {...this.props}/>
  
    )
  }
}
