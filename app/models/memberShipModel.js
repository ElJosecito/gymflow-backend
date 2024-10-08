import mongoose from "mongoose";

const membershipSchema = new mongoose.Schema({
  type: { type: String, required: true }, 
  price: { type: Number, required: true }, 
  description: { type: String }, 
  duration: { type: Number, required: true },
});

const Membership = mongoose.model('Membership', membershipSchema);
export default Membership;
