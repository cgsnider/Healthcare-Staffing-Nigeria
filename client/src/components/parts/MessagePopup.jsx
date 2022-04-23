import React from 'react';
import Popup from 'reactjs-popup';
export default function MessagePopup(props) {
    return (
        <Popup open={props.open} closeOnDocumentClick onClose={() => props.setOpen(false)}>
            <div >
                <div className='text-center text-2xl mb-5'>{`you have been ${props.type=='accept'? "Verified!":"Denied verification"}`}</div>
                <div className='text-lg text-center'>{props.message}</div>
            </div>
        </Popup>
    );
}