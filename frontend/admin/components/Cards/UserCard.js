import React, { useState, useEffect } from 'react'
import { AiOutlineCamera } from 'react-icons/ai'
import { updateProfilePicture } from '@/redux/actions/authAction'
import { useDispatch } from 'react-redux'

const UserCard = ({ user }) => {
  
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    let formData = new FormData();
    formData.append("file", selectedFile)

    dispatch(updateProfilePicture(formData));
  }, [selectedFile]);

  return(
      <div className="mobile:bg-white py-3">
        <div className="flex px-6 mobile:px-3 mt-8">
            <div className="my-auto">
              <div className="h-28 w-28 md rounded-full bg-cover bg-center relative border-2 border-lightBlack" style={{background: `url('${user.avatar}')`}}>
                <div className="absolute right-0 bottom-0 rounded-full bg-blue-400 p-2">
                  <label className="cursor-pointer ">
                    <span className=""><AiOutlineCamera className="h-5 w-5 text-white"/></span>
                    <input 
                          type="file" 
                          className="hidden" 
                          onChange={(e) => setSelectedFile(e.target.files[0])} 
                    />
                </label>
              </div>
              </div>
            </div>
            <div className="my-auto pl-5">
              <h2 className="text-lg font-bold text-Black capitalize">{user.name}</h2>
              <h3 className="text text-Black">Plumber</h3>
            </div>
        </div>
      </div>
  )
}

export default UserCard