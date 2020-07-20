Steps to follow
1. FIrst of all take a clone with repo
2. Install modules with command npm install 
3. THen run command nodemon OR node app.js 
4. Take a dump from https://github.com/manishgandotra74/vumonic-nodejstask/blob/master/Dump20200716.zip
5. Example of APIs are in folder apis/apis.txt
Then as per tasks 
1. Sign in and sign up apis are created and user will get a token which he has to pass for every authentication
2. Create Topic API is created if token of admin is passed then Topic will be created 
3. Create Article API is created if token of admin is passed then Article will be created  
4. Update Article API is created if token of admin is passed then Topic will be updated
5. Fetch Topics api by id , get all fetch topic is created
6. Get Articles for particular API is created 
    Fetch Article by id -- done 
    Count will be increased when get article by id is called 
    Non logged in Users can see Articles other than Featured Articles functionality is implemented
7. Tags are associated while created article or updating
8. Fetch api is made which will relate to articles search tags
9. Created Get Article api with orders 
10. Token will get expired after 5 minutes , user has to again hit auth api after expiration of login 
