
import CheckoutForm from "../Component/SubComponent/CheckoutForm";
import Test from "../(verifycomponent)/stripetesting/test";
import Checkoutsub from "../../app/Component/SubComponent/Checkoutsub";
import Delivery from "../Component/SubComponent/Delivery";



export default function Checkout() {






  return (
    <>
      <div className="flex justify-between w-[100%] gap-10 p-[2rem]">
        <div className="w-[100%] flex flex-col gap-10">
         
          <Delivery></Delivery>
          <Test data={100}></Test>
        </div>
        <div className="w-[100%]">
          <CheckoutForm></CheckoutForm>
        </div>
      </div>
    </>
  );
}