import React from 'react';

function Home(props){
    return (
        <div>
        <div className="bg-home w-full h-[312px] bg-[center_-6.5rem] bg-cover bg-no-repeat"> </div>
        <div className='bg-[#CDE4E1] h-full'>
        <div className='mx-40 py-20'>
            <div>
                <div className='flex justify-center flex-wrap mb-2'>
                    <div className='text-5xl font-bold'>Welcome to Covenant Medical Group</div>
                </div>
                <div className='flex justify-center flex-wrap mb-2'>
                    <div className='text-2xl font-bold'>Providing Better Healthcare Through Innovation</div>
                </div>
                
                <div className=''>
                    <div className='text-lg'>CMG is a physician owned and operated hospitalist group providing physician 
                        and management services to hospitals and other healthcare facilities. We are focused 
                        on improving patient care and outcomes by working one on one with clinical staff and 
                        administration through the development of strategic care plans, transparency, improved 
                        policies, and streamlining facility workflow. Our customized business models reduce 
                        unnecessary medical costs without compromising exceptional patient care. 
                    </div>
                </div>
            </div>
        </div>
        </div>
        <div className='h-[73px]'></div>
        <div>
            <div className='grid grid-cols-2'>
                <div></div>
                <div></div>
            </div>
        </div>

        </div>

    );
}
export default Home;