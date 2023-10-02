import './App.css';
// import React from 'react';
import ParticlesBg from 'particles-bg';
import { useState } from 'react';

import ImageLinkForm from './components/image-link-form/ImageLinkForm';
import Navigation from "./components/navigation/Navigation";
import Logo from "./components/logo/Logo";
import Rank from './components/rank/Rank';

function App() {
    const [input, setInput] = useState("");

    const onInputChange = (e) => {
        const targetValue = e.target.value;
        
        e.preventDefault();
        console.log(targetValue);
        setInput(targetValue);
    };

    const onSubmit = () => {
        console.log("click");
    };

    return (
        <main className='App'>
            <ParticlesBg bg={true} type="cobweb" />
            <Navigation />
            <Logo />
            <Rank />
            <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit}/>
        </main>
    );
}

export default App;