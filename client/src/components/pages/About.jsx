import React from 'react';
import stock from '../../images/istock-1223789376.jpg';
import drj from '../../images/dr-j-headshot-suit-preferred.jpg';
import drorjioke from '../../images/dr-orjioke.png'
import drokeh from '../../images/victor-okeh.png'
export default function About(props) {

    return (
        <div className='bg-[#CDE4E1] h-full'>
        <div className='mx-40 py-20'> 
        <div className='flex justify-center'>
            <img src={stock} className='w-[628px] h-full'/>
        </div>
        <div className='h-[50px]'></div>
        <div>
            <h2 className='text-4xl font-bold mb-5'>Our Story</h2>
            <div className='mb-2 text-xl'>Covenant Medical Group was founded in 2017 by Dr. Ngozika Orjioke, Dr. Akinloye Makanjuola 
                and Dr. Victor Okeh. During their years of providing patient care in acute care hospital 
                medicine, they had all too often seen the return of patients shortly after being discharged 
                to a lower level of care with a recurrence of their illnesses or in an even more critically 
                ill state. Understanding that recovery from critical illness can be a lengthy continuum that 
                occasionally involves relapses, many of which can be prevented, they knew there had to be a 
                better way to treat patients without having to transfer the them back to an acute care hospital,
                 avoiding health related transportation risks and unnecessary medical costs. 
            </div>
            <div className='mb-2 text-xl'>When the opportunity to do just this presented itself, they knew they could 
                not say no and they developed the concept of the "chronically, critically ill patient". 
                Their passion and dedication in the belief that these types of patients can not only get well 
                but be able to go home and live with an improved quality of life has paid off, earning them a well 
                respected reputation among the long term acute care community and beyond. 
                Guided by a vision to expand their services, and with entrepreneurship being their second passion, they are 
                always seeking new opportunities to improve patient care through medicine, education, research, and business not 
                only in the US but around the world. By developing and working closely with other foundations and healthcare organizations 
                they are on a mission to change the world of healthcare as we know it. 
                For more information please visit cmgglobalfoundation.org
            </div>

        </div>
        <div className='h-[138px]'></div>
        <div className=''>
            <div className='flex justify-center'>
                <div className='text-3xl font-semibold'>Meet our founders</div>
            </div>
            <div className='grid grid-cols-3 justify-items-center'>
                <div>
                    <img src={drorjioke} className='w-auto h-full'/>
                </div>
                <div>
                    <img src={drj} className='w-auto h-full'/>
                </div>
                <div>
                    <img src={drokeh} className='w-auto h-full'/>
                </div>
            </div>
        </div>
        <div className='h-[31px]'></div>
        <div className='mb-2 text-sm'>
            <span>“Health care is a tale of being upstream or being downstream.</span>
            <br/>
            <span>If you’re downstream, you’re at the end of the river pulling people out of the current right before they hit the rapids. 
                You can save a good number of people that way.</span>
            <br/>
            <span>But if you’re upstream, you stop them from falling into the river in the first place and you save a good deal more.”</span>
            <br/>
            <span>― </span>
            <span className='font-bold'> Michael J. Dowling</span>
        </div>
        </div>
        </div>
    );
}