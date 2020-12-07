$(document).ready(function(){
    $("#msg").hide();
    $("#vencedor").hide();
    $("#limite").hide();
    $("#vez-jogador").fadeOut('slow');
    $("#jogador1").val('').focus();
});

var player1;
var player2;
var limit_number;
var aleatorio;
var player1_ganhos = 0;
var player2_ganhos = 0;
var tentativas;
var jogador;
var id_tabela = 1;
var chute;

$('#jogador1').keypress(function(e) {
    if(e.which == 13) {
        e.preventDefault();
        $("#registrar").click();
        return false;
    }
});
$('#jogador2').keypress(function(e) {
    if(e.which == 13) {
        e.preventDefault();
        $("#registrar").click();
        return false;
    }
});
$('#numero_limite').keypress(function(e) {
    if(e.which == 13) {
        e.preventDefault();
        $("#registrar").click();
        return false;
    }
});
$('#chute').keypress(function(e) {
    if(e.which == 13) {
        e.preventDefault();
        $("#verificar").click();
        return false;
    }
});
$('#novo-chute').keypress(function(e) {
    if(e.which == 13) {
        e.preventDefault();
        $("#novamente").click();
        return false;
    }
});

function tabelaJogadores(){
    $("#inserir-jogador").fadeOut('slow',function(){
        setTimeout(function(){
            $("#inserir-jogador").html('');
            $("#inserir-jogador").append("<tr>");
            $("#inserir-jogador").append("<th scope='row'>" + 1 + "</th>");
            $("#inserir-jogador").append("<td>" + player1 + "</td>");
            $("#inserir-jogador").append("<td>" + player1_ganhos + "</td>");
            $("#inserir-jogador").append("</tr>");
            $("#inserir-jogador").append("<tr>");
            $("#inserir-jogador").append("<th scope='row'>" + 2 + "</th>");
            $("#inserir-jogador").append("<td>" + player2 + "</td>");
            $("#inserir-jogador").append("<td>" + player2_ganhos + "</td>");
            $("#inserir-jogador").append("</tr>");
            $("#inserir-jogador").fadeIn('slow');
        },1000);
    });
}

function tabelaJogo(){
    $("#chute").val('').focus();
    $("#anotacao").append("<tr>");
    $("#anotacao").append("<th scope='row'>" + id_tabela + "</th>");
    $("#anotacao").append("<td>" + jogador + "</td>");
    $("#anotacao").append("<td>" + chute + "</td>");
    $("#anotacao").append("</tr>");
    id_tabela++
}

function numeroAleatorio(){
    aleatorio = Math.floor(Math.random() * limit_number);
}

$("#registrar").click(function(){
    player1 = $("#jogador1").val();
    player2 = $("#jogador2").val();
    limit_number = $("#numero_limite").val();
    if(player1 != "" && player2 != "" && limit_number != ""){
        $("#form-registro").css("display","none");
        //Mostra Os Items Para Começar O Jogo
        $("#tabela-jogo").css("display","block");
        $("#limite").addClass('alert-dark').html('Adivinhe Um Número De 0 á '+limit_number).fadeIn('slow');
        $("#form-tentativa").css("display","block");
        $("#tabela-jogadores").css("display","block");
        //Insere Os Jogadores Na Tabela
        tabelaJogadores();
        //Mensagem De Registro Com Sucesso
        $("#msg").addClass('alert-success').html('Jogo Registrado Com Sucesso!').fadeIn('slow',function(){
            setTimeout(function(){
                $("#msg").fadeOut('slow').removeClass('alert-success');
            },2000);
        });
        numeroAleatorio();
        jogador = player1;
        $("#vez-jogador").html('É a vez do jogador '+jogador).fadeIn('slow');
    }
    else{
        $("#msg").addClass('alert-danger').html('Insira Algo Nos Campos!').fadeIn('slow',function(){
            setTimeout(function(){
                $("#msg").fadeOut('slow').removeClass('alert-danger');
            },2000);
        });
    }
    $("#chute").val('').focus();
});

$("#verificar").click(function(){
    chute = $("#chute").val();
    tabelaJogo();
    if(chute>aleatorio){
        $("#msg").addClass('alert-info').html('Tente Um Número Menor').fadeIn('slow',function(){
            setTimeout(function(){
                $("#msg").fadeOut('slow').removeClass('alert-info');
            },2000);
        });
    }
    else if(chute<aleatorio){
        $("#msg").addClass('alert-info').html('Tente Um Número Maior').fadeIn('slow',function(){
            setTimeout(function(){
                $("#msg").fadeOut('slow').removeClass('alert-info');
            },2000);
        });
    }
    else{
        $("#vencedor").addClass('alert-warning').html('Muito Bem '+jogador+' Você Venceu!!!').fadeIn('slow');
        $("#jogar-novamente").css("display","block");
        $("#form-tentativa").css("display","none");
        $("#limite").css("display","none");
        if(jogador==player1){
            player1_ganhos++
            tabelaJogadores();
        }
        else{
            player2_ganhos++
            tabelaJogadores();
        }
    }
    jogador = jogador === player1 ? player2:player1;
    $("#vez-jogador").html('É a vez do jogador '+jogador).fadeIn('slow');
    $("#novo-chute").val('').focus();
});

$("#novamente").click(function(){
    $("#anotacao").html('');
    id_tabela = 0;
    limit_number = $("#novo-chute").val();
    numeroAleatorio();
    $("#vencedor").fadeOut('slow').removeClass('alert-warning');
    $("#form-tentativa").css("display","block");
    $("#jogar-novamente").css("display","none");
    $("#limite").fadeOut('slow').removeClass('alert-info');
    $("#limite").addClass('alert-dark').html('Adivinhe Um Número De 0 á '+limit_number).fadeIn('slow');
    $("#msg").addClass('alert-success').html('Sucesso!, Jogo Iniciado Novamente Com Um Novo Limite De 0 á '+limit_number).fadeIn('slow',function(){
        setTimeout(function(){
            $("#msg").fadeOut('slow').removeClass('alert-success');
        },4000);
    });
    $("#limpador").addClass('alert-success').html('Tabela Limpada Com Sucesso!').fadeIn('slow',function(){
        setTimeout(function(){
            $("#limpador").fadeOut('slow').removeClass('alert-success');
        },4000);
    });
    $("#chute").val('').focus();
});