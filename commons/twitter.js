if (Meteor.isServer) {



  Meteor.methods({
    getMyFriends: function(user_id) {
      var ACCESS_TOKEN = Meteor.user().services.twitter.accessToken
      var ACCESS_TOKEN_SECRET = Meteor.user().services.twitter.accessTokenSecret
      var Twitter = Meteor.npmRequire('twitter')
      var client = new Twitter({
        consumer_key: "rp02I9NlanW0Rt1vC6GA",
        consumer_secret: "0II62Hr66QiOKjmASsexCrzPJChkxon1icm2avyQrvM",
        access_token_key: ACCESS_TOKEN,
        access_token_secret: ACCESS_TOKEN_SECRET
      });

      var async = function(callback){
        client.get('friends/ids', {
          user_id: user_id
        }, function(error, friendList) {
          callback(null,friendList.ids)

        });
      }


      sync = Meteor.wrapAsync(async)
      return sync()
    },
    setMyFriends: function(user_id, friends) {
      console.log(user_id, friends)
      return Meteor.users.update({
        _id: user_id
      }, {
        $set: {
          friends: friends
        }
      })
    }
  })
}
