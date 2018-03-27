import sha256 from 'js-sha256';

export interface BlockData {
    previousHash: String;
    hash: any;
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

    generateHash(block: BlockData) {
        let hash = sha256(block.key);
        return hash;
    }
}