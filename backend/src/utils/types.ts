type PayloadType = {
  id: string
  fullName: string
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