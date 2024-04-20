async function onlogin(e){
    try{
        e.preventDefault();
        var email_=document.getElementById('idx1').value;
        var password_=document.getElementById('idx2').value;
       
        let myObj={
            email: email_,
            password: password_
        };
        if(email_!='' && password_!='' ){
            const res= await axios.post(`${api_endpoint}login-user`,myObj)
                alert(res.data.message)
                localStorage.setItem('token', res.data.token)
                window.location.href="../expenseTracker/expense.html"               
        }
        else{
            alert('Please fill the empty fields!') 
        }
    }
    catch(err){
      console.log('Something went wrong',err)
      alert(err.response.data.message)
    }     
}
document.getElementById('idx3').onclick= function(e){
     window.location.href="../reset/reset.html"

}