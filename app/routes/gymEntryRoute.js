import { Router } from "express";

import GymEntryController from "../controllers/gymEntryController.js";

const router = Router();

router.get("/gymEntries", GymEntryController.getGymEntries);
router.get("/gymEntries/:id", GymEntryController.getGymEntryById);
router.put("/gymEntries/:id", GymEntryController.updateGymEntry);
router.delete("/gymEntries/:id", GymEntryController.deleteGymEntry);
router.post("/enter-gym", GymEntryController.createGymEntry);
router.post("/exit-gym", GymEntryController.leaveGymEntry);
router.post("/reset-gym", GymEntryController.resetGymEntry);
router.get("/gym-status", GymEntryController.getGymStatus);

export default router;