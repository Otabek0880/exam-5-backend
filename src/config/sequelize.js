import { Sequelize } from "sequelize";
const newSequelize = new Sequelize(
  "postgres://postgres:otabek2008@localhost:5432/bookshop",
  { logging: false }
);

export  {newSequelize};
