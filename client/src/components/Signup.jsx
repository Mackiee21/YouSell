import { useState } from "react"
import HeroWrapper from "../JustAWrapper/HeroWrapper"
import HomeNavBar from "./HomeNavBar"

function Signup() {
  const [isAStudent, setIsAStudent] = useState(true);
  const [whoseChecked, setWhoseChecked] = useState("yes");

  const handleIsAStudentChange = (e) => {
    if(e.target.id === "no"){
      setIsAStudent(false);
      setWhoseChecked("no")
      return
    }
   setIsAStudent(true)
   setWhoseChecked("yes")
  }
  return (
    <HeroWrapper>
        <HomeNavBar className="py-2.5 sticky top-0" />
     <div className="row-span-11 col-span-3 flex flex-col items-center gap-5 mt-10">
      <h1 className="logo header-logo">Signup - YouSell</h1>
      <form className="signup-form max-w-[900px] w-[700px] shadow-2xl shadow-teal-900 rounded-lg p-5">
        <div className="flex gap-10 box-border">
          {/* TOP LEFT SIDE OF THE FORM */}
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
            <fieldset className="input-wrapper flex flex-col gap-2 border-[1.5px] border-teal-900 rounded-md p-3">
                <legend className="text-teal-900 font-bold">Are you a UC student?</legend>
                <div className="flex gap-3">
                  <div className="flex gap-1 items-center cursor-pointer">
                    <label htmlFor="yes" className="order-2 text-teal-900 font-semibold">Yes</label>
                    <input onChange={handleIsAStudentChange} id="yes" value="yes" className="order-1 h-4 w-4" type="radio" name="choice" checked={whoseChecked === "yes" ? true : false} />
                  </div>
                  <div className="flex gap-1 items-center">
                    <label htmlFor="no" className="order-2 text-teal-900 font-semibold">No</label>
                    <input onChange={handleIsAStudentChange} id="no" value="no" className="order-1 h-4 w-4" type="radio" name="choice" checked={whoseChecked !== "yes" ? true : false} />
                  </div>
                </div>
            </fieldset>
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
        <button className="bg-teal-900 hover:opacity-85 py-2.5 rounded font-bold text-white w-full mt-7">Submit</button>
      </form>
     </div>
     <div className="col-span-2"></div>
    </HeroWrapper>
  )
}

export default Signup
