const connection =  require('../db/db')
const nodemailer = require ('nodemailer')

//controladores GET

const inicioGET = (req,res)=> {
	let sql = "SELECT * FROM productos_disponibles"
	connection.query(sql, (err, data)=> {
		if (err) throw err;
		res.render('index', {
		titulo: 'Inicio',
		data : data
	});
	})
	
}

const agregarGET = (req,res)=>{
	res.render('agregar-producto', {
		titulo: 'Agregar Producto'
	});
}


const loginGET = (req,res)=>{
	res.render('login', {
		titulo: 'Login'
	});
}

const contactoGET = (req,res)=> {
	res.render('contacto', {
		titulo: 'Contacto'
	});
	
}

const editarGET = (req,res)=> {
	let sql = "SELECT * FROM productos_disponibles WHERE id=?"
	let id = req.params.id
	connection.query(sql, [id], (err,data)=> {
		if(err)throw err;;
		res.render('editar-producto' , {
		titulo : 'Editar Producto',
		data : data[0]
		
	})
		
	})
	
	
	
}


const productosGET = (req,res)=> {
	let sql = "SELECT * FROM productos_disponibles"
	connection.query(sql, (err,data)=> {
		if(err) throw err;
		res.render('productos' , {
		titulo : 'Seccion de productos',
		data: data
	})
		
		
		
	})
	
	
}

	
const borrarGET = (req,res)=> {
	let sql = "DELETE FROM productos_disponibles WHERE id=?"
	let id = req.params.id
	connection.query(sql, id, (err,data)=> {
		if(err) throw err;
		res.redirect('/')
		
	})
	
}






//controlladores POST

const contactoPOST = (req,res)=> {
const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {	
	user: process.env.USER,
    pass: process.env.PASS
  }
});	
	let data = req.body 
	let mailOptions = {
		from: data.email, 
		to: 'probando@prueba' ,
		subject : data.asunto,
		text : data.comentarios
	}

	transport.sendMail(mailOptions, (err, d) => {
		if(err) {
			
			res.status(500, err.message)
			res.status(500).render('contacto' , {
				mensajeError : `ha ocurrido el siguiente error ${err.message}`
				
			})
		}else {
			
			res.status(200).render('contacto' , {
				mensajeExito : `tu mensaje ha sido enviado correctamente`
			})
		}
		
	})
}

const loginPOST = (req,res)=> {
	
	let username = req.body.username
	let password = req.body.password
	let sql ="SELECT * FROM users WHERE username = ? AND password = ?"
	connection.query(sql, [username, password], (err, data)=> {
		if(err) throw err;
		
		if(data.length>0) {
			
			res.redirect('/')
		}else {
			
			res.render('login', {
				titulo:'Login',
				error: 'Usuario inexistente o incorrecto'
				
				
			})
			
		}
	})

	
}

const agregarPOST = (req,res)=> {
	let cuerpo = req.body
	let sql = "INSERT INTO productos_disponibles SET ?"
	connection.query(sql, [cuerpo], (err,data)=> {
		if(err) throw err;
		res.redirect('/')
	})
	
	
	
}


const editarPOST = (req,res)=> {
	let sql = "UPDATE productos_disponibles SET ? WHERE id=?"
	let cuerpo = req.body
	let id = req.params.id
	connection.query(sql, [cuerpo,id], (err,data)=> {
		if(err) throw err;
		res.redirect('/')
		
	})
	
	
}
	

module.exports = {inicioGET, agregarGET, editarGET, loginGET, contactoGET, contactoPOST, loginPOST, agregarPOST, productosGET, editarPOST, borrarGET}





	
	

