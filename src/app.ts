import express = require('express');
import bodyParser = require('body-parser');

import Block from './block';
import BlockChain from './blockchain';
import Transaction from './transaction';

interface TransactionData {
    from: string;
    to: string;
    amount: number;
}

// Transactions & Blockchain
let transactions: TransactionData[] = [];
let genesisBlock = new Block();
let blockchain = new BlockChain(genesisBlock);

// API
const app = express();

app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send("hello world");
})

app.post('/transactions', function(req, res) {
    let {to, from, amount} = req.body;
    console.log(`Transfer ${amount} from ${from} to ${to}`);
    let transaction = new Transaction(from, to, amount);
    transactions = [...transactions, transaction];
    res.json(transactions);
})

app.get('/mine', function(req, res) {
    let mineBlock = blockchain.getNextBlock(transactions);
    blockchain.addBlock(mineBlock);
    res.json(mineBlock);
})

app.get('/blockchain', function(req, res) {
    res.json(blockchain);
})

app.listen(3000, function() {
    console.log('server started');
})


