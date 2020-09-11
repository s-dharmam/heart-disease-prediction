

function getvalue() {
    let obj = {};
    let age = document.getElementById('age').value; 
    let sex = document.getElementById('sex').value; 
    let cp = document.getElementById('cp').value; 
    let trestbps = document.getElementById('trestbps').value; 
    let chol = document.getElementById('chol').value; 
    let fbs = document.getElementById('fbs').value; 
    let restecg = document.getElementById('restecg').value; 
    let thalach = document.getElementById('thalach').value; 
    let exang = document.getElementById('exang').value; 
    let oldpeak = document.getElementById('oldpeak').value; 
    let slope = document.getElementById('slope').value; 
    let ca = document.getElementById('ca').value; 
    let thal = document.getElementById('thal').value;
    obj.age=age;
    obj.sex=sex;
    obj.cp=cp;
    obj.trestbps=trestbps;
    obj.chol=chol;
    obj.fbs=fbs;
    obj.restecg=restecg;
    obj.thalach=thalach;
    obj.exang=exang;
    obj.oldpeak=oldpeak;
    obj.slope=slope;
    obj.ca=ca;
    obj.thal=thal;
    
    console.log("obj:", obj);
    postData('http://127.0.0.1:5000/home', obj)
        .then(data => {
           
            alert("person is "+data.toFixed()+"% likely to get heart disease")
        });
}
async function postData(url = '', data = {}) {
    console.log(data);
    const response = await fetch(url, {
        method: 'POST', 
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer', 
        body: JSON.stringify(data) 
    });
    console.log(response);
    return response.json(); 
}