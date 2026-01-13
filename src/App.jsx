
import './App.css'
import ProductCard from './components/productCard'


function App() {


  return (
    <>
      <div className="h-[700px] w-[700px] border-[5px] flex justify-center items-center ">
        <div className="h-[600px] w-[600px] bg-yellow-400 flex flex-row justify-center items-center">

          <div className="h-[100px] w-[100px] bg-green-400 ">


          </div>
          <div className="h-[100px] w-[100px] absolute bottom-[20px] right-[20px] bg-blue-400 ">

          </div>
          <div className="h-[100px] w-[100px] relative bg-red-400 ">

          </div>
          <div className="h-[100px] w-[100px] fixed left-[10px] top-[10px] bg-purple-400 ">

          </div>
          <div className="h-[100px] w-[100px] bg-pink-400 ">

          </div>
          <div className="w-[300px] h-[300px] bg-pink-600 m-[20px] p-[40px]">
            <div className="h-[50px] w-[50px] bg-gray-400   ">

            </div>
             <div className="h-[50px] w-[50px] bg-blue-400 m-[10px] ">

            </div>

          </div>



        </div>

      </div>

    </>
  )
}

export default App
