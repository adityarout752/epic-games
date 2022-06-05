const CONTRACT_ADDRESS = '0x7018Ceb36997039F8D8F3175f1ff9bC983b472DD';

const transformCharacterData = (characterData) => {
    return {
        name: characterData.name,
        imageURI: characterData.imageURI,
        hp: characterData.hp.toNumber(),
        maxHp: characterData.maxHp.toNumber(),
        attackDamage: characterData.attackDamage.toNumber(),
      };
};

export { CONTRACT_ADDRESS,transformCharacterData };