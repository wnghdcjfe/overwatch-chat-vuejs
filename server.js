var path = require('path')
var express = require('express')
var cors = require('cors');
var app = express()
app.use(cors());
var config = require('./config')(); 

var http = require('http').Server(app);
var io = require('socket.io')(http);

var favicon = require('serve-favicon')
var compression = require('compression')
var firebase = require("firebase");

firebase.initializeApp(config);
const chatTable = firebase.database().ref('chat');
var chat = function(type, msg, msgUser, date){
    var postData = {
    type: type,
    msg: msg,
    msgUser: msgUser,
    date: date
  };
  fetch(postData);
} 
var fetch = function(postData){ 
  return chatTable.once('value').then(function (snapshot) {
    var list = snapshot.val();
    list.push(postData);
    chatTable.set(list)
  })
}


app.use(express.static(__dirname + '/dist'));
app.use(favicon(path.join(__dirname, 'dist', 'favicon.ico')))

var onlineUserList = [];
var onlineUserCount = 0;
var exitUser = {};
app.get('/getfirebase', function (req, res) {
  chatTable.once('value').then(function (snapshot) {
    var list = snapshot.val(); 
    res.send(list); 
  }) 
})
io.on('connection', function (socket) {
  socket.on('login', function (user) {
    //이 유저의 socketId는 id가 된다.
    socket.socketId = user.id;
    onlineUserList.push(user);
    onlineUserCount++;

    this.broadcast.emit('login', {
      onlineUserList: onlineUserList,
      onlineUserCount: onlineUserCount,
      user: user
    });
    this.emit('loginSuccess', {
      onlineUserList: onlineUserList,
      onlineUserCount: onlineUserCount
    })
  });
  socket.on('disconnect', function () {
    for (var i = 0; i < onlineUserList.length; i++) {
      if (onlineUserList[i].id === socket.socketId) {
        exitUser = onlineUserList[i];
        onlineUserList.splice(i, 1);
        onlineUserCount--;
        break;
      }
    }
    //나감을 말해준다.
    this.broadcast.emit('logout', {
      onlineUserList: onlineUserList,
      onlineUserCount: onlineUserCount,
      user: exitUser
    });
  })
  //메시지 날리는 모듈 
  socket.on('message', function (obj) { 
    chat(obj.type, obj.msg, obj.msgUser, obj.date)
    this.broadcast.emit('message', obj);
    this.emit('message', obj);
  })
});
var port = process.env.PORT || 8018
http.listen(port, function () {
  console.log("서버가 잘 실행되었다. ", port);
})
