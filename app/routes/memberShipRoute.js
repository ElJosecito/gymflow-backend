import { Router } from "express";
import MemberShipController  from "../controllers/memberShipController.js";

const router = Router();

router.get("/memberships", MemberShipController.getMemberships);
router.get("/memberships/:id", MemberShipController.getMembershipById);
router.put("/memberships/:id", MemberShipController.updateMembership);
router.delete("/memberships/:id", MemberShipController.deleteMembership);

export default router;
