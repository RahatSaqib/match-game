import logo from './logo.svg';
import './App.css';
import './components/Navbar';
import Navbar from './components/Navbar';
import MatchGame from './abis/MatchGame.json';

import React, { Component } from 'react';
import Web3 from 'web3'

const GAME_ARRAY = [
  {
    name: 'cricket',
    img: '/images/cricket.png'
  },
  {
    name: 'bat',
    img: '/images/bat.png'
  },
  {
    name: 'bolleyball',
    img: '/images/bolleyball.png'
  },
  {
    name: 'football',
    img: '/images/football.png'
  },
  {
    name: 'rugby',
    img: '/images/rugby.png'
  },
  {
    name: 'tennis',
    img: '/images/tennis.png'
  },
  {
    name: 'cricket',
    img: '/images/cricket.png'
  },
  {
    name: 'bat',
    img: '/images/bat.png'
  },
  {
    name: 'bolleyball',
    img: '/images/bolleyball.png'
  },
  {
    name: 'football',
    img: '/images/football.png'
  },
  {
    name: 'rugby',
    img: '/images/rugby.png'
  },
  {
    name: 'tennis',
    img: '/images/tennis.png'
  }
]

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
    this.setState({ gameArray: GAME_ARRAY.sort(() => 0.5 - Math.random()) })
  }
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }
  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    // Load smart contract
    const networkId = await web3.eth.net.getId()
    const networkData = MatchGame.networks[networkId]
    if(networkData) {
      const abi = MatchGame.abi
      const address = networkData.address
      const token = new web3.eth.Contract(abi, address)
      this.setState({ token })
      const totalSupply = await token.methods.totalSupply().call()
      this.setState({ totalSupply })
      // Load Tokens
      let balanceOf = await token.methods.balanceOf(accounts[0]).call()
      let accountBalance = window.web3.utils.fromWei( await web3.eth.getBalance(accounts[0]))
      this.setState({accountBalance: accountBalance});
      console.log(accountBalance );
      for (let i = 0; i < balanceOf; i++) {
        let id = await token.methods.tokenOfOwnerByIndex(accounts[0], i).call()
        let tokenURI = await token.methods.tokenURI(id).call()
        this.setState({
          tokenURIs: [...this.state.tokenURIs, tokenURI]
        })
      }
    } else {
      alert('Smart contract not deployed to detected network.')
    }
  }
  chooseImage = (gameID) => {
    gameID = gameID.toString()
    if(this.state.gamesWon.includes(gameID)) {
      return window.location.origin + '/images/white.png'
    }
    else if(this.state.cardsChosenId.includes(gameID)) {
      return GAME_ARRAY[gameID].img
    } else {
      return window.location.origin + '/images/background.png'
    }
  }

  flipCard = async (gameID) => {
    let alreadyChosen = this.state.cardsChosen.length

    this.setState({
      cardsChosen: [...this.state.cardsChosen, this.state.gameArray[gameID].name],
      cardsChosenId: [...this.state.cardsChosenId, gameID]
    })

    if (alreadyChosen === 1) {
      setTimeout(this.checkForMatch, 100)
    }
  }


  checkForMatch = async () => {
    const optionOneId = this.state.cardsChosenId[0]
    const optionTwoId = this.state.cardsChosenId[1]

    if(optionOneId == optionTwoId) {
      alert('You have clicked the same image!')
    } else if (this.state.cardsChosen[0] === this.state.cardsChosen[1]) {
      alert('You found a match')
      this.state.token.methods.mint(
        this.state.account,
        window.location.origin + GAME_ARRAY[optionOneId].img.toString()
      )
      .send({ from: this.state.account })
      .on('transactionHash', (hash) => {
        this.setState({
          gamesWon: [...this.state.gamesWon, optionOneId, optionTwoId],
          tokenURIs: [...this.state.tokenURIs, GAME_ARRAY[optionOneId].img]
        })
      })
    } else {
      alert('Sorry, try again')
    }
    this.setState({
      cardsChosen: [],
      cardsChosenId: []
    })
    if (this.state.gamesWon.length === GAME_ARRAY.length) {
      alert('Congratulations! You found them all!')
    }
  }
  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      accountBalance: 0,
      token: null,
      totalSupply: 0,
      tokenURIs: [],
      gameArray: [],
      cardsChosen: [],
      cardsChosenId: [],
      gamesWon: []
    }
  }

  render(){  
    return (
    <div className="App">
      <Navbar account = {this.state.account}
              accountBalance ={this.state.accountBalance}/>
      <div className="container-fluid mt-5">
            <div className="row">
              <main role="main" className="col-lg-12 d-flex text-center">
                <div className="content mr-auto ml-auto">
                  <h1 className="d-4">Start matching now!</h1>

                  <div className="flex mb-4 gameAlignment" >

                    { this.state.gameArray.map((card, key) => {
                      return(
                        <img className ="gameImage"
                          key={key}
                          src={this.chooseImage(key)}
                          data-id={key}
                          onClick={(event) => {
                            let gameID = event.target.getAttribute('data-id')
                            if(!this.state.gamesWon.includes(gameID.toString())) {
                              this.flipCard(gameID)
                            }
                          }}
                        />
                      )
                    })}


                  </div>

                  <div className="tokenAlignment">

                    <h5>Tokens Collected:<span id="result">&nbsp;{this.state.tokenURIs.length}</span></h5>

                    <div className="grid mb-4" >

                      { this.state.tokenURIs.map((tokenURI, key) => {
                        return(
                          <img className="gameImage"
                            key={key}
                            src={tokenURI}
                          />
                        )
                      })}

                    </div>

                  </div>

                </div>

              </main>
            </div>
      </div>
      </div>
  );}
}

export default App;
