function updateUIWithData(emailData, apiResults) {
  document.getElementById('subject').textContent += emailData.subject;
  document.getElementById('sender').textContent += emailData.sender;
  document.getElementById('content').textContent += emailData.content;
  document.getElementById('apiResults').textContent += apiResults;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.emailData) {
    const emailData = message.emailData;
    const apiResults = localStorage.getItem('apiResultKey');
    updateUIWithData(emailData, apiResults);
    
  }
});
chrome.storage.local.get('apiResultKey', (result) => {
  const storedData = result.apiResultKey;
  // Use the stored data as needed in your popup.js
  console.log('Data fetched from chrome.storage.local:', storedData);
});