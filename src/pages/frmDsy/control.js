const idQuantidadeDeAlertas = getLocalStorage("repeation") ?? {};

//////////////////////*CLASSE ALERTA*\\\\\\\\\\\\\\\\\\\\\\\\\

class Alerta {
  constructor() {
    this.id = null;
    this.quant = 1;
    this.audit = false;
    this.arrayAlerts = [];
    this.arrayAudit = [];
  }

  search(id) {
    alert(`Buscando ID - ${id}`);
  }

  delete(id) {
    const clearAlerta = this.arrayAlerts.find((a) => a.id === id);
    alert( `Deletando ID - ${id}\n Alerta encontrado: ${clearAlerta.licensePlate}
    `
    );
    
  }

  save() {
    let myalert = this.readData();
    if (this.checkField(myalert)) {
      this.addAlert(myalert);
    }
    // this.addAlert(alert);
  }

  saveLocalStorage(nivel) {
    let myalert = this.readData(nivel);

    if (localStorage.myArray) {
      this.arrayAlerts = JSON.parse(localStorage.getItem("myArray"));
      //this.id = localStorage.getItem('myArray').id;
      console.log('Atualiza "ID": ', this.id);
    }

    if (this.checkField(myalert)) {
      let newItem = myalert;
      this.addAlert(newItem);
    }
    localStorage.myArray = JSON.stringify(this.arrayAlerts);
    return myalert;
  }

  clear() {
    alert("Limpando os Dados");
  }

  edit() {
    alert("Editando os Dados");
    //let siderBar = document.getElementById('siderBar');
  }

  addAlert(myalert) {
    this.arrayAlerts.push(myalert);
    myalert.id  = this.arrayAlerts.length;//id
    let tempCount = 1;
    if(this.arrayAlerts.length > 1){
      tempCount = this.equals(myalert);
      //alert(` add - Quantidate total: ${tempCount}`);
    }
    let listYawn = this.arrayAlerts.filter(function(yawn){
      return yawn.type === 'BOCEJO';
    });

    salvarLocalStorage("yawn", listYawn);
    salvarLocalStorage("score", tempCount);

    //console.log(`Objeto: ${JSON.stringify(myalert)}`);
    //console.log('Array: ', this.arrayAlerts);
  }

  equals(obj1){
    let count = 1;
    
    const arrayObjAux = getLocalStorage('myArray').filter((obj2) => {
      return obj2.type === obj1.type;
    });
    console.log('contagem lista..');
    
    const arrayPlateAux = arrayObjAux.filter((obj) => {
      count++;
      return obj.licensePlate === obj1.licensePlate;
    });       
    return arrayPlateAux.length += 1;
  }
  
  readData(nivel) {
    var currentDate = new Date();
    var hour = currentDate.getHours();
    var minutes = currentDate.getMinutes();

    let year = currentDate.getFullYear();
    let month = currentDate.getMonth()+1;
    let day = currentDate.getDate();

    if (month < 10) {
    month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    var warning = {}; // recebe obj vazio in start
    
    warning.id = this.id;
    warning.type = document.getElementById("autocomplete-alerta").value;
    warning.licensePlate = document.getElementById("placa").value;
    warning.nivel = nivel;
    warning.operation = document.getElementById("autocomplete-filial").value;
    warning.quant = this.quant; //document.getElementById("qtd_bocejo").value;
    warning.myHour = `${hour}:${minutes}`;
    warning.audit = this.audit;
    warning.date = `${year}-${month}-${day}`;
    
    warning.type = warning.type.toUpperCase();
    warning.licensePlate = warning.licensePlate.toUpperCase();
    warning.operation = warning.operation.toUpperCase();

    /*var rp = this.countDuplicatesByKeys('type', 'licensePlate');
    alert(`Repetição: ${JSON.stringify(rp,null,2)}`);*/

    return warning;
  }

  checkField(myalert) {
    let myMsg = "";

    if (myalert.type === "") {
      myMsg += "- Informe o tipo do alerta.\n";
    }
    if (myalert.licensePlate === "") {
      myMsg += "- Informe a placa do veículo.\n";
    }
    if (myalert.operation === "") {
      myMsg += "- Informe o nome da filial.\n";
    }

    if (myMsg != "") {
      alert(myMsg);
      return false;
    }

    return true;
  }

  menu() {
    alert("Abrindo menu..");
  }

  countDuplicatesByKeys(key1) {
    let array = getLocalStorage('yawn');
    const counts = {};
    
    for (const item in array) { // deu erro dia 08/10/23 troquei of para in
      const key = item[key1];
      
      /*const keyValue2 = item[key2];
      const keyPair = `${keyValue1}-${keyValue2}`;*/
      
      //let count = (counts[arrumaQuant.id] || 0) + 1;
      //counts[key] = count;
      
      counts[key] = (counts[key] || 0) + 1;
      
    }
    salvarLocalStorage('countsYawn',counts);
    return counts;
  }

  showAudit() {
    if (localStorage.audit) {
      this.arrayAudit = JSON.parse(localStorage.getItem("audit"));
    }

    localStorage.audit = JSON.stringify(this.arrayAudit, null, 3);
    document.getElementById("myAudit").innerHTML = this.arrayAudit;
  }
}

var myAudit = 0;

