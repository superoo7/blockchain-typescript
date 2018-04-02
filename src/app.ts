import express = require('express');
import bodyParser = require('body-parser');

import Block from './block';
import BlockChain from './blockchain';
import Transaction from './transaction';
import BlockchainNode from './blockchain_node';

interface TransactionData {
    from: string;
    to: string;
    amount: number;
}

interface BlockchainNodeData {
    url: string;
}

// Transactions & Blockchain
let transactions: TransactionData[] = [];
let genesisBlock = new Block();
let blockchain = new BlockChain(genesisBlock);
let nodes: BlockchainNodeData[] = [];

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

app.post('/nodes/register', function(req, res) {
    let nodeLists: {code: string}[] = req.body.codes;
    nodeLists.map(function (nodeList) {
        let node: BlockchainNodeData = new BlockchainNode(nodeList['code']);
        nodes = [...nodes, node];
    })
    res.json(nodes);
})

app.get('/nodes', function(req, res) {
    res.json(nodes);
})

app.listen(3000, function() {
    console.log('server started');
})


