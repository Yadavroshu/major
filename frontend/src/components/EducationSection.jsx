// import { School, X } from "lucide-react";
// import { useState } from "react";

// const EducationSection = ({ userData, isOwnProfile, onSave }) => {
// 	const [isEditing, setIsEditing] = useState(false);
// 	const [educations, setEducations] = useState(userData.education || []);
// 	const [newEducation, setNewEducation] = useState({
// 		school: "",
// 		fieldOfStudy: "",
// 		startYear: "",
// 		endYear: "",
// 	});

// 	const handleAddEducation = () => {
// 		if (newEducation.school && newEducation.fieldOfStudy && newEducation.startYear) {
// 			setEducations([...educations, newEducation]);
// 			setNewEducation({
// 				school: "",
// 				fieldOfStudy: "",
// 				startYear: "",
// 				endYear: "",
// 			});
// 		}
// 	};

// 	const handleDeleteEducation = (id) => {
// 		setEducations(educations.filter((edu) => edu._id !== id));
// 	};

// 	const handleSave = () => {
// 		onSave({ education: educations });
// 		setIsEditing(false);
// 	};

// 	return (
// 		<div className='bg-white shadow rounded-lg p-6 mb-6'>
// 			<h2 className='text-xl font-semibold mb-4'>Education</h2>
// 			{educations.map((edu) => (
// 				<div key={edu._id} className='mb-4 flex justify-between items-start'>
// 					<div className='flex items-start'>
// 						<School size={20} className='mr-2 mt-1' />
// 						<div>
// 							<h3 className='font-semibold'>{edu.fieldOfStudy}</h3>
// 							<p className='text-gray-600'>{edu.school}</p>
// 							<p className='text-gray-500 text-sm'>
// 								{edu.startYear} - {edu.endYear || "Present"}
// 							</p>
// 						</div>
// 					</div>
// 					{isEditing && (
// 						<button onClick={() => handleDeleteEducation(edu._id)} className='text-red-500'>
// 							<X size={20} />
// 						</button>
// 					)}
// 				</div>
// 			))}
// 			{isEditing && (
// 				<div className='mt-4'>
// 					<input
// 						type='text'
// 						placeholder='School'
// 						value={newEducation.school}
// 						onChange={(e) => setNewEducation({ ...newEducation, school: e.target.value })}
// 						className='w-full p-2 border rounded mb-2'
// 					/>
// 					<input
// 						type='text'
// 						placeholder='Field of Study'
// 						value={newEducation.fieldOfStudy}
// 						onChange={(e) => setNewEducation({ ...newEducation, fieldOfStudy: e.target.value })}
// 						className='w-full p-2 border rounded mb-2'
// 					/>
// 					<input
// 						type='number'
// 						placeholder='Start Year'
// 						value={newEducation.startYear}
// 						onChange={(e) => setNewEducation({ ...newEducation, startYear: e.target.value })}
// 						className='w-full p-2 border rounded mb-2'
// 					/>
// 					<input
// 						type='number'
// 						placeholder='End Year'
// 						value={newEducation.endYear}
// 						onChange={(e) => setNewEducation({ ...newEducation, endYear: e.target.value })}
// 						className='w-full p-2 border rounded mb-2'
// 					/>
// 					<button
// 						onClick={handleAddEducation}
// 						className='bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition duration-300'
// 					>
// 						Add Education
// 					</button>
// 				</div>
// 			)}

// 			{isOwnProfile && (
// 				<>
// 					{isEditing ? (
// 						<button
// 							onClick={handleSave}
// 							className='mt-4 bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark
// 							 transition duration-300'
// 						>
// 							Save Changes
// 						</button>
// 					) : (
// 						<button
// 							onClick={() => setIsEditing(true)}
// 							className='mt-4 text-primary hover:text-primary-dark transition duration-300'
// 						>
// 							Edit Education
// 						</button>
// 					)}
// 				</>
// 			)}
// 		</div>
// 	);
// };
// export default EducationSection;

import { School, X } from "lucide-react";
import { useState } from "react";

