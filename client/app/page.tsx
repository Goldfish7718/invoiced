"use client"

import { ItemType, OrderItemType, OrderType } from '@/types/types';
import axios from 'axios';
import { Check, Plus, QrCode, ReceiptIndianRupee, Trash, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import QRcode from 'qrcode'

export default function Home() {

  const [items, setItems] = useState<ItemType[]>([]);

  const [quantity, setQuantity] = useState(1);
  const [currItem, setCurrItem] = useState('');
  const [fullname, setFullname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentURL, setPaymentURL] = useState('');
  const [email, setEmail] = useState('');

  const [orderItems, setOrderItems] = useState<OrderItemType[]>([]);

  const [toastIsVisible, setToastIsVisible] = useState(false)

  const fetchItems = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/items`)
      // console.log(process.env.API_URL);
      
      setItems(res.data.items)
    } catch (error) {
      console.log(error);
      alert("Error")
    }
  }

  const saveOrder = async () => {
    try {
      clearOrder()
      const res = await axios.post(`http://localhost:5000/orders/new`, {
        fullname,
        phoneNumber,
        items: orderItems,
        subtotal: orderItems.reduce((acc, order) => { return acc + order.aggregatedPrice }, 0),
        email
      })

      showToast()
    } catch (error) {
      alert("Error")
    }
  }

  const addToOrder = () => {
    const selectedItem = items.find(item => item.name === currItem);
    const exists = orderItems.find(order => order.name === currItem)
    
    if (!selectedItem) return; // Handle case where item is not found

    if (exists) {
      let arrayToUpdate = orderItems.filter(order => order.name !== currItem)
      
      const newItem: OrderItemType = {
        name: selectedItem.name,
        price: selectedItem.price,
        aggregatedPrice: selectedItem.price * quantity,
        quantity,
        _id: selectedItem._id
      }

      arrayToUpdate = [...arrayToUpdate, newItem]

      setOrderItems(arrayToUpdate)
      console.log(arrayToUpdate);

      setQuantity(1)

      return;
    }

  
    const newItem: OrderItemType = {
      name: selectedItem.name,
      price: selectedItem.price,
      aggregatedPrice: selectedItem.price * quantity,
      quantity,
      _id: selectedItem._id
    };
  
    const updatedItems = [...orderItems, newItem];
    setOrderItems(updatedItems);
    setQuantity(1)
  }

  const removeOrder = (_id: string) => {
    const updatedItems = orderItems.filter(order => order._id !== _id)
    setOrderItems(updatedItems)
    console.log(updatedItems);
  }

  const generateQR = () => {
    const subtotal = orderItems.reduce((acc, order) => { return acc + order.aggregatedPrice }, 0)
    QRcode.toDataURL(`upi://pay?pa=tejasnanoti2-1@oksbi&pn=Invoiced&am=${subtotal}&cu=INR`, function(err, url) { setPaymentURL(url) })
  }

  const clearOrder = () => {
    setCurrItem('')
    setQuantity(1)
    setFullname('')
    setPhoneNumber('')
    setOrderItems([])
    setPaymentURL('')
    setEmail('')
  }

  const showToast = () => {
    setToastIsVisible(true)

    setTimeout(() => {
      setToastIsVisible(false)
    }, 3000);
  }

  useEffect(() => {
    fetchItems()
  }, [])

  return (
    <>
      <main className="p-3 md:p-6 flex md:flex-row flex-col-reverse gap-3">
        {/* LEFT PANEL */}
        <div className="md:w-1/3 w-full flex flex-col gap-4">
          <div className="card w-full bg-[#e6e7e8] dark:bg-neutral dark:text-neutral-content">
            <div className="card-body">
              <h3 className="card-title">Enter customer details:</h3>

              <div className="flex flex-col gap-3 mt-4">
                <input value={fullname} type="text" placeholder="Full name" className="input w-full" onChange={e => setFullname(e.target.value)} />
                <input value={phoneNumber} type="text" placeholder="Phone number" className="input w-full" onChange={e => setPhoneNumber(e.target.value)} />
                <input value={email} type="email" placeholder="Email" className="input w-full" onChange={e => setEmail(e.target.value)} />
              </div>
            </div>
          </div>

          {/* ORDER ACTIONS */}
          <div className="card w-full h-full bg-[#e6e7e8] dark:bg-neutral dark:text-neutral-content">
            <div className="card-body">
              <h3 className="card-title">Actions:</h3>

              <div className="flex flex-col gap-2 my-4 h-full">
                <button onClick={clearOrder} className="btn btn-outline h-1/4 border-orange-300 bg-orange-300 hover:bg-orange-400 hover:border-orange-400 text-black">Clear Order <X /></button>
                {/* @ts-ignore */}
                <button onClick={() => { generateQR(); document.getElementById('payment_modal').showModal() }} className="btn btn-outline h-1/4 bg-orange-300 border-orange-300 hover:bg-orange-400 hover:border-orange-400 text-black">Generate Payment QR <QrCode /></button>
                <button onClick={saveOrder} className="btn btn-outline h-1/4 bg-orange-300 border-orange-300 hover:bg-orange-400 hover:border-orange-400 text-black">Mark as done <Check /></button>
                <button className="btn btn-outline h-1/4 bg-orange-300 border-orange-300 hover:bg-orange-400 hover:border-orange-400 text-black">Show bill <ReceiptIndianRupee /></button>
              </div>
            </div>
          </div>
        </div>

        {/* BILLING AREA */}
        <div className="md:w-2/3 w-full card bg-[#e6e7e8] dark:bg-neutral dark:text-neutral-content">
          <div className="card-body">
            <h3 className="card-title">Billing area:</h3>

            <div className="form-control w-full">
              <div className='flex flex-col'>
                <span className="label-text-alt my-2">Select items to add to order:</span>
                <select className="select select-bordered" onChange={e => setCurrItem(e.target.value)} value={currItem}>
                  <option value="" disabled>Select</option>
                  {items.map(item => <option value={item.name} key={item._id}>{item.name} &#40;&#8377;{item.price}&#41;</option>)}
                </select>
              </div>
              <div className='flex flex-col'>
                <span className="label-text-alt my-2">Select Quantity:</span>
                <input value={quantity} type="number" className="input" onChange={e => setQuantity(parseInt(e.target.value))} />
              </div>

              <button onClick={addToOrder} className="btn bg-orange-300 hover:bg-orange-400 hover:border-orange-400 text-black my-3">Add Item <Plus /></button>
            </div>

            <div className='max-h-96 overflow-y-scroll'>
              <table className="table overflow-x-autol">
                <thead>
                  <tr>
                    <td>Product Name:</td>
                    <td>Quantity:</td>
                    <td>Aggregated Price:</td>
                    <td>Actions:</td>
                  </tr>
                </thead>

                <tbody>
                  {orderItems.map(order => (
                    <tr key={order._id}>
                      <td>{order.name}</td>
                      <td>{order.quantity}</td>
                      <td>{order.aggregatedPrice}</td>
                      <td className='flex gap-1'>
                        <button className='btn btn-ghost btn-sm' onClick={() => removeOrder(order._id)}>
                          <Trash size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className='mt-4'>
              <h2><span className="font-bold text-lg">Subtotal: </span><span className="font-bold text-xl">&#8377;{orderItems.reduce((acc, order) => { return acc + order.aggregatedPrice }, 0)}</span></h2>
            </div>
          </div>
        </div>

        <dialog id="payment_modal" className="modal">
          <div className="modal-box flex flex-col items-center">
            <h3 className="font-bold text-lg text-center">Payment QR</h3>
            <img src={paymentURL} alt="qr" className='rounded-md my-6' />
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>

        {toastIsVisible && 
          <div className="toast toast-end">
            <div className="alert alert-success">
              <span>Order saved successfully.</span>
            </div>
          </div>
        }
      </main>
    </>
  );
}
