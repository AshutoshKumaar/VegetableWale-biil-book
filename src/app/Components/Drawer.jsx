"use client";
import React, { useState } from "react";
import {
  Drawer as UIDrawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Footer from "./Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Billbook from "./Billbook";

export default function MyDrawer() {
  const [changeTab, setChangeTab] = useState(false);
  const [changeScreen, setChangeScreen] = useState(true);
  const [clientDetails, setClientDetails] = useState({
    clientName: "",
    orderNumber: "",
    date: "",
  });
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState({
    productName: "",
    quantity: "",
    rate: "",
    units: "",
  });

  const [finalData, setFinalData] = useState(null);

  const handleClientDetailChange = (e) => {
    const { id, value } = e.target;
    setClientDetails((prevDetails) => ({
      ...prevDetails,
      [id]: value,
    }));
  };

  const handleProductChange = (e) => {
    const { id, value } = e.target;
    setCurrentProduct((prevProduct) => ({
      ...prevProduct,
      [id]: value,
    }));
  };

  const handleUnitChange = (value) => {
    setCurrentProduct((prevProduct) => ({
      ...prevProduct,
      units: value,
    }));
  };

  const addProduct = () => {
    // Validate product details before adding
    if (
      currentProduct.productName &&
      currentProduct.quantity &&
      currentProduct.rate &&
      currentProduct.units
    ) {
      setProducts((prevProducts) => [...prevProducts, currentProduct]);
      setCurrentProduct({ productName: "", quantity: "", rate: "", units: "" });
    } else {
      // Handle invalid product details
      alert("Please fill in all product details.");
    }
  };

  const clickTabChange = () => {
    setChangeTab(true);
  };

  const clickPrevious = () => {
    setChangeTab(false);
  };

  const handleSubmit = () => {
    // Validate client details before submitting
    if (
      clientDetails.clientName &&
      clientDetails.orderNumber &&
      clientDetails.date &&
      products.length > 0
    ) {
      const data = {
        clientDetails,
        products,
      };
      setFinalData(data); // Set the finalData state
      setChangeScreen(false);
    } else {
      // Handle invalid client details or empty products list
      alert("Please fill in all client details and add at least one product.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {changeScreen ? (
        <UIDrawer>
          {/* Section-1 */}
          <div className="p-5 border-b-[1px] shadow-md bg-white opacity-70">
            <h2 className="text-3xl md:text-4xl mb-2 text-center font-bold text-[#90EE90]">
              Vegetable Wale
            </h2>
            <h4 className="text-center mb-4 text-sm md:text-lg font-medium text-gray-600">
              Shop here and Skip market
            </h4>
          </div>
          {/* Section-2 */}
          <p className="text-lg text-center my-6 w-[70%] mx-auto">
            Just click the below button to make a bill
          </p>
          <div className="w-[60%] mx-auto text-center h-[55vh]">
            <DrawerTrigger>
              <Button className="bg-[#90EE90] py-3 px-8 text-lg text-slate-500">
                Make a bill
              </Button>
            </DrawerTrigger>
          </div>
          <DrawerContent>
            <DrawerHeader className="text-center">
              <DrawerTitle className="text-lg font-[600] text-center">
                Please fill the required inputs
              </DrawerTitle>
              <DrawerDescription className="text-center">
                This action cannot be undone.
              </DrawerDescription>
            </DrawerHeader>

            {!changeTab ? (
              // First-input-section
              <div>
                <div className="grid w-full max-w-sm items-center p-3 mx-auto">
                  <Label htmlFor="clientName" className="mb-3 font-[500]">
                    Client&apos;s Name
                  </Label>
                  <Input
                    type="text"
                    id="clientName"
                    value={clientDetails.clientName}
                    onChange={handleClientDetailChange}
                    className="shadow-sm p-1"
                    placeholder="Client's Name..."
                  />
                </div>
                <div className="grid w-full max-w-sm items-center p-3 mx-auto">
                  <Label htmlFor="orderNumber" className="mb-3 font-[500]">
                    Order No
                  </Label>
                  <Input
                    type="number"
                    id="orderNumber"
                    value={clientDetails.orderNumber}
                    onChange={handleClientDetailChange}
                    className="shadow-sm p-1"
                    placeholder="Order No..."
                  />
                </div>
                <div className="grid w-full max-w-sm items-center p-3 mx-auto">
                  <Label htmlFor="date" className="mb-3 font-[500]">
                    Date
                  </Label>
                  <Input
                    type="date"
                    id="date"
                    value={clientDetails.date}
                    onChange={handleClientDetailChange}
                    className="shadow-sm p-1"
                    placeholder="Enter the date..."
                  />
                </div>
              </div>
            ) : (
              // Second-input-section
              <div>
                <div className="grid w-full max-w-sm items-center p-3 mx-auto">
                  <Label htmlFor="productName" className="mb-3 font-[500]">
                    Product&apos;s Name
                  </Label>
                  <Input
                    type="text"
                    id="productName"
                    value={currentProduct.productName}
                    onChange={handleProductChange}
                    className="shadow-sm p-1"
                    placeholder="Product's name..."
                  />
                </div>
                <div className="grid w-full max-w-sm items-center p-3 mx-auto">
                  <Label htmlFor="quantity" className="mb-3 font-[500]">
                    Quantity
                  </Label>
                  <Input
                    type="number"
                    id="quantity"
                    value={currentProduct.quantity}
                    onChange={handleProductChange}
                    className="shadow-sm p-1"
                    placeholder="Enter the Quantity..."
                  />
                </div>
                <div className="grid w-full max-w-sm items-center p-3 mx-auto">
                  <Label htmlFor="rate" className="mb-3 font-[500]">
                    Rate
                  </Label>
                  <Input
                    type="number"
                    id="rate"
                    value={currentProduct.rate}
                    onChange={handleProductChange}
                    className="shadow-sm p-1"
                    placeholder="Enter the Rate..."
                  />
                </div>
                <div className="w-full max-w-sm mx-auto p-3">
                  <Label htmlFor="units" className="mb-3 font-[500]">
                    Units
                  </Label>
                  <Select onValueChange={handleUnitChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select units" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Units</SelectLabel>
                        <SelectItem value="g">Gram</SelectItem>
                        <SelectItem value="kg">Kg</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="text-center my-3">
                  <Button
                    className="text-lg py-2 w-[170px] mx-auto"
                    onClick={addProduct}
                  >
                    Add Product
                  </Button>
                </div>
                <ul className="mx-4 my-1 h-[50px] overflow-y-auto">
                  {products.length > 0 ? (
                    products.map((product, index) => (
                      <li
                        className="text-lg mb-2 bg-indigo-300"
                        key={index}
                      >{`${product.productName} = ${product.quantity} ${product.units} x ${product.rate}`}</li>
                    ))
                  ) : (
                    <li className="text-lg mb-2 text-center text-gray-500">No products added</li>
                  )}
                </ul>
              </div>
            )}

            <DrawerFooter className="flex flex-row justify-between items-center">
              {!changeTab ? (
                <DrawerClose>
                  <Button className="text-lg py-2 px-8">Cancel</Button>
                </DrawerClose>
              ) : (
                <Button className="text-lg py-2 px-8" onClick={clickPrevious}>
                  Previous
                </Button>
              )}
              {!changeTab ? (
                <Button className="text-lg py-2 px-8" onClick={clickTabChange}>
                  Next
                </Button>
              ) : (
                <DrawerClose>
                  <Button
                    className="text-lg py-2 px-8"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </DrawerClose>
              )}
            </DrawerFooter>
          </DrawerContent>
        </UIDrawer>
      ) : (
        <Billbook finalData={finalData} />
      )}
      <Footer />
    </div>
  );
}
