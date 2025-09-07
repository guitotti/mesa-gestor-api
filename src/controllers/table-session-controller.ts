import { Request, Response, NextFunction } from "express";
import { knex } from "@/database/knex";
import z from "zod";
import { AppError } from "@/utils/AppError";

class TableSessionController {
  async createTableSession(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const bodySchema = z.object({
        table_id: z.number(),
      });

      const { table_id } = bodySchema.parse(request.body);

      const session = await knex<TableSessionRepository>("tables_sessions")
        .where({
          table_id,
        })
        .orderBy("opened_at", "desc")
        .first();

      if (session && !session.closed_at) {
        throw new AppError("There is already an open session for this table.");
      }

      await knex<TableSessionRepository>("tables_sessions").insert({
        table_id,
        opened_at: knex.fn.now(),
      });

      return response.status(201).json();
    } catch (error) {
      next(error);
    }
  }

  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const sessions = await knex<TableSessionRepository>(
        "tables_sessions"
      ).orderBy("closedt_at");

      return response.status(200).json(sessions);
    } catch (error) {
      next(error);
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const id = z
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), { message: "Id must be a number." })
        .parse(request.params.id);

      const session = await knex<TableSessionRepository>("tables_sessions")
        .where({ id })
        .first();

      if (!session) {
        throw new AppError("Table session not found.", 404);
      }

      if (session.closed_at) {
        throw new AppError("Table session is already closed.");
      }

      await knex<TableSessionRepository>("tables_sessions")
        .where({ id })
        .update({
          closed_at: knex.fn.now(),
        });

      return response.json();
    } catch (error) {
      next(error);
    }
  }
}

export { TableSessionController };
