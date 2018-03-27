import Block from './block';
import BlockChain from './blockchain';
import Transaction from './transaction';

let transaction = new Transaction('Han', 'Yan', 12);

let genesisBlock = new Block();
let blockchain = new BlockChain(genesisBlock);

console.log(blockchain);