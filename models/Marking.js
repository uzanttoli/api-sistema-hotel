const db = require("../database/connection.js");

class Marking {
  async create(
    user_id,
    hotel_id,
    description,
    date,
    started,
    finished,
    daily = 68
  ) {
    try {
      await db
        .insert({
          user_id,
          hotel_id,
          description,
          date,
          started,
          finished,
          daily,
        })
        .table("marcacao_ponto");
      return { status: true };
    } catch (error) {
      return { status: false, err: error };
    }
  }

  async findAll() {
    try {
      var result = await db
        .select([
          "marcacao_ponto.id",
          "users.name as user_name",
          "hotels.name as hotel_name",
          "marcacao_ponto.description",
          "marcacao_ponto.date",
          "marcacao_ponto.started",
          "marcacao_ponto.finished",
        ])
        .table("marcacao_ponto")
        .innerJoin("users", "users.id", "marcacao_ponto.user_id")
        .innerJoin("hotels", "hotels.id", "marcacao_ponto.hotel_id");
      return result;
    } catch (error) {
      return { err: error };
    }
  }
}

module.exports = new Marking();
