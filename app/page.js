"use client";

import Image from "next/image";
import { app , database} from "@/firebaseConfig";
import {collection, addDoc , getDocs , updateDoc , doc , deleteDoc} from "firebase/firestore"
import { useEffect , useState} from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
const [name, setName] = useState("")
// const [age, setAge] = useState("")
const [fireData, setFireData] = useState([])
const [isUpdate, setisUpdate] = useState(false)
const [id, setid] = useState(null)



  const databaseRef = collection(database, 'users')

    useEffect(()=>{
      let token = sessionStorage.getItem('Token')
      console.log(token)
  
        
      if(!token){
        
        router.push('/register')
      }
        getData();
      
     
    },[])
 
    const addData =async()=>{
      addDoc(databaseRef, {
        name: name,
        // age: age,

      })
      .then((response)=>{
        console.log(response)
        alert("data added successfully")
        // setAge('')
        setName(" ")
        getData()
        // router.push('/')
      })
      .catch((error)=>{
        console.log(error)
      })

    }

    const getData = async () => {
      const response = await getDocs(databaseRef);
      const data = response.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      console.log(data); // Check if data is correctly fetched
      setFireData(data);
    };

      // await getDocs(databaseRef)
      // .then((response)=>{
      //   response.forEach((doc)=>{
      //     console.log(doc.data())
      //   })
      // })
    
      const getId =(id , name , age)=>{
        setisUpdate(true)
        console.log(id)
        setid(id)
        // setAge(age)
        setName(name)
    
      
      }

      const updateData = () => {
        // Ensure 'id' is the document ID and 'fieldEdit' is a valid DocumentReference
        const fieldEdit = doc(database, 'users', id); 
      
        updateDoc(fieldEdit, {
          name: name,
          // age: age,
        })
          .then((response) => {
            console.log(response);
            alert('Data updated successfully');
            // setAge('');
            setName('');
            setid(null); 
            setisUpdate(false)
            // Clear the document ID after update
          })
          .catch((error) => {
            console.log(error);
          });
      };
      

 const DeleteData=(id)=>{
  const fieldDelete = doc(database, 'users', id); 
  deleteDoc(fieldDelete)
  .then((response) => {
    console.log(response);
    alert('Data deleted successfully');
    setid(null); 
    // setisUpdate(false)
    getData()
  })
  .catch((error) => {     
    console.log(error);
  } 
  )
 }

 const Logout=()=>{

  sessionStorage.removeItem('Token')
  router.push('/register')
  console.log("Logout")
  
  
 }


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">

      <div className=" ">
      <button 
      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300"
      onClick={()=>Logout()}
      >
        Logout
      </button>

      </div>
      
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      
       {/* <h1>Home</h1> */}
       <input type="text"  
        value={name}
        onChange={(e)=>setName(e.target.value)}
        className="w-full px-4 py-2 mb-4 border text-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
         placeholder="Name" />
       
      {/* <input type="text"
      value={age}
       onChange={(e)=>setAge(e.target.value)}
      className="w-full px-4 py-2 mb-4 border text-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="age" /> */}
       
      {
        isUpdate ?  
        <button  
        onClick={()=>updateData()}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300"
        >Update</button>

        
        :
        <button  
        onClick={()=>addData()}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300"
        >Add</button>

      }

       {/* <button  
       onClick={()=>getDocs()}
       className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300"
       >Get Data</button> */}

     <div className="flex flex-col gap-4 ">
      {
        fireData.map((item, index) => {
          return (
            <div key={index} className="flex flex-col gap-2 border-2  border-amber-300 p-4 rounded-lg">
              <h1 className="text-xl  font-semibold"> Name : {item.name}</h1>

              {/* <p className="text-xl m-3">Age : {item.age}</p> */}


              <button 
              onClick={()=> getId(item.id , item.name , item.age)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300">Update</button>

              <button 
              onClick={()=> DeleteData(item.id )}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300">Delete</button>
            </div>
          )
        })

      }
     </div>
       
      
      </main>
    
    </div>
  );
}
