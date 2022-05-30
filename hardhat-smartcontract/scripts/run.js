const main = async () => {
    const gameContractFactory = await hre.ethers.getContractFactory('MyEpicGame');
    const gameContract = await gameContractFactory.deploy(
      ["Leo", "Aang", "Pikachu"],       
      ["https://i.imgur.com/aZkuP0D.gif", 
      "https://i.imgur.com/xVu4vFL.png", 
      "https://i.imgur.com/u7T87A6.png"],
      [300, 200, 300],                    
      [100, 50, 25],
      "Elon Musk", // Boss name
  "https://i.imgur.com/AksR0tt.png", // Boss image
  10000, // Boss hp
  50 // Boss attack damage
    );
    await gameContract.deployed();
    console.log("Contract deployed to:", gameContract.address);

    let txn;
     txn = await gameContract.mintCharacterNFT(2);
        await txn.wait;

        let returnedTokenUri = await gameContract.tokenURI(1);
        console.log("Token URI:", returnedTokenUri)
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();