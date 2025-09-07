import { Router } from "express";

import { TableController } from "@/controllers/table-controller";

const tablesRoutes = Router();
const tableController = new TableController();

tablesRoutes.get("/", tableController.index);

export { tablesRoutes };
