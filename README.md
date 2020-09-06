# Rating-Wiz API
 A REST API which takes in the username, and sends the user's rating and name from different competitive coding websites.
 It uses Puppeteer module, with NodeJS runtime environment.
 ## API usage
  ### Example GET Request
  https://rating-wiz.herokuapp.com/codechef/ishaanmehta
  ### Example JSON Response
  {"name": "Ishaan Mehta", "rating": "1500"}
  
 Just replace "ishaanmehta" with the target username.
 Similar requests can be made for hackerearth or codeforces ratings also.
