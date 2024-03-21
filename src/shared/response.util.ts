import * as express from "express";
class ResponseService {
  constructor() {}

  public returnRequest(
    res: express.Response,
    data: any,
    statusCode?: number,
    mesage?: string
  ) {
    try {
      const dataResponse = {
        statusCode: statusCode ?? 200,
        message: mesage ?? "Respuesta exitosa",
        data: data ?? null,
      };
      return res.status(dataResponse.statusCode).send(dataResponse);
    } catch (error) {
      console.log(error);
      const dataResponse = {
        statusCode: error.statusCode ?? 500,
        message: error.mesage ?? "Internal server error",
        data: null,
      };
      return res.status(dataResponse.statusCode).send(dataResponse);
    }
  }
}

export default ResponseService;
