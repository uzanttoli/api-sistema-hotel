var db = require("../database/connection.js");
const { v4: uuidv4 } = require("uuid");

class PasswordToken {
  async findByEmail(email) {
    try {
      var result = await db.select().where({ email: email }).table("users");

      if (result.length > 0) {
        return result[0];
      } else {
        return undefined;
      }
    } catch (error) {
      return undefined;
    }
  }

  async create(email) {
    var user = await this.findByEmail(email);

    if (user != undefined) {
      try {
        var token = uuidv4();

        await db
          .insert({
            user_id: user.id,
            used: 0,
            token: token,
          })
          .table("passwordtokens");
        return { status: true, token: token };
      } catch (error) {
        console.log(error);
        return { status: false, err: error };
      }
    } else {
      return { status: false, err: "O email passado não existe!" };
    }
  }

  async validate(token) {
    try {
      var result = await db
        .select()
        .where({ token: token })
        .table("passwordtokens");
      if (result.length > 0) {
        var tk = result[0];

        if (tk.used) {
          return { status: false };
        } else {
          return { status: true, token: tk };
        }
      } else {
        return { status: false };
      }
    } catch (error) {
      return { status: false };
    }
  }

  async setUsed(token) {
    try {
      await db
        .update({ used: 1 })
        .where({ token: token })
        .table("passwordtokens");
      return { status: true };
    } catch (error) {
      return { status: false, err: error };
    }
  }
}

module.exports = new PasswordToken();
