import "../scss/Search.scss"
import * as IO from "react-icons/io";
export default function SearchBar({ onChange } : { onChange: React.ChangeEventHandler<HTMLInputElement> }) {
  return (
    <div className="search-container">
        <input className="search-input" type="text" placeholder="Search.." onChange={onChange}/>
        <IO.IoMdSearch className="search-icon"/>
    </div>
  )
}
