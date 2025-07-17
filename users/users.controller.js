import userService from "./users.service.js";

const getUsers = async (req, res, next) => {
  try {
    const users = await userService.getUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await userService.getUser(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const addUser = async (req, res, next) => {
  try {
    const newUser = await userService.addUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

const modifyUser = async (req, res, next) => {
  try {
    const updatedUser = await userService.modifyUser(req.params.id, req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

const removeUser = async (req, res, next) => {
  try {
    await userService.removeUser(req.params.id);
    res.status(204).end(); // No content
  } catch (error) {
    next(error);
  }
};

export default {
  getUsers,
  getUser,
  addUser,
  modifyUser,
  removeUser,
};
