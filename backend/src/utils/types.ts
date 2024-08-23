type PayloadType = {
  id: string
  username: string
}

interface OrderStatusType {
  status: 'pending' | 'to ship' | 'delivered'
}

interface PaymentMethodType {
  method: 'cash' | 'bank' | 'online'
}

export {
  PayloadType,
  OrderStatusType,
  PaymentMethodType,
}