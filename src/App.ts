import * as express from "express";
import { DataSource } from "typeorm";
import { User } from "./models/User";
import { Client } from "./models/Client";
import { MeterType } from "./models/MeterType";

class App {
  public app: express.Application;
  public port: number;

  constructor(controllers: any[], port: number) {
    this.app = express();
    this.port = port;
    this.initializeModels();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  private async initializeModels() {
    const db = new DataSource({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "Inge2026gt!?",
      database: "energy",
      synchronize: true,
      entities: [User, Client, MeterType],
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
