import express from "express";
import { DataSource } from "typeorm";
import { User } from "./models/User";
import { Client } from "./models/Client";
import { MeterType } from "./models/MeterType";
import { CounterTracking } from "./models/Counter";
import dotenv from "dotenv";

class App {
  public app: express.Application;
  public port: number;

  constructor(controllers: any[], port: number) {
    this.app = express();
    dotenv.config();
    this.port = port;
    this.initializeModels();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  private async initializeModels() {
    const db = new DataSource({
      type: "mysql",
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      entities: [User, Client, MeterType, CounterTracking],
      migrations: ["src/migration/*.{ts, ts}"],
    });
    if (db === undefined) {
      throw new Error("Error connecting to database");
    }
    await db.initialize();
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
  }

  private initializeControllers(controllers: any[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

export default App;
