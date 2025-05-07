



export default function Delivery(){


    const Tax = 5.52;
    const Shipping = 5.00 ;
    return(<>
    
    
    <div className="w-[100%]">
            <h2 className="text-lg font-medium text-gray-900">Delivery method</h2>
            <div className="grid grid-cols-1 gap-4 mt-2">
              <div className="border border-indigo-600 bg-indigo-50 p-4 rounded-lg shadow-md ring-2 ring-indigo-600 cursor-pointer">
                <div className="font-semibold text-indigo-700">Standard</div>
                <div className="text-sm text-indigo-600">4–10 business days</div>
                <div className="mt-2 font-medium">$ {parseFloat(Shipping).toFixed(2)}</div>
              </div>
            </div>
          </div>
    
    </>);
}