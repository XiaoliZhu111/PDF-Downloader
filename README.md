# PDF Batch Downloader (User Script)

This is a Tampermonkey user script designed to simplify the process of downloading multiple PDF files from a single webpage, particularly from sites like Value Line. It adds a "Batch Download PDFs" button to the page, allowing you to download all detected PDF links with a single click.

## Features

- **Batch Downloads:** Downloads all PDF links on a page that match a specific pattern.
- **Simple UI:** Adds an easy-to-use button directly onto the webpage, which doesn't interfere with the site's content.
- **Customizable:** The script can be easily modified to work with other websites by changing the link selector.

## Prerequisites

Before installing the script, you need two things:
1. A modern web browser like [Google Chrome](https://www.google.com/chrome/), [Mozilla Firefox](https://www.mozilla.org/firefox/new/), or [Microsoft Edge](https://www.microsoft.com/edge).
2. The **Tampermonkey** browser extension.
3. [Get Tampermonkey for Safari](https://apps.apple.com/app/apple-store/id1482490089)

## Installation

### Step 1: Install Tampermonkey

First, you need to add the Tampermonkey extension to your browser. It's a user script manager that makes it easy to install and run scripts like this one.

- [Get Tampermonkey for Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
- [Get Tampermonkey for Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
- [Get Tampermonkey for Edge](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)
- [Get Tampermonkey for Safari](https://apps.apple.com/app/apple-store/id1482490089)

### Step 2: Install the User Script

Before installing, enable Developer Mode in your browser's extension settings.

-   **For Chrome/Edge**:
    1.  Navigate to `chrome://extensions`.
    2.  In the top-right corner, toggle on **Developer mode**.
-   **For Firefox**: Developer mode is not required for this process.

Once Tampermonkey is installed, you can add the PDF Batch Downloader script.

1.  Click on the **Tampermonkey icon** in your browser's toolbar and select **"Create a new script..."**.
2.  A new editor window will open. **Delete** all the default content in the editor.
3.  **Copy** the entire content of the `pdf-batch-downloader.user.js` file.
4.  **Paste** the copied code into the Tampermonkey editor.
5.  Go to **File -> Save** in the Tampermonkey menu.

The script is now installed and will automatically run on any webpage.

## How to Use

### Downloading PDFs

1.  Navigate to a website containing the PDF links you want to download (e.g., a Value Line reports page).
2.  If the script identifies potential PDF links, a green **"Batch Download PDFs"** button will appear in the top-right corner of the page.
3.  Click the button. The script will begin downloading each PDF one by one, with a one-second delay between each download to prevent the browser from blocking them as pop-ups.
4.  The filenames are automatically generated from the link's title to be descriptive.

**Note:** Your browser may ask for permission to download multiple files. You should allow it for the script to work correctly.

## Customization

You can adapt this script to work on other websites by changing how it finds the PDF links.

### Changing the PDF Link Selector

The script is currently configured to find links that are `<a>` tags with the class `stock-action` and a `href` attribute containing `/File/Handler`. This is specific to how Value Line structures its links.

To change this for another site:
1.  Open the Tampermonkey editor for the script.
2.  Find the `findPdfLinks` function (around line 43).
3.  Modify the selector inside `document.querySelectorAll(...)`:

    ```javascript
    // ... existing code ...
    function findPdfLinks() {
        // Change the selector in the line below
        return Array.from(document.querySelectorAll('a.stock-action[href*="/File/Handler"]'));
    }
    // ... existing code ...
    ```

    For example, if another site's PDF links are all `<a>` tags with a class of `pdf-download`, you would change it to:

    ```javascript
    // ... existing code ...
    function findPdfLinks() {
        return Array.from(document.querySelectorAll('a.pdf-download'));
    }
    // ... existing code ...
    ```

### Adjusting the Download Delay

The script waits for 1 second (1000 milliseconds) between each download. If your browser is still blocking the downloads, you can increase this delay.

1.  Find the `button.addEventListener('click', ...)` block (around line 93).
2.  Change the `1000` in `index * 1000` to a larger number (e.g., `2000` for 2 seconds).

    ```javascript
    // ... existing code ...
                }, index * 1000); // 1-second delay between each download
            });
        });
    // ... existing code ...
    ```

## Troubleshooting

-   **Buttons don't appear:**
    -   Make sure the Tampermonkey extension is enabled.
    -   Check that the script is enabled in the Tampermonkey dashboard.
    -   The script may not have found any links matching the selector on the current page.
-   **Downloads are blocked:**
    -   Your browser's pop-up blocker may be preventing the downloads. Look for a notification in the address bar and choose to "Always allow" pop-ups and redirects from the site.

---

*Disclaimer: Please use this script responsibly and in accordance with the terms of service of the websites you visit.* 
