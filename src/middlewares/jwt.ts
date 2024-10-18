import axios, { HttpStatusCode } from "axios";
import { NextFunction, Request, Response } from "express";
import { config } from "dotenv";
import { createDebugger } from "../utils/debugConfig";

config();

const auth_service_url = process.env.AUTH_SERVICE_API;
const middlewareDebugger = createDebugger("jwt");

export async function verifyToken(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const authHeader = req.headers["authorization"];
	const token = authHeader?.split(" ")[1];

	if (token == null) {
		middlewareDebugger("Access denied. No token provided.");
		return res
			.status(HttpStatusCode.Unauthorized)
			.send("Access denied. No token provided.");
	}
	const response = await axios.get(
		auth_service_url + "/api/v1/user/verifyToken",
		{
			headers: {
				Authorization: "Bearer " + token,
			},
		}
	);

	if (response.status !== HttpStatusCode.Ok) {
		middlewareDebugger("Access denied. Invalid token.");
		return res
			.status(HttpStatusCode.Unauthorized)
			.send("Access denied. Invalid token.");
	}

	next();
}
