import Block from '../block';
import BlockChain from '../blockchain';
import Transaction from '../transaction';

interface TransactionData {
    from: string;
    to: string;
    amount: number;
}



let transaction : TransactionData = new Transaction('Han', 'Yan', 12);

let genesisBlock = new Block();
let blockchain = new BlockChain(genesisBlock);

let block = blockchain.getNextBlock([transaction]);
blockchain.addBlock(block);

let anotherTransaction: TransactionData = new Transaction("tester1", "tester2", 10);
let block1 = blockchain.getNextBlock([anotherTransaction, transaction]);

console.log(blockchain);
console.log(blockchain.blocks[blockchain.blocks.length-1].transactions);
console.log(block1.transactions);