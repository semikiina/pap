import React from "react";
import App from './App';
import { createRoot } from 'react-dom/client';
import { AuthProvider} from './Components/Contexts/AuthProvider';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <AuthProvider>
        <App tab="home" />
    </AuthProvider>
       
    
);