const Classroom = require('../models/classroom');
const Account = require('../models/account');
const { accountService, classroomService } = require('../services');
const { isValidObjectId } = require('mongoose');
class ClassroomController {
  // Private method
  static async list_joined(req, res) {
    const { page, limit } = req.query;
    let options = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 10,
      sort: {
        created_at: -1,
      },
    };
    let account = await accountService.getAccountById(req.user._id);
    const classrooms = await classroomService.queryClassRoom({
      _id: {
        $in: account.joined_classrooms,
      }
    }, options);
    return res.status(200).json(classrooms);
  }

  static async create(req, res) {
    try {
      const {
        name,
        description,
      } = req.body;
      const owner = await Account.findOne({
        _id: req.user._id,
      });
      const classroom = await Classroom.create({
        name,
        description,
        owner: owner._id,
        members: [owner._id],
      });
      owner.created_classrooms.push(classroom._id);
      owner.joined_classrooms.push(classroom._id);
      await owner.save();
      return res.status(200).json(classroom);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: err,
      });
    }
  }
  static async joined_classroom(req, res) {
    try {
      if(!isValidObjectId(req.params.classroomId)) {
        return res.status(400).json({
          message: 'Invalid classroom id',
        });
      }
      let user = await accountService.getAccountById(req.user._id);
      let classroom = await classroomService.getClassRoomById(req.params.classroomId);
      if (user.joined_classrooms.includes(classroom._id)) {
        return res.status(400).json({
          message: 'You are already in this classroom',
        });
      }
      user.joined_classrooms.push(classroom._id);
      classroom.members.push(user._id);
      if (await user.save() && await classroom.save()) {
        return res.status(200).json({
          message: 'Joined classroom successfully',
          classroom,
        });
      }
      return res.status(400).json({
        message: 'Something went wrong',
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: err,
      });
    }
  }

  static async leave_classroom(req, res) {
    try {
      
      if(!isValidObjectId(req.params.classroomId)) {
        return res.status(400).json({
          message: 'Invalid classroom id',
        });
      }
      let user = await accountService.getAccountById(req.user._id);
      let classroom = await classroomService.getClassRoomById(req.params.classroomId);
      if (!user.joined_classrooms.includes(classroom._id)) {
        return res.status(400).json({
          message: 'You are not in this classroom',
        });
      }
      user.joined_classrooms.pull(classroom._id);
      classroom.members.pull(user._id);
      if (await user.save() && await classroom.save()) {
        return res.status(200).json({
          message: 'Left classroom successfully',
          classroom,
        });
      }
      return res.status(400).json({
        message: 'Something went wrong',
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: err,
      });
    }
  }
  static async update(req, res) {
    try {
      if(!isValidObjectId(req.params.classroomId)) {
        return res.status(400).json({
          message: 'Invalid classroom id',
        });
      }
      let user = await accountService.getAccountById(req.user._id);
      let classroom = await classroomService.getClassRoomById(req.params.classroomId);
      const {
        name,
        description,
      } = req.body;
      await classroomService.updateClassRoomById(classroom._id, { name, description });
      return res.status(200).json({
        message: 'Updated classroom successfully',
        classroom,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: err,
      });
    }
  } 

  static async invite_members_by_mail(req, res) {
    try {
      if(!isValidObjectId(req.params.classroomId)) {
        return res.status(400).json({
          message: 'Invalid classroom id',
        });
      }
      let user = await accountService.getAccountById(req.user._id);
      let classroom = await classroomService.getClassRoomById(req.params.classroomId);
      if (user._id !== classroom.owner) {
        return res.status(400).json({
          message: 'You are not the owner of this classroom',
        });
      }
      if(req.body.members && Array.isArray(req.body.members)) {
        let members = req.body.members;
        members.forEach(async (member) => {
          try {
            let account = await accountService.getAccountByMail(member);
            if (account) {
              account.joined_classrooms.push(classroom._id);
              classroom.members.push(account._id);
              await account.save();
              await classroom.save();
            }
          } catch (err) {
            console.log(err);
          }
        });
      } else {
        return res.status(400).json({
          message: 'Invalid members',
        });
      }
      return res.status(200).json({
        message: 'Invited members successfully',
        classroom,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: err,
      });
    }
  }


  // ADMIN ONLY
  static async list_all(req, res) {
    try {
      const { page, limit } = req.query;
      let options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(limit, 10) || 10,
        sort: {
          createdAt: -1,
        },
      };
      const classrooms = await classroomService.queryClassRoom({}, options);
      return res.status(200).json(classrooms);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: err,
      });
    }
  }

 
}

module.exports = ClassroomController;
