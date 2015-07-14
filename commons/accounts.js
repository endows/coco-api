if (Meteor.isServer) {
  Accounts.onCreateUser(function(options, user) {
    user.profile = {}
    user.profile.image = user.services.twitter.profile_image_url
    user.profile.name = options.profile.name
    user._id = user.services.twitter.id
    var async = function(callback) {
      Meteor.call('getMyFriends',user.services.twitter.id, function(e, result) {
        user.profile.friends = result
        callback(null,user)
      })
    }
    var sync = Meteor.wrapAsync(async)
    return sync()
  });


  Meteor.startup(function() {
    ServiceConfiguration.configurations.remove({
      service: "twitter"
    })
    ServiceConfiguration.configurations.insert({
      "service": "twitter",
      "consumerKey": "rp02I9NlanW0Rt1vC6GA",
      "secret": "0II62Hr66QiOKjmASsexCrzPJChkxon1icm2avyQrvM"
    })
  })
}
