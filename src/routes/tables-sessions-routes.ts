import { Router } from "express";

import { TableSessionController } from "@/controllers/table-session-controller";

const tablesSessionsRoutes = Router();
const tableSessionController = new TableSessionController();

tablesSessionsRoutes.get("/", tableSessionController.index);
tablesSessionsRoutes.post("/", tableSessionController.createTableSession);
tablesSessionsRoutes.patch("/:id", tableSessionController.update);

export { tablesSessionsRoutes };
