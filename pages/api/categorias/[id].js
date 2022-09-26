import { dbConnect } from "../../../utils/index";
import Categoria from "../../../models/Categoria";

dbConnect();

export default async function categoryHandler(req, res) {
  const {
    method,
    query: { id },
    body,
  } = req;


  switch (method) {
    case "GET":
      try {
        const category = await Categoria.findById(id);
        if (!category) return res.status(404).json({ msg: "category does not exists" });
        return res.status(200).json(category);
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }
    case "PUT":
      try {
        const category = await Categoria.findByIdAndUpdate(id, body, {
          new: true,
          runValidators: true,
        });
        if (!category) return res.status(404).json({ msg: "category does not exists" });
        return res.status(200).json(category);
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }
    case "DELETE":
      try {
        const deletedCategory = await Categoria.findByIdAndDelete(id);
        if (!deletedCategory)
          return res.status(404).json({ msg: "Category does not exists" });
        return res.status(204).json();
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }
    default:
      return res.status(400).json({ msg: "This method is not supported" });
  }
}
