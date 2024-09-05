import { Router } from "express";
import { AddEvent, DeleteEvent, UpdateEvent } from "../Controllers/eventController.js";

const router = Router()

router.post('/addevent',AddEvent)
router.put('/update-event/:id',UpdateEvent)
router.get('/delete-event/:id',DeleteEvent)


export default router