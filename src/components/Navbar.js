import React,{ Component } from 'react';
import ReactDOM from 'react-dom';

class Navbar extends Component{
    // var accountSplice  =  this.props.account.slice(0,4);

    render(){
        return(
            <header className="text-gray-600 body-font">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
                <a className="mr-5 hover:text-gray-900 account">Account : {this.props.account.slice(0,5)}....{this.props.account.slice(-5)}</a>

                </nav>
                <a className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
                <span className="ml-3 text-xl headerTitle2" style ={{color :"white"}}>Match <span className="text-xl headerTitle">Game</span></span>
                </a>
                <div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
                <a className="mr-5 hover:text-gray-900 account">Balance : {this.props.accountBalance}</a>

                </div>
            </div>
            </header>
        );
    }
}
export default Navbar;