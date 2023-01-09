let goalName;
let targetDate;
let targetAmount;
let moneyperday;

function calcGoal(){
    goalName = document.getElementById("goalname").value.toLocaleString();
    targetDate = document.getElementById("targetdate").value;
    targetAmount = document.getElementById("targetamount").value.toLocaleString();
    var datenow = new Date()
    var datetarget = new Date(targetDate)

    // To calculate the time difference of two dates
    var Difference_In_Time = datetarget.getTime() - datenow.getTime();
      
    // To calculate the no. of days between two dates
    var Difference_In_Days = Math.ceil(Difference_In_Time / (1000 * 3600 * 24));
    document.getElementById("days").innerHTML = Difference_In_Days;
    //get the save per day money value
    moneyperday = (targetAmount / Difference_In_Days).toFixed(2)
    document.getElementById("saveperday").value = moneyperday;

//     //show the hidden div
//     document.getElementById("hidden-div").className =
//    document.getElementById("hidden-div").className.replace
//       ( /(?:^|\s)invisible(?!\S)/g , '' )
}

const getGoals = () => {
    let goals;//the array, this is our local database
    if(localStorage.getItem('goals') === null){
        goals = [];
    }else {
        goals = JSON.parse(localStorage.getItem('goals'));
    }
    return goals;
}

const saveGoals = (GoalTitle,GoalDate,GoalAmount,GoalSavepDay) => {
    const goals = getGoals();
    goals.push([GoalTitle,GoalDate,GoalAmount,GoalSavepDay]);
    localStorage.setItem('goals', JSON.stringify(goals));
}

const addGoals = () => {

    saveGoals(goalName,targetDate,targetAmount,moneyperday);//passes the files to the saveTodos object variable to perform the saving of the data to the todos array.

    //reset the values of the GOAL title and desc input
    goalName.value = '';
    targetDate.value = '';
    targetAmount.value = '';
}

function showtest(){
    console.log(goalName);
    console.log(typeof targetDate);
    console.log(targetAmount);
    console.log(moneyperday);
}

function saveGOAL(){

    addGoals();//calls the object addTodos to perform the saving of data to todos array when saveTODO function is called.

    //a delayed function at 0.5 second: to hide the addTodoModal, and refreshes the page so the new todo will show up.
    setTimeout(function(){
        document.getElementById("goalModal").classList.add("hidden");
        location.reload();
    },500);
}
//function in the + button at header to show the addModal
function showAddGoal(){
    document.getElementById("goalModal").classList.remove("hidden");
}

//function in the addModal cancel btn to hide the addModal
function hideAddGoal(){
    document.getElementById("goalModal").classList.add("hidden");
    document.querySelector('#goalname').value = "";
    document.querySelector('#targetdate').value = "";
    document.querySelector('#targetamount').value = "";
    document.querySelector('#saveperday').value = "";
}



function displayGOALlist(){

    //the array looks like -  [["title","desc","color1","color2"],["title","desc","color1","color2"]]
    let listgoal = getGoals(); //passing the array getTodos() to the new variable listgoal

    //if the todos array is empty show the div that shows "No TODO List"
    if(listgoal.length == 0){ 
        document.querySelector("#yesGoals").classList.add("hidden")
        document.querySelector("#noGoals").classList.remove("hidden")
    }
    //if the todos array is not empty show the div that shows the TODO List"
    else if(listgoal.length > 0){
        document.querySelector("#noGoals").classList.add("hidden")
        document.querySelector("#yesGoals").classList.remove("hidden")

       //Loop that calls all data into the card
        for (var i = 0; i < listgoal.length; i++){
            let title = listgoal[i][0];//contains the data
            let date = listgoal[i][1];//contains the date
            let amount = listgoal[i][2];//contains the color 1
            let savepday = listgoal[i][3];//contains the color 2
            document.getElementById("yesGoals").innerHTML += "<li class='flex-auto'><div onclick='goalcardtoggle("+i+")' id='chkX"+i+"' class='relative rounded-md cursor-pointer bg-blue-100 shadow-lg p-4 flex flex-col justify-around items-start gap-2'><button id='delbtn"+i+"' onclick='removeGOAL("+i+")' class='absolute hidden top-0 right-0 px-2 py-0 hover:bg-red-500 rounded-full'><i class='fa-solid fa-xmark'></i></button><div class='flex justify-center items-center w-full'><b class='text-xl font-bold'>"+title+"</b></div><div class='flex justify-center items-center w-full'><p class='text-xs'>Goal Deadline: </p><p class='text-base italic'>"+new Date(date).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) +"</p></div><div class='flex justify-evenly items-center w-full gap-1'><div class='flex flex-col justify-center items-start'><p class='text-xs'>Amount: </p><p class='text-base font-semibold'>₱"+amount+"</p></div><div class='flex flex-col justify-center items-start'><p class='text-xs'>Save per day: </p><p class='text-base font-bold'>₱"+savepday+"</p></div></div></div></li>";
    
        }
    }
}

//for clearing all data in the localstorage then refrehses the page.
function clearAll(){
    goals = []
    localStorage.setItem('goals',JSON.stringify(goals));
    location.reload();
}

function goalcardtoggle(cnt){
    var div = document.querySelector("#chkX"+cnt);
    var btn = document.querySelector("#delbtn"+cnt);
    if (btn.style.display === "none"){
        btn.style.display = "block";
        div.classList.add("border-2");
        div.classList.add("border-blue-800");

      } else{
        btn.style.display = "none";
        div.classList.remove("border-2");
        div.classList.remove("border-blue-800");
      }
}

const deleteGoals = (goals, cnt) => {
    goals.splice(cnt, 1); //(index, deletecount)
    localStorage.setItem('goals', JSON.stringify(goals));
}

function removeGOAL(ind){
    let goals = getGoals();
    deleteGoals(goals,ind);
    location.reload();
}