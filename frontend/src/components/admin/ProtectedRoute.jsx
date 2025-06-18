import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();


  useEffect(() => {
    if (!user || user.role !== "recruiter") {
      navigate("/");
    }
  }, [user, navigate]);

 
  if (!user || user.role !== "recruiter") return null;

 
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf8ff] via-[#f2ecff] to-[#ebe3ff] flex flex-col">
      {children}
    </div>
  );
};

export default ProtectedRoute;
