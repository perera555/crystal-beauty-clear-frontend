import { useEffect, useState } from "react";
import Header from "../components/header";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader } from "../components/Loader";
import ProductCard from "../components/productCard";



export function ProductPage() {
  const [products, setProducts] = useState([]);
  const [isloding, setIsLoding] = useState(true)

  useEffect(()=>{
    if(isloding){
      axios.get(import.meta.env.VITE_API_URL + "/api/products")
      .then((response)=>{
        setProducts(response.data)
        setIsLoding(false)


      }
    ).catch((error)=>{
      console.error("Error fetching products" ,error);
      setIsLoding(false)
      toast.error("failed to Load Products");
      
    })
    }



  },[isloding])

  return (
    <div className="w-full min-h-[calc(100vh-100px)] bg-primary ">
      <Header />
    
{
  isloding?<Loader/>
  :
  <div className="w-full h-full flex flex-row flexr-wrap justify-center bg-primary">
    {
      products.map((item)=>{
        return(
          <ProductCard key={item.productID} product={item}/>
        )
         

      })

    }

  </div>
  

}
    </div>

  )
}
