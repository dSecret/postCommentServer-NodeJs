import express from 'express'
// import axios from 'axios'
import cors from 'cors'
import  bodyParser from 'body-parser'
import upload from 'express-fileupload'

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(upload());


const CDB_URL = "http://localhost:5984"


app.post('/fileupload',(req,res)=>{

	
			console.log("headers")
			res.send("hello")
	})



// 	// //for adding a new post 
	app.post('/addnewpost',(req,res)=>{

		axios.post(`${CDB_URL}/cii-posts`,req.body)
				 .then((resp)=>{
				 		console.log(resp)
				 		res.send(resp)
				  })
				 .catch((err)=>{
				 		res.send(err)
				  })
	})

// 	// 	//for adding a new form
	app.post('/addnewform',(req,res)=>{
		axios.post(`${CDB_URL}/cii-forms`,req.body)
				 .then((resp)=>{
				 		console.log(resp.data)
				 		// const newresp=	JSON.stringify(resp)
				 		return Promise.resolve(resp)

				  }).then((resp)=>{
				  		res.send(resp.data)
				  })
				 .catch((err)=>{
				 		res.send(err)
				  })
	})
	app.get('/addnewform',(req,res)=>{
		axios.post(`${CDB_URL}/test`,{"req.body":"hello"})
				 .then((resp)=>{
				 		console.log(resp.data)
				 		// const newresp=	JSON.stringify(resp)
				 		return Promise.resolve(resp)

				  }).then((resp)=>{
				  		res.send(resp.data)
				  })
				 .catch((err)=>{
				 		res.send(err)
				  })
	})

			//for adding a new form
	app.post('/deleteaform',(req,res)=>{
		console.log(req.body)
		axios.delete(`${CDB_URL}/cii-forms/${req.body.id}?rev=${req.body.rev}`)
				 .then((resp)=>{
				 		console.log(resp.data)
				 		// const newresp=	JSON.stringify(resp)
				 		// return Promise.resolve(resp)
				  		res.send(resp.data)


				  })
				 .catch((err)=>{
				 		res.send(err)
				  })
	})


	// //for retrieving a particular post
	app.get('/getapost/:id', (req, res) => {

			const post_id = req.params.id
			axios.get(`${CDB_URL}/cii-posts/${post_id}`)
				.then((resp) => {
					console.log(resp);
					res.send(resp.data)
				})
				.catch((err) => {
					console.log(err);
					res.send("failed")
				})
	})


	// //for retrieving a particular form
	app.get('/getaform/:id', (req, res) => {

			const post_id = req.params.id
			axios.get(`${CDB_URL}/cii-forms/${post_id}`)
				.then((resp) => {
					console.log(resp);
					res.send(resp.data)
				})
				.catch((err) => {
					console.log(err);
					res.send("failed")
				})
	})

	// //for retrieving all posts from database
	app.get('/getallpost',(req,res) => {

				axios.get(`${CDB_URL}/cii-posts/_all_docs`)
					.then((resp) => {
						var ids = resp.data.rows
						const posts = ids.map(id => {
							return axios.get(`${CDB_URL}/cii-posts/${id.id}`)
										.then(resp => resp.data)
										.catch(err => {})
							})
						return Promise.all(posts)
					})
					.then(posts => {
						res.send(posts)
					})
	})

	console.log("server is runnning @8081")
	//hello man I am listening to port 8081
	app.listen(8081)
