import { IoSearchSharp } from "react-icons/io5";
import { useConvoContext } from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";
import { useState } from "react";
const SearchInput = () => {
	const [search,setSearch] = useState("");
	const {setSelectedConversation} = useConvoContext();
	const {conversations} = useGetConversations();
	const handleSubmit = (e) =>{
		e.preventDefault();
		if(!search) return;
		console.log("yes");
		if(search.length<3){
			toast.error("Search term must be atleast 3 characters")
			return ;
		}
		const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));

		if (conversation) {
			console.log(conversation);
			setSelectedConversation(conversation);
			setSearch("");
		} else toast.error("No such user found!");
	}
	return (
		<form onSubmit = {handleSubmit}className='flex items-center gap-2'>
			<input type='text' placeholder='Search…' className='input input-bordered rounded-full' value={search} onChange={(e)=>setSearch(e.target.value)}/>
			<button type='submit' className='btn btn-circle bg-sky-500 text-white'>
				<IoSearchSharp className="w-6 h-6 outline-none"/>
			</button>
		</form>
	);
};

export default SearchInput;