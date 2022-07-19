const db = require("../database/connection.js");
const bcrypt = require("bcrypt");

class Users {
  async findAll() {
    try {
      var result = await db.select(["id", "name", "email"]).table("users");
      return result;
    } catch (error) {
      return [];
    }
  }

  async findByEmail(email) {
    try {
      var result = await db.select().where({ email: email }).table("users");

      if (result.length > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return { status: false, err: error };
    }
  }

  async findById(id) {
    try {
      var result = await db.select().where({ id: id }).table("users");
      if (result != undefined) {
        return result[0];
      } else {
        return undefined;
      }
    } catch (error) {
      return { status: false, err: error };
    }
  }

  async create(name, email, password) {
    try {
      var hash = await bcrypt.hash(password, 15);
      await db.insert({ name, email, password: hash }).table("users");
      return { status: true, msg: "Usuario criado com sucesso!" };
    } catch (error) {
      return { status: false, err: error };
    }
  }
}

module.exports = new Users();
