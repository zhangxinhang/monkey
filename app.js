var express = require('express');
var cheerio = require('cheerio');
var superagent = require('superagent');

var app = express();

app.get('/', function(req, res, next) {
  superagent.get('https://cnodejs.org/')
    .end(function(err, sres) {
      if (err) {
        return next(err);
      }
      var $ = cheerio.load(sres.text);
      var items = [];
      $('#topic_list .topic_title').each(function(idx, element) {
        var $element = $(element);
        items.push({
          title: $element.attr('title')
        });
      });

      res.send(items);
    });
});


app.get('/login', function(req, res, next) {
  superagent.post('http://www.baixing.com/oz/login')
    .send({
      identity: '13141240566',
      password: '84068648'
        // token: '492d85106a7ad688d317efe7306aa7b3',
        //'8cb44b44cba8fde': '8d3f7a4b571465125966'
    })
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36')
    .end(function(err, sres) {
      if (err) {
        return next(err);
      }
      console.log(sres)
      res.send(sres);
    });
});


app.get('/fabu', function(req, res, next) {
  superagent.post('http://www.baixing.com/fabu/qitazhuanrang/?')
    .send({
      title: 'hello11',
      价格: 10000,
      content: '我的',
      '地区[]': 'm7294',
      具体地点: '京通快速公路',
      contact: '13141240567',
      allowChatOnly: 0,
      token: 'cfbaec3981a17e58c12a90b0bbefa89b',
      '8cb44b44cba8fde': 'a02a9e3e9a1465128460'
    })
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36')
    .set('Cookie', '__trackId=146512377291863; __city=beijing; __uuid=114651237852282.72025; _auth_type=frontendUnknown; login_on_tab=0; wo_weixin_close_count=2; __t=ut575409b87e4f84.54159390; __u=184672995; __c=84da45030326ef7e4992b9917209c89a724900e3; __n=%E5%B0%8F%E7%99%BE%E5%A7%9316060547440; mc=0%2C0%2C0; mui=http%3A%2F%2Fimg6.baixing.net%2Fe7d333f97f8bac0e036edbe80db38500.png_sqwbp; _gat=1; __sense_session_pv=27; _ga=GA1.2.43123012.1465123775; Hm_lvt_5a727f1b4acc5725516637e03b07d3d2=1465123775,1465125266; Hm_lpvt_5a727f1b4acc5725516637e03b07d3d2=1465126626; _auth_redirect=http%3A%2F%2Fbeijing.baixing.com%2Ffabu%2Fqitazhuanrang%2F%3F')
    .end(function(err, sres) {
      if (err) {
        return next(err);
      }
      res.send(sres);
    });
});

app.listen(3000, function() {
  console.log('app is listening at port 3000');
});
