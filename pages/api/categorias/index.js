
import Categoria from "../../../models/Categoria";
import { dbConnect } from "../../../utils";

dbConnect();

export default async (req, res) => {
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const categories = await Categoria.find();
        return res.status(200).json(categories);
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }
    case "POST":
      try {
        const newCategory = new Categoria(req.body);

        const savedCategory = await newCategory.save();
        console.log("savedCategory:", savedCategory);
        return res.status(201).json(savedCategory);
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }
    default:
      return res.status(400).json({ msg: "This method is not supported" });
  }
};
