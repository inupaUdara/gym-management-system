import SubPackage from "../models/subpackage_model.js";
import { errorHandler } from "../utills/error.js";

//save a package
export const addSubPackage = async (req, res, next) => {
  try {
    if (
      !req.body.subPackageName ||
      !req.body.price ||
      !req.body.validTime ||
      !req.body.description ||
      !req.body.note1 ||
      !req.body.note2 ||
      !req.body.note3
    ) {
      return res.status(400).send({
        message: `Send all required fields: subPackageName, price, validTime, description, note1, note2, note3, Pactype, startDate, endDate`,
      });
    }

    const newSubPackage = {
      ...req.body,
    };

    const NwSubPackage = await SubPackage.create(newSubPackage);
    return res.status(201).send(NwSubPackage);
  } catch (error) {
    console.error("Error creating SubPackage:", error.message); // Log detailed error message
    next(errorHandler(500, { message: "Error creating SubPackage" }));
  }
};

//get promo package count
export const getPromoPackageCount = async (status) => {
  try {
    const count = await SubPackage.countDocuments({
      Pactype: "PromotionPackage",
      status,
    });
    return count;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

//get count pending promo packges
export const getPendingPromoPackageCount = async () => {
  try {
    const count = await SubPackage.countDocuments({
      Pactype: "PromotionPackage",
      status: "Pending",
    });
    return count;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

//get all subscription package from db
export const getSubPackage = async (req, res, next) => {
  try {
    const totalApproved = await getPromoPackageCount("Approved");
    const totalRejected = await getPromoPackageCount("Rejected");
    const totalPending = await getPendingPromoPackageCount();

    //count for valid time
    const totalMonthly = await SubPackage.countDocuments({ validTime: "1 Month" });
    const totalQuarterly = await SubPackage.countDocuments({ validTime: "3 Month" });
    const totalYearly = await SubPackage.countDocuments({ validTime: "1 Year" });
    const totalWeek = await SubPackage.countDocuments({ validTime: "Week" });

    const NwSubPackages = await SubPackage.find({});

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthSubPackage = await SubPackage.countDocuments({
      createdAt: { $gte: oneMonthAgo, $lt: now },
    });

    res.status(200).json({
      count: NwSubPackages.length,
      data: NwSubPackages,
      totalApproved,
      totalRejected,
      totalPending,
      totalMonthly,
      totalQuarterly,
      totalYearly,
      totalWeek,
      lastMonthSubPackage,
    });
  } catch (error) {
    console.log(error.message);
    next(errorHandler(500, { message: error.message }));
  }
};

//get all packages from db by id
export const getIdSubPackage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const NwSubPackage = await SubPackage.findById(id);

    if (!NwSubPackage) {
      return res.status(404).json({ message: "Subsciption Package not found" });
    }
    return res.status(200).json(NwSubPackage);
  } catch (error) {
    console.log(error.message);
    next(errorHandler(500, { message: error.message }));
  }
};

//update the book
export const updateSubPackage = async (req, res, next) => {
  try {
    // if(!req.body.subPackageName || !req.body.price || !req.body.validTime || !req.body.description || !req.body.note1 || !req.body.note2 || !req.body.note3){
    //     return res.status(400).send({
    //         message: `Send all required fields: subPackageName, price, validTime, description, note1, note2, note3`,
    //     });
    // }

    const { id } = req.params;
    const result = await SubPackage.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({ message: `Package not Found` });
    }
    return res.status(200).json({ message: `Package updated sucessfully` });
  } catch (error) {
    console.log(error.message);
    next(errorHandler(500, { message: error.message }));
  }
};

//delete the package
export const deleteSubPackage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await SubPackage.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: `Package not Found` });
    }
    return res.status(200).json({ message: `Package deleted sucessfully` });
  } catch (error) {
    console.log(error.message);
    next(errorHandler(500, { message: error.message }));
  }
};
