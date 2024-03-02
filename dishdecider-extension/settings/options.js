async function saveOptions(e) {
  function onError(error) {
    console.log(`Error: ${error}`);
  }

  e.preventDefault();

  let options = await chrome.storage.sync.get("dishdeciderAssistantConfig");
  options = transformOptionsObjectToNewFormatIfNeeded(options);
  let selProfileId = parseInt(document.querySelector("#selectedProfileId").value);

  if (!(options && options.dishdeciderAssistantConfig && options.dishdeciderAssistantConfig.profiles)){
    options = {
      dishdeciderAssistantConfig: {
        profiles: new Array(100)
      }
    }
  }

  options.dishdeciderAssistantConfig.selectedProfileId = selProfileId;
  options.dishdeciderAssistantConfig.profiles[selProfileId] = {
    profileName:  document.querySelector("#profileName").value,
    favList1: document.querySelector("#favList1").value.trim().split(",").filter(i => i),
    favList2: document.querySelector("#favList2").value.trim().split(",").filter(i => i),
    blacklist: document.querySelector("#blacklist").value.trim().split(",").filter(i => i),
    warnList: document.querySelector("#warnList").value.trim().split(",").filter(i => i),
    blacklistExceptions: document.querySelector("#blacklistExceptions").value.trim().split(",").filter(i => i),
    mehList: document.querySelector("#mehList").value.trim().split(",").filter(i => i),
    favListExceptions: document.querySelector("#favListExceptions").value.trim().split(",").filter(i => i)
  };

  (async () => {
    try {
      await chrome.storage.sync.set(options);
      console.log("Saved options:");
      console.log(options);
      
      /*console.log("event:");
      console.log(e);
      console.log(typeof e);*/

      let time =  new Date();
     
      
      $('#success_message').html("Changes saved at: " + time.toDateString() + " " + time.toLocaleTimeString());

      if (e instanceof SubmitEvent){
        $('#success_message').hide();
        $('#success_message').slideDown({ opacity: "show" }, "slow");
      } else {
        $('#success_message').show({ opacity: "show" }, "slow");
      }

    } catch (ex) {
      console.error("Error while saving options:", ex);
    }
  })();

}

function restoreOptions(event, tempSelectedProfileId) {
  function onError(error) {
    console.log(`Error: ${error}`);
  }
  
  function setCurrentChoice(result) {
    result = transformOptionsObjectToNewFormatIfNeeded(result);

    if (result && result.dishdeciderAssistantConfig && result.dishdeciderAssistantConfig.profiles){
      console.log("Loaded options:")
      console.log(result);

      let selId = tempSelectedProfileId ?? result.dishdeciderAssistantConfig.selectedProfileId ?? 0;
      
      //TODO check if selId is a valid integer and not undefined or NaN and log error

      /*
      console.log("tempSelectedProfileId:")
      console.log(tempSelectedProfileId);

      console.log(" parseInt(result.dishdeciderAssistantConfig.selectedProfileId):")
      console.log( parseInt(result.dishdeciderAssistantConfig.selectedProfileId));

      console.log("selId:")
      console.log(selId);

      console.log("result.dishdeciderAssistantConfig.profiles:")
      console.log(result.dishdeciderAssistantConfig.profiles);

      console.log("result.dishdeciderAssistantConfig.profiles[selId]:")
      console.log(result.dishdeciderAssistantConfig.profiles[selId]);
      */

      document.querySelector("#selectedProfileId").value = selId;
      if (result.dishdeciderAssistantConfig.profiles[selId]){
        setRealData(result.dishdeciderAssistantConfig.profiles[selId]);
      } else {
        setEmptyData();
      }
    } else {
      let selId = tempSelectedProfileId ?? 0;

      document.querySelector("#selectedProfileId").value = selId;
      setSampleData();
      saveOptions(new CustomEvent("createsampleprofile"));
    }
  }

  function setRealData(obj){
    document.querySelector("#profileName").value = obj.profileName ?? "";

    document.querySelector("#favList1").value = obj.favList1.join(",");
    document.querySelector("#favList2").value = obj.favList2.join(",");
    document.querySelector("#blacklist").value = obj.blacklist.join(",");
    document.querySelector("#warnList").value = obj.warnList.join(",");
    document.querySelector("#blacklistExceptions").value = obj.blacklistExceptions.join(",");
    document.querySelector("#favListExceptions").value = obj.favListExceptions.join(",");
    document.querySelector("#mehList").value = obj.mehList.join(",");
  }

  function setSampleData(){
    document.querySelector("#profileName").value = "Sample Profile";

    document.querySelector("#favList1").value = "lasagne, carbonara, tikka masala";
    document.querySelector("#favList2").value = "bacon, tzatziki";
    document.querySelector("#blacklist").value = "";
    document.querySelector("#warnList").value = "";
    document.querySelector("#blacklistExceptions").value = "";
    document.querySelector("#favListExceptions").value = "";
    document.querySelector("#mehList").value = "";
  }

  function setEmptyData(){
    document.querySelector("#profileName").value = "";

    document.querySelector("#favList1").value = "";
    document.querySelector("#favList2").value = "";
    document.querySelector("#blacklist").value = "";
    document.querySelector("#warnList").value = "";
    document.querySelector("#blacklistExceptions").value = "";
    document.querySelector("#favListExceptions").value = "";
    document.querySelector("#mehList").value = "";
  }


  let getting = chrome.storage.sync.get("dishdeciderAssistantConfig");
  getting.then(setCurrentChoice, onError);
}

function changeProfile(event){
  console.log('changeProfile invoked');
  let tempSelectedProfileId = document.querySelector("#selectedProfileId").value;
  restoreOptions(event, tempSelectedProfileId);
  saveOptions(new CustomEvent("profilechange"));
}

//TODO: this code is duplicated unfortunately
function transformOptionsObjectToNewFormatIfNeeded(result){
  if (result && result.dishdeciderAssistantConfig && !result.dishdeciderAssistantConfig.profiles){
    let profs = new Array(100);
    let selProfId = 0

    profs[selProfId] = result.dishdeciderAssistantConfig[0];
    profs[selProfId].profileName="Untitled";

    let result2 = {
      dishdeciderAssistantConfig: {
        selectedProfileId: selProfId,
        profiles: profs
      }
    }
    result = result2;
  }
   
  return result;
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
document.getElementById("selectedProfileId").addEventListener("change", changeProfile);

document.getElementById("profileName").addEventListener("blur", saveOptions);
document.getElementById("favList1").addEventListener("blur", saveOptions);
document.getElementById("favList2").addEventListener("blur", saveOptions);
document.getElementById("mehList").addEventListener("blur", saveOptions);
document.getElementById("warnList").addEventListener("blur", saveOptions);
document.getElementById("blacklist").addEventListener("blur", saveOptions);
document.getElementById("favListExceptions").addEventListener("blur", saveOptions);
document.getElementById("blacklistExceptions").addEventListener("blur", saveOptions);

