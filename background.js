chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // console.log(JSON.stringify(message.emailData))
    // localStorage.setItem('apiResults', "This is a working practice");
    chrome.storage.local.set({ 'apiResultKey': "this is the saved data with chrome storage" }, () => {
        console.log('API result data is stored in chrome.storage.local.');
    console.log(message)
    if (message.emailData) {
      console.log("HI")
      
      const emailData = message.emailData;
      console.log(emailData)
      // Call the API and get the API results (dummy data for simplicity).
      // Replace 'your-api-url.com' with your actual API endpoint.
      fetch('https://icanhazdadjoke.com/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        // body: JSON.stringify(emailData)
      })
        .then(response => response.json())
        .then(apiResults => {
        //   localStorage.setItem('apiResults', "This is a working practice");
          chrome.browserAction.setBadgeText({ text: '✔' });
          chrome.browserAction.setBadgeBackgroundColor({ color: '#00FF00' });
        })
        .catch(error => {
          console.log('API Error:');
        });

        // console.log("we fetched from api")
    }



    
      });
      console.log("out of the loop")
  });
  