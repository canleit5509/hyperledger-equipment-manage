/* eslint-disable camelcase */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Account = require('../models/account');
const { accountService } = require('../services');

// controller for the account page
class AccountController {
  /// /////////////////////////////////////////////////////////////////////////////
  // Public methods
  /// /////////////////////////////////////////////////////////////////////////////

  /** [POST] /account/login
   * login the Account
   * */
  static async login(req, res) {
    try {
      const {
        email,
        password,
      } = req.body;
      // get the Account from the database
      const account = await accountService.getAccountByEmail(email);

      // check if the Account exists
      if ( ! account ) {
        return res.status(400).json({
          message: 'Account not found',
        });
      }

      // check if the password is correct
      const isPasswordCorrect = await bcrypt.compare(password, account.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({
          message: 'Password is incorrect',
        });
      }
      // create the token
      const token = jwt.sign({
        _id: account._id,
        role: account.role,
      }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
      // return the token
      return res.status(200).json({
        message: 'Login successfully',
        token,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Something went wrong',
      });
    }
  }

  /** [POST] /account/register
   * register the Account
   *
   * */
  static async register(req, res) {
    try {
      const {
        email,
        password,
      } = req.body;

      // check if the Account exists
      const account = await accountService.getAccountByEmail(email);

      // check if the Account exists
      if (account) {
        return res.status(409).json({
          message: 'Account already exists'
        });
      }

      // hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // create the Account
      const newAccount = await Account.create({
        email,
        name: req.body.name,
        password: hashedPassword,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone,
        class_name: req.body.class_name,
      });

      // return the account
      return res.status(201).json({
        message: 'Account created successfully',
        account: newAccount,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Something went wrong',
      });
    }
  }

  /// /////////////////////////////////////////////////////////////////////////////
  // Private methods
  /// /////////////////////////////////////////////////////////////////////////////

  /**
   * [GET] /account/profile
   * get the profile of the Account
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Object} - response object 200 if success 500 if error
   * */

  static async getProfile(req, res) {
    try {
      // get the Account from the database
      const account = await Account.findById(req.user._id);

      const returnAccount = {
        _id: account._id,
        email: account.email,
        first_name: account.first_name,
        last_name: account.last_name,
        phone: account.phone,
        class_name: account.class_name,
        avatar: account.avatar,
        role: account.role,
      };
      // return the Account
      return res.status(200).json({
        message: 'Account found',
        account: returnAccount,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Something went wrong',
      });
    }
  }

  /**
   * [PUT] /account/profile
   * update the profile of the Account
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Object} - response object
   * */
  static async updateProfile(req, res) {
    try {
      // get the Account from the database
      const account = await Account.findById(req.user._id);
      // update the Account
      const {
        first_name,
        last_name,
        phone,
        avatar,
        class_name,
      } = req.body;
      if (first_name) {
        account.first_name = first_name;
      }
      if (last_name) {
        account.last_name = last_name;
      }
      if (phone) {
        account.phone = phone;
      }
      if (avatar) {
        account.avatar = avatar;
      }
      if (class_name) {
        account.class_name = class_name;
      }
      account.updated_at = Date.now();
      // save the Account
      await account.save();

      const returnAccount = {
        _id: account._id,
        email: account.email,
        first_name: account.first_name,
        last_name: account.last_name,
        phone: account.phone,
        class_name: account.class_name,
        avatar: account.avatar,
      };
      // return the Account
      return res.status(200).json({
        message: 'Account updated successfully',
        account: returnAccount,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Something went wrong',
      });
    }
  }

  /**
   * [PUT] /account/password
   * update the password of the Account
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Object} - response object
   * */
  static async updatePassword(req, res) {
    try {
      // get the Account from the database
      const account = await Account.findById(req.user._id);
      // update the Account
      const {
        password,
        old_password,
      } = req.body;

      const isPasswordCorrect = await bcrypt.compare(old_password, account.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({
          message: 'Password is incorrect',
        });
      }
      if (old_password === password) {
        return res.status(400).json({
          message: 'New password is the same as old password',
        });
      }
      // hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      // save the Account
      account.password = hashedPassword;
      account.updated_at = Date.now();
      await account.save();

      const returnAccount = {
        _id: account._id,
        email: account.email,
        first_name: account.first_name,
        last_name: account.last_name,
        phone: account.phone,
        class_name: account.class_name,
        avatar: account.avatar,
      };
      // return the Account
      return res.status(200).json({
        message: 'Account updated successfully',
        account: returnAccount,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Something went wrong',
      });
    }
  }

  /**
   * [PUT] /account/avatar
   * update the avatar of the Account
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Object} - response object
   * */
  static async updateAvatar(req, res) {
    try {
      // get the Account from the database
      const account = await accountService.getAccountById(req.user._id);
      // update the Account
      const {
        avatar,
      } = req.body;
      // save the Account
      account.avatar = avatar;
      account.updated_at = Date.now();
      return await account.save();
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Something went wrong',
      });
    }
  }
  /// /////////////////////////////////////////////////////////////////////////////
  // Admin methods
  /// /////////////////////////////////////////////////////////////////////////////
  /**
   * [GET] /api/account/
   * get all the accounts
   */
  static async getAllAccounts(req, res) {
    try {
      const {page, limit} = req.query;
      let options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(limit, 10) || 10,
        sort: {
          createdAt: -1,
        },
      };
      let accounts = await accountService.queryAccount({}, options);
      return res.status(200).json({
        accounts,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Something went wrong',
      });
    }
  }
  
  // [POST] /account/logout
  // [POST] /account/profile
  // [POST] /account/password
  // [POST] /account/password/reset
  // [POST] /account/password/reset/:token
}

module.exports = AccountController;
