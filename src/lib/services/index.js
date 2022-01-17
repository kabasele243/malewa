import UserModel from '../services/userService/UserModel';
import UserService from './userService/UserService';

export const userService = new UserService(UserModel);
