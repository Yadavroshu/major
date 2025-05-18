// import { X } from "lucide-react";
// import { useState } from "react";

// const ResumeSection = ({ userData, isOwnProfile, onSave }) => {
//     const [isEditing, setIsEditing] = useState(false);
//     const [resumes, setResumes] = useState(userData.resumes || []);
//     const [newResume, setNewResume] = useState(null);

//     const handleAddResume = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             const fileURL = URL.createObjectURL(file);
//             setResumes([...resumes, { name: file.name, url: fileURL }]);
//         }
//     };

//     const handleDeleteResume = (resume) => {
//         setResumes(resumes.filter((r) => r.url !== resume.url));
//     };

//     const handleSave = () => {
//         onSave({ resumes });
//         setIsEditing(false);
//     };

//     return (
//         <div className='bg-white shadow rounded-lg p-6'>
//             <h2 className='text-xl font-semibold mb-4'>Resume</h2>
//             <div className='flex flex-wrap'>
//                 {resumes.map((resume, index) => (
//                     <div key={index} className='bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm mr-2 mb-2 flex items-center'>
//                         <a href={resume.url} target='_blank' rel='noopener noreferrer' className='underline'>{resume.name}</a>
//                         {isEditing && (
//                             <button onClick={() => handleDeleteResume(resume)} className='ml-2 text-red-500'>
//                                 <X size={14} />
//                             </button>
//                         )}
//                     </div>
//                 ))}
//             </div>

//             {isEditing && (
//                 <div className='mt-4 flex items-center'>
//                     <input
//                         type='file'
//                         accept='.pdf,.doc,.docx'
//                         onChange={handleAddResume}
//                         className='p-2 border rounded'
//                     />
//                 </div>
//             )}

//             {isOwnProfile && (
//                 <>
//                     {isEditing ? (
//                         <button
//                             onClick={handleSave}
//                             className='mt-4 bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition duration-300'
//                         >
//                             Save Changes
//                         </button>
//                     ) : (
//                         <button
//                             onClick={() => setIsEditing(true)}
//                             className='mt-4 text-primary hover:text-primary-dark transition duration-300'
//                         >
//                             Edit Resume
//                         </button>
//                     )}
//                 </>
//             )}
//         </div>
//     );
// };

// export default ResumeSection;

import { X } from "lucide-react";
import { useState } from "react";

const ResumeSection = ({ userData, isOwnProfile, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [resumes, setResumes] = useState(userData.resumes || []);
    const [newResume, setNewResume] = useState(null);

    const handleAddResume = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            setResumes([...resumes, { name: file.name, url: fileURL }]);
        }
    };

    const handleDeleteResume = (resume) => {
        setResumes(resumes.filter((r) => r.url !== resume.url));
    };

    const handleSave = () => {
        onSave({ resumes });
        setIsEditing(false);
    };

    return (
        <div className="bg-white shadow-lg rounded-xl p-6 mt-5">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">Resume</h2>
                {isOwnProfile && !isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
                    >
                        Edit Resume
                    </button>
                )}
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
                {resumes.map((resume, index) => (
                    <div 
                        key={index} 
                        className="flex items-center bg-gray-100 text-gray-800 px-3 py-2 rounded-lg text-sm font-medium transition-all hover:bg-gray-200"
                    >
                        <a 
                            href={resume.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-600 hover:underline"
                        >
                            {resume.name}
                        </a>
                        {isEditing && (
                            <button 
                                onClick={() => handleDeleteResume(resume)} 
                                className="ml-2 text-gray-500 hover:text-red-500 transition-colors"
                            >
                                <X size={14} />
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {isEditing && (
                <>
                    <div className="mt-4">
                        <label className="flex flex-col items-center px-4 py-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-100 transition-colors">
                            <svg 
                                className="w-8 h-8 mb-2 text-gray-500" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24" 
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
                                />
                            </svg>
                            <span className="text-sm text-gray-600 mb-1">Click to upload or drag and drop</span>
                            <span className="text-xs text-gray-500">PDF, DOC, DOCX (Max 5MB)</span>
                            <input 
                                type="file" 
                                accept=".pdf,.doc,.docx" 
                                onChange={handleAddResume} 
                                className="hidden" 
                            />
                        </label>
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            onClick={() => {
                                setIsEditing(false);
                                setResumes(userData.resumes || []);
                            }}
                            className="px-4 py-2 font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 font-medium text-white rounded-lg transition-colors"
                        >
                            Save Changes
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default ResumeSection;