type PayloadType = {
  id: string
  username: string
}

interface OrderStatusType {
  status: 'pending' | 'to ship' | 'delivered'
}

export {
  PayloadType,
  OrderStatusType,
}