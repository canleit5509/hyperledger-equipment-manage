'use strict';
const {
  Contract
} = require('fabric-contract-api');

class EquipmentContract extends Contract {
  async initLedger(ctx) {
    console.log('============= START : Initialize Ledger ===========');
  }

  async pushEquipment(ctx, userID, equipmentID) {
    const exists = await this.userExist(ctx, userID);
    if (!exists) {
      var devices = [equipmentID];
      await ctx.stub.putState(userID, Buffer.from(JSON.stringify(devices)));
      return devices;
    }

    var devices = await this.readUser(ctx, userID);
    devices = JSON.parse(devices);
    devices.push(equipmentID);
    await ctx.stub.putState(userID, Buffer.from(JSON.stringify(devices)));
    return devices;
  }

  async popEquipment(ctx, userID, equipmentID) {
    const exists = await this.userExist(ctx, userID);
    if (!exists) {
      return false;
    }
    var devices = await this.readUser(ctx, userID);
    devices = JSON.parse(devices);
    devices = devices.filter(function(item) {
      return item !== equipmentID;
    });
    await ctx.stub.putState(userID, Buffer.from(JSON.stringify(devices)));
    return devices;
  }

  async userExist(ctx, id) {
    const userJSON = await ctx.stub.getState(id);
    return userJSON && userJSON.length > 0;
  }

  async readUser(ctx, id) {
    const userJSON = await ctx.stub.getState(id);
    return userJSON.toString();
  }
}

module.exports = EquipmentContract;