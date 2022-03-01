import React from 'react'

function PendingProfileFac(props) {
    return (
        <div className="mt-4 flex justify-center w-full">
            <div className="outline outline-1 rounded-md w-1/2 min-w-fit">
                <div className="flex content-center justify-between text-sm w-full px-2 py-1">
                    <div className="flex flex-initial basis-1/3 flex-col justify-between">
                        <div className="truncate">{props.name}</div>
                        <div className="truncate">{props.street}</div>
                        <div className="truncate">{props.loc}</div>
                    </div>
                    <div className="flex flex-initial basis-1/3 flex-col justify-between text-center">
                        <div className="truncate">Unverified</div>
                        <a href={`mailto:${props.email}`} className="truncate">{props.email}</a>
                        <div className="invisible">placeholder</div>
                    </div>
                    <div className="flex basis-1/3 flex-initial justify-end h-28 min-w-fit">
                        <img className="rounded-full" src={props.image}/>
                    </div>
                </div>
            </div>
            <div className="flex ml-5 items-center">
                <button className="h-2/3 px-4 bg-green-500 rounded text-white">Review</button>
            </div>
        </div>
    );
}

export default PendingProfileFac