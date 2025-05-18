// import { Briefcase, X } from "lucide-react";
// import { useState } from "react";
// import { formatDate } from "../utils/dateUtils";

// const ExperienceSection = ({ userData, isOwnProfile, onSave }) => {
// 	const [isEditing, setIsEditing] = useState(false);
// 	const [experiences, setExperiences] = useState(userData.experience || []);
// 	const [newExperience, setNewExperience] = useState({
// 		title: "",
// 		company: "",
// 		startDate: "",
// 		endDate: "",
// 		description: "",
// 		currentlyWorking: false,
// 	});

// 	const handleAddExperience = () => {
// 		if (newExperience.title && newExperience.company && newExperience.startDate) {
// 			setExperiences([...experiences, newExperience]);

// 			setNewExperience({
// 				title: "",
// 				company: "",
// 				startDate: "",
// 				endDate: "",
// 				description: "",
// 				currentlyWorking: false,
// 			});
// 		}
// 	};

// 	const handleDeleteExperience = (id) => {
// 		setExperiences(experiences.filter((exp) => exp._id !== id));
// 	};

// 	const handleSave = () => {
// 		onSave({ experience: experiences });
// 		setIsEditing(false);
// 	};

// 	const handleCurrentlyWorkingChange = (e) => {
// 		setNewExperience({
// 			...newExperience,
// 			currentlyWorking: e.target.checked,
// 			endDate: e.target.checked ? "" : newExperience.endDate,
// 		});
// 	};

// 	return (
// 		<div className='bg-white shadow rounded-lg p-6 mb-6'>
// 			<h2 className='text-xl font-semibold mb-4'>Experience</h2>
// 			{experiences.map((exp) => (
// 				<div key={exp._id} className='mb-4 flex justify-between items-start'>
// 					<div className='flex items-start'>
// 						<Briefcase size={20} className='mr-2 mt-1' />
// 						<div>
// 							<h3 className='font-semibold'>{exp.title}</h3>
// 							<p className='text-gray-600'>{exp.company}</p>
// 							<p className='text-gray-500 text-sm'>
// 								{formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : "Present"}
// 							</p>
// 							<p className='text-gray-700'>{exp.description}</p>
// 						</div>
// 					</div>
// 					{isEditing && (
// 						<button onClick={() => handleDeleteExperience(exp._id)} className='text-red-500'>
// 							<X size={20} />
// 						</button>
// 					)}
// 				</div>
// 			))}

// 			{isEditing && (
// 				<div className='mt-4'>
// 					<input
// 						type='text'
// 						placeholder='Title'
// 						value={newExperience.title}
// 						onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
// 						className='w-full p-2 border rounded mb-2'
// 					/>
// 					<input
// 						type='text'
// 						placeholder='Company'
// 						value={newExperience.company}
// 						onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
// 						className='w-full p-2 border rounded mb-2'
// 					/>
// 					<input
// 						type='date'
// 						placeholder='Start Date'
// 						value={newExperience.startDate}
// 						onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
// 						className='w-full p-2 border rounded mb-2'
// 					/>
// 					<div className='flex items-center mb-2'>
// 						<input
// 							type='checkbox'
// 							id='currentlyWorking'
// 							checked={newExperience.currentlyWorking}
// 							onChange={handleCurrentlyWorkingChange}
// 							className='mr-2'
// 						/>
// 						<label htmlFor='currentlyWorking'>I currently work here</label>
// 					</div>
// 					{!newExperience.currentlyWorking && (
// 						<input
// 							type='date'
// 							placeholder='End Date'
// 							value={newExperience.endDate}
// 							onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
// 							className='w-full p-2 border rounded mb-2'
// 						/>
// 					)}
// 					<textarea
// 						placeholder='Description'
// 						value={newExperience.description}
// 						onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
// 						className='w-full p-2 border rounded mb-2'
// 					/>
// 					<button
// 						onClick={handleAddExperience}
// 						className='bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition duration-300'
// 					>
// 						Add Experience
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
// 							Edit Experiences
// 						</button>
// 					)}
// 				</>
// 			)}
// 		</div>
// 	);
// };
// export default ExperienceSection;




