import CandidateProfileModel from "../models/CandidateProfile.js";

const saveProfile = async (req, res) => {
  try {
    const { name, email, st, gender, pjl } = req.body;
    const pimage = req.files["pimage"][0].filename;
    const rdoc = req.files["rdoc"][0].filename;
    if (name && email && pimage && rdoc) {
      const doc = new CandidateProfileModel({
        name: name,
        email: email,
        state: st,
        gender: gender,
        location: pjl,
        pimage: pimage,
        rdoc: rdoc,
      });
      const candidate = await doc.save();
      res.status(201).send({
        status: "success",
        message: "Profile Uploaded Successfully",
        candidate: candidate,
      });
    } else {
      res.status(200).send({
        status: "failed",
        message: "All Fields are Required",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const profileList = async (req, res) => {
  try {
    const candidates = await CandidateProfileModel.find();
    res.status(200).send({
      status: "success",
      candidates: candidates,
    });
  } catch (error) {
    console.log(error);
  }
};

export { saveProfile, profileList };
