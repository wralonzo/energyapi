import App from "./App";
import ClientController from "./controllers/client.controller";
import MeterTypeController from "./controllers/meter-type.controller";
import UserController from "./controllers/user.controller";

const controllers = [
  new UserController(),
  new ClientController(),
  new MeterTypeController(),
];
const app = new App(controllers, 3000);

app.listen();

export default app;
