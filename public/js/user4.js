document.addEventListener('DOMContentLoaded', async function() {
    try {
        const username_response_promise = fetch('https://script.google.com/macros/s/AKfycbwmA97K4sdfq6dhzSsp14JU9KgQrFgSARNZbvSfiU7vuH8oEipt6TmcFo_o-jCI0kiQ/exec');
        const client_list_response_promise = fetch('https://script.google.com/macros/s/AKfycbxXnIsmgK52Ws9H2qAh47qkgZxDltFJaHSFV0e9UQRwaK1g_xwFUKGokL_hk4fq-_mhSg/exec');
        const type_of_waste_response_promise = fetch('https://script.google.com/macros/s/AKfycbw0yC-8_V38Zl1-KGyBwX1JmfTEW1jwyFxgpZ-oNC2lvtoAraUtkLCS27HfNbXi_l4IPg/exec');
        const mtf_response_promise = fetch('https://script.google.com/macros/s/AKfycbzkzS4OVm3IfNl6KwOfLZq_uO3MnsXfu-oS5Su_1kxhfo1mMoKpYDm8a4RxWqsQh0qv/exec');
        const ltf_response_promise = fetch('https://script.google.com/macros/s/AKfycbxBLMvyNDsT9_dlVO4Qc31dI4ErcymUHbzKimOpCZHgbJxip2XxCl7Wk3hJyqcdtrxU/exec');
        const wcf_response_promise = fetch('https://script.google.com/macros/s/AKfycbyBFTBuFZ4PkvwmPi_3Pp_v74DCSEK2VpNy6janIGgaAK-P22wazmmShOKn6iwFbrQn/exec');
        const sf_response_promise = fetch('https://script.google.com/macros/s/AKfycby9b2VCfXc0ifkwBXJRi2UVUwgZIj9F4FTOdZa_SYKZdsTwbVtAzAXzNMFeklE35bg1/exec');
        const tpf_response_promise = fetch('https://script.google.com/macros/s/AKfycbwbKss2XtW5lylCrUe8IC-ZA4ffA5CM5tY6kqIja9t80NXJw2nB8RBOJFWbXQz0hWMadw/exec');
        const cod_response_promise = fetch('https://script.google.com/macros/s/AKfycbzgiOuXizUVviCsLVfihqYN9HJ3pyNr7ElHoCl3JGkbtQnChnm2U42yQuLd4UMH0ci5/exec');
        const qlf_response_promise = fetch('https://script.google.com/macros/s/AKfycbyFU_skru2tnyEiv8I5HkpRCXbUlQb5vlJUm8Le0nZBCvfZeFkQPd2Naljs5CZY41I17w/exec');

        const [
            username_response,
            client_list_response,
            type_of_waste_response,
            mtf_response,
            ltf_response,
            wcf_response,
            sf_response,
            tpf_response,
            cod_response,
            qlf_response,
        ] = await Promise.all([
            username_response_promise,
            client_list_response_promise,
            type_of_waste_response_promise,
            mtf_response_promise,
            ltf_response_promise,
            wcf_response_promise,
            sf_response_promise,
            tpf_response_promise,
            cod_response_promise,
            qlf_response_promise,
        ]);

        const username_data_list  = await username_response.json();
        const client_data_list  = await client_list_response.json();
        const type_of_waste_data_list  = await type_of_waste_response.json();
        const mtf_data_list  = await mtf_response.json();
        const ltf_data_list  = await ltf_response.json();
        const wcf_data_list  = await wcf_response.json();
        const sf_data_list  = await sf_response.json();
        const tpf_data_list  = await tpf_response.json();
        const cod_data_list  = await cod_response.json();
        const qlf_data_list  = await qlf_response.json();

        // Code that depends on the fetched data
        // username_data_list
        const user_sidebar = document.getElementById("user_sidebar");
        const user_sidebar_officer = document.getElementById("user_sidebar_officer");
        const user_sidebar_department = document.getElementById("user_sidebar_department");
        const user = document.getElementById("user");

        user.value = username_data_list.content[4][findTextInArray(username_data_list, "NAME")];
        user_sidebar.innerHTML = `<u>${username_data_list.content[4][findTextInArray(username_data_list, "NAME")]}</u>`;
        user_sidebar_officer.innerText = username_data_list.content[4][findTextInArray(username_data_list, "SECTIONS")];
        user_sidebar_department.innerText = username_data_list.content[4][findTextInArray(username_data_list, "DEPARTMENT")];
    
        // marketing_dashboard
        const marketing_dashboard_pco = document.getElementById("marketing_dashboard_pco");
        const booked_transactions_marketing = marketing_dashboard_pco.querySelector("#booked_transactions");
        const on_hauling_marketing = marketing_dashboard_pco.querySelector("#on_hauling");
        const pending_marketing = marketing_dashboard_pco.querySelector("#pending");
        const received_marketing = marketing_dashboard_pco.querySelector("#received");
        const pending_list_marketing = marketing_dashboard_pco.querySelector("#pending_list"); 
        // certification_dashboard
        const certification_dashboard = document.querySelector("#certification_dashboard");
        const treated_counter_certification = certification_dashboard.querySelector("#treated_counter");
        const pending_counter_certification = certification_dashboard.querySelector("#pending_counter");
        const certified_counter_certification = certification_dashboard.querySelector("#certified_counter");
        const pending_list_certification = certification_dashboard.querySelector("#pending_list");
        const finished_list_certification = certification_dashboard.querySelector("#finished_list");
        let sf_transaction_certification = {};
        let sf_tpf_transaction_certification = {};
        let sf_transaction_certification_date = {};
        let sf_tpf_transaction_certification_date = {};
        let tpf_certification = [];
        let pending_certification = [];
        let finish_certification = [];
        const month_filter = document.querySelector("#month_filter");
        function getCurrentMonthName() {
            const months = ["JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"];
            const currentDate = new Date();
            const currentMonthIndex = currentDate.getMonth();
            
            return months[currentMonthIndex];
        }        
        month_filter.value = getCurrentMonthName();
        month_filter.addEventListener("change", generatePending)
        generatePending();
        function generatePending(){
            sf_transaction_certification = {};
            sf_tpf_transaction_certification = {};
            sf_transaction_certification_date = {};
            sf_tpf_transaction_certification_date = {};
            tpf_certification = [];
            pending_certification = [];
            finish_certification = [];
            var for_logistics_pending_counter_marketing = 0;
            var for_logistics_on_haul_counter_marketing = 0;
            var for_logistics_received_counter_marketing = 0;
            var for_receiving_pending_counter_marketing = 0;
            var for_receiving_received_counter_marketing = 0;    
            var data_value_counter = 1;
            var data_value = "";
            for(let j = mtf_data_list.content.length - 1; j >= 1; j--){
                var status = "PENDING";
                var vehicle = "";
                // for logistics
                if(mtf_data_list.content[j][findTextInArray(mtf_data_list, "SUBMIT TO")] == "LOGISTICS" &&
                month_filter.value == formatMonth(mtf_data_list.content[j][findTextInArray(mtf_data_list, "HAULING DATE")])){
                    vehicle = mtf_data_list.content[j][findTextInArray(mtf_data_list, "TYPE OF VEHICLE")];
                    for(let k = 1; k < ltf_data_list.content.length; k++){
                        if(mtf_data_list.content[j][findTextInArray(mtf_data_list, "MTF #")] == ltf_data_list.content[k][findTextInArray(ltf_data_list, "MTF #")]){
                            status = "ON HAULING";
                            for_logistics_on_haul_counter_marketing += 1;
                            for_logistics_pending_counter_marketing -= 1;
                            for(let m = 1; m < wcf_data_list.content.length; m++){
                                if(ltf_data_list.content[k][findTextInArray(ltf_data_list, "LTF #")] == wcf_data_list.content[m][findTextInArray(wcf_data_list, "LTF/ MTF  #")]){
                                    status = "RECEIVED";
                                    for_logistics_received_counter_marketing += 1;
                                    for_logistics_on_haul_counter_marketing -= 1;
                                }
                            }
                        }
                    }
                    for_logistics_pending_counter_marketing += 1;
                }
                else if(mtf_data_list.content[j][findTextInArray(mtf_data_list, "SUBMIT TO")] == "LOGISTICS" &&
                month_filter.value == "ALL"){
                    vehicle = mtf_data_list.content[j][findTextInArray(mtf_data_list, "TYPE OF VEHICLE")];
                    for(let k = 1; k < ltf_data_list.content.length; k++){
                        if(mtf_data_list.content[j][findTextInArray(mtf_data_list, "MTF #")] == ltf_data_list.content[k][findTextInArray(ltf_data_list, "MTF #")]){
                            status = "ON HAULING";
                            for_logistics_on_haul_counter_marketing += 1;
                            for_logistics_pending_counter_marketing -= 1;
                            for(let m = 1; m < wcf_data_list.content.length; m++){
                                if(ltf_data_list.content[k][findTextInArray(ltf_data_list, "LTF #")] == wcf_data_list.content[m][findTextInArray(wcf_data_list, "LTF/ MTF  #")]){
                                    status = "RECEIVED";
                                    for_logistics_received_counter_marketing += 1;
                                    for_logistics_on_haul_counter_marketing -= 1;
                                }
                            }
                        }
                    }
                    for_logistics_pending_counter_marketing += 1;
                }
                // for receiving
                else if(mtf_data_list.content[j][findTextInArray(mtf_data_list, "SUBMIT TO")] == "RECEIVING" &&
                month_filter.value == formatMonth(mtf_data_list.content[j][findTextInArray(mtf_data_list, "HAULING DATE")])){
                    vehicle = "PROVIDED BY CLIENT";
                    for(let m = 1; m < wcf_data_list.content.length; m++){
                        if((wcf_data_list.content[m][findTextInArray(wcf_data_list, "LTF/ MTF  #")]).slice(0,3) == "MTF"){
                            if(mtf_data_list.content[j][findTextInArray(mtf_data_list, "MTF #")] == wcf_data_list.content[m][findTextInArray(wcf_data_list, "LTF/ MTF  #")]){
                                status = "RECEIVED";
                                for_receiving_received_counter_marketing += 1;
                                for_receiving_pending_counter_marketing -= 1;
                            }
                        }
                    }
                    for_receiving_pending_counter_marketing += 1;
                }
                else if(mtf_data_list.content[j][findTextInArray(mtf_data_list, "SUBMIT TO")] == "RECEIVING" &&
                month_filter.value == "ALL"){
                    vehicle = "PROVIDED BY CLIENT";
                    for(let m = 1; m < wcf_data_list.content.length; m++){
                        if((wcf_data_list.content[m][findTextInArray(wcf_data_list, "LTF/ MTF  #")]).slice(0,3) == "MTF"){
                            if(mtf_data_list.content[j][findTextInArray(mtf_data_list, "MTF #")] == wcf_data_list.content[m][findTextInArray(wcf_data_list, "LTF/ MTF  #")]){
                                status = "RECEIVED";
                                for_receiving_received_counter_marketing += 1;
                                for_receiving_pending_counter_marketing -= 1;
                            }
                        }
                    }
                    for_receiving_pending_counter_marketing += 1;
                }
                if(month_filter.value == formatMonth(mtf_data_list.content[j][findTextInArray(mtf_data_list, "HAULING DATE")])){
                    data_value +=`
                    <tr>
                        <td>${data_value_counter}</td>
                        <td>${mtf_data_list.content[j][findTextInArray(mtf_data_list, "MTF #")]}</td>
                        <td>${date_decoder(mtf_data_list.content[j][findTextInArray(mtf_data_list, "HAULING DATE")])} /<br> ${time_decoder(mtf_data_list.content[j][findTextInArray(mtf_data_list, "HAULING TIME")])}</td>
                        <td>${findClientName(mtf_data_list.content[j][findTextInArray(mtf_data_list, "CLIENT ID")])}</td>
                        <td>${findWasteCode(mtf_data_list.content[j][findTextInArray(mtf_data_list, "WASTE ID")])}</td>
                        <td>${findWasteName(mtf_data_list.content[j][findTextInArray(mtf_data_list, "WASTE NAME")], (mtf_data_list.content[j][findTextInArray(mtf_data_list, "WASTE ID")]))}</td>
                        <td>${vehicle}</td>
                        <td>${mtf_data_list.content[j][findTextInArray(mtf_data_list, "SUBMIT TO")]}</td>
                        <td>${status}</td>
                        <td>${mtf_data_list.content[j][findTextInArray(mtf_data_list, "REMARKS")]}</td>
                        <td>${mtf_data_list.content[j][findTextInArray(mtf_data_list, "SUBMITTED BY")]}</td>
                    </tr>
                    `
                    data_value_counter += 1;
                    pending_list_marketing.innerHTML = data_value;
                }
                else if(month_filter.value == "ALL"){
                    data_value +=`
                    <tr>
                        <td>${data_value_counter}</td>
                        <td>${mtf_data_list.content[j][findTextInArray(mtf_data_list, "MTF #")]}</td>
                        <td>${date_decoder(mtf_data_list.content[j][findTextInArray(mtf_data_list, "HAULING DATE")])} /<br> ${time_decoder(mtf_data_list.content[j][findTextInArray(mtf_data_list, "HAULING TIME")])}</td>
                        <td>${findClientName(mtf_data_list.content[j][findTextInArray(mtf_data_list, "CLIENT ID")])}</td>
                        <td>${findWasteCode(mtf_data_list.content[j][findTextInArray(mtf_data_list, "WASTE ID")])}</td>
                        <td>${findWasteName(mtf_data_list.content[j][findTextInArray(mtf_data_list, "CLIENT ID")], (mtf_data_list.content[j][findTextInArray(mtf_data_list, "WASTE ID")]))}</td>
                        <td>${vehicle}</td>
                        <td>${mtf_data_list.content[j][findTextInArray(mtf_data_list, "SUBMIT TO")]}</td>
                        <td>${status}</td>
                        <td>${mtf_data_list.content[j][findTextInArray(mtf_data_list, "REMARKS")]}</td>
                        <td>${mtf_data_list.content[j][findTextInArray(mtf_data_list, "SUBMITTED BY")]}</td>
                    </tr>
                    `
                    data_value_counter += 1;
                    pending_list_marketing.innerHTML = data_value;
                }
            }
            booked_transactions_marketing.innerText = for_logistics_on_haul_counter_marketing + for_logistics_pending_counter_marketing + for_receiving_pending_counter_marketing + for_logistics_received_counter_marketing + for_receiving_received_counter_marketing;
            on_hauling_marketing.innerText = for_logistics_on_haul_counter_marketing;
            pending_marketing.innerText = for_logistics_pending_counter_marketing + for_receiving_pending_counter_marketing;
            received_marketing.innerText = for_logistics_received_counter_marketing + for_receiving_received_counter_marketing;
    
            var options = {
                series: [for_logistics_pending_counter_marketing + for_receiving_pending_counter_marketing, for_logistics_on_haul_counter_marketing, for_logistics_received_counter_marketing + for_receiving_received_counter_marketing],
                chart: {
                    width: 500, // Set the desired width
                    height: 550, // Set the desired height
                    type: 'pie',
                },
                plotOptions: {
                    pie: {
                        startAngle: 0,
                        endAngle: 360
                    }
                },
                dataLabels: {
                    enabled: false, // Disable data labels inside the pie chart
                },
                fill: {
                    type: 'gradient', // Use solid fill type
                },
                legend: {
                    show: true,
                    position: "left", // Set the legend position to "left"
                    fontSize: '30px', // Increase legend font size as needed
                    formatter: function (seriesName, opts) {
                        // Here, you should use the correct variable to get the series value
                        var seriesValue = opts.w.globals.series[opts.seriesIndex];
                        var totalValue = opts.w.globals.series.reduce((acc, val) => acc + val, 0);
                        var percentage = ((seriesValue / totalValue) * 100).toFixed(2); // Calculate and format the percentage
                        return `${percentage}% ${seriesName}`; // Format legend label as "47.06% Pending"
                    },
                    labels: {
                        useSeriesColors: false, // Use custom color
                    },
                },
                labels: ["Pending", "Ongoing", "Received"],
                colors: ["#dc3545", "#c3c3c3", "#198754"], // Specify solid colors here
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                    }
                }]
            };
            const pieChart2 = document.querySelector("#pieChart2");
            while (pieChart2.firstChild) {
                pieChart2.removeChild(pieChart2.firstChild);
            }
            var chart = new ApexCharts(pieChart2, options);
            chart.render();

            for (let i = 1; i < tpf_data_list.content.length; i++) {
                const tpfNumber = tpf_data_list.content[i][findTextInArray(tpf_data_list, "TPF #")];
                const haulingDate = new Date(tpf_data_list.content[i][findTextInArray(tpf_data_list, "HAULING DATE")]);
                
                if (month_filter.value === formatMonth(haulingDate)) {
                    const weight = tpf_data_list.content[i][findTextInArray(tpf_data_list, "WEIGHT")];
                    
                    // Check if the tpfNumber already exists in the object
                    if (sf_transaction_certification[tpfNumber]) {
                        // If it exists, add the weight to the existing value
                        sf_transaction_certification[tpfNumber] += weight;
                    } else {
                        // If it doesn't exist, create a new entry with the weight
                        sf_transaction_certification[tpfNumber] = weight;
                    }
                    sf_transaction_certification_date[tpfNumber] = haulingDate;
                    if(!tpf_certification.includes(tpf_data_list.content[i][findTextInArray(tpf_data_list, "TPF #")])){
                        tpf_certification.push(tpf_data_list.content[i][findTextInArray(tpf_data_list, "TPF #")])
                    }
                }
                else if (month_filter.value === "ALL") {
                    const weight = tpf_data_list.content[i][findTextInArray(tpf_data_list, "WEIGHT")];
                    
                    // Check if the tpfNumber already exists in the object
                    if (sf_transaction_certification[tpfNumber]) {
                        // If it exists, add the weight to the existing value
                        sf_transaction_certification[tpfNumber] += weight;
                    } else {
                        // If it doesn't exist, create a new entry with the weight
                        sf_transaction_certification[tpfNumber] = weight;
                    }
                    sf_transaction_certification_date[tpfNumber] = haulingDate;
                    if(!tpf_certification.includes(tpf_data_list.content[i][findTextInArray(tpf_data_list, "TPF #")])){
                        tpf_certification.push(tpf_data_list.content[i][findTextInArray(tpf_data_list, "TPF #")])
                    }
                }
            }
            for (let i = 1; i < cod_data_list.content.length; i++) {
                const tpfNumber = cod_data_list.content[i][findTextInArray(cod_data_list, "TPF #")];
                const haulingDate = new Date(cod_data_list.content[i][findTextInArray(cod_data_list, "HAULING DATE")]);
                
                if (month_filter.value === formatMonth(haulingDate)) {
                    const weight = cod_data_list.content[i][findTextInArray(cod_data_list, "WEIGHT")];
                    
                    // Check if the tpfNumber already exists in the object
                    if (sf_tpf_transaction_certification[tpfNumber]) {
                        // If it exists, add the weight to the existing value
                        sf_tpf_transaction_certification[tpfNumber] += weight;
                    } else {
                        // If it doesn't exist, create a new entry with the weight
                        sf_tpf_transaction_certification[tpfNumber] = weight;
                    }
                    sf_tpf_transaction_certification_date[tpfNumber] = haulingDate;
                }
                else if (month_filter.value === "ALL") {
                    const weight = cod_data_list.content[i][findTextInArray(cod_data_list, "WEIGHT")];
                    
                    // Check if the tpfNumber already exists in the object
                    if (sf_tpf_transaction_certification[tpfNumber]) {
                        // If it exists, add the weight to the existing value
                        sf_tpf_transaction_certification[tpfNumber] += weight;
                    } else {
                        // If it doesn't exist, create a new entry with the weight
                        sf_tpf_transaction_certification[tpfNumber] = weight;
                    }
                    sf_tpf_transaction_certification_date[tpfNumber] = haulingDate;
                }
            }
    
            for (const key in sf_transaction_certification) {     
                // Check if the key exists in sf_tpf_transaction_certification
                if (sf_tpf_transaction_certification[key]) {
                    // If it exists in sf_tpf_transaction_certification, add both "tpf #" and weight to finish_certification
                    finish_certification.push({ tpfNumber: key, weight: sf_tpf_transaction_certification[key], date: sf_tpf_transaction_certification_date[key]});
                } else {
                    // If it doesn't exist in sf_tpf_transaction_certification, add both "tpf #" and weight to pending_certification
                    pending_certification.push({ tpfNumber: key, weight: sf_transaction_certification[key], date: sf_transaction_certification_date[key]});
                }
            }
            pending_certification.sort((a, b) => a.date - b.date);
            finish_certification.sort((a, b) => a.date - b.date);
            treated_counter_certification.innerText = tpf_certification.length;
            pending_counter_certification.innerText = pending_certification.length;
            certified_counter_certification.innerText = finish_certification.length;
            var options = {
                series: [pending_certification.length, finish_certification.length],
                chart: {
                    width: 500, // Set the desired width
                    height: 550, // Set the desired height
                    type: 'pie',
                },
                plotOptions: {
                    pie: {
                        startAngle: 0,
                        endAngle: 360
                    }
                },
                dataLabels: {
                    enabled: false, // Disable data labels inside the pie chart
                },
                fill: {
                    type: 'gradient', // Use solid fill type
                },
                legend: {
                    show: true,
                    position: "left", // Set the legend position to "left"
                    fontSize: '30px', // Increase legend font size as needed
                    formatter: function (seriesName, opts) {
                        // Here, you should use the correct variable to get the series value
                        var seriesValue = opts.w.globals.series[opts.seriesIndex];
                        var totalValue = opts.w.globals.series.reduce((acc, val) => acc + val, 0);
                        var percentage = ((seriesValue / totalValue) * 100).toFixed(2); // Calculate and format the percentage
                        return `${percentage}% ${seriesName}`; // Format legend label as "47.06% Pending"
                    },
                    labels: {
                        useSeriesColors: false, // Use custom color
                    },
                },
                labels: ["Pending", "Treated"],
                colors: ["#dc3545", "#198754"], // Specify solid colors here
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                    }
                }]
            };
            const pieChart = document.querySelector("#pieChart");
            while (pieChart.firstChild) {
                pieChart.removeChild(pieChart.firstChild);
            }
            var chart = new ApexCharts(pieChart, options);
            chart.render();

            var data_value = "";
            var data_value_counter = 1;
            for (const item of pending_certification){
                var status;
                var date_accomplished;
                var target_date;
                for(let j = 1; j < tpf_data_list.content.length; j++){
                    if(item.tpfNumber == tpf_data_list.content[j][findTextInArray(tpf_data_list, "TPF #")] &&
                    month_filter.value == formatMonth(tpf_data_list.content[j][findTextInArray(tpf_data_list, "HAULING DATE")])){
                        date_accomplished = new Date(date_decoder(tpf_data_list.content[j][findTextInArray(tpf_data_list, "ACTUAL COMPLETION DATE")]));
                        target_date = new Date(date_decoder(tpf_data_list.content[j][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")]));
                        if(date_accomplished.getDate() < target_date.getDate()){
                            status = "AHEAD OF TIME";
                        }
                        else if(date_accomplished.getDate() == target_date.getDate()){
                            status = "ON TIME";
                        }
                        else if(date_accomplished.getDate() > target_date.getDate()){
                            status = "DELAYED";
                        }
                        var mtf = "";
                        var ltf = "";
                        for(let k = 1; k < wcf_data_list.content.length; k++){
                            if(tpf_data_list.content[j][findTextInArray(tpf_data_list, "WCF #")] == wcf_data_list.content[k][findTextInArray(wcf_data_list, "WCF #")]){
                                if((wcf_data_list.content[k][findTextInArray(wcf_data_list, "LTF/ MTF  #")].substring(0,3) == "MTF")){
                                    mtf = wcf_data_list.content[k][findTextInArray(wcf_data_list, "LTF/ MTF  #")];
                                }else{
                                    ltf = wcf_data_list.content[k][findTextInArray(wcf_data_list, "LTF/ MTF  #")];
                                    for(let x = 1; x < ltf_data_list.content.length; x++){
                                        if(ltf == ltf_data_list.content[x][findTextInArray(ltf_data_list, "LTF #")]){
                                            mtf = ltf_data_list.content[x][findTextInArray(ltf_data_list, "MTF #")];
                                            break
                                        }
                                    }
                                }
                            }
                        }
                        data_value +=`
                        <tr>
                            <td>${data_value_counter}</td>
                            <td>${tpf_data_list.content[j][findTextInArray(tpf_data_list, "TPF #")]}</td>
                            <td>${mtf}</td>
                            <td>${date_decoder(tpf_data_list.content[j][findTextInArray(tpf_data_list, "HAULING DATE")])}
                            <td>${date_decoder(tpf_data_list.content[j][findTextInArray(tpf_data_list, "ACTUAL COMPLETION DATE")])} /<br> ${time_decoder(tpf_data_list.content[j][findTextInArray(tpf_data_list, "ACTUAL COMPLETION TIME")])}</td>
                            <td>${findClientName(tpf_data_list.content[j][findTextInArray(tpf_data_list, "CLIENT ID")])}</td>
                            <td>${findWasteCode(tpf_data_list.content[j][findTextInArray(tpf_data_list, "WASTE ID")])}</td>
                            <td>${tpf_data_list.content[j][findTextInArray(tpf_data_list, "WASTE NAME")]}</td>
                            <td>${item.weight} kg.</td>
                            <td>${date_decoder(tpf_data_list.content[j][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")])}</td>
                            <td>${status}</td>
                            </tr>
                        `
                        data_value_counter += 1;
                        break
                    }
                    else if(item.tpfNumber == tpf_data_list.content[j][findTextInArray(tpf_data_list, "TPF #")] &&
                    month_filter.value == "ALL"){
                        date_accomplished = new Date(date_decoder(tpf_data_list.content[j][findTextInArray(tpf_data_list, "ACTUAL COMPLETION DATE")]));
                        target_date = new Date(date_decoder(tpf_data_list.content[j][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")]));
                        if(date_accomplished.getDate() < target_date.getDate()){
                            status = "AHEAD OF TIME";
                        }
                        else if(date_accomplished.getDate() == target_date.getDate()){
                            status = "ON TIME";
                        }
                        else if(date_accomplished.getDate() > target_date.getDate()){
                            status = "DELAYED";
                        }
                        var mtf = "";
                        var ltf = "";
                        for(let k = 1; k < wcf_data_list.content.length; k++){
                            if(tpf_data_list.content[j][findTextInArray(tpf_data_list, "WCF #")] == wcf_data_list.content[k][findTextInArray(wcf_data_list, "WCF #")]){
                                if((wcf_data_list.content[k][findTextInArray(wcf_data_list, "LTF/ MTF  #")].substring(0,3) == "MTF")){
                                    mtf = wcf_data_list.content[k][findTextInArray(wcf_data_list, "LTF/ MTF  #")];
                                }else{
                                    ltf = wcf_data_list.content[k][findTextInArray(wcf_data_list, "LTF/ MTF  #")];
                                    for(let x = 1; x < ltf_data_list.content.length; x++){
                                        if(ltf == ltf_data_list.content[x][findTextInArray(ltf_data_list, "LTF #")]){
                                            mtf = ltf_data_list.content[x][findTextInArray(ltf_data_list, "MTF #")];
                                            break
                                        }
                                    }
                                }
                            }
                        }
                        data_value +=`
                        <tr>
                            <td>${data_value_counter}</td>
                            <td>${tpf_data_list.content[j][findTextInArray(tpf_data_list, "TPF #")]}</td>
                            <td>${mtf}</td>
                            <td>${date_decoder(tpf_data_list.content[j][findTextInArray(tpf_data_list, "HAULING DATE")])}
                            <td>${date_decoder(tpf_data_list.content[j][findTextInArray(tpf_data_list, "ACTUAL COMPLETION DATE")])} /<br> ${time_decoder(tpf_data_list.content[j][findTextInArray(tpf_data_list, "ACTUAL COMPLETION TIME")])}</td>
                            <td>${findClientName(tpf_data_list.content[j][findTextInArray(tpf_data_list, "CLIENT ID")])}</td>
                            <td>${findWasteCode(tpf_data_list.content[j][findTextInArray(tpf_data_list, "WASTE ID")])}</td>
                            <td>${tpf_data_list.content[j][findTextInArray(tpf_data_list, "WASTE NAME")]}</td>
                            <td>${tpf_data_list.content[j][findTextInArray(tpf_data_list, "WEIGHT")]} kg.</td>
                            <td>${date_decoder(tpf_data_list.content[j][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")])}</td>
                            <td>${status}</td>
                            </tr>
                        `
                        data_value_counter += 1;
                        break
                    }
                }
            }
            pending_list_certification.innerHTML = data_value;
    
            var data_value = "";
            var data_value_counter = 1;
            const finished = [];
            for (const item of finish_certification){
                var status;
                var date_accomplished;
                var target_date;
                for(let j = 1; j < tpf_data_list.content.length; j++){
                    if(!finished.includes(item.tpfNumber) &&
                    item.tpfNumber == tpf_data_list.content[j][findTextInArray(tpf_data_list, "TPF #")] &&
                    month_filter.value == formatMonth(tpf_data_list.content[j][findTextInArray(tpf_data_list, "HAULING DATE")])){
                        finished.push(item.tpfNumber)
                        date_accomplished = new Date(date_decoder(tpf_data_list.content[j][findTextInArray(tpf_data_list, "ACTUAL COMPLETION DATE")]));
                        target_date = new Date(date_decoder(tpf_data_list.content[j][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")]));
                        if(date_accomplished.getDate() < target_date.getDate()){
                            status = "AHEAD OF TIME";
                        }
                        else if(date_accomplished.getDate() == target_date.getDate()){
                            status = "ON TIME";
                        }
                        else if(date_accomplished.getDate() > target_date.getDate()){
                            status = "DELAYED";
                        }
                        var cod_no;
                        var finished_date;
                        var finished_time;
                        for(let k = 1; k < cod_data_list.content.length; k++){
                            if(tpf_data_list.content[j][findTextInArray(tpf_data_list, "TPF #")] == cod_data_list.content[k][findTextInArray(cod_data_list, "TPF #")]){
                                cod_no = cod_data_list.content[k][findTextInArray(cod_data_list, "COD #")];
                                finished_date = date_decoder(cod_data_list.content[k][findTextInArray(cod_data_list, "ACTUAL COMPLETION DATE")]);
                                finished_time = time_decoder(cod_data_list.content[k][findTextInArray(cod_data_list, "ACTUAL COMPLETION TIME")]);
                            }
                        }
                        var mtf = "";
                        var ltf = "";
                        for(let k = 1; k < wcf_data_list.content.length; k++){
                            if(tpf_data_list.content[j][findTextInArray(tpf_data_list, "WCF #")] == wcf_data_list.content[k][findTextInArray(wcf_data_list, "WCF #")]){
                                if((wcf_data_list.content[k][findTextInArray(wcf_data_list, "LTF/ MTF  #")].substring(0,3) == "MTF")){
                                    mtf = wcf_data_list.content[k][findTextInArray(wcf_data_list, "LTF/ MTF  #")];
                                }else{
                                    ltf = wcf_data_list.content[k][findTextInArray(wcf_data_list, "LTF/ MTF  #")];
                                    for(let x = 1; x < ltf_data_list.content.length; x++){
                                        if(ltf == ltf_data_list.content[x][findTextInArray(ltf_data_list, "LTF #")]){
                                            mtf = ltf_data_list.content[x][findTextInArray(ltf_data_list, "MTF #")];
                                            break
                                        }
                                    }
                                }
                            }
                        }
                        data_value +=`
                        <tr>
                            <td>${data_value_counter}</td>
                            <td>${cod_no}</td>
                            <td>${mtf}</td>
                            <td>${date_decoder(tpf_data_list.content[j][findTextInArray(tpf_data_list, "HAULING DATE")])}
                            <td>${date_decoder(tpf_data_list.content[j][findTextInArray(tpf_data_list, "ACTUAL COMPLETION DATE")])} /<br> ${time_decoder(tpf_data_list.content[j][findTextInArray(tpf_data_list, "ACTUAL COMPLETION TIME")])}</td>
                            <td>${findClientName(tpf_data_list.content[j][findTextInArray(tpf_data_list, "CLIENT ID")])}</td>
                            <td>${findWasteCode(tpf_data_list.content[j][findTextInArray(tpf_data_list, "WASTE ID")])}</td>
                            <td>${tpf_data_list.content[j][findTextInArray(tpf_data_list, "WASTE NAME")]}</td>
                            <td>${tpf_data_list.content[j][findTextInArray(tpf_data_list, "WEIGHT")]} kg.</td>
                            <td>${date_decoder(tpf_data_list.content[j][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")])}</td>
                            <td>${status}</td>
                            <td>${finished_date} /<br> ${finished_time}</td>
                            <td>${calculateTravelTime(date_decoder(tpf_data_list.content[j][findTextInArray(tpf_data_list, "ACTUAL COMPLETION DATE")]),time_decoder(tpf_data_list.content[j][findTextInArray(tpf_data_list, "ACTUAL COMPLETION TIME")]),finished_date,finished_time)}</td>
                        </tr>
                        `
                        data_value_counter += 1;
                    }
                    else if(!finished.includes(item.tpfNumber) &&
                    item.tpfNumber == tpf_data_list.content[j][findTextInArray(tpf_data_list, "TPF #")] &&
                    month_filter.value == "ALL"){
                        finished.push(item.tpfNumber)
                        date_accomplished = new Date(date_decoder(tpf_data_list.content[j][findTextInArray(tpf_data_list, "ACTUAL COMPLETION DATE")]));
                        target_date = new Date(date_decoder(tpf_data_list.content[j][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")]));
                        if(date_accomplished.getDate() < target_date.getDate()){
                            status = "AHEAD OF TIME";
                        }
                        else if(date_accomplished.getDate() == target_date.getDate()){
                            status = "ON TIME";
                        }
                        else if(date_accomplished.getDate() > target_date.getDate()){
                            status = "DELAYED";
                        }
                        var cod_no;
                        var finished_date;
                        var finished_time;
                        for(let k = 1; k < cod_data_list.content.length; k++){
                            if(tpf_data_list.content[j][findTextInArray(tpf_data_list, "TPF #")] == cod_data_list.content[k][findTextInArray(cod_data_list, "TPF #")]){
                                cod_no = cod_data_list.content[k][findTextInArray(cod_data_list, "COD #")];
                                finished_date = date_decoder(cod_data_list.content[k][findTextInArray(cod_data_list, "ACTUAL COMPLETION DATE")]);
                                finished_time = time_decoder(cod_data_list.content[k][findTextInArray(cod_data_list, "ACTUAL COMPLETION TIME")]);
                            }
                        }
                        var mtf = "";
                        var ltf = "";
                        for(let k = 1; k < wcf_data_list.content.length; k++){
                            if(tpf_data_list.content[j][findTextInArray(tpf_data_list, "WCF #")] == wcf_data_list.content[k][findTextInArray(wcf_data_list, "WCF #")]){
                                if((wcf_data_list.content[k][findTextInArray(wcf_data_list, "LTF/ MTF  #")].substring(0,3) == "MTF")){
                                    mtf = wcf_data_list.content[k][findTextInArray(wcf_data_list, "LTF/ MTF  #")];
                                }else{
                                    ltf = wcf_data_list.content[k][findTextInArray(wcf_data_list, "LTF/ MTF  #")];
                                    for(let x = 1; x < ltf_data_list.content.length; x++){
                                        if(ltf == ltf_data_list.content[x][findTextInArray(ltf_data_list, "LTF #")]){
                                            mtf = ltf_data_list.content[x][findTextInArray(ltf_data_list, "MTF #")];
                                            break
                                        }
                                    }
                                }
                            }
                        }
                        data_value +=`
                        <tr>
                            <td>${data_value_counter}</td>
                            <td>${cod_no}</td>
                            <td>${tpf_data_list.content[j][findTextInArray(tpf_data_list, "TPF #")]}</td>
                            <td>${date_decoder(tpf_data_list.content[j][findTextInArray(tpf_data_list, "HAULING DATE")])}</td>
                            <td>${date_decoder(tpf_data_list.content[j][findTextInArray(tpf_data_list, "ACTUAL COMPLETION DATE")])} /<br> ${time_decoder(tpf_data_list.content[j][findTextInArray(tpf_data_list, "ACTUAL COMPLETION TIME")])}</td>
                            <td>${findClientName(tpf_data_list.content[j][findTextInArray(tpf_data_list, "CLIENT ID")])}</td>
                            <td>${findWasteCode(tpf_data_list.content[j][findTextInArray(tpf_data_list, "WASTE ID")])}</td>
                            <td>${tpf_data_list.content[j][findTextInArray(tpf_data_list, "WASTE NAME")]}</td>
                            <td>${tpf_data_list.content[j][findTextInArray(tpf_data_list, "WEIGHT")]} kg.</td>
                            <td>${date_decoder(tpf_data_list.content[j][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")])}</td>
                            <td>${status}</td>
                            <td>${finished_date} /<br> ${finished_time}</td>
                            <td>${calculateTravelTime(date_decoder(tpf_data_list.content[j][findTextInArray(tpf_data_list, "ACTUAL COMPLETION DATE")]),time_decoder(tpf_data_list.content[j][findTextInArray(tpf_data_list, "ACTUAL COMPLETION TIME")]),finished_date,finished_time)}</td>
                        </tr>
                        `
                        data_value_counter += 1;
                    }
                }
            }
            finished_list_certification.innerHTML = data_value;

        }

        // cod_data_list
        // FORM GENERATOR
        const cod_form_no = document.getElementById("cod_form_no");
        const df_no = document.getElementById("df_no");
        var last_row = cod_data_list.content.length -1;
        var data_info = cod_data_list.content[last_row][findTextInArray(cod_data_list, "COD #")];
        var data_counter;
        if(last_row == 0){
            data_counter = 0;
        }
        else{
            data_counter = data_info.substring(9,12);
        }
        var year = new Date().getFullYear();
        var month = (new Date().getMonth() + 1).toString().padStart(2, "0");
        data_counter = (parseInt(data_counter) +1).toString().padStart(3, "0");
        cod_form_no.value = `COD${year}${month}${data_counter}`;
        df_no.innerText = `COD${year}${month}${data_counter}`;
    
        // tpf_data_list
        var data_value2 = [];
        for (x = 1; x < client_data_list.content.length; x++) {
            data_value2.push(client_data_list.content[x][findTextInArray(client_data_list, "CLIENT NAME")]);
        }
        const search_wrapper = document.getElementById("cod_search_client");
        const input_box = search_wrapper.querySelector("input");
        const sugg_box = search_wrapper.querySelector(".autocom_box");

        input_box.onkeyup = (e) => {
            let user_data = e.target.value;
            let empty_array = [];
            if (user_data) {
                empty_array = data_value2.filter((data2) => {
                    return data2.toLowerCase().startsWith(user_data.toLowerCase());
                });
                empty_array = empty_array.map((data2) => {
                    return '<li>' + data2 + '</li>';
                });
                search_wrapper.classList.add("active");
                show_suggestions(empty_array);
            } else {
                search_wrapper.classList.remove("active");
            }
        };

        sugg_box.addEventListener("click", (e) => {
            if (e.target.tagName === "LI") {
                select(e.target.innerText);
            }
        });

        function select(element) {
            let select_user_data = element;
            input_box.value = select_user_data;
            search_wrapper.classList.remove("active");
        }

        function show_suggestions(list) {
            let list_data;
            if (!list.length) {
                user_value = input_box.value;
                list_data = '<li>' + user_value + '</li>';
            } else {
                list_data = list.join("");
            }
            sugg_box.innerHTML = list_data;
        }

        const generate_button = document.getElementById("generate_button");
        const what_to_print = document.getElementById("what_to_print");
        const convertToPDFandDownload_button = document.getElementById("convertToPDFandDownload_button");
        const client_container = document.getElementById("client_container");
        const completion = document.getElementById("completion");
        const type_of_cod = document.getElementById("type_of_cod");
        const table_company = document.getElementById("table_company");
        const table_company_address = document.getElementById("table_company_address");
        const certification = document.getElementById("certification");
        const certification2 = document.getElementById("certification2");
        const certification3 = document.getElementById("certification3");
        const table_data_input_value = document.getElementById("table_data_input_value");
        const result_remarks = document.getElementById("result_remarks");
        const table_data = document.getElementById("table_data");
        const table_head_data = document.getElementById("table_head_data");
        
        var certification_date = "";
        var certification_day = "";
        var certification_day_ordinal;
        var certification_month = "";
        var year = "";
        var month = "";
        var hauling_date
        generate_button.addEventListener("click", choose);
        function choose() {
            const done = [];
            var table_data_value = "";
            var table_head_data_value = "";
            var table_data_input = "";
            var table_data_counter = 0;
            if(type_of_cod.value == "By Waste Description"){
                const waste_description = document.getElementById("waste_description");
                const year_covered = document.getElementById("year_covered");
                const month_covered = document.getElementById("month_covered");    
                for (const item of pending_certification){
                    for (let x = 1; x < tpf_data_list.content.length; x++) {
                        if(tpf_data_list.content[x][findTextInArray(tpf_data_list, "TPF #")] == item.tpfNumber){
                            if (!done.includes(item.tpfNumber) && input_box.value === findClientName(tpf_data_list.content[x][findTextInArray(tpf_data_list, "CLIENT ID")])) {
                            done.push(item.tpfNumber)
                            year = (new Date(tpf_data_list.content[x][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")])).getFullYear();
                            month = (new Date(tpf_data_list.content[x][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")])).getMonth() + 1;
                            certification_date = tpf_data_list.content[x][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")];
                            certification_day = new Date(certification_date).getDate();
                            certification_day_ordinal = convertToOrdinal(certification_day);
                            certification_month = convertToMonthName(month);
                            if (waste_description.value == findWasteName(tpf_data_list.content[x][findTextInArray(tpf_data_list, "CLIENT ID")], tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE ID")]) &&
                                year_covered.value == year &&
                                month_covered.value == month) {
                                var pull_out_form = ""
                                    for(let y = 1; y < sf_data_list.content.length; y++){
                                        if(tpf_data_list.content[x][findTextInArray(tpf_data_list, "SF #")] == sf_data_list.content[y][findTextInArray(sf_data_list, "SF #")])
                                        pull_out_form = sf_data_list.content[y][findTextInArray(sf_data_list, "FORM #")]
                                    }
                                    for(let y = 1; y < wcf_data_list.content.length; y++){
                                        if(tpf_data_list.content[x][findTextInArray(tpf_data_list, "SF #")] == wcf_data_list.content[y][findTextInArray(wcf_data_list, "WCF #")])
                                        pull_out_form = wcf_data_list.content[y][findTextInArray(wcf_data_list, "PULL OUT FORM #")]
                                    }
                                    table_data_counter += 1;
                                    if(tpf_data_list.content[x][findTextInArray(tpf_data_list, "CLIENT ID")] == "C2023015"){
                                        table_data_value +=
                                        `<tr>
                                        <td>${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "HAULING DATE")])}</td>
                                        <td>${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE NAME")]}</td>
                                        <td>TS ${pull_out_form}</td>
                                        <td style="font-weight: bold">${formatNumber(tpf_data_list.content[x][findTextInArray(tpf_data_list, "WEIGHT")])} kgs.</td>
                                        <td>${tpf_data_list.content[x][findTextInArray(tpf_data_list, "DESTRUCTION PROCESS")]}</td>
                                        <td>${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")])}</td>
                                        </tr>
                                        `;
                                        table_head_data_value = 
                                        `
                                        <th>Date Hauled</th>
                                        <th>Class and Description of Waste</th>
                                        <th>Gate pass No./<br>TS No.</th>
                                        <th>Quantity</th>
                                        <th>Destruction Process</th>
                                        <th>Date of Completion</th>
                                        `
                                        table_data_input += `
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "TPF #")]}" name="tpf_no_input${table_data_counter}" id="tpf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "SF #")]}" name="sf_no_input${table_data_counter}" id="sf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WCF #")]}" name="wcf_no_input${table_data_counter}" id="wcf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "CLIENT ID")]}" name="client_input${table_data_counter}" id="client_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE ID")]}" name="waste_description_input${table_data_counter}" id="waste_description_input${table_data_counter}">
                                        <input type="hidden" value="${findWasteCode(tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE ID")])}" name="waste_code_input${table_data_counter}" id="waste_code_input${table_data_counter}">
                                        <input type="hidden" value="TS ${pull_out_form}" name="pull_out_form${table_data_counter}" id="pull_out_form${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE NAME")]}" name="waste_name_input${table_data_counter}" id="waste_name_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WEIGHT")]}" name="weight_input${table_data_counter}" id="weight_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "DESTRUCTION PROCESS")]}" name="destruction_process_input${table_data_counter}" id="destruction_process_input${table_data_counter}">
                                        <input type="hidden" value="${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "HAULING DATE")])}" name="hauling_date_input${table_data_counter}" id="hauling_date_input${table_data_counter}">    
                                        <input type="hidden" value="${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")])}" name="certification_date_input${table_data_counter}" id="certification_date_input${table_data_counter}">    
                                        `
                                    }
                                    else if(tpf_data_list.content[x][findTextInArray(tpf_data_list, "CLIENT ID")] == "C2023026"){
                                        table_data_value +=
                                        `<tr>
                                        <td>${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "HAULING DATE")])}</td>
                                        <td>${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE NAME")]}</td>
                                        <td>${pull_out_form}</td>
                                        <td style="font-weight: bold">${formatNumber(item.weight)} kgs.</td>
                                        <td>${tpf_data_list.content[x][findTextInArray(tpf_data_list, "DESTRUCTION PROCESS")]}</td>
                                        <td>${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")])}</td>
                                        </tr>
                                        `;
                                        table_head_data_value = 
                                        `
                                        <th>Date Hauled</th>
                                        <th>Class and Description of Waste</th>
                                        <th>Gate pass No.</th>
                                        <th>Quantity</th>
                                        <th>Destruction Process</th>
                                        <th>Date of Completion</th>
                                        `
                                        table_data_input += `
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "TPF #")]}" name="tpf_no_input${table_data_counter}" id="tpf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "SF #")]}" name="sf_no_input${table_data_counter}" id="sf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WCF #")]}" name="wcf_no_input${table_data_counter}" id="wcf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "CLIENT ID")]}" name="client_input${table_data_counter}" id="client_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE ID")]}" name="waste_description_input${table_data_counter}" id="waste_description_input${table_data_counter}">
                                        <input type="hidden" value="${findWasteCode(tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE ID")])}" name="waste_code_input${table_data_counter}" id="waste_code_input${table_data_counter}">
                                        <input type="hidden" value="${pull_out_form}" name="pull_out_form${table_data_counter}" id="pull_out_form${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE NAME")]}" name="waste_name_input${table_data_counter}" id="waste_name_input${table_data_counter}">
                                        <input type="hidden" value="${item.weight}" name="weight_input${table_data_counter}" id="weight_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "DESTRUCTION PROCESS")]}" name="destruction_process_input${table_data_counter}" id="destruction_process_input${table_data_counter}">
                                        <input type="hidden" value="${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "HAULING DATE")])}" name="hauling_date_input${table_data_counter}" id="hauling_date_input${table_data_counter}">    
                                        <input type="hidden" value="${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")])}" name="certification_date_input${table_data_counter}" id="certification_date_input${table_data_counter}">    
                                        `
                                    }
                                    else if(tpf_data_list.content[x][findTextInArray(tpf_data_list, "CLIENT ID")] == "C2023018"){
                                        table_data_value +=
                                        `<tr>
                                        <td>${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "HAULING DATE")])}</td>
                                        <td>${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE NAME")]}</td>
                                        <td>${pull_out_form}</td>
                                        <td style="font-weight: bold">${formatNumber(item.weight)} kgs.</td>
                                        <td>${tpf_data_list.content[x][findTextInArray(tpf_data_list, "DESTRUCTION PROCESS")]}</td>
                                        <td>${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")])}</td>
                                        </tr>
                                        `;
                                        table_head_data_value = 
                                        `
                                        <th>Date Hauled</th>
                                        <th>Class and Description of Waste</th>
                                        <th>Truck Scale Form #</th>
                                        <th>Quantity</th>
                                        <th>Destruction Process</th>
                                        <th>Date of Completion</th>
                                        `
                                        table_data_input += `
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "TPF #")]}" name="tpf_no_input${table_data_counter}" id="tpf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "SF #")]}" name="sf_no_input${table_data_counter}" id="sf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WCF #")]}" name="wcf_no_input${table_data_counter}" id="wcf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "CLIENT ID")]}" name="client_input${table_data_counter}" id="client_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE ID")]}" name="waste_description_input${table_data_counter}" id="waste_description_input${table_data_counter}">
                                        <input type="hidden" value="${findWasteCode(tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE ID")])}" name="waste_code_input${table_data_counter}" id="waste_code_input${table_data_counter}">
                                        <input type="hidden" value="${pull_out_form}" name="pull_out_form${table_data_counter}" id="pull_out_form${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE NAME")]}" name="waste_name_input${table_data_counter}" id="waste_name_input${table_data_counter}">
                                        <input type="hidden" value="${item.weight}" name="weight_input${table_data_counter}" id="weight_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "DESTRUCTION PROCESS")]}" name="destruction_process_input${table_data_counter}" id="destruction_process_input${table_data_counter}">
                                        <input type="hidden" value="${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "HAULING DATE")])}" name="hauling_date_input${table_data_counter}" id="hauling_date_input${table_data_counter}">    
                                        <input type="hidden" value="${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")])}" name="certification_date_input${table_data_counter}" id="certification_date_input${table_data_counter}">    
                                        `
                                    }
                                    else if(tpf_data_list.content[x][findTextInArray(tpf_data_list, "CLIENT ID")] == "C2023016"){
                                        table_data_value +=
                                        `<tr>
                                        <td>${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "HAULING DATE")])}</td>
                                        <td>${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE NAME")]}</td>
                                        <td>GPF ${pull_out_form}</td>
                                        <td style="font-weight: bold">${formatNumber(item.weight)} kgs.</td>
                                        <td>${tpf_data_list.content[x][findTextInArray(tpf_data_list, "DESTRUCTION PROCESS")]}</td>
                                        <td>${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")])}</td>
                                        </tr>
                                        `;
                                        table_head_data_value = 
                                        `
                                        <th>Date Hauled</th>
                                        <th>Class and Description of Waste</th>
                                        <th>Gate Pass No.</th>
                                        <th>Quantity</th>
                                        <th>Destruction Process</th>
                                        <th>Date of Completion</th>
                                        `
                                        table_data_input += `
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "TPF #")]}" name="tpf_no_input${table_data_counter}" id="tpf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "SF #")]}" name="sf_no_input${table_data_counter}" id="sf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WCF #")]}" name="wcf_no_input${table_data_counter}" id="wcf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "CLIENT ID")]}" name="client_input${table_data_counter}" id="client_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE ID")]}" name="waste_description_input${table_data_counter}" id="waste_description_input${table_data_counter}">
                                        <input type="hidden" value="${findWasteCode(tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE ID")])}" name="waste_code_input${table_data_counter}" id="waste_code_input${table_data_counter}">
                                        <input type="hidden" value="GPF ${pull_out_form}" name="pull_out_form${table_data_counter}" id="pull_out_form${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE NAME")]}" name="waste_name_input${table_data_counter}" id="waste_name_input${table_data_counter}">
                                        <input type="hidden" value="${item.weight}" name="weight_input${table_data_counter}" id="weight_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "DESTRUCTION PROCESS")]}" name="destruction_process_input${table_data_counter}" id="destruction_process_input${table_data_counter}">
                                        <input type="hidden" value="${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "HAULING DATE")])}" name="hauling_date_input${table_data_counter}" id="hauling_date_input${table_data_counter}">    
                                        <input type="hidden" value="${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")])}" name="certification_date_input${table_data_counter}" id="certification_date_input${table_data_counter}">    
                                        `
                                    }
                                    else if(tpf_data_list.content[x][findTextInArray(tpf_data_list, "CLIENT ID")] == "C2023036"){
                                        table_data_value +=
                                        `<tr>
                                        <td>${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "HAULING DATE")])}</td>
                                        <td>${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE NAME")]}</td>
                                        <td>${pull_out_form}</td>
                                        <td style="font-weight: bold">${formatNumber(item.weight)} kgs.</td>
                                        <td>${tpf_data_list.content[x][findTextInArray(tpf_data_list, "DESTRUCTION PROCESS")]}</td>
                                        <td>${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")])}</td>
                                        </tr>
                                        `;
                                        table_head_data_value = 
                                        `
                                        <th>Date Hauled</th>
                                        <th>Class and Description of Waste</th>
                                        <th>Pull Out Slip No.</th>
                                        <th>Quantity</th>
                                        <th>Destruction Process</th>
                                        <th>Date of Completion</th>
                                        `
                                        table_data_input += `
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "TPF #")]}" name="tpf_no_input${table_data_counter}" id="tpf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "SF #")]}" name="sf_no_input${table_data_counter}" id="sf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WCF #")]}" name="wcf_no_input${table_data_counter}" id="wcf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "CLIENT ID")]}" name="client_input${table_data_counter}" id="client_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE ID")]}" name="waste_description_input${table_data_counter}" id="waste_description_input${table_data_counter}">
                                        <input type="hidden" value="${findWasteCode(tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE ID")])}" name="waste_code_input${table_data_counter}" id="waste_code_input${table_data_counter}">
                                        <input type="hidden" value="${pull_out_form}" name="pull_out_form${table_data_counter}" id="pull_out_form${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE NAME")]}" name="waste_name_input${table_data_counter}" id="waste_name_input${table_data_counter}">
                                        <input type="hidden" value="${item.weight}" name="weight_input${table_data_counter}" id="weight_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "DESTRUCTION PROCESS")]}" name="destruction_process_input${table_data_counter}" id="destruction_process_input${table_data_counter}">
                                        <input type="hidden" value="${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "HAULING DATE")])}" name="hauling_date_input${table_data_counter}" id="hauling_date_input${table_data_counter}">    
                                        <input type="hidden" value="${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")])}" name="certification_date_input${table_data_counter}" id="certification_date_input${table_data_counter}">    
                                        `
                                    }
                                    else if(tpf_data_list.content[x][findTextInArray(tpf_data_list, "CLIENT ID")] == "C2023014"){
                                        table_data_value +=
                                        `<tr>
                                        <td>${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "HAULING DATE")])}</td>
                                        <td>${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE NAME")]}</td>
                                        <td>N/A</td>
                                        <td> style="font-weight: bold"${formatNumber(item.weight)} kgs.</td>
                                        <td>${tpf_data_list.content[x][findTextInArray(tpf_data_list, "DESTRUCTION PROCESS")]}</td>
                                        <td>${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")])}</td>
                                        </tr>
                                        `;
                                        table_head_data_value = 
                                        `
                                        <th>Date Hauled</th>
                                        <th>Class and Description of Waste</th>
                                        <th>Waste Code</th>
                                        <th>Quantity</th>
                                        <th>Destruction Process</th>
                                        <th>Date of Completion</th>
                                        `
                                        table_data_input += `
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "TPF #")]}" name="tpf_no_input${table_data_counter}" id="tpf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "SF #")]}" name="sf_no_input${table_data_counter}" id="sf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WCF #")]}" name="wcf_no_input${table_data_counter}" id="wcf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "CLIENT ID")]}" name="client_input${table_data_counter}" id="client_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE ID")]}" name="waste_description_input${table_data_counter}" id="waste_description_input${table_data_counter}">
                                        <input type="hidden" value="${findWasteCode(tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE ID")])}" name="waste_code_input${table_data_counter}" id="waste_code_input${table_data_counter}">
                                        <input type="hidden" value="${pull_out_form}" name="pull_out_form${table_data_counter}" id="pull_out_form${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE NAME")]}" name="waste_name_input${table_data_counter}" id="waste_name_input${table_data_counter}">
                                        <input type="hidden" value="${item.weight}" name="weight_input${table_data_counter}" id="weight_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "DESTRUCTION PROCESS")]}" name="destruction_process_input${table_data_counter}" id="destruction_process_input${table_data_counter}">
                                        <input type="hidden" value="${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "HAULING DATE")])}" name="hauling_date_input${table_data_counter}" id="hauling_date_input${table_data_counter}">    
                                        <input type="hidden" value="${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")])}" name="certification_date_input${table_data_counter}" id="certification_date_input${table_data_counter}">    
                                        `
                                    }
                                    else{
                                        table_data_value +=
                                        `<tr>
                                        <td>${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "HAULING DATE")])}</td>
                                        <td>${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE NAME")]}</td>
                                        <td>${findWasteCode(tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE ID")])}</td>
                                        <td style="font-weight: bold">${formatNumber(item.weight)} kgs.</td>
                                        <td>${tpf_data_list.content[x][findTextInArray(tpf_data_list, "DESTRUCTION PROCESS")]}</td>
                                        <td>${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")])}</td>
                                        </tr>
                                        `;
                                        table_head_data_value = 
                                        `
                                        <th>Date Hauled</th>
                                        <th>Class and Description of Waste</th>
                                        <th>Waste Code</th>
                                        <th>Quantity</th>
                                        <th>Destruction Process</th>
                                        <th>Date of Completion</th>
                                        `
                                        table_data_input += `
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "TPF #")]}" name="tpf_no_input${table_data_counter}" id="tpf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "SF #")]}" name="sf_no_input${table_data_counter}" id="sf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WCF #")]}" name="wcf_no_input${table_data_counter}" id="wcf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "CLIENT ID")]}" name="client_input${table_data_counter}" id="client_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE ID")]}" name="waste_description_input${table_data_counter}" id="waste_description_input${table_data_counter}">
                                        <input type="hidden" value="${findWasteCode(tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE ID")])}" name="waste_code_input${table_data_counter}" id="waste_code_input${table_data_counter}">
                                        <input type="hidden" value="${pull_out_form}" name="pull_out_form${table_data_counter}" id="pull_out_form${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE NAME")]}" name="waste_name_input${table_data_counter}" id="waste_name_input${table_data_counter}">
                                        <input type="hidden" value="${item.weight}" name="weight_input${table_data_counter}" id="weight_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "DESTRUCTION PROCESS")]}" name="destruction_process_input${table_data_counter}" id="destruction_process_input${table_data_counter}">
                                        <input type="hidden" value="${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "HAULING DATE")])}" name="hauling_date_input${table_data_counter}" id="hauling_date_input${table_data_counter}">    
                                        <input type="hidden" value="${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")])}" name="certification_date_input${table_data_counter}" id="certification_date_input${table_data_counter}">    
                                        `
                                    }
                                    table_company.innerHTML = findClientName(tpf_data_list.content[x][findTextInArray(tpf_data_list, "CLIENT ID")]);
                                    table_data_input_value.innerHTML = table_data_input;
                                    for (let y = 1; y < client_data_list.content.length; y++) {
                                        if (input_box.value == client_data_list.content[y][findTextInArray(client_data_list, "CLIENT NAME")]) {
                                            table_company_address.innerHTML = client_data_list.content[y][findTextInArray(client_data_list, "ADDRESS")];
                                        }
                                    }
                                    what_to_print.style.display = "block";
                                    completion.style.display = "grid";    
                                    convertToPDFandDownload_button.style.display = "block";    
                                    table_data.innerHTML = table_data_value;
                                    table_head_data.innerHTML = table_head_data_value;
                                    certification.innerHTML = `${certification_day}`;
                                    certification2.innerHTML = `${certification_day_ordinal} s`;
                                    certification3.innerHTML = ` day of ${certification_month} ${year}`;
                                    result_remarks.innerHTML = "";
                                }
                            }
                        }
                    }    
                }    
            }
            else if(type_of_cod.value == "By Date"){
                const waste_description = document.getElementById("waste_description");
                const year_covered = document.getElementById("year_covered");
                const month_covered = document.getElementById("month_covered");    
                for (const item of pending_certification){
                    for (let x = 1; x < tpf_data_list.content.length; x++) {
                        if(tpf_data_list.content[x][findTextInArray(tpf_data_list, "TPF #")] == item.tpfNumber){
                            if (!done.includes(item.tpfNumber) && input_box.value === findClientName(tpf_data_list.content[x][findTextInArray(tpf_data_list, "CLIENT ID")])) {
                            done.push(item.tpfNumber)
                            year = (new Date(tpf_data_list.content[x][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")])).getFullYear();
                            month = (new Date(tpf_data_list.content[x][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")])).getMonth() + 1;
                            certification_date = tpf_data_list.content[x][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")];
                            certification_day = new Date(certification_date).getDate();
                            certification_day_ordinal = convertToOrdinal(certification_day);
                            certification_month = convertToMonthName(month);
                                if (waste_description.value == certification_day &&
                                    year_covered.value == year &&
                                    month_covered.value == month) {
                                    var pull_out_form = ""
                                    for(let y = 1; y < sf_data_list.content.length; y++){
                                        if(tpf_data_list.content[x][findTextInArray(tpf_data_list, "SF #")] == sf_data_list.content[y][findTextInArray(sf_data_list, "SF #")])
                                        pull_out_form = sf_data_list.content[y][findTextInArray(sf_data_list, "FORM #")]
                                    }
                                    for(let y = 1; y < wcf_data_list.content.length; y++){
                                        if(tpf_data_list.content[x][findTextInArray(tpf_data_list, "SF #")] == wcf_data_list.content[y][findTextInArray(wcf_data_list, "WCF #")])
                                        pull_out_form = wcf_data_list.content[y][findTextInArray(wcf_data_list, "PULL OUT FORM #")]
                                    }
                                    table_data_counter += 1;
                                    if(tpf_data_list.content[x][findTextInArray(tpf_data_list, "CLIENT ID")] == "C2023015"){
                                        table_data_value +=
                                        `<tr>
                                        <td>${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "HAULING DATE")])}</td>
                                        <td>${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE NAME")]}</td>
                                        <td>TS ${pull_out_form}</td>
                                        <td style="font-weight: bold">${formatNumber(tpf_data_list.content[x][findTextInArray(tpf_data_list, "WEIGHT")])} kgs.</td>
                                        <td>${tpf_data_list.content[x][findTextInArray(tpf_data_list, "DESTRUCTION PROCESS")]}</td>
                                        <td>${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")])}</td>
                                        </tr>
                                        `;
                                        table_head_data_value = 
                                        `
                                        <th>Date Hauled</th>
                                        <th>Class and Description of Waste</th>
                                        <th>Gate pass No./<br>TS No.</th>
                                        <th>Quantity</th>
                                        <th>Destruction Process</th>
                                        <th>Date of Completion</th>
                                        `
                                        table_data_input += `
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "TPF #")]}" name="tpf_no_input${table_data_counter}" id="tpf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "SF #")]}" name="sf_no_input${table_data_counter}" id="sf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WCF #")]}" name="wcf_no_input${table_data_counter}" id="wcf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "CLIENT ID")]}" name="client_input${table_data_counter}" id="client_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE ID")]}" name="waste_description_input${table_data_counter}" id="waste_description_input${table_data_counter}">
                                        <input type="hidden" value="${findWasteCode(tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE ID")])}" name="waste_code_input${table_data_counter}" id="waste_code_input${table_data_counter}">
                                        <input type="hidden" value="TS ${pull_out_form}" name="pull_out_form${table_data_counter}" id="pull_out_form${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE NAME")]}" name="waste_name_input${table_data_counter}" id="waste_name_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WEIGHT")]}" name="weight_input${table_data_counter}" id="weight_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "DESTRUCTION PROCESS")]}" name="destruction_process_input${table_data_counter}" id="destruction_process_input${table_data_counter}">
                                        <input type="hidden" value="${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "HAULING DATE")])}" name="hauling_date_input${table_data_counter}" id="hauling_date_input${table_data_counter}">    
                                        <input type="hidden" value="${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")])}" name="certification_date_input${table_data_counter}" id="certification_date_input${table_data_counter}">    
                                        `
                                    }
                                    else if(tpf_data_list.content[x][findTextInArray(tpf_data_list, "CLIENT ID")] == "C2023026"){
                                        table_data_value +=
                                        `<tr>
                                        <td>${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "HAULING DATE")])}</td>
                                        <td>${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE NAME")]}</td>
                                        <td>${pull_out_form}</td>
                                        <td style="font-weight: bold">${formatNumber(item.weight)} kgs.</td>
                                        <td>${tpf_data_list.content[x][findTextInArray(tpf_data_list, "DESTRUCTION PROCESS")]}</td>
                                        <td>${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")])}</td>
                                        </tr>
                                        `;
                                        table_head_data_value = 
                                        `
                                        <th>Date Hauled</th>
                                        <th>Class and Description of Waste</th>
                                        <th>Gate pass No.</th>
                                        <th>Quantity</th>
                                        <th>Destruction Process</th>
                                        <th>Date of Completion</th>
                                        `
                                        table_data_input += `
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "TPF #")]}" name="tpf_no_input${table_data_counter}" id="tpf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "SF #")]}" name="sf_no_input${table_data_counter}" id="sf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WCF #")]}" name="wcf_no_input${table_data_counter}" id="wcf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "CLIENT ID")]}" name="client_input${table_data_counter}" id="client_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE ID")]}" name="waste_description_input${table_data_counter}" id="waste_description_input${table_data_counter}">
                                        <input type="hidden" value="${findWasteCode(tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE ID")])}" name="waste_code_input${table_data_counter}" id="waste_code_input${table_data_counter}">
                                        <input type="hidden" value="${pull_out_form}" name="pull_out_form${table_data_counter}" id="pull_out_form${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE NAME")]}" name="waste_name_input${table_data_counter}" id="waste_name_input${table_data_counter}">
                                        <input type="hidden" value="${item.weight}" name="weight_input${table_data_counter}" id="weight_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "DESTRUCTION PROCESS")]}" name="destruction_process_input${table_data_counter}" id="destruction_process_input${table_data_counter}">
                                        <input type="hidden" value="${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "HAULING DATE")])}" name="hauling_date_input${table_data_counter}" id="hauling_date_input${table_data_counter}">    
                                        <input type="hidden" value="${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")])}" name="certification_date_input${table_data_counter}" id="certification_date_input${table_data_counter}">    
                                        `
                                    }
                                    else if(tpf_data_list.content[x][findTextInArray(tpf_data_list, "CLIENT ID")] == "C2023018"){
                                        table_data_value +=
                                        `<tr>
                                        <td>${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "HAULING DATE")])}</td>
                                        <td>${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE NAME")]}</td>
                                        <td>${pull_out_form}</td>
                                        <td style="font-weight: bold">${formatNumber(item.weight)} kgs.</td>
                                        <td>${tpf_data_list.content[x][findTextInArray(tpf_data_list, "DESTRUCTION PROCESS")]}</td>
                                        <td>${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")])}</td>
                                        </tr>
                                        `;
                                        table_head_data_value = 
                                        `
                                        <th>Date Hauled</th>
                                        <th>Class and Description of Waste</th>
                                        <th>Truck Scale Form #</th>
                                        <th>Quantity</th>
                                        <th>Destruction Process</th>
                                        <th>Date of Completion</th>
                                        `
                                        table_data_input += `
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "TPF #")]}" name="tpf_no_input${table_data_counter}" id="tpf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "SF #")]}" name="sf_no_input${table_data_counter}" id="sf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WCF #")]}" name="wcf_no_input${table_data_counter}" id="wcf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "CLIENT ID")]}" name="client_input${table_data_counter}" id="client_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE ID")]}" name="waste_description_input${table_data_counter}" id="waste_description_input${table_data_counter}">
                                        <input type="hidden" value="${findWasteCode(tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE ID")])}" name="waste_code_input${table_data_counter}" id="waste_code_input${table_data_counter}">
                                        <input type="hidden" value="${pull_out_form}" name="pull_out_form${table_data_counter}" id="pull_out_form${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE NAME")]}" name="waste_name_input${table_data_counter}" id="waste_name_input${table_data_counter}">
                                        <input type="hidden" value="${item.weight}" name="weight_input${table_data_counter}" id="weight_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "DESTRUCTION PROCESS")]}" name="destruction_process_input${table_data_counter}" id="destruction_process_input${table_data_counter}">
                                        <input type="hidden" value="${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "HAULING DATE")])}" name="hauling_date_input${table_data_counter}" id="hauling_date_input${table_data_counter}">    
                                        <input type="hidden" value="${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")])}" name="certification_date_input${table_data_counter}" id="certification_date_input${table_data_counter}">    
                                        `
                                    }
                                    else if(tpf_data_list.content[x][findTextInArray(tpf_data_list, "CLIENT ID")] == "C2023016"){
                                        table_data_value +=
                                        `<tr>
                                        <td>${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "HAULING DATE")])}</td>
                                        <td>${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE NAME")]}</td>
                                        <td>GPF ${pull_out_form}</td>
                                        <td style="font-weight: bold">${formatNumber(item.weight)} kgs.</td>
                                        <td>${tpf_data_list.content[x][findTextInArray(tpf_data_list, "DESTRUCTION PROCESS")]}</td>
                                        <td>${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")])}</td>
                                        </tr>
                                        `;
                                        table_head_data_value = 
                                        `
                                        <th>Date Hauled</th>
                                        <th>Class and Description of Waste</th>
                                        <th>Gate Pass No.</th>
                                        <th>Quantity</th>
                                        <th>Destruction Process</th>
                                        <th>Date of Completion</th>
                                        `
                                        table_data_input += `
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "TPF #")]}" name="tpf_no_input${table_data_counter}" id="tpf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "SF #")]}" name="sf_no_input${table_data_counter}" id="sf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WCF #")]}" name="wcf_no_input${table_data_counter}" id="wcf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "CLIENT ID")]}" name="client_input${table_data_counter}" id="client_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE ID")]}" name="waste_description_input${table_data_counter}" id="waste_description_input${table_data_counter}">
                                        <input type="hidden" value="${findWasteCode(tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE ID")])}" name="waste_code_input${table_data_counter}" id="waste_code_input${table_data_counter}">
                                        <input type="hidden" value="GPF ${pull_out_form}" name="pull_out_form${table_data_counter}" id="pull_out_form${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE NAME")]}" name="waste_name_input${table_data_counter}" id="waste_name_input${table_data_counter}">
                                        <input type="hidden" value="${item.weight}" name="weight_input${table_data_counter}" id="weight_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "DESTRUCTION PROCESS")]}" name="destruction_process_input${table_data_counter}" id="destruction_process_input${table_data_counter}">
                                        <input type="hidden" value="${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "HAULING DATE")])}" name="hauling_date_input${table_data_counter}" id="hauling_date_input${table_data_counter}">    
                                        <input type="hidden" value="${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")])}" name="certification_date_input${table_data_counter}" id="certification_date_input${table_data_counter}">    
                                        `
                                    }
                                    else if(tpf_data_list.content[x][findTextInArray(tpf_data_list, "CLIENT ID")] == "C2023036"){
                                        table_data_value +=
                                        `<tr>
                                        <td>${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "HAULING DATE")])}</td>
                                        <td>${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE NAME")]}</td>
                                        <td>${pull_out_form}</td>
                                        <td style="font-weight: bold">${formatNumber(item.weight)} kgs.</td>
                                        <td>${tpf_data_list.content[x][findTextInArray(tpf_data_list, "DESTRUCTION PROCESS")]}</td>
                                        <td>${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")])}</td>
                                        </tr>
                                        `;
                                        table_head_data_value = 
                                        `
                                        <th>Date Hauled</th>
                                        <th>Class and Description of Waste</th>
                                        <th>Pull Out Slip No.</th>
                                        <th>Quantity</th>
                                        <th>Destruction Process</th>
                                        <th>Date of Completion</th>
                                        `
                                        table_data_input += `
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "TPF #")]}" name="tpf_no_input${table_data_counter}" id="tpf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "SF #")]}" name="sf_no_input${table_data_counter}" id="sf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WCF #")]}" name="wcf_no_input${table_data_counter}" id="wcf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "CLIENT ID")]}" name="client_input${table_data_counter}" id="client_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE ID")]}" name="waste_description_input${table_data_counter}" id="waste_description_input${table_data_counter}">
                                        <input type="hidden" value="${findWasteCode(tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE ID")])}" name="waste_code_input${table_data_counter}" id="waste_code_input${table_data_counter}">
                                        <input type="hidden" value="${pull_out_form}" name="pull_out_form${table_data_counter}" id="pull_out_form${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE NAME")]}" name="waste_name_input${table_data_counter}" id="waste_name_input${table_data_counter}">
                                        <input type="hidden" value="${item.weight}" name="weight_input${table_data_counter}" id="weight_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "DESTRUCTION PROCESS")]}" name="destruction_process_input${table_data_counter}" id="destruction_process_input${table_data_counter}">
                                        <input type="hidden" value="${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "HAULING DATE")])}" name="hauling_date_input${table_data_counter}" id="hauling_date_input${table_data_counter}">    
                                        <input type="hidden" value="${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")])}" name="certification_date_input${table_data_counter}" id="certification_date_input${table_data_counter}">    
                                        `
                                    }
                                    else if(tpf_data_list.content[x][findTextInArray(tpf_data_list, "CLIENT ID")] == "C2023014"){
                                        table_data_value +=
                                        `<tr>
                                        <td>${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "HAULING DATE")])}</td>
                                        <td>${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE NAME")]}</td>
                                        <td>N/A</td>
                                        <td> style="font-weight: bold"${formatNumber(item.weight)} kgs.</td>
                                        <td>${tpf_data_list.content[x][findTextInArray(tpf_data_list, "DESTRUCTION PROCESS")]}</td>
                                        <td>${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")])}</td>
                                        </tr>
                                        `;
                                        table_head_data_value = 
                                        `
                                        <th>Date Hauled</th>
                                        <th>Class and Description of Waste</th>
                                        <th>Waste Code</th>
                                        <th>Quantity</th>
                                        <th>Destruction Process</th>
                                        <th>Date of Completion</th>
                                        `
                                        table_data_input += `
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "TPF #")]}" name="tpf_no_input${table_data_counter}" id="tpf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "SF #")]}" name="sf_no_input${table_data_counter}" id="sf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WCF #")]}" name="wcf_no_input${table_data_counter}" id="wcf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "CLIENT ID")]}" name="client_input${table_data_counter}" id="client_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE ID")]}" name="waste_description_input${table_data_counter}" id="waste_description_input${table_data_counter}">
                                        <input type="hidden" value="${findWasteCode(tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE ID")])}" name="waste_code_input${table_data_counter}" id="waste_code_input${table_data_counter}">
                                        <input type="hidden" value="${pull_out_form}" name="pull_out_form${table_data_counter}" id="pull_out_form${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE NAME")]}" name="waste_name_input${table_data_counter}" id="waste_name_input${table_data_counter}">
                                        <input type="hidden" value="${item.weight}" name="weight_input${table_data_counter}" id="weight_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "DESTRUCTION PROCESS")]}" name="destruction_process_input${table_data_counter}" id="destruction_process_input${table_data_counter}">
                                        <input type="hidden" value="${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "HAULING DATE")])}" name="hauling_date_input${table_data_counter}" id="hauling_date_input${table_data_counter}">    
                                        <input type="hidden" value="${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")])}" name="certification_date_input${table_data_counter}" id="certification_date_input${table_data_counter}">    
                                        `
                                    }
                                    else{
                                        table_data_value +=
                                        `<tr>
                                        <td>${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "HAULING DATE")])}</td>
                                        <td>${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE NAME")]}</td>
                                        <td>${findWasteCode(tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE ID")])}</td>
                                        <td style="font-weight: bold">${formatNumber(item.weight)} kgs.</td>
                                        <td>${tpf_data_list.content[x][findTextInArray(tpf_data_list, "DESTRUCTION PROCESS")]}</td>
                                        <td>${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")])}</td>
                                        </tr>
                                        `;
                                        table_head_data_value = 
                                        `
                                        <th>Date Hauled</th>
                                        <th>Class and Description of Waste</th>
                                        <th>Waste Code</th>
                                        <th>Quantity</th>
                                        <th>Destruction Process</th>
                                        <th>Date of Completion</th>
                                        `
                                        table_data_input += `
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "TPF #")]}" name="tpf_no_input${table_data_counter}" id="tpf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "SF #")]}" name="sf_no_input${table_data_counter}" id="sf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WCF #")]}" name="wcf_no_input${table_data_counter}" id="wcf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "CLIENT ID")]}" name="client_input${table_data_counter}" id="client_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE ID")]}" name="waste_description_input${table_data_counter}" id="waste_description_input${table_data_counter}">
                                        <input type="hidden" value="${findWasteCode(tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE ID")])}" name="waste_code_input${table_data_counter}" id="waste_code_input${table_data_counter}">
                                        <input type="hidden" value="${pull_out_form}" name="pull_out_form${table_data_counter}" id="pull_out_form${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE NAME")]}" name="waste_name_input${table_data_counter}" id="waste_name_input${table_data_counter}">
                                        <input type="hidden" value="${item.weight}" name="weight_input${table_data_counter}" id="weight_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "DESTRUCTION PROCESS")]}" name="destruction_process_input${table_data_counter}" id="destruction_process_input${table_data_counter}">
                                        <input type="hidden" value="${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "HAULING DATE")])}" name="hauling_date_input${table_data_counter}" id="hauling_date_input${table_data_counter}">    
                                        <input type="hidden" value="${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")])}" name="certification_date_input${table_data_counter}" id="certification_date_input${table_data_counter}">    
                                        `
                                    }
                                    table_company.innerHTML = findClientName(tpf_data_list.content[x][findTextInArray(tpf_data_list, "CLIENT ID")]);
                                    table_data_input_value.innerHTML = table_data_input;
                                    for (let y = 1; y < client_data_list.content.length; y++) {
                                        if (input_box.value == client_data_list.content[y][findTextInArray(client_data_list, "CLIENT NAME")]) {
                                            table_company_address.innerHTML = client_data_list.content[y][findTextInArray(client_data_list, "ADDRESS")];
                                        }
                                    }
                                    what_to_print.style.display = "block";
                                    completion.style.display = "grid";    
                                    convertToPDFandDownload_button.style.display = "block";    
                                    table_data.innerHTML = table_data_value;
                                    table_head_data.innerHTML = table_head_data_value;
                                    certification.innerHTML = `${certification_day}`;
                                    certification2.innerHTML = `${certification_day_ordinal} `;
                                    certification3.innerHTML = ` day of ${certification_month} ${year}`;
                                    result_remarks.innerHTML = "";
                                }
                            }
                        }
                    }    
                }    
            }
            else if(type_of_cod.value == "By Waste and Date Coverage"){
                const waste_description = document.getElementById("waste_description");
                const date_from = new Date(document.getElementById("date_from").value).setHours(0);
                const date_to = new Date(document.getElementById("date_to").value).setHours(0);
                for (const item of pending_certification){
                    for (let x = 1; x < tpf_data_list.content.length; x++) {
                        if(tpf_data_list.content[x][findTextInArray(tpf_data_list, "TPF #")] == item.tpfNumber){
                            if (!done.includes(item.tpfNumber) && input_box.value === findClientName(tpf_data_list.content[x][findTextInArray(tpf_data_list, "CLIENT ID")])) {
                            done.push(item.tpfNumber)
                            year = (new Date(tpf_data_list.content[x][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")])).getFullYear();
                            month = (new Date(tpf_data_list.content[x][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")])).getMonth() + 1;
                            certification_date = tpf_data_list.content[x][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")];
                            hauling_date = new Date(tpf_data_list.content[x][findTextInArray(tpf_data_list, "HAULING DATE")]);
                            certification_day = new Date(certification_date).getDate();
                            certification_day_ordinal = convertToOrdinal(certification_day);
                            certification_month = convertToMonthName(month);
                            if (waste_description.value == findWasteName(tpf_data_list.content[x][findTextInArray(tpf_data_list, "CLIENT ID")], tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE ID")]) &&
                                new Date(date_from).setHours(0) <= hauling_date &&
                                new Date(date_to).setHours(0) >= hauling_date) {
                                var pull_out_form = ""
                                    for(let y = 1; y < sf_data_list.content.length; y++){
                                        if(tpf_data_list.content[x][findTextInArray(tpf_data_list, "SF #")] == sf_data_list.content[y][findTextInArray(sf_data_list, "SF #")])
                                        pull_out_form = sf_data_list.content[y][findTextInArray(sf_data_list, "FORM #")]
                                    }
                                    for(let y = 1; y < wcf_data_list.content.length; y++){
                                        if(tpf_data_list.content[x][findTextInArray(tpf_data_list, "SF #")] == wcf_data_list.content[y][findTextInArray(wcf_data_list, "WCF #")])
                                        pull_out_form = wcf_data_list.content[y][findTextInArray(wcf_data_list, "PULL OUT FORM #")]
                                    }
                                    table_data_counter += 1;
                                    if(tpf_data_list.content[x][findTextInArray(tpf_data_list, "CLIENT ID")] == "C2023015"){
                                        table_data_value +=
                                        `<tr>
                                        <td>${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "HAULING DATE")])}</td>
                                        <td>${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE NAME")]}</td>
                                        <td>TS ${pull_out_form}</td>
                                        <td style="font-weight: bold">${formatNumber(tpf_data_list.content[x][findTextInArray(tpf_data_list, "WEIGHT")])} kgs.</td>
                                        <td>${tpf_data_list.content[x][findTextInArray(tpf_data_list, "DESTRUCTION PROCESS")]}</td>
                                        <td>${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")])}</td>
                                        </tr>
                                        `;
                                        table_head_data_value = 
                                        `
                                        <th>Date Hauled</th>
                                        <th>Class and Description of Waste</th>
                                        <th>Gate pass No./<br>TS No.</th>
                                        <th>Quantity</th>
                                        <th>Destruction Process</th>
                                        <th>Date of Completion</th>
                                        `
                                        table_data_input += `
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "TPF #")]}" name="tpf_no_input${table_data_counter}" id="tpf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "SF #")]}" name="sf_no_input${table_data_counter}" id="sf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WCF #")]}" name="wcf_no_input${table_data_counter}" id="wcf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "CLIENT ID")]}" name="client_input${table_data_counter}" id="client_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE ID")]}" name="waste_description_input${table_data_counter}" id="waste_description_input${table_data_counter}">
                                        <input type="hidden" value="${findWasteCode(tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE ID")])}" name="waste_code_input${table_data_counter}" id="waste_code_input${table_data_counter}">
                                        <input type="hidden" value="TS ${pull_out_form}" name="pull_out_form${table_data_counter}" id="pull_out_form${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE NAME")]}" name="waste_name_input${table_data_counter}" id="waste_name_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WEIGHT")]}" name="weight_input${table_data_counter}" id="weight_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "DESTRUCTION PROCESS")]}" name="destruction_process_input${table_data_counter}" id="destruction_process_input${table_data_counter}">
                                        <input type="hidden" value="${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "HAULING DATE")])}" name="hauling_date_input${table_data_counter}" id="hauling_date_input${table_data_counter}">    
                                        <input type="hidden" value="${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")])}" name="certification_date_input${table_data_counter}" id="certification_date_input${table_data_counter}">    
                                        `
                                    }
                                    else if(tpf_data_list.content[x][findTextInArray(tpf_data_list, "CLIENT ID")] == "C2023026"){
                                        table_data_value +=
                                        `<tr>
                                        <td>${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "HAULING DATE")])}</td>
                                        <td>${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE NAME")]}</td>
                                        <td>${pull_out_form}</td>
                                        <td style="font-weight: bold">${formatNumber(item.weight)} kgs.</td>
                                        <td>${tpf_data_list.content[x][findTextInArray(tpf_data_list, "DESTRUCTION PROCESS")]}</td>
                                        <td>${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")])}</td>
                                        </tr>
                                        `;
                                        table_head_data_value = 
                                        `
                                        <th>Date Hauled</th>
                                        <th>Class and Description of Waste</th>
                                        <th>Gate pass No.</th>
                                        <th>Quantity</th>
                                        <th>Destruction Process</th>
                                        <th>Date of Completion</th>
                                        `
                                        table_data_input += `
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "TPF #")]}" name="tpf_no_input${table_data_counter}" id="tpf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "SF #")]}" name="sf_no_input${table_data_counter}" id="sf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WCF #")]}" name="wcf_no_input${table_data_counter}" id="wcf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "CLIENT ID")]}" name="client_input${table_data_counter}" id="client_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE ID")]}" name="waste_description_input${table_data_counter}" id="waste_description_input${table_data_counter}">
                                        <input type="hidden" value="${findWasteCode(tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE ID")])}" name="waste_code_input${table_data_counter}" id="waste_code_input${table_data_counter}">
                                        <input type="hidden" value="${pull_out_form}" name="pull_out_form${table_data_counter}" id="pull_out_form${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE NAME")]}" name="waste_name_input${table_data_counter}" id="waste_name_input${table_data_counter}">
                                        <input type="hidden" value="${item.weight}" name="weight_input${table_data_counter}" id="weight_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "DESTRUCTION PROCESS")]}" name="destruction_process_input${table_data_counter}" id="destruction_process_input${table_data_counter}">
                                        <input type="hidden" value="${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "HAULING DATE")])}" name="hauling_date_input${table_data_counter}" id="hauling_date_input${table_data_counter}">    
                                        <input type="hidden" value="${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")])}" name="certification_date_input${table_data_counter}" id="certification_date_input${table_data_counter}">    
                                        `
                                    }
                                    else if(tpf_data_list.content[x][findTextInArray(tpf_data_list, "CLIENT ID")] == "C2023018"){
                                        table_data_value +=
                                        `<tr>
                                        <td>${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "HAULING DATE")])}</td>
                                        <td>${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE NAME")]}</td>
                                        <td>${pull_out_form}</td>
                                        <td style="font-weight: bold">${formatNumber(item.weight)} kgs.</td>
                                        <td>${tpf_data_list.content[x][findTextInArray(tpf_data_list, "DESTRUCTION PROCESS")]}</td>
                                        <td>${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")])}</td>
                                        </tr>
                                        `;
                                        table_head_data_value = 
                                        `
                                        <th>Date Hauled</th>
                                        <th>Class and Description of Waste</th>
                                        <th>Truck Scale Form #</th>
                                        <th>Quantity</th>
                                        <th>Destruction Process</th>
                                        <th>Date of Completion</th>
                                        `
                                        table_data_input += `
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "TPF #")]}" name="tpf_no_input${table_data_counter}" id="tpf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "SF #")]}" name="sf_no_input${table_data_counter}" id="sf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WCF #")]}" name="wcf_no_input${table_data_counter}" id="wcf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "CLIENT ID")]}" name="client_input${table_data_counter}" id="client_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE ID")]}" name="waste_description_input${table_data_counter}" id="waste_description_input${table_data_counter}">
                                        <input type="hidden" value="${findWasteCode(tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE ID")])}" name="waste_code_input${table_data_counter}" id="waste_code_input${table_data_counter}">
                                        <input type="hidden" value="${pull_out_form}" name="pull_out_form${table_data_counter}" id="pull_out_form${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE NAME")]}" name="waste_name_input${table_data_counter}" id="waste_name_input${table_data_counter}">
                                        <input type="hidden" value="${item.weight}" name="weight_input${table_data_counter}" id="weight_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "DESTRUCTION PROCESS")]}" name="destruction_process_input${table_data_counter}" id="destruction_process_input${table_data_counter}">
                                        <input type="hidden" value="${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "HAULING DATE")])}" name="hauling_date_input${table_data_counter}" id="hauling_date_input${table_data_counter}">    
                                        <input type="hidden" value="${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")])}" name="certification_date_input${table_data_counter}" id="certification_date_input${table_data_counter}">    
                                        `
                                    }
                                    else if(tpf_data_list.content[x][findTextInArray(tpf_data_list, "CLIENT ID")] == "C2023016"){
                                        table_data_value +=
                                        `<tr>
                                        <td>${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "HAULING DATE")])}</td>
                                        <td>${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE NAME")]}</td>
                                        <td>GPF ${pull_out_form}</td>
                                        <td style="font-weight: bold">${formatNumber(item.weight)} kgs.</td>
                                        <td>${tpf_data_list.content[x][findTextInArray(tpf_data_list, "DESTRUCTION PROCESS")]}</td>
                                        <td>${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")])}</td>
                                        </tr>
                                        `;
                                        table_head_data_value = 
                                        `
                                        <th>Date Hauled</th>
                                        <th>Class and Description of Waste</th>
                                        <th>Gate Pass No.</th>
                                        <th>Quantity</th>
                                        <th>Destruction Process</th>
                                        <th>Date of Completion</th>
                                        `
                                        table_data_input += `
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "TPF #")]}" name="tpf_no_input${table_data_counter}" id="tpf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "SF #")]}" name="sf_no_input${table_data_counter}" id="sf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WCF #")]}" name="wcf_no_input${table_data_counter}" id="wcf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "CLIENT ID")]}" name="client_input${table_data_counter}" id="client_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE ID")]}" name="waste_description_input${table_data_counter}" id="waste_description_input${table_data_counter}">
                                        <input type="hidden" value="${findWasteCode(tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE ID")])}" name="waste_code_input${table_data_counter}" id="waste_code_input${table_data_counter}">
                                        <input type="hidden" value="GPF ${pull_out_form}" name="pull_out_form${table_data_counter}" id="pull_out_form${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE NAME")]}" name="waste_name_input${table_data_counter}" id="waste_name_input${table_data_counter}">
                                        <input type="hidden" value="${item.weight}" name="weight_input${table_data_counter}" id="weight_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "DESTRUCTION PROCESS")]}" name="destruction_process_input${table_data_counter}" id="destruction_process_input${table_data_counter}">
                                        <input type="hidden" value="${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "HAULING DATE")])}" name="hauling_date_input${table_data_counter}" id="hauling_date_input${table_data_counter}">    
                                        <input type="hidden" value="${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")])}" name="certification_date_input${table_data_counter}" id="certification_date_input${table_data_counter}">    
                                        `
                                    }
                                    else if(tpf_data_list.content[x][findTextInArray(tpf_data_list, "CLIENT ID")] == "C2023036"){
                                        table_data_value +=
                                        `<tr>
                                        <td>${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "HAULING DATE")])}</td>
                                        <td>${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE NAME")]}</td>
                                        <td>${pull_out_form}</td>
                                        <td style="font-weight: bold">${formatNumber(item.weight)} kgs.</td>
                                        <td>${tpf_data_list.content[x][findTextInArray(tpf_data_list, "DESTRUCTION PROCESS")]}</td>
                                        <td>${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")])}</td>
                                        </tr>
                                        `;
                                        table_head_data_value = 
                                        `
                                        <th>Date Hauled</th>
                                        <th>Class and Description of Waste</th>
                                        <th>Pull Out Slip No.</th>
                                        <th>Quantity</th>
                                        <th>Destruction Process</th>
                                        <th>Date of Completion</th>
                                        `
                                        table_data_input += `
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "TPF #")]}" name="tpf_no_input${table_data_counter}" id="tpf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "SF #")]}" name="sf_no_input${table_data_counter}" id="sf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WCF #")]}" name="wcf_no_input${table_data_counter}" id="wcf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "CLIENT ID")]}" name="client_input${table_data_counter}" id="client_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE ID")]}" name="waste_description_input${table_data_counter}" id="waste_description_input${table_data_counter}">
                                        <input type="hidden" value="${findWasteCode(tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE ID")])}" name="waste_code_input${table_data_counter}" id="waste_code_input${table_data_counter}">
                                        <input type="hidden" value="${pull_out_form}" name="pull_out_form${table_data_counter}" id="pull_out_form${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE NAME")]}" name="waste_name_input${table_data_counter}" id="waste_name_input${table_data_counter}">
                                        <input type="hidden" value="${item.weight}" name="weight_input${table_data_counter}" id="weight_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "DESTRUCTION PROCESS")]}" name="destruction_process_input${table_data_counter}" id="destruction_process_input${table_data_counter}">
                                        <input type="hidden" value="${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "HAULING DATE")])}" name="hauling_date_input${table_data_counter}" id="hauling_date_input${table_data_counter}">    
                                        <input type="hidden" value="${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")])}" name="certification_date_input${table_data_counter}" id="certification_date_input${table_data_counter}">    
                                        `
                                    }
                                    else if(tpf_data_list.content[x][findTextInArray(tpf_data_list, "CLIENT ID")] == "C2023014"){
                                        table_data_value +=
                                        `<tr>
                                        <td>${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "HAULING DATE")])}</td>
                                        <td>${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE NAME")]}</td>
                                        <td>N/A</td>
                                        <td> style="font-weight: bold"${formatNumber(item.weight)} kgs.</td>
                                        <td>${tpf_data_list.content[x][findTextInArray(tpf_data_list, "DESTRUCTION PROCESS")]}</td>
                                        <td>${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")])}</td>
                                        </tr>
                                        `;
                                        table_head_data_value = 
                                        `
                                        <th>Date Hauled</th>
                                        <th>Class and Description of Waste</th>
                                        <th>Waste Code</th>
                                        <th>Quantity</th>
                                        <th>Destruction Process</th>
                                        <th>Date of Completion</th>
                                        `
                                        table_data_input += `
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "TPF #")]}" name="tpf_no_input${table_data_counter}" id="tpf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "SF #")]}" name="sf_no_input${table_data_counter}" id="sf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WCF #")]}" name="wcf_no_input${table_data_counter}" id="wcf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "CLIENT ID")]}" name="client_input${table_data_counter}" id="client_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE ID")]}" name="waste_description_input${table_data_counter}" id="waste_description_input${table_data_counter}">
                                        <input type="hidden" value="${findWasteCode(tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE ID")])}" name="waste_code_input${table_data_counter}" id="waste_code_input${table_data_counter}">
                                        <input type="hidden" value="${pull_out_form}" name="pull_out_form${table_data_counter}" id="pull_out_form${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE NAME")]}" name="waste_name_input${table_data_counter}" id="waste_name_input${table_data_counter}">
                                        <input type="hidden" value="${item.weight}" name="weight_input${table_data_counter}" id="weight_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "DESTRUCTION PROCESS")]}" name="destruction_process_input${table_data_counter}" id="destruction_process_input${table_data_counter}">
                                        <input type="hidden" value="${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "HAULING DATE")])}" name="hauling_date_input${table_data_counter}" id="hauling_date_input${table_data_counter}">    
                                        <input type="hidden" value="${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")])}" name="certification_date_input${table_data_counter}" id="certification_date_input${table_data_counter}">    
                                        `
                                    }
                                    else{
                                        table_data_value +=
                                        `<tr>
                                        <td>${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "HAULING DATE")])}</td>
                                        <td>${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE NAME")]}</td>
                                        <td>${findWasteCode(tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE ID")])}</td>
                                        <td style="font-weight: bold">${formatNumber(item.weight)} kgs.</td>
                                        <td>${tpf_data_list.content[x][findTextInArray(tpf_data_list, "DESTRUCTION PROCESS")]}</td>
                                        <td>${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")])}</td>
                                        </tr>
                                        `;
                                        table_head_data_value = 
                                        `
                                        <th>Date Hauled</th>
                                        <th>Class and Description of Waste</th>
                                        <th>Waste Code</th>
                                        <th>Quantity</th>
                                        <th>Destruction Process</th>
                                        <th>Date of Completion</th>
                                        `
                                        table_data_input += `
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "TPF #")]}" name="tpf_no_input${table_data_counter}" id="tpf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "SF #")]}" name="sf_no_input${table_data_counter}" id="sf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WCF #")]}" name="wcf_no_input${table_data_counter}" id="wcf_no_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "CLIENT ID")]}" name="client_input${table_data_counter}" id="client_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE ID")]}" name="waste_description_input${table_data_counter}" id="waste_description_input${table_data_counter}">
                                        <input type="hidden" value="${findWasteCode(tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE ID")])}" name="waste_code_input${table_data_counter}" id="waste_code_input${table_data_counter}">
                                        <input type="hidden" value="${pull_out_form}" name="pull_out_form${table_data_counter}" id="pull_out_form${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "WASTE NAME")]}" name="waste_name_input${table_data_counter}" id="waste_name_input${table_data_counter}">
                                        <input type="hidden" value="${item.weight}" name="weight_input${table_data_counter}" id="weight_input${table_data_counter}">
                                        <input type="hidden" value="${tpf_data_list.content[x][findTextInArray(tpf_data_list, "DESTRUCTION PROCESS")]}" name="destruction_process_input${table_data_counter}" id="destruction_process_input${table_data_counter}">
                                        <input type="hidden" value="${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "HAULING DATE")])}" name="hauling_date_input${table_data_counter}" id="hauling_date_input${table_data_counter}">    
                                        <input type="hidden" value="${date_decoder(tpf_data_list.content[x][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")])}" name="certification_date_input${table_data_counter}" id="certification_date_input${table_data_counter}">    
                                        `
                                    }
                                    table_company.innerHTML = findClientName(tpf_data_list.content[x][findTextInArray(tpf_data_list, "CLIENT ID")]);
                                    table_data_input_value.innerHTML = table_data_input;
                                    for (let y = 1; y < client_data_list.content.length; y++) {
                                        if (input_box.value == client_data_list.content[y][findTextInArray(client_data_list, "CLIENT NAME")]) {
                                            table_company_address.innerHTML = client_data_list.content[y][findTextInArray(client_data_list, "ADDRESS")];
                                        }
                                    }
                                    what_to_print.style.display = "block";
                                    completion.style.display = "grid";    
                                    convertToPDFandDownload_button.style.display = "block";    
                                    table_data.innerHTML = table_data_value;
                                    table_head_data.innerHTML = table_head_data_value;
                                    certification.innerHTML = `${certification_day}`;
                                    certification2.innerHTML = `${certification_day_ordinal} `;
                                    certification3.innerHTML = ` day of ${certification_month} ${year}`;
                                    result_remarks.innerHTML = "";
                                }
                            }
                        }
                    }    
                }    
            }
            if(table_data_value == undefined || table_data_value == ""){
                result_remarks.innerHTML = `
                <div class="search_cod_result">
                <h2>INFORMATION</h2>
                No Data Found
                </div><br>`            
            }  
            const generate_qr_button =document.getElementById("generate_qr_button")
            generate_qr_button.addEventListener("click", processAndGenerateQRCode)
        }

        const type_of_cod_list = document.getElementById("type_of_cod_list");
        
        type_of_cod.addEventListener("change", () => {
            var data_content;
            if(type_of_cod.value == "By Waste Description"){
                data_content = 
                `
                <div>
                    <label for="waste_description">
                        <i class="fa-solid fa-list-ol"></i>
                        Waste Description
                    </label><br>
                    <div>
                        <input type="text" id="waste_description" autocomplete="off" name="waste_description" class="form-control"><br>
                        </div>
                        </div>
                        <div>
                        <label for="year_covered">
                        <i class="fa-solid fa-list-ol"></i>
                        Year Covered
                    </label><br>
                    <div class="form">
                    <input type="text" autocomplete="off" name="year_covered" id="year_covered" class="form-control"><br>
                    </div>
                </div>
                <div>
                    <label for="month_covered">
                        <i class="fa-solid fa-list-ol"></i>
                        Month Covered
                    </label><br>
                    <div class="form">
                        <select name="month_covered" id="month_covered" class="form-control">
                            <option value="">Select Month</option>
                            <option value="1">JANUARY</option>
                            <option value="2">FEBRUARY</option>
                            <option value="3">MARCH</option>
                            <option value="4">APRIL</option>
                            <option value="5">MAY</option>
                            <option value="6">JUNE</option>
                            <option value="7">JULY</option>
                            <option value="8">AUGUST</option>
                            <option value="9">SEPTEMBER</option>
                            <option value="10">OCTOBER</option>
                            <option value="11">NOVEMBER</option>
                            <option value="12">DECEMBER</option>
                        </select>
                    </div>
                </div>
                `
                what_to_print.style.display = "none";
                client_container.style.display = "grid";    
                type_of_cod_list.innerHTML = data_content;
            }
            else if(type_of_cod.value == "By Date"){
                data_content = 
                `
                <div>
                <label for="waste_description">
                        <i class="fa-solid fa-list-ol"></i>
                        Day
                        </label><br>
                    <div>
                        <input type="number" id="waste_description" autocomplete="off" name="waste_description" class="form-control"><br>
                    </div>
                    </div>
                <div>
                    <label for="year_covered">
                        <i class="fa-solid fa-list-ol"></i>
                        Year Covered
                    </label><br>
                    <div class="form">
                        <input type="text" autocomplete="off" name="year_covered" id="year_covered" class="form-control"><br>
                    </div>
                </div>
                <div>
                    <label for="month_covered">
                        <i class="fa-solid fa-list-ol"></i>
                        Month Covered
                    </label><br>
                    <div class="form">
                        <select name="month_covered" id="month_covered" class="form-control">
                            <option value="">Select Month</option>
                            <option value="1">JANUARY</option>
                            <option value="2">FEBRUARY</option>
                            <option value="3">MARCH</option>
                            <option value="4">APRIL</option>
                            <option value="5">MAY</option>
                            <option value="6">JUNE</option>
                            <option value="7">JULY</option>
                            <option value="8">AUGUST</option>
                            <option value="9">SEPTEMBER</option>
                            <option value="10">OCTOBER</option>
                            <option value="11">NOVEMBER</option>
                            <option value="12">DECEMBER</option>
                        </select>
                    </div>
                    </div>
                `
                what_to_print.style.display = "none";
                client_container.style.display = "grid";    
                type_of_cod_list.innerHTML = data_content;
            }
            else if(type_of_cod.value == "By Waste and Date Coverage"){
                data_content = 
                `
                <div>
                    <label for="waste_description">
                            <i class="fa-solid fa-list-ol"></i>
                            Waste Description
                    </label><br>
                    <div>
                        <input type="text" id="waste_description" autocomplete="off" name="waste_description" class="form-control"><br>
                    </div>
                </div>
                <div>
                    <label for="waste_description">
                        <i class="fa-solid fa-list-ol"></i>
                        From
                    </label><br>
                    <div class="form">
                        <input type="date" id="date_from" autocomplete="off" name="date_from" class="form-control"><br>
                    </div>
                </div>
                <div>
                    <label for="waste_description">
                        <i class="fa-solid fa-list-ol"></i>
                        To
                    </label><br>
                    <div class="form">
                        <input type="date" id="date_to" autocomplete="off" name="date_to" class="form-control"><br>
                    </div>
                </div>
                `
                what_to_print.style.display = "none";
                client_container.style.display = "grid";    
                type_of_cod_list.innerHTML = data_content;
            }
        })

        // Function to generate a QR code from the content of an HTML element
        function processAndGenerateQRCode() {
            // convertElementToImage(function (imageDataUrl) {
            //     generateQRCodeFromImage(imageDataUrl);
            // });
            function convertElementToImage(callback) {
                const element = document.getElementById("what_to_print");
            
                // Set the scale to 2 to double the resolution (adjust as needed)
                html2canvas(element, {
                    scale: 10, // Increase the resolution by 2x (you can adjust this value)
                }).then(function (canvas) {
                    const imageDataUrl = canvas.toDataURL("image/png");
                    callback(imageDataUrl);
                });
            }
            
            // Usage example
            convertElementToImage(function (imageDataUrl) {
                const imgElement = document.createElement("img");
                imgElement.src = imageDataUrl;
                const containerElement = document.getElementById("image-container");
                containerElement.appendChild(imgElement);
            });
        }
        
        const search_cod_form_no_button = document.getElementById("search_cod_form_no_button");
        const search_cod_form_no = document.getElementById("search_cod_form_no");
        
        search_cod_form_no_button.addEventListener("click", search)
        
        function search() {
            var table_data_value = "";
            var table_data_counter = 0;
            certification.innerText = `${certification_day_ordinal} of ${certification_month} ${year}`;
            df_no.innerHTML = `${code_year_month}${data_counter4}`
            for (let x = 1; x < cod_data_list.content.length; x++) {
                if (search_cod_form_no.value == cod_data_list.content[x][findTextInArray(cod_data_list, "COD #")]) {
                    for(let y = 1; y <tpf_data_list.content.length; y++){
                        year = (new Date(tpf_data_list.content[y][findTextInArray(tpf_data_list, "ACTUAL COMPLETION DATE")])).getFullYear();
                        month = (new Date(tpf_data_list.content[y][findTextInArray(tpf_data_list, "ACTUAL COMPLETION DATE")])).getMonth() + 1;
                        certification_date = tpf_data_list.content[y][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")];
                        certification_day = new Date(certification_date).getDate();
                        certification_day_ordinal = convertToOrdinal(certification_day);
                        certification_month = convertToMonthName(month);
                        if(cod_data_list.content[x][findTextInArray(cod_data_list, "TPF #")] == tpf_data_list.content[y][findTextInArray(tpf_data_list, "TPF #")]){
                            table_data_counter += 1;
                            table_data_value +=
                                `<tr>
                                <td>${date_decoder(tpf_data_list.content[y][findTextInArray(tpf_data_list, "HAULING DATE")])}</td>
                                <td>${findWasteName(tpf_data_list.content[y][findTextInArray(tpf_data_list, "CLIENT ID")], pf_data_list.content[y][findTextInArray(tpf_data_list, "WASTE ID")])}</td>
                                <td>${findWasteCode(pf_data_list.content[y][findTextInArray(tpf_data_list, "WASTE ID")])}</td>
                                <td>${tpf_data_list.content[y][findTextInArray(tpf_data_list, "WEIGHT")]} Kgs.</td>
                                <td>${tpf_data_list.content[y][findTextInArray(tpf_data_list, "DESTRUCTION PROCESS")]}</td>
                                <td>${date_decoder(tpf_data_list.content[y][findTextInArray(tpf_data_list, "TARGET COMPLETION DATE")])}</td>
                                </tr>
                                `;
                            certification_day_ordinal = convertToOrdinal(certification_day);
                            certification_month = convertToMonthName(month);
                            certification.innerText = `${certification_day_ordinal} of ${certification_month} ${year}`;
                            table_company.innerHTML = findClientName(tpf_data_list.content[y][findTextInArray(tpf_data_list, "CLIENT ID")]);
                            for (let z = 1; z < client_data_list.content.length; z++) {
                                if (cod_data_list.content[x][findTextInArray(cod_data_list, "CLIENT ID")] == client_data_list.content[z][findTextInArray(client_data_list, "CLIENT ID")]) {
                                    table_company_address.innerHTML = client_data_list.content[z][findTextInArray(client_data_list, "ADDRESS")];
                                }
                            }
                        }
                    }
                }
            }    
            table_data.innerHTML = table_data_value;
            what_to_print.style.display = "block";
            convertToPDF_button.style.display = "block";    
        }

        function findEmployeeName(employee_id){
            var employee_name = "";
            for(let c = 1; c < employee_data_list.content.length; c++){
                if(employee_id == employee_data_list.content[c][findTextInArray(employee_data_list, "EMPLOYEE ID")]){
                    var gender = employee_data_list.content[c][findTextInArray(employee_data_list, "GENDER")];
                    if(gender == "MALE"){
                        employee_name = `${employee_data_list.content[c][findTextInArray(employee_data_list, "LAST NAME")]}, ${employee_data_list.content[c][findTextInArray(employee_data_list, "FIRST NAME")]} ${employee_data_list.content[c][findTextInArray(employee_data_list, "MIDDLE NAME")]} ${employee_data_list.content[c][findTextInArray(employee_data_list, "AFFIX")]}`
                    }
                    else{
                        employee_name = `${employee_data_list.content[c][findTextInArray(employee_data_list, "LAST NAME")]}, ${employee_data_list.content[c][findTextInArray(employee_data_list, "FIRST NAME")]} ${employee_data_list.content[c][findTextInArray(employee_data_list, "MIDDLE NAME")]} - ${employee_data_list.content[c][findTextInArray(employee_data_list, "SPOUSE NAME")]}`
                    }
                    break
                }
                else{
                    employee_name = employee_id;
                }
            }
            return employee_name
        }
        function findClientName(client_id){
            var client_name = "";
            for(let c = 1; c < client_data_list.content.length; c++){
                if(client_id == client_data_list.content[c][findTextInArray(client_data_list, "CLIENT ID")]){
                    client_name = client_data_list.content[c][findTextInArray(client_data_list, "CLIENT NAME")];
                    break
                }
            }
            return client_name
        }
        function findWasteCode(waste_id){
            var waste_code = "";
            for(let c = 1; c < type_of_waste_data_list.content.length; c++){
                if(waste_id.substring(0, 8) == type_of_waste_data_list.content[c][findTextInArray(type_of_waste_data_list, "WASTE ID")]){
                    waste_code = (type_of_waste_data_list.content[c][findTextInArray(type_of_waste_data_list, "WASTE CODE")]).substring(0, 4);
                    break
                }
                else{
                    waste_code = waste_id;
                }
            }
            return waste_code
        }
        function findWasteName(client_id, waste_id){
            var waste_name = "";
            for(let c = 1; c < qlf_data_list.content.length; c++){
                if(client_id == qlf_data_list.content[c][findTextInArray(qlf_data_list, "CLIENT ID")]&& 
                    waste_id == qlf_data_list.content[c][findTextInArray(qlf_data_list, "WASTE ID/ TYPE OF VEHICLE")]){
                    waste_name = (qlf_data_list.content[c][findTextInArray(qlf_data_list, "WASTE NAME")]);
                    break
                }
            }
            return waste_name
        }

    } catch (error) {
        console.error('Error fetching data:', error);
    }
});
