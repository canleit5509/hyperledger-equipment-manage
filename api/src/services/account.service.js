const Account = require('../models/account');

const queryAccount = async (filter, options) => {
  options.select = options.select || '-password';
  const accounts = await Account.paginate(filter, options);
  return accounts;
};

const getAccountById = async (id) => {
  return await Account.findById(id);
};

const getAccountByEmail = async (email) => {
  return await Account.findOne({ email });
};

const createAccount = async (account) => {
  return await Account.create(account);
};

const updateAccountById = async (id, accountUpdate) => {
  const account = await getAccountById(id);
  Object.assign(account, accountUpdate);
  await account.save();
  return account;
};

const deleteAccountById = async (id) => {
  const account = await getAccountById(id);
  await account.remove();
  return account;
};

module.exports = { 
  queryAccount,
  getAccountById,
  getAccountByEmail,
  createAccount,
  updateAccountById,
  deleteAccountById,
};
