/**
 * pages.config.js - Page routing configuration
 * 
 * This file is AUTO-GENERATED. Do not add imports or modify PAGES manually.
 * Pages are auto-registered when you create files in the ./pages/ folder.
 */
import Home from './pages/Home';
import Works from './pages/Works';
import About from './pages/About';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';


export const PAGES = {
    "Home": Home,
    "works": Works,
    "about": About,
    "contact": Contact,
    "privacy-policy": PrivacyPolicy,
    "terms-of-service": TermsOfService,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
};
