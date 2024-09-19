import Membership from "../models/memberShipModel.js";

// get all memberships

const getMemberships = async (req, res) => {
    try {
        const memberships = await Membership.find();
        res.json(memberships);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
}

// get membership by id

const getMembershipById = async (req, res) => {
    try {
        const membership = await Membership.findById(req.params.id);
        res.json(membership);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
}

// update membership

const updateMembership = async (req, res) => {
    try {
        const membership = await Membership.findById(req.params.id);
        membership.memberShip = req.body.memberShip;
        await membership.save();
        res.json(membership);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
}

// delete membership

const deleteMembership = async (req, res) => {
    try {
        const membership = await Membership.findById(req.params.id);
        membership.memberShip = false;
        await membership.save();
        res.json(membership);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
}



const memberShipController = {
    getMemberships,
    getMembershipById,
    updateMembership,
    deleteMembership
}

export default memberShipController;