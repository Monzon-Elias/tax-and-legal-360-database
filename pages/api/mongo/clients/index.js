import { MongoClient } from "mongodb"

async function handler(req, res) {
  const client = await MongoClient.connect(process.env.MONGODB_URI)
  const db = client.db("Tax&Legal-360")
  const { id, name, orderId, email } = req.body
  switch (req.method) {
    case "GET":
      const clients = await db.collection("Clients").find().toArray()
      res.status(200).json(clients)
      await client.close()
      break
    case "POST":
      console.log({ name, orderId, email })
      const newClient = await db.collection("Clients").insertOne({ name, orderId, email })
      res.status(200).json(newClient)
      await client.close()
      break
    case "PUT":
      const updatedClient = await db.collection("Clients").findOneAndUpdate(
        { _id: id },
        {
          $set: { name: name, orderId: orderId, email: email },
          returnOriginal: false,
          new: true
        }
      )
      res.status(200).json(updatedClient)
      await client.close()
    case "DELETE":
      const deletedClient = await db.collection("Clients").findOneAndDelete({ _id: ObjectID(id) })
      res.status(200).json(deletedClient)
      await client.close()
      break
  }
  res.end()
}
export default handler
