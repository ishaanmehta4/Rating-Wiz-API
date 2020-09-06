var express = require("express");
// const Nightmare = require('nightmare')
// const nightmare = Nightmare({ show: false, gotoTimeout: 50000 })
var cors = require('cors');
const { json } = require("express");
var app = express();

app.all('*', function (req, res, next) {
    var origin = req.get('origin');
    res.header('Access-Control-Allow-Origin', origin);
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
// app.use(cors());
var done = 0;
var intro = 'Welcome to rating-wiz API.       EXAMPLE REQUEST: https://rating-wiz.herokuapp.com/codechef/ishaanmehta        ';
intro += 'EXAMPLE RESPONSE (JSON): {"name": "Ishaan Mehta", "rating": "1500"}       '
intro += 'Replace "ishaanmehta" with the target username.        Similar requests can be made for hackerearth or codeforces ratings also.';
intro += '       Developed and managed by Ishaan Mehta       ishaanmehta4@gmail.com'
app.get("/", (req, res, next) => {
    res.send(intro)
});

app.get("/ishaan", (req, res, next) => {
    res.send('Path tested.')
});

app.get("/hackerrank/:id", (req, res, next) => {
    hr(req.params.id, res);
});

app.get("/hackerearth/:id", (req, res, next) => {
    he(req.params.id, res);
});

app.get("/codechef/:id", (req, res, next) => {
    cf(req.params.id, res);
});

app.get("/codeforces/:id", (req, res, next) => {
    cforces(req.params.id, res);
});

app.get('/codechefcontest/:code/:institute', (req, res, next) => {
    top10(req.params.code, req.params.institute, res);
});

app.get("*", (req, res, next) => {
    res.send("Invalid request!!!    " + intro)
});


async function hr(user, res) {

    console.log(user + ' req')
    const puppeteer = require('puppeteer');
    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", '--disable-setuid-sandbox']
    });
    const tab = await browser.newPage();
    await tab.goto('https://www.hackerrank.com/profile/' + user);
    // await tab.waitForSelector('#hacker-contest-score',{timeout: 45000});
    await tab.waitFor('#hacker-contest-score');
    // await tab.waitFor(5000);
    userobj = await tab.evaluate(() => {
        var rating = document.querySelector(' #hacker-contest-score').innerHTML;
        var name = document.querySelector('#content > div > div > div > div.community-content > article > div > div.profile-sidebar > div > h1').innerHTML;
        // console.log (name + ":" + rating);
        var obj = { ['name']: name, ['rating']: rating };
        console.log(obj);
        return obj;
    })
    res.send(JSON.stringify(userobj))
    // res.end()
    console.log(userobj, user)
    // clearInterval(sendblank)

    await browser.close();
}

async function cf(user, res) {

    console.log(user + ' req')
    const puppeteer = require('puppeteer');
    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", '--disable-setuid-sandbox']
    }); const tab = await browser.newPage();
    await tab.goto('https://www.codechef.com/users/' + user);
    // await tab.waitFor('#hacker-contest-score');
    userobj = await tab.evaluate(() => {
        var rating = document.querySelector('.rating-number').innerHTML;
        var name = document.querySelector('body > main > div > div > div > div > div > header > h2').innerHTML;
        // console.log (name + ":" + rating);
        var obj = { ['name']: name, ['rating']: rating };
        console.log(obj);
        return obj;
    })
    res.send(JSON.stringify(userobj))
    // res.end()
    console.log(userobj, user)
    // clearInterval(sendblank)
    await browser.close();
}


async function he(user, res) {

    console.log(user + ' req')
    const puppeteer = require('puppeteer');
    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", '--disable-setuid-sandbox']
    }); const tab = await browser.newPage();
    await tab.goto('https://www.hackerearth.com/@' + user);
    // await tab.waitFor('#hacker-contest-score');
    userobj = await tab.evaluate(() => {
        var rating = document.querySelector('body > div.page > div.layout-1 > div.left > div.link-section.standard-margin > div:nth-child(5) > span.track-following-num > a').innerHTML;
        var name = document.querySelector('.name').innerHTML;
        // console.log (name + ":" + rating);
        var obj = { ['name']: name, ['rating']: rating };
        console.log(obj);
        return obj;
    })
    res.send(JSON.stringify(userobj))
    // res.end()
    console.log(userobj, user)
    // clearInterval(sendblank)
    await browser.close();
}

async function cforces(user, res) {

    console.log(user + ' req')
    const puppeteer = require('puppeteer');
    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", '--disable-setuid-sandbox']
    }); const tab = await browser.newPage();
    await tab.goto('https://codeforces.com/profile/' + user);
    // await tab.waitFor('#hacker-contest-score');
    userobj = await tab.evaluate(() => {
        var rating = document.querySelector('#pageContent > div:nth-child(3) > div.userbox > div.info > ul > li:nth-child(1) > span').innerHTML;
        var name = document.querySelector('.main-info>h1>a').innerText;
        // console.log (name + ":" + rating);
        var obj = { ['name']: name, ['rating']: rating };
        console.log(obj);
        return obj;
    })
    res.send(JSON.stringify(userobj))
    console.log(userobj, user)
    // clearInterval(sendblank)
    await browser.close();
}

async function top10(code,ins,res)
{
    code=code.toUpperCase()
    const puppeteer=require('puppeteer')
    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", '--disable-setuid-sandbox']
    }); const tab = await browser.newPage();
    await tab.goto('http://www.codechef.com/rankings/'+code+'?filterBy=Institution%3D'+ins+'&order=asc&sortBy=rank')
    await tab.waitFor(1000)
    await tab._client.send("Page.stopLoading");
    userobj= await tab.evaluate(()=>{
        obj={}
        var cname=document.querySelector('#breadcrumb > div > a:nth-child(2)').innerHTML
        obj['contestname']=cname;
        var name = document.querySelectorAll(' div.user-name > a > span:nth-child(2)');
        var score=document.querySelectorAll(' td:nth-child(3) > div');
        
        for(i=0;i<10;i++){
            obj[name[i].innerHTML]= score[i].innerHTML
            // total+= score[i].innerHTML
            }
            return obj;
    })
    res.send(userobj)
    
    await browser.close();

}

// http://localhost:5000/codechefcontest/JULY20B/Indian%20Institute%20of%20Information%20Technology%2C%20Surat
app.listen((process.env.PORT || 5000), () => {
    console.log("Server running on port 5000 Yayyyy");
});

