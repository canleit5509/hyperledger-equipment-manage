'use strict';

const {
  Contract
} = require('fabric-contract-api');

class TransactionContract extends Contract {
  async initLedger(ctx) {
    console.log('============= START : Initialize Ledger ===========');
    const transaction = {
      transactionId: 1,
      transactionType: 2,
      transactionAmount: 3,
      transactionDate: 4,
      transactionStatus: 5
    };
    await ctx.stub.putState('1', Buffer.from(JSON.stringify(transaction)));
    console.log('============= END : Initialize Ledger ===========');
  }

  async createTransaction(ctx, transactionId, transactionType, transactionAmount, transactionDate, transactionStatus) {
    const transaction = {
      transactionId: transactionId,
      transactionType: transactionType,
      transactionAmount: transactionAmount,
      transactionDate: transactionDate,
      transactionStatus: transactionStatus
    };
    ctx.stub.putState(transactionId, Buffer.from(JSON.stringify(transaction)));
    return transaction;
  }

  async readTransaction(ctx, transactionId) {
    const transactionAsBytes = await ctx.stub.getState(transactionId); // get the transaction from chaincode state
    if (!transactionAsBytes || transactionAsBytes.length === 0) {
      throw new Error(`The asset ${id} does not exist`);
    }
    return transactionAsBytes.toString();
  }

  async listTransaction(ctx) {
    const allResults = [];``
    // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
    const iterator = await ctx.stub.getStateByRange('', '');
    let result = await iterator.next();
    while (!result.done) {
        const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
        let record;
        try {
            record = JSON.parse(strValue);
        } catch (err) {
            console.log(err);
            record = strValue;
        }
        allResults.push({ Key: result.value.key, Record: record });
        result = await iterator.next();
    }
    return JSON.stringify(allResults);
  }
}

module.exports = TransactionContract;