 if(document.getElementById("qtd_bocejo").value === 'Bocejo'){
      alert('BOCEJO DETECTADO>>>');
  }

function incrementarQuantidadeAlerta(idAlerta) {
  idQuantidadeDeAlertas[idAlerta]++;
  salvarLocalStorage("repeation", idQuantidadeDeAlertas);
}


//localStorage.setItem('audit', myAudit); 25/08/2023
var objAlerta = new Alerta();

//objAlerta.showAudit();

let placa = "XXXXX",
  filial = "----",
  qtd_bocejo = 1;

let myPlaca = `${placa}`,
  myFilial = `${filial}`,
  myQtdBocejo = `${qtd_bocejo}`;

var enviar = false;
const alerta = {
  bocejo:
    "Evento de Bocejo, conforme segue foto abaixo. " +
    "Motorista bocejando diversas vezes, aparentando sonolência. \n\n" +
    "Favor verificar a condição do motorista, para seguir viagem.\n\n",
  FadigaN1:
    "Evento de Fadiga N1, conforme segue foto abaixo.\n\n" +
    "Favor comunicar, instruir e solicitar a parada do motorista por 30 minutos em um local seguro.\n\n",
  FadigaN2:
    "Evento de Fadiga N2, conforme segue foto abaixo.\n\n" +
    "Favor comunicar, instruir e solicitar a parada do motorista por 60 minutos em um local seguro.\n\n",
  atencao:
    "Evento de Atenção, conforme segue foto abaixo. " +
    "Motorista desviando a atenção durante a condução.\n\n " +
    "Favor comunicar, instruir e Tratar junto ao responsável.\n\n",
  ausencia:
    "Evento de Ausência, conforme segue foto abaixo. " +
    "Favor solicitar Reposicionamento da câmera.\n\n" +
    "Motorista desviando seu rosto do foco da câmera.\n\n",
  celular:
    "Evento de utilização de Celular, conforme segue foto abaixo.\n" +
    "Favor comunicar, instruir e tratar junto ao responsável.\n" +
    "De acordo com o artigo 252 do Código de Trânsito Brasileiro (CTB), é proibido usar o celular ao volante," +
    "mesmo com os fones de ouvido.",
  cameraCoberta:
    "Evento de Câmera Coberta, conforme segue foto abaixo.\n" +
    "Favor comunicar, instruir desobstrução da Câmera e Tratar junto ao responsável. ",
  cigarro:
    "Evento de Cigarro, conforme segue foto abaixo.\n" +
    "Motorista infringindo as normas da empresa.\n" +
    "Favor comunicar, instruir e tratar junto ao responsável.",
  gestoObceno:
    "Evento de Atenção, conforme segue foto abaixo.\n" +
    "Motorista fazendo gestos obscenos.\n\n" +
    "Favor comunicar, instruir e tratar junto ao responsável. ",
  palavraBC:
    "Evento de Atenção, conforme segue foto abaixo." +
    "Motorista citando palavras de baixo calão.\n\n" +
    "Favor comunicar, instruir e tratar junto ao responsável. ",
  semCinto:
    "Evento de Atenção, Conforme segue foto abaixo.\n\n" +
    "Motorista não está utilizando o cinto de segurança.\n\n" +
    "Favor comunicar, instruir a utilização do Cinto e tratar junto ao responsável.\n\n" +
    "Art. 167\n" +
    "Deixar o condutor de usar o cinto de segurança, conforme previsto no art. 65:\n" +
    "Infração – grave;\n" +
    "Penalidade – multa - R$ 195,23 e 5 pontos;\n" +
    "Medida administrativa - retenção do veículo até colocação do cinto pelo infrator.\n",
  undefined: "O tipo de alerta não existe. ",
};

/*
    Ajsute tecnico para usar no e-mail Outlook
*/

const email = {
  anglo: {
    group: `bernardo@expressonepomuceno.com.br
brunocosta@expressonepomuceno.com.br
diegoferrara@expressonepomuceno.com.br 
guilhermesouza@expressonepomuceno.com.br
gustavobarbosa@expressonepomuceno.com.br 
kamillaborges@expressonepomuceno.com.br
 lindomarpedroso@expressonepomuceno.com.br
millareis@expressonepomuceno.com.br
 robsoncandeia@expressonepomuceno.com.br
 rogeriosilva@expressonepomuceno.com.br
  wemersondrumond@expressonepomuceno.com.br
`,
    assunto: "Alerta CCI Fadiga",
  },
  bracell: {
    group: `guilhermesouza@expressonepomuceno.com.br
gridbracell@expressonepomuceno.com.br
millareis@expressonepomuceno.com.br
odairjose@expressonepomuceno.com.br
uadsonbittencourt@expressonepomuceno.com.br
wemersondrumond@expressonepomuceno.com.br
guilhermeferracini@expressonepomuceno.com.br
demetriojunior@expressonepomuceno.com.br
pauloroberto@expressonepomuceno.com.br
`,
    assunto: "Alerta CCI Fadiga",
  },
  cenibra: {
    group: `alberonerodrigues@expressonepomuceno.com.br
anaclaudia@expressonepomuceno.com.br
aprendizdecamcnb@expressonepomuceno.com.br
cesardias@expressonepomuceno.com.br
julialima@expressonepomuceno.com.br
leilapereira@expressonepomuceno.com.br
leticiaoliveira@expressonepomuceno.com.br
millareis@expressonepomuceno.com.br
verlanemachado@expressonepomuceno.com.br
wasnhingtonluiz@expressonepomuceno.com.br
wesleyamorin@expressonepomuceno.com.br
wemersondrumond@expressonepomuceno.com.br
rafaelcosta@expressonepomuceno.com.br
tatiane.almeida@expressonepomuceno.com.br
kaironcoelho@expressonepomuceno.com.br
elisianerodrigues@expressonepomuceno.com.br
wilsonsilva@expressonepomuceno.com.br
`,
    assunto: "Alerta CCI Fadiga",
  },
  cmpc: {
    group: `andrienigoulart@expressonepomuceno.com.br 
cristianopedroso@expressonepomuceno.com.br
joaopaulo@expressonepomuceno.com.br
logisticaguaiba@expressonepomuceno.com.br
millareis@expressonepomuceno.com.br
ubirajaracruz@expressonepomuceno.com.br
yurisilva@expressonepomuceno.com.br
`,
    assunto: "Alerta CCI Fadiga",
  },
  costaRica: {
    group: `alecksandersilva@expressonepomuceno.com.br
cesareler@expressonepomuceno.com.br
cristhianmelo@expressonepomuceno.com.br
fabianasantos@expressonepomuceno.com.br
luizferreira@expressonepomuceno.com.br
marciooliveira@expressonepomuceno.com.br
marcosvaz@expressonepomuceno.com.br
maurosoares@expressonepomuceno.com.br
millareis@expressonepomuceno.com.br
pauloroberto@expressonepomuceno.com.br
wellingtonesiquio@expressonepomuceno.com.br
ccocostarica@expressonepomuceno.com.br
wemersondrumond@expressonepomuceno.com.br
danielfaria@expressonepomuceno.com.br
luizdantas@expressonepomuceno.com.br
`,
    assunto: "Alerta CCI Fadiga",
  },
  furlan: {
    group: `guilhermesouza@expressonepomuceno.com.br
julionascimento@expressonepomuceno.com.br
millareis@expressonepomuceno.com.br
setorcontrole@expressonepomuceno.com.br
rafael.alcantara@expressonepomuceno.com.br
oliviomartins@expressonepomuceno.com.br
wemersondrumond@expressonepomuceno.com.br
pauloroberto@expressonepomuceno.com.br
`,
    assunto: "Alerta CCI Fadiga",
  },
  aracruz: {
    group: `carinasouza@expressonepomuceno.com.br
cpmaracruz@expressonepomuceno.com.br
gestaofadigaaracruz@expressonepomuceno.com.br
millareis@expressonepomuceno.com.br
wesleygregorio@expressonepomuceno.com.br
wemersondrumond@expressonepomuceno.com.br
andrebrito@expressonepomuceno.com.br
antoniomezarde@expressonepomuceno.com.br
tatiane.almeida@expressonepomuceno.com.br
`,
    assunto: "Alerta CCI Fadiga",
  },
  limeira: {
    group: `guilhermesouza@expressonepomuceno.com.br
brunosantos@expressonepomuceno.com.br
 millareis@expressonepomuceno.com.br
odairjose@expressonepomuceno.com.br 
pauloroberto@expressonepomuceno.com.br
ryllarypaulo@expressonepomuceno.com.br
josepadela@expressonepomuceno.com.br
operacaolimeira@expressonepomuceno.com.br 
wemersondrumond@expressonepomuceno.com.br
viniciuscontesini@expressonepomuceno.com.br
`,
    assunto: "Alerta CCI Fadiga",
  },
  seteLagoas: {
    group: `alicesantos@expressonepomuceno.com.br
cpmdesvios@expressonepomuceno.com.br
cpmsuzanosetelagoas@expressonepomuceno.com.br
grazielamelo@expressonepomuceno.com.br
millareis@expressonepomuceno.com.br
deborasouza@expressonepomuceno.com.br
wemersondrumond@expressonepomuceno.com.br
marcossouza@expressonepomuceno.com.br
flaviocunha@expressonepomuceno.com.br
kaironcoelho@expressonepomuceno.com.br
tatiane.almeida@expressonepomuceno.com.br
`,
    assunto: "Alerta CCI Fadiga",
  },
  mmi: {
    group: `andrerezende@expressonepomuceno.com.br
tatiane.almeida@expressonepomuceno.com.br
edersonoliveira@expressonepomuceno.com.br
sidneyrossetti@expressonepomuceno.com.br
rilenovalentim@expressonepomuceno.com.br
wemersondrumond@expressonepomuceno.com.br
millareis@expressonepomuceno.com.br
bernardo@expressonepomuceno.com.br
ccommi@expressonepomuceno.com.br
anaavelino@expressonepomuceno.com.br
jonathanviana@expressonepomuceno.com.br
`,
    assunto: "Alerta CCI Fadiga",
  },
  tresLagoas: {
    group: `alexkovacs@expressonepomuceno.com.br
danielamercadante@expressonepomuceno.com.br
grid_ts2@expressonepomuceno.com.br
guilhermeferracini@expressonepomuceno.com.br
millareis@expressonepomuceno.com.br
pauloroberto@expressonepomuceno.com.br
silvanovieira@expressonepomuceno.com.br
leandrozillmer@expressonepomuceno.com.br
heitorreis@expressonepomuceno.com.br
wemersondrumond@expressonepomuceno.com.br
matheusrezende@expressonepomuceno.com.br
`,
    assunto: "Alerta CCI Fadiga",
  },
  zilor: {
    group: `rafael.alcantara@expressonepomuceno.com.br
eduardosalioni@expressonepomuceno.com.br
pedrocosta@expressonepomuceno.com.br
trafegozilor@expressonepomuceno.com.br
julionascimento@expressonepomuceno.com.br
guilhermesouza@expressonepomuceno.com.br
millareis@expressonepomuceno.com.br
wemersondrumond@expressonepomuceno.com.br
pauloroberto@expressonepomuceno.com.br
`,
    assunto: "Alerta CCI Fadiga",
  },
};

function chooseEmail(op) {
  //var destinatario = {};
  switch (op) {
    case "Anglo":
      document.getElementById(
        "fdest"
      ).innerHTML = `${email.anglo.assunto} - ${op}`;
      break;
    case "Aracruz":
      document.getElementById(
        "fdest"
      ).innerHTML = `${email.aracruz.assunto} - ${op}`;
      break;
    case "Bracell":
      document.getElementById("fdest").innerHTML = `${
        email.bracell.assunto
      } - ${op.toUpperCase()}`;
      break;
    case "Cenibra":
      document.getElementById("fdest").innerHTML = `${
        email.cenibra.assunto
      } - ${op.toUpperCase()}`;
      break;
    case "Cmpc":
      document.getElementById("fdest").innerHTML = `${
        email.cmpc.assunto
      } - ${op.toUpperCase()}`;
      break;
    case "Costa Rica":
      document.getElementById(
        "fdest"
      ).innerHTML = `${email.costaRica.assunto} - ${op}`;
      break;
    case "Furlan":
      document.getElementById(
        "fdest"
      ).innerHTML = `${email.furlan.assunto} - ${op}`;
      break;
    case "Limeira":
      document.getElementById(
        "fdest"
      ).innerHTML = `${email.limeira.assunto} - ${op}`;
      break;
    case "MMI":
      document.getElementById("fdest").innerHTML = `${
        email.mmi.assunto
      } - ${op.toUpperCase()}`;
      break;
    case "Sete Lagoas":
      document.getElementById(
        "fdest"
      ).innerHTML = `${email.seteLagoas.assunto} - ${op}`;
      break;
    case "Três Lagoas":
      document.getElementById(
        "fdest"
      ).innerHTML = `${email.tresLagoas.assunto} - ${op}`;
      break;
    case "Rodoviário":
      document.getElementById("fdest").innerHTML = "sem email";
      break;
    case "Zilor":
      document.getElementById(
        "fdest"
      ).innerHTML = `${email.zilor.assunto} - ${op}`;
      break;
  }
}

function limparCampos() {
  let apagar = confirm(
    "Tem certeza que deseja apagar todos os campos preechidos?"
  );
  if (apagar) {
    document.getElementById("autocomplete-alerta").value = "";
    document.getElementById("placa").value = "";
    document.getElementById("autocomplete-filial").value = "";
    document.getElementById("qtd_bocejo").value = "";
    document.getElementById("fassunto").innerHTML = "";
    document.getElementById("fdest").innerHTML = "";
    document.getElementById("message-goawake").innerHTML = "";
    document.getElementById("message-email").innerHTML = "";
  }
  document.getElementById("message-goawake").innerHTML = "Observações";
  document.getElementById("message-email").innerHTML = "Display message";
}

function apagarTodosDadosDisplay() {
  const btnLimparCampos = document.getElementById("limparCampos");
  btnLimparCampos.addEventListener("click", limparCampos);
}
// Verifica se o LocalStorage é suportado pelo navegador
function isLocalStorageSupported() {
  try {
    return "localStorage" in window && window["localStorage"] !== null;
  } catch (e) {
    return false;
  }
}
// Carrega os dados do LocalStorage ou define dados iniciais
function carregarDados() {
  let alertas;

  if (isLocalStorageSupported()) {
    const dadosJSON = localStorage.getItem("myArray");
    if (dadosJSON !== null) {
      alertas = JSON.parse(dadosJSON);
    } else {
      alertas = []; //OBJ VAZIO
    }
  } else {
    alertas = []; //OBJ VAZIO
  }

  return alertas;
}

// Adicionar novo dado
function adicionarDado(dados, dado) {
  dados.push(dado);
}

// Gerar um novo dado
function createDado(dados, alerta, placa, filial, qtd, horario) {
  var newDado = {
    alerta: alerta,
    placa: placa,
    filial: filial,
    qtd_bocejo: qtd,
    horario: horario,
  };
  adicionarDado(dados, newDado);
}
var score = Number(getLocalStorage('score'));

function updateScore(count){
  document.getElementById("qtd_bocejo").value = count;
}

function msg() {

  var dataAtual = new Date();
  var hora = dataAtual.getHours();
  var minutos = dataAtual.getMinutes();
  var displayMessage = {};

  var alt = document.getElementById("autocomplete-alerta").value;
  auxAlt = alt; //removeSpecialCharSimple(alt);
  placa = document.getElementById("placa").value;
  filial = document.getElementById("autocomplete-filial").value;

  let nivel = 'bg-slate-300';
  var auxEmail = filial;
  alt = alt.toUpperCase();
  placa = placa.toUpperCase();
  filial = filial.toUpperCase();

  var dados = carregarDados();
  var hr = `${hora}:${minutos}`;

  let system_de_fadiga = 
    filial === "MMI" 
    ? "SIGHRA" 
    : "GOAWAKE";

  // createDado(dados, alt , placa, filial, qtd_bocejo, hr);
  //var myDados = JSON.parse(dados);
  
 
  if (auxAlt === "Bocejo") {
    
   // var rp = objAlerta.countDuplicatesByKeys('licensePlate');
    //alert(`Repetição: ${JSON.stringify(rp, null, 2)}`);
    
    if (score >= 2) {
        
       salvarLocalStorage('score', 1);
       document.getElementById("message-email").innerHTML = `${getSaudacao()}${
        alerta.bocejo
      }`;
      document.getElementById("message-goawake").innerHTML =
        "Reportado para a operação. Motorista bocejando, apresentando sinais de sonolência. ";
      document.getElementById(
        "fassunto"
      ).innerHTML = `ALERTA ${system_de_fadiga} - BOCEJO / ${placa} - ${filial}`;
      //displayMessage.recipient =
      displayMessage.message = `${getSaudacao()}${
        alerta.bocejo
      }`;
      displayMessage.subject = `ALERTA ${system_de_fadiga} - BOCEJO / ${placa} - ${filial}`;
      displayMessage.comments = "Reportado para a operação. Motorista bocejando, apresentando sinais de sonolência. ";
      //document.getElementById('fdest').innerHTML = `ALERTA FOCUS ${filial} <ALERTA FOCUS ${filial}>`;
      chooseEmail(auxEmail);
      enviar = true;
      nivel = 'blue';
     
    } else {
       document.getElementById("message-email").innerHTML =
        "BOCEJO -> Sempre enviar após a 3ª ocorrência dentro do turno com o Comunicado de Alerta;";
      displayMessage.message = "BOCEJO -> Sempre enviar após a 3ª ocorrência dentro do turno com o Comunicado de Alerta;";
      document.getElementById("message-goawake").innerHTML =
        "Monitorado, motorista bocejando.";
      displayMessage.comments = "Monitorado, motorista bocejando.";
      nivel = 'blue';
      enviar = true;
    }
  } else if (auxAlt === "Sonolência N1") {
    document.getElementById("message-email").innerHTML = `${getSaudacao()}${
      alerta.FadigaN1
    }`;
    document.getElementById("message-goawake").innerHTML =
      "Reportado para Reportado para a operação. Motorista apresentando sonolência. Realizar a parada de 30 minutos. Em local seguro.";
    document.getElementById(
      "fassunto"
    ).innerHTML = `ALERTA ${system_de_fadiga} - FADIGA N1 / ${placa} - ${filial}`;
    /*document.getElementById('fdest').innerHTML = `ALERTA FOCUS ${filial} <ALERTA FOCUS ${filial}>`;*/
     displayMessage.message = `${getSaudacao()}${
      alerta.FadigaN1
    }`;
      displayMessage.subject = `ALERTA ${system_de_fadiga} - FADIGA N1 / ${placa} - ${filial}`;
      displayMessage.comments = "Reportado para Reportado para a operação. Motorista apresentando sonolência. Realizar a parada de 30 minutos. Em local seguro.";
    chooseEmail(auxEmail);
    alert("Lembrar de extrair o PDF", placa);
    enviar = true;
    nivel = 'red';
    // objAlerta.showAudit(); 25/08/2023
  } else if (auxAlt === "Sonolência N2") {
    document.getElementById("message-email").innerHTML = `${getSaudacao()}${
      alerta.FadigaN2
    }`;
    document.getElementById("message-goawake").innerHTML =
      "Reportado para a operação. Motorista apresentando sonolência. Realizar a parada de 60 minutos. Em local seguro.";
    document.getElementById(
      "fassunto"
    ).innerHTML = `ALERTA ${system_de_fadiga} - FADIGA N2 / ${placa} - ${filial}`;
    /* document.getElementById('fdest').innerHTML = `ALERTA FOCUS ${filial} <ALERTA FOCUS ${filial}>`;*/
      displayMessage.message = `${getSaudacao()}${
      alerta.FadigaN2
    }`;
      displayMessage.subject = `ALERTA ${system_de_fadiga} - FADIGA N2 / ${placa} - ${filial}`;
      displayMessage.comments = "Reportado para a operação. Motorista apresentando sonolência. Realizar a parada de 60 minutos. Em local seguro.";
    chooseEmail(auxEmail);
    enviar = true;
    nivel = 'red';
    //objAlerta.showAudit(); 25/08/2023
  } else if (auxAlt === "Atenção") {
    document.getElementById("message-email").innerHTML = `${getSaudacao()}${
      alerta.atencao
    }`;
    document.getElementById("message-goawake").innerHTML =
      "Reportado. Motorista desviando a atenção durante a condução.";
    document.getElementById(
      "fassunto"
    ).innerHTML = `ALERTA ${system_de_fadiga} - ATENÇÃO / ${placa} - ${filial}`;
    /*document.getElementById('fdest').innerHTML = `ALERTA FOCUS ${filial} <ALERTA FOCUS ${filial}>`;*/
    displayMessage.message = `${getSaudacao()}${
      alerta.atencao
    }`;
      displayMessage.subject = `ALERTA ${system_de_fadiga} - ATENÇÃO / ${placa} - ${filial}`;
      displayMessage.comments = "Reportado. Motorista desviando a atenção durante a condução.";
    chooseEmail(auxEmail);
    enviar = true;
    nivel = 'yellow';
  } else if (auxAlt === "Ausência") {
    document.getElementById("message-email").innerHTML = `${getSaudacao()}${
      alerta.ausencia
    }`;
    document.getElementById("message-goawake").innerHTML =
      ` Monitorado. Câmera deslocada.\n
        Reportado para a operação. Câmera deslocada/desajustada.\n
        Reportado para a operação. Câmera coberta, sem visualização de imagens.\n
        Monitorado. Câmera desajustada.
        Reportado para a operação. Câmera desajustada.
        Reportado para a operação. Motorista desviando seu rosto do foco da câmera.
        Reportado para a operação. Motorista fora da cabine. `;
    document.getElementById(
      "fassunto"
    ).innerHTML = `ALERTA ${system_de_fadiga} - AUSÊNCIA / ${placa} - ${filial}`;
    /* document.getElementById('fdest').innerHTML = `ALERTA FOCUS ${filial} <ALERTA FOCUS ${filial}>`;*/
    displayMessage.message = `${getSaudacao()}${
      alerta.ausencia
    }`;
      displayMessage.subject = `ALERTA ${system_de_fadiga} - AUSÊNCIA / ${placa} - ${filial}`;
      displayMessage.comments = ` Monitorado. Câmera deslocada.\n
        Reportado para a operação. Câmera deslocada/desajustada.\n
        Reportado para a operação. Câmera coberta, sem visualização de imagens.\n
        Monitorado. Câmera desajustada.
        Reportado para a operação. Câmera desajustada.
        Reportado para a operação. Motorista desviando seu rosto do foco da câmera.
        Reportado para a operação. Motorista fora da cabine. `;
    chooseEmail(auxEmail);
    enviar = true;
    nivel = 'blue';
  } else if (auxAlt === "Celular") {
    document.getElementById("message-email").innerHTML = `${getSaudacao()}${
      alerta.celular
    }`;
    document.getElementById("message-goawake").innerHTML =
      "Reportado para a operação. Motorista utilizando celular durante sua condução. Infringindo as normas da Empresa.";
    document.getElementById(
      "fassunto"
    ).innerHTML = `ALERTA ${system_de_fadiga} - CELULAR / ${placa} - ${filial}`;
    /*document.getElementById('fdest').innerHTML = `ALERTA FOCUS ${filial} <ALERTA FOCUS ${filial}>`;*/
    displayMessage.message = `${getSaudacao()}${
      alerta.celular
    }`;
      displayMessage.subject = `ALERTA ${system_de_fadiga} - CELULAR / ${placa} - ${filial}`;
      displayMessage.comments = "Reportado para a operação. Motorista utilizando celular durante sua condução. Infringindo as normas da Empresa.";
    chooseEmail(auxEmail);
    enviar = true;
    nivel = 'yellow';
  } else if (auxAlt === "Câmera Coberta") {
    document.getElementById("message-email").innerHTML = `${getSaudacao()}${
      alerta.cameraCoberta
    }`;
    document.getElementById("message-goawake").innerHTML =
      "Reportado para a operação. Câmera coberta, sem visualização de imagens.";
    document.getElementById(
      "fassunto"
    ).innerHTML = `ALERTA ${system_de_fadiga} - CÂMERA COBERTA / ${placa} - ${filial}`;
     displayMessage.message = `${getSaudacao()}${
      alerta.cameraCoberta
    }`;
      displayMessage.subject = `ALERTA ${system_de_fadiga} - CÂMERA COBERTA / ${placa} - ${filial}`;
      displayMessage.comments =  "Reportado para a operação. Câmera coberta, sem visualização de imagens.";
    /*document.getElementById('fdest').innerHTML = `ALERTA FOCUS ${filial} <ALERTA FOCUS ${filial}>`;*/
    chooseEmail(auxEmail);
    enviar = true;
  } else if (auxAlt === "Cigarro") {
    document.getElementById("message-email").innerHTML = `${getSaudacao()}${
      alerta.cigarro
    }`;
    document.getElementById("message-goawake").innerHTML =
      "Reportado para a operação. Motorista fumando durante sua condução. Infringindo as normas da Empresa.";
    document.getElementById(
      "fassunto"
    ).innerHTML = `ALERTA ${system_de_fadiga} - CIGARRO / ${placa} - ${filial}`;
    /*document.getElementById('fdest').innerHTML = `ALERTA FOCUS ${filial} <ALERTA FOCUS ${filial}>`;*/
     displayMessage.message = `${getSaudacao()}${
      alerta.cigarro
    }`;
      displayMessage.subject = `ALERTA ${system_de_fadiga} - CIGARRO / ${placa} - ${filial}`;
      displayMessage.comments =  "Reportado para a operação. Motorista fumando durante sua condução. Infringindo as normas da Empresa.";
    chooseEmail(auxEmail);
    enviar = true;
    nivel = 'yellow';
  } else if (auxAlt === "Gesto Obceno") {
    document.getElementById("message-email").innerHTML = `${getSaudacao()}${
      alerta.gestoObceno
    }`;
    document.getElementById("message-goawake").innerHTML =
      "Reportado para a operação. Motorista fazendo gestos obscenos.";
    document.getElementById(
      "fassunto"
    ).innerHTML = `ALERTA ${system_de_fadiga} - GESTO OBCENO / ${placa} - ${filial}`;
    /*document.getElementById('fdest').innerHTML = `ALERTA FOCUS ${filial} <ALERTA FOCUS ${filial}>`;*/
    displayMessage.message = `${getSaudacao()}${
      alerta.gestoObceno
    }`;
      displayMessage.subject = `ALERTA ${system_de_fadiga} - GESTO OBCENO / ${placa} - ${filial}`;
      displayMessage.comments =  "Reportado para a operação. Motorista fazendo gestos obscenos.";
    chooseEmail(auxEmail);
    enviar = true;
    nivel = 'yellow';
  } else if (auxAlt === "Palavra de Baixo Calão") {
    document.getElementById("message-email").innerHTML = `${getSaudacao()}${
      alerta.palavraBC
    }`;
    document.getElementById("message-goawake").innerHTML =
      "Reportado para a operação. Motorista citando palavras de baixo calão.";
    document.getElementById(
      "fassunto"
    ).innerHTML = `ALERTA ${system_de_fadiga} - ATENÇÃO / ${placa} - ${filial}`;
    /*document.getElementById('fdest').innerHTML = `ALERTA FOCUS ${filial} <ALERTA FOCUS ${filial}>`;*/
    displayMessage.message = `${getSaudacao()}${
      alerta.palavraBC
    }`;
      displayMessage.subject = `ALERTA ${system_de_fadiga} - ATENÇÃO / ${placa} - ${filial}`;
      displayMessage.comments =  "Reportado para a operação. Motorista citando palavras de baixo calão.";
    chooseEmail(auxEmail);
    enviar = true;
    nivel = 'yellow';
  } else if (auxAlt === "Sem Cinto") {
    document.getElementById("message-email").innerHTML = `${getSaudacao()}${
      alerta.semCinto
    }`;
    document.getElementById("message-goawake").innerHTML =
      "Reportado para a operação. Motorista não está utilizando o cinto de segurança.";
    document.getElementById(
      "fassunto"
    ).innerHTML = `ALERTA ${system_de_fadiga} - ATENÇÃO / ${placa} - ${filial}`;
    //document.getElementById('fdest').innerHTML = `ALERTA FOCUS ${filial} <ALERTA FOCUS ${filial}>`;
    displayMessage.message = `${getSaudacao()}${
      alerta.semCinto
    }`;
      displayMessage.subject = `ALERTA ${system_de_fadiga} - ATENÇÃO / ${placa} - ${filial}`;
      displayMessage.comments =  "Reportado para a operação. Motorista não está utilizando o cinto de segurança.";
    chooseEmail(auxEmail);
    enviar = true;
    nivel = 'blue';
  } else if (alerta == "" || placa == "" || filial == "" || qtd_bocejo == "") {
    alert("Entre com dados validos");
    enviar = false;
  } else {
    document.getElementById("message-email").innerHTML = `${getSaudacao()}${
      alerta.undefined
    }`;
    document.getElementById("message-goawake").innerHTML =
      "alerta undefined, sem messagem.";
    enviar = false;
  }
  if (enviar) {
    localStorage.setItem('started', JSON.stringify({'started': true}));
    createDado(dados, alt, placa, filial, qtd_bocejo, hr);
    objAlerta.saveLocalStorage(nivel);
    alert(
      '✅SUCESSO !!\n\nTratativa Concluída com sucesso!!.'
    );
    salvarLocalStorage('display', displayMessage);
  }

  // Limpa os campos da tratativas
  document.getElementById("autocomplete-alerta").value = "";
  document.getElementById("placa").value = "";
  document.getElementById("autocomplete-filial").value = "";
  //exibirDados(dados);
}

function exibirHorarioAtual() {
  var dataAtual = new Date();
  var hora = dataAtual.getHours();
  var minutos = dataAtual.getMinutes();
  var segundos = dataAtual.getSeconds();

  var myUser = JSON.parse(localStorage.getItem("user"));

  // Formatação do horário com zero à esquerda se necessário
  if (hora < 10) {
    hora = "0" + hora;
  }
  if (minutos < 10) {
    minutos = "0" + minutos;
  }
  if (segundos < 10) {
    segundos = "0" + segundos;
  }

  if(myAudit == null){ 
    if ((hora == myUser.lunchTime.hour) & (minutos == myUser.lunchTime.minute)) {
      alert(
        "Este é um lembrete de,\n \tHora de JANTA!\n\nAVISO: após 1mim o controle da página retornará pra você."
      );
      console.log("Teste", myUser.lunchTime);
    }
  }
  let started =  getLocalStorage('started').start;
  if (getLocalStorage('login') && started === false ) {
    //(hora == 18) & (minutos <= 15)
    document.getElementById("message-email").innerHTML =
      "Boa noite! Wildes do *CCI* - Fadiga, operando ate as 06:00hr.";
  }

 if(localStorage.lunchTime){ 
   if((`${hora}:${minutos}`) == getLocalStorage('lunchTime').hour){
      alert(
        `⚠️\nEste é um Alarme programado via \"Break \".\nteste\n${hora}:${minutos}
        `);
      console.log('Hora de Descansar!![Teste]');
   }
 }

  var horarioAtual = hora + ":" + minutos + ":" + segundos;
  //document.getElementById("data").textContent = horarioAtual;
}

// Chamar a função para exibir o horário atual a cada segundo

setInterval(exibirHorarioAtual, 1000);

function getSaudacao() {
  const data = new Date();

  const horaDoDia = data.getHours();
  let minute = data.getMinutes();
  let saudacao = "";

  if (horaDoDia >= 6 && horaDoDia < 12) {
    console.log("Bom dia!!");
    saudacao = "Prezados(as), Bom dia!\n\n";
  } else if (horaDoDia >= 12 && horaDoDia < 18) {
    console.log("Boa tarde!!");
    saudacao = "Prezados(as), Boa tarde!\n\n";
  } else if (horaDoDia >= 18 && horaDoDia < 24) {
    console.log("Boa Noite!!", horaDoDia);
    saudacao = "Prezados(as), Boa noite!\n\n";
    paterPonto(horaDoDia, minute);
  } else {
    console.log("Boa Madrugada!!", horaDoDia);
    saudacao = "Prezados(as), Bom dia!\n\n";
  }

  return saudacao;
}

getSaudacao();

function paterPonto() {
  var dataAtual = new Date();
  var hora = dataAtual.getHours();
  var minutos = dataAtual.getMinutes();

  console.log(`${hora} : ${minutos}`);

  if (hora == 20 && minutos == 58) {
    alert("Olá Operador este é um lembrete para bater o ponto!");
    console.log("Bater ponto");
    // return true;
  } else if ((hora == 0) & (minutos == 0)) {
    alert(
      "Olá Operador este é um lembrete para fazer uma pausa (break for eat)!"
    );
  }
  //return false;
}

function verificarRepeticao(relatorio, placa) {
  var qtd = 0;
  var resultados = relatorio.filter(function (item) {
    return item;
  });

  resultados.forEach(function (item) {
    if (item.placa === placa) {
      qtd += 1;
      console.log("repetição: ", qtd);
    }
  });

  return qtd;
}

function copyToClickBoard(dado) {
  var content = document.getElementById(dado).innerHTML;

  navigator.clipboard
    .writeText(content)
    .then(() => {
      console.log("Text copied to clipboard...");
    })
    .catch((err) => {
      console.log("Something went wrong", err);
    });

  //content.style.backgroundColor = 'blue';
  //content.style.color = '#fff';
}

function handleAutoComplete(id, op) {
  // Adiciona um evento de input no campo de entrada com autocomplete
  document.getElementById(id).addEventListener("input", function () {
    var inputVal = this.value;
    var options = document.getElementById(op);

    // Verifica se a entrada corresponde a alguma opção
    for (var i = 0; i < options.length; i++) {
      var optionVal = options[i].value;
      if ((i < 4) & (optionVal.toLowerCase() === inputVal.toLowerCase())) {
        this.value = optionVal;
        console.log(`Valor selecionado: ${this.value}`);
      }
    }
    //e.prevent.default();
  });
}

function fecharPagina() {
  // Fecha a página atual
  window.location.pathname = "index.html";
}

function myLink(link) {
  switch (link) {
    case "audit":
      if(getLocalStorage('login').login === true){
        window.location.pathname = "src/pages/panel/plcrd.html";
      }else{
         window.location.pathname = "#";
      }
      break;
    case "profile":
      createModal();
      break;
    case "settings":
      window.location.pathname = "#";
      alert("Sorry, this command is not yet available");
      break;
    case "record":
      //window.location.pathname = "src/pages/record.html";
      openBox();
      break;
    case "logout":
       localStorage.setItem('login', JSON.stringify({'login': false}));
       //localStorage.removeItem('myArray');
       localStorage.removeItem("yawn");
       localStorage.removeItem("score");
       localStorage.removeItem("display");
       localStorage.removeItem("started");
      window.location.pathname = "src/auth/index.html";
      break;
    case "download":
      gerarJSONeDownload();
      break;
    default:
      window.location.pathname = "/";
      break;
  }
}

function gerarJSONeDownload() {
  var dataAtual = new Date();
  var dia = dataAtual.getDate();
  var mes = dataAtual.getMonth() + 1;

  // Converter o JSON para CSV usando a biblioteca PapaParse
  var relatorio = false;
  var csv = "";
  if (csv === "" && !relatorio) {
    alert(
      "Acess denield.\n\nSorry, to be continue with this action please, to do your log in."
    );
  } else {
    csv = Papa.unparse(relatorio);

    // Criar um novo Blob com o conteúdo CSV
    var blob = new Blob([csv], { type: "text/csv;charset=utf-8" });

    // Nome do arquivo Excel que será baixado
    var nomeArquivo = `dados_systrat${dia}-${mes}.csv`;
    console.log(`Dowonload arqSysTrat: ${dia}-${mes}`);
    // Fazer o download do arquivo Excel usando a biblioteca FileSaver
    saveAs(blob, nomeArquivo);
  }
}

// Função para atualizar os dados armazenados no localStorage
function atualizar(dados, placa) {
  // Procurar o índice do objeto que possui o nome informado
  var index = dados.findIndex(function (item) {
    return item.placa === placa;
  });

  // Se o objeto foi encontrado, atualizar seus dados
  if (index !== -1) {
    dados[index].qtd_bocejo;

  }
}

function deletar(dados, placa) {
  // Filtrar os dados, removendo o objeto com o nome informado
  var dadosAtualizados = dados.filter(function (item) {
    return item.placa !== placa;
  });
}

function show() {
  var themes = document.getElementById("div-themes");
  themes.style.display = "visibility";
}

function getUser(op) {
  const user = {
    name: "Wildes Sousa",
    avatar: "",
    lunchTime: {
      hour: 20,
      minute: 58,
    },
  };
  
  localStorage.setItem("user", JSON.stringify(user, null, 2));
  var myUser = JSON.parse(localStorage.getItem("user"));

  switch (op) {
    case "name":
      return myUser.name;
      break;
    case "avatar":
      return myUser.avatar;
      break;
    case "break":
      return myUser.lunchTime;
      break;
    default:
      return null;
  }
}

function user(op) {
  document.getElementById("login-name").innerHTML = `Olá ${getUser(op)}!`;
}

function openBox () {
  const clockItem = { isOpen: true, };
    salvarLocalStorage('clock',clockItem);  
    document.getElementById('clock').classList.remove('disable');
    document.getElementById('clock').classList.add('active');
    inicializarButtons(); 
  
}

function closeBox () {
   document.getElementById('clock').classList.remove('active');
   document.getElementById('clock').classList.add('disable');
   salvarLocalStorage('clock',{isOpen: false});
}    


function inicializarButtons(){
  
  document.getElementById('close-clock')
  .addEventListener('click',closeBox);
  
  document.getElementById('salvarBatida')
  .addEventListener('click',capturarBatidaDoPonto);
  
}

function salvarLocalStorage(chave, valor){
  localStorage.setItem(chave, JSON.stringify(valor));
}

function getLocalStorage(chave){
  return JSON.parse(localStorage.getItem(chave));
}

function incrementarQuantidadeProduto(idAlerta){
  idsQuanidadeAlertas[idAlerta]++;
}

function capturarBatidaDoPonto(){ 
  let dadContainerClock = document.getElementById('container-registrarBatida');
  const inputGetNameAlarm = document.createElement('input');
  let meuPonto = document.getElementById('capturarBatida').value;
  salvarLocalStorage('lunchTime', {hour:meuPonto});
  console.log(`Captura do ponto: ${meuPonto}`);  

  inputGetNameAlarm.classList.add('_w-30');
  /*
  inputGetNameAlarm.placeholder = 'Nome do alarme';
  inputGetNameAlarm.type = 'text';
  */
  dadContainerClock.appendChild(inputGetNameAlarm);
  
  renderizarNoScreen('showClock', 'lunchTime');
  
}
/*
// Função Recursiva 
function openWindows(name){
    if(name == true){
      openBox();
      
    }else{
       name = getLocalStorage('clock').isOpen;
       openWindows(name)
    }
}
*/
function renderizarNoScreen(display, chave){ 
  const buscado = getLocalStorage(chave);
  if(buscado !== null)
  {
   document.getElementById(display)
  .innerHTML =  buscado.hour;
  console.log(`typeof: ${typeof(buscado.hour)}`);
  }
}

function createModal(){ // Param: elemento montado encapsulado em uma str template
  const containerMain = document.getElementById('box');
  const modal = document.createElement('section');
  const cabecalho = document.createElement('div');
  const content = document.createElement('aside');
  
  modal.classList.add('box');
  modal.classList.add('active');
  
  modal.innerHMTL =`<div class="bg-default-blue color-wht flex  row jc-between p-2"><h3>Editar alerta </h3><button class="border-none h-4  bg-default-blue relative p-2" id="close-modal"><i class="fa-solid fa-xmark color-wht"></i></button></div>`;
  
  containerMain.appendChild(modal);
}

const  displayRevision = () => {
  document.getElementById("message-email").innerHTML = getLocalStorage('display').message;
  document.getElementById("message-goawake").innerHTML = getLocalStorage('display').comments;
  document.getElementById("fassunto").innerHTML = getLocalStorage('display').subject ??  'without email';
}


function openModal(){ 
 
  createModal();
  document.getElementById('box')
    .classList.remove('disable');

  document.getElementById('box')
    .classList.add('active');
}

function closeModal(){
  document.getElementById('box')
    .classList.remove('active');
  
  document.getElementById('box')
    .classList.add('disable');
}

function enableAction(){ 
  document
    .getElementById("profile")
    .addEventListener("click", openModal);
  
}

const start = (begin, score) => {
  if(begin){
    enableAction();
    user("name");
    apagarTodosDadosDisplay();
     updateScore(score)
    //setInterval ( () => openWindows(action), 1000);
    renderizarNoScreen('showClock', 'lunchTime');
    console.log('access allowed');
  }
  else{
    document.getElementById('title-display').innerText = 'acess denield';
    document.getElementById('main').classList.add('start');
    const denield = document.getElementById('acess-denield');
    const container = document.createElement('div');
    container.innerHMTL = `<div class="flex jc-center p-2 color-wht h-20">ACESS DENIELD</div>`;
    denield.appendChild(container);
    console.log('acess denield');
  }
}

start(getLocalStorage('login').login, score);