import { Request, Response, Router } from "express";
import { verifyToken } from "../middlewares/jwt";
import { HttpStatusCode } from "axios";
import { CheckCache } from "../middlewares/Cache";
import { Cache } from "../utils/cache";
import { HabitacionDAO } from "../dao/HabitacionDAO";
import { Habitacion } from "../entities/Habitacion";

export class HabitacionController extends HabitacionDAO {
	private router: Router;

	constructor() {
		super();
		this.router = Router();
	}

	public routes(): Router {
		// get all
		this.router.get(
			"/",
			verifyToken,
			CheckCache,
			async (req: Request, res: Response) => {
				const data = await HabitacionDAO.GetAll();
				Cache.set(req.body.cacheKey, data[1]);
				return res.status(data[2]).send(data[1]);
			}
		);

		//create habitacion
		this.router.post(
			"/",
			verifyToken,
			async (req: Request, res: Response) => {
				try {
					const habitacion = new Habitacion(
						"",
						req.body.titulo,
						req.body.descripcion,
						req.body.pais,
						req.body.ciudad,
						req.body.imagen,
						req.body.servicios
					);
					const data = await HabitacionDAO.Create(habitacion);
					return res.status(data[2]).send(data[1]);
				} catch (error) {
					return res
						.status(HttpStatusCode.InternalServerError)
						.send({ message: "Error creating habitacion" });
				}
			}
		);

		return this.router;
	}
}
