import React from "react";

function HiredApplicant(props) {

    return (
        <div className="mt-4 flex justify-center w-full">
            <div className="outline outline-1 rounded-md w-1/2 min-w-fit">
                <div className="flex content-center justify-between text-sm w-full px-2 py-1">
                    <div className="flex flex-initial basis-1/3 flex-col justify-between">
                        <div className="truncate">{props.name}</div>
                        <div className="truncate">{props.specialty}</div>
                        <div className="truncate"><span className="font-bold">Facility:</span> {props.facName}</div>
                    </div>
                    <div className="flex flex-initial basis-1/3 flex-col justify-between text-center">
                        <div className="items-center">
                            <div className="ml-auto mr-0">
                                <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">Verified</span>
                            </div>
                        </div>
                        <a href={`mailto:${props.email}`} className="truncate">{props.email}</a>
                        <div className="truncate"><span className="font-bold">Position:</span> {props.postTitle}</div>
                    </div>
                    <div className="flex basis-1/3 flex-initial justify-end h-28 min-w-fit">
                        <img className="rounded-full" src={props.image}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HiredApplicant

