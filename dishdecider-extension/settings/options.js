function saveOptions(e) {
  e.preventDefault();
  const options = {
    dishdeciderAssistantConfig: [
    {
    userNamesToFind: [""],
    favList1: document.querySelector("#favList1").value.trim().split(",").filter(i => i),
    favList2: document.querySelector("#favList2").value.trim().split(",").filter(i => i),
    blacklist: document.querySelector("#blacklist").value.trim().split(",").filter(i => i),
    warnList: document.querySelector("#warnList").value.trim().split(",").filter(i => i),
    blacklistExceptions: document.querySelector("#blacklistExceptions").value.trim().split(",").filter(i => i),
    mehList: document.querySelector("#mehList").value.trim().split(",").filter(i => i),
    favListExceptions: document.querySelector("#favListExceptions").value.trim().split(",").filter(i => i)
    }
  ]};
  (async () => {
    try {
      await chrome.storage.sync.set(options);
      console.log("Saved options:");
      console.log(options);
      $('#success_message').slideDown({ opacity: "show" }, "slow");
    } catch (e) {
      console.error("Error while saving options:", e);
    }
  })();

}

function restoreOptions() {
  function onError(error) {
    console.log(`Error: ${error}`);
  }

  
  function setCurrentChoice(result) {
    if (result){
      console.log("Loaded options:")
      console.log(result);
      document.querySelector("#favList1").value = result.dishdeciderAssistantConfig[0].favList1.join(",");
      document.querySelector("#favList2").value = result.dishdeciderAssistantConfig[0].favList2.join(",");
      document.querySelector("#blacklist").value = result.dishdeciderAssistantConfig[0].blacklist.join(",");
      document.querySelector("#warnList").value = result.dishdeciderAssistantConfig[0].warnList.join(",");
      document.querySelector("#blacklistExceptions").value = result.dishdeciderAssistantConfig[0].blacklistExceptions.join(",");
      document.querySelector("#favListExceptions").value = result.dishdeciderAssistantConfig[0].favListExceptions.join(",");
      document.querySelector("#mehList").value = result.dishdeciderAssistantConfig[0].mehList.join(",");
    } else {
      document.querySelector("#favList1").value = "kijevi, hortobágyi";
      document.querySelector("#favList2").value = "csirke, kagyló";
      document.querySelector("#blacklist").value = "rák";
      document.querySelector("#warnList").value = "hal";
      document.querySelector("#blacklistExceptions").value = "csírák";
      document.querySelector("#favListExceptions").value = "kagylótészta";
      document.querySelector("#mehList").value = "kelbimbó";
    }
  }

  let getting = chrome.storage.sync.get("dishdeciderAssistantConfig");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);