import { Briefcase, X } from "lucide-react";
import { useState } from "react";
import { formatDate } from "../utils/dateUtils";

const ExperienceSection = ({ userData, isOwnProfile, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [experiences, setExperiences] = useState(userData.experience || []);
  const [newExperience, setNewExperience] = useState({
    title: "",
    company: "",
    startDate: "",
    endDate: "",
    description: "",
    currentlyWorking: false,
  });

  const handleAddExperience = () => {
    if (newExperience.title && newExperience.company && newExperience.startDate) {
      setExperiences([...experiences, {
        ...newExperience,
        _id: Date.now().toString() // Temporary ID for new entries
      }]);
      setNewExperience({
        title: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
        currentlyWorking: false,
      });
    }
  };

  const handleDeleteExperience = (id) => {
    setExperiences(experiences.filter((exp) => exp._id !== id));
  };

  const handleSave = () => {
    onSave({ experience: experiences });
    setIsEditing(false);
  };

  const handleCurrentlyWorkingChange = (e) => {
    setNewExperience({
      ...newExperience,
      currentlyWorking: e.target.checked,
      endDate: e.target.checked ? "" : newExperience.endDate,
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-8 mb-10 border border-gray-100 mt-5">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Briefcase size={24} className="text-blue-600" />
          Experience
        </h2>
        {isOwnProfile && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Edit
          </button>
        )}
      </div>

      {/* Existing Experiences */}
      <div className="space-y-6">
        {experiences.length > 0 ? (
          experiences.map((exp) => (
            <div
              key={exp._id}
              className="relative group p-6 rounded-xl border border-gray-200 hover:border-gray-300 transition-all"
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                    <Briefcase size={18} className="text-blue-600" />
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-gray-800">{exp.title}</h3>
                  <p className="text-gray-700 font-medium">{exp.company}</p>
                  <p className="text-gray-500 text-sm mt-1">
                    {formatDate(exp.startDate)} - {exp.currentlyWorking || !exp.endDate ? "Present" : formatDate(exp.endDate)}
                  </p>
                  {exp.description && (
                    <p className="text-gray-600 mt-3 whitespace-pre-line">{exp.description}</p>
                  )}
                </div>
              </div>
              {isEditing && (
                <button
                  onClick={() => handleDeleteExperience(exp._id)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors p-1"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            {isEditing ? "Add your first work experience" : "No experience added yet"}
          </div>
        )}
      </div>

      {/* Add New Experience Form */}
      {isEditing && (
        <div className="mt-8 space-y-5">
          <h3 className="text-lg font-semibold text-gray-800">Add New Experience</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Title*</label>
              <input
                type="text"
                placeholder="e.g. Software Engineer"
                value={newExperience.title}
                onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company*</label>
              <input
                type="text"
                placeholder="e.g. Google"
                value={newExperience.company}
                onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date*</label>
              <input
                type="date"
                value={newExperience.startDate}
                onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {newExperience.currentlyWorking ? "Currently working here" : "End Date"}
              </label>
              {!newExperience.currentlyWorking && (
                <input
                  type="date"
                  value={newExperience.endDate}
                  onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              )}
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id="currentlyWorking"
                  checked={newExperience.currentlyWorking}
                  onChange={handleCurrentlyWorkingChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="currentlyWorking" className="ml-2 block text-sm text-gray-700">
                  I currently work here
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              placeholder="Describe your responsibilities and achievements"
              value={newExperience.description}
              onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={4}
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => {
                setIsEditing(false);
                setExperiences(userData.experience || []);
              }}
              className="px-5 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddExperience}
              disabled={!newExperience.title || !newExperience.company || !newExperience.startDate}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 rounded-lg font-medium text-white transition-colors"
            >
              Add Experience
            </button>
          </div>
        </div>
      )}

      {/* Save Button */}
      {isEditing && experiences.length > 0 && (
        <div className="mt-8 pt-5 border-t border-gray-200">
          <button
            onClick={handleSave}
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
          >
            Save All Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default ExperienceSection;