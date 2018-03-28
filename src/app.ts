import express = require('express');

import Block from './block';
import BlockChain from './blockchain';
import Transaction from './transaction';

interface TransactionData {
    from: string;
    to: string;
    amount: number;
}

// API
const app = express();

app.get('/', function(req, res) {
    res.send("hello world");
})

app.get('/blockchain', function(req, res) {
    let transaction : TransactionData = new Transaction('Han', 'Yan', 12);

    let genesisBlock = new Block();
    let blockchain = new BlockChain(genesisBlock);

    let block = blockchain.getNextBlock([transaction]);
    blockchain.addBlock(block);

    let anotherTransaction: TransactionData = new Transaction("tester1", "tester2", 10);
    let block1 = blockchain.getNextBlock([anotherTransaction, transaction]);

    res.json(blockchain);
})

app.listen(3000, function() {
    console.log('server started');
})


