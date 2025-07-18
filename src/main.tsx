import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react';
import App from './components/App/App';
import "modern-normalize";




createRoot(document.getElementById("root") as HTMLDivElement).render(
<StrictMode>
<App />
</StrictMode>);
