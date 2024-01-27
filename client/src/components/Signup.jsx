import { useEffect } from "react";
import { useState, useRef } from "react"
import HeroWrapper from "../JustAWrapper/HeroWrapper"
import Fieldset from "../utils/Fieldset";
import HomeNavBar from "./HomeNavBar"

function Signup() {
  const [isAStudent, setIsAStudent] = useState(true);
  const [whoseChecked, setWhoseChecked] = useState("yes");
  const [isH1Visible, setIsH1Visible] = useState(true);
  const h1Ref = useRef(null);

  const handleIsAStudentChange = (e) => {
    if(e.target.id === "no"){
      setIsAStudent(false);
      setWhoseChecked("no")
      return
    }
   setIsAStudent(true)
   setWhoseChecked("yes")
  }

  const handleScroll = () => {
    //checks the visibilty of an element
    if(h1Ref.current !== null){
      const posY = h1Ref.current.getBoundingClientRect().top;
      if(posY <= 0){
        setIsH1Visible(false);
      }else{
        setIsH1Visible(true)
      }
    }
 }

 useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll)
 }, [])

  return (
    <HeroWrapper>
        <HomeNavBar className="py-2.5 sticky top-0" text={isH1Visible ? null : "Register - YouSell"} />
     <div className="row-span-11 col-span-3 flex flex-col items-center gap-5 mt-10">
      <h1 ref={h1Ref} className="logo header-logo">Signup - YouSell</h1>
      <form className="signup-form max-w-[900px] w-[700px] shadow-2xl shadow-teal-900 rounded-lg p-5">
        {/* TOP LEFT SIDE OF THE FORM */}
        <Fieldset legend="Personal Information">
          <div className="flex gap-10 box-border">
            <div className="flex flex-col gap-8 w-1/2">
              <div className="input-wrapper flex flex-col gap-2">
                  <label>Firstname</label>
                  <input type="text" />
              </div>
              <div className="input-wrapper flex flex-col gap-2">
                  <label>Middle Name <span className="italic font-normal">(Optional)</span></label>
                  <input type="text" />
              </div>
              <div className="input-wrapper flex flex-col gap-2">
                  <label>Lastname</label>
                  <input type="text" />
              </div>
            </div>
            {/* TOP RIGHT SIDE OF THE FORM */}
            <div className="flex flex-col gap-8 w-1/2">
              <Fieldset legend="Are you a UC student?" className="p-3">
                <div className="flex gap-5">
                    <div className="flex gap-2 items-center cursor-pointer">
                      <label htmlFor="yes" className="order-2 text-teal-900 font-semibold">Yes</label>
                      <input onChange={handleIsAStudentChange} id="yes" value="yes" className="order-1 h-4 w-4" type="radio" name="choice" checked={whoseChecked === "yes" ? true : false} />
                    </div>
                    <div className="flex gap-2 items-center">
                      <label htmlFor="no" className="order-2 text-teal-900 font-semibold">No</label>
                      <input onChange={handleIsAStudentChange} id="no" value="no" className="order-1 h-4 w-4" type="radio" name="choice" checked={whoseChecked !== "yes" ? true : false} />
                    </div>
                </div>
              </Fieldset>
              {/*IF A UC STUDENT */}
              { isAStudent  && 
                  <div>
                      <div className="input-wrapper flex flex-col gap-2">
                        <label>Course</label>
                        <input type="text" />
                      </div>
                      <div className="input-wrapper flex flex-col gap-2">
                        <label>Year</label>
                        <input type="text" />
                      </div>
                  </div>
              }
              </div>
            </div> {/* END OF TOP SIDE OF THE FORM */}
          </Fieldset>

        {/*ADDRESS PART */}
       <Fieldset legend="Address" className="mt-10">
           <div>
            hello
           </div>
       </Fieldset>
        {/*END OF ADDRESS PART */}
        <button className="bg-teal-900 hover:opacity-85 py-2.5 rounded font-bold text-white w-full mt-7">Submit</button>
      </form>
     </div>
     <div className="col-span-2"></div>
    </HeroWrapper>
  )
}

export default Signup
