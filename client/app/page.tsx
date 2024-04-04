import orderData from '@/data/orderData.json'
import { Check, Minus, Plus, QrCode, ReceiptIndianRupee, Trash, X } from 'lucide-react';

export default function Home() {
  return (
    <>
      <main className="p-6 flex gap-3">
        {/* LEFT PANEL */}
        <div className="w-1/3 flex flex-col gap-4">
          <div className="card w-full bg-neutral text-neutral-content">
            <div className="card-body">
              <h3 className="card-title">Enter customer details</h3>

              <div className="flex flex-col gap-3 mt-4">
                <input type="text" placeholder="Full name" className="input w-full" />
                <input type="text" placeholder="Phone number" className="input w-full" />
              </div>
            </div>
          </div>

          {/* ORDER ACTIONS */}
          <div className="card w-full bg-neutral text-neutral-content h-full">
            <div className="card-body">
              <h3 className="card-title">Actions</h3>

              <div className="flex flex-col gap-2 mt-4 h-full">
                <button className="btn btn-outline h-1/4 bg-orange-300 hover:bg-orange-400 hover:border-orange-400 text-black">Clear Order <X /></button>
                <button className="btn btn-outline h-1/4 bg-orange-300 hover:bg-orange-400 hover:border-orange-400 text-black">Generate Payment QR <QrCode /></button>
                <button className="btn btn-outline h-1/4 bg-orange-300 hover:bg-orange-400 hover:border-orange-400 text-black">Mark as done <Check /></button>
                <button className="btn btn-outline h-1/4 bg-orange-300 hover:bg-orange-400 hover:border-orange-400 text-black">Show bill <ReceiptIndianRupee /></button>
              </div>
            </div>
          </div>
        </div>

        {/* BILLING AREA */}
        <div className="w-2/3 card bg-neutral text-neutral-content">
          <div className="card-body">
            <h3 className="card-title">Billing area:</h3>

            <div className="form-control w-full">
              <div className='flex flex-col'>
                <span className="label-text-alt my-2">Select items to add to order:</span>
                <select className="select select-bordered">
                  <option value="rice">Rice</option>
                  <option value="wheat">Wheat</option>
                  <option value="mangoes" selected>Mangoes</option>
                  <option value="maggie">Maggie</option>
                </select>
              </div>
              <div className='flex flex-col'>
                <span className="label-text-alt my-2">Select Quantity:</span>
                <input type="number" className="input" />
              </div>
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
                  {orderData.data.map(order => (
                    <tr>
                      <td>{order.product_name}</td>
                      <td>{order.quantity}</td>
                      <td>{order.total_price}</td>
                      <td className='flex gap-1'>
                        <button className="btn btn-ghost btn-sm">
                          <Plus size={18} />
                        </button>
                        <button className="btn btn-ghost btn-sm">
                          <Minus size={18} />
                        </button>
                        <button className='btn btn-ghost btn-sm'>
                          <Trash size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className='mt-4'>
              <h2><span className="font-bold text-lg">Subtotal: </span><span className="font-bold text-xl">&#8377;250</span></h2>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
