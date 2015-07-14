if (Meteor.isServer) {
  Accounts.onCreateUser(function(options, user) {
    user.profile = {}
    user.profile.image = user.services.twitter.profile_image_url
    user.profile.name = options.profile.name
    user._id = user.services.twitter.id
    return user;
  });

  Accounts.onLogin(function(){
    console.log('onLogin')
  })



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
