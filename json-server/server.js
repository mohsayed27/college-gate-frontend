const DELAY = 500;

// server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
//"/api/v1/user/*/signup": "/signup", 
//"/api/v1/user/*/login": "/login", 
//"/api/v1/announcement/me/course/*": "/post-announcement",

/*server.get('/api/v1/course/all', (req, res) => {
    //res.jsonp(req.query)
    console.log(req.path);
})*/

server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
    //console.log(req);
    //console.log(req.headers);
    if (req.method === 'POST') {
        //console.log("POST", req.path);
        if (req.path.includes('/api/v1/announcement/me/course/')) {
            //console.log("HERE");
            //console.log(req.body);
            let courseId = req.path.replace('/api/v1/announcement/me/course/', "");
            setTimeout(() => {
                res.json(
                    {
                        id: Date.now(),
                        professor: {
                            id: "professor0", 
                            name: "Professor Name",
                            imgUrl: "https://picsum.photos/id/1005/100"
                        }, 
                        course: {
                            id: courseId, 
                            name: "Course Title"+courseId.replace("course", "") 
                        }, 
                        content: req.body.content, 
                        date: Date.now()
                    }
                );
            }, DELAY);
        } else if (req.path.includes('/login')) {
            setTimeout(() => {
                res.json(
                    {
                        token: "_TOKEN_"
                    }
                );
            }, DELAY);
        } else if (req.path.includes("/api/v1/message/me/course/")) {
            setTimeout(() => {
                res.json(
                    {
                        message_id: Date.now(),
                        sender: {
                          id: Date.now()*1.5,
                          name: "string",
                          imageUrl: "https://picsum.photos/id/1005/100",
                          type: "string"
                        },
                        reciever: {
                          id: Date.now()*2,
                          name: "string",
                          imgUrl: "string",
                          type: "string"
                        },
                        subject: req.body.subject,
                        content: req.body.content,
                        date: Date.now()
                    }
                );
            }, DELAY);
        } else if (req.path.includes('/enroll')) {
            setTimeout(() => {
                res.json(
                    {
                        Course_id: Date.now(),
                        Name: req.body.name,
                        Image_url: "https://picsum.photos/850/350",
                        Professor: {
                          _id: Date.now()*1.5,
                          Name: "Bahgat Saber",
                          ImgUrl: "https://picsum.photos/id/1005/100"
                        },
                        student: {
                          id: Date.now()*2,
                          name: "",
                          imgUrl: ""
                        }
                    }
                );
            }, DELAY);
        } else if (req.path === '/api/v1/course/me') {
            setTimeout(() => {
                res.json(
                    {
                        Course_id: Date.now(),
                        Name: req.body.name,
                        Image_url: "https://picsum.photos/850/350",
                        Professor: {
                          _id: Date.now()*1.5,
                          Name: "Bahgat Saber",
                          ImgUrl: "https://picsum.photos/id/1005/100"
                        },
                        student: {
                          id: Date.now()*2,
                          name: "",
                          imgUrl: ""
                        }
                    }
                );
            }, DELAY);
        }
    } else {
        setTimeout(next, DELAY);
    }
});
server.use(jsonServer.rewriter(require('./routes.json')));
server.use(router);
server.listen(4000, '192.168.1.198', () => {
    console.log('JSON Server is running');
});