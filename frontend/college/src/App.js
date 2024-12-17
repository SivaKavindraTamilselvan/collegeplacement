import { Routes, Route } from "react-router-dom";
import { Sign } from "./pages/sign/signup";
import { Log } from "./pages/Login/login";
import { List } from "./pages/company/list";
import { Profile } from "./pages/profile/profilee";
import { Apply } from "./pages/appliedjobs/applied";
import { Addcompany } from "./main/add";
import { Home } from "./pages/Home/home";
import { OwnerHome } from "./companies/Home/ownerhome";
import { CompanyListJob } from "./companies/status/sta";
import { UserDetails } from "./companies/application/userdetails";
import { ApplyInterviewOwner } from "./companies/application/inter";
import { ApplyScheduled } from "./companies/application/sched";
import { ApplyJob } from "./companies/application/appl";
import { Hist } from "./companies/History/hi";
import { Inter } from "./pages/interview/inter";
import { ForgotPassword } from "./pages/Login/forget";
import { ApplyOffer } from "./companies/application/offered";
import { ResetPassword } from "./pages/Login/reset";
import { PlacementHome } from "./placementofficer/home/placementhome";
import { PList } from "./placementofficer/company/list";
import { PlacementApplicationList } from "./placementofficer/jobs";
import { ComList } from "./placementofficer/companylist";
function App() {
  return (
    <Routes>

      <Route path='/' element={<Log />} />
      <Route path='/sign' element={<Sign />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/add' element={<Addcompany />} />
      <Route path='/forgot' element={<ForgotPassword />} />
      <Route path='/reset-password' element={<ResetPassword />} />



      <Route path='/user/home' element={<Home />} />
      <Route path='/user/jobs' element={<List />} />
      <Route path='/user/jobs/applied' element={<Apply />} />
      <Route path='/user/jobs/interview' element={<Inter />} />

      <Route path='/user/:userId' element={<UserDetails/>} />

      <Route path='/company/home' element={<OwnerHome />} />
      <Route path='/company/jobs/list' element={<CompanyListJob/>} />
      <Route path='/company/jobs/applied' element={<ApplyJob/>} />
      <Route path='/company/jobs/interview' element={<ApplyInterviewOwner/>} />
      <Route path='/company/jobs/schedule' element={<ApplyScheduled/>} />
      <Route path='/company/jobs/history' element={<Hist/>} />
      <Route path='/company/jobs/offer' element={<ApplyOffer />} />

      <Route path='/placement/home' element={<PlacementHome/>} />
      <Route path='/placement/jobs/list' element={<PList/>} />
      <Route path='/placement/jobs/appliedlist' element={<PlacementApplicationList/>} />
      <Route path='/placement/jobs/companylist' element={<ComList/>} />



    </Routes>
  );
}

export default App;
