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
            type: 'PC',
            status: 'using',
            user: 'Can',
            buyTime: '2019-01-01',
            price: '200000000',
            model: 'Dell XPS',
            serialNumber: '1234567890',
            supplier: 'Dell',
            createdAt: '2019-01-01',
            updatedAt: '2019-01-01'
        }
        await ctx.stub.putState(equipment.id, Buffer.from(JSON.stringify(equipment)));
        console.log('============= END : Initialize Ledger ===========');
    }

    async createEquipment(ctx, id, name, type, status, user, buyTime, price, model, serialNumber, supplier, createdAt, updatedAt) {
        
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
            supplier: supplier,
            createdAt: createdAt,
            updatedAt: updatedAt
        }
        try {
            await ctx.stub.putState(id, Buffer.from(JSON.stringify(equipment)));
        } catch (error) {
            throw error;
        }
        return equipment;
    }

    async readEquipment(ctx, id) {
        const equipmentAsBytes = await ctx.stub.getState(id); // get the transaction from chaincode state
        if (!equipmentAsBytes || equipmentAsBytes.length === 0) {
            throw new Error(`The asset ${id} does not exist`);
        }
        return equipmentAsBytes.toString();
    }

    async updateEquipment(ctx, id, name, type, status, user, buyTime, price, model, serialNumber, supplier, createdAt, updatedAt) {
        const equipmentAsBytes = await ctx.stub.getState(id); // get the transaction from chaincode state
        if (!equipmentAsBytes || equipmentAsBytes.length === 0) {
            throw new Error(`The asset ${id} does not exist`);
        }
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
            supplier: supplier,
            createdAt: createdAt,
            updatedAt: updatedAt
        }
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(equipment)));
        return equipment.toString();
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
            allResults.push({ key: key, equipment: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }

    async changeEquipmentStatus(ctx, id, status, updatedAt) {
        const equipmentAsBytes = await ctx.stub.getState(id); // get the transaction from chaincode state
        if (!equipmentAsBytes || equipmentAsBytes.length === 0) {
            throw new Error(`The asset ${id} does not exist`);
        }
        const equipment = JSON.parse(equipmentAsBytes.toString());
        equipment.status = status;
        equipment.updatedAt = updatedAt;
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(equipment)));
        return equipment;
    }

    async changeEquipmentUser(ctx, id, user, updatedAt) {
        const equipmentAsBytes = await ctx.stub.getState(id); // get the transaction from chaincode state
        if (!equipmentAsBytes || equipmentAsBytes.length === 0) {
            throw new Error(`The asset ${id} does not exist`);
        }
        const equipment = JSON.parse(equipmentAsBytes.toString());
        equipment.user = user;
        equipment.updatedAt = updatedAt;
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(equipment)));
        return equipment;
    }
}

module.exports = EquipmentContract;