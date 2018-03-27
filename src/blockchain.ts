import sha256 from 'js-sha256';
import Block from './block';

export interface BlockData {
    index: number,
    hash: String;
    previousHash: String;
    nonce: number;
    transactions: String[];
    key: String;
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

    getNextBlock(transactions: String[]) : BlockData {
        let block = new Block();

        transactions.forEach(function(t: String) {
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

    generateHash(block: BlockData) : String {
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