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
        releasedate: '',
        genre: '',
        description: '',
        shortdescription: ''
      }
    }
  }

  getProduct() {
    var p = window.location.pathname;
    if (p[p.length - 1] === '/') {
      var url = '/api/product/' + p.slice(1, -1);
    } else {
      var url = '/api/product/' + p.slice(1);
    }

    axios.get(url).then((response) => {
      this.setState({
        product: response.data
      })
    });
  }

  componentDidMount() {
    this.getProduct();
  }

  render() {
    return (
      <div>
        <div className='mainbar' style={
          {
            display: 'inline-block',
            marginRight: '10px',
            textAlign: 'left'
          }
        }>
          <BuyWidget product={this.state.product}/>
          <About product={this.state.product}/>
        </div>
        <div className='sidebar' style={
          {
            display: 'inline-block',
            verticalAlign: 'top',
            textAlign: 'left'
          }
        }>
          <SidebarMetadata product={this.state.product}/>
        </div>
      </div>
    )
  }
}

export default App;