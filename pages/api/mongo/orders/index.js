import { MongoClient } from 'mongodb'
async function handler(req, res) {
    const client = await MongoClient.connect(process.env.MONGODB_URI)
    switch (req.method) {
        case "GET":
            const db = client.db('Tax&Legal-360')
            const orders = await db.collection('Orders').find().toArray()
            res.status(200).json(orders)
            await client.close()
            break
        case "POST":
            const body = JSON.parse(req.body)
            const newOrder = await client.db.collection('Orders').insertOne(body)
            res.status(200).json(newOrder)
            await client.close()
            break
    }
    res.end()
}
export default handler