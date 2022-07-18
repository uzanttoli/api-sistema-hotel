const db = require("../database/connection.js");

class Hotels {
  async findAll() {
    try {
      var result = await db.select().table("hotels");
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async findById(id) {
    try {
      var result = await db.select().table("hotels").where({ id: id });
      if (result.length > 0) {
        return result[0];
      } else {
        return undefined;
      }
    } catch (error) {
      return { status: false, err: error };
    }
  }

  async findByName(name) {
    try {
      var result = await db.select().table("hotels").where({ name: name });

      if (result.length > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return { status: false, err: error };
    }
  }

  async create(name) {
    try {
      await db.insert({ name }).table("hotels");
    } catch (error) {
      return { status: false, err: error };
    }
  }

  async delete(id) {
    var hotel = await this.findById(id);

    if (hotel != undefined) {
      try {
        await db.delete().where({ id: id }).table("hotels");
        return { status: true };
      } catch (error) {
        return { status: false, err: error };
      }
    } else {
      return { status: false, err: "Hotel não existe!" };
    }
  }
}

module.exports = new Hotels();
