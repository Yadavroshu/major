// import { X } from "lucide-react";
// import { useState } from "react";

// const SkillsSection = ({ userData, isOwnProfile, onSave }) => {
// 	const [isEditing, setIsEditing] = useState(false);
// 	const [skills, setSkills] = useState(userData.skills || []);
// 	const [newSkill, setNewSkill] = useState("");

// 	const handleAddSkill = () => {
// 		if (newSkill && !skills.includes(newSkill)) {
// 			setSkills([...skills, newSkill]);
// 			setNewSkill("");
// 		}
// 	};

// 	const handleDeleteSkill = (skill) => {
// 		setSkills(skills.filter((s) => s !== skill));
// 	};

// 	const handleSave = () => {
// 		onSave({ skills });
// 		setIsEditing(false);
// 	};

// 	return (
// 		<div className='bg-white shadow rounded-lg p-6'>
// 			<h2 className='text-xl font-semibold mb-4'>Skills</h2>
// 			<div className='flex flex-wrap'>
// 				{skills.map((skill, index) => (
// 					<span
// 						key={index}
// 						className='bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm mr-2 mb-2 flex items-center'
// 					>
// 						{skill}
// 						{isEditing && (
// 							<button onClick={() => handleDeleteSkill(skill)} className='ml-2 text-red-500'>
// 								<X size={14} />
// 							</button>
// 						)}
// 					</span>
// 				))}
// 			</div>

// 			{isEditing && (
// 				<div className='mt-4 flex'>
// 					<input
// 						type='text'
// 						placeholder='New Skill'
// 						value={newSkill}
// 						onChange={(e) => setNewSkill(e.target.value)}
// 						className='flex-grow p-2 border rounded-l'
// 					/>
// 					<button
// 						onClick={handleAddSkill}
// 						className='bg-primary text-white py-2 px-4 rounded-r hover:bg-primary-dark transition duration-300'
// 					>
// 						Add Skill
// 					</button>
// 				</div>
// 			)}

// 			{isOwnProfile && (
// 				<>
// 					{isEditing ? (
// 						<button
// 							onClick={handleSave}
// 							className='mt-4 bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition duration-300'
// 						>
// 							Save Changes
// 						</button>
// 					) : (
// 						<button
// 							onClick={() => setIsEditing(true)}
// 							className='mt-4 text-primary hover:text-primary-dark transition duration-300'
// 						>
// 							Edit Skills
// 						</button>
// 					)}
// 				</>
// 			)}
// 		</div>
// 	);
// };
// export default SkillsSection;




import { X } from "lucide-react";
import { useState } from "react";

const SkillsSection = ({ userData, isOwnProfile, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [skills, setSkills] = useState(userData.skills || []);
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAddSkill();
  };

  const handleDeleteSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleSave = () => {
    onSave({ skills });
    setIsEditing(false);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">Skills</h2>
        {isOwnProfile && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
          >
            Edit
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="inline-flex items-center bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium"
          >
            {skill}
            {isEditing && (
              <button
                onClick={() => handleDeleteSkill(skill)}
                className="ml-1.5 text-gray-500 hover:text-red-500 transition-colors"
              >
                <X size={14} />
              </button>
            )}
          </span>
        ))}
      </div>

      {isEditing && (
        <>
          <div className="flex gap-2 mt-4">
            <input
              type="text"
              placeholder="Add new skill..."
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-grow p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              autoFocus
            />
            <button
              onClick={handleAddSkill}
              disabled={!newSkill.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              Add
            </button>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => {
                setIsEditing(false);
                setSkills(userData.skills || []);
              }}
              className="px-4 py-2 font-bold text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 font-bold text-white rounded-lg transition-colors"
            >
              Save Changes
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SkillsSection;
