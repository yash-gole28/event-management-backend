import { Router } from "express";
import { AddEvent, BookEvent, DeleteEvent, GetSingleEvent, UpdateEvent } from "../Controllers/eventController.js";

const router = Router()

router.post('/addevent',AddEvent)
router.put('/update-event/:id',UpdateEvent)
router.delete('/delete-event/:id',DeleteEvent)
router.get('/get-single-event/:id',GetSingleEvent)
router.post('/book-event/:id/:userId/:amount',BookEvent)


export default router