const EducationSection = ({ userData, isOwnProfile, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [educations, setEducations] = useState(userData.education || []);
  const [newEducation, setNewEducation] = useState({
    school: "",
    degree: "",
    fieldOfStudy: "",
    startYear: "",
    endYear: "",
    currentlyStudying: false,
  });

  const handleAddEducation = () => {
    if (newEducation.school && newEducation.fieldOfStudy && newEducation.startYear) {
      setEducations([
        ...educations,
        {
          ...newEducation,
          _id: Date.now().toString(),
        },
      ]);
      setNewEducation({
        school: "",
        degree: "",
        fieldOfStudy: "",
        startYear: "",
        endYear: "",
        currentlyStudying: false,
      });
    }
  };

  const handleDeleteEducation = (id) => {
    setEducations(educations.filter((edu) => edu._id !== id));
  };

  const handleSave = () => {
    onSave({ education: educations });
    setIsEditing(false);
  };

  const handleCurrentlyStudyingChange = (e) => {
    setNewEducation({
      ...newEducation,
      currentlyStudying: e.target.checked,
      endYear: e.target.checked ? "" : newEducation.endYear,
    });
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-full">
            <School className="text-blue-600" size={20} />
          </div>
          Education
        </h2>
        {isOwnProfile && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Edit
          </button>
        )}
      </div>

      <div className="space-y-6">
        {educations.length > 0 ? (
          educations.map((edu) => (
            <div
              key={edu._id}
              className="p-6 rounded-xl border border-gray-200 hover:shadow-sm transition-all relative"
            >
              <div className="flex gap-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <School className="text-blue-600" size={18} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    {edu.fieldOfStudy}
                  </h3>
                  <p className="text-gray-700 font-medium">{edu.school}</p>
                  {edu.degree && (
                    <p className="text-gray-600 text-sm mt-1">{edu.degree}</p>
                  )}
                  <p className="text-gray-500 text-sm mt-2">
                    {edu.startYear} -{" "}
                    {edu.currentlyStudying || !edu.endYear
                      ? "Present"
                      : edu.endYear}
                  </p>
                </div>
              </div>
              {isEditing && (
                <button
                  onClick={() => handleDeleteEducation(edu._id)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500 rounded-xl border-2 border-dashed border-gray-200">
            {isEditing
              ? "Add your education history"
              : "No education information available"}
          </div>
        )}
      </div>

      {isEditing && (
        <div className="mt-8 space-y-5">
          <h3 className="text-lg font-semibold text-gray-800">
            Add Education
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                School/University*
              </label>
              <input
                type="text"
                placeholder="e.g. Stanford University"
                value={newEducation.school}
                onChange={(e) =>
                  setNewEducation({ ...newEducation, school: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Degree
              </label>
              <input
                type="text"
                placeholder="e.g. Bachelor's"
                value={newEducation.degree}
                onChange={(e) =>
                  setNewEducation({ ...newEducation, degree: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Field of Study*
            </label>
            <input
              type="text"
              placeholder="e.g. Computer Science"
              value={newEducation.fieldOfStudy}
              onChange={(e) =>
                setNewEducation({ ...newEducation, fieldOfStudy: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Year*
              </label>
              <input
                type="number"
                placeholder="e.g. 2018"
                min="1900"
                max={new Date().getFullYear()}
                value={newEducation.startYear}
                onChange={(e) =>
                  setNewEducation({ ...newEducation, startYear: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {newEducation.currentlyStudying
                  ? "Currently studying here"
                  : "End Year"}
              </label>
              {!newEducation.currentlyStudying && (
                <input
                  type="number"
                  placeholder="e.g. 2022"
                  min="1900"
                  max={new Date().getFullYear() + 10}
                  value={newEducation.endYear}
                  onChange={(e) =>
                    setNewEducation({ ...newEducation, endYear: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              )}
              <div className="flex items-center mt-3">
                <input
                  type="checkbox"
                  id="currentlyStudying"
                  checked={newEducation.currentlyStudying}
                  onChange={handleCurrentlyStudyingChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="currentlyStudying"
                  className="ml-2 text-sm text-gray-700"
                >
                  I currently study here
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => {
                setIsEditing(false);
                setEducations(userData.education || []);
              }}
              className="px-5 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddEducation}
              disabled={
                !newEducation.school ||
                !newEducation.fieldOfStudy ||
                !newEducation.startYear
              }
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 rounded-lg font-medium text-white transition-colors"
            >
              Add Education
            </button>
          </div>
        </div>
      )}

      {isEditing && educations.length > 0 && (
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

export default EducationSection;