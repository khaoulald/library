
        var form_el = document.getElementsByTagName("form")[0];
        var form_inputs = document.getElementsByTagName("input");
        var champ_titre = document.getElementById("titre");
        var champ_auteur = document.getElementById("auteur");
        var champ_prix = document.getElementById("prix");
        var champ_date_publi = document.getElementById("date_publi");
        var champ_langue = document.getElementById("lang");
        var champ_type = document.getElementsByClassName("type");
        var type_par = document.getElementById("p_type");
        var is_checked = false;
        var table = document.getElementById("table");

         
        function validate(e)
        {
            e.preventDefault();
            var form_not_valid = 0;
        
           
            for(var i=0;i<4;i++)
            {
                if(form_inputs[i].value == "")
                {
                    form_not_valid++;
                    form_inputs[i].style.borderColor = "red";
                    form_inputs[i].nextElementSibling.style.color = "red";
                    form_inputs[i].nextElementSibling.innerHTML = "please fill this field";
                }
                else
                {
                    form_inputs[i].style.borderColor = "green"
                    form_inputs[i].nextElementSibling.style.color = "green";
                    form_inputs[i].nextElementSibling.innerHTML = "valider!";
                }
            }
            
             if(champ_titre.value.length>30){
                form_not_valid++;
                champ_titre.style.borderColor = "red"
               
            }
            
            if(champ_auteur.value.length>30){
                form_not_valid++;
                champ_auteur.style.borderColor = "red"
               
            }
            
            if(isNaN(champ_prix.value)){
                form_not_valid++;
                champ_prix.style.borderColor = "red"
                champ_prix.nextElementSibling.innerHTML = "numbers only";
                champ_prix.nextElementSibling.style.color = "red";
            }
            else if(champ_prix.value<=0 && champ_prix.value != ""){
                champ_prix.style.borderColor = "red"
                form_not_valid++;
                champ_prix.nextElementSibling.innerHTML = "positive numbers only";
                champ_prix.nextElementSibling.style.color = "red";
            }
             
            if(champ_langue.value == ""){
                form_not_valid++;
                champ_langue.style.borderColor = "red";
                champ_langue.nextElementSibling.style.color = "red";
                champ_langue.nextElementSibling.innerHTML = "please choose a language";
            }
            else{
                champ_langue.style.borderColor = "green";
                champ_langue.nextElementSibling.style.color = "green";
                champ_langue.nextElementSibling.innerHTML = "valider!";
            }
            
            for(var i=0;i<champ_type.length;i++){
                if(champ_type[i].checked){
                    is_checked = true;
                    break;
                }
                else{
                    is_checked = false;
                    form_not_valid++;
                    type_par.innerHTML = "please select a type!";
                    type_par.style.color = "red";
                }
            }
            if(is_checked){
                type_par.innerHTML = "valider!";
                type_par.style.color = "green";
            }
            else
            {if(dlt.classList.contains("dlt_btn")){
                dlt.closest("tr").remove();
            }
                form_not_valid++;
                type_par.innerHTML = "please select a type!";
                type_par.style.color = "red";
            }
            
            if(form_not_valid==0)
            {
                var row = table.insertRow(-1);
                row.insertCell(0).innerHTML = champ_titre.value;
                row.insertCell(1).innerHTML = champ_auteur.value;
                row.insertCell(2).innerHTML = champ_prix.value;
                row.insertCell(3).innerHTML = champ_date_publi.value;
                row.insertCell(4).innerHTML = champ_langue.options[lang.selectedIndex].value;
                row.insertCell(5).innerHTML = "<input class='edit_btn' onclick='edit_row(this)' type='button' value='Modifier'>"
                                                +
                                              "<input class='dlt_btn' onclick='dlt_row(this)' type='button' value='Supprimer'>";
              
              
                var temp_cell="";
                for(var i=0;i<champ_type.length;i++){
                    if(champ_type[i].checked){
                        temp_cell = champ_type[i].value;
                    }
                }
                row.insertCell(5).innerHTML = temp_cell; 
            }

        }

        function dlt_row(r){
            if(confirm('delete??')){
                var i = r.parentNode.parentNode.rowIndex;
                 table.deleteRow(i);
            }
            
        }

        function edit_row(r){
            var i = r.parentNode.parentNode.rowIndex;
            var row = table.rows[i];
            if(r.value == "Edit"){
                champ_titre.value = row.cells[0].innerHTML;
                champ_auteur.value = row.cells[1].innerHTML;
                champ_prix.value = row.cells[2].innerHTML;
                champ_date_publi.value = row.cells[3].innerHTML;
                
                
                if(row.cells[4].innerHTML == "Arabe"){
                    champ_langue.selectedIndex = 1;
                }
                else if(row.cells[4].innerHTML == "Anglais"){
                    champ_langue.selectedIndex = 2;
                }
                else{
                    champ_langue.selectedIndex = 3;
                }

                
                for(var i=0;i<champ_type.length;i++){
                    if(row.cells[5].innerHTML==champ_type[i].value){
                        champ_type[i].checked = true;
                    }
                }
                r.value="Enregistrer"
                document.getElementById("submit_btn").setAttribute("disabled","true");
            }
            else{
                row.cells[0].innerHTML = champ_titre.value;
                row.cells[1].innerHTML = champ_auteur.value;
                row.cells[2].innerHTML = champ_prix.value;
                row.cells[3].innerHTML = champ_date_publi.value;
                row.cells[4].innerHTML = champ_langue.options[lang.selectedIndex].value;
                for(var i=0;i<champ_langue.length;i++){
                    if(champ_type[i].checked){
                        row.cells[5] = champ_type[i].value;
                    }
                }
                r.value = "Edit";
                document.getElementById("submit_btn").removeAttribute("disabled")
            }
        }

        form_el.addEventListener("submit", validate)