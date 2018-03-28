import sha256 from 'js-sha256';
import Block from './block';

interface BlockData {
    index: number,
    hash: string;
    previousHash: string;
    nonce: number;
    transactions: TransactionData[];
    key: string;
}

interface TransactionData {
    from: string,
    to: string,
    amount: number
}
export default class Blockchain {
    private blocks: BlockData[];

    constructor(private genesisBlock: any) {
        this.blocks = [];
        this.addBlock(genesisBlock);
    }

    addBlock(block: BlockData): void {
        if (this.blocks.length === 0) {
            block.previousHash = "000000000000000";
            block.hash = this.generateHash(block);
        }
        this.blocks.push(block);
    }

    getNextBlock(transactions: TransactionData[]) {
        let block = new Block();

        transactions.forEach(function(t: TransactionData) {
            block.addTransaction(t);
        })

        let previousBlock = this.getPreviousBlock();
        block.index = this.blocks.length;
        block.previousHash = previousBlock.hash;
        block.hash = this.generateHash(block);

        return block;
    }

    getPreviousBlock() : BlockData {
        return this.blocks[this.blocks.length - 1]
    }

    generateHash(block: BlockData) : string {
        let hash = sha256(block.key);

        // Mining
        while(!hash.startsWith("000")){
            block.nonce = block.nonce + 1;
            hash = sha256(block.key);
            console.log(hash);
        }

        return hash;
    }
}