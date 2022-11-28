function Login()
{
    let password = document.getElementById("pass1").value;
    if(password.length < 5)
    {
    }
    else
    {
        mp.trigger('Auth.Login', password);
    }
}

function Register()
{
    let password = document.getElementById("pass1").value;
    if(password.length < 5)
    {
    }
    else
    {
        mp.trigger('Auth.Register', password);
    }
}

