import React from 'react'
import Card from './Card'

const UserCard = ({title, user, seen, image, role, email, description}) => {
  return(
        <div className="mt-20">
        <div className="flex items-center justify-center mb-10">
          <Card className="flex flex-col items-center w-full max-w-xs  md:flex-row">
            <div className="-mt-28 md:-my-16 md:-ml-32" style={{clipPath: 'url(#roundedPolygon)'}}>
              <img className="w-auto h-48" src="https://avatars.githubusercontent.com/u/57622665?s=460&u=8f581f4c4acd4c18c33a87b3e6476112325e8b38&v=4" alt="LENX" />
            </div>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col items-center md:items-start">
                <h2 className="text-xl font-medium">{user}</h2>
                <p className="text-base font-medium text-gray-400">{description}</p>
              </div>
              <div className="flex items-center justify-center space-x-3 md:justify-start">
                <a href="lenx" target="_blank" className="transition-transform transform hover:scale-125">
                  <span className="sr-only">Twitter</span>
                  <svg aria-hidden="true" className="w-8 h-8 text-blue-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M19.633,7.997c0.013,0.175,0.013,0.349,0.013,0.523c0,5.325-4.053,11.461-11.46,11.461c-2.282,0-4.402-0.661-6.186-1.809 c0.324,0.037,0.636,0.05,0.973,0.05c1.883,0,3.616-0.636,5.001-1.721c-1.771-0.037-3.255-1.197-3.767-2.793 c0.249,0.037,0.499,0.062,0.761,0.062c0.361,0,0.724-0.05,1.061-0.137c-1.847-0.374-3.23-1.995-3.23-3.953v-0.05 c0.537,0.299,1.16,0.486,1.82,0.511C3.534,9.419,2.823,8.184,2.823,6.787c0-0.748,0.199-1.434,0.548-2.032 c1.983,2.443,4.964,4.04,8.306,4.215c-0.062-0.3-0.1-0.611-0.1-0.923c0-2.22,1.796-4.028,4.028-4.028 c1.16,0,2.207,0.486,2.943,1.272c0.91-0.175,1.782-0.512,2.556-0.973c-0.299,0.935-0.936,1.721-1.771,2.22 c0.811-0.088,1.597-0.312,2.319-0.624C21.104,6.712,20.419,7.423,19.633,7.997z" />
                  </svg>
                </a>
              </div>
            </div>
          </Card>
          <svg width={0} height={0} xmlns="http://www.w3.org/2000/svg">
            <defs>
              <clipPath id="roundedPolygon">
                <path d="M79 6.237604307034a32 32 0 0 1 32 0l52.870489570875 30.524791385932a32 32 0 0 1 16 27.712812921102l0 61.049582771864a32 32 0 0 1 -16 27.712812921102l-52.870489570875 30.524791385932a32 32 0 0 1 -32 0l-52.870489570875 -30.524791385932a32 32 0 0 1 -16 -27.712812921102l0 -61.049582771864a32 32 0 0 1 16 -27.712812921102" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
  )
}

export default UserCard