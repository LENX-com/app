import {memo, useEffect, useState} from "react";
import { MdClose}  from 'react-icons/md';
import "./styles/MediaPreview.css";

export default memo(function MediaPreview({imageSRC, mediaPreview, close}) {
	const [height, setHeight] = useState("");

	useEffect(() => {
		setHeight(document.querySelector('.chat__body--container').offsetHeight);
	}, [])

	return(
		<div 
			ref={mediaPreview} 
			className="mediaPreview"
			style={{
				height: height,
			}}
		>
			< MdClose onClick={close} />
			<img key={imageSRC} src={imageSRC} alt="" />
		</div>
	)
})