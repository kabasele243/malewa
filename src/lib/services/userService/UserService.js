import StatusError from '../../utils/StatusError';

const SALT_ROUNDS = 10;

class UserService {
  constructor(UserModel) {
    this.UserModel = UserModel;
    this.getUserByEmail = this.getUserByEmail.bind(this);
    this.createUser = this.createUser.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.getUser = this.getUser.bind(this);
    this.login = this.login.bind(this);
  }

  getUser(userId) {
    return this.UserModel.findById(userId);
  }

  getUserByEmail(email, islogin) {
    if(islogin) {
        return this.UserModel.findOne({ email }).select('+password');;
    }
    return this.UserModel.findOne({ email });
  }

  createUser(email, username, password) {
    return new this.UserModel({ email, username, password }).save();
  }

  async registerUser(email, username, password) {
    const maybeUser = await this.getUserByEmail(email);

    if (maybeUser) {
      throw new StatusError("There is already a user with that email", 400);
    }

    return this.createUser(email, username, hash);
  }

  async login(email, password) {

    if (!email || !password) {
        throw new StatusError("Please Provide Password and Username", 401);
      }
    const user = await this.getUserByEmail(email, true);

    if (!user || !(await user.correctPassword(password, user.password))) {
        throw new StatusError("Invalid username or password", 401);
      }
    // const passwordMatch = await bcrypt.compare(password, maybeUser.password);

    return user;
  }
}

export default UserService;
