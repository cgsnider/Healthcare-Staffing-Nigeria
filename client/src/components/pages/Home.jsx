import React from 'react';
import TopBar from '../parts/TopBar';
import { Link } from 'react-router-dom';

function Home(props){

    return (
        <div>
            <TopBar />
            <Link to='/test'>
                <button class="border p-3">to</button>
            </Link>
        </div>
    );
}
export default Home;