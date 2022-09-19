import { Schema, model, models } from "mongoose";

const CategoriaSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "The Cattegoria title is required "],
      unique: true,
      trim: true,
      maxlength: [40, "title cannot be grater than 40 characters"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Categoria || model("Categoria", CategoriaSchema);
