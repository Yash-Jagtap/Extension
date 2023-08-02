// content.js
console.log("Injected from the extension")
let isProcessingMessage = false;
// Function to extract data from the opened Gmail email.
function extractDataFromGmail() {
    
    const emailData = {};
  
    // Get the email subject.
    const subjectElement = document.querySelector('h2.hP');
    if (subjectElement) {
      emailData.subject = subjectElement.innerText.trim();
    }
  
    // Get the email sender.
    const senderElement = document.querySelector('.gD');
    if (senderElement) {
      emailData.sender = senderElement.innerText.trim();
    }
  
    // Get the email content.
    const emailContentElement = document.querySelector('.a3s');
    if (emailContentElement) {
      emailData.content = emailContentElement.innerText.trim();
    }
    // console.log(JSON.stringify(emailData) )
    return emailData;
  }
  
// Function to send data to the background script.
function sendDataToBackgroundScript(emailData) {
    if (!isProcessingMessage) {
      // Set the flag to indicate that the message is being processed.
      isProcessingMessage = true;
  
      // Send the email data to the background script.
      chrome.runtime.sendMessage({ emailData: emailData }, (response) => {
        // Handle the response from the background script if needed.
        // Reset the flag to allow processing the next message.
        isProcessingMessage = false;
      });
    }
  }
  
// Function to handle the DOMContentLoaded event and start observing email content.
function handleDOMContentLoaded() {
  // Extract data from the Gmail email content.
  const emailData = extractDataFromGmail();

  // Send the email data to the background script.
  sendDataToBackgroundScript(emailData);
}

// Check if the DOM is already loaded before starting the script.
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  handleDOMContentLoaded();
} else {
  // If the DOM is not yet loaded, wait for the DOMContentLoaded event.
  document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
}

// Function to observe the URL changes and inject content script when a mail is opened.
function handleUrlUpdate(tabId, changeInfo, tab) {
  // Check if the URL has been updated.
  if (changeInfo.status === 'complete' && changeInfo.url) {
    // Check if the URL starts with 'https://mail.google.com/mail/u/'.
    if (changeInfo.url.startsWith('https://mail.google.com/mail/u/')) {
      // Inject the content script into the Gmail mail tab.
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['content.js'],
      });
    }
  }
}

// Listen for tab updates using chrome.tabs.onUpdated event.
chrome.tabs.onUpdated.addListener(handleUrlUpdate);


















/*the original code */





/*





// Debounce function to delay the execution of the observerCallback.
function debounce(callback, delay) {
  let timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(this, arguments);
    }, delay);
  };
}

// Observer callback function to trigger the email data extraction when the email content is loaded.
const debouncedObserverCallback = debounce(observerCallback, 5000); // Adjust the delay as needed
// Observer callback function to trigger the email data extraction when the email content is loaded.
function observerCallback(mutationsList, observer) {
    for (const mutation of mutationsList) {
      console.log(mutation)
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        // New elements were added to the DOM (email content might have loaded).
        const emailContentElement = document.querySelector('.a3s div[dir="ltr"]');
        if (emailContentElement) {
          // If the email content element is present, extract the data.
          // const emailData = extractDataFromGmail();
          // Send the email data to the background script.
          console.log("made a call from observerCallback")
          sendDataToBackgroundScript();
          break; // Exit the loop to avoid multiple messages.
        }
      }
    }
  }
  // Create a MutationObserver to observe changes in the DOM.

  // Function to start observing the email content.
 


  
// Check if the DOM is already loaded before starting the MutationObserver.
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  startMutationObserver();
} else {
  // If the DOM is not yet loaded, wait for the DOMContentLoaded event.
  document.addEventListener('DOMContentLoaded', startMutationObserver);
}

// Function to start the MutationObserver once the DOM is loaded.
function startMutationObserver() {
  // Create a MutationObserver to observe changes in the DOM.
  const observer = new MutationObserver(observerCallback);
  // Start observing the email content.
  observeEmailContent(observer);
}

// Function to observe the email content.
function observeEmailContent(observer) {
  const emailContentElement = document.querySelector('.a3s div[dir="ltr"]');
  if (emailContentElement) {
    // If the email content element is already present, extract the data.
    const emailData = extractDataFromGmail();
    // Send the email data to the background script.
    console.log("made a call through observeEmailContent")
    sendDataToBackgroundScript(emailData);
  } else {
    // If the email content element is not yet present, start observing the DOM changes.
    observer.observe(document.body, { childList: true, subtree: true });
  }
}

*/