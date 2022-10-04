
import Producto from "../../../models/Producto";
const multer  = require('multer')
import { dbConnect } from "../../../utils";

dbConnect();
const upload = multer({ dest: '.uploads/' })


export default async (req, res) => {
  const { method, body } = req;
  upload.single('avatar');
  switch (method) {
    case "GET":
      try {
        const categories = await Producto.find();
        return res.status(200).json(categories);
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }
    case "POST":
      try {
        console.log(req.file)
       
        
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }
    default:
      return res.status(400).json({ msg: "This method is not supported" });
  }
};
