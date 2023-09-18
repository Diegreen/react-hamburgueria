import { useState } from "react";
import Logo from "../../assets/Logo.svg";
import { MdSearch, MdShoppingCart } from "react-icons/md";

export const Header = ({ openModal, setSearchTerm, cartItemCount }) => {
   const [value, setValue] = useState("");
 
   const handleSearch = (e) => {
     e.preventDefault();
     setSearchTerm(value);
   };
 
   return (
     <header className="headerSection">
       <img src={Logo} alt="Logo Kenzie Burguer" />
       <div>
         <button onClick={openModal} className="buttonCart">
           <MdShoppingCart size={21} />
           <span>{cartItemCount}</span>
         </button>
         <form onSubmit={handleSearch}>
           <input
             type="text"
             value={value}
             placeholder="Search Food..."
             onChange={(e) => setValue(e.target.value)}
           />
           <button type="submit">
             <MdSearch size={21} />
           </button>
         </form>
       </div>
     </header>
   );
 };