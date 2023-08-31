document.addEventListener('DOMContentLoaded', async function() {
    try {
        const username_response_promise = fetch('https://script.google.com/macros/s/AKfycbwmA97K4sdfq6dhzSsp14JU9KgQrFgSARNZbvSfiU7vuH8oEipt6TmcFo_o-jCI0kiQ/exec');
        const employee_response_promise = fetch('https://script.google.com/macros/s/AKfycbwns5R6TA8U64ywbb9hwYu4LKurAjTM0Z18NYNZMt0Ft0m-_NUHYbYqblk_5KWugvt7lA/exec');
        const client_list_response_promise = fetch('https://script.google.com/macros/s/AKfycbxXnIsmgK52Ws9H2qAh47qkgZxDltFJaHSFV0e9UQRwaK1g_xwFUKGokL_hk4fq-_mhSg/exec');
        const type_of_waste_response_promise = fetch('https://script.google.com/macros/s/AKfycbw0yC-8_V38Zl1-KGyBwX1JmfTEW1jwyFxgpZ-oNC2lvtoAraUtkLCS27HfNbXi_l4IPg/exec');
        const vehicle_response_promise = fetch('https://script.google.com/macros/s/AKfycbw-JCnctX1x1W1ogGbrkhNdIGd9q6bYjy_nvaYeoiaBf7HreB2a1tKJZaJHw2wu4wmpcA/exec');
        const vehicle_log_response_promise = fetch('https://script.google.com/macros/s/AKfycbwOVO1qi9ac0YojlrZUh-XMYMe_gAeO2bg_wU_lSRdBkLgmJKQuzQuq41lzvSOjKfzA/exec');
        const mtf_response_promise = fetch('https://script.google.com/macros/s/AKfycbzkzS4OVm3IfNl6KwOfLZq_uO3MnsXfu-oS5Su_1kxhfo1mMoKpYDm8a4RxWqsQh0qv/exec');
        const ltf_response_promise = fetch('https://script.google.com/macros/s/AKfycbxBLMvyNDsT9_dlVO4Qc31dI4ErcymUHbzKimOpCZHgbJxip2XxCl7Wk3hJyqcdtrxU/exec');
        const wcf_response_promise = fetch('https://script.google.com/macros/s/AKfycbyBFTBuFZ4PkvwmPi_3Pp_v74DCSEK2VpNy6janIGgaAK-P22wazmmShOKn6iwFbrQn/exec');

        const [
            username_response,
            employee_response,
            client_list_response,
            type_of_waste_response,
            vehicle_response,
            vehicle_log_response,
            mtf_response,
            ltf_response,
            wcf_response
        ] = await Promise.all([
            username_response_promise,
            employee_response_promise,
            client_list_response_promise,
            type_of_waste_response_promise,
            vehicle_response_promise,
            vehicle_log_response_promise,
            mtf_response_promise,
            ltf_response_promise,
            wcf_response_promise
        ]);

        const username_data_list  = await username_response.json();
        const employee_data_list  = await employee_response.json();
        const client_data_list  = await client_list_response.json();
        const type_of_waste_data_list  = await type_of_waste_response.json();
        const vehicle_data_list  = await vehicle_response.json();
        const vehicle_log_data_list  = await vehicle_log_response.json();
        const mtf_data_list  = await mtf_response.json();
        const ltf_data_list  = await ltf_response.json();
        const wcf_data_list  = await wcf_response.json();

        // Code that depends on the fetched data
        // username_data_list
        const user_sidebar = document.getElementById("user_sidebar");
        const user_sidebar_officer = document.getElementById("user_sidebar_officer");
        const user = document.getElementById("user");

        user.value = username_data_list.content[1][findTextInArray(username_data_list, "NAME")];
        user_sidebar.innerHTML = `<u>${username_data_list.content[1][findTextInArray(username_data_list, "NAME")]}</u>`;
        user_sidebar_officer.innerText = username_data_list.content[1][findTextInArray(username_data_list, "SECTIONS")];
        
        // receiving_dashboard
        const to_received_receiving = document.querySelector("#dashboard_section #to_received");
        const received_receiving = document.querySelector("#dashboard_section #received");
        const pending_receiving = document.querySelector("#dashboard_section #pending");
        const pending_list_receiving = document.querySelector("#dashboard_section #pending_list");
        const received_list_receiving = document.querySelector("#dashboard_section #received_list");
        var ltf_transaction_counter_receiving = 0;
        var ltf_wcf_transaction_counter_receiving = 0;
        var mtf_transaction_counter_receiving = 0;
        var mtf_wcf_transaction_counter_receiving = 0;
        var ltf_transaction_receiving = []; // Variable containing existing elements
        var ltf_wcf_transaction_receiving = []; // Variable containing existing elements
        var mtf_transaction_receiving = []; // Variable containing existing elements
        var mtf_wcf_transaction_receiving = []; // Variable containing existing elements
        
        for (let i = 1; i < mtf_data_list.content.length; i++) {
            if(mtf_data_list.content[i][findTextInArray(mtf_data_list, "SUBMIT TO")] ==  "RECEIVING"){
                if (!mtf_transaction_receiving.includes(mtf_data_list.content[i][findTextInArray(mtf_data_list, "MTF #")])) {
                    mtf_transaction_receiving.push(mtf_data_list.content[i][findTextInArray(mtf_data_list, "MTF #")]);
                    mtf_transaction_counter_receiving += 1
                }
            }
        }

        for (let i = 1; i < ltf_data_list.content.length; i++) {
            if (!ltf_transaction_receiving.includes(ltf_data_list.content[i][findTextInArray(ltf_data_list, "LTF #")])) {
                ltf_transaction_receiving.push(ltf_data_list.content[i][findTextInArray(ltf_data_list, "LTF #")]);
                ltf_transaction_counter_receiving += 1
            }
        }
        
        for (let i = 1; i < wcf_data_list.content.length; i++) {
            if (!ltf_wcf_transaction_receiving.includes(wcf_data_list.content[i][findTextInArray(wcf_data_list, "LTF/ MTF  #")])) {
                ltf_wcf_transaction_receiving.push(wcf_data_list.content[i][findTextInArray(wcf_data_list, "LTF/ MTF  #")]);
                ltf_wcf_transaction_counter_receiving += 1
            }
            if (!mtf_wcf_transaction_receiving.includes(wcf_data_list.content[i][findTextInArray(wcf_data_list, "LTF/ MTF  #")])) {
                mtf_wcf_transaction_receiving.push(wcf_data_list.content[i][findTextInArray(wcf_data_list, "LTF/ MTF  #")]);
                mtf_wcf_transaction_counter_receiving += 1
            }
        }
        // Get elements from wcf_transaction not included in wcf_sf_transaction
        console.log(mtf_transaction_receiving)
        console.log(mtf_wcf_transaction_receiving)
        const newElements_receiving = ltf_transaction_receiving.filter((element) => !ltf_wcf_transaction_receiving.includes(element));
        const newElements2_receiving = mtf_transaction_receiving.filter((element) => !mtf_wcf_transaction_receiving.includes(element));
        const newElements3_receiving = ltf_transaction_receiving.filter((element) => ltf_wcf_transaction_receiving.includes(element));
        const newElements4_receiving = mtf_transaction_receiving.filter((element) => mtf_wcf_transaction_receiving.includes(element));
        console.log(newElements2_receiving)

        received_receiving.innerText = ltf_wcf_transaction_counter_receiving;
        to_received_receiving.innerText = ltf_transaction_counter_receiving + mtf_transaction_counter_receiving;
        pending_receiving.innerText = newElements_receiving.length + newElements2_receiving.length;
        
        var data_value = "";
        var data_value_counter = 1;
        
        for(let i = 0; i < newElements_receiving.length; i++){
            for(let j = 1; j < ltf_data_list.content.length; j++){
                if(newElements_receiving[i] == ltf_data_list.content[j][findTextInArray(ltf_data_list, "LTF #")]){
                    var driver_name = "";
                    for(let x = 1; x<employee_data_list.content.length; x++){
                        if(employee_data_list.content[x][findTextInArray(employee_data_list, "EMPLOYEE ID")] == ltf_data_list.content[j][findTextInArray(ltf_data_list, "DRIVER ID")]){
                            var gender = employee_data_list.content[x][findTextInArray(employee_data_list, "GENDER")];
                            if(gender == "MALE"){
                                driver_name = `${employee_data_list.content[x][findTextInArray(employee_data_list, "LAST NAME")]}, ${employee_data_list.content[x][findTextInArray(employee_data_list, "FIRST NAME")]} ${employee_data_list.content[x][findTextInArray(employee_data_list, "MIDDLE NAME")]} ${employee_data_list.content[x][findTextInArray(employee_data_list, "AFFIX")]}`
                                break
                            }
                            else{
                                driver_name = `${employee_data_list.content[x][findTextInArray(employee_data_list, "LAST NAME")]}, ${employee_data_list.content[x][findTextInArray(employee_data_list, "FIRST NAME")]} ${employee_data_list.content[x][findTextInArray(employee_data_list, "MIDDLE NAME")]} - ${employee_data_list.content[x][findTextInArray(employee_data_list, "SPOUSE NAME")]}`
                                break
                            }
                        }
                    }
                    var client_name = "";
                    for(let c = 1; c < client_data_list.content.length; c++){
                        if(mtf_data_list.content[j][findTextInArray(mtf_data_list, "CLIENT ID")] == client_data_list.content[c][findTextInArray(client_data_list, "CLIENT ID")]){
                            client_name = client_data_list.content[c][findTextInArray(client_data_list, "CLIENT NAME")];
                            break
                        }
                    }
                    var waste_code = "";
                    var waste_name = "";
                    for(let c = 1; c < type_of_waste_data_list.content.length; c++){
                        if(mtf_data_list.content[j][findTextInArray(mtf_data_list, "WASTE ID")] == type_of_waste_data_list.content[c][findTextInArray(type_of_waste_data_list, "WASTE ID")]){
                            waste_code = type_of_waste_data_list.content[c][findTextInArray(type_of_waste_data_list, "WASTE CODE")];
                            waste_name = type_of_waste_data_list.content[c][findTextInArray(type_of_waste_data_list, "WASTE NAME")];
                            break
                        }
                    }
                    data_value +=`
                    <tr>
                        <td>${data_value_counter}</td>
                        <td>${ltf_data_list.content[j][findTextInArray(ltf_data_list, "LTF #")]}</td>
                        <td>${date_decoder(ltf_data_list.content[j][findTextInArray(ltf_data_list, "HAULING DATE")])} /<br> ${time_decoder(ltf_data_list.content[j][findTextInArray(ltf_data_list, "HAULING TIME")])}</td>
                        <td>${client_name}</td>
                        <td>${waste_code}</td>
                        <td>${waste_name}</td>
                        <td>${ltf_data_list.content[j][findTextInArray(ltf_data_list, "TYPE OF VEHICLE")]}</td>
                        <td>${ltf_data_list.content[j][findTextInArray(ltf_data_list, "PLATE #")]}</td>
                        <td>${driver_name}</td>
                    </tr>
                    `
                    data_value_counter += 1;
                }
            }
        }

        for(let i = 0; i < newElements2_receiving.length; i++){
            for(let j = 1; j < mtf_data_list.content.length; j++){
                if(newElements2_receiving[i] == mtf_data_list.content[j][findTextInArray(mtf_data_list, "MTF #")]){
                    var client_name = "";
                    var client_name = "";
                    for(let c = 1; c < client_data_list.content.length; c++){
                        if(mtf_data_list.content[j][findTextInArray(mtf_data_list, "CLIENT ID")] == client_data_list.content[c][findTextInArray(client_data_list, "CLIENT ID")]){
                            client_name = client_data_list.content[c][findTextInArray(client_data_list, "CLIENT NAME")];
                            break
                        }
                    }
                    var waste_code = "";
                    var waste_name = "";
                    for(let c = 1; c < type_of_waste_data_list.content.length; c++){
                        if(mtf_data_list.content[j][findTextInArray(mtf_data_list, "WASTE ID")] == type_of_waste_data_list.content[c][findTextInArray(type_of_waste_data_list, "WASTE ID")]){
                            waste_code = type_of_waste_data_list.content[c][findTextInArray(type_of_waste_data_list, "WASTE CODE")];
                            waste_name = type_of_waste_data_list.content[c][findTextInArray(type_of_waste_data_list, "WASTE NAME")];
                            break
                        }
                    }
                    data_value +=`
                    <tr>
                        <td>${data_value_counter}</td>
                        <td>${mtf_data_list.content[j][findTextInArray(mtf_data_list, "MTF #")]}</td>
                        <td>${date_decoder(mtf_data_list.content[j][findTextInArray(mtf_data_list, "HAULING DATE")])} /<br> ${time_decoder(mtf_data_list.content[j][findTextInArray(mtf_data_list, "HAULING TIME")])}</td>
                        <td>${client_name}</td>
                        <td>${waste_code}</td>
                        <td>${waste_name}</td>
                        <td>PROVIDED BY CLIENT</td>
                        <td>PROVIDED BY CLIENT</td>
                        <td>PROVIDED BY CLIENT</td>
                    </tr>
                    `
                    data_value_counter += 1;
                }
            }
        }
        pending_list_receiving.innerHTML = data_value;

        var data_value = "";
        var data_value_counter = 1;
        for(let i = 0; i < newElements3_receiving.length; i++){
            for(let j = 1; j < wcf_data_list.content.length; j++){
                if(newElements3_receiving[i] == wcf_data_list.content[j][findTextInArray(wcf_data_list, "LTF/ MTF  #")]){
                    for(let k = 1; k < ltf_data_list.content.length; k++){
                        var hauling_date_info;
                        var hauling_time_info;
                        if(wcf_data_list.content[j][1] == ltf_data_list.content[k][0]){
                            hauling_date_info =  date_decoder(ltf_data_list.content[k][findTextInArray(ltf_data_list, "HAULING DATE")]);
                            hauling_time_info =  time_decoder(ltf_data_list.content[k][findTextInArray(ltf_data_list, "HAULING TIME")]);
                            break
                        }
                    }
                    var driver_name = "";
                    for(let x = 1; x<employee_data_list.content.length; x++){
                        if(employee_data_list.content[x][findTextInArray(employee_data_list, "EMPLOYEE ID")] == wcf_data_list.content[j][findTextInArray(wcf_data_list, "DRIVER ID")]){
                            var gender = employee_data_list.content[x][findTextInArray(employee_data_list, "GENDER")];
                            if(gender == "MALE"){
                                driver_name = `${employee_data_list.content[x][findTextInArray(employee_data_list, "LAST NAME")]}, ${employee_data_list.content[x][findTextInArray(employee_data_list, "FIRST NAME")]} ${employee_data_list.content[x][findTextInArray(employee_data_list, "MIDDLE NAME")]} ${employee_data_list.content[x][findTextInArray(employee_data_list, "AFFIX")]}`
                                break
                            }
                            else{
                                driver_name = `${employee_data_list.content[x][findTextInArray(employee_data_list, "LAST NAME")]}, ${employee_data_list.content[x][findTextInArray(employee_data_list, "FIRST NAME")]} ${employee_data_list.content[x][findTextInArray(employee_data_list, "MIDDLE NAME")]} - ${employee_data_list.content[x][findTextInArray(employee_data_list, "SPOUSE NAME")]}`
                                break
                            }
                        }
                    }
                    var client_name = "";
                    for(let c = 1; c < client_data_list.content.length; c++){
                        if(wcf_data_list.content[j][findTextInArray(wcf_data_list, "CLIENT ID")] == client_data_list.content[c][findTextInArray(client_data_list, "CLIENT ID")]){
                            client_name = client_data_list.content[c][findTextInArray(client_data_list, "CLIENT NAME")];
                            break
                        }
                    }
                    var waste_code = "";
                    var waste_name = "";
                    for(let c = 1; c < type_of_waste_data_list.content.length; c++){
                        if(wcf_data_list.content[j][findTextInArray(wcf_data_list, "WASTE ID")] == type_of_waste_data_list.content[c][findTextInArray(type_of_waste_data_list, "WASTE ID")]){
                            waste_code = type_of_waste_data_list.content[c][findTextInArray(type_of_waste_data_list, "WASTE CODE")];
                            waste_name = type_of_waste_data_list.content[c][findTextInArray(type_of_waste_data_list, "WASTE NAME")];
                            break
                        }
                    }
                    data_value +=`
                    <tr>
                        <td>${data_value_counter}</td>
                        <td>${wcf_data_list.content[j][findTextInArray(wcf_data_list, "WCF #")]}</td>
                        <td>${hauling_date_info} /<br> ${hauling_time_info}</td>
                        <td>${client_name}</td>
                        <td>${waste_code}</td>
                        <td>${waste_name}</td>
                        <td>${wcf_data_list.content[j][findTextInArray(wcf_data_list, "NET WEIGHT")]}</td>
                        <td>${wcf_data_list.content[j][findTextInArray(wcf_data_list, "PLATE #")]}</td>
                        <td>${driver_name}</td>
                        <td>${date_decoder(wcf_data_list.content[j][findTextInArray(wcf_data_list, "ARRIVAL DATE")])} /<br> ${time_decoder(wcf_data_list.content[j][findTextInArray(wcf_data_list, "ARRIVAL TIME")])}</td>
                        <td>${date_decoder(wcf_data_list.content[j][findTextInArray(wcf_data_list, "DATE OUT")])} /<br> ${time_decoder(wcf_data_list.content[j][findTextInArray(wcf_data_list, "TIME OUT")])}</td>
                        <td>${calculateTravelTime(date_decoder(wcf_data_list.content[j][findTextInArray(wcf_data_list, "ARRIVAL DATE")]),time_decoder(wcf_data_list.content[j][findTextInArray(wcf_data_list, "ARRIVAL TIME")]),date_decoder(wcf_data_list.content[j][findTextInArray(wcf_data_list, "DATE OUT")]),time_decoder(wcf_data_list.content[j][findTextInArray(wcf_data_list, "TIME OUT")]))}</td>
                    </tr>
                    `
                    data_value_counter += 1;
                }
            }
        }
        for(let i = 0; i < newElements4_receiving.length; i++){
            for(let j = 1; j < wcf_data_list.content.length; j++){
                if(newElements4_receiving[i] == wcf_data_list.content[j][findTextInArray(wcf_data_list, "LTF/ MTF  #")]){
                    for(let k = 1; k < mtf_data_list.content.length; k++){
                        var hauling_date_info;
                        var hauling_time_info;
                        if(wcf_data_list.content[j][findTextInArray(wcf_data_list, "LTF/ MTF  #")] == mtf_data_list.content[k][findTextInArray(mtf_data_list, "MTF #")]){
                            hauling_date_info =  date_decoder(mtf_data_list.content[k][findTextInArray(mtf_data_list, "HAULING DATE")]);
                            hauling_time_info =  time_decoder(mtf_data_list.content[k][findTextInArray(mtf_data_list, "HAULING TIME")]);
                            break
                        }
                    }
                    var client_name = "";
                    for(let c = 1; c < client_data_list.content.length; c++){
                        if(wcf_data_list.content[j][findTextInArray(wcf_data_list, "CLIENT ID")] == client_data_list.content[c][findTextInArray(client_data_list, "CLIENT ID")]){
                            client_name = client_data_list.content[c][findTextInArray(client_data_list, "CLIENT NAME")];
                            break
                        }
                    }
                    var waste_code = "";
                    var waste_name = "";
                    for(let c = 1; c < type_of_waste_data_list.content.length; c++){
                        if(wcf_data_list.content[j][findTextInArray(wcf_data_list, "WASTE ID")] == type_of_waste_data_list.content[c][findTextInArray(type_of_waste_data_list, "WASTE ID")]){
                            waste_code = type_of_waste_data_list.content[c][findTextInArray(type_of_waste_data_list, "WASTE CODE")];
                            waste_name = type_of_waste_data_list.content[c][findTextInArray(type_of_waste_data_list, "WASTE NAME")];
                            break
                        }
                    }
                    data_value +=`
                    <tr>
                    <td>${data_value_counter}</td>
                        <td>${wcf_data_list.content[j][findTextInArray(wcf_data_list, "WCF #")]}</td>
                        <td>${hauling_date_info} /<br> ${hauling_time_info}</td>
                        <td>${client_name}</td>
                        <td>${waste_code}</td>
                        <td>${waste_name}</td>
                        <td>${wcf_data_list.content[j][findTextInArray(wcf_data_list, "NET WEIGHT")]}</td>
                        <td>${wcf_data_list.content[j][findTextInArray(wcf_data_list, "PLATE #")]}</td>
                        <td>${wcf_data_list.content[j][findTextInArray(wcf_data_list, "DRIVER ID")]}</td>
                        <td>${date_decoder(wcf_data_list.content[j][findTextInArray(wcf_data_list, "ARRIVAL DATE")])} /<br> ${time_decoder(wcf_data_list.content[j][findTextInArray(wcf_data_list, "ARRIVAL TIME")])}</td>
                        <td>${date_decoder(wcf_data_list.content[j][findTextInArray(wcf_data_list, "DATE OUT")])} /<br> ${time_decoder(wcf_data_list.content[j][findTextInArray(wcf_data_list, "TIME OUT")])}</td>
                        <td>${calculateTravelTime(date_decoder(wcf_data_list.content[j][findTextInArray(wcf_data_list, "ARRIVAL DATE")]),time_decoder(wcf_data_list.content[j][findTextInArray(wcf_data_list, "ARRIVAL TIME")]),date_decoder(wcf_data_list.content[j][findTextInArray(wcf_data_list, "DATE OUT")]),time_decoder(wcf_data_list.content[j][findTextInArray(wcf_data_list, "TIME OUT")]))}</td>
                        </tr>
                        `
                    data_value_counter += 1;
                }
            }
        }
        received_list_receiving.innerHTML = data_value;

        const wcf_data2 = document.getElementById("wcf_data2");
        const ltf_form_no = document.getElementById("ltf_form_no");
        const client = document.getElementById("client");
        const client_id = document.getElementById("client_id");
        const plate_no = document.getElementById("plate_no");
        const driver = document.getElementById("driver");
        const driver_id = document.getElementById("driver_id");
        const hauling_date = document.getElementById("hauling_date");
        const waste_description = document.getElementById("waste_description");
        const search_ltf_form_no = document.getElementById("search_ltf_form_no");
        const search_ltf_form_no_button = document.getElementById("search_ltf_form_no_button");
        const clear_ltf_form_no_button = document.getElementById("clear_ltf_form_no_button");
        const search_ltf_result = document.getElementById("search_ltf_result");
        const wcf_data = document.getElementById("wcf_data");
        
        search_ltf_form_no_button.addEventListener("click", () => {
            var data_value;
            for(a=0; a<=newElements_receiving.length; a++){
                if(search_ltf_form_no.value == newElements_receiving[a]){
                    for(let z = 1; z < ltf_data_list.content.length; z++){
                        if(search_ltf_form_no.value == ltf_data_list.content[z][findTextInArray(ltf_data_list, "LTF #")]){
                            var driver_name = "";
                            for(let x = 1; x<employee_data_list.content.length; x++){
                                if(employee_data_list.content[x][findTextInArray(employee_data_list, "EMPLOYEE ID")] == ltf_data_list.content[z][findTextInArray(ltf_data_list, "DRIVER ID")]){
                                    var gender = employee_data_list.content[x][findTextInArray(employee_data_list, "GENDER")];
                                    if(gender == "MALE"){
                                        driver_name = `${employee_data_list.content[x][findTextInArray(employee_data_list, "LAST NAME")]}, ${employee_data_list.content[x][findTextInArray(employee_data_list, "FIRST NAME")]} ${employee_data_list.content[x][findTextInArray(employee_data_list, "MIDDLE NAME")]} ${employee_data_list.content[x][findTextInArray(employee_data_list, "AFFIX")]}`
                                        break
                                    }
                                    else{
                                        driver_name = `${employee_data_list.content[x][findTextInArray(employee_data_list, "LAST NAME")]}, ${employee_data_list.content[x][findTextInArray(employee_data_list, "FIRST NAME")]} ${employee_data_list.content[x][findTextInArray(employee_data_list, "MIDDLE NAME")]} - ${employee_data_list.content[x][findTextInArray(employee_data_list, "SPOUSE NAME")]}`
                                        break
                                    }
                                }
                            }
                            var truck_helpers_array = [];
                            const idArray = (ltf_data_list.content[z][findTextInArray(ltf_data_list, "TRUCK HELPER")]).split("||").map(number => {
                                for (let x = 1; x < employee_data_list.content.length; x++) {
                                    if (employee_data_list.content[x][findTextInArray(employee_data_list, "EMPLOYEE ID")] == number.trim()) {
                                        var gender = employee_data_list.content[x][findTextInArray(employee_data_list, "GENDER")];
                                        if (gender == "MALE") {
                                            truck_helpers_array.push(`${employee_data_list.content[x][findTextInArray(employee_data_list, "LAST NAME")]}, ${employee_data_list.content[x][findTextInArray(employee_data_list, "FIRST NAME")]} ${employee_data_list.content[x][findTextInArray(employee_data_list, "MIDDLE NAME")]} ${employee_data_list.content[x][findTextInArray(employee_data_list, "AFFIX")]}`);
                                        } 
                                        else {
                                            truck_helpers_array.push(`${employee_data_list.content[x][findTextInArray(employee_data_list, "LAST NAME")]}, ${employee_data_list.content[x][findTextInArray(employee_data_list, "FIRST NAME")]} ${employee_data_list.content[x][findTextInArray(employee_data_list, "MIDDLE NAME")]} - ${employee_data_list.content[x][findTextInArray(employee_data_list, "SPOUSE NAME")]}`);
                                        }
                                    }
                                }
                            });
                            var client_name = "";
                            for(let c = 1; c < client_data_list.content.length; c++){
                                if(ltf_data_list.content[z][findTextInArray(ltf_data_list, "CLIENT ID")] == client_data_list.content[c][findTextInArray(client_data_list, "CLIENT ID")]){
                                    client_name = client_data_list.content[c][findTextInArray(client_data_list, "CLIENT NAME")];
                                    break
                                }
                            }
                            var waste_code = "";
                            var waste_name = "";
                            for(let c = 1; c < type_of_waste_data_list.content.length; c++){
                                if(ltf_data_list.content[z][findTextInArray(ltf_data_list, "WASTE ID")] == type_of_waste_data_list.content[c][findTextInArray(type_of_waste_data_list, "WASTE ID")]){
                                    waste_code = type_of_waste_data_list.content[c][findTextInArray(type_of_waste_data_list, "WASTE CODE")];
                                    waste_name = type_of_waste_data_list.content[c][findTextInArray(type_of_waste_data_list, "WASTE NAME")];
                                    break
                                }
                            }
                            data_value = `
                            LTF #: ${ltf_data_list.content[z][findTextInArray(ltf_data_list, "LTF #")]}<br>
                            CLIENT: ${client_name}<br>
                            WASTE CODE: ${waste_code}<br>
                            WASTE DESCRIPTION: ${waste_name}<br>
                            HAULING DATE: ${date_decoder(ltf_data_list.content[z][findTextInArray(ltf_data_list, "HAULING DATE")])}<br>
                            HAULING TIME: ${time_decoder(ltf_data_list.content[z][findTextInArray(ltf_data_list, "HAULING TIME")])}<br>
                            TYPE OF VEHICLE: ${ltf_data_list.content[z][findTextInArray(ltf_data_list, "TYPE OF VEHICLE")]}<br>
                            PLATE #: ${ltf_data_list.content[z][findTextInArray(ltf_data_list, "PLATE #")]}<br>
                            DRIVER: ${driver_name}<br>
                            TRUCK HELPER: ${truck_helpers_array.join(" || ")}<br>
                            DATE DEPARTURE: ${date_decoder(ltf_data_list.content[z][findTextInArray(ltf_data_list, "DEPARTURE DATE")])}<br>
                            TIME DEPARTURE: ${time_decoder(ltf_data_list.content[z][findTextInArray(ltf_data_list, "DEPARTURE TIME")])}<br>
                            REMARKS: ${ltf_data_list.content[z][findTextInArray(ltf_data_list, "REMARKS")]}<br>
                            SUBMITTED BY: ${ltf_data_list.content[z][findTextInArray(ltf_data_list, "SUBMITTED BY")]}<br>
                            `
                            ltf_form_no.value = ltf_data_list.content[z][findTextInArray(ltf_data_list, "LTF #")];
                            client_id.value = ltf_data_list.content[z][findTextInArray(ltf_data_list, "CLIENT ID")];
                            waste_description.value = ltf_data_list.content[z][findTextInArray(ltf_data_list, "WASTE ID")];
                            plate_no.value = ltf_data_list.content[z][findTextInArray(ltf_data_list, "PLATE #")];
                            driver.value = driver_name;
                            driver_id.value = ltf_data_list.content[z][findTextInArray(ltf_data_list, "DRIVER ID")];
                            hauling_date.value = date_decoder(ltf_data_list.content[z][findTextInArray(ltf_data_list, "HAULING DATE")]);
                            wcf_data.style.display = "block";
                        }
                    }
                }
            }
            for(a=0; a<=newElements2_receiving.length; a++){
                if(search_ltf_form_no.value == newElements2_receiving[a]){
                    for(z=1; z<mtf_data_list.content.length; z++){
                        if(search_ltf_form_no.value == mtf_data_list.content[z][findTextInArray(mtf_data_list, "MTF #")]){
                            var client_name = "";
                            for(let c = 1; c < client_data_list.content.length; c++){
                                if(mtf_data_list.content[z][findTextInArray(mtf_data_list, "CLIENT ID")] == client_data_list.content[c][findTextInArray(client_data_list, "CLIENT ID")]){
                                    client_name = client_data_list.content[c][findTextInArray(client_data_list, "CLIENT NAME")];
                                    break
                                }
                            }
                            var waste_code = "";
                            var waste_name = "";
                            for(let c = 1; c < type_of_waste_data_list.content.length; c++){
                                if(mtf_data_list.content[z][findTextInArray(mtf_data_list, "WASTE ID")] == type_of_waste_data_list.content[c][findTextInArray(type_of_waste_data_list, "WASTE ID")]){
                                    waste_code = type_of_waste_data_list.content[c][findTextInArray(type_of_waste_data_list, "WASTE CODE")];
                                    waste_name = type_of_waste_data_list.content[c][findTextInArray(type_of_waste_data_list, "WASTE NAME")];
                                    break
                                }
                            }
                            data_value = `
                            MTF #: ${mtf_data_list.content[z][findTextInArray(mtf_data_list, "MTF #")]}<br>
                            CLIENT: ${client_name}<br>
                            WASTE CODE: ${waste_code}<br>
                            WASTE DESCRIPTION: ${waste_name}<br>
                            HAULING DATE: ${date_decoder(mtf_data_list.content[z][findTextInArray(mtf_data_list, "HAULING DATE")])}<br>
                            HAULING TIME: ${time_decoder(mtf_data_list.content[z][findTextInArray(mtf_data_list, "HAULING TIME")])}<br>
                            TYPE OF VEHICLE: ${mtf_data_list.content[z][findTextInArray(mtf_data_list, "TYPE OF VEHICLE")]}<br>
                            PLATE #: PROVIDED BY CLIENT <br>
                            DRIVER:  PROVIDED BY CLIENT <br>
                            TRUCK HELPER:  PROVIDED BY CLIENT <br>
                            REMARKS: ${mtf_data_list.content[z][findTextInArray(mtf_data_list, "REMARKS")]}<br>
                            SUBMITTED BY: ${mtf_data_list.content[z][findTextInArray(mtf_data_list, "SUBMITTED BY")]}<br>
                            `
                            ltf_form_no.value = mtf_data_list.content[z][findTextInArray(mtf_data_list, "MTF #")];
                            client_id.value = mtf_data_list.content[z][findTextInArray(mtf_data_list, "CLIENT ID")];
                            waste_description.value = mtf_data_list.content[z][findTextInArray(mtf_data_list, "WASTE ID")];
                            hauling_date.value = date_decoder(mtf_data_list.content[z][findTextInArray(mtf_data_list, "HAULING DATE")]);
                            wcf_data.style.display = "block";
                        }
                    }
                }
            }
            if(data_value == undefined){
                search_ltf_result.innerHTML = `
                <div class="search_ltf_result">
                <h2>INFORMATION</h2>
                No Data Found
                </div><br>`            
            }
            else{
                search_ltf_result.innerHTML = `
                <div class="search_ltf_result">
                <h2>INFORMATION</h2>
                ${data_value}
                </div><br>`
            }
        })

        clear_ltf_form_no_button.addEventListener("click", () => {
            search_ltf_result.innerHTML = ``;
            search_ltf_form_no.value = ``;
        })

        // driver_data
        const search_wrapper2 = document.getElementById("search_driver");
        const input_box2 = search_wrapper2.querySelector("input");
        const sugg_box2 = search_wrapper2.querySelector(".autocom_box");
        var data_value2 = [];
        for(let x = 1; x < employee_data_list.content.length; x++){
            if(employee_data_list.content[x][findTextInArray(employee_data_list, "EMPLOYEE STATUS")] == "ACTIVE"){
                var gender = employee_data_list.content[x][findTextInArray(employee_data_list, "GENDER")];
                if(gender == "MALE"){
                    var full_name = `${employee_data_list.content[x][findTextInArray(employee_data_list, "LAST NAME")]}, ${employee_data_list.content[x][findTextInArray(employee_data_list, "FIRST NAME")]} ${employee_data_list.content[x][findTextInArray(employee_data_list, "MIDDLE NAME")]} ${employee_data_list.content[x][findTextInArray(employee_data_list, "AFFIX")]}`
                    data_value2.push(full_name);
                }
                else{
                    var full_name = `${employee_data_list.content[x][findTextInArray(employee_data_list, "LAST NAME")]}, ${employee_data_list.content[x][findTextInArray(employee_data_list, "FIRST NAME")]} ${employee_data_list.content[x][findTextInArray(employee_data_list, "MIDDLE NAME")]} - ${employee_data_list.content[x][findTextInArray(employee_data_list, "SPOUSE NAME")]}`
                    data_value2.push(full_name);
                }
            }
        }
        input_box2.onkeyup = (e) => {
            let user_data = e.target.value;
            let empty_array = [];
            if (user_data) {
                empty_array = data_value2.filter((data) => {
                    return data.toLocaleLowerCase().startsWith(user_data.toLocaleLowerCase());
                });
                empty_array = empty_array.map((data) => {
                    return '<li>' + data + '</li>';
                });
                search_wrapper2.classList.add("active");
                show_suggestions2(empty_array);
            } else {
                search_wrapper2.classList.remove("active");
            }
        };
    
        sugg_box2.addEventListener("click", (e) => {
            if (e.target.tagName === "LI") {
                select2(e.target.innerHTML);
            }
        });
        
        function select2(element) {
            let select_user_data = element;
            input_box2.value = select_user_data;
            search_wrapper2.classList.remove("active");
        }
    
        function show_suggestions2(list) {
            let list_data;
            if (!list.length) {
                user_value = input_box2.value;
                list_data = '<li>' + user_value + '</li>';
            } else {
                list_data = list.join("");
            }
            sugg_box2.innerHTML = list_data;
        }
    
        // vehicle_data
        const search_wrapper3 = document.getElementById("search_plate_no");
        const input_box3 = search_wrapper3.querySelector("input");
        const sugg_box3 = search_wrapper3.querySelector(".autocom_box");
        var data_value3 = [];
        for (x = 1; x < vehicle_data_list.content.length; x++) {
            data_value3.push(vehicle_data_list.content[x][findTextInArray(vehicle_data_list, "PLATE #")]);
            for (y = 1; y < vehicle_log_data_list.content.length; y++) {
                if(vehicle_data_list.content[x][findTextInArray(vehicle_data_list, "PLATE #")] == vehicle_log_data_list.content[y][findTextInArray(vehicle_log_data_list, "PLATE #")]){
                    if(vehicle_log_data_list.content[y][findTextInArray(vehicle_log_data_list, "STATUS")] != "AVAILABLE"){
                        data_value3 = data_value3.filter(item => item !== vehicle_log_data_list.content[y][findTextInArray(vehicle_log_data_list, "PLATE #")]);
                    }
                    else if(vehicle_log_data_list.content[y][findTextInArray(vehicle_log_data_list, "STATUS")] == "AVAILABLE"){
                        data_value3.push(vehicle_log_data_list.content[y][findTextInArray(vehicle_log_data_list, "PLATE #")]);
                    }
                }
            }
        }    
        input_box3.onkeyup = (e) => {
            let user_data = e.target.value;
            let empty_array = [];
            if (user_data) {
                empty_array = data_value3.filter((data) => {
                    return data.toLocaleLowerCase().startsWith(user_data.toLocaleLowerCase());
                });
                empty_array = empty_array.map((data) => {
                    return '<li>' + data + '</li>';
                });
                search_wrapper3.classList.add("active");
                show_suggestions3(empty_array);
            } else {
                search_wrapper3.classList.remove("active");
            }
        };
    
        sugg_box3.addEventListener("click", (e) => {
            if (e.target.tagName === "LI") {
                select3(e.target.innerHTML);
            }
        });
    
        function select3(element) {
            let select_user_data = element;
            input_box3.value = select_user_data;
            search_wrapper3.classList.remove("active");            
        }
    
        function show_suggestions3(list) {
            let list_data;
            if (!list.length) {
                user_value = input_box3.value;
                list_data = '<li>' + user_value + '</li>';
            } else {
                list_data = list.join("");
            }
            sugg_box3.innerHTML = list_data;
        }    

        // wcf_data_list
        const wcf_form_no = document.getElementById("wcf_form_no"); 
        const search_wcf_form_no = document.getElementById("search_wcf_form_no");
        const search_wcf_form_no_button = document.getElementById("search_wcf_form_no_button");
        const clear_wcf_form_no_button = document.getElementById("clear_wcf_form_no_button");
        const search_wcf_result = document.getElementById("search_wcf_result");
        const today = new Date();
        const today_year = today.getFullYear();
        const today_month = today.getMonth()+1;
        var month_new;
        var code_year_month;
        var data_counter;
    
        // FORM GENERATOR
        if(today_month.toString().length == 1){
            month_new = `0${today_month}`
        }
    
        code_year_month = `WCF${today_year}${month_new}`;
    
        var data_content = 1;
        var data_info;
        var data_last_3digit = 0;
    
        for(x=1; x<wcf_data_list.content.length; x++){
            data_info = wcf_data_list.content[x][findTextInArray(wcf_data_list, "WCF #")];
            
            if(data_info.includes(code_year_month) == true){
                data_last_3digit = data_info.slice(9)
            }
        }
        
        data_content = parseInt(data_last_3digit) +1
    
        if(data_content.toString().length == 1){
            data_counter = `00${data_content}`;
        }
        else if(data_content.toString().length == 2){
            data_counter = `0${data_content}`;
        }
        else if(data_content.toString().length == 3){
            data_counter = `${data_content}`;
        }
    
        wcf_form_no.value = `${code_year_month}${data_counter}`
    
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});
