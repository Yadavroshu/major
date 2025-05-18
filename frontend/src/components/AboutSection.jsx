// import { useState } from "react";

// const AboutSection = ({ userData, isOwnProfile, onSave }) => {
// 	const [isEditing, setIsEditing] = useState(false);
// 	const [about, setAbout] = useState(userData.about || "");

// 	const handleSave = () => {
// 		setIsEditing(false);
// 		onSave({ about });
// 	};
// 	return (
// 		<div className='bg-white shadow rounded-lg p-6 mb-6'>
// 			<h2 className='text-xl font-semibold mb-4'>About</h2>
// 			{isOwnProfile && (
// 				<>
// 					{isEditing ? (
// 						<>
// 							<textarea
// 								value={about}
// 								onChange={(e) => setAbout(e.target.value)}
// 								className='w-full p-2 border rounded'
// 								rows='4'
// 							/>
// 							<button
// 								onClick={handleSave}
// 								className='mt-2 bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark 
// 								transition duration-300'
// 							>
// 								Save
// 							</button>
// 						</>
// 					) : (
// 						<>
// 							<p>{userData.about}</p>
// 							<button
// 								onClick={() => setIsEditing(true)}
// 								className='mt-2 text-primary hover:text-primary-dark transition duration-300'
// 							>
// 								Edit
// 							</button>
// 						</>
// 					)}
// 				</>
// 			)}
// 		</div>
// 	);
// };
// export default AboutSection;



import { useState } from "react";
import { Edit2, Check } from "lucide-react";

const AboutSection = ({ userData, isOwnProfile, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [about, setAbout] = useState(userData.about || "");
  const [characterCount, setCharacterCount] = useState(about.length);

  const handleSave = () => {
    setIsEditing(false);
    onSave({ about });
  };

  const handleTextChange = (e) => {
    setAbout(e.target.value);
    setCharacterCount(e.target.value.length);
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">About Me</h2>
        {isOwnProfile && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 transition-colors"
          >
            <Edit2 size={18} />
            Edit
          </button>
        )}
      </div>

      {isOwnProfile ? (
        <>
          {isEditing ? (
            <div className="space-y-4">
              <div className="relative">
                <textarea
                  value={about}
                  onChange={handleTextChange}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={6}
                  placeholder="Tell us about yourself, your skills, and experiences..."
                  maxLength={500}
                />
                <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                  {characterCount}/500
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setAbout(userData.about || "");
                  }}
                  className="px-5 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium text-white flex items-center gap-2 transition-colors"
                >
                  <Check size={18} />
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <p className="text-gray-700 whitespace-pre-line">
                {userData.about || (
                  <span className="text-gray-400 italic">
                    No about information added yet. Share something about yourself!
                  </span>
                )}
              </p>
            </div>
          )}
        </>
      ) : (
        <p className="text-gray-700 whitespace-pre-line">
          {userData.about || (
            <span className="text-gray-400 italic">
              No about information available.
            </span>
          )}
        </p>
      )}
    </div>
  );
};

export default AboutSection;