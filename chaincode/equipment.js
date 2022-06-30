'use strict';
const {
    Contract
} = require('fabric-contract-api');

class EquipmentContract extends Contract {
    async initLedger(ctx) {
        console.log('============= START : Initialize Ledger ===========');
        const equipment = {
            id: 'PC_01',
            name: 'Cans PC',
            type: 'Type 1',
            status: 'using',
            user: 'Can',
            buyTime: '2019-01-01',
            price: '200000000',
            model: 'Dell XPS',
            serialNumber: '1234567890',
            supplier: 'Dell'
        }
        await ctx.stub.putState(equipment.id, Buffer.from(JSON.stringify(equipment)));
        console.log('============= END : Initialize Ledger ===========');
    }

    async createEquipment(ctx, id, equipmentDetails) {
        const {
            name,
            type,
            status,
            user,
            buyTime,
            price,
            model,
            serialNumber,
            supplier
        } = equipmentDetails;
        const equipment = {
            id: id,
            name: name,
            type: type,
            status: status,
            user: user,
            buyTime: buyTime,
            price: price,
            model: model,
            serialNumber: serialNumber,
            supplier: supplier
        };
        ctx.stub.putState(id, Buffer.from(JSON.stringify(equipment)));
        return equipment;
    }

    async readEquipment(ctx, id) {
        const equipmentAsBytes = await ctx.stub.getState(id); // get the transaction from chaincode state
        if (!equipmentAsBytes || equipmentAsBytes.length === 0) {
            throw new Error(`The asset ${id} does not exist`);
        }
        return equipmentAsBytes.toString();
    }

    async updateEquipment(ctx, id, equipmentDetails) {
        const equipmentAsBytes = await ctx.stub.getState(id); // get the transaction from chaincode state
        if (!equipmentAsBytes || equipmentAsBytes.length === 0) {
            throw new Error(`The asset ${id} does not exist`);
        }
        const equipment = {
            id: id,
            name: equipmentDetails.name,
            type: equipmentDetails.type,
            status: equipmentDetails.status,
            user: equipmentDetails.user,
            buyTime: equipmentDetails.buyTime,
            price: equipmentDetails.price,
            model: equipmentDetails.model,
            serialNumber: equipmentDetails.serialNumber,
            supplier: equipmentDetails.supplier
        }
        ctx.stub.putState(id, Buffer.from(JSON.stringify(equipment)));
        return equipment;
    }

    async deleteEquipment(ctx, id) {
        const equipmentAsBytes = await ctx.stub.getState(id); // get the transaction from chaincode state
        if (!equipmentAsBytes || equipmentAsBytes.length === 0) {
            throw new Error(`The asset ${id} does not exist`);
        }
        ctx.stub.deleteState(id);
        return 'Successfully deleted';
    }

    async queryAllEquipments(ctx) {
        const startKey = '';
        const endKey = '';
        const allResults = [];
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }

    async changeEquipmentStatus(ctx, id, status) {
        const equipmentAsBytes = await ctx.stub.getState(id); // get the transaction from chaincode state
        if (!equipmentAsBytes || equipmentAsBytes.length === 0) {
            throw new Error(`The asset ${id} does not exist`);
        }
        const equipment = {
            id: id,
            name: equipmentAsBytes.name,
            type: equipmentAsBytes.type,
            status: status,
            user: equipmentAsBytes.user,
            buyTime: equipmentAsBytes.buyTime,
            price: equipmentAsBytes.price,
            model: equipmentAsBytes.model,
            serialNumber: equipmentAsBytes.serialNumber,
            supplier: equipmentAsBytes.supplier
        }
        ctx.stub.putState(id, Buffer.from(JSON.stringify(equipment)));
        return equipment;
    }

    async changeEquipmentUser(ctx, id, user) {
        const equipmentAsBytes = await ctx.stub.getState(id); // get the transaction from chaincode state
        if (!equipmentAsBytes || equipmentAsBytes.length === 0) {
            throw new Error(`The asset ${id} does not exist`);
        }
        const equipment = {
            id: id,
            name: equipmentAsBytes.name,
            type: equipmentAsBytes.type,
            status: equipmentAsBytes.status,
            user: user,
            buyTime: equipmentAsBytes.buyTime,
            price: equipmentAsBytes.price,
            model: equipmentAsBytes.model,
            serialNumber: equipmentAsBytes.serialNumber,
            supplier: equipmentAsBytes.supplier
        }
        ctx.stub.putState(id, Buffer.from(JSON.stringify(equipment)));
        return equipment;
    }
}

module.exports = EquipmentContract;