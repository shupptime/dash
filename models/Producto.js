import { Schema, model, models } from "mongoose";

const ProductoSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "The Cattegoria title is required "],
      unique: true,
      trim: true,
      maxlength: [40, "title cannot be grater than 40 characters"],
    },
    price: {
        type: Number,
        required: [true, "The property 'price' is required "],
        trim: true,
      },
    image: {
        type: String,
        trim: true
    },
    categoryId: {
        type: String,
        required: [true, "The property 'categoyId' is required "],
      },
    
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Producto || model("Producto", ProductoSchema);
