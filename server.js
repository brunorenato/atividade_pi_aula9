const restify =  require('restify');
const errors = require('restify-errors');

const servidor = restify.createServer({
    name: 'escola',
    version: '1.0.0'
});

servidor.use( restify.plugins.acceptParser(servidor.acceptable) );
servidor.use( restify.plugins.queryParser() );
servidor.use( restify.plugins.bodyParser() );

servidor.listen(8001 , function(){
    console.log("%s executando em %s", servidor.name, servidor.url);
});

var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'atividade1'
    }
});

// lista todos os alunos
servidor.get('/alunos', (req, res, next) => {
    knex('tbl_alunos').then( (dados) =>{
        res.send( dados )
    } , next );

   // res.send("Bem-vindo a nossa Escola!");

});

//adiciona os alunos
servidor.post('/alunos/add', (req, res, next) => {
    knex('tbl_alunos')
    .insert( req.body )
        .then( (dados) =>{
            res.send( dados )
    } , next );

});


//lista um aluno especifico
servidor.get('/alunos/:id', (req, res, next) => {
    const id = req.params.id;
    knex('tbl_alunos')
        .where( 'id' , id )
        .first()
        .then( (dados) =>{
            if( !dados ) {
                return res.send( new errors.BadRequestError( 'Este aluno não foi encontrado' ));
            }
            res.send( dados )
        } , next );

});

//atualiza um aluno
servidor.put('/alunos/update/:id', (req, res, next) => {
    const id = req.params.id;
    knex('tbl_alunos')
        .where( 'id' , id )
        .update( req.body )
        .then( (dados) =>{
            if( !dados ) {
                return res.send( new errors.BadRequestError( 'Este aluno não foi encontrado' ));
            }
            res.send( dados );
        } , next );

});


//delete um aluno
servidor.del('/alunos/delete/:id', (req, res, next) => {
    const id = req.params.id;
    knex('tbl_alunos')
        .where( 'id' , id )
        .del()
        .then( (dados) =>{
            if( !dados ) {
                return res.send( new errors.BadRequestError( 'Este aluno não foi encontrado' ));
            }
            res.send( dados );
        } , next );

});