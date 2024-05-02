const  GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy=require("passport-github2").Strategy
const passport=require("passport")
const User=require("..//models/user")
const { v4: uuidv4 } = require('uuid')
const {newToken}=require("..//util/token")

passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.URL}/auth/google/callback`
  },
  async function(accessToken, refreshToken, profile, cb) {
   let user;
   user=await User.findOne({where:{
    email:profile._json.email
  }})
  if(!user){
     user=await User.create({name:profile._json.name, email:profile._json.email,password:uuidv4(),verifya:true})
  }

  const token=newToken(user)

  cb(null,{user,token})

    
  }
));

passport.use(new GitHubStrategy({
    clientID:process.env.GITHUB_CLIENT_ID,
    clientSecret:process.env.GITHUB_CLIENT_SECRET,
    callbackURL: `${process.env.URL}/auth/github/callback`
  },
  async function(accessToken, refreshToken, profile, done) {
    let user;
   user=await User.findOne({where:{
    email:profile._json.login
  }})
  if(!user){
     user=await User.create({name:profile._json.name, email:profile._json.login,password:uuidv4(),verifya:true})
  }


  const token=newToken(user)
  done(null,{user,token})
  }
));

module.exports=passport