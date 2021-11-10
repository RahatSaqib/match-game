const MatchGame = artifacts.require("MatchGame");

module.exports = function(deployer) {
  deployer.deploy(MatchGame);
};