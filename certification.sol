pragma solidity ^0.4.11;

contract Certification {
  
  mapping (bytes32 => uint8) public certificatesReceived;
  
  bytes32[] public apprenticeList;

  function Certification(bytes32[] apprenticeNames) {  
    apprenticeList = apprenticeNames;
  }

  function totalCertificatesFor(bytes32 apprentice) returns (uint8) {
    if (validApprentice(apprentice) == false) throw;
    return certificatesReceived[apprentice];
  }

  function certificateForApprentice(bytes32 apprentice) {
    if (validApprentice(apprentice) == false) throw;
    certificatesReceived[apprentice] += 1;
  }

  function validApprentice(bytes32 apprentice) returns (bool) {
    for(uint i = 0; i < apprenticeList.length; i++) {
      if (apprenticeList[i] == apprentice) {
        return true;
      }
    }
    return false;
  }
}
