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

// Transactions
let transactions: TransactionData[] = [];

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


