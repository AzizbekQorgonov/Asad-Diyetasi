function round(val,d=0){const p=Math.pow(10,d);return Math.round(val*p)/p;}
function mifflinStJeor(weight,height,age,gender){const s=gender==='male'?5:-161;return 10*weight+6.25*height-5*age+s;}
function calc(){
  const gender=document.getElementById('gender').value;
  const age=parseFloat(document.getElementById('age').value);
  const weight=parseFloat(document.getElementById('weight').value);
  const height=parseFloat(document.getElementById('height').value);
  const goalWeight=parseFloat(document.getElementById('goalWeight').value);
  const activity=parseFloat(document.getElementById('activity').value);
  const bmr=mifflinStJeor(weight,height,age,gender);
  const tdee=bmr*activity;
  const minFloor=gender==='male'?1800:1600;
  const safeTarget=Math.max(minFloor,tdee*0.85);
  const dailyDef=Math.max(0,tdee-safeTarget);
  const weeklyDef=dailyDef*7;
  const weeklyLoss=Math.min(0.8,weeklyDef/7700);
  const bmi=weight/Math.pow(height/100,2);
  const goalBmi=goalWeight/Math.pow(height/100,2);
  document.getElementById('numbers').innerHTML=`
    <div class="box"><div class="value">${round(bmi,1)}</div><div class="label">Joriy BMI</div></div>
    <div class="box"><div class="value">${round(goalBmi,1)}</div><div class="label">Maqsad BMI</div></div>
    <div class="box"><div class="value">${round(tdee,0)} kcal</div><div class="label">TDEE</div></div>
    <div class="box"><div class="value">${round(safeTarget,0)} kcal</div><div class="label">Kunlik maqsad</div></div>
    <div class="box"><div class="value">${round(weeklyLoss,2)} kg/hafta</div><div class="label">Taxminiy kamayish</div></div>`;
  document.getElementById('advice').innerHTML=`Kunlik maqsad ~${round(safeTarget,0)} kcal. Juda past kaloriyaga tushmang.`;
  window._safeTarget=safeTarget;
}
function genMenu(){
  const target=window._safeTarget||2200;
  const meals=[{n:"Nonushta",o:["Suli + banan","2 ta tuxum + salat","Qatiq smuzi"]},
    {n:"Tushlik",o:["Tovuq + grechka","Baliq + guruch","Sho'rva + salat"]},
    {n:"Tamaddi",o:["Olma + bodom","Qatiq + meva","Sendvich"]},
    {n:"Kechki ovqat",o:["Dimlama","Salat + non","Loviya + sabzavot"]}];
  let html="";for(const m of meals){html+=`<div class="item"><b>${m.n}:</b> ${m.o[Math.floor(Math.random()*m.o.length)]}</div>`;}
  html+=`<div class="item"><b>Kaloriya yo'nalishi:</b> ~${Math.round(target)} kcal</div>`;
  document.getElementById('menuPlan').innerHTML=html;
}
function shopList(){
  const items=["To'liq don non","Tuxum, tovuq","Qatiq","Sabzavot","Meva","Yong'oq","Suv"];
  document.getElementById('shoppingList').innerHTML=items.map(x=>`<div class="item">${x}</div>`).join("");
}
function saveProfile(){const data={gender:gender.value,age:age.value,weight:weight.value,height:height.value,goalWeight:goalWeight.value,activity:activity.value};localStorage.setItem('profile',JSON.stringify(data));alert("Saqlandi");}
function loadProfile(){try{const d=JSON.parse(localStorage.getItem('profile'));if(!d)return;gender.value=d.gender;age.value=d.age;weight.value=d.weight;height.value=d.height;goalWeight.value=d.goalWeight;activity.value=d.activity;}catch(e){}}
// Calorie calculator
let totalKcal=0;
function addFood(){
  const sel=document.getElementById('foodSelect');
  const kcal100=parseFloat(sel.options[sel.selectedIndex].dataset.kcal);
  const gram=parseFloat(document.getElementById('foodGram').value);
  if(!gram||gram<=0)return;
  const kcal=round(kcal100*gram/100,1);
  totalKcal+=kcal;
  document.getElementById('foodList').innerHTML+=`<div class="item">${sel.value} ${gram}g → ${kcal} kcal</div>`;
  document.getElementById('totalKcal').innerText=round(totalKcal,1);
}
document.getElementById('calcBtn').addEventListener('click',calc);
document.getElementById('genPlan').addEventListener('click',genMenu);
document.getElementById('shopList').addEventListener('click',shopList);
document.getElementById('saveBtn').addEventListener('click',saveProfile);
document.getElementById('addFood').addEventListener('click',addFood);
loadProfile();calc();
