import { useEffect } from "react";
import { useState, useRef } from "react"
import HeroWrapper from "../JustAWrapper/HeroWrapper"
import Fieldset from "../utils/Fieldset";
import HomeNavBar from "./HomeNavBar"

function Signup() {
  const [isAStudent, setIsAStudent] = useState(true);
  const [whoseChecked, setWhoseChecked] = useState("yes");
  const [isH1Visible, setIsH1Visible] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(false);
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

 const handleAccepted = () => {
  setTermsAccepted(!termsAccepted);
 }
 useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll)
 }, [])

  return (
    <HeroWrapper>
        <HomeNavBar className="py-2.5 sticky top-0" text={isH1Visible ? null : "Register - YouSell"} />
     <div className="row-span-11 col-span-3 flex flex-col items-center gap-5 my-10">
      <h1 ref={h1Ref} className="logo header-logo">Signup - YouSell</h1>
      <form className="signup-form max-w-[900px] w-[90%] md:w-[75%] lg:w-[60%] box-border md:shadow-2xl md:shadow-teal-900 rounded-lg md:p-5">
        <Fieldset legend="Personal Information">
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 md:gap-8 lg:gap-10">
            {/* TOP LEFT SIDE OF THE FORM */}
            <div className="col-span-1 flex flex-col gap-3 md:gap-8">
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
            <div className="col-span-1">
              <Fieldset legend="Are you a UC student?" className="md:p-3 grid grid-cols-1 gap-4 md:gap-7">
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
                 {/*IF A UC STUDENT */}
                  { isAStudent  && 
                      <div className="flex flex-col gap-3 md:gap-5">
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
              </Fieldset>
              </div>
            </div> {/* END OF TOP SIDE OF THE FORM */}
          </Fieldset>

        {/*ADDRESS PART */}
       <Fieldset legend="Address" className="mt-7 md:mt-10">
           <div className="box-border grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-5 md:gap-y-8">
              <div className="input-wrapper flex flex-col gap-2">
                  <label>Province</label>
                  <input type="text" />
              </div>
              <div className="input-wrapper flex flex-col gap-2">
                      <label>City</label>
                      <input type="text" />
              </div>
              <div className="input-wrapper flex flex-col gap-2">
                  <label>Barangay</label>
                  <input type="text" />
              </div>
              <div className="input-wrapper flex flex-col gap-2">
                  <label>Street</label>
                  <input type="text" />
              </div>
              <div className="input-wrapper flex flex-col gap-2">
                  <label>Zip / Postal Code</label>
                  <input type="text" />
              </div>
            </div>
       </Fieldset>
        {/*END OF ADDRESS PART */}
        <div className="flex gap-2 mt-7">
          <input type="checkbox" onChange={handleAccepted} checked={termsAccepted} />
          <p className="-mt-1">
            I hereby acknowledge that by using this website, I agree to 
            abide by and comply with all the terms and conditions set forth in the terms 
            of service, privacy policy, and any other applicable agreements or guidelines.
          </p>
        </div>
        <button disabled={!termsAccepted} className={`${termsAccepted ? "cursor-pointer hover:opacity-85": "cursor-not-allowed"} bg-teal-900 py-2.5 rounded font-bold text-white w-full mt-10`}>Submit</button>
      </form>
     </div>
     <div className="col-span-2"></div>
    </HeroWrapper>
  )
}

export default Signup
