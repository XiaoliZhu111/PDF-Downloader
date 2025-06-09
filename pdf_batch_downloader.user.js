<<<<<<< HEAD
// ==UserScript==
// @name         PDF Batch Downloader
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Batch download PDFs from sites like Value Line and Giverny Capital
// @author       Lilian Zhu
// @match        *://*/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    console.log('PDF Batch Downloader script is running');
    console.log('Current URL:', window.location.href);
    console.log('Found PDF links:', (document.querySelectorAll('a.stock-action[href*="/File/Handler"]').length + document.querySelectorAll('a.gate-button.button').length));

    // Find all PDF links on the page
    function findPdfLinks() {
        return Array.from(document.querySelectorAll('a.stock-action[href*="/File/Handler"], a.gate-button.button'));
    }

    // Create and add the download button
    function addDownloadButton() {
        const button = document.createElement('button');
        button.innerHTML = 'Batch Download PDFs';
        button.style.cssText = ` 
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            padding: 10px 20px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        `;

        button.addEventListener('mouseover', () => {
            button.style.backgroundColor = '#45a049';
        });

        button.addEventListener('mouseout', () => {
            button.style.backgroundColor = '#4CAF50';
        });

        button.addEventListener('click', () => {
            const pdfLinks = findPdfLinks();
            if (pdfLinks.length === 0) {
                alert('No PDF links found on this page!');
                return;
            }

            // Download each PDF with a delay to avoid browser blocking
            pdfLinks.forEach((link, index) => {
                setTimeout(() => {
                    // Get a clean filename from the link's title attribute
                    const fileName = (link.title ? link.title.replace(/[^a-z0-9\s.-]/gi, '_') : 'report') + '.pdf';

                    // Create a temporary link element to trigger the download
                    const tempLink = document.createElement('a');
                    tempLink.href = link.href;
                    tempLink.setAttribute('download', fileName);
                    tempLink.style.display = 'none';
                    document.body.appendChild(tempLink);
                    tempLink.click();
                    document.body.removeChild(tempLink);
                }, index * 1000); // 1-second delay between each download
            });
        });

        document.body.appendChild(button);
    }

    // Main initialization
    function init() {
        console.log('Init function running');
        addDownloadButton();
    }

    // Run the script
    init();
})(); 
=======
// ==UserScript==
// @name         PDF Batch Downloader
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Batch download PDFs from Value Line
// @author       Lilian Zhu
// @match        *://*/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    console.log('PDF Batch Downloader script is running');
    console.log('Current URL:', window.location.href);
    console.log('Found PDF links:', document.querySelectorAll('a.stock-action[href*="/File/Handler"]').length);

    // Storage key for excluded domains
    const EXCLUDED_DOMAINS_KEY = 'pdfDownloaderExcludedDomains';

    // Check if current domain is excluded
    function isDomainExcluded() {
        const excludedDomains = GM_getValue(EXCLUDED_DOMAINS_KEY, []);
        return excludedDomains.includes(window.location.hostname);
    }

    // Add domain to excluded list
    function excludeCurrentDomain() {
        const excludedDomains = GM_getValue(EXCLUDED_DOMAINS_KEY, []);
        if (!excludedDomains.includes(window.location.hostname)) {
            excludedDomains.push(window.location.hostname);
            GM_setValue(EXCLUDED_DOMAINS_KEY, excludedDomains);
        }
    }

    // Find all PDF links on the page
    function findPdfLinks() {
        return Array.from(document.querySelectorAll('a.stock-action[href*="/File/Handler"]'));
    }

    // Create and add the download button
    function addDownloadButton() {
        const button = document.createElement('button');
        button.innerHTML = 'Batch Download PDFs';
        button.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            padding: 10px 20px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        `;

        button.addEventListener('mouseover', () => {
            button.style.backgroundColor = '#45a049';
        });

        button.addEventListener('mouseout', () => {
            button.style.backgroundColor = '#4CAF50';
        });

        button.addEventListener('click', () => {
            const pdfLinks = findPdfLinks();
            if (pdfLinks.length === 0) {
                alert('No PDF links found on this page!');
                return;
            }

            // Download each PDF with a delay to avoid browser blocking
            pdfLinks.forEach((link, index) => {
                setTimeout(() => {
                    // Get a clean filename from the link's title attribute
                    const fileName = (link.title ? link.title.replace(/[^a-z0-9\s.-]/gi, '_') : 'report') + '.pdf';

                    // Create a temporary link element to trigger the download
                    const tempLink = document.createElement('a');
                    tempLink.href = link.href;
                    tempLink.setAttribute('download', fileName);
                    tempLink.style.display = 'none';
                    document.body.appendChild(tempLink);
                    tempLink.click();
                    document.body.removeChild(tempLink);
                }, index * 1000); // 1-second delay between each download
            });
        });

        document.body.appendChild(button);
    }

    // Main initialization
    function init() {
        console.log('Init function running');
        console.log('Is domain excluded:', isDomainExcluded());
        if (!isDomainExcluded()) {
            console.log('Adding buttons');
            addDownloadButton();
            
        }
    }

    // Run the script
    init();
})(); 
>>>>>>> 06d311a26e80b7201538f1a52d1c250ab815c5fb
