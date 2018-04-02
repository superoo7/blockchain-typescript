import {machineIdSync} from 'node-machine-id';

interface BlockchainNodeData {
    code: string;
}

export default class BlockchainNode implements BlockchainNodeData {
    constructor(public code: string){
        
    }
}