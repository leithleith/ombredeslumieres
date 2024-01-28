var caracs = [3,3,3,3,3,3,3,3,5];
var mincaracs = [3,3,3,3,3,3,3,3,5];
var maxcaracs = [7,7,7,7,7,7,7,7,7];
const mapcaracs = {
    '0':'Adaptabilité',
    '1':'Adresse',
    '2':'Charisme',
    '3':'Erudition',
    '4':'Expression',
    '5':'Force',
    '6':'Perception',
    '7':'Pouvoir',
    '8':'Résistance'
};
var jeunesse = ["Amoureuse","Autoritaire","Choyée","Laborieuse","Orpheline","Rebelle","Solitaire","Studieuse","Sur la mer","Turbulente"];
var competencesphysiques = ["Acrobaties","Athlétisme","Equitation","Escalade","Natation"];
var competencessociales = ["Comédie","Discrétion","Empathie","Etiquette","Intimidation","Meneur","Persuasion","Politique","Séduction","Vigilance"];
var competencesconnaissance = ["Alchimie","Connaissances","Débrouillardise","Dressage","Droit","Jeu","Herboristerie","Langue étrangère","Lire/Ecrire","Marchandage","Médecine","Navigation","Occultisme","Raillerie","Religion","Sciences","Serrurerie"];
var competencestechniques = ["Art","Artisanat","Attelage","Canotage","Cartographie","Chasse","Chirurgie","Dressage","Jeu","Larcins","Mécanique","Soins","Survie"];
var competencescombat = ["Arbalète","Arc","Bagarre","Baïonnette","Bâton","Combat à deux armes","Dague (lancée)","Dague (tenue)","Epée","Escrime","Esquive","Hast","Hâche","Lutte","Main gauche","Massue","Mousquet","Pistolet","Sabre"];
var listecompetences = competencesphysiques.concat(competencessociales).concat(competencesconnaissance).concat(competencestechniques).concat(competencescombat);
var mincompetences = [];
var competences = [];
var totalcompetences;
var freebiescompetences;
const mapgeo = {
    'France': '<option value="">Choisir une origine sociale</option><option value="Amuseur">Amuseur</option><option value="Armée">Armée</option><option value="Bourgeoisie">Bourgeoisie</option><option value="Colons">Colons</option><option value="Intellectuels">Intellectuels</option><option value="Malandrins">Malandrins</option><option value="Marine">Marine</option><option value="Noblesse">Noblesse</option><option value="Paysannerie">Paysannerie</option><option value="Artisanat">Artisanat</option>',
    'Créole': '<option value="">Choisir une origine sociale</option><option value="Amuseur">Amuseur</option><option value="Esclave">Esclave</option><option value="Intellectuels">Intellectuels</option><option value="Malandrins">Malandrins</option><option value="Noblesse">Noblesse</option><option value="Paysannerie">Paysannerie</option><option value="Artisanat">Artisanat</option>',
    'Indien': '<option value="">Choisir une origine sociale</option><option value="Esclave">Esclave</option><option value="Tribu">Tribu</option>'
};
const mapsociale = {
    'Amuseur': '<option value="">Choisir une caractéristique pour un bonus de +1</option><option value="1">Adresse</option><option value="2">Charisme</option>',
    'Armée': '<option value="">Choisir une caractéristique pour un bonus de +1</option><option value="4">Expression</option><option value="8">Résistance</option>',
    'Artisanat': '<option value="">Choisir une caractéristique pour un bonus de +1</option><option value="0">Adaptabilité</option><option value="8">Résistance</option>',
    'Bourgeoisie': '<option value="">Choisir une caractéristique pour un bonus de +1</option><option value="3">Erudition</option><option value="6">Perception</option>',
    'Colons': '<option value="">Choisir une caractéristique pour un bonus de +1</option><option value="5">Force</option><option value="8">Résistance</option>',
    'Esclave': '<option value="">Choisir une caractéristique pour un bonus de +1</option><option value="1">Adresse</option><option value="8">Résistance</option>',
    'Intellectuels': '<option value="">Choisir une caractéristique pour un bonus de +1</option><option value="0">Adaptabilité</option><option value="3">Erudition</option>',
    'Malandrins': '<option value="">Choisir une caractéristique pour un bonus de +1</option><option value="0">Adaptabilité</option><option value="1">Adresse</option>',
    'Marine': '<option value="">Choisir une caractéristique pour un bonus de +1</option><option value="0">Adaptabilité</option><option value="6">Perception</option>',
    'Noblesse': '<option value="">Choisir une caractéristique pour un bonus de +1</option><option value="4">Expression</option><option value="7">Pouvoir</option>',
    'Paysannerie': '<option value="">Choisir une caractéristique pour un bonus de +1</option><option value="0">Adaptabilité</option><option value="8">Résistance</option>',
    'Tribu': '<option value="">Choisir une caractéristique pour un bonus de +1</option><option value="5">Force</option><option value="7">Pouvoir</option>'
};
const maparchetype = {
    'Amuseur': '<option value="">Sélectionner un métier :</option><option value="Musicien">Musicien</option><option value="Saltimbanque">Saltimbanque<option value="Comédien">Comédien<option value="Dresseur">Dresseur</option>',
    'Manuel': '<option value="">Sélectionner un métier :</option><option value="Artisan">Artisan</option><option value="Bûcheron">Bûcheron</option><option value="Laquais">Laquais</option><option value="Paysan">Paysan</option><option value="Pêcheur">Pêcheur</option><option value="Berger">Berger</option><option value="Ouvrier">Ouvrier</option><option value="Commis">Commis</option>',
    'Bourgeois': '<option value="">Sélectionner un métier :</option><option value="Notaire">Notaire</option><option value="Marchand">Marchand</option><option value="Commerçant">Commerçant</option>',
    'Courtisan': '<option value="">Sélectionner un métier :</option><option value="Bretteur">Bretteur</option><option value="Joueur">Joueur</option><option value="Conspirateur">Conspirateur</option><option value="Mécène">Mécène</option>',
    'Ecclésiastique': '<option value="">Sélectionner un métier :</option><option value="Prêtre">Prêtre</option><option value="Moine">Moine</option><option value="Evêque">Evêque</option>',
    'Intellectuel': '<option value="">Sélectionner un métier :</option><option value="Cartographe">Cartographe</option><option value="Chirurgien">Chirurgien</option><option value="Ingénieur">Ingénieur</option><option value="Médecin">Médecin</option><option value="Comptable">Comptable</option>',
    'Malandrin': '<option value="">Sélectionner un métier :</option><option value="Assassin">Assassin</option><option value="Escroc">Escroc</option><option value="Espion">Espion</option><option value="Joueur">Joueur</option><option value="Spadassin">Spadassin</option><option value="Contrebandier">Contrebandier</option><option value="Voleur">Voleur</option>',
    'Militaire': '<option value="">Sélectionner un métier :</option><option value="Cadet">Cadet</option><option value="Soldat">Soldat</option><option value="Cavalier">Cavalier</option><option value="Mousquetaire">Mousquetaire</option><option value="Maître d&#39;arme">Maître d&#39;arme</option>',
};
var avantages = ["Pécule","Lame de qualité 1","Lame de qualité 2","Lame de qualité 3","Pistolet de qualité 1","Pistolet de qualité 2","Pistolet de qualité 3","Mousquet de qualité 1","Mousquet de qualité 2","Mousquet de qualité 3","Arme double 1","Arme double 2","Arme double 3","Contact avec un tavernier","Contact avec un bourgeois","Contact avec un haut-fonctionnaire","Contact avec un noble","Ecole d'escrime","Noble : gentilhomme","Noble : baron","Noble : comte","Clergé : prêtre","Clergé : évêque"];
var pointsavantages = [1,1,3,5,1,3,5,1,3,5,1,3,5,1,3,5,3,2,3,5,1,3];
var faiblesses = ["Borgne","Balafre","Oreille tranchée","Doigt en moins main gauche (ni index, ni pouce)", "Doigt en moins main gauche (pouce ou index)", "Main gauche en moins","Doigt en moins main droite (ni index, ni pouce)","Doigt en moins main droite (pouce ou index)","Main droite en moins","Maladie chronique","Manchot (bras grauche)","Manchot (bras droit)","Muet","Dettes importantes","Joueur invétéré","Persécution religieuse","Recherché"];
var pointsfaiblesses = [5,1,2,1,3,7,3,5,9,8,13,15,12,2,1,2,3,1,3,5,7];
var compteuravantages = 0;
var compteurfaiblesses = 0;
function calculgeo()
{
    if (document.getElementById("geo").value != "")
    {
        document.getElementById("sociale").innerHTML = mapgeo[document.getElementById("geo").value];
        document.getElementById("geo").disabled = true;
        document.getElementById("sociale").disabled = false;
    }
}
function calculsociale()
{
    if (document.getElementById("sociale").value != "")
    {
        document.getElementById("bonuscaracoriginesociale").innerHTML = mapsociale[document.getElementById("sociale").value];        
        document.getElementById("sociale").disabled = true;
        document.getElementById("bonuscaracoriginesociale").disabled = false;
    }
}
function calculbonuscaracoriginesociale()
{
    document.getElementById("bonuscaracoriginesociale").disabled = true;
    caracs[Number(document.getElementById("bonuscaracoriginesociale").value)] = ++caracs[Number(document.getElementById("bonuscaracoriginesociale").value)];
    mincaracs[Number(document.getElementById("bonuscaracoriginesociale").value)] = ++mincaracs[Number(document.getElementById("bonuscaracoriginesociale").value)];
    maxcaracs[Number(document.getElementById("bonuscaracoriginesociale").value)] = ++maxcaracs[Number(document.getElementById("bonuscaracoriginesociale").value)];
    for (var i = 0; i < 9; i++)
    {
        document.getElementById(i).min = mincaracs[i];
        document.getElementById(i).max = maxcaracs[i];
        document.getElementById(i).value = caracs[i];
        document.getElementById(i).disabled = false;
    }
}
function calculbonuscaracmetier()
{
    document.getElementById("bonuscaracmetier").disabled = true;
    caracs[Number(document.getElementById("bonuscaracmetier").value)] = ++caracs[Number(document.getElementById("bonuscaracmetier").value)];
    mincaracs[Number(document.getElementById("bonuscaracmetier").value)] = ++mincaracs[Number(document.getElementById("bonuscaracmetier").value)];
    maxcaracs[Number(document.getElementById("bonuscaracmetier").value)] = ++maxcaracs[Number(document.getElementById("bonuscaracmetier").value)];
    for (var i = 0; i < 9; i++)
    {
        document.getElementById(i).min = mincaracs[i];
        document.getElementById(i).max = maxcaracs[i];
        document.getElementById(i).value = caracs[i];
    }
}
function calculbonuscaracmetier2()
{
    document.getElementById("bonuscaracmetier2").disabled = true;
    caracs[Number(document.getElementById("bonuscaracmetier2").value)] = ++caracs[Number(document.getElementById("bonuscaracmetier2").value)];
    mincaracs[Number(document.getElementById("bonuscaracmetier2").value)] = ++mincaracs[Number(document.getElementById("bonuscaracmetier2").value)];
    maxcaracs[Number(document.getElementById("bonuscaracmetier2").value)] = ++maxcaracs[Number(document.getElementById("bonuscaracmetier2").value)];
    for (var i = 0; i < 9; i++)
    {
        document.getElementById(i).min = mincaracs[i];
        document.getElementById(i).max = maxcaracs[i];
        document.getElementById(i).value = caracs[i];
    }
}
function calcultotal(quellecarac)
{
    if (Number(document.getElementById("pointscaracs").innerHTML) > 0)
    {
        if (isNaN(document.getElementById(quellecarac).value) || document.getElementById(quellecarac).value < mincaracs[quellecarac] || document.getElementById(quellecarac).value > maxcaracs[quellecarac] || Number(document.getElementById("pointscaracs").innerHTML) - (document.getElementById(quellecarac).value - caracs[quellecarac]) < 0)
        {
            document.getElementById(quellecarac).value = caracs[quellecarac];
        }
        else
        {
            caracs[quellecarac] = Number(document.getElementById(quellecarac).value);            
        }
        document.getElementById("pointscaracs").innerHTML = 46 - caracs.reduceRight(function (a, b) { return a + b;});
    }
    if (Number(document.getElementById("pointscaracs").innerHTML) == 0)
    {
        for (var i = 0; i < 9; i++)
        {
            document.getElementById(i).disabled = true;
            document.getElementById("enfance").disabled = false;
        }
    }
}
function calculenfance()
{
    if (document.getElementById("enfance").value != "")
    {
        for (var i = 0; i < listecompetences.length; i++)
        {
            mincompetences.push(0);
            competences.push(0);
        };
        document.getElementById('tablecompetencestechniques').innerHTML = '<tr><td><b>Techniques :</b></td></tr>';
        for (var i = 0 ; i < competencestechniques.length ; i++)
        {
            document.getElementById('tablecompetencestechniques').innerHTML += '<tr><td>' + competencestechniques[i] + ' :<input type="number" name="' + competencestechniques[i] + '" id="' + competencestechniques[i] +'" size="3" maxlength="1" min="0" max="6" value="0" disabled onchange="calculcompetences(\'' + competencestechniques[i] + '\')"></td></tr>';
        }
        document.getElementById('tablecompetencessociales').innerHTML = '<tr><td><b>Sociales :</b></td></tr>';
        for (var i = 0 ; i < competencessociales.length ; i++)
        {
            document.getElementById('tablecompetencessociales').innerHTML += '<tr><td>' + competencessociales[i] + ' :<input type="number" name="' + competencessociales[i] + '" id="' + competencessociales[i] +'" size="3" maxlength="1" min="0" max="6" value="0" disabled onchange="calculcompetences(\'' + competencessociales[i] + '\')"></td></tr>';
        }
        document.getElementById('tablecompetencesphysiques').innerHTML = '<tr><td><b>Physiques :</b></td></tr>';
        for (var i = 0 ; i < competencesphysiques.length ; i++)
        {
            document.getElementById('tablecompetencesphysiques').innerHTML += '<tr><td>' + competencesphysiques[i] + ' :<input type="number" name="' + competencesphysiques[i] + '" id="' + competencesphysiques[i] +'" size="3" maxlength="1" min="0" max="6" value="0" disabled onchange="calculcompetences(\'' + competencesphysiques[i] + '\')"></td></tr>';
        }
        document.getElementById('tablecompetencesconnaissance').innerHTML = '<tr><td><b>Connaissances :</b></td></tr>';
        for (var i = 0 ; i < competencesconnaissance.length ; i++)
        {
            document.getElementById('tablecompetencesconnaissance').innerHTML += '<tr><td>' + competencesconnaissance[i] + ' :<input type="number" name="' + competencesconnaissance[i] + '" id="' + competencesconnaissance[i] +'" size="3" maxlength="1" min="0" max="6" value="0" disabled onchange="calculcompetences(\'' + competencesconnaissance[i] + '\')"></td></tr>';
        }
        document.getElementById('tablecompetencescombat').innerHTML = '<tr><td><b>Combat :</b></td></tr>';
        for (var i = 0 ; i < competencescombat.length ; i++)
        {
            document.getElementById('tablecompetencescombat').innerHTML += '<tr><td>' + competencescombat[i] + ' :<input type="number" name="' + competencescombat[i] + '" id="' + competencescombat[i] +'" size="3" maxlength="1" min="0" max="6" value="0" disabled onchange="calculcompetences(\'' + competencescombat[i] + '\')"></td></tr>';
        }
        var choixenfance1 = '';
        var choixenfance2 = '';
        var choixenfance3 = '';
        var choixenfance4 = '';
        var choixenfance5 = '';
        switch (Number(document.getElementById("enfance").value))
        {
            case 1:
                choixenfance1 = '<option value="">Choisir une compétence technique</option>';
                for (var i = 0; i < competencestechniques.length-1; i++)
                {
                    choixenfance1 += '<option value="' + competencestechniques[i] + '">' + competencestechniques[i] + '</option>';
                }
                choixenfance2 = '<option value="">Choisir une compétence sociale</option>';
                choixenfance3 = '<option value="">Choisir une compétence sociale</option>';
                for (var i = 0; i < competencessociales.length-1; i++)
                {
                    choixenfance2 += '<option value="' + competencessociales[i] + '">' + competencessociales[i] + '</option>';
                    choixenfance3 += '<option value="' + competencessociales[i] + '">' + competencessociales[i] + '</option>';
                }
                choixenfance4 = '<option value="">Choisir une compétence physique</option>';
                for (var i = 0; i < competencesphysiques.length-1; i++)
                {
                    choixenfance4 += '<option value="' + competencesphysiques[i] + '">' + competencesphysiques[i] + '</option>';
                }
                choixenfance5 = '<option value="">Choisir une compétence de combat</option>';
                for (var i = 0; i < competencescombat.length-1; i++)
                {
                    choixenfance5 += '<option value="' + competencescombat[i] + '">' + competencescombat[i] + '</option>';
                }
            break;
            case 2:
                choixenfance1 = '<option value="">Choisir une compétence de connaissance</option>';
                choixenfance2 = '<option value="">Choisir une compétence de connaissance</option>';
                for (var i = 0; i < competencesconnaissance.length-1; i++)
                {
                    choixenfance1 += '<option value="' + competencesconnaissance[i] + '">' + competencesconnaissance[i] + '</option>';
                    choixenfance2 += '<option value="' + competencesconnaissance[i] + '">' + competencesconnaissance[i] + '</option>';
                }
                choixenfance3 = '<option value="">Choisir une compétence sociale</option>';
                choixenfance4 = '<option value="">Choisir une compétence sociale</option>';
                choixenfance5 = '<option value="">Choisir une compétence sociale</option>';
                for (var i = 0; i < competencessociales.length-1; i++)
                {
                    choixenfance3 += '<option value="' + competencessociales[i] + '">' + competencessociales[i] + '</option>';
                    choixenfance4 += '<option value="' + competencessociales[i] + '">' + competencessociales[i] + '</option>';
                    choixenfance5 += '<option value="' + competencessociales[i] + '">' + competencessociales[i] + '</option>';
                }
            break;
            case 3:
                choixenfance1 = '<option value="">Choisir une compétence technique</option>';
                choixenfance2 = '<option value="">Choisir une compétence technique</option>';
                choixenfance3 = '<option value="">Choisir une compétence technique</option>';
                for (var i = 0; i < competencestechniques.length-1; i++)
                {
                    choixenfance1 += '<option value="' + competencestechniques[i] + '">' + competencestechniques[i] + '</option>';
                    choixenfance2 += '<option value="' + competencestechniques[i] + '">' + competencestechniques[i] + '</option>';
                    choixenfance3 += '<option value="' + competencestechniques[i] + '">' + competencestechniques[i] + '</option>';
                }
                choixenfance4 = '<option value="">Choisir une compétence physique</option>';
                for (var i = 0; i < competencesphysiques.length-1; i++)
                {
                    choixenfance4 += '<option value="' + competencesphysiques[i] + '">' + competencesphysiques[i] + '</option>';
                }
                choixenfance5 = '<option value="">Choisir une compétence sociale</option>';
                for (var i = 0; i < competencessociales.length-1; i++)
                {
                    choixenfance5 += '<option value="' + competencessociales[i] + '">' + competencessociales[i] + '</option>';
                }
            break;
            case 4:
                choixenfance1 = '<option value="">Choisir une compétence technique</option>';
                for (var i = 0; i < competencestechniques.length-1; i++)
                {
                    choixenfance1 += '<option value="' + competencestechniques[i] + '">' + competencestechniques[i] + '</option>';
                }
                choixenfance2 = '<option value="">Choisir une compétence sociale</option>';
                for (var i = 0; i < competencessociales.length-1; i++)
                {
                    choixenfance2 += '<option value="' + competencessociales[i] + '">' + competencessociales[i] + '</option>';
                }
                choixenfance3 = '<option value="">Choisir une compétence de connaissance</option>';
                for (var i = 0; i < competencesconnaissance.length-1; i++)
                {
                    choixenfance3 += '<option value="' + competencesconnaissance[i] + '">' + competencesconnaissance[i] + '</option>';
                }
                choixenfance4 = '<option value="">Choisir une compétence physique</option>';
                choixenfance5 = '<option value="">Choisir une compétence physique</option>';
                for (var i = 0; i < competencesphysiques.length-1; i++)
                {
                    choixenfance4 += '<option value="' + competencesphysiques[i] + '">' + competencesphysiques[i] + '</option>';
                    choixenfance5 += '<option value="' + competencesphysiques[i] + '">' + competencesphysiques[i] + '</option>';
                }
            break;
            case 5:
                choixenfance1 = '<option value="">Choisir une compétence sociale</option>';
                choixenfance2 = '<option value="">Choisir une compétence sociale</option>';
                for (var i = 0; i < competencessociales.length-1; i++)
                {
                    choixenfance1 += '<option value="' + competencessociales[i] + '">' + competencessociales[i] + '</option>';
                    choixenfance2 += '<option value="' + competencessociales[i] + '">' + competencessociales[i] + '</option>';
                }
                choixenfance3 = '<option value="">Choisir une compétence de connaissance</option>';
                for (var i = 0; i < competencesconnaissance.length-1; i++)
                {
                    choixenfance3 += '<option value="' + competencesconnaissance[i] + '">' + competencesconnaissance[i] + '</option>';
                }
                choixenfance4 = '<option value="">Choisir une compétence de combat</option>';
                choixenfance5 = '<option value="">Choisir une compétence de combat</option>';
                for (var i = 0; i < competencescombat.length-1; i++)
                {
                    choixenfance4 += '<option value="' + competencescombat[i] + '">' + competencescombat[i] + '</option>';
                    choixenfance5 += '<option value="' + competencescombat[i] + '">' + competencescombat[i] + '</option>';
                }
            break;
            case 6:
                choixenfance1 = '<option value="">Choisir une compétence technique</option>';
                for (var i = 0; i < competencestechniques.length-1; i++)
                {
                    choixenfance1 += '<option value="' + competencestechniques[i] + '">' + competencestechniques[i] + '</option>';
                }
                choixenfance2 = '<option value="">Choisir une compétence physique</option>';
                for (var i = 0; i < competencesphysiques.length-1; i++)
                {
                    choixenfance2 += '<option value="' + competencesphysiques[i] + '">' + competencesphysiques[i] + '</option>';
                }
                choixenfance3 = '<option value="">Choisir une compétence de connaissance</option>';
                choixenfance4 = '<option value="">Choisir une compétence de connaissance</option>';
                for (var i = 0; i < competencesconnaissance.length-1; i++)
                {
                    choixenfance3 += '<option value="' + competencesconnaissance[i] + '">' + competencesconnaissance[i] + '</option>';
                    choixenfance4 += '<option value="' + competencesconnaissance[i] + '">' + competencesconnaissance[i] + '</option>';
                }
                choixenfance5 = '<option value="">Choisir une compétence de combat</option>';
                for (var i = 0; i < competencescombat.length-1; i++)
                {
                    choixenfance5 += '<option value="' + competencescombat[i] + '">' + competencescombat[i] + '</option>';
                }
            break;
            case 7:
                choixenfance1 = '<option value="">Choisir une compétence technique</option>';
                choixenfance2 = '<option value="">Choisir une compétence technique</option>';
                for (var i = 0; i < competencestechniques.length-1; i++)
                {
                    choixenfance1 += '<option value="' + competencestechniques[i] + '">' + competencestechniques[i] + '</option>';
                    choixenfance2 += '<option value="' + competencestechniques[i] + '">' + competencestechniques[i] + '</option>';
                }
                choixenfance3 = '<option value="">Choisir une compétence de connaissance</option>';
                choixenfance4 = '<option value="">Choisir une compétence de connaissance</option>';
                choixenfance5 = '<option value="">Choisir une compétence de connaissance</option>';
                for (var i = 0; i < competencesconnaissance.length-1; i++)
                {
                    choixenfance3 += '<option value="' + competencesconnaissance[i] + '">' + competencesconnaissance[i] + '</option>';
                    choixenfance4 += '<option value="' + competencesconnaissance[i] + '">' + competencesconnaissance[i] + '</option>';
                    choixenfance5 += '<option value="' + competencesconnaissance[i] + '">' + competencesconnaissance[i] + '</option>';
                }
            break;
            case 9:
                choixenfance1 = '<option value="">Choisir une compétence sociale</option>';
                choixenfance2 = '<option value="">Choisir une compétence sociale</option>';
                for (var i = 0; i < competencessociales.length-1; i++)
                {
                    choixenfance1 += '<option value="' + competencessociales[i] + '">' + competencessociales[i] + '</option>';
                    choixenfance2 += '<option value="' + competencessociales[i] + '">' + competencessociales[i] + '</option>';
                }
                choixenfance3 = '<option value="">Choisir une compétence de combat</option>';
                for (var i = 0; i < competencescombat.length-1; i++)
                {
                    choixenfance3 += '<option value="' + competencescombat[i] + '">' + competencescombat[i] + '</option>';
                }
                choixenfance4 = '<option value="">Choisir une compétence physique</option>';
                choixenfance5 = '<option value="">Choisir une compétence physique</option>';
                for (var i = 0; i < competencesphysiques.length-1; i++)
                {
                    choixenfance4 += '<option value="' + competencesphysiques[i] + '">' + competencesphysiques[i] + '</option>';
                    choixenfance5 += '<option value="' + competencesphysiques[i] + '">' + competencesphysiques[i] + '</option>';
                }
            break;
            default:
                choixenfance1 = '<option value="">Choisir une compétence de combat</option>';
                for (var i = 0; i < competencescombat.length-1; i++)
                {
                    choixenfance1 += '<option value="' + competencescombat[i] + '">' + competencescombat[i] + '</option>';
                }
                choixenfance2 = '<option value="">Choisir une compétence de connaissance</option>';
                for (var i = 0; i < competencesconnaissance.length-1; i++)
                {
                    choixenfance2 += '<option value="' + competencesconnaissance[i] + '">' + competencesconnaissance[i] + '</option>';
                }
                choixenfance3 = '<option value="">Choisir une compétence physique</option>';
                for (var i = 0; i < competencesphysiques.length-1; i++)
                {
                    choixenfance3 += '<option value="' + competencesphysiques[i] + '">' + competencesphysiques[i] + '</option>';
                }
                choixenfance4 = '<option value="">Choisir une compétence sociale</option>';
                for (var i = 0; i < competencessociales.length-1; i++)
                {
                    choixenfance4 += '<option value="' + competencessociales[i] + '">' + competencessociales[i] + '</option>';                    
                }
                choixenfance5 = '<option value="">Choisir une compétence technique</option>';
                for (var i = 0; i < competencestechniques.length-1; i++)
                {
                    choixenfance5 += '<option value="' + competencestechniques[i] + '">' + competencestechniques[i] + '</option>';
                }
            break;
        }
        document.getElementById("choixenfance1").innerHTML = choixenfance1;
        document.getElementById("choixenfance2").innerHTML = choixenfance2;
        document.getElementById("choixenfance3").innerHTML = choixenfance3;
        document.getElementById("choixenfance4").innerHTML = choixenfance4;
        document.getElementById("choixenfance5").innerHTML = choixenfance5;
        document.getElementById("choixenfance1").disabled = false;
        document.getElementById("choixenfance2").disabled = false;
        document.getElementById("choixenfance3").disabled = false;
        document.getElementById("choixenfance4").disabled = false;
        document.getElementById("choixenfance5").disabled = false;        
        document.getElementById("enfance").disabled = true;        
    }
}
function calculchoixenfance()
{
    if (document.getElementById("choixenfance1").value != "" && document.getElementById("choixenfance1").disabled != true)
    {
        if (listecompetences.indexOf(document.getElementById("choixenfance1").value) != -1)
        {
            if (competences[listecompetences.indexOf(document.getElementById("choixenfance1").value)] < 6)
            {
                document.getElementById("choixenfance1").disabled = true;
                competences[listecompetences.indexOf(document.getElementById("choixenfance1").value)] = ++competences[listecompetences.indexOf(document.getElementById("choixenfance1").value)];
                mincompetences[listecompetences.indexOf(document.getElementById("choixenfance1").value)] = ++mincompetences[listecompetences.indexOf(document.getElementById("choixenfance1").value)];
                document.getElementById(document.getElementById("choixenfance1").value).value = competences[listecompetences.indexOf(document.getElementById("choixenfance1").value)];
                document.getElementById(document.getElementById("choixenfance1").value).min = mincompetences[listecompetences.indexOf(document.getElementById("choixenfance1").value)];
            }
        }
    }
    if (document.getElementById("choixenfance2").value != "" && document.getElementById("choixenfance2").disabled != true)
    {
        if (listecompetences.indexOf(document.getElementById("choixenfance2").value) != -1)
        {
            if (competences[listecompetences.indexOf(document.getElementById("choixenfance2").value)] < 6)
            {
                document.getElementById("choixenfance2").disabled = true;
                competences[listecompetences.indexOf(document.getElementById("choixenfance2").value)] = ++competences[listecompetences.indexOf(document.getElementById("choixenfance2").value)];
                mincompetences[listecompetences.indexOf(document.getElementById("choixenfance2").value)] = ++mincompetences[listecompetences.indexOf(document.getElementById("choixenfance2").value)];
                document.getElementById(document.getElementById("choixenfance2").value).value = competences[listecompetences.indexOf(document.getElementById("choixenfance2").value)];
                document.getElementById(document.getElementById("choixenfance2").value).min = mincompetences[listecompetences.indexOf(document.getElementById("choixenfance2").value)];                
            }
        }
    }
    if (document.getElementById("choixenfance3").value != "" && document.getElementById("choixenfance3").disabled != true)
    {
        if (listecompetences.indexOf(document.getElementById("choixenfance3").value) != -1)
        {
            if (competences[listecompetences.indexOf(document.getElementById("choixenfance3").value)] < 6)
            {
                document.getElementById("choixenfance3").disabled = true;
                competences[listecompetences.indexOf(document.getElementById("choixenfance3").value)] = ++competences[listecompetences.indexOf(document.getElementById("choixenfance3").value)];
                mincompetences[listecompetences.indexOf(document.getElementById("choixenfance3").value)] = ++mincompetences[listecompetences.indexOf(document.getElementById("choixenfance3").value)];
                document.getElementById(document.getElementById("choixenfance3").value).value = competences[listecompetences.indexOf(document.getElementById("choixenfance3").value)];
                document.getElementById(document.getElementById("choixenfance3").value).min = mincompetences[listecompetences.indexOf(document.getElementById("choixenfance3").value)];
            }
        }
    }
    if (document.getElementById("choixenfance4").value != "" && document.getElementById("choixenfance4").disabled != true)
    {
        if (listecompetences.indexOf(document.getElementById("choixenfance4").value) != -1)
        {
            if (competences[listecompetences.indexOf(document.getElementById("choixenfance4").value)] < 6)
            {
                document.getElementById("choixenfance4").disabled = true;
                competences[listecompetences.indexOf(document.getElementById("choixenfance4").value)] = ++competences[listecompetences.indexOf(document.getElementById("choixenfance4").value)];
                mincompetences[listecompetences.indexOf(document.getElementById("choixenfance4").value)] = ++mincompetences[listecompetences.indexOf(document.getElementById("choixenfance4").value)];
                document.getElementById(document.getElementById("choixenfance4").value).value = competences[listecompetences.indexOf(document.getElementById("choixenfance4").value)];
                document.getElementById(document.getElementById("choixenfance4").value).min = mincompetences[listecompetences.indexOf(document.getElementById("choixenfance4").value)];
            }
        }
    }
    if (document.getElementById("choixenfance5").value != "" && document.getElementById("choixenfance5").disabled != true)
    {
        if (listecompetences.indexOf(document.getElementById("choixenfance5").value) != -1)
        {
            if (competences[listecompetences.indexOf(document.getElementById("choixenfance5").value)] < 6)
            {
                document.getElementById("choixenfance5").disabled = true;
                competences[listecompetences.indexOf(document.getElementById("choixenfance5").value)] = ++competences[listecompetences.indexOf(document.getElementById("choixenfance5").value)];
                mincompetences[listecompetences.indexOf(document.getElementById("choixenfance5").value)] = ++mincompetences[listecompetences.indexOf(document.getElementById("choixenfance5").value)];
                document.getElementById(document.getElementById("choixenfance5").value).value = competences[listecompetences.indexOf(document.getElementById("choixenfance5").value)];
                document.getElementById(document.getElementById("choixenfance5").value).min = mincompetences[listecompetences.indexOf(document.getElementById("choixenfance5").value)];
            }
        }
    }
    if (document.getElementById("choixenfance1").value != "" && document.getElementById("choixenfance2").value != "" && document.getElementById("choixenfance3").value != "" && document.getElementById("choixenfance4").value != "" && document.getElementById("choixenfance5").value != "")
    {
        var genadolescence = '<option value="">Choisir un type d&#39;adolescence</option>';
        for (var i = 0; i < 10; i++)
        {
            if (Number(document.getElementById("enfance").value) != i)
            {
                genadolescence = genadolescence + '<option value="' + i + '">' + jeunesse[i] + '</option>';
            }
        }
        document.getElementById("adolescence").innerHTML = genadolescence;
        document.getElementById("adolescence").disabled = false;
    }
}
function calculadolescence()
{
    if (document.getElementById("adolescence").value != "")
    {
        for (var i = 0; i < 10; i++)
        {
            if (Number(document.getElementById("adolescence").value) == i)
            {
                switch (Number(document.getElementById("adolescence").value))
                {
                    case 0:
                        choixadolescence1 = '<option value="">Choisir une compétence physique</option>';
                        for (var i = 0; i < competencesphysiques.length-1; i++)
                        {
                            choixadolescence1 += '<option value="' + competencesphysiques[i] + '">' + competencesphysiques[i] + '</option>';
                        }
                        choixadolescence2 = '<option value="">Choisir une compétence sociale</option>';
                        choixadolescence3 = '<option value="">Choisir une compétence sociale</option>';
                        choixadolescence4 = '<option value="">Choisir une compétence sociale</option>';
                        for (var i = 0; i < competencessociales.length-1; i++)
                        {
                            choixadolescence2 += '<option value="' + competencessociales[i] + '">' + competencessociales[i] + '</option>';
                            choixadolescence3 += '<option value="' + competencessociales[i] + '">' + competencessociales[i] + '</option>';
                            choixadolescence4 += '<option value="' + competencessociales[i] + '">' + competencessociales[i] + '</option>';
                        }
                        choixadolescence5 = '<option value="">Choisir une compétence de combat</option>';
                        for (var i = 0; i < competencescombat.length-1; i++)
                        {
                            choixadolescence5 += '<option value="' + competencescombat[i] + '">' + competencescombat[i] + '</option>';
                        }
                    break;
                    case 1:
                        choixadolescence1 = '<option value="">Choisir une compétence technique</option>';
                        for (var i = 0; i < competencestechniques.length-1; i++)
                        {
                            choixadolescence1 += '<option value="' + competencestechniques[i] + '">' + competencestechniques[i] + '</option>';
                        }
                        choixadolescence2 = '<option value="">Choisir une compétence sociale</option>';
                        choixadolescence3 = '<option value="">Choisir une compétence sociale</option>';
                        for (var i = 0; i < competencessociales.length-1; i++)
                        {
                            choixadolescence2 += '<option value="' + competencessociales[i] + '">' + competencessociales[i] + '</option>';
                            choixadolescence3 += '<option value="' + competencessociales[i] + '">' + competencessociales[i] + '</option>';
                        }
                        choixadolescence4 = '<option value="">Choisir une compétence physique</option>';
                        for (var i = 0; i < competencesphysiques.length-1; i++)
                        {
                            choixadolescence4 += '<option value="' + competencesphysiques[i] + '">' + competencesphysiques[i] + '</option>';
                        }
                        choixadolescence5 = '<option value="">Choisir une compétence de combat</option>';
                        for (var i = 0; i < competencescombat.length-1; i++)
                        {
                            choixadolescence5 += '<option value="' + competencescombat[i] + '">' + competencescombat[i] + '</option>';
                        }
                    break;
                    case 2:
                        choixadolescence1 = '<option value="">Choisir une compétence de connaissance</option>';
                        choixadolescence2 = '<option value="">Choisir une compétence de connaissance</option>';
                        for (var i = 0; i < competencesconnaissance.length-1; i++)
                        {
                            choixadolescence1 += '<option value="' + competencesconnaissance[i] + '">' + competencesconnaissance[i] + '</option>';
                            choixadolescence2 += '<option value="' + competencesconnaissance[i] + '">' + competencesconnaissance[i] + '</option>';
                        }
                        choixadolescence3 = '<option value="">Choisir une compétence sociale</option>';
                        choixadolescence4 = '<option value="">Choisir une compétence sociale</option>';
                        choixadolescence5 = '<option value="">Choisir une compétence sociale</option>';
                        for (var i = 0; i < competencessociales.length-1; i++)
                        {
                            choixadolescence3 += '<option value="' + competencessociales[i] + '">' + competencessociales[i] + '</option>';
                            choixadolescence4 += '<option value="' + competencessociales[i] + '">' + competencessociales[i] + '</option>';
                            choixadolescence5 += '<option value="' + competencessociales[i] + '">' + competencessociales[i] + '</option>';
                        }
                    break;
                    case 3:
                        choixadolescence1 = '<option value="">Choisir une compétence technique</option>';
                        choixadolescence2 = '<option value="">Choisir une compétence technique</option>';
                        choixadolescence3 = '<option value="">Choisir une compétence technique</option>';
                        for (var i = 0; i < competencestechniques.length-1; i++)
                        {
                            choixadolescence1 += '<option value="' + competencestechniques[i] + '">' + competencestechniques[i] + '</option>';
                            choixadolescence2 += '<option value="' + competencestechniques[i] + '">' + competencestechniques[i] + '</option>';
                            choixadolescence3 += '<option value="' + competencestechniques[i] + '">' + competencestechniques[i] + '</option>';
                        }
                        choixadolescence4 = '<option value="">Choisir une compétence physique</option>';
                        for (var i = 0; i < competencesphysiques.length-1; i++)
                        {
                            choixadolescence4 += '<option value="' + competencesphysiques[i] + '">' + competencesphysiques[i] + '</option>';
                        }
                        choixadolescence5 = '<option value="">Choisir une compétence sociale</option>';
                        for (var i = 0; i < competencessociales.length-1; i++)
                        {
                            choixadolescence5 += '<option value="' + competencessociales[i] + '">' + competencessociales[i] + '</option>';
                        }
                    break;
                    case 4:
                        choixadolescence1 = '<option value="">Choisir une compétence technique</option>';
                        for (var i = 0; i < competencestechniques.length-1; i++)
                        {
                            choixadolescence1 += '<option value="' + competencestechniques[i] + '">' + competencestechniques[i] + '</option>';
                        }
                        choixadolescence2 = '<option value="">Choisir une compétence sociale</option>';
                        for (var i = 0; i < competencessociales.length-1; i++)
                        {
                            choixadolescence2 += '<option value="' + competencessociales[i] + '">' + competencessociales[i] + '</option>';
                        }
                        choixadolescence3 = '<option value="">Choisir une compétence de connaissance</option>';
                        for (var i = 0; i < competencesconnaissance.length-1; i++)
                        {
                            choixadolescence3 += '<option value="' + competencesconnaissance[i] + '">' + competencesconnaissance[i] + '</option>';
                        }
                        choixadolescence4 = '<option value="">Choisir une compétence physique</option>';
                        choixadolescence5 = '<option value="">Choisir une compétence physique</option>';
                        for (var i = 0; i < competencesphysiques.length-1; i++)
                        {
                            choixadolescence4 += '<option value="' + competencesphysiques[i] + '">' + competencesphysiques[i] + '</option>';
                            choixadolescence5 += '<option value="' + competencesphysiques[i] + '">' + competencesphysiques[i] + '</option>';
                        }
                    break;
                    case 5:
                        choixadolescence1 = '<option value="">Choisir une compétence sociale</option>';
                        choixadolescence2 = '<option value="">Choisir une compétence sociale</option>';
                        for (var i = 0; i < competencessociales.length-1; i++)
                        {
                            choixadolescence1 += '<option value="' + competencessociales[i] + '">' + competencessociales[i] + '</option>';
                            choixadolescence2 += '<option value="' + competencessociales[i] + '">' + competencessociales[i] + '</option>';
                        }
                        choixadolescence3 = '<option value="">Choisir une compétence de connaissance</option>';
                        for (var i = 0; i < competencesconnaissance.length-1; i++)
                        {
                            choixadolescence3 += '<option value="' + competencesconnaissance[i] + '">' + competencesconnaissance[i] + '</option>';
                        }
                        choixadolescence4 = '<option value="">Choisir une compétence de combat</option>';
                        choixadolescence5 = '<option value="">Choisir une compétence de combat</option>';
                        for (var i = 0; i < competencescombat.length-1; i++)
                        {
                            choixadolescence4 += '<option value="' + competencescombat[i] + '">' + competencescombat[i] + '</option>';
                            choixadolescence5 += '<option value="' + competencescombat[i] + '">' + competencescombat[i] + '</option>';
                        }
                    break;
                    case 6:
                        choixadolescence1 = '<option value="">Choisir une compétence technique</option>';
                        for (var i = 0; i < competencestechniques.length-1; i++)
                        {
                            choixadolescence1 += '<option value="' + competencestechniques[i] + '">' + competencestechniques[i] + '</option>';
                        }
                        choixadolescence2 = '<option value="">Choisir une compétence physique</option>';
                        for (var i = 0; i < competencesphysiques.length-1; i++)
                        {
                            choixadolescence2 += '<option value="' + competencesphysiques[i] + '">' + competencesphysiques[i] + '</option>';
                        }
                        choixadolescence3 = '<option value="">Choisir une compétence de connaissance</option>';
                        choixadolescence4 = '<option value="">Choisir une compétence de connaissance</option>';
                        for (var i = 0; i < competencesconnaissance.length-1; i++)
                        {
                            choixadolescence3 += '<option value="' + competencesconnaissance[i] + '">' + competencesconnaissance[i] + '</option>';
                            choixadolescence4 += '<option value="' + competencesconnaissance[i] + '">' + competencesconnaissance[i] + '</option>';
                        }
                        choixadolescence5 = '<option value="">Choisir une compétence de combat</option>';
                        for (var i = 0; i < competencescombat.length-1; i++)
                        {
                            choixadolescence5 += '<option value="' + competencescombat[i] + '">' + competencescombat[i] + '</option>';
                        }
                    break;
                    case 7:
                        choixadolescence1 = '<option value="">Choisir une compétence technique</option>';
                        choixadolescence2 = '<option value="">Choisir une compétence technique</option>';
                        for (var i = 0; i < competencestechniques.length-1; i++)
                        {
                            choixadolescence1 += '<option value="' + competencestechniques[i] + '">' + competencestechniques[i] + '</option>';
                            choixadolescence2 += '<option value="' + competencestechniques[i] + '">' + competencestechniques[i] + '</option>';
                        }
                        choixadolescence3 = '<option value="">Choisir une compétence de connaissance</option>';
                        choixadolescence4 = '<option value="">Choisir une compétence de connaissance</option>';
                        choixadolescence5 = '<option value="">Choisir une compétence de connaissance</option>';
                        for (var i = 0; i < competencestechniques.length-1; i++)
                        {
                            choixadolescence3 += '<option value="' + competencesconnaissance[i] + '">' + competencesconnaissance[i] + '</option>';
                            choixadolescence4 += '<option value="' + competencesconnaissance[i] + '">' + competencesconnaissance[i] + '</option>';
                            choixadolescence5 += '<option value="' + competencesconnaissance[i] + '">' + competencesconnaissance[i] + '</option>';
                        }
                    break;
                    case 8:
                        choixadolescence1 = '<option value="">Choisir une compétence de combat</option>';
                        for (var i = 0; i < competencescombat.length-1; i++)
                        {
                            choixadolescence1 += '<option value="' + competencescombat[i] + '">' + competencescombat[i] + '</option>';
                        }
                        choixadolescence2 = '<option value="">Choisir une compétence de connaissance</option>';
                        for (var i = 0; i < competencesconnaissance.length-1; i++)
                        {
                            choixadolescence2 += '<option value="' + competencesconnaissance[i] + '">' + competencesconnaissance[i] + '</option>';
                        }
                        choixadolescence3 = '<option value="">Choisir une compétence physique</option>';
                        for (var i = 0; i < competencesphysiques.length-1; i++)
                        {
                            choixadolescence3 += '<option value="' + competencesphysiques[i] + '">' + competencesphysiques[i] + '</option>';
                        }
                        choixadolescence4 = '<option value="">Choisir une compétence sociale</option>';
                        for (var i = 0; i < competencessociales.length-1; i++)
                        {
                            choixadolescence4 += '<option value="' + competencessociales[i] + '">' + competencessociales[i] + '</option>';                    
                        }
                        choixadolescence5 = '<option value="">Choisir une compétence technique</option>';
                        for (var i = 0; i < competencestechniques.length-1; i++)
                        {
                            choixadolescence5 += '<option value="' + competencestechniques[i] + '">' + competencestechniques[i] + '</option>';
                        }
                    break;
                    case 9:
                        choixadolescence1 = '<option value="">Choisir une compétence sociale</option>';
                        choixadolescence2 = '<option value="">Choisir une compétence sociale</option>';
                        for (var i = 0; i < competencessociales.length-1; i++)
                        {
                            choixadolescence1 += '<option value="' + competencessociales[i] + '">' + competencessociales[i] + '</option>';
                            choixadolescence2 += '<option value="' + competencessociales[i] + '">' + competencessociales[i] + '</option>';
                        }
                        choixadolescence3 = '<option value="">Choisir une compétence de combat</option>';
                        for (var i = 0; i < competencescombat.length-1; i++)
                        {
                            choixadolescence3 += '<option value="' + competencescombat[i] + '">' + competencescombat[i] + '</option>';
                        }
                        choixadolescence4 = '<option value="">Choisir une compétence physique</option>';
                        choixadolescence5 = '<option value="">Choisir une compétence physique</option>';
                        for (var i = 0; i < competencesphysiques.length-1; i++)
                        {
                            choixadolescence4 += '<option value="' + competencesphysiques[i] + '">' + competencesphysiques[i] + '</option>';
                            choixadolescence5 += '<option value="' + competencesphysiques[i] + '">' + competencesphysiques[i] + '</option>';
                        }
                    break;
                    default:
                        choixadolescence1 = '<option value="">Choisir une compétence de combat</option>';
                        for (var i = 0; i < competencescombat.length-1; i++)
                        {
                            choixadolescence1 += '<option value="' + competencescombat[i] + '">' + competencescombat[i] + '</option>';
                        }
                        choixadolescence2 = '<option value="">Choisir une compétence de connaissance</option>';
                        for (var i = 0; i < competencesconnaissance.length-1; i++)
                        {
                            choixadolescence2 += '<option value="' + competencesconnaissance[i] + '">' + competencesconnaissance[i] + '</option>';
                        }
                        choixadolescence3 = '<option value="">Choisir une compétence physique</option>';
                        for (var i = 0; i < competencesphysiques.length-1; i++)
                        {
                            choixadolescence3 += '<option value="' + competencesphysiques[i] + '">' + competencesphysiques[i] + '</option>';
                        }
                        choixadolescence4 = '<option value="">Choisir une compétence sociale</option>';
                        for (var i = 0; i < competencessociales.length-1; i++)
                        {
                            choixadolescence4 += '<option value="' + competencessociales[i] + '">' + competencessociales[i] + '</option>';                    
                        }
                        choixadolescence5 = '<option value="">Choisir une compétence technique</option>';
                        for (var i = 0; i < competencestechniques.length-1; i++)
                        {
                            choixadolescence5 += '<option value="' + competencestechniques[i] + '">' + competencestechniques[i] + '</option>';
                        }
                    break;
                }
            }
        }
        document.getElementById("choixadolescence1").innerHTML = choixadolescence1;
        document.getElementById("choixadolescence2").innerHTML = choixadolescence2;
        document.getElementById("choixadolescence3").innerHTML = choixadolescence3;
        document.getElementById("choixadolescence4").innerHTML = choixadolescence4;
        document.getElementById("choixadolescence5").innerHTML = choixadolescence5;
        document.getElementById("choixadolescence1").disabled = false;
        document.getElementById("choixadolescence2").disabled = false;
        document.getElementById("choixadolescence3").disabled = false;
        document.getElementById("choixadolescence4").disabled = false;
        document.getElementById("choixadolescence5").disabled = false;
        document.getElementById("adolescence").disabled = true;
    }
}
function calculchoixadolescence()
{
    if (document.getElementById("choixadolescence1").value != "" && document.getElementById("choixadolescence1").disabled != true)
    {
        if (listecompetences.indexOf(document.getElementById("choixadolescence1").value) != -1)
        {
            if (competences[listecompetences.indexOf(document.getElementById("choixadolescence1").value)] < 6)
            {
                competences[listecompetences.indexOf(document.getElementById("choixadolescence1").value)] = ++competences[listecompetences.indexOf(document.getElementById("choixadolescence1").value)];
                mincompetences[listecompetences.indexOf(document.getElementById("choixadolescence1").value)] = ++mincompetences[listecompetences.indexOf(document.getElementById("choixadolescence1").value)];
                document.getElementById(document.getElementById("choixadolescence1").value).value = competences[listecompetences.indexOf(document.getElementById("choixadolescence1").value)];
                document.getElementById(document.getElementById("choixadolescence1").value).min = mincompetences[listecompetences.indexOf(document.getElementById("choixadolescence1").value)];
                document.getElementById("choixadolescence1").disabled = true;
            }
        }
    }
    if (document.getElementById("choixadolescence2").value != "" && document.getElementById("choixadolescence2").disabled != true)
    {
        if (listecompetences.indexOf(document.getElementById("choixadolescence2").value) != -1)
        {
            if (competences[listecompetences.indexOf(document.getElementById("choixadolescence2").value)] < 6)
            {
                competences[listecompetences.indexOf(document.getElementById("choixadolescence2").value)] = ++competences[listecompetences.indexOf(document.getElementById("choixadolescence2").value)];
                mincompetences[listecompetences.indexOf(document.getElementById("choixadolescence2").value)] = ++mincompetences[listecompetences.indexOf(document.getElementById("choixadolescence2").value)];
                document.getElementById(document.getElementById("choixadolescence2").value).value = competences[listecompetences.indexOf(document.getElementById("choixadolescence2").value)];
                document.getElementById(document.getElementById("choixadolescence2").value).min = mincompetences[listecompetences.indexOf(document.getElementById("choixadolescence2").value)];                
                document.getElementById("choixadolescence2").disabled = true;
            }
        }
    }
    if (document.getElementById("choixadolescence3").value != "" && document.getElementById("choixadolescence3").disabled != true)
    {
        if (listecompetences.indexOf(document.getElementById("choixadolescence3").value) != -1)
        {
            if (competences[listecompetences.indexOf(document.getElementById("choixadolescence3").value)] < 6)
            {
                competences[listecompetences.indexOf(document.getElementById("choixadolescence3").value)] = ++competences[listecompetences.indexOf(document.getElementById("choixadolescence3").value)];
                mincompetences[listecompetences.indexOf(document.getElementById("choixadolescence3").value)] = ++mincompetences[listecompetences.indexOf(document.getElementById("choixadolescence3").value)];
                document.getElementById(document.getElementById("choixadolescence3").value).value = competences[listecompetences.indexOf(document.getElementById("choixadolescence3").value)];
                document.getElementById(document.getElementById("choixadolescence3").value).min = mincompetences[listecompetences.indexOf(document.getElementById("choixadolescence3").value)];                
                document.getElementById("choixadolescence3").disabled = true;
            }
        }
    }
    if (document.getElementById("choixadolescence4").value != "" && document.getElementById("choixadolescence4").disabled != true)
    {
        if (listecompetences.indexOf(document.getElementById("choixadolescence4").value) != -1)
        {
            if (competences[listecompetences.indexOf(document.getElementById("choixadolescence4").value)] < 6)
            {
                competences[listecompetences.indexOf(document.getElementById("choixadolescence4").value)] = ++competences[listecompetences.indexOf(document.getElementById("choixadolescence4").value)];
                mincompetences[listecompetences.indexOf(document.getElementById("choixadolescence4").value)] = ++mincompetences[listecompetences.indexOf(document.getElementById("choixadolescence4").value)];
                document.getElementById(document.getElementById("choixadolescence4").value).value = competences[listecompetences.indexOf(document.getElementById("choixadolescence4").value)];
                document.getElementById(document.getElementById("choixadolescence4").value).min = mincompetences[listecompetences.indexOf(document.getElementById("choixadolescence4").value)];                
                document.getElementById("choixadolescence4").disabled = true;
            }
        }
    }
    if (document.getElementById("choixadolescence5").value != "" && document.getElementById("choixadolescence5").disabled != true)
    {
        if (listecompetences.indexOf(document.getElementById("choixadolescence5").value) != -1)
        {
            if (competences[listecompetences.indexOf(document.getElementById("choixadolescence5").value)] < 6)
            {
                competences[listecompetences.indexOf(document.getElementById("choixadolescence5").value)] = ++competences[listecompetences.indexOf(document.getElementById("choixadolescence5").value)];
                mincompetences[listecompetences.indexOf(document.getElementById("choixadolescence5").value)] = ++mincompetences[listecompetences.indexOf(document.getElementById("choixadolescence5").value)];
                document.getElementById(document.getElementById("choixadolescence5").value).value = competences[listecompetences.indexOf(document.getElementById("choixadolescence5").value)];
                document.getElementById(document.getElementById("choixadolescence5").value).min = mincompetences[listecompetences.indexOf(document.getElementById("choixadolescence5").value)];                
                document.getElementById("choixadolescence5").disabled = true;
            }
        }
    }
    if (document.getElementById("choixadolescence1").value != "" && document.getElementById("choixadolescence2").value != "" && document.getElementById("choixadolescence3").value != "" && document.getElementById("choixadolescence4").value != "" && document.getElementById("choixadolescence5").value != "")
    {
        document.getElementById("archetype").disabled = false;
        totalcompetences = competences.reduceRight(function (a, b) { return a + b;});
    }
}
function calcularchetype()
{
    if (document.getElementById("archetype").value != "")
    {
        document.getElementById("metier").innerHTML = maparchetype[document.getElementById("archetype").value];
        document.getElementById("archetype").disabled = true;
        document.getElementById("metier").disabled = false;
    }
}
function calculmetier()
{
    if (document.getElementById("metier").value != "")
    {
        var gencaracmetier = '<option value="">Choisir une caractéristique pour un bonus de +1 :</option>';
        for (var i = 0; i < 9; i++)
        {       
            if (Number(document.getElementById(i).value) < 8)
            {                
                gencaracmetier = gencaracmetier + '<option value="' + i + '">' + mapcaracs[i] + '</option>';
            }
        }
        document.getElementById("bonuscaracmetier").innerHTML = gencaracmetier;
        document.getElementById("metier").disabled = true;
        document.getElementById("bonuscaracmetier").disabled = false;
    }
}
function calculbonuscaracmetier()
{
    if (document.getElementById("bonuscaracmetier").value != "")
    {
        document.getElementById(document.getElementById("bonuscaracmetier").value).value = Number(document.getElementById(document.getElementById("bonuscaracmetier").value).value)+1;
        var gencaracmetier = '<option value="">Choisir une caractéristique pour un bonus de +1 :</option>';
        for (var i = 0; i < 9; i++)
        {       
            if (Number(document.getElementById(i).value) < 8)
            {                
                gencaracmetier = gencaracmetier + '<option value="' + i + '">' + mapcaracs[i] + '</option>' ;
            }
        }
        document.getElementById("bonuscaracmetier2").innerHTML = gencaracmetier;
        document.getElementById("bonuscaracmetier").disabled = true;
        document.getElementById("bonuscaracmetier2").disabled = false;
    }
}
function calculbonuscaracmetier2()
{
    if (document.getElementById("bonuscaracmetier2").value != "")
    {
        document.getElementById(document.getElementById("bonuscaracmetier2").value).value = Number(document.getElementById(document.getElementById("bonuscaracmetier2").value).value)+1;
        document.getElementById("bonuscaracmetier2").disabled = true;
        for (var i = 0; i < avantages.length; i++)
        {
            document.getElementById("avantages").innerHTML += '<label for="avantages' + i + '">' + avantages[i] + ':</label><input type="checkbox" id="avantages' + i + '" onchange="calculavantages(' + i + ',true)"><br>';
        }
        for (var i = 0; i < faiblesses.length; i++)
        {
            document.getElementById("faiblesses").innerHTML += '<label for="faiblesses' + i + '">' + faiblesses[i] + ':</label><input type="checkbox" id="faiblesses' + i + '" onchange="calculavantages(' + i + ',false)"><br>';
        }
        document.getElementById("stopavantages").disabled = false;
        if (document.getElementById("metier").value == "Prêtre")
        {
            document.getElementById("avantages21").checked = true;
            document.getElementById("avantages21").disabled = true;
            compteuravantages = ++compteuravantages;
            document.getElementById("pointsavantages").value = Number(document.getElementById("pointsavantages").value) - pointsavantages[21];
        }
        else if (document.getElementById("metier").value == "Evêque")
        {
            document.getElementById("avantages22").checked = true;
            document.getElementById("avantages22").disabled = true;
            compteuravantages = ++compteuravantages;
            document.getElementById("pointsavantages").value = Number(document.getElementById("pointsavantages").value) - pointsavantages[22];
        }
    }
}
function calculavantages(avantage, flag)
{
    if (flag == true)
    {
        if (document.getElementById("avantages" + avantage).checked == true)
        {
            if (compteuravantages < 6)
            {
                compteuravantages = ++compteuravantages;
                document.getElementById("pointsavantages").value = Number(document.getElementById("pointsavantages").value) - pointsavantages[avantage];
            }
            else
            {
                document.getElementById("avantages" + avantage).checked == false;
            }
        }
        else
        {
            compteuravantages = --compteuravantages;
            document.getElementById("pointsavantages").value = Number(document.getElementById("pointsavantages").value) + pointsavantages[avantage];
        }
    }
    else
    {
        if (document.getElementById("faiblesses" + avantage).checked == true)
        {
            if (compteurfaiblesses < 6)
            {
                compteurfaiblesses = ++compteurfaiblesses;
                document.getElementById("pointsavantages").value = Number(document.getElementById("pointsavantages").value) + pointsfaiblesses[avantage];
            }
            else
            {
                document.getElementById("faiblesses" + avantage).checked == false;
            }
        }
        else
        {
            compteurfaiblesses = --compteurfaiblesses;
            document.getElementById("pointsavantages").value = Number(document.getElementById("pointsavantages").value) - pointsfaiblesses[avantage];
        }
    }
}
function passeavantages()
{
    if (Number(document.getElementById("pointsavantages").value) >= -12)
    {
        for (var i = 0; i < avantages.length; i++)
        {
            document.getElementById("avantages" + i).disabled = true;
        }
        for (var i = 0; i < faiblesses.length; i++)
        {
            document.getElementById("faiblesses" + i).disabled = true;
        }
        document.getElementById("stopavantages").disabled = true;
        document.getElementById("pointscompetences").value = 12 + Number(document.getElementById("pointsavantages").value);
        for (var i = 0; i < listecompetences.length; i++)
        {
            document.getElementById(listecompetences[i]).disabled = false;
        }
        document.getElementById("Escrime").disabled = true;
        for (var i = 17; i < 21; i++)
        {
            if (document.getElementById("avantages" + i).checked == true )
            {
                document.getElementById("Escrime").disabled = false;
            }
        }
    }
}
function calculcompetences(quellecompetence)
{
    if (Number(document.getElementById("pointscompetences").value) > 0)
    {
        if (isNaN(document.getElementById(quellecompetence).value) || document.getElementById(quellecompetence).value < mincompetences[listecompetences.indexOf(quellecompetence)] || document.getElementById(quellecompetence).value > 6)
        {
            document.getElementById(quellecompetence).value = competences[listecompetences.indexOf(quellecompetence)];
        }
        else
        {
            competences[listecompetences.indexOf(quellecompetence)] = Number(document.getElementById(quellecompetence).value);
        }
        document.getElementById("pointscompetences").value = 12 - (competences.reduceRight(function (a, b) { return a + b;}) - totalcompetences);
    }
    if (Number(document.getElementById("pointscompetences").value) == 0)
    {
        for (var i = 0; i < listecompetences.length; i++)
        {
            document.getElementById(listecompetences[i]).disabled = true;
        }
    }
}