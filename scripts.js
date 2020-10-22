function validarForm() {
    var nome = document.forms["meuForm"]["txtNome"].value;
    var curso = document.forms["meuForm"]["txtCurso"].value;
    if (nome == "" || curso == "") {
        alert("Os campos nome e curso devem ser preenchidos");
        return false;
    }
} 