async function onReset(e){
    try{
        e.preventDefault();
        var email_=document.getElementById('idr1').value;   
        let myObj={
            email: email_
        };
        if(email_!='' ){
            await axios.post(`${api_endpoint}password/forgotpassword`,myObj)
            alert("Thank you! Please check your email inbox for further instruction.")
        }
    }
    catch(err){
      console.log('Something went wrong',err)
    }     
}
async function onSet(e){
    e.preventDefault();
    try{
        const currentUrl = window.location.href;
    let paramString = currentUrl.split('?')[1];
    let uuid=currentUrl.split('=')[1];
    console.log('User ID:', uuid);
    var password_=document.getElementById('idp1').value;
    await axios.post(`${api_endpoint}password/newpassword`, {uuid: uuid, password:password_})
    alert('Your password has been reset successfully. You can now log in with your new password.')
    window.location.href="../login/login.html"
    }
    catch(err){
        alert('Something went wrong')
    }
    
       
}