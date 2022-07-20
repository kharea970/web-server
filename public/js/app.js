

console.log('this is client side js');

const weatherform =  document.querySelector('form');
const search =  document.querySelector('input');
const msg1 =  document.querySelector('#msg1');
const msg2 =  document.querySelector('#msg2');
weatherform.addEventListener('submit',(event)=>{
    event.preventDefault();//prevent browser from reloding while submiting
    const location = search.value;
    console.log(location)
    msg1.textContent="loading.....";
    msg2.textContent="";
    fetch(`http://localhost:3000/weather?address=${location}`).then((res)=>{
    res.json().then((data)=>{
        if(data.error){
            msg1.textContent=data.error;
        }else{
            msg1.textContent=data.location;
            msg2.textContent=data.weather;
            console.log(data);
        }
    })
})

})