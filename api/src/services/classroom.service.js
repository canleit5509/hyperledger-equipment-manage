const Classroom = require('../models/classroom');

const queryClassRoom = async (filter, options) => {
  const classrooms = await Classroom.paginate(filter, options);
  return classrooms;
};

const getClassRoomById = async (id) => {
  return await Classroom.findById(id);
};

const createClassRoom = async (ClassRoom) => {
  return await Classroom.create(ClassRoom);
};

const updateClassRoomById = async (id, ClassRoomUpdate) => {
  const classRoom = await getClassRoomById(id);
  Object.assign(classRoom, ClassRoomUpdate);
  await classRoom.save();
  return classRoom;
};

const deleteClassRoomById = async (id) => {
  const classroom = await getClassRoomById(id);
  await classroom.remove();
  return classroom;
};

module.exports = { 
  queryClassRoom,
  getClassRoomById,
  createClassRoom,
  updateClassRoomById,
  deleteClassRoomById,
};
