import { HttpStatusCode } from "axios";
import { DaoResponse, ErrorControl } from "../constants/ErrorControl";
import { createDebugger } from "../utils/debugConfig";

import { addDoc, collection, getDocs } from "firebase/firestore";
import { FirebaseService } from "../service/firebaseDB";
import { Habitacion } from "../entities/Category";

const firebaseService = FirebaseService.getInstance();
const db = firebaseService.getFirestoreInstance();
// logger config
const log = createDebugger("HabitacionDAO");
const logError = log.extend("error");

export class HabitacionDAO {
	protected static async GetAll(): Promise<DaoResponse> {
		try {
			const dataref = collection(db, Habitacion.COLLECCTION);
			const data = await getDocs(dataref);

			if (data.empty) {
				log('theres  no "habitaciones" yet');
				return [ErrorControl.SUCCESS, [], HttpStatusCode.Created];
			}

			const mappedData = data.docs.map((habitacionDoc) => {
				const data = habitacionDoc.data();
				return new Habitacion(
					habitacionDoc.id,
					data.titulo,
					data.descripcion,
					data.pais,
					data.ciudad,
					data.imagen,
					data.servicios
				);
			});

			return [ErrorControl.SUCCESS, mappedData, HttpStatusCode.Created];
		} catch (error) {
			const msg = "Error fetching document";
			logError(msg + ": " + error);
			return [
				ErrorControl.ERROR,
				msg,
				HttpStatusCode.InternalServerError,
			];
		}
	}

	protected static async Create(
		habitacion: Habitacion
	): Promise<DaoResponse> {
		try {
			const dataref = collection(db, Habitacion.COLLECCTION);

			const doc = await addDoc(dataref, {
				titulo: habitacion.getTitulo(),
				descripcion: habitacion.getDescripcion(),
				pais: habitacion.getPais(),
				ciudad: habitacion.getCiudad(),
				imagen: habitacion.getImagen(),
				servicios: habitacion.getServicios(),
			});
			return [ErrorControl.SUCCESS, doc.id, HttpStatusCode.Created];
		} catch (error) {
			const msg = "Error creating document";
			logError(msg + ": " + error);
			return [
				ErrorControl.ERROR,
				msg,
				HttpStatusCode.InternalServerError,
			];
		}
	}
}
