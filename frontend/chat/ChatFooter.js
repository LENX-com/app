import { memo, useState, useEffect, useRef } from 'react';
import { MdSend, MdMic, MdCancel, MdCheckCircle } from 'react-icons/md';
import { useSelector } from 'react-redux'
import styles from '@/styles/chat.module.scss'

const wait = time => new Promise(resolve => setTimeout(resolve, time));

export default memo(function ChatFooter({input, handleFocus, change, sendMessage, setFocus, image, focus, state, token, setAudioID}) {
	const inputRef = useRef();

	function handleBlur(event) {
	    if (!event.currentTarget.contains(event.relatedTarget)) {
	    	setFocus(false)
	    }
	}  

	return (
		<div className={`${styles.chat__footer} sticky bottom-0 lg:my-3 bg-white shadow-button mobile:py-3`} onBlur={handleBlur} >
	        <form className="py-3">
	            <input
	            	ref={inputRef}
	                value={input}
	                onClick={handleFocus}
	                onChange={ change }
	                onFocus={() => setFocus(true)}
	                placeholder="Type a message"
	            />
	            	<button 
		            	type="submit" 
		            	className={styles.send__btn} 
		            	onClick={sendMessage}
		            >
		            <MdSend 
							style={{
								width: 20,
								height: 20,
							}}
							className= "text-white"
						/>
		            </button>	
	            
	        </form>
	    </div>
	)
})

