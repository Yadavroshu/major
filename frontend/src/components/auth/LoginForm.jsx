// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useState } from "react";
// import { axiosInstance } from "../../lib/axios";
// import toast from "react-hot-toast";
// import { Loader } from "lucide-react";

// const LoginForm = () => {
// 	const [username, setUsername] = useState("");
// 	const [password, setPassword] = useState("");
// 	const queryClient = useQueryClient();

// 	const { mutate: loginMutation, isLoading } = useMutation({
// 		mutationFn: (userData) => axiosInstance.post("/auth/login", userData),
// 		onSuccess: () => {
// 			queryClient.invalidateQueries({ queryKey: ["authUser"] });
// 		},
// 		onError: (err) => {
// 			toast.error(err.response.data.message || "Something went wrong");
// 		},
// 	});

// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		loginMutation({ username, password });
// 	};

// 	return (
// 		<form onSubmit={handleSubmit} className=' space-y-4 w-full max-w-md'>
// 			<input
// 				type='text'
// 				placeholder='Username'
// 				value={username}
// 				onChange={(e) => setUsername(e.target.value)}
// 				className='input  border border-black w-full'
// 				required
// 			/>
// 			<input
// 				type='password'
// 				placeholder='Password'
// 				value={password}
// 				onChange={(e) => setPassword(e.target.value)}
// 				className='input  border border-black w-full'
// 				required
// 			/>

// 			<button type='submit' className='btn btn-primary w-full'>
// 				{isLoading ? <Loader className='size-5 animate-spin' /> : "Login"}
// 			</button>
// 		</form>
// 	);
// };
// export default LoginForm;





import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const queryClient = useQueryClient();

  const { mutate: loginMutation, isLoading } = useMutation({
    mutationFn: (userData) => axiosInstance.post("/auth/login", userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (err) => {
      toast.error(err.response.data.message || "Something went wrong");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation({ username, password });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 w-full max-w-md bg-white p-8 rounded-lg shadow-lg"
    >
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          required
        />
      </div>

      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {isLoading ? (
          <Loader className="size-5 animate-spin mx-auto text-white" />
        ) : (
          "Login"
        )}
      </button>
    </form>
  );
};

export default LoginForm;
