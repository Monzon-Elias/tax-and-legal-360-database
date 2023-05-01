import { useEffect, useState } from "react"
import axios from "axios"

const TestHome = () => {
  const [clients, setClients] = useState([])
  const [orders, setOrders] = useState([])
  const [newClient, setNewClient] = useState(false)
  const [deleteLastClient, setDeleteLastClient] = useState(false)

  useEffect(() => {
    fetching()
  }, [newClient])

  const fetching = async () => {
    //clients from the db
    try {
      const clients = await axios.get("/api/mongo/clients")
      console.log(clients.data)
      setClients(clients.data)
    } catch (error) {
      console.error(error)
      throw new Error("Failed to fetch clients data")
    }
    //orders from the db
    try {
      const orders = await axios.get("/api/mongo/orders")
      console.log(orders.data)
      setOrders(orders.data)
    } catch (error) {
      console.error(error)
      throw new Error("Failed to fetch orders data")
    }
  }

  const insertClient = async () => {
    //insert a new client to the db
    try {
      const clients = await axios.post("/api/mongo/clients", {
        name: "Juanita Perez",
        orderId: "64494d1b8e8c31e1fe1fe804",
        email: "juanita@perez.com"
      })
      let newClient = clients.config.data
      console.log(JSON.parse(newClient))
      setClients(prevState => [...prevState, newClient])
      setNewClient(true)
      setTimeout(() => {
        setNewClient(false)
      }, 2000)
    } catch (error) {
      console.error(error)
      throw new Error("Failed to insert a new client")
    }
  }

  const updateClient = async id => {
    //update client by id
    try {
      const client = await axios.put(`/api/mongo/clients/${id}`)
      const updatedClient = client.data.value
      console.log(updatedClient)
      setClients(prevState => prevState.slice(0, -1))
      setDeleteLastClient(true)
      setTimeout(() => {
        setDeleteLastClient(false)
      }, 2000)
    } catch (error) {
      console.error(error)
      throw new Error("Failed to delete the last inserted client")
    }
  }

  const deleteClient = async id => {
    //delete last client from the db
    try {
      const client = await axios.delete(`/api/mongo/clients/${id}`)
      const deletedClient = client.data.value
      console.log(deletedClient)
      setClients(prevState => prevState.slice(0, -1))
      setDeleteLastClient(true)
      setTimeout(() => {
        setDeleteLastClient(false)
      }, 2000)
    } catch (error) {
      console.error(error)
      throw new Error("Failed to delete the last inserted client")
    }
  }

  return clients.length < 1 || orders.length < 1 ? (
    <p>Data is dressing up!...</p>
  ) : (
    <>
      <div style={{ display: "flex" }}>
        <div style={{ flex: "1", padding: "20px", backgroundColor: "#eee" }}>
          <h1>Client Data:</h1>
          {clients.map(client => (
            <p key={client._id} className="box-with-icons">
              {client.name}: {client.email}
              <span className="icon-pencil" onClick={() => updateClient}></span>
              <span className="icon-trash" onClick={() => deleteClient}></span>
            </p>
          ))}
        </div>
        <div style={{ flex: "1", padding: "20px", backgroundColor: "#ddd" }}>
          <h1>Orders Data:</h1>
          {orders.map(order => (
            <p key={order._id}>
              {order.type}: {"$" + order.price}
            </p>
          ))}
        </div>
      </div>
    </>
  )
}
export default TestHome
