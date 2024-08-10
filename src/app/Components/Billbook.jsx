"use client";
import React, { useRef } from 'react';

function Billbook({ finalData }) {
  if (!finalData) return <p>No data available</p>;

  const billbookRef = useRef();

  const handlePrint = () => {
    const printContents = billbookRef.current.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // Refresh the page to restore the original content
  };

  // Construct BillbookData from finalData
  const BillbookData = {
    ClientName: finalData.clientDetails.clientName,
    Date: finalData.clientDetails.date || "N/A",
    orderNumber: finalData.clientDetails.orderNumber || "N/A",
    itemList: finalData.products.map(product => ({
      ProductName: product.productName,
      Quantity: product.quantity,
      Rate: product.rate,
      Unit: product.units,
    })),
  };

  // Fixed delivery charge
  const deliveryCharge = 10;

  // Calculate total amounts and grand total
  const itemListWithTotal = BillbookData.itemList.map((item) => {
    const isGram = item.Unit === 'g';
    const quantityInKg = isGram ? item.Quantity / 1000 : item.Quantity;
    const totalAmount = quantityInKg * item.Rate;
    return { ...item, TotalAmount: totalAmount, DisplayQuantity: isGram ? `${item.Quantity} g` : `${item.Quantity} kg` };
  });

  const grandTotal = itemListWithTotal.reduce((sum, item) => sum + item.TotalAmount, 0);
  const totalWithDelivery = grandTotal + deliveryCharge;

  return (
    <div className="w-full md:w-[600px] bg-[#90EE90] mx-auto p-3 rounded-md shadow-lg">
      <div ref={billbookRef} className="bg-white p-2 rounded-md">
        <div className="p-5">
          <h2 className="text-3xl md:text-4xl mb-2 text-center font-bold text-[#90EE90]">Vegetable Wale</h2>
          <h4 className="text-center mb-4 text-sm md:text-lg font-medium text-gray-600">Shop here and Skip market</h4>
        </div>
        <div className="bg-blue-50 p-2 rounded-md shadow-inner mb-4">
          <p className="text-gray-800">
            <span className="text-[16px] md:text-lg font-semibold">Client&#39;s Name: </span>
            <span className="font-[400] text-sm md:text-lg md:font-medium ml-1">{BillbookData.ClientName}</span>
          </p>
          <div className="flex justify-between items-center text-gray-800 mt-2">
            <p>
              <span className="text-sm md:text-lg font-semibold">Date: </span>
              <span className="font-[400] md:font-medium">{BillbookData.Date}</span>
            </p>
            <p>
              <span className="text-sm md:text-lg font-semibold">Order Number: </span>
              <span className="font-[400] md:font-medium">{BillbookData.orderNumber}</span>
            </p>
          </div>
        </div>
        <div>
          <div className="w-full flex items-center justify-between p-2 bg-blue-200 rounded-t-md">
            <span className="text-sm md:text-lg font-bold w-[30%] bg-blue-300 p-2 text-blue-900 rounded-md line-clamp-1">Product Name</span>
            <div className="w-[35%] bg-blue-300 p-2 flex items-start justify-around text-blue-900 rounded-md">
              <span className="text-sm md:text-lg font-bold">Quantity</span>
              <span className="text-sm md:text-lg font-bold">Rate</span>
            </div>
            <span className="text-sm md:text-lg font-bold w-[30%] bg-blue-300 p-2 text-blue-900 text-right rounded-md line-clamp-1">Total Amount</span>
          </div>
          <div className="bg-blue-50">
            {itemListWithTotal.map((item, index) => (
              <div key={index} className="flex justify-between items-center p-3 border-b border-blue-200">
                <span className="font-medium w-[30%] text-blue-800 line-clamp-1">{item.ProductName}</span>
                <div className="w-[30%] flex items-start justify-around text-blue-800">
                  <span className="font-medium">{item.DisplayQuantity}</span>&nbsp;
                  <span className="font-bold">x</span>&nbsp;
                  <span className="font-medium">{item.Rate}</span>
                </div>
                <span className="font-medium w-[30%] text-right text-blue-800">= {item.TotalAmount.toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-end items-center p-3 border-t-2 border-blue-300 bg-blue-100">
            <div className="flex flex-col w-full">
              <p className="font-bold text-blue-900 text-lg flex flex-row justify-between items-center"><span>Total Amount:</span><span>{grandTotal.toFixed(2)}</span></p>
              <p className="font-bold text-blue-900 text-lg flex flex-row justify-between items-center"><span>Delivery Charge:</span><span>{deliveryCharge.toFixed(2)}</span></p>
              <p className="font-bold text-blue-900 text-lg flex flex-row justify-between items-center"><span>Grand Total:</span><span>{totalWithDelivery.toFixed(2)}</span></p>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={handlePrint}
        className="mt-4 bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 shadow-md"
      >
        Print Billbook
      </button>
    </div>
  );
}

export default Billbook;
