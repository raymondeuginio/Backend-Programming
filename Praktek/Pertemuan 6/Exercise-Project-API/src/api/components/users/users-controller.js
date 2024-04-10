const usersService = require('./users-service');
const { errorResponder, errorTypes } = require('../../../core/errors');
const { changePassword } = require('./users-validator');

/**
 * Handle get list of users request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function getUsers(request, response, next) {
  try {
    const users = await usersService.getUsers();
    return response.status(200).json(users);
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle get user detail request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function getUser(request, response, next) {
  try {
    const user = await usersService.getUser(request.params.id);

    if (!user) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Unknown user');
    }

    return response.status(200).json(user);
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle create user request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function createUser(request, response, next) {
  try {
    const name = request.body.name;
    const email = request.body.email;
    const password = request.body.password;
    const password_confirm = request.body.password_confirm;

    const emailTaken = await usersService.checkEmailUser(email);

    if (emailTaken !== null) {
      throw errorResponder(
        errorTypes.EMAIL_ALREADY_TAKEN,
        'Use another email'
      );
    }

    if (password_confirm === password) { 
      const success = await usersService.createUser(name, email, password);
      if (!success) {
        throw errorResponder(
          errorTypes.UNPROCESSABLE_ENTITY,
          'Failed to create user'
        );
      }
      return response.status(200).json({ name, email });
    } else {
      throw errorResponder(
        errorTypes.INVALID_PASSWORD,
        "Please make sure the passwords you've entered are the same"
      );
    }
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle update user request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function updateUser(request, response, next) {
  try {
    const id = request.params.id;
    const name = request.body.name;
    const email = request.body.email;

    const emailKeambil = await usersService.checkEmailUser(email);
    
    if(emailKeambil !== null){
      throw errorResponder(
        errorTypes.EMAIL_ALREADY_TAKEN,
        'Use another email'
      );
    }

    
    const success = await usersService.updateUser(id, name, email);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to update user'
      );
    }

    return response.status(200).json({ id });
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle delete user request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function deleteUser(request, response, next) {
  try {
    const id = request.params.id;

    const success = await usersService.deleteUser(id);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to delete user'
      );
    }

    return response.status(200).json({ id });
  } catch (error) {
    return next(error);
  }
}


async function changePass(request, response, next) {
try{
    const id = request.params.id;
    const old_password = request.body.old_password;
    const new_password = request.body.new_password;
    const new_password_confirm = request.body.new_password_confirm;


    const cekPassword = await usersService.cekPass(id, old_password);

    if(!cekPassword){
      throw errorResponder(
        errorTypes.INVALID_PASSWORD,
        'The password you entered does not match the current password'
      );
    }


    if (new_password === new_password_confirm) {
      const success = await usersService.changePass(id, new_password);
      if (!success) {
        throw errorResponder(
          errorTypes.UNPROCESSABLE_ENTITY,
          'Failed to change password'
        );
      }
      return response.status(200).json({ id, message: 'Password changed!' });
      } else {
      throw errorResponder(
        errorTypes.INVALID_PASSWORD,
        "Please make sure the new passwords you've entered are the same"
      );
    }
  } catch (error){
    return next(error);
  }

}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  changePass,
};
