//libraries
import React from 'react';
import axios from 'axios';
import Promise from 'bluebird';

//components
import About from './About.jsx';
import BuyWidget from './BuyWidget.jsx';
import SidebarMetadata from './SidebarMetadata.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      product: {
        title: '',
        price: '',
        developer: '',
        publisher: '',
        releaseDate: '',
        genres: [],
        description: '',
        shortDescription: ''
      }
    }
  }

  getProduct() {
    var p = window.location.pathname;
    var url = '/api/product/' + p.slice(1, -1);
    console.log(url);
    axios.get(url).then((response) => {
      console.log(response.data)
      this.setState({
        product: response.data
      })
    })
  }

  componentDidMount() {
    this.getProduct();
  }

  render() {
    return (
      <div>
        <About product={this.state.product}/> <br /><br />
        <BuyWidget product={this.state.product}/> <br /><br />
        <SidebarMetadata product={this.state.product}/>
      </div>
    )
  }
}

export default App;