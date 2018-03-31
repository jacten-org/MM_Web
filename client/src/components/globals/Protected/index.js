import React, {Component} from 'react';
import jwtDecode from 'jwt-decode';

class Protected extends Component {
  componentDidMount() {
    try {
      // const { NODE_ENV } = process.env;
      // console.log('process env', process.env)
      // console.log('should be production', NODE_ENV)
      // if(NODE_ENV === 'DEVELOPMENT') {
      //   const { exp } = jwtDecode(localStorage.token);
      //   if (exp < Math.floor(Date.now()/1000)) 
      //     this.props.history.push('/login')
      // }
      const { exp } = jwtDecode(localStorage.token);
      if (exp < Math.floor(Date.now()/1000)) {
        this.props.history.push('/login')
      }
    } catch (err) {
      console.log('error in Protected', err)
      this.props.history.push('/login')
    }
  }
  render() {
    const { component: Component } = this.props
    return (
      <Component {...this.props}/>
    )
  }
 }

export default Protected;