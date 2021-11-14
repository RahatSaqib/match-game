# Match Game

***

## 【Introduction of Match Game】
- A matching game where a user play games with card. If two cards match user will achieve some amount of ether on his account.


&nbsp;
## 【Video Overview】
Demo video link: https://drive.google.com/file/d/1T_orQDgcib8jT36BTNZv2OyRAK--T3JP/view?usp=sharing
***
## 【Screenshots】
![MG1](https://user-images.githubusercontent.com/37343956/141669682-f9dd61e2-f248-4726-a578-65d9f3c74b76.png)
![MG2](https://user-images.githubusercontent.com/37343956/141669687-f0636b56-bb14-4c67-984c-cca9299aa6c8.png)
![MG3](https://user-images.githubusercontent.com/37343956/141669691-76cbad05-1cb5-49ba-acce-2fb480661123.png)


## 【Setup】

### Setup private network by using Ganache-CLI
1. Download Ganache-CLI from link below  
https://www.trufflesuite.com/ganache  


2. Execute Ganache   
```
$ ganache-cli -d
```
※ `-d` option is the option in order to be able to use same address on Ganache-CLI every time.

&nbsp;


### Setup wallet by using Metamask
1. Add MetaMask to browser (Chrome or FireFox or Opera or Brave)    
https://metamask.io/  


2. Adjust appropriate newwork below 
```
http://127.0.0.1:7545
```

&nbsp;


### Setup backend
1. Deploy contracts to private network of Ganache
```
(root directory)

$ truffle migrate --reset development
```

&nbsp;


### Setup frontend
1. NPM modules install
```
$ cd client
$ npm install
```

2. Execute command below in root directory.
```
$ cd ..
$ npm run start
```

3. Access to browser by using link 
```
http://localhost:3000
```

&nbsp;

***
