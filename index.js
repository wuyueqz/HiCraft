web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse('[{"constant":false,"inputs":[{"name":"apprentice","type":"bytes32"}],"name":"totalCertificatesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"apprentice","type":"bytes32"}],"name":"validApprentice","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"certificatesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"x","type":"bytes32"}],"name":"bytes32ToString","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"apprenticeList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"apprentice","type":"bytes32"}],"name":"certificateForApprentice","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"contractOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"apprenticeNames","type":"bytes32[]"}],"payable":false,"type":"constructor"}]')
CertificationContract = web3.eth.contract(abi);
// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
contractInstance = CertificationContract.at('0xe8e6a562884b76f11e589cc8cae76207e2122a2a');
apprentices = {"Spiderman": "apprentice-1", "Batman": "apprentice-2", "Pushpita": "apprentice-3"};

function certificateForApprentice() {
  apprenticeName = $("#apprentice").val();
  contractInstance.certificateForApprentice(apprenticeName, {from: web3.eth.accounts[0]}, function() {
    let div_id = apprentices[apprenticeName];
    $("#" + div_id).html(contractInstance.totalCertificatesFor.call(apprenticeName).toString());
  });
}

$(document).ready(function() {
  apprenticeNames = Object.keys(apprentices);
  for (var i = 0; i < apprenticeNames.length; i++) {
    let name = apprenticeNames[i];
    let val = contractInstance.totalCertificatesFor.call(name).toString();
    $("#" + apprentices[name]).html(val);
  }
});