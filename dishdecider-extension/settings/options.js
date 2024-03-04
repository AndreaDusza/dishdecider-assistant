async function saveOptions(e) {
  function onError(error) {
    console.log(`Error: ${error}`);
  }

  function createKeywordList(input){

    //.replaceAll(";", ",").replaceAll("\"","").replaceAll("\'","")
    //TODO disable some characters in the textarea? List:  ; " '

    return input.trim().replaceAll("\n", ",\n").split(",").filter(i => i).filter(i => !i.match('^[?.*\\s -]+$'));
  }

  async function createOptionsObject(){
    let options = await chrome.storage.sync.get("dishdeciderAssistantConfig");
    options = transformOptionsObjectToNewFormatIfNeeded(options);
    let selProfileId = document.querySelector("#selectedProfileId").value;
  
    if (!(options && options.dishdeciderAssistantConfig && options.dishdeciderAssistantConfig.profiles)){
      options = {
        dishdeciderAssistantConfig: {
          profiles: []
        }
      }
    }

    options.dishdeciderAssistantConfig.version = '1.3';
    options.dishdeciderAssistantConfig.selectedProfileId = selProfileId;
    let profile =  options.dishdeciderAssistantConfig.profiles.find(i => i.profileId === selProfileId);

    if (!profile){
      profile={};
      options.dishdeciderAssistantConfig.profiles.push(profile);
    }

    profile.profileId = selProfileId;
    profile.profileName = document.querySelector("#profileName").value;
    profile.favList1 = createKeywordList(document.querySelector("#favList1").value);
    profile.favList2 = createKeywordList(document.querySelector("#favList2").value);
    profile.blacklist = createKeywordList(document.querySelector("#blacklist").value);
    profile.warnList = createKeywordList(document.querySelector("#warnList").value);
    profile.blacklistExceptions = createKeywordList(document.querySelector("#blacklistExceptions").value);
    profile.mehList = createKeywordList(document.querySelector("#mehList").value);
    profile.favListExceptions = createKeywordList(document.querySelector("#favListExceptions").value);
    profile.isRegexEnabled = $("#isRegexEnabled").prop('checked');

    return options;
  }

  e.preventDefault();

  (async () => {
    try {
      options = await createOptionsObject();
      await chrome.storage.sync.set(options);
      console.log("Saved options:");
      console.log(options);
      
      /*console.log("event:");
      console.log(e);
      console.log(typeof e);*/

      let time =  new Date();
     
      $('#error_message').hide();
      $('#unsaved_changes_message').hide();
      $('#success_message').html("Changes saved at: " + time.toDateString() + " " + time.toLocaleTimeString());

      if (e instanceof SubmitEvent){
        $('#success_message').hide();
        $('#success_message').slideDown({ opacity: "show" }, "slow");
      } else {
        $('#success_message').show();
      }

      //restoreOptions(e);

    } catch (ex) {
      $('#success_message').hide();
      $('#unsaved_changes_message').hide();
      $('#error_message').html("An error occurred while saving! ");
      $('#error_message').slideDown({ opacity: "show" }, "slow");
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

      let selId = tempSelectedProfileId ?? result.dishdeciderAssistantConfig.selectedProfileId ?? '0';

      document.querySelector("#selectedProfileId").value = selId;
      console.log("selId");
      console.log(selId);
      console.log("result.dishdeciderAssistantConfig.profiles.find(i => i.profileId === selId)");
      console.log(result.dishdeciderAssistantConfig.profiles.find(i => i.profileId === selId));
      console.log("result.dishdeciderAssistantConfig.profiles");
      console.log(result.dishdeciderAssistantConfig.profiles);
      if (result.dishdeciderAssistantConfig.profiles && result.dishdeciderAssistantConfig.profiles.find(i => i.profileId === selId)){
        setRealData(result.dishdeciderAssistantConfig.profiles.find(i => i.profileId === selId));
      } else {
        setEmptyData();
      }
    } else {
      let selId = tempSelectedProfileId ?? '0';

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
    $("#isRegexEnabled").prop('checked', obj.isRegexEnabled).change();
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
    $("#isRegexEnabled").prop('checked', false).change();
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
    $("#isRegexEnabled").prop('checked', false).change();
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
  if (result && result.dishdeciderAssistantConfig){

    //convert version 1.1 to version 1.3
    if (!result.dishdeciderAssistantConfig.version){
      let selProfId = '0';

      let oneProfile = result.dishdeciderAssistantConfig[0];
      oneProfile.profileName="Untitled";
      oneProfile.profileId = selProfId;
      oneProfile.isRegexEnabled = true;

      let result2 = {
        dishdeciderAssistantConfig: {
          version: '1.3',
          selectedProfileId: selProfId,
          profiles: [oneProfile]
        }
      }
      result = result2;
   }
  }
   
  return result;
}

// Keep the below limitations in mind when choosing the throttle/debounce interval:
// MAX_WRITE_OPERATIONS_PER_MINUTE = 120 (every 500 milliseconds)
// MAX_WRITE_OPERATIONS_PER_HOUR = 1800 (every 2000 milliseconds)
function debounce(func, timeout = 1000){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

const debouncedSave = debounce((e) => saveOptions(e));

const autoSaveOptions = function(e) {
  $('#success_message').hide();
  $('#error_message').hide();
  $('#unsaved_changes_message').html("Unsaved changes");
  $('#unsaved_changes_message').show();
  debouncedSave(e);
}

document.addEventListener("DOMContentLoaded", restoreOptions);

document.getElementById("selectedProfileId").addEventListener("change", changeProfile);

document.querySelector("form").addEventListener("submit", saveOptions);

document.getElementById("profileName").addEventListener("change", saveOptions);
document.getElementById("favList1").addEventListener("change", saveOptions);
document.getElementById("favList2").addEventListener("change", saveOptions);
document.getElementById("mehList").addEventListener("change", saveOptions);
document.getElementById("warnList").addEventListener("change", saveOptions);
document.getElementById("blacklist").addEventListener("change", saveOptions);
document.getElementById("favListExceptions").addEventListener("change", saveOptions);
document.getElementById("blacklistExceptions").addEventListener("change", saveOptions);

document.getElementById("profileName").addEventListener("input", autoSaveOptions);
document.getElementById("favList1").addEventListener("input", autoSaveOptions);
document.getElementById("favList2").addEventListener("input", autoSaveOptions);
document.getElementById("mehList").addEventListener("input", autoSaveOptions);
document.getElementById("warnList").addEventListener("input", autoSaveOptions);
document.getElementById("blacklist").addEventListener("input", autoSaveOptions);
document.getElementById("favListExceptions").addEventListener("input", autoSaveOptions);
document.getElementById("blacklistExceptions").addEventListener("input", autoSaveOptions);

$('#isRegexEnabled').on('change', saveOptions);
