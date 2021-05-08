$(function(){
    //Initialize Popup.html
    chrome.storage.sync.get(['user','email'],function(userinfo){
        if(userinfo.user && userinfo.user != "none"){
            //user is signed in
            $("#btnSignIn").css('display','none');
            $("#email").css('display','none');
            $("#pass").css('display','none');
            $("#userinfo").text("Logged in as "+userinfo.email);
        }else{
            //user is not signed in
            $("#btnSignOut").css('display','none');
            $("#btnTakeAttendance").css('display','none');
            $("#userinfo").css('display','none');
        }
    });

    //Sign in click listener
    $("#btnSignIn").click(function(){
        //console.log(token);
        var email = $("#email").val();
        var pass = $("#pass").val();
        $("#email").val("");
        $("#pass").val("");
        fetch('http://192.168.137.67:8000/api/login', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: pass,
            }),
            headers: {
                'Content-type': 'application/json',
            },
        })
        .then(function(response){
            console.log(response.status);
            return response.json();
        })
        .then(function(json){
            //console.log(json.id);
            if(json.id){
                console.log(json);
                console.log("login successful");
                const uid = json.id;
                chrome.storage.sync.set({'user':uid,'email':email,'token': json.token},function(){

                    $("#btnSignOut").css('display','block');
                    $("#btnTakeAttendance").css('display','block');
                    $("#userinfo").css('display','block');
                    $("#userinfo").text("Logged in as "+email);
        
                    $("#btnSignIn").css('display','none');
                    $("#email").css('display','none');
                    $("#pass").css('display','none');
                });
            }else{
                console.log(json);
                console.log("login failed");
                // close();
            }
        });
    });

    //Take Attendance click listener
    $("#btnTakeAttendance").click(function(){
        chrome.storage.sync.get(['user','token','meetId'],function(res){
            console.log(res);
                    // fetch('http://192.168.137.67:8000/api/login', {
                    //     method: 'POST',
                    //     body: JSON.stringify({
                    //         email: email,
                    //         password: pass,
                    //     }),
                    //     headers: {
                    //         'Content-type': 'application/json',
                    //     },
                    // })
                    fetch('https://jsonplaceholder.typicode.com/posts', {
                        method: 'POST',
                        body: JSON.stringify({
                            title: 'foo',
                            body: 'bar',
                            userId: 1,
                        }),
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                        },
                    })
                    .then(function(response){
                        console.log(response.status);
                        return response.json();
                    })
                    .then(function(json){
                        console.log(json);
                    });
        });
    });

    //Sign Out click listener
    $("#btnSignOut").click(function(){
        chrome.storage.sync.set({'user':"none",'token':"none"},function(){

            $("#btnSignOut").css('display','none');
            $("#btnTakeAttendance").css('display','none');
            $("#userinfo").css('display','none');

            $("#btnSignIn").css('display','block');
            $("#email").css('display','block');
            $("#pass").css('display','block');
        });
    });
});