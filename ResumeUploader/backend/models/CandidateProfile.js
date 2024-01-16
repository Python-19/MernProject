import mongoose from 'mongoose'

const CandidateSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  state: { type: String },
  gender: { type: String },
  location: { type: String },
  pimage: { type: String, required: true },
  rdoc: { type: String, required: true },
});
const CandidateProfileModel=new mongoose.model("candidateprofile",CandidateSchema);
export default CandidateProfileModel;


