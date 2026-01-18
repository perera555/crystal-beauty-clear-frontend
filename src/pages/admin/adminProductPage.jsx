import axios from "axios"
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { CiCirclePlus } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { PiPlus } from "react-icons/pi";
import toast from "react-hot-toast";
import { Loader } from "../../components/Loader";


function ProductDeleteConfirm(props) { // delelte confirmation box
    const productID = props.productID;
    const close = props.close;
    const refresh = props.refresh;


    function deleteProduct(){
        const token = localStorage.getItem("token")
        axios.delete(import.meta.env.VITE_API_URL + "/api/products/" + productID,
            {
                 headers: {
                        Authorization: `Bearer ${token}`
            }
        }
        ).then(
            (response)=>{
                console.log(response.data);
                close();
                toast.success("Product Delete Successfully")
                refresh();

            }
        ).catch(()=>{
            toast.error("Failed to Delete Product")
        })
    }



    return <div className="fixed left-0 top-0 w-full h-screen bg-[#00000050] z-[100] flex justify-center items-center ">
        <div className="w-[500px] h-[200px] bg-primary relative flex flex-col justify-center items-center gap-[40px]">
            <button onClick={close} className="absolute right-[-42px] top-[-42px] w-[40px] h-[40px] bg-red-600 rounded-full font-bold text-white flex justify-center items-center border border-red-600 hover:bg-white hover:text-red-600" >
                x
            </button>
            <p className="text-xl font-semibold">Are you sure want to Delete the Product with productID :{productID}?  </p>
            <div className="flex gap-[40px] ">
                <button onClick={close} className="w-[100px]  p-[5px] text-white hover-bg-accent bg-blue-600">
                    cancel
                </button>
                <button onClick={deleteProduct} className="w-[100px] p-[5px] text-white hover-bg-accent bg-red-600" >
                    Yes
                </button>
            </div>

        </div>

    </div>
}

export default function AdminProductPage() {
    const [products, setProducts] = useState([])
    const [isdeleteconfirmvisible, setsDelelteConfirmVisible] = useState(false)
    const[producttoDelete, setProductToDelete] =useState(null)
    const[isloding , setIsLoding] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        if(isloding){ 
        axios
            .get(import.meta.env.VITE_API_URL + "/api/products")
            .then((response) => {
                setProducts(response.data);
                setIsLoding(false);
            });
        }
    }, [isloding]);

    return (
        <div className="w-full h-full p-6 bg-primary">
            {
                //delete close component
                isdeleteconfirmvisible && <ProductDeleteConfirm refresh={()=>{setIsLoding(true)}} productID={producttoDelete} close={() => { setsDelelteConfirmVisible(false) }} />
            }
            <Link to="/admin/addproduct" className="fixed right-[50px] bottom-[50px] text-5xl">
                <CiCirclePlus className="hover:text-accent" />
            </Link>
           
            <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
               
                {isloding?<Loader/>:
                <table className="w-full text-sm text-secondary">
                    <thead className="bg-primary sticky top-0">
                        <tr className="text-left text-xs uppercase tracking-wide text-secondary/70">
                            <th className="px-6 py-4">Image</th>
                            <th className="px-6 py-4">Product ID</th>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Price</th>
                            <th className="px-6 py-4">Labelled Price</th>
                            <th className="px-6 py-4">Stock</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y">
                        {products.map((item) => (
                            <tr
                                key={item.productID}
                                className="hover:bg-primary/50 transition-colors"
                            >
                                <td className="px-6 py-4">
                                    <img
                                        src={item.images[0]}
                                        className="w-14 h-14 rounded-xl object-cover shadow-sm"
                                        alt={item.name}
                                    />
                                </td>

                                <td className="px-6 py-4 font-medium">
                                    {item.productID}
                                </td>

                                <td className="px-6 py-4">
                                    {item.name}
                                </td>

                                <td className="px-6 py-4 font-semibold">
                                    LKR{item.price}
                                </td>

                                <td className="px-6 py-4 text-secondary/70">
                                    LKR{item.labelledPrice}
                                </td>
                                <td className="px-6 py-4 text-secondary/70">
                                    {item.stock}
                                </td>

                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 rounded-full text-xs bg-primary text-secondary">
                                        {item.category}
                                    </span>
                                </td>

                                <td className="px-6 py-4">
                                    <div className="flex justify-center gap-4">
                                        <button className="p-2 rounded-lg hover:bg-red-50 transition">
                                            <FaRegTrashCan onClick={//delete button
                                                () => {
                                                    setProductToDelete(item.productID)
                                                    setsDelelteConfirmVisible(true)
                                                  
                                                }} className="text-secondary hover:text-red-600 text-lg" />
                                        </button>

                                        <button className="p-2 rounded-lg hover:bg-accent/10 transition">
                                            <FaRegEdit onClick={
                                                () => {
                                                    navigate("/admin/updateproduct", {
                                                        state: item
                                                    })

                                                }}
                                                className="text-secondary hover:text-accent text-lg" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>}
            </div>
        </div>
    )
}
