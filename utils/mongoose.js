import { connect, connection } from "mongoose";

const conn = {
  isConnected: false,
};

export async function dbConnect() {
  const db = await connect('mongodb://localhost/eat-ser');
  conn.isConnected = db.connections[0].readyState;
}

connection.on("connected", () => console.log("Mongodb connected to correct"));

connection.on("error", (err) => console.error("Mongodb Errro:", err.message));
