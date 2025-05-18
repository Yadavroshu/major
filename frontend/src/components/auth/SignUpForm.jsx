// import { useState } from "react";
//  import { useMutation , useQueryClient} from "@tanstack/react-query";
// import { axiosInstance } from "../../lib/axios.js";
// import { toast } from "react-hot-toast";
// import { Loader } from "lucide-react";

// const SignUpForm = () => {
// 	const [name, setName] = useState("");
// 	const [email, setEmail] = useState("");
// 	const [username, setUsername] = useState("");
// 	const [password, setPassword] = useState("");

// 	const queryClient = useQueryClient();

// 	 const { mutate:signUpMutation, isLoading} = useMutation({
// 		mutationFn: async (data) => {
// 			const res = await axiosInstance.post("/auth/signup", data);
// 			return res.data;
// 		},
// 		onSuccess: () => {
// 			toast.success("Account created successfully");
// 			queryClient.invalidateQueries({ queryKey: ["authUser"] });
// 		},
// 		onError: (err) => {
// 			toast.error(err.response.data.message || "Something went wrong");
// 		},
// 	});

// 	const handleSignUp = (e) => {
// 		e.preventDefault();
// 		signUpMutation({ name, username, email, password });
       
// 	};

// 	return (
// 		<form onSubmit={handleSignUp} className='text-black flex flex-col gap-4'>
// 			<input 
// 				type='text'
// 				placeholder='Full name '
// 				value={name}
// 				onChange={(e) => setName(e.target.value)}
// 				className='input  border-black w-full'
// 				required
// 			/>
// 			<input
// 				type='text'
// 				placeholder='Username'
// 				value={username}
// 				onChange={(e) => setUsername(e.target.value)}
// 				className='input border border-black w-full'
// 				required
// 			/>
// 			<input
// 				type='email'
// 				placeholder='Email'
// 				value={email}
// 				onChange={(e) => setEmail(e.target.value)}
// 				className='input border border-black w-full'
// 				required
// 			/>
// 			<input
// 				type='password'
// 				placeholder='Password (6+ characters)'
// 				value={password}
// 				onChange={(e) => setPassword(e.target.value)}
// 				className='input border border-black w-full'
// 				required
// 			/>

// 			<button type='submit' disabled={isLoading} className='btn btn-primary w-full text-white'>
// 				{isLoading ? <Loader className='size-5 animate-spin' /> : "Agree & Join"}
// 			</button>
            
// 		</form>
// 	);
// };
// export default SignUpForm;

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios.js";
import { toast } from "react-hot-toast";
import { Loader } from "lucide-react";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const queryClient = useQueryClient();

  const { mutate: signUpMutation, isLoading } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.post("/auth/signup", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Account created successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (err) => {
      toast.error(err.response.data.message || "Something went wrong");
    },
  });

  const handleSignUp = (e) => {
    e.preventDefault();
    signUpMutation({ name, username, email, password });
  };

  return (
    <form
      onSubmit={handleSignUp}
      className="space-y-4 text-black flex flex-col bg-gray-100 p-6 rounded-lg shadow-lg"
    >
      <div className="flex flex-col gap-2 ">
        <label htmlFor="name" className="text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="username" className="text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          type="text"
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-sm font-medium text-gray-700">
          Password (6+ characters)
        </label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      >
        {isLoading ? <Loader className="animate-spin" /> : "Agree & Join"}
      </button>
    </form>
  );
};

export default SignUpForm;
