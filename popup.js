$(function(){
    chrome.storage.sync.get(['user','email'],function(userinfo){
        if(userinfo.user && userinfo.user != "none"){
            //user is signed in
            $("#btnSignIn").css('display','none');
            $("#email").css('display','none');
            $("#pass").css('display','none');
            $("#userinfo").text(userinfo.email);
        }else{
            //user is not signed in
            $("#btnSignOut").css('display','none');
            $("#btnTakeAttendance").css('display','none');
            $("#userinfo").css('display','none');
        }
    });
    $("#btnSignIn").click(function(){
        var email = $("#email").val();
        var pass = $("#pass").val();
        $("#email").val("");
        $("#pass").val("");
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
        .then((response) => response.json())
        .then(function(json){
            //console.log(json.id);
            const uid = json.id;
            chrome.storage.sync.set({'user':uid,'email':email},function(){

                $("#btnSignOut").css('display','block');
                $("#btnTakeAttendance").css('display','block');
                $("#userinfo").css('display','block');
                $("#userinfo").text("Logged in as "+email);
    
                $("#btnSignIn").css('display','none');
                $("#email").css('display','none');
                $("#pass").css('display','none');
            });
        });
    });
    $("#btnTakeAttendance").click(function(){
        
    });
    $("#btnSignOut").click(function(){
        chrome.storage.sync.set({'user':"none"},function(){

            $("#btnSignOut").css('display','none');
            $("#btnTakeAttendance").css('display','none');
            $("#userinfo").css('display','none');

            $("#btnSignIn").css('display','block');
            $("#email").css('display','block');
            $("#pass").css('display','block');
        });
    });
});