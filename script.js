let savedTheme = localStorage.getItem("ultraTheme");
if(savedTheme){
  document.documentElement.style.setProperty("--theme", savedTheme);
}

setTimeout(()=>{document.getElementById("main").style.display="flex";},2000);

function hideAll(){
  document.querySelectorAll(".screen").forEach(s=>s.style.display="none");
}

function openMenu(){hideAll();document.getElementById("menu").style.display="flex";}
function openNormal(){hideAll();document.getElementById("normalScreen").style.display="flex";renderCalendar();}
function openIslamicMenu(){hideAll();document.getElementById("islamMenu").style.display="flex";}
function goBack(){hideAll();document.getElementById("menu").style.display="flex";}

function openIslamicCalendar(){
  hideAll();
  document.getElementById("islamCalendarScreen").style.display="flex";
}

function openRamzanCard(){
  hideAll();
  document.getElementById("ramzanScreen").style.display="flex";
}

function setTheme(color){
  document.documentElement.style.setProperty("--theme", color);
  localStorage.setItem("ultraTheme", color);
}

let date=new Date();
let events=JSON.parse(localStorage.getItem("ultraEvents"))||{};
let selectedDate=null;

function renderCalendar(){
  let monthYear=document.getElementById("monthYear");
  let daysContainer=document.getElementById("days");
  let history=document.getElementById("history");

  let year=date.getFullYear();
  let month=date.getMonth();
  let firstDay=new Date(year,month,1).getDay();
  let lastDate=new Date(year,month+1,0).getDate();

  monthYear.innerText=date.toLocaleString("default",{month:"long"})+" "+year;
  daysContainer.innerHTML="";
  history.innerHTML="";

  for(let i=0;i<firstDay;i++)daysContainer.innerHTML+="<div></div>";

  for(let i=1;i<=lastDate;i++){
    let fullDate=year+"-"+(month+1)+"-"+i;
    let today=new Date();
    let className="";

    if(i===today.getDate()&&month===today.getMonth()&&year===today.getFullYear())
      className="today";

    if(events[fullDate]){
      className+=" event-day";
      if(events[fullDate].type==="birthday")className+=" birthday";
      history.innerHTML+=`<div>${events[fullDate].title} - ${fullDate} ${events[fullDate].time||""}</div>`;
    }

    daysContainer.innerHTML+=`<div class="${className}" onclick="openModal('${fullDate}')">${i}</div>`;
  }
}

function changeMonth(val){date.setMonth(date.getMonth()+val);renderCalendar();}
function openModal(day){selectedDate=day;document.getElementById("modal").classList.add("active");}
function closeModal(){document.getElementById("modal").classList.remove("active");}

function saveEvent(){
  let title=document.getElementById("eventTitle").value;
  let time=document.getElementById("eventTime").value;
  let type=document.getElementById("eventType").value;
  if(title){
    events[selectedDate]={title,time,type};
    localStorage.setItem("ultraEvents",JSON.stringify(events));
    closeModal();
    renderCalendar();
  }
}

function deleteEvent(){
  delete events[selectedDate];
  localStorage.setItem("ultraEvents",JSON.stringify(events));
  closeModal();
  renderCalendar();
}

function updateClock(){
  document.getElementById("clock").innerText=new Date().toLocaleTimeString();
}
setInterval(updateClock,1000);
renderCalendar();