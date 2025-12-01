import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Activities from "./pages/Activities";
import Materials from "./pages/Materials";
import About from "./pages/About";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Account from "./pages/Account"
import DeleteAccount from "./pages/DeleteAccount";
import ProtectedRoute from "./components/ProtectedRoute";
import GradeActivities from "./pages/GradeActivities";
import Grade1ColorsActivity from "./pages/Grade1ColorActivity";
import Grade2SportsActivity from "./pages/Grade2SportActivity";
import Grade3CapitalLettersActivity from "./pages/Grade3CapitalLetterActivity";
import Grade4SmallLettersActivity from "./pages/Grade4SmallLetterActivity"
import Grade5GreetingActivity from "./pages/Grade5GreetingActivity";
import Grade6GreetingQuestionsActivity from "./pages/Grade6GreetingQuestionsAvtivity";
import Grade7VerbToBeActivity from "./pages/Grade7VerbToBeActivity"
import Grade8FutureTenseActivity from "./pages/Grade8FutureTenseActivity"
import Grade9PresentPerfectActivity from "./pages/Grade9PresentPerfectActivity";
import ContactUs from "./pages/ContactUs";



const Main = styled.main`
min-height: 70vh;
`;


export default function App() {
return (
<>
<Header />
<Main>
<Routes>
<Route path="/" element={<Home />} />
<Route path="/activities" element={<Activities />} />
<Route path="/materials" element={<Materials />} />
<Route path="/about" element={<About />} />
<Route path="/contact-us" element={<ContactUs/>}/>
<Route path="/signup" element={<Signup />} />
<Route path="/signin" element={<Signin />} />
<Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>}/>
<Route path="delete-account" element={<DeleteAccount/>}/>
<Route path="/activities/grade/:gradeId" element={<GradeActivities />} />
<Route path="/activities/grade/1/colors" element={<Grade1ColorsActivity />} />
<Route path="/activities/grade/2/sports" element={<Grade2SportsActivity />} />
<Route path="/activities/grade/3/capital-letters" element={<Grade3CapitalLettersActivity />} />
<Route path="/activities/grade/4/small-letters" element={<Grade4SmallLettersActivity />} />
<Route path="/activities/grade/5/greeting-conversation" element={<Grade5GreetingActivity />} />
<Route path="/activities/grade/6/greeting-questions" element={<Grade6GreetingQuestionsActivity />} />
<Route path="/activities/grade/7/verb-to-be" element={<Grade7VerbToBeActivity />} />
<Route path="/activities/grade/8/future-tense" element={<Grade8FutureTenseActivity />} />
<Route path="/activities/grade/9/present-perfect" element={<Grade9PresentPerfectActivity />} />








</Routes>
</Main>
<Footer />
</>
);
}