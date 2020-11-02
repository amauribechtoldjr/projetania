const BaseModel = require("./BaseModel");

class User extends BaseModel {
  getAuthUser(ctx) {
    if (ctx.isAuthenticated()) {
      return ctx.getUser();
    }

    return null;
  }

  async signUp(signUpData) {
    if (signUpData.password !== signUpData.passwordConfirmation) {
      throw new Error("Password confirmation is incorrect");
    }

    try {
      return await this.Model.create(signUpData);
    } catch (e) {
      if (e.code && e.code === 11000)
        throw new Error("User with provided e-mail already exists.");

      throw e;
    }
  }

  async signIn(signInData, ctx) {
    try {
      const user = await ctx.authenticate(signInData);
      return user;
    } catch (error) {
      return error;
    }
  }

  signOut(ctx) {
    try {
      ctx.logout();
      return true;
    } catch (e) {
      return false;
    }
  }
}

module.exports = User;
