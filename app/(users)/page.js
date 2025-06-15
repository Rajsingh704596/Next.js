import Card from "@/Components/Card";
import EnhancedImage from "@/public/images/EnhancedImage.jpg";          // Import basis
import Image from "next/image";                      // Image Component get from next/image

//* It's a Root Page - Home page 
const Home=()=>{

  //$ here we access image from public folder in different way - 1> Path basis , 2> Import basis
  //Todo Note -  path access by  / (slash only) ,  Not used - ./

  const list = [
    {  
       imagePath:"/vercel.svg",                      //Path basis
       Name: "Rahul",
       Description:"The New tracker"

    },
    {
       imagePath:"/images/rajsingh.png",             //Path basis
       Name: "Raj",
       Description:"The New developer"
    },
    {
      imagePath: EnhancedImage,                       //Import basis
       Name: "Rohit",
       Description:"The New guider"
    },

];
  return(
    <>
    <section className="m-10">
    <h1 className="heading_title m-10">Welcome Rock</h1>  
    {/* Card*/} 
    <h2 className="text-2xl font-bold mb-4">Next Js : Image Component with normal way :- Render size , file size optimize automatically and minimized the value based on the space , and change in Webp format </h2>
    <div className="flex gap-5 wrap-normal m-2">
    {
      list?.map((curElem)=>{
        const{imagePath, Name, Description}=curElem
        return(
          <Card imagePath={imagePath} Name={Name} Description={Description} key={Name}/>
        )
      })
    }
    </div>
    
    {/* fill property  */}
  
    <div className="mt-8"    >  
     <h2 className="text-2xl font-bold mb-4">Using Fill Property in Image Component</h2>
       {/* Positioning: The parent element must assign position: "relative", "fixed", "absolute".
            By default, the <img> element uses position: "absolute".  */}
      <div className="relative aspect-video w-[200px]">
      <Image src="/images/EnhancedImage.jpg" alt="logo" fill={true}  />
      </div>
      </div >
      
      <br />

      <div>
        <h2 className="text-xl font-bold mb-4">Using Quality property We can change Original quality of image , by Default quality is 75 but after change quality property image size also change based on quality </h2>
        <Image src={EnhancedImage} alt="image" width={200} height={50} quality={100}/>
      </div>

      <br />

       <div>
        <h2 className="text-xl font-bold mb-4">Priority property: Image on the spot show or we can use lazy loading based on Priority </h2>
        <h5>true: Preloads the image. Disables lazy loading.
false: Lazy loads the image.</h5>
        <Image src={EnhancedImage} alt="image" width={200} height={50} priority={false}/>
      </div>

      <br />

       <div>
        <h2 className="text-xl font-bold mb-4">Blur Effect/shimmer effect using Placeholder property , when image not load </h2>
        <Image src={EnhancedImage} alt="image" width={200} height={50} placeholder="blur"  />
       
      </div>
 
    </section>

     
    </>
  )
}

export default Home;